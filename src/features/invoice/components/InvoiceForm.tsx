"use client"

import { Button, DatePicker, DateValue, Form, Input, InputOtp } from "@heroui/react";
import { CalendarDate } from "@internationalized/date";
import { useState } from "react";
import ClientFormFields from "../../company_client/components/ClientFormFields";
import { Client } from "../../company_client/Models";
import { GetCompanyClient } from "../../company_client/server/Route";
import { Invoice } from "../Models";

interface InvoiceFormProps {
    invoice: Invoice;
    onChange: (invoice: Invoice) => void;
}

export default function InvoiceForm({ invoice, onChange }: InvoiceFormProps) {
    const [ico, setIco] = useState("");
    const [searchedClient, setSearchedClient] = useState<Client | null>({
        ico: "",
        name: "",
        address: ""
    });

    const handleSearch = async () => {
        const client = await GetCompanyClient(ico);
        setSearchedClient(client);
        if (client) {
            onChange({
                ...invoice,
                customer: client
            });
        }
    };

    return (
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
                            defaultValue={invoice.id}
                            name="id"
                            type="number"
                            variant="bordered"
                            onValueChange={(value: string) => {
                                onChange({
                                    ...invoice,
                                    id: value,
                                    paymentDetails: { 
                                        ...invoice.paymentDetails,
                                        variableSymbol: value
                                    }
                                });
                            }}
                        />
                        <DatePicker
                            isRequired
                            label="Datum vystavení"
                            name="publishDate"
                            labelPlacement="outside"
                            variant="bordered"
                            defaultValue={new CalendarDate(new Date().getFullYear(), new Date().getMonth() + 1, new Date().getDate())}
                            onChange={(value: DateValue | null) => {
                                if (value) {
                                    onChange({
                                        ...invoice,
                                        publishDate: new Date(value.year, value.month - 1, value.day)
                                    });
                                }
                            }}
                        />
                        <DatePicker
                            isRequired
                            label="Datum splatnosti"
                            name="paymentDate"
                            labelPlacement="outside"
                            variant="bordered"
                            onChange={(value: DateValue | null) => {
                                if (value) {
                                    onChange({
                                        ...invoice,
                                        paymentDate: new Date(value.year, value.month - 1, value.day)
                                    });
                                }
                            }}
                        />
                        <Input
                            errorMessage="Zadejte číslo objednávky"
                            label="Číslo objednávky"
                            labelPlacement="outside-top"
                            name="identificationOrder"
                            type="string"
                            variant="bordered"
                            onValueChange={(value: string) => {
                                onChange({
                                    ...invoice,
                                    identificationOrder: value
                                });
                            }}
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
                                onValueChange={(value: string) => {
                                    setIco(value);
                                    onChange({
                                        ...invoice,
                                        customer: {
                                            ...invoice.customer,
                                            ico: value
                                        }
                                    });
                                }}
                                onComplete={handleSearch}
                            />
                    </div>
                    <div className="pt-8">
                        {<ClientFormFields 
                            client={invoice.customer}
                            onChange={(client: Client) => {
                                onChange({
                                    ...invoice,
                                    customer: client
                                });
                            }}
                        />}
                    </div>
                </div>
            </div>
            <div className="flex gap-2">
                <Button type="reset" variant="flat">Resetovat</Button>
            </div>
        </Form>
    );
}