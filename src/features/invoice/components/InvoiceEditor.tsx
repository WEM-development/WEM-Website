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
                            // TODO: Fix the nullability
                            invoice={invoice!}
                            onChange={(currentInvoice: Invoice) => {
                                setInvoice(currentInvoice);
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

