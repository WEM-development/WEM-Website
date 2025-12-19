"use client"

import { useState } from "react";
import { Invoice, InvoiceItem } from "../Models";
import InvoiceForm from "./InvoiceForm";
import InvoiceItemsForm from "./InvoiceItemsForm";
import InvoicePreview from "./InvoicePreview";

export default function InvoiceEditor({ loadInvoice }: { loadInvoice: Invoice | null }) {
    const [invoice, setInvoice] = useState<Invoice | null>(loadInvoice);

    return (
        <div className="container mx-auto px-4 py-8">
            <div className="flex flex-col gap-6">
                <div className="grid grid-cols-2 grid-rows-2 gap-16">
                    <div className="w-full flex flex-col gap-4">
                        <InvoiceForm
                            onSubmit={(formData: any) => {
                                console.log("From data...");
                                console.log(formData);
                                setInvoice({
                                    ...invoice!,
                                    id: formData.id,
                                    publishDate: formData.publishDate ? new Date(formData.publishDate) : new Date(),
                                    paymentDate: formData.paymentDate ? new Date(formData.paymentDate) : new Date(),
                                    customer: {
                                        ico: formData.ico || "",
                                        name: formData.name || "",
                                        address: formData.address || "",
                                        email: formData.email || ""
                                    },
                                    items: [],
                                    supplier: {
                                        ico: "12345678",
                                        name: "Moje Firma s.r.o.",
                                        address: "Hlavní 123, 110 00 Praha",
                                        email: "info@mojefirma.cz"
                                    },
                                    paymentDetails: {
                                        accountNumber: 222885,
                                        bankCode: 5500,
                                        amount: 250,
                                        currency: "CZK",
                                        variableSymbol: 333,
                                        message: "Testovací zpráva",
                                        qrFetchURL: "https://api.paylibo.com/paylibo/generator/czech/image?accountNumber=222885&bankCode=5500&amount=250.00&currency=CZK&vs=333&branding=false&message=FOND%20HUMANITY%20CCK"
                                    }
                                });
                            }}
                        />
                        <InvoiceItemsForm
                            onChange={(items: InvoiceItem[]) => {
                                if (invoice) {
                                    setInvoice({
                                        ...invoice,
                                        items: items
                                    });
                                }
                            }}
                        />
                    </div>
                    <InvoicePreview
                        invoice={invoice} />
                </div>
            </div>
        </div>
    );
}

