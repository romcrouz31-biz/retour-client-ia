# 🎭 Guide du Mode Démo

## Vue d'ensemble

Le mode démo permet de tester l'application **sans utiliser l'API OpenAI**, donc **sans aucun coût**. C'est idéal pour :
- Tester l'application avant la vente
- Faire des démonstrations
- Développer sans consommer de crédits API

## 🔧 Configuration

### Activer le Mode Démo

Éditez le fichier `.env.local` à la racine du projet et ajoutez :

```env
DEMO_MODE=true
```

**Important** : En mode démo, vous n'avez **pas besoin** de clé API OpenAI.

### Désactiver le Mode Démo (Mode Production)

Pour utiliser la vraie API OpenAI, modifiez `.env.local` :

```env
DEMO_MODE=false
OPENAI_API_KEY=votre_cle_api_openai_ici
```

## 🎲 Comportement

### Mode Démo (`DEMO_MODE=true`)

- ✅ **Pas d'appel API** → Aucun coût
- ✅ **Réponses instantanées** (avec un léger délai simulé pour réalisme)
- ✅ **5 réponses différentes** disponibles, choisies aléatoirement
- ✅ **Format identique** aux réponses réelles (Résumé, Checklist, Points à clarifier, Priorité)

### Mode Production (`DEMO_MODE=false`)

- ✅ Utilise l'API OpenAI (GPT-4o-mini)
- ✅ Analyse réelle des retours clients
- ⚠️ **Nécessite une clé API valide**
- ⚠️ **Génère des coûts** selon l'utilisation

## 📝 Exemples de Réponses Démo

Le mode démo propose 5 scénarios différents :

1. **Améliorations esthétiques** (Priorité: Normal)
2. **Retours positifs** (Priorité: Faible)
3. **Insatisfaction client** (Priorité: Urgent)
4. **Nouvelles fonctionnalités** (Priorité: Normal)
5. **Bugs et performance** (Priorité: Normal)

Chaque requête sélectionne **aléatoirement** l'une de ces réponses pour simuler différents types de retours clients.

## 🔄 Redémarrer le Serveur

Après avoir modifié `.env.local`, vous devez **redémarrer le serveur** pour que les changements prennent effet :

```bash
# Arrêter le serveur (Ctrl+C dans le terminal)
# Puis relancer
npm run dev
```

## ✅ Vérification

Pour vérifier que le mode démo est actif :
1. Analysez un retour client
2. Vérifiez que la réponse apparaît rapidement (sans délai d'API)
3. Les réponses varient à chaque requête (sélection aléatoire)

## 🔒 Sécurité

- La clé API OpenAI n'est **jamais exposée** côté frontend
- Le mode est contrôlé **uniquement** côté serveur
- Les variables d'environnement restent privées (fichier `.env.local` dans `.gitignore`)

