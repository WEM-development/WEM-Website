import { createTransport } from "nodemailer";
import { Profile } from "../../profile/Models";

function createTransportFromProfile(profile: Profile) {
    const transport = createTransport({
        host: profile.emailProvider,
        secure: true,
        port: 465,
        connectionTimeout: 10_000,
        auth: {
            user: profile.email,
            pass: profile.emailPass
        }
    });

    return transport;
}

export async function sendInvoiceModalAsync(sender: Profile, recieverAddress: string, emailContent: any) {
    const transport = createTransportFromProfile(sender);

    await transport.sendMail({
        from: sender.email,
        to: recieverAddress,
        subject: emailContent.header,
        html: emailContent.content,
        attachments: emailContent.attachments
    });
}
