# 🔑 Configurer la clé API du client

## 🎯 Objectif

Permettre à votre client d'utiliser sa propre clé API OpenAI pour qu'il paie directement les crédits.

## ✅ Solution recommandée pour MVP : Configuration Vercel

### Option 1 : Le client configure lui-même (Recommandé)

Si votre client a accès au compte Vercel ou si vous lui donnez un accès en lecture/écriture :

1. **Sur Vercel :**
   - Allez dans **Settings** → **Environment Variables**
   - Modifiez `OPENAI_API_KEY` avec la clé de votre client
   - Redéployez l'application

2. **Ou donnez-lui les instructions** (voir ci-dessous)

### Option 2 : Page d'administration sécurisée (À implémenter)

Créer une page d'administration où le client peut entrer sa clé API. 

⚠️ **Important** : Pour un MVP, cette solution nécessite :
- Une protection par mot de passe
- Un stockage sécurisé de la clé (fichier côté serveur ou base de données)
- Plus de complexité

## 📝 Instructions à donner à votre client

### Méthode 1 : Via l'interface Vercel

```
1. Allez sur https://vercel.com
2. Connectez-vous (ou créez un compte)
3. Allez dans le projet "retour-client-ia"
4. Cliquez sur "Settings" → "Environment Variables"
5. Trouvez "OPENAI_API_KEY"
6. Cliquez sur "Edit" et remplacez la valeur par votre clé API
7. Cliquez sur "Save"
8. Allez dans "Deployments" et cliquez sur "Redeploy" du dernier déploiement
```

### Méthode 2 : Vous configurez pour eux

1. Demandez la clé API à votre client (par email sécurisé ou autre moyen)
2. Allez sur Vercel
3. Modifiez `OPENAI_API_KEY` avec leur clé
4. Redéployez

## 🔐 Sécurité

⚠️ **Important** :
- Ne partagez JAMAIS votre clé API personnelle avec le client
- Chaque client doit avoir sa propre clé API OpenAI
- La clé API reste côté serveur, jamais exposée au frontend

## 💰 Facturation

Avec cette configuration :
- ✅ Le client paie directement ses crédits OpenAI
- ✅ Vous n'avez pas de coûts liés aux appels API
- ✅ Le client peut gérer son budget directement sur OpenAI

## 🚀 Pour aller plus loin (futur)

Pour une solution plus avancée avec plusieurs clients :
1. Base de données pour stocker les clés par client
2. Page d'administration avec authentification
3. Multi-tenant : chaque client utilise sa propre clé

Mais pour un MVP, la solution Vercel est la plus simple !

