"use client"

import { Input, Textarea } from "@heroui/react";
import { MailIcon } from "../../invoice/components/Icons";
import { Client } from "../Models";

interface ClientFormProps {
    client: Client;
    onChange?: (client: Client) => void;
}

export default function ClientForm({client, onChange}: ClientFormProps) {
    return (
        <div className="flex flex-col space-y-4 border-solid">

            <Input
                isRequired
                errorMessage="Zadejte název společnosti"
                label="Název společnosti"
                labelPlacement="outside"
                name="name"
                placeholder="Welding Montáže"
                type="text"
                variant="bordered"
                value={client.name}
                onValueChange={(value: string) => {
                    if (onChange) {
                        onChange({
                            ...client,
                            name: value
                        });
                    }
                }}
            />

            <Input
                errorMessage="Zadejte email společnosti"
                label="Email společnosti"
                labelPlacement="outside"
                name="email"
                placeholder="info@weldingmontaze.cz"
                value={client.email || ""}
                endContent={<MailIcon className="text-2xl text-default-400 pointer-events-none shrink-0" />}
                type="email"
                variant="bordered"
                onValueChange={(value: string) => {
                    if (onChange) {
                        onChange({
                            ...client,
                            email: value
                        });
                    }
                }}
            />

            <Textarea
                isRequired
                errorMessage="Zadejte adresu společnosti"
                label="Adresa společnosti"
                labelPlacement="outside"
                name="address"
                placeholder="Budovatelů 1522/53b, Prostřední Suchá, 73564 Havířov"
                type="text"
                variant="bordered"
                value={client.address}
                onValueChange={(value: string) => {
                    if (onChange) {
                        onChange({
                            ...client,
                            address: value
                        });
                    }
                }}
            />
        </div>
    );
}