export type CollectionField = {
    type: any,
    value?: any
};

export interface Collection {
    name: string,
    fields: Record<string, CollectionField>
};

export const ProfileScheme: Collection = {
    name: "profiles",
    fields: {
        ico: {
            type: "string"
        },
        supplierName: {
            type: "string"
        },
        email: {
            type: "string"
        },
        emailTemplate: {
            type: "string"
        },
        emailProvider: {
            type: "string"
        },
        emailPass: {
            type: "string"
        },
        address: {
            type: "string"
        },
        signature: {
            type: "string"
        },
        accountNumber: {
            type: "string"
        },
        bankCode: {
            type: "string"
        },
        logo: {
            type: "string"
        },
        isTaxRateEnabled: {
            type: "boolean"
        },
        taxRate: {
            type: "number"
        }
    }
};

export const InvoiceClientScheme: Collection = {
    name: "invoice_clients",
    fields: {
        ico: {
            type: "string"
        },
        name: {
            type: "string"
        },
        address: {
            type: "string"
        }
    }
};

export const InvoicePaymentScheme: Collection = {
    name: "invoice_payments",
    fields: {
        accountNumber: {
            type: "number"
        },
        amount: {
            type: "number"
        },
        bankCode: {
            type: "number"
        },
        currency: {
            type: "string"
        },
        message: {
            type: "string"
        },
        qrFetchURL: {
            type: "string"
        },
        variableSymbol: {
            type: "number"
        }
    }
};

export const InvoiceItemsScheme: Collection = {
    name: "invoice_items",
    fields: {
        description: {
            type: "string"
        },
        amount: {
            type: "number"
        },
        price: {
            type: "number"
        }
    }
};

export const InvoiceConfigurationScheme: Collection = {
    name: "invoice_configurations",
    fields: {
        isTaxRateEnabled: {
            type: "boolean"
        },
        taxRate: {
            type: "number"
        },
        logo: {
            type: "string"
        },
        signature: {
            type: "string"
        },
    }
};

export const InvoiceScheme: Collection = {
    name: "invoices",
    fields: {
        items: {
            type: {
                parentType: "array",
                childrenType: "reference"
            }
        },
        itemsPrice: {
            type: "number"
        },
        publishDate: {
            type: "timestamp"
        },
        paymentDate: {
            type: "timestamp"
        },
        identificaionOrder: {
            type: "string"
        },
        idt: {
            type: "timestamp"
        },
        paymentDetails: {
            type: "reference"
        },
        supplier: {
            type: "reference"
        },
        customer: {
            type: "reference"
        },
        configuration: {
            type: "reference"
        }
    }
};

export type DatabaseCollection =
    typeof ProfileScheme                |
    typeof InvoiceClientScheme          |
    typeof InvoicePaymentScheme         |
    typeof InvoiceItemsScheme           |
    typeof InvoiceConfigurationScheme   |
    typeof InvoiceScheme;
