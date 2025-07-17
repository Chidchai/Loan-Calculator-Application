import createPDF from '@sidebase/nuxt-pdf';

export default defineEventHandler(async (event) => {
  const pdf = await createPDF({
    html: `
      <html>
        <head>
          <style>
            body { font-family: 'TH Sarabun New', sans-serif; font-size: 16pt; }
            table { border-collapse: collapse; width: 100%; }
            th, td { border: 1px solid #ccc; padding: 8px; }
          </style>
        </head>
        <body>
          <h1>ตารางผ่อนชำระ</h1>
          <table>
            <thead>
              <tr><th>งวด</th><th>วันที่</th><th>เงินต้น</th><th>ดอกเบี้ย</th></tr>
            </thead>
            <tbody>
              <tr><td>1</td><td>01/08/2025</td><td>10,000</td><td>500</td></tr>
              <tr><td>2</td><td>01/09/2025</td><td>10,000</td><td>450</td></tr>
            </tbody>
          </table>
        </body>
      </html>
    `,
  });

  setResponseHeaders(event, {
    'Content-Type': 'application/pdf',
    'Content-Disposition': 'attachment; filename="ตารางผ่อนชำระ.pdf"',
  });

  return pdf;
});
