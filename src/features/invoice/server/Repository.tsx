import { getDocs, query, where } from "firebase/firestore";
import { InvoiceClientScheme, InvoiceConfigurationScheme, InvoiceItemsScheme, InvoicePaymentScheme, InvoiceScheme } from "../../firebase/collections";
import { addDocument, FirebaseStatus, getCollection, getDocument, getReference, getReferenceObject } from "../../firebase/utilities";
import { Invoice } from "../Models";

export interface InvoiceRepository {
    addInvoiceAsync(invoice: Invoice) : Promise<boolean>;
    getInvoiceAsync(invoiceId: string) : Promise<Invoice | null>;
    getInvoicesCountAsync(date?: Date) : Promise<number>;
    getAllInvoicesAsync() : Promise<Invoice[]>;
}

class FirebaseRepository implements InvoiceRepository {
    async addInvoiceAsync(invoice: Invoice) : Promise<boolean> {
        const identificators = {
            customer: `${invoice.id}-c`,
            supplier: `${invoice.id}-s`,
            payment: `${invoice.id}-Payment`,
            configuration: `${invoice.id}`
        };

        const customerStatus = await addDocument(InvoiceClientScheme, invoice.customer, identificators.customer) == FirebaseStatus.Ok;
        const supplierStatus = await addDocument(InvoiceClientScheme, invoice.supplier, identificators.supplier) == FirebaseStatus.Ok;
        const paymentStatus = await addDocument(InvoicePaymentScheme, invoice.paymentDetails, identificators.payment) == FirebaseStatus.Ok;
        const configurationStatus = await addDocument(InvoiceConfigurationScheme, invoice.configuration, identificators.configuration) == FirebaseStatus.Ok;

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
                configuration: getReferenceObject(InvoiceConfigurationScheme, identificators.configuration),
                publishDate: invoice.publishDate,
                paymentDate: invoice.paymentDate,
                idt: new Date(),
                itemsPrice: invoice.itemsPrice,
            },
            invoice.id
        ) == FirebaseStatus.Ok;

        return customerStatus && supplierStatus && paymentStatus && invoiceStatus && configurationStatus;
    }

    async getInvoiceAsync(invoiceId: string) : Promise<Invoice | null> {
        const [id, fields] = await getDocument(InvoiceScheme, invoiceId);

        if (!fields) {
            return null;
        }

        const [_1, supplierFields] = await getReference(InvoiceClientScheme, fields.supplier.value);
        const [_2, customerFields] = await getReference(InvoiceClientScheme, fields.customer.value);
        const [_3, paymentDetailsFields] = await getReference(InvoicePaymentScheme, fields.paymentDetails.value);
        const [_4, configurationFields] = await getReference(InvoiceConfigurationScheme, fields.configuration.value);

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
                ico: supplierFields.ico.value,
                name: supplierFields.name.value,
                address: supplierFields.address.value
            },
            customer: {
                ico: customerFields.ico.value,
                name: customerFields.name.value,
                address: customerFields.address.value
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
            paymentDetails: {
                accountNumber: paymentDetailsFields.accountNumber.value,
                bankCode: paymentDetailsFields.bankCode.value,
                amount: paymentDetailsFields.amount.value,
                currency: paymentDetailsFields.currency.value,
                variableSymbol: paymentDetailsFields.variableSymbol.value,
                message: paymentDetailsFields.message.value,
                qrFetchURL: paymentDetailsFields.qrFetchURL.value
            },
            configuration: {
                isTaxRateEnabled: configurationFields.isTaxRateEnabled.value,
                taxRate: configurationFields.taxRate.value,
                logo: configurationFields.logo.value,
                signature: configurationFields.signature.value
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

    async getAllInvoicesAsync(): Promise<Invoice[]> {
        const snapshot = await getDocs(getCollection(InvoiceScheme));
        const invoices: Invoice[] = [];

        for (const doc of snapshot.docs) {
            const fields = doc.data();
            
            const [_1, supplierFields] = await getReference(InvoiceClientScheme, fields.supplier);
            const [_2, customerFields] = await getReference(InvoiceClientScheme, fields.customer);
            const [_3, paymentDetailsFields] = await getReference(InvoicePaymentScheme, fields.paymentDetails);
            const [_4, configurationFields] = await getReference(InvoiceConfigurationScheme, fields.configuration);

            const items = await Promise.all(fields.items.map(async (itemId: any) => {
                const item = await getReference(InvoiceItemsScheme, itemId);
                return item;
            }));

            invoices.push({
                id: doc.id,
                publishDate: fields.publishDate.toDate(),
                paymentDate: fields.paymentDate.toDate(),
                supplier: {
                    ico: supplierFields.ico.value,
                    name: supplierFields.name.value,
                    address: supplierFields.address.value
                },
                customer: {
                    ico: customerFields.ico.value,
                    name: customerFields.name.value,
                    address: customerFields.address.value
                },
                items: items.map(([id, itemFields]: any) => {
                    return {
                        id: id,
                        description: itemFields.description.value,
                        amount: itemFields.amount.value,
                        price: itemFields.price.value
                    };
                }),
                itemsPrice: fields.itemsPrice,
                paymentDetails: {
                    accountNumber: paymentDetailsFields.accountNumber.value,
                    bankCode: paymentDetailsFields.bankCode.value,
                    amount: paymentDetailsFields.amount.value,
                    currency: paymentDetailsFields.currency.value,
                    variableSymbol: paymentDetailsFields.variableSymbol.value,
                    message: paymentDetailsFields.message.value,
                    qrFetchURL: paymentDetailsFields.qrFetchURL.value
                },
                configuration: {
                    isTaxRateEnabled: configurationFields.isTaxRateEnabled.value,
                    taxRate: configurationFields.taxRate.value,
                    logo: configurationFields.logo.value,
                    signature: configurationFields.signature.value
                }
            });
        }

        return invoices.sort((a, b) => b.publishDate.getTime() - a.publishDate.getTime());
    }
}
 
export const Invoices: InvoiceRepository = new FirebaseRepository();
