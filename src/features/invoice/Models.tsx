import { Client } from "../company_client/Models";

export interface InvoiceItem {
    id?: number;
    description: string;
    amount: number;
    price: number;
}

export interface InvoicePaymentDetails {
    accountNumber: string;
    bankCode: string;
    amount: number;
    currency: string;
    variableSymbol: string;
    message: string;
    qrFetchURL: string;
}

export interface InvoiceConfiguration {
    isTaxRateEnabled: boolean;
    taxRate: number;
    logo: string;
    signature: string;
}

export interface Invoice {
    id: string;
    publishDate: Date;
    paymentDate: Date;
    supplier: Client;
    customer: Client;
    items: InvoiceItem[];
    itemsPrice: number;
    identificationOrder: string | null;
    paymentDetails: InvoicePaymentDetails;
    configuration: InvoiceConfiguration;
};