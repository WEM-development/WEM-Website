import { ClientScheme, InvoicePaymentScheme, InvoiceScheme } from "../../firebase/collections";
import { addDocument, FirebaseStatus, getDocument, getReference } from "../../firebase/utilities";
import { Invoice } from "../Models";

export interface InvoiceRepository {
    addInvoiceAsync(invoice: Invoice) : Promise<boolean>;
    getInvoiceAsync(invoiceId: string) : Promise<Invoice | null>;
}

class FirebaseRepository implements InvoiceRepository {
    async addInvoiceAsync(invoice: Invoice) : Promise<boolean> {
        const status = await addDocument(InvoiceScheme, invoice) == FirebaseStatus.Ok;
        // TODO: Add adding payment, items references

        return status;
    }

    async getInvoiceAsync(invoiceId: string) : Promise<Invoice | null> {
        const [id, fields] = await getDocument(InvoiceScheme, invoiceId);

        if (!fields) {
            return null;
        }

        const [supplierIco, supplierFields] = await getReference(ClientScheme, fields.supplier.value);
        const [customerIco, customerFields] = await getReference(ClientScheme, fields.customer.value);
        const [_, paymentDetailsFields] = await getReference(InvoicePaymentScheme, fields.paymentDetails.value);

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
            items: [],
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
}
 
export const Invoices: InvoiceRepository = new FirebaseRepository();
