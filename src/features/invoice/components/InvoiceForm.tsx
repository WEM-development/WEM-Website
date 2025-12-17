"use client"

import { Button, Form, Input } from "@heroui/react";
import { useState } from "react";
import ClientFormFields from "../../company_client/components/ClientFormFields";
import { PaperAirplaneIcon, PrinterIcon } from "./Icons";
import InvoicePreview from "./InvoicePreview";
import { acceleratedValues } from "framer-motion";
import { Client } from "../../company_client/Models";
import { GetCompanyClient } from "../../company_client/server/Route";

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
            <div className="grid grid-cols-2 grid-rows-2 gap-4">
                <div>
                    <Form
                        className="w-full max-w-xs flex flex-col gap-4">
                        <p className="text-xl font-bold">Informace o klientovi</p>
                        <div className="flex flex-row gap-8 items-end justify-between">
                            <Input
                                className="item-aling-end"
                                isRequired
                                errorMessage="Zadejte IČO společnosti"
                                minLength={8}
                                maxLength={8}
                                label="IČO"
                                labelPlacement="outside"
                                name="ico"
                                placeholder="08604134"
                                type="text"
                                value={ico}
                                onValueChange={setIco}
                            />
                            <Button color="primary" variant="ghost" onPress={handleSearch}>Vyhledat</Button>
                        </div>
                        {showClientForm && <ClientFormFields client={searchedClient}/>}
                        <div className="flex gap-2">
                            <Button color="primary" type="submit">Submit</Button>
                            <Button type="reset" variant="flat">Reset</Button>
                        </div>
                    </Form>
                </div>
                <div className="flex flex-col gap-6">
                    <div className="flex flex-row gap-8 items-center justify-between">
                        <p className="text-xl font-medium float-left">Náhled faktury</p>
                        <div className="flex flex-row gap-8 ">
                            <Button color="primary" variant="ghost" endContent={<PrinterIcon />}>
                                Tisknout
                            </Button>
                            <Button color="primary" variant="ghost" endContent={<PaperAirplaneIcon />}>
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