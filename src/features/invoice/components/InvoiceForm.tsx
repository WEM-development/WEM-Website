"use client"

import { Button, DatePicker, Form, Input, InputOtp } from "@heroui/react";
import { useState } from "react";
import ClientFormFields from "../../company_client/components/ClientFormFields";
import { Client } from "../../company_client/Models";
import { GetCompanyClient } from "../../company_client/server/Route";

interface InvoiceFormProps {
    onSubmit: (invoice: {}) => void;
}

export default function InvoiceForm({ onSubmit }: InvoiceFormProps) {
    const [ico, setIco] = useState("");
    const [showClientForm, setShowClientForm] = useState(false);
    const [searchedClient, setSearchedClient] = useState<Client | null>(null);

    const handleSearch = async () => {
        const client = await GetCompanyClient(ico);
        setSearchedClient(client);
        setShowClientForm(true);
    };

    return (
        <Form
            onSubmit={(e) => {
                e.preventDefault();
                let data = Object.fromEntries(new FormData(e.currentTarget));
                onSubmit(data);
            }}
        >
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
                    <div className="flex flex-row gap-4 items-center justify-between pt-8">
                            <p className="text-sm font-medium">IČO</p>
                            <InputOtp
                                isRequired
                                errorMessage="Zadejte IČO společnosti"
                                label="IČO"
                                length={8}
                                size="sm"
                                name="ico"
                                placeholder="Enter code"
                                value={ico}
                                variant="bordered"
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
                <Button type="reset" variant="flat">Reset</Button>
                <Button color="primary" type="submit">Vložit</Button>
            </div>
        </Form>
    );
}