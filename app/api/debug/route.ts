/**
 * 🔍 ROUTE DE DIAGNOSTIC TEMPORAIRE
 * 
 * Cette route permet de vérifier les variables d'environnement.
 * À SUPPRIMER après diagnostic pour la sécurité.
 */
import { NextResponse } from "next/server";

export async function GET() {
  const openaiApiKey = process.env.OPENAI_API_KEY;
  const demoMode = process.env.DEMO_MODE;

  // Afficher uniquement les 3 premiers caractères de la clé pour la sécurité
  const keyPreview = openaiApiKey
    ? `${openaiApiKey.substring(0, 3)}... (${openaiApiKey.length} caractères)`
    : "undefined ou vide";

  const debugInfo = {
    timestamp: new Date().toISOString(),
    environment: {
      DEMO_MODE: demoMode || "undefined",
      OPENAI_API_KEY: keyPreview,
    },
    status: {
      hasOpenAIKey: !!openaiApiKey,
      isDemoMode: demoMode === "false" || demoMode === "0" ? false : true,
    },
    message: !openaiApiKey
      ? "❌ Erreur technique : La variable OPENAI_API_KEY est vide sur le serveur"
      : "✅ OPENAI_API_KEY est présente",
  };

  return NextResponse.json(debugInfo, { status: 200 });
}

