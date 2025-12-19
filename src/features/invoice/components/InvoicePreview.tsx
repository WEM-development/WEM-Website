"use client"

import { Button, Image } from "@heroui/react";
import { Invoice } from "../Models";
import { PaperAirplaneIcon, PrinterIcon } from "./Icons";

export default function InvoicePreview({ invoice }: { invoice: Invoice | null }) {

    if (invoice === null) {
        return (
            <div className="flex flex-col gap-6">
                <div className="flex flex-row gap-8 items-center justify-between">
                    <p className="text-xl font-medium float-left">Náhled faktury</p>
                    <div className="flex flex-row gap-8 ">
                        <Button color="primary" variant="ghost" endContent={<PrinterIcon />}
                            onPress={() => window.print() }>
                            Tisknout
                        </Button>
                        <Button color="primary" endContent={<PaperAirplaneIcon />}>
                            Odeslat
                        </Button>
                    </div>
                </div>
                <div className="flex flex-col min-h-[297mm] bg-white w-full max-w-[210mm] rounded-lg border-1 border-gray-200 p-8 shadow-sm text-sm animate-pulse">
                    <div className="flex justify-between mb-8">
                        <div>
                            <div className="h-8 w-32 bg-gray-200 rounded mb-2"></div>
                            <div className="h-4 w-20 bg-gray-200 rounded"></div>
                        </div>
                        <div className="text-right space-y-2">
                            <div className="h-4 w-48 bg-gray-200 rounded ml-auto"></div>
                            <div className="h-4 w-48 bg-gray-200 rounded ml-auto"></div>
                        </div>
                    </div>

                    <div className="grid grid-cols-2 gap-8 mb-8">
                        <div>
                            <div className="h-5 w-24 bg-gray-200 rounded mb-3"></div>
                            <div className="space-y-2">
                                <div className="h-4 w-40 bg-gray-200 rounded"></div>
                                <div className="h-4 w-32 bg-gray-200 rounded"></div>
                                <div className="h-4 w-28 bg-gray-200 rounded"></div>
                                <div className="h-4 w-36 bg-gray-200 rounded"></div>
                            </div>
                        </div>
                        <div>
                            <div className="h-5 w-24 bg-gray-200 rounded mb-3"></div>
                            <div className="space-y-2">
                                <div className="h-4 w-40 bg-gray-200 rounded"></div>
                                <div className="h-4 w-32 bg-gray-200 rounded"></div>
                                <div className="h-4 w-28 bg-gray-200 rounded"></div>
                                <div className="h-4 w-36 bg-gray-200 rounded"></div>
                            </div>
                        </div>
                    </div>

                    <div className="grid grid-rows-2">
                        <div className="w-full h-auto flex flex-row gap-8 items-center justify-between">
                            <div className="float-left w-full h-auto p-6 bg-gray-50 rounded-lg">
                                <div className="grid grid-cols-4 grid-rows-2 gap-8">
                                    <div className="col-span-2 space-y-2">
                                        <div className="h-4 w-28 bg-gray-200 rounded"></div>
                                        <div className="h-4 w-40 bg-gray-200 rounded"></div>
                                    </div>
                                    <div className="col-span-1 space-y-2">
                                        <div className="h-4 w-20 bg-gray-200 rounded"></div>
                                        <div className="h-4 w-24 bg-gray-200 rounded"></div>
                                    </div>
                                    <div className="col-span-1 space-y-2">
                                        <div className="h-4 w-16 bg-gray-200 rounded"></div>
                                        <div className="h-4 w-20 bg-gray-200 rounded"></div>
                                    </div>
                                    <div className="col-span-4 space-y-2">
                                        <div className="h-4 w-36 bg-gray-200 rounded"></div>
                                        <div className="h-4 w-full bg-gray-200 rounded"></div>
                                    </div>
                                </div>
                            </div>
                            <div className="float-right">
                                <div className="w-[235px] h-[235px] bg-gray-200 rounded"></div>
                            </div>
                        </div>
                        
                        <div className="mt-4 flex-grow">
                            <div className="space-y-3">
                                <div className="flex justify-between pb-2 border-b-2 border-gray-300">
                                    <div className="h-4 w-16 bg-gray-200 rounded"></div>
                                    <div className="h-4 w-20 bg-gray-200 rounded"></div>
                                    <div className="h-4 w-20 bg-gray-200 rounded"></div>
                                    <div className="h-4 w-32 bg-gray-200 rounded"></div>
                                </div>
                                {[1, 2, 3].map((i) => (
                                    <div key={i} className="flex justify-between py-2 border-b border-gray-100">
                                        <div className="h-4 w-32 bg-gray-200 rounded"></div>
                                        <div className="h-4 w-12 bg-gray-200 rounded"></div>
                                        <div className="h-4 w-20 bg-gray-200 rounded"></div>
                                        <div className="h-4 w-24 bg-gray-200 rounded"></div>
                                    </div>
                                ))}
                                <div className="pt-4 border-t-2 border-gray-300 space-y-2">
                                    <div className="flex justify-between">
                                        <div className="h-4 w-40 bg-gray-200 rounded ml-auto mr-4"></div>
                                        <div className="h-4 w-24 bg-gray-200 rounded"></div>
                                    </div>
                                    <div className="flex justify-between">
                                        <div className="h-4 w-32 bg-gray-200 rounded ml-auto mr-4"></div>
                                        <div className="h-4 w-24 bg-gray-200 rounded"></div>
                                    </div>
                                    <div className="flex justify-between bg-gray-50 p-4 rounded">
                                        <div className="h-6 w-36 bg-gray-200 rounded ml-auto mr-4"></div>
                                        <div className="h-6 w-32 bg-gray-200 rounded"></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="mt-16 mb-8 grid grid-cols-2 gap-8">
                        <div></div>
                        <div className="flex flex-col items-center justify-end">
                            <div className="h-24 w-48 border-b-1 border-gray-300"></div>
                            <div className="h-3 w-40 bg-gray-200 rounded mt-2"></div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    const subTotal = invoice.items.reduce((sum, item) => sum + (item.amount * item.price), 0);
    const vatRate = 0.21;
    const vatAmount = subTotal * vatRate;
    const totalAmount = subTotal + vatAmount;

    return (
        <div className="flex flex-col gap-6">
            <div className="flex flex-row gap-8 items-center justify-between">
                <p className="text-xl font-medium float-left">Náhled faktury</p>
                <div className="flex flex-row gap-8 ">
                    <Button color="primary" variant="ghost" endContent={<PrinterIcon />}
                        onPress={() => window.print() }>
                        Tisknout
                    </Button>
                    <Button color="primary" endContent={<PaperAirplaneIcon />}>
                        Odeslat
                    </Button>
                </div>
            </div>
            <div id="print-area" className="flex flex-col min-h-[297mm] bg-white w-full max-w-[210mm] rounded-lg border-1 border-gray-200 p-8 shadow-sm text-sm relative">
                <div className="flex justify-between mb-8">
                    <div>
                        <h1 className="text-2xl font-bold text-gray-800">FAKTURA</h1>
                        <p className="text-gray-500">č. {invoice.id}</p>
                    </div>
                    <div className="text-right">
                        <p><span className="font-semibold">Datum vystavení:</span> {invoice.publishDate.toLocaleDateString('cs-CZ')}</p>
                        <p><span className="font-semibold">Datum splatnosti:</span> {invoice.paymentDate.toLocaleDateString('cs-CZ')}</p>
                    </div>
                </div>

                <div className="grid grid-cols-2 gap-8 mb-8">
                    <div>
                        <h3 className="font-bold text-gray-700 border-b pb-1 mb-2">Dodavatel</h3>
                        <p className="font-semibold">{invoice.supplier.name}</p>
                        <p>{invoice.supplier.address}</p>
                        <p>IČO: {invoice.supplier.ico}</p>
                    </div>
                    <div>
                        <h3 className="font-bold text-gray-700 border-b pb-1 mb-2">Odběratel</h3>
                        <p className="font-semibold">{invoice.customer.name}</p>
                        <p>{invoice.customer.address}</p>
                        <p>IČO: {invoice.customer.ico}</p>
                    </div>
                </div>

                <div className="grid grid-rows-2">
                    <div className="w-full h-auto flex flex-row gap-8 items-center justify-between">
                        <div className="float-left w-full h-auto p-6 bg-gray-50 rounded-lg grid grid-cols-4 grid-rows-2 gap-8">
                            <div className="col-span-2">
                                <p className="font-bold border-b border-gray-200 pb-1 mb-2 text-gray-700">Bankovní účet</p>
                                <p className="text-m">{invoice.paymentDetails.accountNumber}/{invoice.paymentDetails.bankCode}</p>
                            </div>
                            <div className="col-span-1">
                                <p className="font-bold border-b border-gray-200 pb-1 mb-2 text-gray-700">Var. symbol</p>
                                <p className="text-m">{invoice.paymentDetails.variableSymbol}</p>
                            </div>

                            <div className="col-span-1">
                                <p className="font-bold border-b border-gray-200 pb-1 mb-2 text-gray-700">Cena</p>
                                <p className="text-m">{invoice.paymentDetails.amount} {invoice.paymentDetails.currency}</p>
                            </div>

                            <div className="col-span-4">
                                <p className="font-bold border-b border-gray-200 pb-1 mb-2 text-gray-700">Zpráva pro příjemce</p>
                                <p className="text-m">{invoice.paymentDetails.message}</p>
                            </div>
                        </div>
                        <div className="float-right">
                            <Image
                                alt="QR platba"
                                src={invoice.paymentDetails.qrFetchURL}
                                width={235}
                            />
                        </div>
                    </div>
                    <div className="mt-4 flex-grow">
                        <table className="w-full text-left">
                            <thead>
                                <tr className="border-b-2 border-gray-300">
                                    <th className="py-2">Položka</th>
                                    <th className="py-2 text-right">Množství</th>
                                    <th className="py-2 text-right">Cena/ks</th>
                                    <th className="py-2 text-right">Celkem bez DPH</th>
                                </tr>
                            </thead>
                            <tbody>
                                {invoice.items.map((item, index) => (
                                    <tr key={index} className="border-b border-gray-100">
                                        <td className="py-2">{item.description}</td>
                                        <td className="py-2 text-right">{item.amount}</td>
                                        <td className="py-2 text-right">{item.price.toLocaleString('cs-CZ')} Kč</td>
                                        <td className="py-2 text-right font-medium">{(item.amount * item.price).toLocaleString('cs-CZ')} Kč</td>
                                    </tr>
                                ))}
                            </tbody>
                            <tfoot>
                                <tr className="border-t-2 border-gray-300">
                                    <td colSpan={3} className="py-2 text-right text-gray-600">Mezisoučet bez DPH:</td>
                                    <td className="py-2 text-right font-medium">
                                        {subTotal.toLocaleString('cs-CZ')} Kč
                                    </td>
                                </tr>
                                <tr>
                                    <td colSpan={3} className="py-2 text-right text-gray-600">DPH (21%):</td>
                                    <td className="py-2 text-right font-medium">
                                        {vatAmount.toLocaleString('cs-CZ')} Kč
                                    </td>
                                </tr>
                                <tr className="bg-gray-50">
                                    <td colSpan={3} className="py-4 text-right font-bold text-lg">Celkem k úhradě:</td>
                                    <td className="py-4 text-right font-bold text-lg text-primary">
                                        {totalAmount.toLocaleString('cs-CZ')} Kč
                                    </td>
                                </tr>
                            </tfoot>
                        </table>
                    </div>
                </div>

                <div className="mt-16 mb-8 grid grid-cols-2 gap-8">
                    <div>
                        {/* Optional: Notes or payment details */}
                    </div>
                    <div className="flex flex-col items-center justify-end">
                        <div className="h-24 w-48 border-b-1 border-gray-400 mb-2"></div>
                        <p className="text-sm text-gray-500">Podpis a razítko dodavatele</p>
                    </div>
                </div>
            </div>
        </div>
    );
}
