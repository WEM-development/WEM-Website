import { collection, doc, getDoc, addDoc, setDoc, deleteDoc, getDocs, DocumentReference, CollectionReference } from "firebase/firestore";
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

export async function addDocument(databaseCollection: DatabaseCollection, document: any, customId?: string) : Promise<FirebaseStatus> {
    try {
        if (customId) {
            await setDoc(doc(database, databaseCollection.name, customId), document);
            console.log(`[${databaseCollection.name}]: Document written with custom ID: ${customId}`);
        } else {
            const returnDocument = await addDoc(
                collection(database, databaseCollection.name),
                document
            );
            console.log(`[${databaseCollection.name}]: Document written with ID: ${returnDocument.id}`);
        }
        return FirebaseStatus.Ok;
    } catch (e) {
        console.log(`[${databaseCollection.name}]: Error adding document: ${e}`);
        return FirebaseStatus.NotOk;
    }
}

export async function getReference(databaseCollection: DatabaseCollection, referenceValue: any): Promise<[id: string, fields: Record<string, CollectionField & { value: any }>]> {
    try {
        const docId = (referenceValue.path).split('/')[1];
        const docRef = doc(database, databaseCollection.name, docId);
        
        console.log(`Fetching reference from ${databaseCollection.name}/${docId}`); 
        
        const returnDocument = await getDoc(docRef);
        
        if (!returnDocument.exists()) {
            throw new Error(`Referenced document does not exist at path: ${docRef.path}`);
        }

        let returnFields: Record<string, CollectionField & { value: any }> = {};

        for (const [fieldName, field] of Object.entries(databaseCollection.fields)) {
            returnFields[fieldName] = {
                value: returnDocument.get(fieldName),
                ...field
            };
        }

        return [returnDocument.id, returnFields];
    } catch (error) {
        console.error("Error in getReference:", error);
        throw error;
    }
}

export function getReferenceObject(databaseCollection: DatabaseCollection, id: string) {
    return doc(database, `${databaseCollection.name}/${id}`); 
}

