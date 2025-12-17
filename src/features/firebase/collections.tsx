export type CollectionField = {
    type: string,
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

export const InvoiceScheme: Collection = {
    name: "invoice",
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

export type DatabaseCollection = typeof UserScheme | typeof InvoiceScheme;
