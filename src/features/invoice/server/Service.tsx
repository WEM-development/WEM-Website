import { InvoicePaymentDetails } from "../Models";
import { Invoices } from "./Repository";

export function getQRFetchUrl(invoicePayment: InvoicePaymentDetails) : string {
    const response =
        `https://api.paylibo.com/paylibo/generator/czech/image?accountNumber=${invoicePayment.accountNumber}&bankCode=${invoicePayment.bankCode}&amount=${invoicePayment.amount}&currency=${invoicePayment.currency}&vs=${invoicePayment.variableSymbol}&branding=false&message=${invoicePayment.message}`;

    return response;
}

export async function generateNextInvoiceId() {
    const currentDate = new Date();

    const todaysInvoicesCount = await Invoices.getInvoicesCountAsync(currentDate);
    return `${currentDate.getFullYear()}${currentDate.getDate()}${currentDate.getMonth() + 1}${todaysInvoicesCount + 1}`;
}
