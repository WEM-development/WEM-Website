"use client"

import { useSearchParams } from "next/navigation";
import { Suspense } from "react";

function AuthContent() {
    const searchParams = useSearchParams();
    const uid = searchParams.get('uid');

    return (
        <div className="flex items-center justify-center min-h-screen py-20 px-4">
            <div className="max-w-md w-full bg-white shadow-lg rounded-lg p-8 text-center">
                <div className="mb-6">
                    <svg className="mx-auto h-16 w-16 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                    </svg>
                </div>
                
                <h1 className="text-2xl font-bold text-gray-900 mb-4">
                    Účet nenalezen
                </h1>
                
                <p className="text-gray-600 mb-6">
                    Váš účet zatím nebyl nastaven. Kontaktujte prosím administrátora pro manuální přidání vašeho účtu do systému.
                </p>
                
                {uid && (
                    <div className="bg-gray-100 rounded p-4 mb-6">
                        <p className="text-sm text-gray-500 mb-1">ID uživatele:</p>
                        <p className="text-sm font-mono text-gray-800 break-all">{uid}</p>
                    </div>
                )}
                
                <div className="bg-blue-50 border border-blue-200 rounded p-4 mb-6">
                    <p className="text-sm font-semibold text-gray-700 mb-2">Kontaktní údaje:</p>
                    <p className="text-sm text-gray-600 mb-1">
                        <a href="mailto:msestaubr@gmail.com" className="text-blue-600 hover:underline">
                            msestaubr@gmail.com
                        </a>
                    </p>
                    <p className="text-sm text-gray-600">
                        <a href="tel:+420775128978" className="text-blue-600 hover:underline">
                            +420 775 128 978
                        </a>
                    </p>
                </div>
                
                <a
                    href="/"
                    className="inline-block bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
                >
                    Zpět na hlavní stránku
                </a>
            </div>
        </div>
    );
}

export default function Page() {
    return (
        <Suspense fallback={<div className="flex items-center justify-center min-h-screen">Loading...</div>}>
            <AuthContent />
        </Suspense>
    );
}