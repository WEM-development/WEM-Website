"use server"

import { sendInvoiceModalAsync } from "../../mailer/server/Service";
import { Profile } from "../../profile/Models";
import puppeteer from "puppeteer";

export async function sendInvoiceEmailAction(
    sender: Profile,
    recipientEmail: string,
    emailContent: any,
    htmlContent: string,
    invoiceId: string
) {
    // Validate sender profile has email configuration
    if (!sender.email || !sender.emailProvider || !sender.emailPass) {
        throw new Error("Sender profile is missing email configuration. Please configure your email settings in the profile.");
    }

    if (!recipientEmail) {
        throw new Error("Recipient email address is required.");
    }

    // Launch Puppeteer and generate PDF
    const browser = await puppeteer.launch({
        headless: true,
        args: ['--no-sandbox', '--disable-setuid-sandbox']
    });

    try {
        const page = await browser.newPage();
        
        // Set viewport to A4 dimensions at 96 DPI
        await page.setViewport({
            width: 794,  // 210mm at 96 DPI
            height: 1123, // 297mm at 96 DPI
            deviceScaleFactor: 2, // For crisp text
        });
        
        // Set content and wait for everything to load
        await page.setContent(htmlContent, {
            waitUntil: 'networkidle0'
        });

        // Generate PDF with A4 format
        const pdfBuffer = await page.pdf({
            format: 'A4',
            printBackground: true,
            preferCSSPageSize: false,
            displayHeaderFooter: false,
            margin: {
                top: '0mm',
                right: '0mm',
                bottom: '0mm',
                left: '0mm'
            },
            scale: 1,
        });

        const result = await sendInvoiceModalAsync(sender, recipientEmail, {
            ...emailContent,
            attachments: [
                ...(sender.emailAttachments || []),
                {
                    filename: `Faktura-${invoiceId}.pdf`,
                    content: pdfBuffer,
                    contentType: 'application/pdf',
                    encoding: 'base64'
                }
            ]
        });

        return result;
    } catch (error) {
        console.error('Error sending invoice email:', error);
        throw error;
    } finally {
        await browser.close();
    }
}
