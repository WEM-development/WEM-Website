"use server"

import { Invoice } from "../Models";
import { Invoices } from "./Repository";
import { revalidateTag, unstable_cache } from "next/cache";

export const getAllInvoicesAsyncCache = unstable_cache(
    async () => await Invoices.getAllInvoicesAsync(),
    ["getAllInvoicesAsync"],
    {
        tags: ["getAllInvoicesAsync"],
        revalidate: 60 * 60 * 24
    }
);

export const addInvoiceAsync = async (invoice: Invoice) => {
    await Invoices.addInvoiceAsync(invoice);
    revalidateTag("getAllInvoicesAsync", { expire: 0 });
};