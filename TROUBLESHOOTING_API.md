# 🔧 Résolution des problèmes API

## ❌ Erreur "Token GitHub manquant" ou "API ou messages manquants"

### ✅ Solution 1 : Vérifier le fichier .env.local

1. **Vérifiez que le fichier `.env.local` existe** à la racine du projet :
   ```
   /Users/romain/Documents/Appli 1/.env.local
   ```

2. **Vérifiez que le token est bien configuré** dans `.env.local` :
   ```env
   GITHUB_TOKEN=ghp_votre_token_ici
   ```

3. **Format correct** :
   - ❌ `GITHUB_TOKEN = ghp_xxx` (avec espaces)
   - ❌ `GITHUB_TOKEN="ghp_xxx"` (avec guillemets)
   - ✅ `GITHUB_TOKEN=ghp_xxx` (sans espaces, sans guillemets)

### ✅ Solution 2 : Redémarrer le serveur

Après avoir modifié `.env.local`, vous **DEVEZ** redémarrer le serveur :

```bash
# Arrêter le serveur (Ctrl+C dans le terminal)
# Puis relancer :
npm run dev
```

⚠️ **Important** : Les variables d'environnement ne sont chargées qu'au démarrage du serveur.

### ✅ Solution 3 : Vérifier que le token est valide

1. Vérifiez que votre token GitHub commence bien par `ghp_`
2. Vérifiez que le token n'a pas expiré
3. Vérifiez que le token a les bonnes permissions

### ✅ Solution 4 : Vérifier les erreurs dans la console

Ouvrez la console du navigateur (F12) et regardez les erreurs réseau :
- Onglet "Network" → Cherchez la requête `/api/analyze`
- Vérifiez le message d'erreur retourné

### ✅ Solution 5 : Vérifier les logs serveur

Dans le terminal où tourne `npm run dev`, vérifiez les erreurs affichées.

## 📋 Checklist rapide

- [ ] Fichier `.env.local` existe à la racine du projet
- [ ] `GITHUB_TOKEN=ghp_xxx` est présent dans `.env.local`
- [ ] Pas d'espaces autour du `=`
- [ ] Pas de guillemets autour du token
- [ ] Serveur redémarré après modification de `.env.local`
- [ ] Token valide et non expiré

## 🆘 Si le problème persiste

1. Vérifiez les logs du serveur dans le terminal
2. Vérifiez la console du navigateur (F12)
3. Vérifiez que l'URL de l'API GitHub Models est correcte
4. Vérifiez votre connexion internet
5. Essayez de régénérer un nouveau token GitHub si nécessaire

