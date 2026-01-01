const template = `
<!DOCTYPE html>
<html lang="cs">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width" />
  <title>Faktura</title>
</head>

<body style="margin:0;padding:0;background-color:#f4f6f8;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Arial,sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" role="presentation">
    <tr>
      <td align="center">

        <table width="600" cellpadding="0" cellspacing="0" role="presentation"
          style="background-color:#ffffff;border-radius:8px;margin:40px auto;overflow:hidden;">

          <tr>
            <td style="padding:24px;text-align:center;border-bottom:1px solid #e5e7eb;">
              <img width="120px" height="120px" src="cid:logo" />
            </td>
          </tr>

          <tr>
            <td style="padding:32px;color:#333333;">
              <p style="font-size:20px;font-weight:600;margin:0 0 16px 0;">
                Dobrý den,
              </p>

              <p style="font-size:15px;line-height:1.6;margin:0 0 16px 0;">
                děkujeme za Vaší spolupráci a využití našich služeb.
              </p>

              <p style="font-size:15px;line-height:1.6;margin:0 0 16px 0;">
                V příloze tohoto e-mailu naleznete fakturu <strong>{{invoiceNumber}}</strong>.
              </p>

              <table width="100%" cellpadding="0" cellspacing="0" role="presentation"
                style="background-color:#f9fafb;border:1px solid #e5e7eb;border-radius:6px;margin:24px 0;">
                <tr>
                  <td style="padding:16px;font-size:14px;">
                    <p style="margin:4px 0;"><strong>Číslo faktury:</strong> {{invoiceNumber}}</p>
                    <p style="margin:4px 0;"><strong>Datum vystavení:</strong> {{publishDate}}</p>
                    <p style="margin:4px 0;"><strong>Datum splatnosti:</strong> {{paymentDate}}</p>
                    <p style="margin:4px 0;"><strong>Celková částka:</strong> {{invoiceTotal}} Kč</p>
                  </td>
                </tr>
              </table>

              <p style="font-size:15px;line-height:1.6;margin:0 0 16px 0;">
                V případě jakýchkoliv dotazů nás kontaktujte na adrese
                <a href="mailto:{{supportEmail}}" style="color:#2563eb;text-decoration:none;">
                  {{supportEmail}}
                </a>.
              </p>

              <p style="font-size:15px;line-height:1.6;margin:0;">
                S pozdravem a přáním hezkého zbytku dne,<br />
                <strong>{{companyName}}</strong>
              </p>
            </td>
          </tr>

          <tr>
            <td style="padding:24px;text-align:center;border-top:1px solid #e5e7eb;">
              <p style="font-size:12px;color:#6b7280;margin:0;">
                © {{currentYear}} {{companyName}}. Všechna práva vyhrazena.
              </p>
            </td>
          </tr>

        </table>

      </td>
    </tr>
  </table>
</body>
</html>
`;

const testData: Record<string, string> = {
  customerName: "Jan Novák",
  invoiceNumber: "INV-2025-001",
  invoiceDate: "18. 12. 2025",
  invoiceTotal: "12 500 Kč",
  companyName: "Welding Montáže",
  supportEmail: "support@wem.cz",
  currentYear: "2025"
};

function fillTemplate(template: string, data: Record<string, string>) {
  return template.replace(/{{(\w+)}}/g, (_, key) => data[key] ?? "");
}

export default function EmailPreviewPage() {
  const html = fillTemplate(template, testData);

  return (
    <div
      dangerouslySetInnerHTML={{ __html: html }}
      style={{ minHeight: "100vh" }}
    />
  );
}