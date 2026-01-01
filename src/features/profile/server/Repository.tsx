import { addDocument, FirebaseStatus, getDocument, getDocuments } from "@/src/features/firebase/utilities"
import { ProfileScheme } from "../../firebase/collections";
import { Profile } from "../Models";

export interface ProfileRepository {
    addProfileAsync(profile: Profile) : Promise<boolean>;
    getProfileAsync(uid: string) : Promise<Profile | undefined>;
};

class FirebaseRepository implements ProfileRepository {
    async addProfileAsync(user: Profile) : Promise<boolean> {
        return await addDocument(ProfileScheme, user) == FirebaseStatus.Ok;
    }

    async getProfileAsync(uid: string) : Promise<Profile | undefined> {
        const [id, fields] = await getDocument(ProfileScheme, uid);
        if (Object.values(fields).every(field => field.value === undefined)) return undefined;

        console.log(fields.emailAttachments);

        return {
            uid: id,
            ico: fields.ico.value,
            supplierName: fields.supplierName.value,
            email: fields.email.value,
            emailTemplate: fields.emailTemplate.value,
            emailProvider: fields.emailProvider.value,
            emailPass: fields.emailPass.value,
            emailAttachments: fields.emailAttachments.value,
            address: fields.address.value,
            signature: fields.signature.value,
            accountNumber: fields.accountNumber.value,
            bankCode: fields.bankCode.value,
            logo: fields.logo.value,
            isTaxRateEnabled: fields.isTaxRateEnabled.value,
            taxRate: fields.taxRate.value
        };
    }
}
 
export const Profiles: ProfileRepository = new FirebaseRepository();
