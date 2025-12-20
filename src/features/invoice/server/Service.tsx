import { InvoicePaymentDetails } from "../Models";

export function getQRFetchUrl(invoicePayment: InvoicePaymentDetails) : string {
    const response =
        `https://api.paylibo.com/paylibo/generator/czech/image?accountNumber=${invoicePayment.accountNumber}&bankCode=${invoicePayment.bankCode}&amount=${invoicePayment.amount}&currency=${invoicePayment.currency}&vs=${invoicePayment.variableSymbol}&branding=false&message=${invoicePayment.message}`;

    return response;
}
