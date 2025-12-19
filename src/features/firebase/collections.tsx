export type CollectionField = {
    type: any,
    value?: any
};

export interface Collection {
    name: string,
    fields: Record<string, CollectionField>
};

export const UserScheme: Collection = {
    name: "users",
    fields: {
        firstName: {
            type: "string"
        },
        lastName: {
            type: "string"
        },
        email: {
            type: "string"
        }
    }
};

export const ClientScheme: Collection = {
    name: "clients",
    fields: {
        name: {
            type: "string"
        },
        address: {
            type: "string"
        },
        email: {
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
        paymentDetails: {
            type: "reference"
        },
        taxRate: {
            type: "number"
        },
        supplier: {
            type: "reference"
        },
        customer: {
            type: "reference"
        },
    }
};

export type DatabaseCollection =
    typeof UserScheme           |
    typeof ClientScheme         |
    typeof InvoicePaymentScheme | 
    typeof InvoiceItemsScheme | 
    typeof InvoiceScheme;
