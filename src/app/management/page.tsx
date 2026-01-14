"use client"

import { Profiles } from "@/features/profile/server/Repository";
import { useEffect, useState } from "react";
import { Profile } from "@/features/profile/Models";
import { useRouter, useSearchParams } from "next/navigation";
import { Suspense } from "react";
import { useAuth } from "@/features/auth/AuthContext";
import { Card, CardBody, CardHeader, Table, TableHeader, TableColumn, TableBody, TableRow, TableCell, Chip, Skeleton } from "@heroui/react";
import { Invoice } from "@/features/invoice/Models";
import { Invoices } from "@/features/invoice/server/Repository";

function ManagementContent() {
    const [profile, setProfile] = useState<Profile | null>(null);
    const [invoices, setInvoices] = useState<Invoice[]>([]);
    const [todayCount, setTodayCount] = useState<number>(0);
    const [loading, setLoading] = useState<boolean>(true);
    const { user, loading: authLoading } = useAuth();

    const router = useRouter();
    const searchParams = useSearchParams();
    const iid = searchParams.get('iid');

    useEffect(() => {
        if (authLoading) return;

        if (!user) {
            router.push('/management/auth');
            return;
        }

        const loadProfile = async () => {
            const profile = await Profiles.getProfileAsync(user.uid);
            if (profile) {
                setProfile(profile);
            } else {
                router.push(`/management/auth-error?uid=${user.uid}`);
            }
        };

        loadProfile();
    }, [user, authLoading, iid, router]);

    useEffect(() => {
        if (!profile) return;

        const loadInvoices = async () => {
            setLoading(true);
            try {
                const [allInvoices, todayInvoices] = await Promise.all([
                    await Invoices.getAllInvoicesAsync(),
                    0
                ]);

                setInvoices(allInvoices);
                setTodayCount(todayInvoices);
            } catch (error) {
                console.error("Error loading invoices:", error);
            } finally {
                setLoading(false);
            }
        };

        loadInvoices();
    }, [profile]);

    const formatDate = (date: Date) => {
        return new Date(date).toLocaleDateString('cs-CZ');
    };

    const formatCurrency = (amount: number) => {
        return new Intl.NumberFormat('cs-CZ', { style: 'currency', currency: 'CZK' }).format(amount);
    };

    // Skeleton loading UI
    if (!profile || loading) {
        return (
            <div className="container mx-auto px-4 py-8">
                <Skeleton className="w-64 h-9 rounded-lg mb-8" />
                
                {/* Statistics Cards Skeleton */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
                    {[...Array(4)].map((_, i) => (
                        <Card key={i}>
                            <CardHeader className="pb-0 pt-4 px-4">
                                <Skeleton className="w-32 h-4 rounded-lg" />
                            </CardHeader>
                            <CardBody className="py-2 px-4">
                                <Skeleton className="w-24 h-9 rounded-lg" />
                            </CardBody>
                        </Card>
                    ))}
                </div>

                {/* Table Skeleton */}
                <div className="flex flex-col gap-8">
                    <div className="flex flex-row gap-8 items-center justify-between">
                        <Skeleton className="w-48 h-7 rounded-lg" />
                        <Skeleton className="w-36 h-10 rounded-lg" />
                    </div>
                    <Card>
                        <CardBody className="p-0">
                            <div className="p-4 space-y-3">
                                {[...Array(5)].map((_, i) => (
                                    <div key={i} className="flex gap-4">
                                        <Skeleton className="w-24 h-8 rounded-lg" />
                                        <Skeleton className="flex-1 h-8 rounded-lg" />
                                        <Skeleton className="w-32 h-8 rounded-lg" />
                                        <Skeleton className="w-32 h-8 rounded-lg" />
                                        <Skeleton className="w-24 h-8 rounded-lg" />
                                        <Skeleton className="w-28 h-8 rounded-lg" />
                                    </div>
                                ))}
                            </div>
                        </CardBody>
                    </Card>
                </div>
            </div>
        );
    }

    const totalRevenue = invoices.reduce((sum, inv) => sum + inv.paymentDetails.amount, 0);
    const pendingInvoices = invoices.filter(inv => inv.paymentDate > new Date()).length;

    return (
        <div className="container mx-auto px-4 py-8">
            <h1 className="text-3xl font-bold mb-8">Dashboard faktur</h1>
            
            {/* Statistics Cards */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
                <Card>
                    <CardHeader className="pb-0 pt-4 px-4">
                        <h4 className="text-sm font-semibold text-gray-600">Celkem faktur</h4>
                    </CardHeader>
                    <CardBody className="py-2 px-4">
                        <p className="text-3xl font-bold">{invoices.length}</p>
                    </CardBody>
                </Card>

                <Card>
                    <CardHeader className="pb-0 pt-4 px-4">
                        <h4 className="text-sm font-semibold text-gray-600">Dnes vytvořeno</h4>
                    </CardHeader>
                    <CardBody className="py-2 px-4">
                        <p className="text-3xl font-bold">{todayCount}</p>
                    </CardBody>
                </Card>

                <Card>
                    <CardHeader className="pb-0 pt-4 px-4">
                        <h4 className="text-sm font-semibold text-gray-600">Čeká na platbu</h4>
                    </CardHeader>
                    <CardBody className="py-2 px-4">
                        <p className="text-3xl font-bold">{pendingInvoices}</p>
                    </CardBody>
                </Card>

                <Card>
                    <CardHeader className="pb-0 pt-4 px-4">
                        <h4 className="text-sm font-semibold text-gray-600">Celkový obrat</h4>
                    </CardHeader>
                    <CardBody className="py-2 px-4">
                        <p className="text-3xl font-bold">{formatCurrency(totalRevenue)}</p>
                    </CardBody>
                </Card>
            </div>

            {/* Invoices Table */}
            <div className="flex flex-col gap-8">
                <div className="flex flex-row gap-8 items-center justify-between">
                    <h2 className="text-xl font-bold float-left">Seznam faktur</h2>
                    <button
                        onClick={() => router.push('/management/invoice-editor')}
                        className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors float-right"
                    >
                        + Nová faktura
                    </button>
                </div>
                <div>
                    <Table aria-label="Tabulka faktur">
                        <TableHeader>
                            <TableColumn>ID FAKTURY</TableColumn>
                            <TableColumn>ZÁKAZNÍK</TableColumn>
                            <TableColumn>DATUM VYSTAVENÍ</TableColumn>
                            <TableColumn>DATUM SPLATNOSTI</TableColumn>
                            <TableColumn>ČÁSTKA</TableColumn>
                            <TableColumn>STATUS</TableColumn>
                        </TableHeader>
                        <TableBody>
                            {invoices.map((invoice) => {
                                const isPaid = new Date(invoice.paymentDate) < new Date();
                                return (
                                    <TableRow
                                        key={invoice.id}
                                        className="cursor-pointer hover:bg-gray-50 transition-colors"
                                        onClick={() => router.push(`/management/invoice-editor?iid=${invoice.id}`)}
                                    >
                                        <TableCell className="font-mono text-sm">{invoice.id}</TableCell>
                                        <TableCell>{invoice.customer.name}</TableCell>
                                        <TableCell>{formatDate(invoice.publishDate)}</TableCell>
                                        <TableCell>{formatDate(invoice.paymentDate)}</TableCell>
                                        <TableCell className="font-semibold">{formatCurrency(invoice.paymentDetails.amount)}</TableCell>
                                        <TableCell>
                                            <Chip 
                                                color={isPaid ? "success" : "warning"}
                                                variant="flat"
                                                size="sm"
                                            >
                                                {isPaid ? "Zaplaceno" : "Čeká na platbu"}
                                            </Chip>
                                        </TableCell>
                                    </TableRow>
                                );
                            })}
                        </TableBody>
                    </Table>
                </div>
            </div>
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
