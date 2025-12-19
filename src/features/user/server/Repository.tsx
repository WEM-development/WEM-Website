import { addDocument, FirebaseStatus, getDocument, getDocuments } from "@/src/features/firebase/utilities"
import { UserScheme } from "../../firebase/collections";
import { User } from "../Models";

export interface UserRepository {
    addUserAsync(user: User) : Promise<boolean>;
    getUserAsync(uid: string) : Promise<User | undefined>;
    getUsersAsync() : Promise<User[] | undefined>;
};

class FirebaseRepository implements UserRepository {
    async addUserAsync(user: User) : Promise<boolean> {
        return await addDocument(UserScheme, user) == FirebaseStatus.Ok;
    }

    async getUserAsync(uid: string) : Promise<User | undefined> {
        const [id, fields] = await getDocument(UserScheme, uid);

        return {
            uid: id,
            firstName: fields["firstName"].value,
            lastName: fields["lastName"].value,
            email: fields["email"].value
        };
    }

    async getUsersAsync() : Promise<User[] | undefined> {
        const userDocuments = await getDocuments(UserScheme);

        return userDocuments.map(([id, fields]) => {

            return {
                uid: id,
                firstName: fields["firstName"].value,
                lastName: fields["lastName"].value,
                email: fields["email"].value
            } as User;
        });
    }
}
 
export const Users: UserRepository = new FirebaseRepository();
