# 🔍 Diagnostic alternatif - Si pas de Functions dans Vercel

Si vous ne voyez pas l'onglet "Functions" dans Vercel, voici d'autres méthodes pour diagnostiquer :

## 🎯 Méthode 1 : Console du navigateur (Le plus simple)

1. Ouvrez votre application : https://retour-client-ia.vercel.app
2. Appuyez sur **F12** (ou Cmd+Option+I sur Mac)
3. Allez dans l'onglet **Console**
4. Testez votre application (saisissez du texte et cliquez sur "Analyser")
5. Regardez les messages dans la console

⚠️ **Note** : Les `console.log` du serveur n'apparaissent PAS dans la console du navigateur, mais les erreurs API oui.

## 🎯 Méthode 2 : Onglet Network (Recommandé pour le diagnostic)

1. Ouvrez votre application : https://retour-client-ia.vercel.app
2. Appuyez sur **F12**
3. Allez dans l'onglet **Network**
4. Cochez "Preserve log" en haut
5. Testez votre application
6. Cherchez la requête **`analyze`** dans la liste
7. Cliquez dessus
8. Regardez :
   - **Headers** : Vérifiez la requête
   - **Response** : Regardez la réponse JSON
   - **Preview** : Format plus lisible

Si vous voyez une erreur dans la réponse, notez le message exact.

## 🎯 Méthode 3 : Créer une route de test pour voir les variables

Je vais créer une route de diagnostic temporaire pour voir les variables d'environnement.

## 🎯 Méthode 4 : Vercel Dashboard → Settings → Environment Variables

1. Allez sur https://vercel.com
2. Sélectionnez votre projet
3. Allez dans **Settings** → **Environment Variables**
4. Vérifiez visuellement que :
   - `OPENAI_API_KEY` existe et a une valeur
   - `DEMO_MODE` existe et vaut `false`

## 🎯 Méthode 5 : Vérifier dans les Deployments

1. Allez dans **Deployments**
2. Cliquez sur le dernier déploiement
3. Regardez en haut de la page - il peut y avoir :
   - Un onglet **"Logs"**
   - Un bouton **"View Logs"**
   - Une section **"Build Logs"** ou **"Function Logs"**

## 🔧 Solution : Utiliser la route de diagnostic `/api/debug`

Une route de diagnostic a été créée pour vous permettre de voir les variables d'environnement directement dans le navigateur.

### Comment l'utiliser :

1. **Déployez d'abord** votre code (commit + push sur Vercel)
2. **Attendez** que le déploiement soit terminé
3. **Ouvrez** dans votre navigateur : `https://retour-client-ia.vercel.app/api/debug`
4. **Vous verrez** un JSON avec :
   - L'état de `DEMO_MODE`
   - Si `OPENAI_API_KEY` est présente (avec un aperçu sécurisé)
   - Un message d'erreur clair si la clé est manquante

### Exemple de réponse attendue :

Si la clé est **présente** :
```json
{
  "timestamp": "2024-01-04T...",
  "environment": {
    "DEMO_MODE": "false",
    "OPENAI_API_KEY": "sk-... (51 caractères)"
  },
  "status": {
    "hasOpenAIKey": true,
    "isDemoMode": false
  },
  "message": "✅ OPENAI_API_KEY est présente"
}
```

Si la clé est **manquante** :
```json
{
  "timestamp": "2024-01-04T...",
  "environment": {
    "DEMO_MODE": "false",
    "OPENAI_API_KEY": "undefined ou vide"
  },
  "status": {
    "hasOpenAIKey": false,
    "isDemoMode": true
  },
  "message": "❌ Erreur technique : La variable OPENAI_API_KEY est vide sur le serveur"
}
```

### ⚠️ Important : Supprimer après diagnostic

Une fois le diagnostic terminé, **supprimez** le fichier `app/api/debug/route.ts` pour des raisons de sécurité.

