import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || "");

export async function generateMarketingPost(topic: string, boutiqueName: string) {
  const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

  const prompt = `
    Tu es un expert en marketing digital pour opticiens au Maroc.
    Génère un post Instagram captivant en français et une version en Darija (arabe marocain - caractères latins ok).
    Sujet: ${topic}
    Nom de la boutique: ${boutiqueName}
    Inclus des émojis et des hashtags pertinents (#optique #maroc #lunettes).
    Format de sortie: JSON avec les clés 'fr', 'darija', 'hashtags'.
  `;

  const result = await model.generateContent(prompt);
  const response = await result.response;
  return response.text();
}

/**
 * Envoie un rappel WhatsApp de renouvellement de lunettes.
 * En production, cela appellerait un webhook n8n ou une API comme Ultramsg.
 */
export async function sendRenewalReminder(clientPhone: string, clientName: string) {
  console.log(`[WhatsApp Automation] Sending reminder to ${clientName} (${clientPhone})`);
  // Logique d'appel API ici
  // const res = await fetch(N8N_WEBHOOK_URL, { ... })
}
