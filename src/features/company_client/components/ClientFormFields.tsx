"use client"

import { Input, Textarea } from "@heroui/react";
import { MailIcon } from "../../invoice/components/Icons";
import { Client } from "../Models";

interface ClientFormProps {
    client: Client | null;
    onChange?: (client: Client) => void;
}

export default function ClientForm({client, onChange}: ClientFormProps) {
    if (client !== null) {
        return (
            <div className="flex flex-col space-y-4 border-solid">

                <Input
                    isRequired
                    isReadOnly
                    errorMessage="Zadejte název společnosti"
                    label="Název společnosti"
                    labelPlacement="outside"
                    value={client.name}
                    name="name"
                    placeholder="Welding Montáže"
                    type="text"
                />

                <Input
                    errorMessage="Zadejte email společnosti"
                    label="Email společnosti"
                    labelPlacement="outside"
                    name="email"
                    value={client.email || ""}
                    placeholder="info@weldingmontaze.cz"
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
                    isReadOnly
                    errorMessage="Zadejte adresu společnosti"
                    label="Adresa společnosti"
                    labelPlacement="outside"
                    value={client.address}
                    name="address"
                    placeholder="Budovatelů 1522/53b, Prostřední Suchá, 73564 Havířov"
                    type="text"
                />
            </div>
        );
    }

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
                onValueChange={(value: string) => {
                    if (onChange) {
                        onChange({
                            ico: "",
                            name: value,
                            address: "",
                            email: ""
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
                endContent={<MailIcon className="text-2xl text-default-400 pointer-events-none shrink-0" />}
                type="email"
                variant="bordered"
                onValueChange={(value: string) => {
                    if (onChange) {
                        onChange({
                            ico: "",
                            name: "",
                            address: "",
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
                onValueChange={(value: string) => {
                    if (onChange) {
                        onChange({
                            ico: "",
                            name: "",
                            address: value,
                            email: ""
                        });
                    }
                }}
            />
        </div>
    );
}