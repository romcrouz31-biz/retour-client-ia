#!/bin/bash
echo "=== Étape 1: Ajout des fichiers ==="
git add .
echo ""
echo "=== Étape 2: Statut Git ==="
git status
echo ""
echo "=== Étape 3: Fichiers à commiter (version courte) ==="
git status --short

