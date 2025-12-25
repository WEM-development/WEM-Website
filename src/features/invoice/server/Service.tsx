import { Profile } from "../../profile/Models";
import { Invoice, InvoicePaymentDetails } from "../Models";
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

export function generateBlankInvoice(profile: Profile, invoiceId: string) : Invoice {
    return {
        id: invoiceId,
        publishDate: new Date(),
        paymentDate: new Date(),
        supplier: {
            ico: profile.ico,
            name: profile.supplierName,
            address: profile.address,
            email: profile.email
        },
        customer: {
            ico: "",
            name: "",
            address: "",
            email: ""
        },
        items: [],
        itemsPrice: 0,
        paymentDetails: {
            accountNumber: profile.accountNumber,
            bankCode: profile.bankCode,
            amount: 0,
            currency: "CZK",
            variableSymbol: invoiceId,
            message: "",
            qrFetchURL: ""
        },
        configuration: {
            logo: profile.logo,
            signature: profile.signature,
            isTaxRateEnabled: profile.isTaxRateEnabled,
            taxRate: profile.taxRate
        }
    };
}
