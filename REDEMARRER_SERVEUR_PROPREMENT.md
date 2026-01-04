# 🔄 Redémarrer le serveur proprement

## ⚠️ Problème : "Clé API ou message manquant"

Si vous voyez ce message, c'est que le serveur utilise une ancienne version du code en cache.

## ✅ Solution : Redémarrer proprement

### Étape 1 : Arrêter tous les serveurs

Dans tous les terminaux où `npm run dev` tourne :
- Appuyez sur `Ctrl+C` pour arrêter
- Si ça ne marche pas, fermez les terminaux

### Étape 2 : Supprimer le cache Next.js

```bash
cd "/Users/romain/Documents/Appli 1"
rm -rf .next
```

### Étape 3 : Relancer le serveur

```bash
npm run dev
```

### Étape 4 : Vérifier

- Le serveur doit démarrer sur `http://localhost:3000`
- Essayez d'analyser un retour client
- Vous ne devriez plus voir "Clé API ou message manquant"

## 🔍 Vérifications supplémentaires

### Vérifier que .env.local existe et contient le token

```bash
cat .env.local
```

Vous devriez voir :
```
GITHUB_TOKEN=ghp_xxxxx
DEMO_MODE=false
```

### Si le problème persiste

1. Vérifiez la console du navigateur (F12) → onglet "Network"
2. Cliquez sur la requête `/api/analyze`
3. Regardez le message d'erreur exact
4. Vérifiez les logs dans le terminal où tourne `npm run dev`

