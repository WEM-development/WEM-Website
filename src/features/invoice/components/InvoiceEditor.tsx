"use client"

import { useState } from "react";
import { Invoice, InvoiceItem } from "../Models";
import InvoiceForm from "./InvoiceForm";
import InvoiceItemsForm from "./InvoiceItemsForm";
import InvoicePreview from "./InvoicePreview";
import { getQRFetchUrl } from "../server/Service";
import { Profile } from "../../profile/Models";
import InvoiceModal from "./InvoiceModal";
import { Invoices } from "../server/Repository";

export default function InvoiceEditor({ loadInvoice, loadProfile }: { loadInvoice: Invoice, loadProfile: Profile}) {
    const [invoice, setInvoice] = useState<Invoice>(loadInvoice);

    return (
        <div className="container mx-auto px-4 py-8">
            <div className="flex flex-col gap-6">
                <div className="grid grid-cols-2 grid-rows-2 gap-16">
                    <div className="w-full flex flex-col gap-4">
                        <InvoiceForm
                            invoice={invoice}
                            onChange={(currentInvoice: Invoice) => {
                                setInvoice(currentInvoice);
                            }}
                        />
                        <InvoiceItemsForm
                            onChange={(items: InvoiceItem[]) => {
                                const sumPrice = items.reduce((sum, item) => sum + (item.price * item.amount), 0);
                                const newPaymentDetails = {
                                    ...invoice.paymentDetails,
                                    amount: invoice.configuration.isTaxRateEnabled ? sumPrice + (sumPrice * invoice.configuration.taxRate) : sumPrice
                                };

                                setInvoice({
                                    ...invoice,
                                    items: items,
                                    itemsPrice: sumPrice,
                                    paymentDetails: {
                                        ...newPaymentDetails,
                                        qrFetchURL: getQRFetchUrl(newPaymentDetails)
                                    }
                                });
                            }}
                        />
                    </div>
                    <div className="flex flex-col gap-6">
                        <div className="flex flex-row gap-8 items-center justify-between print:hidden">
                            <p className="text-xl font-medium float-left">Náhled faktury</p>
                            <InvoiceModal
                                onInvoicePress={async (emailContent: any) => {
                                    await Invoices.addInvoiceAsync(invoice);
                                    console.log(emailContent);
                                }}
                            />
                        </div>
                        <InvoicePreview
                            invoice={invoice}
                            profile={loadProfile}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}

