"use client"

import InvoiceEditor from "@/src/features/invoice/components/InvoiceEditor";
import { Invoice } from "@/src/features/invoice/Models";
import { Profiles } from "@/src/features/profile/server/Repository";
import { useEffect, useState } from "react";
import { Profile } from "@/src/features/profile/Models";
import { generateBlankInvoice, generateNextInvoiceId } from "@/src/features/invoice/server/Service";
import { useRouter, useSearchParams } from "next/navigation";
import { Suspense } from "react";
import { Invoices } from "@/src/features/invoice/server/Repository";
import { useAuth } from "@/src/features/auth/AuthContext";

function ManagementContent() {
    const [profile, setProfile] = useState<Profile | null>(null);
    const [invoice, setInvoice] = useState<Invoice | null>(null);
    const { user, loading } = useAuth();

    const router = useRouter();
    const searchParams = useSearchParams();

    const iid = searchParams.get('iid');

    useEffect(() => {
        if (loading) return;

        if (!user) {
            router.push('/management/auth');
            return;
        }

        const loadProfile = async () => {
            const profile = await Profiles.getProfileAsync(user.uid);
            
            if (profile) {
                setProfile(profile);

                const nextInvoiceId = await generateNextInvoiceId();
                const invoice = iid !== null ?
                    await Invoices.getInvoiceAsync(iid) : 
                    await generateBlankInvoice(profile, nextInvoiceId);

                setInvoice(invoice);
            } else {
                router.push(`/management/auth-error?uid=${user.uid}`);
            }
        };

        loadProfile();
    }, [user, loading, iid, router]);

    if (!profile || !invoice) {
        return <div className="container mx-auto px-4 py-8">Načítání...</div>; 
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

export default function Page() {
    return (
        <Suspense fallback={<div className="container mx-auto px-4 py-8">Načítání...</div>}>
            <ManagementContent />
        </Suspense>
    );
}
