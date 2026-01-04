import type { AnalysisResult } from "./types";

/**
 * Types de retours clients détectables
 */
type FeedbackCategory =
  | "design"
  | "bug"
  | "feature"
  | "satisfaction"
  | "urgency"
  | "performance";

/**
 * Informations extraites du feedback
 */
type FeedbackAnalysis = {
  categories: FeedbackCategory[];
  keywords: string[];
  sentiment: "positive" | "negative" | "neutral";
  urgency: boolean;
  hasSpecificRequests: boolean;
};

/**
 * Analyse le texte du feedback pour extraire des informations clés
 */
export function analyzeFeedback(feedback: string): FeedbackAnalysis {
  const lowerText = feedback.toLowerCase();
  const words = lowerText.split(/\s+/);

  const categories: FeedbackCategory[] = [];
  const keywords: string[] = [];
  let sentiment: "positive" | "negative" | "neutral" = "neutral";
  let urgency = false;
  let hasSpecificRequests = false;

  // Détection des catégories
  const categoryPatterns = {
    design: [
      "design",
      "couleur",
      "couleurs",
      "style",
      "esthétique",
      "apparence",
      "interface",
      "ui",
      "visuel",
      "moderne",
      "ancien",
      "maquette",
      "mockup",
    ],
    bug: [
      "bug",
      "erreur",
      "dysfonctionnement",
      "problème",
      "ne marche pas",
      "ne fonctionne pas",
      "cassé",
      "plantage",
      "crash",
      "bloque",
    ],
    feature: [
      "fonctionnalité",
      "fonctionnalités",
      "ajouter",
      "nouveau",
      "manque",
      "besoin",
      "souhaite",
      "voulez",
      "pourrait",
      "serait bien",
      "idéal",
    ],
    performance: [
      "lent",
      "rapide",
      "performance",
      "vitesse",
      "chargement",
      "optimiser",
      "optimisation",
      "temps",
      "efficace",
    ],
    satisfaction: [
      "satisfait",
      "content",
      "excellent",
      "super",
      "parfait",
      "insatisfait",
      "déçu",
      "décevant",
      "mauvais",
      "nul",
      "bravo",
      "merci",
    ],
    urgency: [
      "urgent",
      "rapidement",
      "immédiat",
      "tout de suite",
      "asap",
      "critique",
      "important",
      "prioritaire",
      "deadline",
      "date",
      "délai",
    ],
  };

  // Analyse des catégories et keywords
  for (const [category, patterns] of Object.entries(categoryPatterns)) {
    for (const pattern of patterns) {
      if (lowerText.includes(pattern)) {
        if (!categories.includes(category as FeedbackCategory)) {
          categories.push(category as FeedbackCategory);
        }
        if (!keywords.includes(pattern)) {
          keywords.push(pattern);
        }
      }
    }
  }

  // Détection du sentiment
  const positiveWords = [
    "bien",
    "bon",
    "excellent",
    "super",
    "parfait",
    "satisfait",
    "content",
    "merci",
    "bravo",
    "génial",
  ];
  const negativeWords = [
    "mauvais",
    "nul",
    "insatisfait",
    "déçu",
    "problème",
    "erreur",
    "bug",
    "cassé",
    "horrible",
    "décevant",
  ];

  const positiveCount = positiveWords.filter((word) =>
    lowerText.includes(word)
  ).length;
  const negativeCount = negativeWords.filter((word) =>
    lowerText.includes(word)
  ).length;

  if (negativeCount > positiveCount) {
    sentiment = "negative";
  } else if (positiveCount > negativeCount) {
    sentiment = "positive";
  }

  // Détection de l'urgence
  urgency = categories.includes("urgency") || negativeCount > 2;

  // Détection de demandes spécifiques
  const specificIndicators = [
    "besoin",
    "souhaite",
    "voulez",
    "faudrait",
    "devrait",
    "pourrait",
    "merci de",
    "j'aimerais",
    "il faut",
  ];
  hasSpecificRequests = specificIndicators.some((indicator) =>
    lowerText.includes(indicator)
  );

  return {
    categories: categories.length > 0 ? categories : ["feature"],
    keywords,
    sentiment,
    urgency,
    hasSpecificRequests,
  };
}

/**
 * Génère une réponse personnalisée basée sur l'analyse du feedback
 */
