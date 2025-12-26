"use client"

import { Button, Form, Input } from "@heroui/react";
import { InvoiceItem } from "../Models";
import { TrashIcon } from "./Icons";
import { useState } from "react";
import { InvoiceClientScheme } from "../../firebase/collections";

interface InvoiceItemsFormProps {
    loadItems: InvoiceItem[];
    onChange: (items: InvoiceItem[]) => void;
}
        <div id="print-area" className="flex flex-col min-h-[297mm] bg-white w-full max-w-[210mm]"></div>

export default function InvoiceItemsForm({ loadItems, onChange }: InvoiceItemsFormProps) {
    const [invoiceItems, setInvoiceItems] = useState<InvoiceItem[]>(loadItems);

    return (
        <div className="flex flex-col gap-8 pt-8">
            <div className="flex flex-row gap-8 items-center justify-between">
                <p className="text-xl font-bold">Položky faktury</p>
                <Button
                    color="primary"
                    variant="ghost"
                    onPress={() => {
                        setInvoiceItems([...invoiceItems, {
                            id: invoiceItems.length + 1,
                            description: "",
                            amount: 0,
                            price: 0}]);
                        onChange([...invoiceItems, {
                            id: invoiceItems.length + 1,
                            description: "",
                            amount: 0,
                            price: 0}]
                        );
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
                                onChange(invoiceItems.filter((i) => i.id !== item.id));
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
                            defaultValue={item.description}
                            onValueChange={(value: string) => {
                                item.description = value;
                                onChange(invoiceItems);
                            }}
                        />
                    </div>
                    <div className="flex flex-row gap-6 items-center justify-between">
                        <Input
                            isRequired
                            errorMessage="Zadejte množštví produktu"
                            label="Množství"
                            labelPlacement="outside-top"
                            name="item_count"
                            type="number"
                            variant="bordered"
                            defaultValue={`${item.amount}`}
                            onValueChange={(value: string) => {
                                item.amount = parseInt(value);
                                onChange(invoiceItems);
                            }}
                        />
                        <Input
                            isRequired
                            errorMessage="Zadejte cenu produktu"
                            label="Cena/kus (Kč)"
                            labelPlacement="outside-top"
                            name="item_price"
                            type="number"
                            variant="bordered"
                            defaultValue={`${item.price}`}
                            onValueChange={(value: string) => {
                                item.price = parseFloat(value);
                                onChange(invoiceItems);
                            }}
                        />
                    </div>
                </div>
            ))}
        </div>
    );
}
