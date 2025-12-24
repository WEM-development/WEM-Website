"use client"

import { useRouter } from "next/navigation";
import { useState } from "react";
import { browserPopupRedirectResolver, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { auth } from "@/src/features/firebase/config";
import { Profiles } from "@/src/features/profile/server/Repository";
import WEMLogo from "@/src/components/common/WEMLogo";

export default function Page() {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const router = useRouter();

    const handleGoogleSignIn = async () => {
        setIsLoading(true);
        setError(null);

        try {
            const authProvider = new GoogleAuthProvider();
            const result = await signInWithPopup(auth, authProvider, browserPopupRedirectResolver);
            
            const profile = await Profiles.getProfileAsync(result.user.uid);
            console.log(profile);
            
            if (profile) {
                router.push(`/management?uid=${result.user.uid}`);
            } else {
                router.push(`/management/auth-error?uid=${result.user.uid}`);
            }
        } catch (error: any) {
            console.error('Auth error:', error);
            setError(error.message || 'Přihlášení se nezdařilo');
            setIsLoading(false);
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen py-20 px-4">
            <div className="max-w-md w-full bg-white shadow-lg rounded-lg p-8 text-center">
                <div className="flex flex-row justify-center mb-6">
                    <WEMLogo width={72} height={72} />
                </div>
                
                <h1 className="text-2xl font-bold text-gray-900 mb-4">
                    Přihlášení
                </h1>
                
                <p className="text-gray-600 mb-6">
                    Pro přístup do systému se přihlaste pomocí Google účtu
                </p>
                
                {error && (
                    <div className="bg-red-50 border border-red-200 rounded p-4 mb-6">
                        <p className="text-sm text-red-600">{error}</p>
                    </div>
                )}
                
                <button
                    onClick={handleGoogleSignIn}
                    disabled={isLoading}
                    className="w-full bg-white border border-gray-300 text-gray-700 px-6 py-3 rounded-lg hover:bg-gray-50 transition-colors flex items-center justify-center gap-3 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                    {isLoading ? (
                        <span>Přihlašování...</span>
                    ) : (
                        <>
                            <svg className="w-5 h-5" viewBox="0 0 24 24">
                                <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                                <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                                <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                                <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                            </svg>
                            <span>Přihlásit se přes Google</span>
                        </>
                    )}
                </button>

                <div className="mt-6">
                    <a
                        href="/"
                        className="text-sm text-blue-600 hover:underline"
                    >
                        Zpět na hlavní stránku
                    </a>
                </div>
            </div>
        </div>
    );
}