export function generatePersonalizedResponse(
  feedback: string,
  analysis: FeedbackAnalysis
): AnalysisResult {
  const { categories, keywords, sentiment, urgency, hasSpecificRequests } =
    analysis;

  // Détermination de la priorité
  let priority: "Urgent" | "Normal" | "Faible" = "Normal";
  if (urgency || sentiment === "negative") {
    priority = "Urgent";
  } else if (sentiment === "positive" && !hasSpecificRequests) {
    priority = "Faible";
  }

  // Extraction d'éléments spécifiques du texte pour enrichir le résumé
  const specificElements: string[] = [];
  
  // Extraire des mentions de couleurs
  const colorMatches = feedback.match(/\b(rouge|bleu|vert|jaune|noir|blanc|gris|violet|orange|rose|moderne|vif|sombre|clair)\b/gi);
  if (colorMatches) {
    specificElements.push(`mention de couleurs/styles (${colorMatches.slice(0, 3).join(", ")})`);
  }
  
  // Extraire des mentions de fonctionnalités
  const featureKeywords = feedback.match(/\b(bouton|menu|formulaire|page|écran|section|fonction|outil)\b/gi);
  if (featureKeywords) {
    specificElements.push(`éléments spécifiques mentionnés (${[...new Set(featureKeywords)].slice(0, 3).join(", ")})`);
  }

  // Génération du résumé complet et global
  let summary = "";
  const elementsText = specificElements.length > 0 ? ` ${specificElements.join(", ")}.` : "";
  
  // Extraire les phrases clés du feedback pour enrichir le résumé
  const sentences = feedback
    .split(/[.!?]\s+/)
    .filter((s) => s.trim().length > 15)
    .slice(0, 2)
    .map((s) => s.trim());
  
  if (categories.includes("design")) {
    const sentimentText = sentiment === "negative" 
      ? "exprime une insatisfaction concernant" 
      : sentiment === "positive" 
      ? "est globalement satisfait mais souhaite des améliorations sur" 
      : "souhaite des modifications sur";
    summary = `le client ${sentimentText} le design et l'esthétique du projet.${elementsText} ${hasSpecificRequests ? "Les demandes formulées sont relativement précises et concernent principalement les aspects visuels." : "Des précisions supplémentaires sur les attentes précises seront nécessaires pour procéder aux modifications."}`;
  } else if (categories.includes("bug")) {
    summary = `le client signale des problèmes techniques et des dysfonctionnements dans le projet.${elementsText} ${urgency ? "Ces problèmes sont critiques et nécessitent une intervention rapide pour garantir le bon fonctionnement." : "Ces problèmes nécessitent une attention et des corrections, mais ne bloquent pas complètement l'utilisation du projet."}`;
  } else if (categories.includes("feature")) {
    summary = `le client demande l'ajout ou l'amélioration de fonctionnalités au sein du projet.${elementsText} ${hasSpecificRequests ? "Les demandes sont assez précises et détaillées, permettant une analyse approfondie pour établir un plan d'action." : "Les besoins exprimés nécessitent d'être clarifiés et détaillés pour pouvoir établir une estimation précise du travail à réaliser."}`;
  } else if (categories.includes("performance")) {
    summary = `le client mentionne des préoccupations concernant les performances et l'optimisation du système.${elementsText} ${urgency ? "Des optimisations urgentes sont nécessaires pour améliorer l'expérience utilisateur et la fluidité du projet." : "Des améliorations de performance peuvent être planifiées et mises en œuvre dans les prochaines itérations du projet."}`;
  } else if (sentiment === "positive") {
    summary = `le client exprime des retours positifs sur le travail effectué jusqu'à présent.${elementsText} ${hasSpecificRequests ? "Quelques suggestions d'amélioration sont proposées pour continuer à optimiser et perfectionner le projet." : "le client est satisfait du résultat actuel et n'exprime pas de besoins supplémentaires pour le moment."}`;
  } else {
    summary = `le client a partagé des retours et des commentaires concernant le projet.${elementsText} ${hasSpecificRequests ? "Des demandes spécifiques ont été formulées et nécessitent une analyse approfondie pour déterminer la meilleure approche à adopter." : "Des clarifications supplémentaires seront nécessaires pour bien comprendre les attentes et les besoins exprimés par le client."}`;
  }
  
  // Capitaliser la première lettre du résumé
  summary = summary.charAt(0).toUpperCase() + summary.slice(1);
  
  // Génération de la checklist avec actions concrètes et exploitables
  const checklist: string[] = [];

  if (categories.includes("design")) {
    checklist.push(
      "Analyser en détail les demandes de modifications esthétiques mentionnées",
      "Créer des propositions de design/mockups basées sur les retours",
      "Identifier les éléments spécifiques à modifier (couleurs, styles, layouts, composants)"
    );
    if (keywords.some(k => k.includes("couleur") || k.includes("style"))) {
      checklist.push("Définir une palette de couleurs cohérente avec les demandes");
    }
    checklist.push("Valider les propositions visuelles avec le client avant développement");
    checklist.push("Planifier l'implémentation des changements de design");
  }

  if (categories.includes("bug")) {
    checklist.push(
      "Reproduire chaque problème signalé dans l'environnement de développement",
      "Documenter chaque bug avec les étapes de reproduction et les conditions",
      "Prioriser les bugs selon leur impact utilisateur (critiques d'abord)"
    );
    checklist.push("Corriger les bugs identifiés en commençant par les plus critiques");
    checklist.push("Tester toutes les corrections avant déploiement en production");
    if (urgency) {
      checklist.push("Préparer et déployer un correctif urgent (hotfix) si nécessaire");
    }
  }

  if (categories.includes("feature")) {
    checklist.push(
      "Détailler précisément chaque fonctionnalité demandée avec leurs spécifications",
      "Évaluer la complexité technique et l'effort de développement requis",
      "Estimer le temps et les ressources nécessaires pour chaque fonctionnalité"
    );
    checklist.push("Établir un devis détaillé et un planning réaliste");
    checklist.push("Présenter les estimations et le planning au client pour validation");
    if (urgency) {
      checklist.push("Identifier les fonctionnalités prioritaires à développer en premier");
    }
  }

  if (categories.includes("performance")) {
    checklist.push(
      "Identifier les zones de performance à optimiser (chargement, requêtes, rendu)",
      "Analyser les métriques actuelles (temps de chargement, temps de réponse, etc.)",
      "Établir un plan d'optimisation avec des objectifs mesurables"
    );
    checklist.push("Mettre en place des optimisations ciblées (cache, lazy loading, compression, etc.)");
    checklist.push("Tester et mesurer les améliorations pour valider les gains de performance");
  }

  // Actions de communication et suivi
  if (sentiment === "negative" || urgency) {
    checklist.unshift("Prendre contact rapidement avec le client pour discuter des points soulevés");
    checklist.push("Établir un plan d'action prioritaire avec des échéances claires");
    checklist.push("Mettre en place un suivi régulier pour informer le client de l'avancement");
  } else if (sentiment === "positive" && hasSpecificRequests) {
    checklist.push("Remercier le client pour ses retours positifs et ses suggestions");
  }

  // Checklist générique si aucune catégorie spécifique détectée
  if (checklist.length === 0) {
    checklist.push(
      "Analyser en détail les retours du client pour identifier les besoins",
      "Catégoriser les demandes par type (design, fonctionnalité, technique, etc.)",
      "Identifier les actions prioritaires à entreprendre",
      "Planifier la mise en œuvre des demandes avec un calendrier réaliste"
    );
  }

  // Génération des points à clarifier (questions pertinentes pour gagner du temps)
  const pointsToClarify: string[] = [];

  if (categories.includes("design")) {
    if (!keywords.some((k) => k.includes("couleur"))) {
      pointsToClarify.push("Quels sont les éléments de design précis à modifier ? (couleurs, typographie, espacements, composants)");
      pointsToClarify.push("Y a-t-il des références visuelles ou exemples de design souhaité ?");
    } else {
      pointsToClarify.push("Quelle palette de couleurs exacte souhaite le client ? (codes hexadécimaux ou références)");
    }
    pointsToClarify.push("Y a-t-il des contraintes techniques ou de branding à respecter ?");
  }

  if (categories.includes("bug")) {
    pointsToClarify.push("Quels sont les scénarios précis pour reproduire chaque bug ? (étapes détaillées)");
    pointsToClarify.push("Sur quels navigateurs, appareils ou environnements les problèmes apparaissent-ils ?");
    if (!feedback.toLowerCase().includes("screenshot") && !feedback.toLowerCase().includes("capture")) {
      pointsToClarify.push("Le client peut-il fournir des captures d'écran ou vidéos des bugs ?");
    }
  }

  if (categories.includes("feature")) {
    pointsToClarify.push("Quelles sont les fonctionnalités prioritaires pour le client ? (ordre d'importance)");
    pointsToClarify.push("Y a-t-il un budget prévu et des délais souhaités pour ces ajouts ?");
    pointsToClarify.push("Ces nouvelles fonctionnalités doivent-elles être intégrées à la version actuelle ou à une version future ?");
    if (!hasSpecificRequests) {
      pointsToClarify.push("Peut-on avoir plus de détails sur le comportement attendu de chaque fonctionnalité ?");
    }
  }

  if (categories.includes("performance")) {
    pointsToClarify.push("Quels sont les objectifs de performance précis ? (temps de chargement cible, nombre d'utilisateurs simultanés, etc.)");
    pointsToClarify.push("Y a-t-il des zones spécifiques où les performances sont particulièrement problématiques ?");
  }

  if (urgency) {
    pointsToClarify.push("Quelle est la date butoir ou l'échéance pour la résolution de ces points ?");
  }

  if (sentiment === "negative") {
    pointsToClarify.push("Quels sont les critères précis de satisfaction non respectés actuellement ?");
    pointsToClarify.push("Y a-t-il des aspects du projet qui fonctionnent bien et qu'il faut préserver ?");
  } else if (sentiment === "positive" && hasSpecificRequests) {
    pointsToClarify.push("Quelle est la priorité des suggestions d'amélioration proposées ?");
  }

  // Points génériques si pas assez de points spécifiques
  if (pointsToClarify.length < 2) {
    pointsToClarify.push("Des précisions supplémentaires sont-elles nécessaires pour bien comprendre les attentes ?");
    pointsToClarify.push("Y a-t-il des contraintes ou prérequis à prendre en compte ?");
  }

  // Génération du message de réponse suggéré
  const suggestedResponse = generateSuggestedResponse(
    feedback,
    analysis,
    summary,
    checklist
  );

  return {
    summary: summary.trim(),
    checklist: checklist.slice(0, 6), // Maximum 6 actions
    pointsToClarify: pointsToClarify.slice(0, 4), // Maximum 4 points
    priority,
    suggestedResponse,
  };
}

