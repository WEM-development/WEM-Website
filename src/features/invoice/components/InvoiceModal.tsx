import { Button, Form, Input, Modal, ModalBody, ModalContent, ModalHeader, Textarea, useDisclosure } from "@heroui/react";
import { PaperAirplaneIcon, PrinterIcon } from "./Icons";

interface InvoiceModalFormProps {
    onInvoicePress: (emailContent: any) => void;
}

export default function InvoiceModal({ onInvoicePress }: InvoiceModalFormProps) {
    const { isOpen, onOpen, onOpenChange } = useDisclosure();

    return (
        <>
            <Button color="primary" endContent={<PaperAirplaneIcon />} onPress={onOpen}>
                Dokončit
            </Button>
            <Modal isOpen={isOpen} placement="top-center" onOpenChange={onOpenChange}>
                <ModalContent>
                    {(onClose) => (
                        <>
                            <ModalHeader className="flex flex-col gap-1">
                                Odeslání faktury
                            </ModalHeader>
                            <ModalBody className="">
                                <Form
                                    className="w-full flex flex-col gap-8 p-4 justify-center"
                                    onSubmit={(e) => {
                                        e.preventDefault();
                                        let data = Object.fromEntries(new FormData(e.currentTarget));
                                        onInvoicePress(data);
                                        onClose();
                                    }}
                                >
                                    <Input
                                        errorMessage="Zadejte předmět emailu"
                                        label="Předmět"
                                        labelPlacement="outside-top"
                                        name="header"
                                        variant="bordered"
                                    />
                                    <Textarea
                                        errorMessage="Zadejte obsah emailu"
                                        label="Obsah"
                                        labelPlacement="outside-top"
                                        name="content"
                                        variant="bordered"
                                    />
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
                            </ModalBody>
                        </>
                    )}
                </ModalContent>
            </Modal>
        </>
    );
}
