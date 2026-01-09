# Analyseur de Retours Clients

Une application web MVP simple pour analyser les retours clients et les transformer en instructions claires et exploitables grâce à l'IA.

## 🚀 Fonctionnalités

- Zone de texte pour coller les retours clients
- Analyse intelligente via l'API OpenAI
- Résultats structurés avec :
  - Résumé
  - Checklist d'actions
  - Points à clarifier
  - Niveau de priorité (Urgent/Normal/Faible)

## 📋 Prérequis

- Node.js 18+ installé
- Une clé API OpenAI (optionnel si vous utilisez le mode démo)

## 🔧 Installation

1. **Installer les dépendances :**

```bash
npm install
```

2. **Configurer les variables d'environnement :**

Créez un fichier `.env.local` à la racine du projet :

```bash
echo "DEMO_MODE=true" > .env.local
```

Ou créez-le manuellement avec le contenu suivant :

**Mode Démo (recommandé pour tester sans coût API) :**

```
DEMO_MODE=true
```

**Mode Production (avec API OpenAI) :**

```
DEMO_MODE=false
OPENAI_API_KEY=votre_cle_api_openai_ici
```

### 🎭 Mode Démo

Le mode démo permet de tester l'application sans utiliser l'API OpenAI (gratuit, sans coût) :

- Activez-le en définissant `DEMO_MODE=true` dans `.env.local`
- L'application retournera des réponses simulées réalistes
- Parfait pour les démonstrations et tests avant vente
- 5 réponses différentes sont disponibles et choisies aléatoirement

### 🚀 Mode Production

Pour utiliser la vraie API OpenAI :

- Définissez `DEMO_MODE=false` dans `.env.local`
- Ajoutez votre clé API OpenAI : `OPENAI_API_KEY=votre_cle`
- L'application utilisera GPT-4o-mini pour analyser les retours

## 🏃 Lancer l'application en local

```bash
npm run dev
```

L'application sera accessible à l'adresse : [http://localhost:3000](http://localhost:3000)

## 🛠️ Technologies utilisées

- **Next.js 14** (App Router)
- **TypeScript**
- **Tailwind CSS**
- **Shadcn UI** (composants UI)
- **OpenAI API** (GPT-4o-mini)

## 📝 Structure du projet

```
├── app/
│   ├── api/
│   │   └── analyze/
│   │       ├── route.ts           # Route API pour l'analyse
│   │       ├── demo-responses.ts  # Réponses simulées pour le mode démo
│   │       └── types.ts           # Types TypeScript
│   ├── layout.tsx                 # Layout principal
│   ├── page.tsx                   # Page d'accueil
│   └── globals.css                # Styles globaux
├── components/
│   └── ui/                        # Composants UI (Shadcn)
├── lib/
│   └── utils.ts                   # Utilitaires
└── package.json
```

## 💡 Utilisation

1. Collez ou saisissez les retours clients dans la zone de texte
2. Cliquez sur "Analyser les retours"
3. Consultez les résultats structurés :
   - Le résumé donne une vue d'ensemble
   - La checklist liste les actions à entreprendre
   - Les points à clarifier identifient les ambiguïtés
   - La priorité indique l'urgence de la demande

## 📄 Licence

MIT
# freelance-assistant-dev-v1
