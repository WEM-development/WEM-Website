"use client"

import { Button, DatePicker, Form, Input } from "@heroui/react";
import { useState } from "react";
import ClientFormFields from "../../company_client/components/ClientFormFields";
import { PaperAirplaneIcon, PrinterIcon } from "./Icons";
import InvoicePreview from "./InvoicePreview";
import { acceleratedValues } from "framer-motion";
import { Client } from "../../company_client/Models";
import { GetCompanyClient } from "../../company_client/server/Route";
import InvoiceItemsForm from "./InvoiceItemsForm";

// interface InvoiceFormProps {
//   onSubmit: (invoice: Invoice) => void;
// }

export default function InvoiceForm() { //({ onSubmit }: InvoiceFormProps) {
    const mockupInvoice = {
        id: "2024001",
        publishDate: new Date(),
        paymentDate: new Date(new Date().setDate(new Date().getDate() + 14)),
        supplier: {
            ico: "12345678",
            name: "Moje Firma s.r.o.",
            address: "Hlavní 123, 110 00 Praha",
            email: "info@mojefirma.cz"
        },
        customer: {
            ico: "87654321",
            name: "Zákazník a.s.",
            address: "Vedlejší 456, 602 00 Brno",
            email: "fakturace@zakaznik.cz"
        },
        items: [
            {
                description: "Konzultační služby",
                amount: 100,
                price: 1500
            },
            {
                description: "Grafické práce",
                amount: 50,
                price: 1200
            },
            {
                description: "Správa serveru",
                amount: 10,
                price: 5000
            }
        ],
        paymentDetails: {
            accountNumber: 222885,
            bankCode: 5500,
            amount: 250,
            currency: "CZK",
            variableSymbol: 333,
            message: "Testovací zpráva",
            qrFetchURL: "https://api.paylibo.com/paylibo/generator/czech/image?accountNumber=222885&bankCode=5500&amount=250.00&currency=CZK&vs=333&branding=false&message=FOND%20HUMANITY%20CCK"
        }
    };

    const [ico, setIco] = useState("");
    const [showClientForm, setShowClientForm] = useState(false);
    const [searchedClient, setSearchedClient] = useState<Client | null>(null);

    const handleSearch = async () => {
        const client = await GetCompanyClient(ico);
        setSearchedClient(client);
        setShowClientForm(true);

        console.log(client);
    };

    return (
        <div className="flex flex-col gap-6">
            <div className="grid grid-cols-2 grid-rows-2 gap-16">
                <div className="w-full flex flex-col gap-4">
                    <Form>
                        <div className="w-full flex flex-row gap-8 justify-between items-start">
                            <div className="flex-1 flex-column gap-4">
                                <p className="text-xl font-bold">Informace o faktuře</p>
                                <div className="flex flex-col gap-8 items-end justify-between pt-8">
                                    <Input
                                        isRequired
                                        errorMessage="Zadejte číslo faktury"
                                        label="Číslo faktury"
                                        labelPlacement="outside-top"
                                        name="id"
                                        type="text"
                                        variant="bordered"
                                    />
                                    <DatePicker
                                        isRequired
                                        label="Datum vystavení"
                                        name="publishDate"
                                        labelPlacement="outside"
                                        variant="bordered"
                                    />
                                    <DatePicker
                                        isRequired
                                        label="Datum splatnosti"
                                        name="paymentDate"
                                        labelPlacement="outside"
                                        variant="bordered"
                                    />
                                </div>
                            </div>
                            <div className="flex-1 flex-column gap-4">
                                <p className="text-xl font-bold">Informace o klientovi</p>
                                <div className="flex flex-row gap-8 items-end justify-between pt-8">
                                    <Input
                                        isRequired
                                        errorMessage="Zadejte IČO společnosti"
                                        minLength={8}
                                        maxLength={8}
                                        label="IČO"
                                        labelPlacement="outside"
                                        name="ico"
                                        placeholder="08604134"
                                        type="text"
                                        variant="bordered"
                                        value={ico}
                                        onValueChange={setIco}
                                    />
                                    <Button color="primary" variant="ghost" onPress={handleSearch}>Vyhledat</Button>
                                </div>
                                <div className="pt-8">
                                    {showClientForm && <ClientFormFields client={searchedClient}/>}
                                </div>
                            </div>
                        </div>
                        <div className="flex gap-2">
                            <Button type="reset" variant="flat">Zrušit</Button>
                            <Button color="primary" type="submit">Uložit</Button>
                        </div>
                    </Form>
                    <InvoiceItemsForm />
                </div>
                <div className="flex flex-col gap-6">
                    <div className="flex flex-row gap-8 items-center justify-between">
                        <p className="text-xl font-medium float-left">Náhled faktury</p>
                        <div className="flex flex-row gap-8 ">
                            <Button color="primary" variant="ghost" endContent={<PrinterIcon />}
                                onPress={() => window.print() }>
                                Tisknout
                            </Button>
                            <Button color="primary" endContent={<PaperAirplaneIcon />}>
                                Odeslat
                            </Button>
                        </div>
                    </div>
                    <InvoicePreview
                        invoice={mockupInvoice} />
                </div>
            </div>
        </div>
    );
}