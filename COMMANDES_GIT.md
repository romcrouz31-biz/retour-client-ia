# 📤 Commandes Git pour déployer sur Vercel

## ✅ Commandes à exécuter dans le terminal

Copiez-collez ces commandes **une par une** dans votre terminal :

### 1. Ajouter tous les fichiers modifiés

```bash
git add .
```

### 2. Commit avec un message descriptif

```bash
git commit -m "Ajout logs de diagnostic et route debug pour vérifier variables d'environnement Vercel"
```

### 3. Pousser vers GitHub

```bash

```

---

## 📋 Alternative : Message de commit plus détaillé

Si vous préférez un message plus détaillé :

```bash
git commit -m "feat: Ajout système de diagnostic pour variables d'environnement

- Ajout logs détaillés dans route.ts pour diagnostiquer OPENAI_API_KEY
- Création route /api/debug pour vérifier variables d'environnement
- Amélioration messages d'erreur avec nom de variable exact
- Suppression fichier obsolète 'modele pour api'
- Ajout documentation diagnostic et sécurité"
```

---

## 🔄 Après le push

1. **Vercel détectera automatiquement** le push sur GitHub
2. **Un nouveau déploiement** se lancera automatiquement
3. **Attendez** 1-2 minutes pour que le déploiement soit terminé
4. **Testez** votre application ou la route `/api/debug`

---

## ⚠️ Important

Assurez-vous que :

- ✅ Vous êtes bien sur la branche `main` (commande: `git branch`)
- ✅ Votre remote GitHub est configuré (commande: `git remote -v`)
- ✅ Vous avez les droits d'écriture sur le repo GitHub

---

## 🎯 Test rapide après déploiement

Une fois déployé, testez la route de diagnostic :

```
https://retour-client-ia.vercel.app/api/debug
```

Vous verrez immédiatement si les variables d'environnement sont bien configurées !
