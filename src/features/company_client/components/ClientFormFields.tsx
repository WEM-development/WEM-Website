"use client"

import { Button, Input, Textarea } from "@heroui/react";
import { MailIcon } from "../../invoice/components/Icons";
import { Client } from "../Models";

export default function ClientForm({client}: {client: Client | null}) {
    console.log("Client form");
    console.log(client);

    return (
        <div className="flex flex-col space-y-4 border-solid">

            <Input
                isRequired
                errorMessage="Zadejte název společnosti"
                label="Název společnosti"
                labelPlacement="outside"
                value={client !== null ? client.name : ""}
                name="name"
                placeholder="Welding Montáže"
                type="text"
                variant="bordered"
            />

            <Input
                errorMessage="Zadejte email společnosti"
                label="Email společnosti"
                labelPlacement="outside"
                value={client !== null ? client.email : ""}
                name="name"
                placeholder="info@weldingmontaze.cz"
                endContent={<MailIcon className="text-2xl text-default-400 pointer-events-none shrink-0" />}
                type="email"
                variant="bordered"
            />

            <Textarea
                isRequired
                errorMessage="Zadejte adresu společnosti"
                label="Adresa společnosti"
                labelPlacement="outside"
                value={client !== null ? client.address : ""}
                name="name"
                placeholder="Budovatelů 1522/53b, Prostřední Suchá, 73564 Havířov"
                type="text"
                variant="bordered"
            />
        </div>
    );
}