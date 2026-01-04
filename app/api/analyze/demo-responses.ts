import type { AnalysisResult } from "./types";

export const DEMO_RESPONSES: AnalysisResult[] = [
  {
    summary:
      "Le client demande des améliorations esthétiques importantes (design moderne, couleurs vives) et identifie des problèmes de clarté dans certaines fonctionnalités. Les demandes sont claires mais nécessitent une refonte partielle de l'interface.",
    checklist: [
      "Refaire le design avec une approche plus moderne et épurée",
      "Réviser la palette de couleurs pour des teintes plus vives et attractives",
      "Améliorer la clarté et l'ergonomie des fonctionnalités existantes",
      "Créer des maquettes et les valider avec le client avant développement",
      "Optimiser l'UX pour une meilleure compréhension des fonctionnalités",
    ],
    pointsToClarify: [
      "Quels éléments de design précisément doivent être modernisés ?",
      "Quelle palette de couleurs exacte le client souhaite-t-il ?",
      "Quelles fonctionnalités spécifiques manquent de clarté ?",
    ],
    priority: "Normal",
  },
  {
    summary:
      "Retours très positifs avec quelques suggestions d'amélioration mineures. Le client est satisfait du travail actuel et propose seulement des optimisations non urgentes.",
    checklist: [
      "Considérer les suggestions d'amélioration pour une future mise à jour",
      "Prioriser les améliorations selon leur impact utilisateur",
      "Planifier les optimisations dans les prochaines itérations",
    ],
    pointsToClarify: [
      "Quelle est la priorité des améliorations suggérées ?",
      "Y a-t-il un budget prévu pour ces optimisations ?",
    ],
    priority: "Faible",
  },
  {
    summary:
      "Le client exprime une insatisfaction importante concernant plusieurs aspects du projet : délais non respectés, fonctionnalités manquantes et qualité insuffisante. Action immédiate requise.",
    checklist: [
      "Prendre contact immédiatement avec le client pour discuter des problèmes",
      "Identifier et documenter tous les points d'insatisfaction",
      "Établir un plan d'action prioritaire pour résoudre les problèmes critiques",
      "Mettre en place un suivi régulier avec le client",
      "Revoir le planning et les priorités du projet",
      "Assurer une communication transparente sur l'avancement",
    ],
    pointsToClarify: [
      "Quelles sont les fonctionnalités exactes qui manquent ?",
      "Quels sont les délais attendus par le client ?",
      "Quels critères de qualité spécifiques ne sont pas respectés ?",
      "Y a-t-il une date butoir critique pour la résolution ?",
    ],
    priority: "Urgent",
  },
  {
    summary:
      "Le client souhaite ajouter de nouvelles fonctionnalités au projet existant. Les demandes sont bien formulées et semblent cohérentes avec l'objectif initial. Nécessite une estimation de temps et de coût.",
    checklist: [
      "Analyser en détail chaque nouvelle fonctionnalité demandée",
      "Estimer le temps de développement pour chaque fonctionnalité",
      "Établir un devis pour les nouvelles fonctionnalités",
      "Présenter le planning et les coûts au client",
      "Valider les priorités avec le client avant de commencer",
    ],
    pointsToClarify: [
      "Quel est le budget disponible pour ces nouvelles fonctionnalités ?",
      "Quelles sont les fonctionnalités prioritaires pour le client ?",
      "Y a-t-il des contraintes de délai pour ces ajouts ?",
      "Les nouvelles fonctionnalités doivent-elles être intégrées dans la version actuelle ou dans une future version ?",
    ],
    priority: "Normal",
  },
  {
    summary:
      "Retours techniques détaillés sur des bugs et des problèmes de performance. Le client a identifié des dysfonctionnements précis qui nécessitent une correction rapide mais ne bloquent pas complètement l'utilisation.",
    checklist: [
      "Reproduire et documenter chaque bug signalé",
      "Prioriser les bugs selon leur impact utilisateur",
      "Corriger les bugs critiques en premier",
      "Optimiser les performances des zones identifiées",
      "Tester toutes les corrections avant déploiement",
      "Préparer une mise à jour de correction (hotfix)",
    ],
    pointsToClarify: [
      "Quels sont les scénarios précis pour reproduire chaque bug ?",
      "Y a-t-il des données ou fichiers spécifiques à utiliser pour les tests ?",
      "Quelles sont les performances attendues par le client ?",
    ],
    priority: "Normal",
  },
];

import { analyzeFeedback, generatePersonalizedResponse } from "./text-analyzer";

/**
 * Retourne une réponse démo personnalisée basée sur l'analyse du feedback
 */
export function getPersonalizedDemoResponse(feedback: string): AnalysisResult {
  // Analyser le feedback pour extraire les informations clés
  const analysis = analyzeFeedback(feedback);
  
  // Générer une réponse personnalisée
  const personalizedResponse = generatePersonalizedResponse(feedback, analysis);
  
  return personalizedResponse;
}

/**
 * Retourne une réponse démo aléatoire (ancienne méthode - gardée pour compatibilité)
 * @deprecated Utilisez getPersonalizedDemoResponse à la place
 */
export function getRandomDemoResponse(): AnalysisResult {
  const randomIndex = Math.floor(Math.random() * DEMO_RESPONSES.length);
  return DEMO_RESPONSES[randomIndex];
}

