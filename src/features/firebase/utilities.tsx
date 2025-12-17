import { collection, doc, getDoc, addDoc, deleteDoc, getDocs } from "firebase/firestore";
import { database } from "./config";
import { CollectionField, DatabaseCollection } from "./collections";

export enum FirebaseStatus{
    Ok,
    NotOk
};

export async function getDocument(databaseCollection: DatabaseCollection, identificator: string) : Promise<[id: string, fields: Record<string, CollectionField & { value: any }>]> {
    try {
        console.log("Fetching document:", databaseCollection.name, identificator);
        
        const returnDocument = await getDoc(
            doc(database, databaseCollection.name, identificator)
        );
        
        let returnFields: Record<string, CollectionField & { value: any }> = {};

        for (const [fieldName, field] of Object.entries(databaseCollection.fields)) {
            returnFields[fieldName] = {
                value: returnDocument.get(fieldName),
                ...field
            };
        }

        return [returnDocument.id, returnFields];
    } catch (error) {
        console.error("Error in getDocument:", error);
        throw error;
    }
}

export async function getDocuments(databaseCollection: DatabaseCollection) : Promise<[id: string, fields: Record<string, CollectionField & { value: any }>][]> {
    const query = await getDocs(
        collection(database, databaseCollection.name)
    );

    let returnDocuments: [id: string, fields: Record<string, CollectionField & { value: any }>][] = [];

    query.forEach((docSnapshot) => {
        let docFields: Record<string, CollectionField & { value: any }> = {};
        
        for (const [fieldName, field] of Object.entries(databaseCollection.fields)) {
            docFields[fieldName] = {
                value: docSnapshot.get(fieldName),
                ...field
            };
        }
        
        returnDocuments.push([docSnapshot.id, docFields]);
    });

    return returnDocuments;
}

export async function addDocument(databaseCollection: DatabaseCollection, document: any) : Promise<FirebaseStatus> {
    try {
        const returnDocument = await addDoc(
            collection(database, databaseCollection.name),
            document
        );

        console.log(`[${databaseCollection}]: Document written with ID: ${returnDocument.id}`);
        return FirebaseStatus.Ok;
    } catch (e) {
        console.log(`[${databaseCollection}]: Error adding document: ${e}`);
        return FirebaseStatus.NotOk;
    }
}
