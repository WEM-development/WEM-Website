import InvoiceEditor from "@/src/features/invoice/components/InvoiceEditor";
import { Invoice } from "@/src/features/invoice/Models";
import { Profiles } from "@/src/features/profile/server/Repository";

export default async function Page() {
    const testProfile = await Profiles.getProfileAsync("uFdOFqKOBy6XJGhFZaPn");

    const blankInvoice: Invoice = {
        id: "",
        publishDate: new Date(),
        paymentDate: new Date(),
        supplier: {
            ico: testProfile!.ico,
            name: testProfile!.supplierName,
            address: testProfile!.address,
            email: testProfile!.email
        },
        customer: {
            ico: "",
            name: "",
            address: "",
            email: ""
        },
        items: [],
        itemsPrice: 0,
        taxRate: 0.21,
        paymentDetails: {
            accountNumber: testProfile!.accountNumber,
            bankCode: testProfile!.bankCode,
            amount: 0,
            currency: "CZK",
            variableSymbol: 0,
            message: "",
            qrFetchURL: ""
        }
    };


    return (
        <div>
            <InvoiceEditor
                loadInvoice={blankInvoice}
                loadProfile={testProfile!}
            />
        </div>
    );
}
