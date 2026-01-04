# 🔍 Diagnostic : "Clé API ou message manquant"

## ✅ Fichier obsolète supprimé

Le fichier `modele pour api` qui contenait ce message a été supprimé.

## 🔍 Vérifications à faire

### 1. Vérifier les variables d'environnement sur Vercel

1. Allez sur https://vercel.com
2. Sélectionnez votre projet `retour-client-ia`
3. Allez dans **Settings** → **Environment Variables**
4. Vérifiez que vous avez bien :

| Key              | Value              | Statut |
| ---------------- | ------------------ | ------ |
| `OPENAI_API_KEY` | `sk-...`           | ✅ Doit exister |
| `DEMO_MODE`      | `false`            | ✅ Doit être `false` pour utiliser OpenAI |

**Si les variables n'existent pas ou sont incorrectes :**
- Ajoutez-les (voir `CONFIGURATION_VERCEL_OPENAI.md`)
- **IMPORTANT : Redéployez après avoir ajouté les variables**

### 2. Vérifier que vous avez bien redéployé

⚠️ **CRUCIAL** : Après avoir ajouté/modifié des variables d'environnement sur Vercel, vous DEVEZ redéployer.

**Redéployer sur Vercel :**
1. Allez dans **Deployments**
2. Cliquez sur les **3 points** (⋯) du dernier déploiement
3. Cliquez sur **Redeploy**
4. Attendez la fin du déploiement (1-2 minutes)

### 3. Vérifier les logs Vercel

Pour voir ce qui se passe réellement :

1. Allez sur https://vercel.com
2. Sélectionnez votre projet
3. Allez dans **Deployments**
4. Cliquez sur le dernier déploiement
5. Cliquez sur **Functions**
6. Cliquez sur `/api/analyze`
7. Testez votre application
8. Les logs apparaîtront en temps réel

**Vous devriez voir :**

✅ Si tout va bien :
```
✅ Clé API OpenAI trouvée, utilisation de l'API OpenAI
```

⚠️ Si la clé n'est pas configurée :
```
⚠️ Aucune clé API OpenAI trouvée, utilisation du mode démo
💡 Pour utiliser OpenAI, configurez OPENAI_API_KEY sur Vercel
```

❌ Si erreur OpenAI :
```
❌ Erreur API OpenAI, bascule vers le mode démo
❌ Erreur OpenAI détectée: [détails de l'erreur]
```

### 4. Vider le cache du navigateur

Parfois, le navigateur cache l'ancienne version :

1. Sur Chrome/Edge : `Ctrl+Shift+R` (Windows) ou `Cmd+Shift+R` (Mac)
2. Ou ouvrez en navigation privée pour tester

### 5. Vérifier la console du navigateur

1. Ouvrez https://retour-client-ia.vercel.app
2. Appuyez sur `F12` pour ouvrir les outils développeur
3. Allez dans l'onglet **Console**
4. Testez votre application
5. Regardez s'il y a des erreurs

### 6. Vérifier l'onglet Network

1. Dans les outils développeur, allez dans l'onglet **Network**
2. Testez votre application
3. Cherchez la requête vers `/api/analyze`
4. Cliquez dessus
5. Regardez la réponse :
   - Si status 400 : erreur de validation
   - Si status 500 : erreur serveur
   - Regardez le message d'erreur dans la réponse

## 🎯 Solution rapide

**Si vous voyez encore "Clé API ou message manquant" après toutes ces étapes :**

1. **Vérifiez que vous avez bien commité et pushé les derniers changements :**
```bash
git add .
git commit -m "Suppression fichier obsolète"
git push
```

2. **Attendez que Vercel redéploie automatiquement** (1-2 minutes)

3. **Redéployez manuellement** si nécessaire (voir étape 2)

4. **Testez à nouveau** sur https://retour-client-ia.vercel.app

## 📝 Messages d'erreur possibles et solutions

| Message d'erreur                        | Cause probable                        | Solution                                    |
| --------------------------------------- | ------------------------------------- | ------------------------------------------- |
| "Clé API ou message manquant"           | Cache Vercel ou variables manquantes  | Vider cache, vérifier variables, redéployer |
| "Le texte des retours est requis"       | Champ vide                            | Saisir du texte                             |
| "Le texte ne doit pas dépasser 800..."  | Texte trop long                       | Réduire à 800 caractères max                |
| "Aucune clé API OpenAI trouvée"         | Variable non configurée               | Ajouter `OPENAI_API_KEY` sur Vercel         |
| "Incorrect API key provided"            | Clé API invalide                      | Vérifier la clé API sur OpenAI              |
| "You exceeded your current quota"       | Plus de crédits OpenAI                | Ajouter des crédits sur OpenAI              |

## ✅ Checklist finale

- [ ] Fichier obsolète `modele pour api` supprimé
- [ ] Variables d'environnement configurées sur Vercel
- [ ] `OPENAI_API_KEY` présente sur Vercel
- [ ] `DEMO_MODE=false` sur Vercel
- [ ] Application redéployée après modification des variables
- [ ] Cache du navigateur vidé
- [ ] Logs Vercel vérifiés
- [ ] Test effectué avec succès

Une fois toutes ces étapes effectuées, l'erreur devrait disparaître ! 🎉

