import InvoiceEditor from "@/src/features/invoice/components/InvoiceEditor";
import { Invoices } from "@/src/features/invoice/server/Repository";

export default async function Page() {
    const testInvoice = await Invoices.getInvoiceAsync("11111");

    return (
        <div>
            <InvoiceEditor
                loadInvoice={testInvoice}
            />
        </div>
    );
}
