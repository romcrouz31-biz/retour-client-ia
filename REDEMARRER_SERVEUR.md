# 🔄 Comment Redémarrer le Serveur

## Méthode 1 : Si vous voyez le terminal du serveur (RECOMMANDÉ)

### Étape 1 : Arrêter le serveur

1. **Cliquez dans le terminal** où le serveur tourne
2. **Appuyez sur `Ctrl + C`** (sur Mac) ou `Ctrl + C` (sur Windows/Linux)
3. Le serveur s'arrêtera et vous verrez un message dans le terminal

### Étape 2 : Redémarrer le serveur

Dans le même terminal, tapez :

```bash
npm run dev
```

Le serveur redémarre et affiche :

```
  ▲ Next.js 14.2.5
  - Local:        http://localhost:3000
```

---

## Méthode 2 : Si le serveur tourne en arrière-plan

Si vous ne voyez pas le terminal du serveur, vous pouvez l'arrêter avec des commandes :

### Étape 1 : Arrêter le serveur

Ouvrez un **nouveau terminal** et exécutez :

```bash
cd "/Users/romain/Documents/Appli 1"
kill -9 $(lsof -ti:3000)
```

Cette commande trouve et arrête tous les processus utilisant le port 3000.

### Étape 2 : Vérifier que le serveur est arrêté

```bash
lsof -ti:3000
```

Si cette commande ne retourne rien, le serveur est bien arrêté.

### Étape 3 : Redémarrer le serveur

```bash
npm run dev
```

---

## Méthode 3 : Redémarrer automatiquement (Commande unique)

Vous pouvez arrêter et redémarrer en une seule fois :

```bash
cd "/Users/romain/Documents/Appli 1"
kill -9 $(lsof -ti:3000) 2>/dev/null; npm run dev
```

Cette commande :

1. Arrête le serveur s'il tourne
2. Redémarre immédiatement le serveur

---

## ⚠️ Quand redémarrer le serveur ?

Vous devez redémarrer le serveur dans ces cas :

- ✅ Après avoir modifié le fichier `.env.local`
- ✅ Après avoir installé de nouveaux packages (`npm install`)
- ✅ Après avoir modifié certains fichiers de configuration (Next.js config, etc.)
- ✅ Si le serveur plante ou ne répond plus

**Vous n'avez PAS besoin de redémarrer pour :**

- ❌ Modifier les fichiers React/TypeScript dans `app/` ou `components/`
- ❌ Modifier les styles CSS
- Next.js redémarre automatiquement (hot reload)

---

## 🔍 Vérifier si le serveur tourne

Pour vérifier si le serveur est en cours d'exécution :

```bash
lsof -ti:3000
```

- Si vous voyez un numéro → le serveur tourne
- Si rien ne s'affiche → le serveur est arrêté

---

## 📝 Récapitulatif rapide

**Arrêter :** `Ctrl + C` dans le terminal du serveur

**Redémarrer :** `npm run dev`

**Arrêter depuis un autre terminal :** `kill -9 $(lsof -ti:3000)`

---

## 🎯 Exemple complet

```bash
# 1. Aller dans le dossier du projet
cd "/Users/romain/Documents/Appli 1"

# 2. Arrêter le serveur (si nécessaire)
kill -9 $(lsof -ti:3000) 2>/dev/null

# 3. Redémarrer
npm run dev
```
