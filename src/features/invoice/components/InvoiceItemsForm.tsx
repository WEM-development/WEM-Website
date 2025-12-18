"use client"

import { Button, Input } from "@heroui/react";
import { InvoiceItem } from "../Models";
import { TrashIcon } from "./Icons";
import { useState } from "react";

interface InvoiceItemsFormProps {
    onChange: (items: InvoiceItem[]) => void;
}
        <div id="print-area" className="flex flex-col min-h-[297mm] bg-white w-full max-w-[210mm]"></div>

export default function InvoiceItemsForm() {
    const [invoiceItems, setInvoiceItems] = useState<InvoiceItem[]>([]);

    return (
        <div className="flex flex-col gap-8 pt-8">
            <div className="flex flex-row gap-8 items-center justify-between">
                <p className="text-xl font-bold">Položky faktury</p>
                <Button
                    color="primary"
                    variant="ghost"
                    onPress={() => {
                        setInvoiceItems([...invoiceItems, {
                            id: Date.now(),
                            description: "",
                            amount: 0,
                            price: 0}]);
                    }}
                >
                    Přidat položku
                </Button>
            </div>
            {invoiceItems.map(item => (
                <div key={item.id} className="flex flex-col gap-8 p-6 rounded-lg border-1 border-gray-200 p-8 bg-white shadow-sm text-sm">
                    <div className="flex flex-row gap-8 items-center justify-between">
                        <p className="text-xl font-medium float-left">Položka</p>
                        <Button
                            isIconOnly
                            color="danger"
                            endContent={<TrashIcon />}
                            onPress={() => {
                                setInvoiceItems(invoiceItems.filter((i) => i.id !== item.id));
                            }}
                        >
                        </Button>
                    </div>
                    <div className="w-full">
                        <Input
                            isRequired
                            errorMessage="Zadejte popis produkty"
                            label="Popis"
                            labelPlacement="outside-top"
                            name="item_desc"
                            type="text"
                            variant="bordered"
                        />
                    </div>
                    <div className="flex flex-row gap-6 items-center justify-between">
                        <Input
                            isRequired
                            errorMessage="Zadejte množštví produktu"
                            label="Množství"
                            labelPlacement="outside-top"
                            name="item_count"
                            type="text"
                            variant="bordered"
                        />
                        <Input
                            isRequired
                            errorMessage="Zadejte cenu produktu"
                            label="Cena/kus (Kč)"
                            labelPlacement="outside-top"
                            name="item_price"
                            type="text"
                            variant="bordered"
                        />
                    </div>
                </div>
            ))}
        </div>
    );
}
