/**
 * 🔒 ROUTE API SÉCURISÉE - CÔTÉ SERVEUR UNIQUEMENT
 *
 * Cette route gère tous les appels à OpenAI côté serveur.
 * La clé API (OPENAI_API_KEY) n'est JAMAIS exposée côté client.
 *
 * Le frontend fait uniquement des requêtes POST vers /api/analyze
 * avec le texte du feedback en JSON.
 */
import OpenAI from "openai";
import { NextResponse } from "next/server";
import type { AnalysisResult } from "./types";
import { getPersonalizedDemoResponse } from "./demo-responses";

const SYSTEM_PROMPT = `Tu es un expert SAV. Analyse le retour client et réponds avec :

Un RÉSUMÉ court.

Une CHECK-LIST des points à clarifier.

Un EXEMPLE de réponse polie à envoyer.

Tu dois répondre UNIQUEMENT avec un JSON valide au format suivant :
{
  "summary": "Résumé court et clair du retour client",
  "pointsToClarify": ["Point à clarifier 1", "Point à clarifier 2", "Point à clarifier 3"],
  "suggestedResponse": "Message professionnel et poli prêt à être envoyé au client, avec salutation, corps du message adapté au contexte et formule de politesse"
}

Le message suggestedResponse doit être :
- Professionnel, courtois et poli
- Adapté au contexte du retour client
- Prêt à être envoyé tel quel
- Avec sauts de ligne pour la lisibilité

Utilise "le client" (minuscule) dans les résumés, sauf en début de phrase.

Sois concis mais précis.`;

export async function POST(req: Request) {
  let feedback: string = "";

  try {
    const body = await req.json();
    feedback = (body as { feedback?: string }).feedback || "";

    // 🔐 Vérifications
    if (!feedback || typeof feedback !== "string" || !feedback.trim()) {
      return NextResponse.json(
        { error: "Le texte des retours est requis" },
        { status: 400 }
      );
    }

    // 🔒 Sécurité de consommation : limite de 800 caractères
    if (feedback.length > 800) {
      return NextResponse.json(
        {
          error:
            "Le texte des retours ne doit pas dépasser 800 caractères. Votre texte contient " +
            feedback.length +
            " caractères.",
        },
        { status: 400 }
      );
    }

    // 🔒 SÉCURITÉ : La clé API est uniquement lue côté serveur via process.env
    // Elle n'est JAMAIS envoyée au client ni exposée dans le code frontend

    // 🔍 DIAGNOSTIC : Vérification des variables d'environnement
    // PRIORITÉ 1 : Vérifier directement si OPENAI_API_KEY existe
    const openaiApiKey = process.env.OPENAI_API_KEY;
    const demoMode = process.env.DEMO_MODE; // Juste pour les logs, pas utilisé dans la logique

    console.log("🔍 DIAGNOSTIC - Variables d'environnement :");
    console.log(
      `   - DEMO_MODE: ${
        demoMode || "undefined"
      } (info uniquement, ignoré dans la logique)`
    );
    if (openaiApiKey) {
      // Afficher uniquement les 3 premiers caractères pour la sécurité
      const preview = openaiApiKey.substring(0, 3);
      console.log(
        `   - OPENAI_API_KEY: ${preview}... (${openaiApiKey.length} caractères) ✅ PRÉSENTE`
      );
    } else {
      console.log("   - OPENAI_API_KEY: undefined ou vide ❌ ABSENTE");
    }

    // PRIORITÉ 1 : Si OPENAI_API_KEY existe, TOUJOURS utiliser OpenAI (ignorer DEMO_MODE)
    if (openaiApiKey && openaiApiKey.trim().length > 0) {
      console.log(
        "✅ PRIORITÉ 1 : OPENAI_API_KEY détectée → Utilisation d'OpenAI (DEMO_MODE ignoré)"
      );
    } else {
      // PRIORITÉ 2 : Fallback mode démo SEULEMENT si la clé est absente
      const errorMessage =
        "Erreur technique : La variable OPENAI_API_KEY est vide sur le serveur";
      console.error(`❌ ${errorMessage}`);
      console.error(
        "💡 PRIORITÉ 2 : Pas de clé API → Mode démo activé (fallback)"
      );
      console.error(
        "💡 Vérifiez que la variable OPENAI_API_KEY est bien configurée sur Vercel"
      );
      console.error(
        "💡 Assurez-vous d'avoir redéployé après avoir ajouté la variable"
      );

      // Utiliser le mode démo comme fallback pour que l'app continue de fonctionner
      await new Promise((resolve) => setTimeout(resolve, 800));
      const demoResponse = getPersonalizedDemoResponse(feedback);
      return NextResponse.json(demoResponse);
    }

    try {
      const openai = new OpenAI({
        apiKey: openaiApiKey,
      });

      const completion = await openai.chat.completions.create({
        model: "gpt-4o-mini",
        messages: [
          { role: "system", content: SYSTEM_PROMPT },
          { role: "user", content: feedback },
        ],
        temperature: 0.3,
        response_format: { type: "json_object" },
      });

      const content = completion.choices[0]?.message?.content;

      if (!content) {
        throw new Error("Aucune réponse de l'API");
      }

      const result = JSON.parse(content);

      // Validation et formatage de la réponse
      // Le nouveau format retourne : summary, pointsToClarify (check-list), suggestedResponse
      const pointsToClarifyArray = Array.isArray(result.pointsToClarify)
        ? result.pointsToClarify
        : result.pointsToClarify
        ? [result.pointsToClarify]
        : [];

      const analysisResult: AnalysisResult = {
        summary: result.summary || "Aucun résumé disponible",
        // pointsToClarify devient la check-list des points à clarifier
        checklist: pointsToClarifyArray,
        pointsToClarify: pointsToClarifyArray,
        // Priorité par défaut à "Normal" pour la compatibilité avec le frontend
        priority: "Normal",
        suggestedResponse: result.suggestedResponse || undefined,
      };

      return NextResponse.json(analysisResult);
    } catch (apiError) {
      // Si erreur API (crédits manquants, clé invalide, etc.), basculer automatiquement vers le mode démo
      console.error(
        "❌ Erreur API OpenAI, bascule vers le mode démo:",
        apiError
      );

      if (apiError instanceof OpenAI.APIError) {
        // Erreur spécifique OpenAI (crédits manquants, clé invalide, etc.)
        console.error(`❌ Erreur OpenAI détectée: ${apiError.message}`);
        console.error(`❌ Code d'erreur: ${apiError.status}`);
        console.error(`❌ Type d'erreur: ${apiError.type}`);
      } else {
        console.error(
          `❌ Erreur inconnue: ${
            apiError instanceof Error ? apiError.message : String(apiError)
          }`
        );
      }

      // Retourner une réponse démo pour que l'application continue de fonctionner
      console.log("🔄 Utilisation du mode démo comme fallback");
      await new Promise((resolve) => setTimeout(resolve, 800));
      const demoResponse = getPersonalizedDemoResponse(feedback);
      return NextResponse.json(demoResponse);
    }
  } catch (error) {
    console.error("Erreur lors de l'analyse:", error);

    // En cas d'erreur générale, retourner quand même une réponse démo
    // pour que l'application continue de fonctionner
    try {
      await new Promise((resolve) => setTimeout(resolve, 800));
      const demoResponse = getPersonalizedDemoResponse(
        feedback || "Erreur lors de la récupération du feedback"
      );
      return NextResponse.json(demoResponse);
    } catch (fallbackError) {
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
}
