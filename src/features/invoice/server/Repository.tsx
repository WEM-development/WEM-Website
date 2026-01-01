import { DocumentData, getDocs, query, Timestamp, where } from "firebase/firestore";
import { InvoiceClientScheme, InvoiceConfigurationScheme, InvoiceItemsScheme, InvoicePaymentScheme, InvoiceScheme } from "../../firebase/collections";
import { addDocument, FirebaseStatus, getCollection, getDocument, getReference, getReferenceObject } from "../../firebase/utilities";
import { Invoice } from "../Models";

export interface InvoiceRepository {
    addInvoiceAsync(invoice: Invoice) : Promise<boolean>;
    getInvoiceAsync(invoiceId: string) : Promise<Invoice | null>;
    getInvoicesCountAsync(date?: Date) : Promise<number>;
    getAllInvoicesAsync() : Promise<Invoice[]>;
    getRecentInvoicesAsync() : Promise<Invoice[]>;
}

interface InvoiceCache {
    data: Record<string, Invoice>;
    lastRevalidationDate: Date;
    revalidationConfiguration: {
        hours: number,
        minutes: number
    };
}

class FirebaseRepository implements InvoiceRepository {
    invoiceCache: InvoiceCache

    constructor(
        invoiceCache: InvoiceCache
    ) {
        this.invoiceCache = invoiceCache;
    }

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
                identificationOrder: invoice.identificationOrder,
                idt: new Date(),
                itemsPrice: invoice.itemsPrice,
            },
            invoice.id
        ) == FirebaseStatus.Ok;

        this.invoiceCache.data[invoice.id] = invoice;
        return customerStatus && supplierStatus && paymentStatus && invoiceStatus && configurationStatus;
    }

    async getInvoiceAsync(invoiceId: string) : Promise<Invoice | null> {
        if (this.invoiceCache.data[invoiceId] !== undefined) {
            return this.invoiceCache.data[invoiceId];
        }

        const [id, fields] = await getDocument(InvoiceScheme, invoiceId);

        if (!fields) {
            return null;
        }

        console.log({id, fields});

        const mappedInvoice = await this.mapInvoiceToClientAsync(id, fields);
        this.invoiceCache.data[mappedInvoice.id] = mappedInvoice;

        return mappedInvoice;
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

    async getRecentInvoicesAsync() : Promise<Invoice[]> {
        const currentDate = new Date();
        currentDate.setHours(0, 0, 0, 0);

        const returnQuery = query(
            getCollection(InvoiceScheme),
            where("idt", ">=", currentDate)
        );

        const invoices = await getDocs(returnQuery)
            .then(async snapshot => {
                const doc = snapshot.docs;
                return await Promise.all(doc.map(async doc => await this.mapInvoiceToClientAsync(doc.id, doc.data())));
        });

        return invoices;
    }

    async getAllInvoicesAsync(): Promise<Invoice[]> {
        const currentDate = new Date();

        if (Object.keys(this.invoiceCache.data).length > 0 && this.invoiceCache.lastRevalidationDate < currentDate) {
            return Object.values(this.invoiceCache.data);
        } 
        else {
            this.invoiceCache.data = {};
            currentDate.setHours(
                currentDate.getHours() + this.invoiceCache.revalidationConfiguration.hours,
                currentDate.getMinutes() + this.invoiceCache.revalidationConfiguration.minutes,
            );
        }

        const snapshot = await getDocs(getCollection(InvoiceScheme));
        const invoices: Invoice[] = [];

        for (const doc of snapshot.docs) {
            const mappedInvoice = await this.mapInvoiceToClientAsync(doc.id, doc.data());
            this.invoiceCache.data[mappedInvoice.id] = mappedInvoice;

            invoices.push(mappedInvoice);
        }

        return invoices.sort((a, b) => b.publishDate.getTime() - a.publishDate.getTime());
    }

    async mapInvoiceToClientAsync(id: string, fields: DocumentData) : Promise<Invoice> {
        const [_1, supplierFields] = await getReference(InvoiceClientScheme, fields.supplier);
        const [_2, customerFields] = await getReference(InvoiceClientScheme, fields.customer);
        const [_3, paymentDetailsFields] = await getReference(InvoicePaymentScheme, fields.paymentDetails);
        const [_4, configurationFields] = await getReference(InvoiceConfigurationScheme, fields.configuration);

        const returnItems = Array.isArray(fields.items || fields.items.value) ? await Promise.all(fields.items.map(async (itemId: any) => {
            const item = await getReference(InvoiceItemsScheme, itemId);
            return item;
        })) : [];

        console.log(fields);
        return ({
            id: id,
            publishDate: fields.publishDate instanceof Timestamp
                ? fields.publishDate.toDate()
                : fields.publishDate.value.toDate(),
            paymentDate: fields.paymentDate instanceof Timestamp
                ? fields.paymentDate.toDate()
                : fields.paymentDate.value.toDate(),
            identificationOrder: fields.identificationOrder && (fields.identificationOrder || fields.identificationOrder.value) !== undefined ? (fields.identificationOrder || fields.identificationOrder.value) : null,
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
            items: returnItems.length == 0 ? [] : returnItems.map(([id, itemFields]: any) => {
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
        }) as Invoice;
    }
}
 
export const Invoices: InvoiceRepository = new FirebaseRepository(
    {
        data: {},
        lastRevalidationDate: new Date(),
        revalidationConfiguration: {
            hours: 0,
            minutes: 30
        }
    } as InvoiceCache
);
