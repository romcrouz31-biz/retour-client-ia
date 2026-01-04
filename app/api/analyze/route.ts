import { NextRequest, NextResponse } from "next/server";
import OpenAI from "openai";
import { getPersonalizedDemoResponse } from "./demo-responses";
import type { AnalysisResult } from "./types";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

const SYSTEM_PROMPT = `Tu es un assistant spécialisé dans l'analyse des retours clients pour freelances.
Transforme les messages fournis en instructions claires et exploitables.
Fais un résumé court, une checklist d'actions, identifie les points flous,
indique le niveau de priorité et génère un message professionnel à envoyer au client.

Tu dois répondre UNIQUEMENT avec un JSON valide au format suivant :
{
  "summary": "Résumé court et clair des retours",
  "checklist": ["Action 1", "Action 2", "Action 3"],
  "pointsToClarify": ["Point 1", "Point 2"],
  "priority": "Urgent" | "Normal" | "Faible",
  "suggestedResponse": "Message professionnel prêt à être envoyé au client, avec salutation, corps du message adapté au contexte et formule de politesse"
}

La priorité doit être :
- "Urgent" : si des actions immédiates sont nécessaires ou si le client est insatisfait
- "Normal" : pour des demandes standards sans urgence particulière
- "Faible" : pour des améliorations mineures ou des suggestions

Le message suggestedResponse doit être :
- Professionnel et courtois
- Adapté au contexte (urgent/normal/positif)
- Prêt à être envoyé tel quel
- Avec sauts de ligne pour la lisibilité

Sois concis mais précis.`;

/**
 * Vérifie si le mode démo est activé
 */
function isDemoMode(): boolean {
  const demoMode = process.env.DEMO_MODE;
  return demoMode === "true" || demoMode === "1";
}

export async function POST(request: NextRequest) {
  try {
    const { feedback } = await request.json();

    if (!feedback || typeof feedback !== "string" || !feedback.trim()) {
      return NextResponse.json(
        { error: "Le texte des retours est requis" },
        { status: 400 }
      );
    }

    // Mode démo : retourner une réponse simulée personnalisée
    if (isDemoMode()) {
      // Simuler un petit délai pour rendre l'expérience plus réaliste
      await new Promise((resolve) => setTimeout(resolve, 800));
      const demoResponse = getPersonalizedDemoResponse(feedback);
      return NextResponse.json(demoResponse);
    }

    // Mode production : utiliser l'API OpenAI
    if (!process.env.OPENAI_API_KEY) {
      return NextResponse.json(
        { error: "Clé API OpenAI non configurée" },
        { status: 500 }
      );
    }

    const completion = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        { role: "system", content: SYSTEM_PROMPT },
        { role: "user", content: feedback },
      ],
      temperature: 0.7,
      response_format: { type: "json_object" },
    });

    const content = completion.choices[0]?.message?.content;

    if (!content) {
      throw new Error("Aucune réponse de l'API OpenAI");
    }

    const result = JSON.parse(content);

    // Validation et formatage de la réponse
    const analysisResult: AnalysisResult = {
      summary: result.summary || "Aucun résumé disponible",
      checklist: Array.isArray(result.checklist)
        ? result.checklist
        : result.checklist
        ? [result.checklist]
        : [],
      pointsToClarify: Array.isArray(result.pointsToClarify)
        ? result.pointsToClarify
        : result.pointsToClarify
        ? [result.pointsToClarify]
        : [],
      priority:
        result.priority === "Urgent" ||
        result.priority === "Normal" ||
        result.priority === "Faible"
          ? result.priority
          : "Normal",
      suggestedResponse: result.suggestedResponse || undefined,
    };

    return NextResponse.json(analysisResult);
  } catch (error) {
    console.error("Erreur lors de l'analyse:", error);

    if (error instanceof OpenAI.APIError) {
      return NextResponse.json(
        { error: `Erreur API OpenAI: ${error.message}` },
        { status: 500 }
      );
    }

    return NextResponse.json(
      {
        error:
          error instanceof Error
            ? error.message
            : "Une erreur est survenue lors de l'analyse",
      },
      { status: 500 }
    );
  }
}

