"use client"

import { Button, Form, Input, Modal, ModalBody, ModalContent, ModalHeader, Textarea, useDisclosure } from "@heroui/react";
import { PaperAirplaneIcon, PrinterIcon } from "./Icons";
import { Invoice } from "../Models";
import { Profile } from "../../profile/Models";

interface InvoiceModalFormProps {
    invoice: Invoice,
    sender: Profile,
    onInvoicePress: (emailContent: any) => void;
}

function fillTemplate(template: string, data: Record<string, string>) {
  return template.replace(/{{(\w+)}}/g, (_, key) => data[key] ?? "");
}

export default function InvoiceModal({ invoice, sender, onInvoicePress }: InvoiceModalFormProps) {
    const { isOpen, onOpen, onOpenChange } = useDisclosure();

    const modalEmail = fillTemplate(sender.emailTemplate, {
        invoiceNumber: invoice.id,
        publishDate: invoice.publishDate.toLocaleDateString('cs-CZ'),
        paymentDate: invoice.paymentDate.toLocaleDateString('cs-CZ'),
        companyName: sender.supplierName,
        supportEmail: sender.email,
        invoiceTotal: invoice.paymentDetails.amount.toLocaleString('cs-CZ'),
        currentYear: new Date().getFullYear().toString()
    });

    return (
        <>
            <Button color="primary" endContent={<PaperAirplaneIcon />} onPress={onOpen}>
                Dokončit
            </Button>
            <Modal 
                isOpen={isOpen} 
                placement="top-center" 
                onOpenChange={onOpenChange}
                size="3xl"
                scrollBehavior="inside"
            >
                <ModalContent>
                    {(onClose) => (
                        <>
                            <ModalHeader className="flex flex-col gap-1">
                                Odeslání faktury
                            </ModalHeader>
                            <ModalBody className="">
                                {invoice.customer.email && (
                                    <>
                                        <div className="flex flex-col gap-2">
                                            <p className="text-sm text-gray-650">{`Odesílatel: ${sender.email}`}</p>
                                            <hr className="h-0.5 border-t-0 bg-neutral-100 dark:bg-white/10" />
                                            <p className="text-sm text-gray-650">{`Příjemce: ${invoice.customer.email}`}</p> 
                                            <hr className="h-0.5 border-t-0 bg-neutral-100 dark:bg-white/10" />
                                        </div>
                                        <Form
                                        className="w-full flex flex-col gap-8 p-4 justify-center"
                                        onSubmit={(e) => {
                                            e.preventDefault();
                                            let data = Object.fromEntries(new FormData(e.currentTarget));
                                            onInvoicePress({
                                                ... data,
                                                content: modalEmail
                                            });
                                            onClose();
                                        }}
                                        >
                                        <Input
                                            errorMessage="Zadejte předmět emailu"
                                            label="Předmět"
                                            labelPlacement="outside-top"
                                            name="header"
                                            variant="bordered"
                                            defaultValue={`Faktura č. ${invoice.id}`}
                                        />
                                        <div className="w-full max-h-96 overflow-auto border border-gray-200 rounded-lg p-4 bg-white" dangerouslySetInnerHTML={{
                                            __html: modalEmail
                                        }}>
                                        </div>
                                        <div className="flex flex-row justify-end gap-6">
                                            <Button 
                                                color="primary" 
                                                variant="ghost" 
                                                endContent={<PrinterIcon />}
                                                onPress={() => window.print() }>
                                                Tisknout
                                            </Button>
                                            <Button 
                                                color="primary"
                                                type="submit"
                                                endContent={<PaperAirplaneIcon />}>
                                                Odeslat
                                            </Button>
                                        </div>
                                    </Form>
                                </>)}
                                {!invoice.customer.email && (
                                    <div className="flex flex-col gap-8">
                                        <svg className="mx-auto h-16 w-16 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                                        </svg>
                                        <div className="text-center bg-red-50 border border-red-200 rounded p-4 mb-6">
                                            <p className="text-sm font-semibold text-gray-700 mb-2">E-mail nelze odeslat, protože nebyl zadán e-mail příjemce. Prosím, zadejte platnou e-mailovou adresu.</p>
                                        </div>
                                    </div>
                                )}
                            </ModalBody>
                        </>
                    )}
                </ModalContent>
            </Modal>
        </>
    );
}
