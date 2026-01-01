"use server"

import { createTransport } from "nodemailer";
import { Profile } from "../../profile/Models";
import type Mail from "nodemailer/lib/mailer";

/**
 * Email Configuration Guide for Firebase Profile
 * 
 * The Profile in Firebase must contain the following fields for email to work:
 * - emailProvider: SMTP server host (e.g., "smtp.gmail.com", "smtp.office365.com", "smtp.seznam.cz")
 * - email: Your email address (e.g., "yourname@gmail.com")
 * - emailPass: App-specific password or SMTP password
 * - emailAttachments: Array of default attachments (optional)
 * 
 * Common SMTP Providers:
 * - Gmail: smtp.gmail.com (requires App Password from Google Account settings)
 * - Outlook/Office365: smtp.office365.com
 * - Seznam: smtp.seznam.cz
 * 
 * Note: Port 587 is used for STARTTLS (secure connection)
 */

function createTransportFromProfile(profile: Profile) {
    // Validate required fields
    if (!profile.emailProvider || !profile.email || !profile.emailPass) {
        throw new Error("Email configuration is incomplete in profile. Please configure emailProvider, email, and emailPass.");
    }

    const transport = createTransport({
        host: profile.emailProvider,
        secure: false, // Use STARTTLS instead of SSL/TLS
        port: 587, // Port 587 for STARTTLS (465 is blocked on Firebase App Hosting)
        connectionTimeout: 10_000,
        greetingTimeout: 10_000,
        socketTimeout: 10_000,
        auth: {
            user: profile.email,
            pass: profile.emailPass
        },
        tls: {
            // Do not fail on invalid certs (adjust based on your provider)
            rejectUnauthorized: false
        },
        debug: process.env.NODE_ENV === 'development',
        logger: process.env.NODE_ENV === 'development'
    });

    return transport;
}

export async function sendInvoiceModalAsync(sender: Profile, recieverAddress: string, emailContent: any) {
    try {
        const transport = createTransportFromProfile(sender);

        // Verify connection
        await transport.verify();
        console.log('SMTP connection verified successfully');

        const mailOptions: Mail.Options = {
            from: `"${sender.supplierName}" <${sender.email}>`,
            to: recieverAddress,
            subject: emailContent.header,
            html: emailContent.content,
            attachments: emailContent.attachments
        };

        const info = await transport.sendMail(mailOptions);
        console.log('Email sent successfully:', info.messageId);
        
        return {
            success: true,
            messageId: info.messageId
        };
    } catch (error) {
        console.error('Failed to send email:', error);
        throw new Error(`Failed to send email: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
}
