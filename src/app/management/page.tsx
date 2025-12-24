"use client"

import InvoiceEditor from "@/src/features/invoice/components/InvoiceEditor";
import { Invoice } from "@/src/features/invoice/Models";
import { Profiles } from "@/src/features/profile/server/Repository";
import { useEffect, useState } from "react";
import { Profile } from "@/src/features/profile/Models";
import { generateBlankInvoice, generateNextInvoiceId } from "@/src/features/invoice/server/Service";
import { useRouter, useSearchParams } from "next/navigation";
import { Suspense } from "react";
import { auth } from "@/src/features/firebase/config";

function ManagementContent() {
    const [profile, setProfile] = useState<Profile | null>(null);
    const [invoice, setInvoice] = useState<Invoice | null>(null);

    const router = useRouter();
    const searchParams = useSearchParams();
    const uid = searchParams.get('uid');

    useEffect(() => {
        if (!uid || !auth.currentUser) {
            router.push('/management/auth');
            return;
        }

        const loadProfile = async () => {
            const profile = await Profiles.getProfileAsync(uid);
            
            if (profile) {
                setProfile(profile);

                const nextInvoiceId = await generateNextInvoiceId();
                const invoice = await generateBlankInvoice(profile, nextInvoiceId);

                setInvoice(invoice);
            } else {
                router.push(`/management/auth-error?uid=${uid}`);
            }
        };

        loadProfile();
    }, [uid, router]);

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
