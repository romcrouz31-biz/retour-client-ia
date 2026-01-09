/**
 * 🔐 PAGE D'ADMINISTRATION - CONFIGURATION CLÉ API CLIENT
 * 
 * Cette page permet au client de configurer sa propre clé API OpenAI.
 * PROTÉGÉE PAR MOT DE PASSE (à configurer via variable d'environnement)
 * 
 * ⚠️ Pour un MVP simple, cette solution nécessite un stockage de la clé.
 * Alternative : Utiliser directement les variables Vercel (voir CLIENT_API_KEY.md)
 */

"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default function AdminPage() {
  const [apiKey, setApiKey] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState<{
    type: "success" | "error";
    text: string;
  } | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setMessage(null);

    try {
      const response = await fetch("/api/admin/update-key", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          apiKey,
          password,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Une erreur est survenue");
      }

      setMessage({
        type: "success",
        text: "Clé API configurée avec succès !",
      });
      setApiKey("");
      setPassword("");
    } catch (error) {
      setMessage({
        type: "error",
        text:
          error instanceof Error
            ? error.message
            : "Erreur lors de la configuration",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-indigo-50/30 py-8 px-4 sm:py-12 sm:px-6 lg:px-8">
      <div className="max-w-2xl mx-auto">
        <Card className="shadow-lg border border-slate-200 bg-white">
          <CardHeader>
            <CardTitle className="text-2xl font-bold text-slate-900">
              🔐 Configuration Clé API
            </CardTitle>
            <CardDescription>
              Entrez votre clé API OpenAI pour utiliser vos propres crédits
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label
                  htmlFor="password"
                  className="block text-sm font-medium text-slate-700 mb-2"
                >
                  Mot de passe administrateur
                </label>
                <input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="w-full p-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Mot de passe"
                />
              </div>

              <div>
                <label
                  htmlFor="apiKey"
                  className="block text-sm font-medium text-slate-700 mb-2"
                >
                  Votre clé API OpenAI
                </label>
                <input
                  id="apiKey"
                  type="password"
                  value={apiKey}
                  onChange={(e) => setApiKey(e.target.value)}
                  required
                  className="w-full p-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 font-mono text-sm"
                  placeholder="sk-..."
                />
                <p className="mt-2 text-xs text-slate-500">
                  Votre clé API commence par "sk-" et se trouve sur{" "}
                  <a
                    href="https://platform.openai.com/api-keys"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:underline"
                  >
                    platform.openai.com/api-keys
                  </a>
                </p>
              </div>

              {message && (
                <div
                  className={`p-3 rounded-lg ${
                    message.type === "success"
                      ? "bg-green-50 border border-green-200 text-green-700"
                      : "bg-red-50 border border-red-200 text-red-700"
                  }`}
                >
                  {message.text}
                </div>
              )}

              <Button
                type="submit"
                disabled={isLoading}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white"
              >
                {isLoading ? "Configuration en cours..." : "Configurer la clé API"}
              </Button>
            </form>

            <div className="mt-6 p-4 bg-amber-50 border border-amber-200 rounded-lg">
              <h3 className="font-semibold text-amber-900 mb-2">
                ⚠️ Important
              </h3>
              <ul className="text-sm text-amber-800 space-y-1">
                <li>
                  • Votre clé API sera utilisée pour tous les appels OpenAI
                </li>
                <li>
                  • Vous serez facturé directement par OpenAI selon votre
                  utilisation
                </li>
                <li>
                  • Votre clé est stockée de manière sécurisée côté serveur
                </li>
              </ul>
            </div>
          </CardContent>
        </Card>
      </div>
    </main>
  );
}

