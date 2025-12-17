import { Users } from "@/src/features/user/server/Repository";
import { GetCompanyClient } from "@/src/features/company_client/server/Route";
import InvoiceForm from "@/src/features/invoice/components/InvoiceForm";

export default async function Page() {
    const test = await GetCompanyClient("08604134");
    console.log(test);

    const users = await Users.getUsersAsync();

    return (
        <div className="container mx-auto px-4 py-8">
            <InvoiceForm />
        </div>
    );
}
