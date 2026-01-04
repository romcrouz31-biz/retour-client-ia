"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";

// Types pour l'API Web Speech Recognition
declare global {
  interface Window {
    SpeechRecognition: any;
    webkitSpeechRecognition: any;
  }
}
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Sparkles, Copy, Check, ChevronDown, ChevronRight, Mic, MicOff } from "lucide-react";

type AnalysisResult = {
  summary: string;
  checklist: string[];
  pointsToClarify: string[];
  priority: "Urgent" | "Normal" | "Faible";
  suggestedResponse?: string;
};

export default function Home() {
  const [feedback, setFeedback] = useState("");
  const [result, setResult] = useState<AnalysisResult | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);
  const [checklistOpen, setChecklistOpen] = useState(true);
  const [clarifyOpen, setClarifyOpen] = useState(true);
  const [messageOpen, setMessageOpen] = useState(true);
  const [isRecording, setIsRecording] = useState(false);
  const [recognition, setRecognition] = useState<any | null>(null);

  const analyzeFeedback = async () => {
    if (!feedback.trim()) {
      setError("Veuillez saisir des retours clients avant d'analyser.");
      return;
    }

    setIsLoading(true);
    setError(null);
    setResult(null);

    try {
      const response = await fetch("/api/analyze", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ feedback }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Une erreur est survenue");
      }

      const data = await response.json();
      setResult(data);
      // Réinitialiser l'état des sections repliables à chaque nouvelle analyse
      setChecklistOpen(true);
      setClarifyOpen(true);
      setMessageOpen(true);
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Une erreur est survenue lors de l'analyse"
      );
    } finally {
      setIsLoading(false);
    }
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // Initialisation de l'API Speech Recognition
  useEffect(() => {
    if (typeof window !== "undefined") {
      const SpeechRecognitionAPI =
        (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
      
      if (SpeechRecognitionAPI) {
        try {
          const recognitionInstance = new SpeechRecognitionAPI();
          recognitionInstance.lang = "fr-FR";
          recognitionInstance.continuous = true;
          recognitionInstance.interimResults = true;

          recognitionInstance.onresult = (event: any) => {
            let finalTranscript = "";

            for (let i = event.resultIndex; i < event.results.length; i++) {
              const transcript = event.results[i][0].transcript;
              if (event.results[i].isFinal) {
                finalTranscript += transcript + " ";
              }
            }

            if (finalTranscript) {
              setFeedback((prev) => {
                return prev + finalTranscript;
              });
            }
          };

          recognitionInstance.onerror = (event: any) => {
            console.error("Erreur de reconnaissance vocale:", event.error);
            if (event.error === "no-speech") {
              setError("Aucune parole détectée. Veuillez réessayer.");
            } else if (event.error === "not-allowed") {
              setError("Permission du microphone refusée. Veuillez autoriser l'accès au microphone.");
            } else if (event.error === "aborted") {
              // Ignorer les erreurs d'abort
              return;
            } else {
              setError(`Erreur: ${event.error}`);
            }
            setIsRecording(false);
          };

          recognitionInstance.onend = () => {
            setIsRecording(false);
          };

          setRecognition(recognitionInstance);
        } catch (error) {
          console.error("Erreur lors de l'initialisation:", error);
        }
      }
    }
  }, []);

  const startRecording = () => {
    if (!recognition) {
      setError("La reconnaissance vocale n'est pas supportée. Utilisez Chrome, Edge ou Safari.");
      return;
    }

    if (isRecording) {
      return;
    }

    try {
      setError(null);
      setIsRecording(true);
      recognition.start();
    } catch (error: any) {
      console.error("Erreur lors du démarrage:", error);
      setError("Impossible de démarrer l'enregistrement. Veuillez réessayer.");
      setIsRecording(false);
    }
  };

  const stopRecording = () => {
    if (recognition && isRecording) {
      try {
        recognition.stop();
        setIsRecording(false);
      } catch (error) {
        console.error("Erreur lors de l'arrêt:", error);
        setIsRecording(false);
      }
    }
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-indigo-50/30 py-8 px-4 sm:py-12 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto space-y-6">
        {/* Header */}
        <div className="text-center space-y-4 mb-8">
          {/* Titre principal centré */}
          <div className="flex flex-col items-center gap-4">
            <div className="p-3 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-2xl shadow-lg">
              <Sparkles className="w-7 h-7 text-white" />
            </div>
            <div>
              <h1 className="text-4xl sm:text-5xl font-bold text-slate-900 leading-tight mb-2">
                Analyse automatique des retours clients
              </h1>
              <div className="inline-block px-3 py-1 bg-blue-100 text-blue-700 text-xs font-semibold rounded-full">
                Version démo
              </div>
            </div>
          </div>

          {/* Descriptions avec hiérarchie visuelle */}
          <div className="space-y-2 max-w-2xl mx-auto pt-2">
            <p className="text-lg text-slate-700 font-medium leading-relaxed">
              Transformez les retours clients en instructions claires et
              réponses professionnelles
            </p>
            <div className="w-16 h-0.5 bg-blue-200 mx-auto my-3"></div>
            <p className="text-sm text-slate-500 leading-relaxed">
              Cet outil permet de gagner du temps sur la gestion client
            </p>
          </div>
        </div>

        {/* Input Card */}
        <Card className="shadow-lg border border-slate-200 bg-white">
          <CardHeader className="pb-3">
            <CardTitle className="text-xl font-semibold text-slate-900">
              Retours clients
            </CardTitle>
            <CardDescription className="text-sm text-slate-600">
              Collez, saisissez ou enregistrez vocalement les retours clients à analyser
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="relative">
              <textarea
                value={feedback}
                onChange={(e) => setFeedback(e.target.value)}
                placeholder="Exemple : Le client souhaite que le design soit plus moderne, avec des couleurs plus vives. Il mentionne aussi que certaines fonctionnalités manquent de clarté..."
                className="w-full min-h-[180px] p-4 pr-12 border border-slate-300 rounded-lg resize-y focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm transition-all bg-white placeholder:text-slate-400"
              />
              <button
                onClick={isRecording ? stopRecording : startRecording}
                type="button"
                className={`absolute bottom-3 right-3 p-2.5 rounded-lg transition-all shadow-md ${
                  isRecording
                    ? "bg-gradient-to-br from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white animate-pulse"
                    : "bg-blue-50 hover:bg-blue-100 text-blue-600 border border-blue-200"
                }`}
                title={isRecording ? "Arrêter l'enregistrement" : "Enregistrer un message vocal"}
              >
                {isRecording ? (
                  <MicOff className="w-5 h-5" />
                ) : (
                  <Mic className="w-5 h-5" />
                )}
              </button>
            </div>
            {isRecording && (
              <div className="flex items-center gap-2 text-sm text-blue-600 font-medium">
                <div className="w-2 h-2 bg-blue-600 rounded-full animate-pulse"></div>
                <span>Enregistrement en cours...</span>
              </div>
            )}
            <div className="flex gap-3">
              <Button
                onClick={analyzeFeedback}
                disabled={isLoading || !feedback.trim() || isRecording}
                className="flex-1 bg-blue-600 hover:bg-blue-700 text-white shadow-md hover:shadow-lg transition-all font-medium"
                size="lg"
              >
              {isLoading ? (
                <>
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
                  Analyse en cours...
                </>
              ) : (
                <>
                  <Sparkles className="w-4 h-4 mr-2" />
                  Analyser les retours
                </>
              )}
              </Button>
            </div>
            {error && (
              <div className="p-3 bg-red-50 border border-red-200 rounded-lg text-red-700 text-sm">
                {error}
              </div>
            )}
          </CardContent>
        </Card>

        {/* Results Card */}
        {result && (
          <div className="space-y-4">
            <Card className="shadow-lg border border-slate-200 bg-white">
              <CardHeader className="pb-3">
                <CardTitle className="text-xl font-semibold text-slate-900">
                  Résultat de l&apos;analyse
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-5">
                {/* Résumé */}
                <div className="bg-blue-50/50 p-4 rounded-lg border border-blue-100">
                  <h3 className="text-base font-semibold mb-2.5 text-slate-900 flex items-center gap-2">
                    <span>📋</span>
                    <span>Résumé</span>
                  </h3>
                  <p className="text-slate-700 leading-relaxed text-sm">
                    {result.summary}
                  </p>
                </div>

                {/* Checklist */}
                {result.checklist.length > 0 && (
                  <div className="bg-slate-50/50 p-4 rounded-lg border border-slate-200">
                    <button
                      onClick={() => setChecklistOpen(!checklistOpen)}
                      className="w-full text-left"
                    >
                      <h3 className="text-base font-semibold mb-3 text-slate-900 flex items-center gap-2 hover:text-blue-600 transition-colors cursor-pointer">
                        {checklistOpen ? (
                          <ChevronDown className="w-4 h-4 text-slate-500" />
                        ) : (
                          <ChevronRight className="w-4 h-4 text-slate-500" />
                        )}
                        <span>✅</span>
                        <span>Checklist</span>
                      </h3>
                    </button>
                    {checklistOpen && (
                      <ul className="space-y-2.5">
                        {result.checklist.map((item, index) => (
                          <li
                            key={index}
                            className="flex items-start gap-3 text-slate-700 text-sm"
                          >
                            <span className="mt-0.5 text-blue-600 font-medium">
                              ☐
                            </span>
                            <span className="flex-1 leading-relaxed">
                              {item}
                            </span>
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                )}

                {/* Points à clarifier */}
                {result.pointsToClarify.length > 0 && (
                  <div className="bg-amber-50/50 p-4 rounded-lg border border-amber-100">
                    <button
                      onClick={() => setClarifyOpen(!clarifyOpen)}
                      className="w-full text-left"
                    >
                      <h3 className="text-base font-semibold mb-3 text-slate-900 flex items-center gap-2 hover:text-amber-600 transition-colors cursor-pointer">
                        {clarifyOpen ? (
                          <ChevronDown className="w-4 h-4 text-slate-500" />
                        ) : (
                          <ChevronRight className="w-4 h-4 text-slate-500" />
                        )}
                        <span>❓</span>
                        <span>Points à clarifier</span>
                      </h3>
                    </button>
                    {clarifyOpen && (
                      <ul className="space-y-2.5">
                        {result.pointsToClarify.map((point, index) => (
                          <li
                            key={index}
                            className="flex items-start gap-3 text-slate-700 text-sm"
                          >
                            <span className="mt-0.5 text-amber-600 font-medium">
                              •
                            </span>
                            <span className="flex-1 leading-relaxed">
                              {point}
                            </span>
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Message à envoyer */}
            {result.suggestedResponse && (
              <Card className="shadow-lg border border-green-200 bg-green-50/30">
                <CardHeader className="pb-3">
                  <button
                    onClick={() => setMessageOpen(!messageOpen)}
                    className="w-full text-left"
                  >
                    <CardTitle className="text-xl font-semibold text-slate-900 flex items-center gap-2 hover:text-green-700 transition-colors cursor-pointer">
                      {messageOpen ? (
                        <ChevronDown className="w-4 h-4 text-slate-500" />
                      ) : (
                        <ChevronRight className="w-4 h-4 text-slate-500" />
                      )}
                      <span>✉️</span>
                      <span>Message qui peut être envoyé</span>
                    </CardTitle>
                  </button>
                  <CardDescription className="text-sm text-slate-600">
                    Message professionnel prêt à envoyer (modifiable si
                    nécessaire)
                  </CardDescription>
                </CardHeader>
                {messageOpen && (
                  <CardContent className="space-y-3">
                    <div className="bg-white p-4 rounded-lg border border-green-200">
                      <pre className="whitespace-pre-wrap text-sm text-slate-700 font-sans leading-relaxed">
                        {result.suggestedResponse}
                      </pre>
                    </div>
                    <Button
                      onClick={() =>
                        copyToClipboard(result.suggestedResponse || "")
                      }
                      variant="outline"
                      className="w-full border-green-300 text-green-700 hover:bg-green-50 hover:border-green-400 transition-all"
                    >
                      {copied ? (
                        <>
                          <Check className="w-4 h-4 mr-2" />
                          Copié !
                        </>
                      ) : (
                        <>
                          <Copy className="w-4 h-4 mr-2" />
                          Copier le message
                        </>
                      )}
                    </Button>
                  </CardContent>
                )}
              </Card>
            )}
          </div>
        )}
      </div>
    </main>
  );
}
