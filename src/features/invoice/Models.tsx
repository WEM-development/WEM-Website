import { Client } from "../company_client/Models";

export interface InvoiceItem {
    id?: number;
    description: string;
    amount: number;
    price: number;
}

export interface InvoicePaymentDetails {
    accountNumber: number;
    bankCode: number;
    amount: number;
    currency: string;
    variableSymbol: number;
    message: string;
    qrFetchURL: string;
}

export interface Invoice {
    id: string;
    publishDate: Date;
    paymentDate: Date;
    supplier: Client;
    customer: Client;
    items: InvoiceItem[];
    paymentDetails: InvoicePaymentDetails;
};