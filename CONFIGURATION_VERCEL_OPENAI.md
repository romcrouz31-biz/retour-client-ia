# 🚀 Configuration Vercel pour OpenAI (Phase de test)

## ⚠️ Problème actuel

Votre application fonctionne avec OpenAI en localhost mais pas sur Vercel car les variables d'environnement ne sont pas configurées.

## ✅ Solution : Configurer les variables d'environnement sur Vercel

### Étape 1 : Aller sur le Dashboard Vercel

1. Ouvrez https://vercel.com dans votre navigateur
2. Connectez-vous avec votre compte
3. Cliquez sur votre projet **retour-client-ia**

### Étape 2 : Configurer les variables d'environnement

1. Dans le menu de gauche, cliquez sur **Settings**
2. Dans le sous-menu, cliquez sur **Environment Variables**

### Étape 3 : Ajouter les variables

Vous devez ajouter **2 variables** :

#### Variable 1 : `OPENAI_API_KEY`

1. Cliquez sur **Add New**
2. Dans **Key**, tapez : `OPENAI_API_KEY`
3. Dans **Value**, collez votre clé API OpenAI (commence par `sk-`)
4. Cochez toutes les environnements :
   - ✅ Production
   - ✅ Preview
   - ✅ Development
5. Cliquez sur **Save**

#### Variable 2 : `DEMO_MODE`

1. Cliquez sur **Add New**
2. Dans **Key**, tapez : `DEMO_MODE`
3. Dans **Value**, tapez : `false`
4. Cochez toutes les environnements :
   - ✅ Production
   - ✅ Preview
   - ✅ Development
5. Cliquez sur **Save**

### Étape 4 : Redéployer l'application

⚠️ **IMPORTANT** : Après avoir ajouté les variables, vous DEVEZ redéployer pour qu'elles soient prises en compte.

**Option A : Redéploiement manuel**

1. Allez dans l'onglet **Deployments**
2. Cliquez sur les **3 points** (⋯) à droite du dernier déploiement
3. Sélectionnez **Redeploy**
4. Confirmez le redéploiement

**Option B : Déclencher un nouveau déploiement**

```bash
git commit --allow-empty -m "Trigger Vercel redeploy"
git push
```

### Étape 5 : Vérifier que ça fonctionne

1. Attendez que le déploiement se termine (environ 1-2 minutes)
2. Allez sur https://retour-client-ia.vercel.app
3. Testez avec un retour client (maximum 800 caractères)
4. Vous devriez recevoir une réponse de l'IA OpenAI au lieu du mode démo

## 🔍 Vérifier les logs Vercel

Si ça ne fonctionne toujours pas, vérifiez les logs :

1. Allez dans **Deployments**
2. Cliquez sur le dernier déploiement
3. Cliquez sur **Functions**
4. Cliquez sur `/api/analyze`
5. Testez à nouveau votre application
6. Les logs apparaîtront en temps réel

Vous devriez voir :

- ✅ `Clé API OpenAI trouvée, utilisation de l'API OpenAI` si tout va bien
- ⚠️ `Aucune clé API OpenAI trouvée` si la clé n'est pas configurée
- ❌ Messages d'erreur détaillés en cas de problème

## 📋 Checklist de vérification

- [ ] Variable `OPENAI_API_KEY` ajoutée sur Vercel
- [ ] Variable `DEMO_MODE` définie à `false` sur Vercel
- [ ] Les deux variables sont activées pour Production, Preview et Development
- [ ] L'application a été redéployée après l'ajout des variables
- [ ] Test effectué sur https://retour-client-ia.vercel.app
- [ ] Les logs Vercel sont vérifiés en cas d'erreur

## 🆘 En cas de problème

### Erreur : "Aucune clé API OpenAI trouvée"

→ Vérifiez que `OPENAI_API_KEY` est bien configurée et que vous avez redéployé

### Erreur : "Incorrect API key provided"

→ Vérifiez que votre clé API OpenAI est correcte et commence bien par `sk-`

### Erreur : "You exceeded your current quota"

→ Vérifiez vos crédits OpenAI sur https://platform.openai.com/usage

### Erreur : Le mode démo s'affiche toujours

→ Vérifiez que `DEMO_MODE=false` est bien configuré sur Vercel et que vous avez redéployé

## ✅ Configuration finale attendue

Sur Vercel, dans **Settings** → **Environment Variables**, vous devez avoir :

| Key              | Value              | Environnements                   |
| ---------------- | ------------------ | -------------------------------- |
| `OPENAI_API_KEY` | `sk-votre-cle-ici` | Production, Preview, Development |
| `DEMO_MODE`      | `false`            | Production, Preview, Development |

Une fois ces variables configurées et l'application redéployée, OpenAI fonctionnera sur Vercel ! 🎉
