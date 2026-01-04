# 🚀 Configuration OpenAI pour l'application

## 📋 Prérequis

Pour utiliser l'API OpenAI, vous devez :
1. Avoir un compte OpenAI
2. Ajouter au moins **5$ de crédit** à votre compte
3. Obtenir une clé API

## 🔑 Obtenir une clé API OpenAI

1. Allez sur https://platform.openai.com/api-keys
2. Connectez-vous à votre compte
3. Cliquez sur "Create new secret key"
4. Donnez un nom (ex: "Feedback Analyzer")
5. **Copiez la clé** (elle commence par `sk-`)
6. ⚠️ **Important** : La clé ne s'affichera qu'une seule fois, sauvegardez-la !

## ⚙️ Configuration dans l'application

### Étape 1 : Configurer `.env.local`

Ouvrez le fichier `.env.local` à la racine du projet et ajoutez/modifiez :

```env
DEMO_MODE=false
OPENAI_API_KEY=sk-votre-cle-ici
```

**Remplacez `sk-votre-cle-ici`** par votre vraie clé API OpenAI.

### Étape 2 : Redémarrer le serveur

Après avoir modifié `.env.local`, redémarrez le serveur :

```bash
# Arrêter le serveur (Ctrl+C dans le terminal)
npm run dev
```

## ✅ Vérification

1. Assurez-vous que `DEMO_MODE=false` dans `.env.local`
2. Vérifiez que `OPENAI_API_KEY=sk-...` est présent
3. Redémarrez le serveur
4. Testez une analyse dans l'application

## 💰 Coûts

- **Modèle utilisé** : `gpt-4o-mini` (le moins cher)
- **Coût approximatif** : ~0.01$ pour 1000 analyses
- **Crédit minimum** : 5$ (imposé par OpenAI)

## 🔄 Retour au mode démo

Si vous voulez revenir au mode démo (gratuit) :

```env
DEMO_MODE=true
```

Puis redémarrez le serveur.

## 🆘 En cas d'erreur

Si vous voyez une erreur liée à la clé API :
- Vérifiez que la clé est correctement copiée (sans espaces)
- Vérifiez que vous avez des crédits sur votre compte OpenAI
- Vérifiez que le serveur a été redémarré après modification de `.env.local`