/**
 * Génère un message de réponse professionnel que le freelance peut envoyer au client
 */
function generateSuggestedResponse(
  feedback: string,
  analysis: FeedbackAnalysis,
  summary: string,
  checklist: string[]
): string {
  const { categories, sentiment, urgency } = analysis;

  let message = "";

  // Salutation adaptée au contexte
  if (urgency || sentiment === "negative") {
    message += "Bonjour,\n\n";
    message += "Merci pour vos retours. Je comprends vos préoccupations et je m'en occupe en priorité.\n\n";
  } else if (sentiment === "positive") {
    message += "Bonjour,\n\n";
    message += "Merci pour vos retours positifs, je suis ravi que le travail vous plaise.\n\n";
  } else {
    message += "Bonjour,\n\n";
    message += "Merci pour vos retours, je les ai bien pris en compte.\n\n";
  }

  // Corps du message selon les catégories
  if (categories.includes("design")) {
    message +=
      "Concernant vos demandes de modifications esthétiques, je vais préparer des propositions de design qui correspondent à vos attentes. ";
    if (urgency) {
      message +=
        "Je vous enverrai les premières propositions dans les plus brefs délais.\n\n";
    } else {
      message +=
        "Je vous présenterai les propositions dans les prochains jours pour validation avant développement.\n\n";
    }
  } else if (categories.includes("bug")) {
    message +=
      "J'ai bien noté les problèmes techniques que vous avez signalés. Je vais les analyser et les corriger en priorité. ";
    if (urgency) {
      message +=
        "Je vous tiendrai informé de l'avancement de la résolution dans les plus brefs délais.\n\n";
    } else {
      message +=
        "Je vous informerai dès que les corrections seront effectuées.\n\n";
    }
  } else if (categories.includes("feature")) {
    message +=
      "Concernant les nouvelles fonctionnalités que vous souhaitez, je vais analyser chaque demande en détail pour vous fournir une estimation précise (temps et coût). ";
    message +=
      "Je vous présenterai un devis détaillé et un planning réaliste dans les prochains jours.\n\n";
  } else if (categories.includes("performance")) {
    message +=
      "Pour les questions de performance, je vais analyser les points soulevés et mettre en place les optimisations nécessaires. ";
    message +=
      "Je vous tiendrai informé des améliorations apportées.\n\n";
  } else {
    message +=
      "J'ai bien pris en compte vos retours et je vais analyser chaque point en détail pour y répondre de manière appropriée.\n\n";
  }

  // Prochaine étape
  if (urgency) {
    message +=
      "Je vous recontacterai rapidement pour discuter des priorités et établir un plan d'action.\n\n";
  } else {
    message +=
      "N'hésitez pas si vous avez des questions ou des précisions à apporter. Je reste à votre disposition.\n\n";
  }

  // Formule de politesse
  message += "Cordialement,";

  return message;
}

