# 📋 Guide des Étapes - Mode Démo

## Étape 1 : Vérifier le fichier .env.local

Votre fichier `.env.local` doit contenir :

```env
DEMO_MODE=true
```

**✅ Votre configuration actuelle :**
- ✅ `DEMO_MODE=true` → Mode démo activé
- ✅ Aucun appel API OpenAI ne sera effectué
- ✅ Réponses simulées gratuites

---

## Étape 2 : Vérifier que le serveur est lancé

Le serveur doit être en cours d'exécution. Pour vérifier :

```bash
# Le serveur devrait être accessible sur http://localhost:3000
```

Si le serveur n'est pas lancé, exécutez :

```bash
npm run dev
```

---

## Étape 3 : Tester le mode démo

1. **Ouvrez votre navigateur** : http://localhost:3000

2. **Collez un texte de test** dans la zone de texte, par exemple :
   ```
   Le client souhaite un design plus moderne avec des couleurs plus vives. 
   Il mentionne aussi que certaines fonctionnalités manquent de clarté.
   ```

3. **Cliquez sur "Analyser les retours"**

4. **Vérifiez la réponse** :
   - ✅ La réponse apparaît rapidement (pas de délai d'API)
   - ✅ Le format est correct (Résumé, Checklist, Points à clarifier, Priorité)
   - ✅ Si vous testez plusieurs fois, les réponses varient (sélection aléatoire)

---

## Étape 4 : Changer de mode (si nécessaire)

### Passer du Mode Démo au Mode Production

1. **Éditez le fichier `.env.local`** :

```env
DEMO_MODE=false
OPENAI_API_KEY=votre_cle_api_openai_ici
```

2. **Redémarrez le serveur** :
   - Arrêtez avec `Ctrl+C` dans le terminal
   - Relancez avec `npm run dev`

### Revenir au Mode Démo

1. **Éditez le fichier `.env.local`** :

```env
DEMO_MODE=true
```

2. **Redémarrez le serveur**

---

## ✅ Checklist de vérification

- [ ] Le fichier `.env.local` contient `DEMO_MODE=true`
- [ ] Le serveur est lancé (`npm run dev`)
- [ ] L'application est accessible sur http://localhost:3000
- [ ] Les réponses apparaissent rapidement (pas de délai API)
- [ ] Les réponses varient à chaque test (5 réponses différentes)

---

## 🎯 État actuel de votre configuration

**Mode actuel :** 🎭 **DEMO MODE** (activé)

Votre application fonctionne en mode démo :
- ✅ Aucun coût API
- ✅ Réponses instantanées
- ✅ 5 scénarios différents disponibles
- ✅ Parfait pour les démonstrations

