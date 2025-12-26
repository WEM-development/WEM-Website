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
              <svg id="Layer_2" style="display:block;margin:0 auto;" data-name="Layer 2" width="160px" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1690.78 529">
                <defs>
                  <style>
                    .cls-1 {
                      fill: #fdc746;
                    }
                  </style>
                </defs>
                <g id="Layer_1-2" data-name="Layer 1">
                  <g>
                    <path d="m232,501.4c0,.5-21.3.9-47.3.9h-47.3l-54.4-191.8C53.1,205.1,22.2,96.1,14.3,68.3,6.4,40.5,0,17.5,0,17.1s24.2-.8,53.8-.8h53.8l32.7,142.2c25.1,109.2,34.1,150.1,38.8,176.2,3.3,18.7,6.2,34.1,6.4,34.3.5.5,1-2,8.6-42.8,4.7-25.2,38.7-200.1,57.7-296.8l2.6-13.2h53.9c29.6,0,53.9.2,53.9.5s6.5,32.1,14.6,70.8c41.1,198.5,42.2,203.5,49.9,243.4,3.6,18.8,6.6,35.3,6.6,36.8,0,7.7,2.2-.9,8.8-34.1,5.5-27.7,65.4-291.1,71.3-313.5l1-3.8h51.5c48.6,0,51.5.1,51,1.8-.3,1-14.7,52.1-32,113.8-81.3,289.1-103.8,369-104.3,369.7-.3.4-22.2.8-48.7.8h-48.2l-28.9-139.8c-15.9-76.9-32.8-161.3-37.6-187.6-4.8-26.3-9-48.1-9.3-48.4s-.6-.3-.6,0c0,4.4-21,112.9-34.5,178.3-9.7,46.8-22.7,109.9-29,140.4-6.7,30.3-11.8,55.6-11.8,56.1Zm818-86.1v87h-368V16.3h357l-.5,85.5-128.7.2-128.8.3v103h236v85h-236.1l.5,124.5,134.2.2,134.4.3Zm172.8-114.9l.3,201.9h-95.2V16.3h74c40.7,0,74,.2,74,.4s12.2,53,27,117.2,27,117.3,27,118.1c0,.7-3.4,3.6-7.5,6.6-4.1,2.9-7.5,5.6-7.5,6s4.9,4.3,10.8,8.7,11.1,8.6,11.3,9.3c.3.7,6.3,26.4,13.3,57.1,7.1,30.7,13.1,55.8,13.5,55.8.3,0,4.6-17.4,9.4-38.8,4.9-21.3,9.1-39.1,9.5-39.6,1-1.2,61,44,60.5,45.5-.2.7-7.2,31.4-15.5,68.3-8.3,36.8-15.3,68-15.6,69.2l-.6,2.2h-49.4c-27.2,0-49.4-.2-49.4-.6,0-.3-5.2-23.6-11.4-51.8-60.7-271.1-78.6-351.1-78.8-351.3.1.1.1,90.8.3,201.8Zm231.2-139.9l-5.5,4.1c-31.8,23.6-35.9,26.7-36.4,26.2-.1-.1-.1-.2-.1-.4v-.2c0-1.1,2.7-13,22-96.9,4.9-21.2,10.8-47.2,13.2-57.7l4.3-19.2h146.5v36.7l-46.8,34.9-46.8,34.9-.3-11.3c-.2-6.2-.6-11.3-1-11.3s-2.1,6.2-3.7,13.7c-1.7,7.5-3.7,14.5-4.5,15.4-.8,1-19.2,15-40.9,31.1Zm143.9,315.3l.1,26.5h-95v-48.1c0-37,.3-48,1.2-47.7.7.2,22,15.9,47.5,34.8l46.2,34.5Z"/>
                    <path class="cls-1" d="m1690.7,132.7c.1,73,.1,192,0,264.5l-.2,131.8-59-43.9c-32.4-24.2-72.4-53.9-88.9-66.2s-36.5-27.2-44.7-33.2c-129.3-96.1-161.5-120.2-161.5-121.2,0-.6,16-12.9,35.5-27.5,31-23.1,112.7-83.9,194-144.4,14-10.4,31.6-23.5,39-29s29.7-22.1,49.5-36.8l36-26.8.3,132.7Z"/>
                  </g>
                </g>
              </svg>
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