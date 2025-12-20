"use client"

import InvoiceEditor from "@/src/features/invoice/components/InvoiceEditor";
import { Invoice } from "@/src/features/invoice/Models";
import { Profiles } from "@/src/features/profile/server/Repository";
import { useEffect, useState } from "react";
import { Profile } from "@/src/features/profile/Models";

export default function Page() {
    const [profile, setProfile] = useState<Profile | null>(null);
    const [invoice, setInvoice] = useState<Invoice | null>(null);

    useEffect(() => {
        const loadProfile = async () => {
            const testProfile = await Profiles.getProfileAsync("uFdOFqKOBy6XJGhFZaPn");
            
            if (testProfile) {
                setProfile(testProfile);
                
                const blankInvoice: Invoice = {
                    id: "",
                    publishDate: new Date(),
                    paymentDate: new Date(),
                    supplier: {
                        ico: testProfile.ico,
                        name: testProfile.supplierName,
                        address: testProfile.address,
                        email: testProfile.email
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
                        accountNumber: testProfile.accountNumber,
                        bankCode: testProfile.bankCode,
                        amount: 0,
                        currency: "CZK",
                        variableSymbol: 0,
                        message: "",
                        qrFetchURL: ""
                    }
                };
                
                setInvoice(blankInvoice);
            }
        };
        
        loadProfile();
    }, []);

    if (!profile || !invoice) {
        return <div className="container mx-auto px-4 py-8">Loading...</div>;
    }

    return (
        <div>
            <InvoiceEditor
                loadInvoice={invoice}
                loadProfile={profile}
            />
        </div>
    );
}
