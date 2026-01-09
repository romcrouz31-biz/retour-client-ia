/**
 * 🔐 ROUTE API ADMIN - MISE À JOUR CLÉ API CLIENT
 * 
 * ⚠️ ATTENTION : Cette route nécessite un stockage persistant de la clé.
 * 
 * Pour un MVP simple, cette solution n'est PAS recommandée car :
 * - Next.js ne permet pas de modifier les variables d'environnement dynamiquement
 * - Il faudrait une base de données ou un fichier côté serveur
 * - Plus complexe à maintenir
 * 
 * RECOMMANDATION : Utiliser directement les variables Vercel
 * (voir CLIENT_API_KEY.md pour les instructions)
 * 
 * Cette route est fournie à titre d'exemple pour une implémentation future.
 */

import { NextResponse } from "next/server";

// ⚠️ À CONFIGURER : Mot de passe administrateur
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || "changez-moi-123";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { apiKey, password } = body;

    // Vérification du mot de passe
    if (password !== ADMIN_PASSWORD) {
      return NextResponse.json(
        { error: "Mot de passe administrateur incorrect" },
        { status: 401 }
      );
    }

    // Vérification de la clé API
    if (!apiKey || !apiKey.startsWith("sk-")) {
      return NextResponse.json(
        { error: "Clé API invalide. Elle doit commencer par 'sk-'" },
        { status: 400 }
      );
    }

    // ⚠️ PROBLÈME : Next.js ne permet pas de modifier process.env dynamiquement
    // Il faudrait :
    // - Soit utiliser une base de données pour stocker la clé
    // - Soit écrire dans un fichier .env (complexe et non recommandé)
    // - Soit utiliser un service de stockage comme Redis/Vercel KV

    // Pour un MVP, la meilleure solution est d'utiliser Vercel directement
    // (voir CLIENT_API_KEY.md)

    return NextResponse.json({
      message:
        "⚠️ Cette fonctionnalité nécessite une implémentation supplémentaire. Utilisez plutôt les variables Vercel (voir CLIENT_API_KEY.md)",
      info: "La clé API n'a pas été enregistrée. Veuillez la configurer via Vercel.",
    });
  } catch (error) {
    console.error("Erreur lors de la mise à jour de la clé API:", error);
    return NextResponse.json(
      {
        error:
          error instanceof Error
            ? error.message
            : "Une erreur est survenue",
      },
      { status: 500 }
    );
  }
}

