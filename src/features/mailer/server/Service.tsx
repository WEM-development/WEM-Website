import { createTransport } from "nodemailer";
import { Profile } from "../../profile/Models";

function createTransportFromProfile(profile: Profile) {
    const transport = createTransport({
        host: profile.emailProvider,
        secure: false,
        port: 465,
        connectionTimeout: 10_000,
        auth: {
            user: profile.email,
            pass: profile.emailPass
        },
        tls: {
            rejectUnauthorized: false,
        }
    });

    return transport;
}

export async function sendInvoiceModalAsync(sender: Profile, recieverAddress: string, emailContent: any) {
    const transport = createTransportFromProfile(sender);

    await new Promise(() => {
        transport.sendMail({
        from: `"${sender.supplierName}" <${sender.email}>`,
        to: recieverAddress,
        subject: emailContent.header,
        html: emailContent.content,
        attachments: emailContent.attachments});
    });
}
