import OpenAI from "openai";
import { NextResponse } from "next/server";

const ALLOWED_MODELS = ["gpt-4o-mini", "gpt-4o"] as const;

type AllowedModel = (typeof ALLOWED_MODELS)[number];

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { apiKey, model, clientMessage } = body as {
      apiKey?: string;
      model?: AllowedModel;
      clientMessage?: string;
    };

    // 🔐 Vérifications AVANT OpenAI
    if (!apiKey || !clientMessage) {
      return NextResponse.json(
        { error: "Clé API ou message manquant" },
        { status: 400 }
      );
    }

    const selectedModel: AllowedModel = ALLOWED_MODELS.includes(model!)
      ? model!
      : "gpt-4o-mini";

    // ✅ OpenAI créé UNIQUEMENT si apiKey existe
    const openai = new OpenAI({
      apiKey,
    });

    const response = await openai.chat.completions.create({
      model: selectedModel,
      messages: [
        {
          role: "system",
          content: `
Tu es un assistant professionnel spécialisé dans l'analyse de retours clients.

Tu dois répondre STRICTEMENT avec cette structure :
- Type de retour
- Priorité (Faible / Moyenne / Haute)
- Résumé (2 lignes max)
- Réponse professionnelle prête à envoyer
          `,
        },
        {
          role: "user",
          content: clientMessage,
        },
      ],
      temperature: 0.3,
      max_tokens: 800,
    });

    return NextResponse.json({
      result: response.choices[0].message.content,
      modelUsed: selectedModel,
    });
  } catch (error) {
    console.error("OpenAI error:", error);

    return NextResponse.json(
      { error: "Erreur lors de l'analyse du message" },
      { status: 500 }
    );
  }
}
