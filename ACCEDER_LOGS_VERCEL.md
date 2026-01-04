# 🔍 Comment accéder aux logs Vercel

## 🎯 Méthode 1 : Logs dans l'onglet "Logs" (Recommandé)

1. Allez sur https://vercel.com
2. Connectez-vous et sélectionnez votre projet `retour-client-ia`
3. Allez dans l'onglet **Deployments**
4. Cliquez sur le **dernier déploiement** (celui en haut de la liste)
5. Dans la page du déploiement, cherchez l'onglet **"Logs"** ou **"Functions"** en haut
6. Vous verrez tous les logs en temps réel

## 🎯 Méthode 2 : Via l'onglet "Functions"

1. Dans votre projet Vercel, allez dans **Deployments**
2. Cliquez sur le dernier déploiement
3. Cherchez l'onglet **"Functions"** ou **"Serverless Functions"**
4. Vous devriez voir `/api/analyze` listé
5. Cliquez dessus pour voir les logs

## 🎯 Méthode 3 : Via la console Vercel CLI (si installé)

```bash
# Installer Vercel CLI si ce n'est pas fait
npm i -g vercel

# Se connecter
vercel login

# Voir les logs
vercel logs retour-client-ia --follow
```

## 🎯 Méthode 4 : Console navigateur (Alternative)

Si vous ne trouvez pas les logs dans Vercel, vous pouvez aussi :

1. Ouvrir votre application sur https://retour-client-ia.vercel.app
2. Ouvrir les outils développeur (F12)
3. Aller dans l'onglet **Console**
4. Tester votre application
5. Les logs du serveur apparaîtront aussi dans la console du navigateur si vous avez des `console.log` dans le code

## 🎯 Méthode 5 : Inspecter la réponse HTTP

1. Ouvrir les outils développeur (F12)
2. Aller dans l'onglet **Network**
3. Tester votre application
4. Chercher la requête vers `/api/analyze`
5. Cliquez dessus
6. Regardez l'onglet **Response** - vous verrez la réponse du serveur

## ⚠️ Si vous ne voyez toujours pas les logs

### Vérifier que la route API est bien reconnue

Assurez-vous que votre fichier est bien nommé :
- ✅ `app/api/analyze/route.ts` (correct)
- ❌ `app/api/analyze.ts` (incorrect)
- ❌ `pages/api/analyze.ts` (ancien format Pages Router)

### Forcer un nouveau déploiement

Parfois, les logs n'apparaissent que si la fonction a été appelée au moins une fois :

1. Testez votre application une fois
2. Rechargez la page des logs sur Vercel
3. Les logs devraient apparaître

### Vérifier que le build a réussi

1. Dans **Deployments**, vérifiez que le dernier déploiement est **"Ready"** (pas "Error")
2. Si c'est "Error", cliquez dessus pour voir l'erreur de build

## 📋 Checklist

- [ ] Déploiement Vercel réussi (status "Ready")
- [ ] Route API existe : `app/api/analyze/route.ts`
- [ ] Application testée au moins une fois
- [ ] Onglet "Logs" ou "Functions" consulté dans Vercel
- [ ] Console navigateur vérifiée (F12)

## 🔍 Que chercher dans les logs

Quand vous testez votre application, vous devriez voir :

```
🔍 DIAGNOSTIC - isDemoMode() appelé, DEMO_MODE=...
🔍 DIAGNOSTIC - Variables d'environnement :
   - DEMO_MODE: ...
   - OPENAI_API_KEY: sk-... (51 caractères)
   OU
   - OPENAI_API_KEY: undefined ou vide
```

Si vous voyez `OPENAI_API_KEY: undefined ou vide`, cela signifie que la variable n'est pas configurée sur Vercel.

## 🆘 Si rien ne fonctionne

Envoyez-moi :
1. Une capture d'écran de votre page Deployments sur Vercel
2. Le statut du dernier déploiement
3. Ce que vous voyez dans les onglets "Logs" ou "Functions"

