import { createTransport } from "nodemailer";
import { Profile } from "../../profile/Models";

function createTransportFromProfile(profile: Profile) {
    const transport = createTransport({
        host: profile.emailProvider,
        secure: false, // Use STARTTLS instead of SSL/TLS
        port: 587, // Port 587 for STARTTLS (465 is blocked on Firebase App Hosting)
        connectionTimeout: 10_000,
        auth: {
            user: profile.email,
            pass: profile.emailPass
        },
        tls: {
            // Do not fail on invalid certs (adjust based on your provider)
            rejectUnauthorized: false
        }
    });

    return transport;
}

export async function sendInvoiceModalAsync(sender: Profile, recieverAddress: string, emailContent: any) {
    const transport = createTransportFromProfile(sender);

    await transport.sendMail({
        from: `"${sender.supplierName}" <${sender.email}>`,
        to: recieverAddress,
        subject: emailContent.header,
        html: emailContent.content,
        attachments: emailContent.attachments
    });
}
