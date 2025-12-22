import { getDocs, query, where } from "firebase/firestore";
import { InvoiceClientScheme, InvoiceItemsScheme, InvoicePaymentScheme, InvoiceScheme } from "../../firebase/collections";
import { addDocument, FirebaseStatus, getCollection, getDocument, getReference, getReferenceObject } from "../../firebase/utilities";
import { Invoice } from "../Models";

export interface InvoiceRepository {
    addInvoiceAsync(invoice: Invoice) : Promise<boolean>;
    getInvoiceAsync(invoiceId: string) : Promise<Invoice | null>;
    getInvoicesCountAsync(date?: Date) : Promise<number>;
}

class FirebaseRepository implements InvoiceRepository {
    async addInvoiceAsync(invoice: Invoice) : Promise<boolean> {
        const identificators = {
            customer: `${invoice.id}-c`,
            supplier: `${invoice.id}-s`,
            payment: `${invoice.id}-Payment`
        };

        const customerStatus = await addDocument(InvoiceClientScheme, invoice.customer, identificators.customer) == FirebaseStatus.Ok;
        const supplierStatus = await addDocument(InvoiceClientScheme, invoice.supplier, identificators.supplier) == FirebaseStatus.Ok;
        const paymentStatus = await addDocument(InvoicePaymentScheme, invoice.paymentDetails, identificators.payment) == FirebaseStatus.Ok;

        const items = invoice.items.map(item => [`${invoice.id}-Item:${item.id}`, item] as const);
        await Promise.all(items.map(async ([id, item]) => {
            return await addDocument(InvoiceItemsScheme, item, id);
        }));

        const invoiceStatus = await addDocument(
            InvoiceScheme, {
                items: items.map(([id, _]) => getReferenceObject(InvoiceItemsScheme, id)),
                customer: getReferenceObject(InvoiceClientScheme, identificators.customer),
                supplier: getReferenceObject(InvoiceClientScheme, identificators.supplier),
                paymentDetails: getReferenceObject(InvoicePaymentScheme, identificators.payment),
                publishDate: invoice.publishDate,
                paymentDate: invoice.paymentDate,
                idt: new Date(),
                itemsPrice: invoice.itemsPrice,
                taxRate: invoice.taxRate
            },
            invoice.id
        ) == FirebaseStatus.Ok;

        return customerStatus && supplierStatus && paymentStatus && invoiceStatus;
    }

    async getInvoiceAsync(invoiceId: string) : Promise<Invoice | null> {
        const [id, fields] = await getDocument(InvoiceScheme, invoiceId);

        if (!fields) {
            return null;
        }

        const [supplierIco, supplierFields] = await getReference(InvoiceClientScheme, fields.supplier.value);
        const [customerIco, customerFields] = await getReference(InvoiceClientScheme, fields.customer.value);
        const [_, paymentDetailsFields] = await getReference(InvoicePaymentScheme, fields.paymentDetails.value);

        const items = await Promise.all(fields.items.value.map(async (itemId: any) => {
            console.log(itemId);
            const item = await getReference(InvoiceItemsScheme, itemId);
            return item;
        }));

        return {
            id: id,
            publishDate: fields.publishDate.value.toDate(),
            paymentDate: fields.paymentDate.value.toDate(),
            supplier: {
                ico: supplierIco,
                name: supplierFields.name.value,
                address: supplierFields.address.value,
                email: supplierFields.email.value
            },
            customer: {
                ico: customerIco,
                name: customerFields.name.value,
                address: customerFields.address.value,
                email: customerFields.email.value
            },
            items: items.map(([id, itemFields]: any) => {
                return {
                    id: id,
                    description: itemFields.description.value,
                    amount: itemFields.amount.value,
                    price: itemFields.price.value
                };
            }),
            itemsPrice: fields.itemsPrice.value,
            taxRate: fields.taxRate.value,
            paymentDetails: {
                accountNumber: paymentDetailsFields.accountNumber.value,
                bankCode: paymentDetailsFields.bankCode.value,
                amount: paymentDetailsFields.amount.value,
                currency: paymentDetailsFields.currency.value,
                variableSymbol: paymentDetailsFields.variableSymbol.value,
                message: paymentDetailsFields.message.value,
                qrFetchURL: paymentDetailsFields.qrFetchURL.value
            }
        };
    }

    async getInvoicesCountAsync(date?: Date): Promise<number> {
        const currentDate = date ?? new Date();
        currentDate.setHours(0, 0, 0, 0);

        const returnQuery = query(
            getCollection(InvoiceScheme),
            where("idt", ">=", currentDate)
        );

        const invoices = await getDocs(returnQuery);
        return invoices.size;
    }
}
 
export const Invoices: InvoiceRepository = new FirebaseRepository();
