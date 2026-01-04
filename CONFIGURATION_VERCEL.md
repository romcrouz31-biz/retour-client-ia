# 🚀 Configuration Vercel pour le mode démo

## ⚠️ Problème identifié

Votre application fonctionne en local mais pas sur Vercel car les variables d'environnement ne sont pas configurées sur Vercel.

## ✅ Solution : Configuration automatique

Le code a été modifié pour que le **mode démo soit activé par défaut** si `DEMO_MODE` n'est pas défini.

Maintenant, même sans configuration sur Vercel, l'application utilisera le mode démo.

## 🔧 Configuration manuelle sur Vercel (optionnel)

Si vous voulez configurer manuellement les variables d'environnement sur Vercel :

### Étape 1 : Aller sur Vercel

1. Allez sur https://vercel.com
2. Connectez-vous
3. Sélectionnez votre projet `retour-client-ia`

### Étape 2 : Configurer les variables d'environnement

1. Allez dans **Settings** → **Environment Variables**
2. Ajoutez les variables suivantes :

**Pour le mode démo (recommandé maintenant) :**

```
DEMO_MODE=true
```

**Ou pour utiliser OpenAI (quand vous aurez ajouté les crédits) :**

```
DEMO_MODE=false
OPENAI_API_KEY=sk-votre-cle-ici
```

### Étape 3 : Redéployer

Après avoir ajouté les variables :

1. Allez dans **Deployments**
2. Cliquez sur les **3 points** (⋯) du dernier déploiement
3. Sélectionnez **Redeploy**

## ✅ Solution actuelle (automatique)

Avec la modification du code :

- ✅ **Par défaut** : Mode démo activé (même sans configuration)
- ✅ **Sur Vercel** : L'application utilisera automatiquement le mode démo
- ✅ **En local** : Continue de fonctionner comme avant

## 🚀 Prochaines étapes

1. **Commit et push** vos changements :

```bash
git add .
git commit -m "Mode démo activé par défaut"
git push
```

2. **Vercel redéploiera automatiquement** votre application

3. **Testez** sur https://retour-client-ia.vercel.app

L'application devrait maintenant fonctionner sur Vercel avec le mode démo ! 🎉
