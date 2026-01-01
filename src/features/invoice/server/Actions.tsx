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

        await sendInvoiceModalAsync(sender, recipientEmail, {
            ...emailContent,
            attachments: [
                ...sender.emailAttachments,
                {
                    filename: `Faktura-${invoiceId}.pdf`,
                    content: pdfBuffer,
                    contentType: 'application/pdf',
                    encoding: 'base64'
                }
            ]
        });
    } finally {
        await browser.close();
    }
}
