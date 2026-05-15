/**
 * Service de génération de documents PDF pour OptiVista Pro.
 * Utilise typiquement @react-pdf/renderer ou puppeteer côté serveur.
 */

export interface InvoiceData {
  number: string;
  date: string;
  client: {
    name: string;
    phone: string;
    address?: string;
  };
  items: Array<{
    description: string;
    quantity: number;
    price: number;
  }>;
  tax: number;
  total: number;
  deposit: number;
  balance: number;
}

export function generateInvoiceHTML(data: InvoiceData, boutiqueName: string) {
  // En production, ce template serait compilé et converti en PDF
  return `
    <html>
      <body style="font-family: sans-serif; padding: 40px;">
        <header style="display: flex; justify-content: space-between;">
          <h1>${boutiqueName}</h1>
          <div style="text-align: right;">
            <h2>FACTURE N° ${data.number}</h2>
            <p>Date: ${data.date}</p>
          </div>
        </header>

        <section style="margin-top: 40px;">
          <h3>Client: ${data.client.name}</h3>
          <p>Tél: ${data.client.phone}</p>
        </section>

        <table style="width: 100%; border-collapse: collapse; margin-top: 40px;">
          <thead>
            <tr style="background: #f4f4f4;">
              <th style="padding: 10px; text-align: left;">Désignation</th>
              <th style="padding: 10px; text-align: right;">Qté</th>
              <th style="padding: 10px; text-align: right;">Prix Unitaire</th>
              <th style="padding: 10px; text-align: right;">Total</th>
            </tr>
          </thead>
          <tbody>
            ${data.items.map(item => `
              <tr>
                <td style="padding: 10px; border-bottom: 1px solid #eee;">${item.description}</td>
                <td style="padding: 10px; border-bottom: 1px solid #eee; text-align: right;">${item.quantity}</td>
                <td style="padding: 10px; border-bottom: 1px solid #eee; text-align: right;">${item.price} DH</td>
                <td style="padding: 10px; border-bottom: 1px solid #eee; text-align: right;">${item.quantity * item.price} DH</td>
              </tr>
            `).join('')}
          </tbody>
        </table>

        <footer style="margin-top: 40px; text-align: right; border-top: 2px solid #333; padding-top: 20px;">
          <p>Total HT: ${data.total - data.tax} DH</p>
          <p>TVA (20%): ${data.tax} DH</p>
          <p><strong>Total TTC: ${data.total} DH</strong></p>
          <p>Acompte: ${data.deposit} DH</p>
          <p style="color: red; font-size: 1.2em;"><strong>Reste à payer: ${data.balance} DH</strong></p>
        </footer>

        <div style="margin-top: 60px; font-size: 0.8em; color: #888; text-align: center;">
          ${boutiqueName} - Logiciel OptiVista Pro - Merci de votre confiance.
        </div>
      </body>
    </html>
  `;
}
