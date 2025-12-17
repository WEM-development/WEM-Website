"use client"

import { Image } from "@heroui/react";
import { Invoice } from "../Models";

export default function InvoicePreview({ invoice }: { invoice?: Invoice }) {

    if (invoice === undefined) {
        return (
            <div className="flex flex-col h-lvh bg-white w-210px rounded-lg border-1 border-gray-200 p-8">
                {"Tato faktura je prázdná :("}
            </div>
        );
    }

    const subTotal = invoice.items.reduce((sum, item) => sum + (item.amount * item.price), 0);
    const vatRate = 0.21;
    const vatAmount = subTotal * vatRate;
    const totalAmount = subTotal + vatAmount;

    return (
        <div className="flex flex-col min-h-[297mm] bg-white w-full max-w-[210mm] rounded-lg border-1 border-gray-200 p-8 shadow-sm text-sm relative">
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
                    <p>{invoice.supplier.email}</p>
                </div>
                <div>
                    <h3 className="font-bold text-gray-700 border-b pb-1 mb-2">Odběratel</h3>
                    <p className="font-semibold">{invoice.customer.name}</p>
                    <p>{invoice.customer.address}</p>
                    <p>IČO: {invoice.customer.ico}</p>
                    <p>{invoice.customer.email}</p>
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
                            width={275}
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
    );
}
