Primatoms Society – Laboratoire de Disruption Cognitive
markdown
Copier
Modifier
# Primatoms Society  
## Laboratoire de Disruption Cognitive

---

### Présentation

Primatoms Society est une plateforme d’analyse avancée et de simulation des dynamiques sociales, culturelles et comportementales.  
Elle s’adresse aux entreprises, décideurs, agences d’innovation et institutions souhaitant anticiper, comprendre et influencer les réactions collectives face à un produit, un message, une stratégie ou une transformation.

Basée sur un moteur IA propriétaire (**PoliSynth Disruptor**), la solution permet de simuler des scénarios, d’identifier les signaux faibles, de cartographier l’acceptabilité ou la disruption, et de générer des insights actionnables — tout cela avec une visualisation claire et une confidentialité totale.

---

### Fonctionnalités principales

- **Simulation et analyse de scénarios sociaux/culturels**
- **Dashboard interactif** : modules analytiques, visualisations (carte, timeline, mapping d’influence…)
- **Détection d’opportunités de disruption** (innovation, signaux faibles, ruptures)
- **Scoring d’acceptabilité, d’influence, de friction ou d’impact**
- **Exports de rapports et visualisations**
- **Privacy by design** : aucune donnée utilisateur sensible stockée
- **Personnalisation des populations/contextes simulés**

---

### Architecture technique (vue globale)

- **Frontend** : Application web React/TypeScript (Next.js, Tailwind, Vite)
- **Backend** : Moteur IA PoliSynth Disruptor (TypeScript), gestion des analyses/scénarios, connecteurs API externes (Qloo, LLM…)
- **Services** : Orchestrateurs pour LLM, API culturelles, gestion simulation/scoring
- **Visualisation** : Composants dédiés (dashboard, panels analytiques, mapping)
- **Sécurité & confidentialité** : Logs techniques uniquement, conformité RGPD, aucun stockage sensible

---

### Cas d’usage

- Lancement de nouveaux produits ou services
- Diagnostic d’acceptabilité ou de risques de rejet
- Analyse de marchés ou de tendances culturelles
- Prévision de scénarios de transformation ou de crise
- Optimisation de campagne de communication, innovation, RH, etc.

---

### Installation & démarrage

#### Prérequis

- Node.js >= 18, npm >= 9
- Clé API valide pour Qloo et/ou provider LLM (si usage externe)

#### Installation

```bash
git clone [votre-repo]
cd project
npm install
cp .env.example .env  # Renseigner les clés nécessaires
npm run dev           # Lancer en mode développement
Build production
bash
Copier
Modifier
npm run build
npm run preview
Utilisation rapide
Lancer l’app (npm run dev)

Accéder au dashboard via http://localhost:5173 (par défaut)

Sélectionner ou définir une population/contexte

Définir une hypothèse, un scénario, ou un objectif d’analyse

Explorer les résultats : panels, dashboards, mapping, suggestions

Exporter ou partager les insights

Sécurité & gouvernance
Privacy by design : aucune donnée personnelle collectée ou stockée

Architecture stateless, logs techniques anonymisés

Conformité RGPD et standards sectoriels

Tous les modèles sont auditables, et chaque recommandation est traçable

Demo Impact / Différenciation
Rapidité de simulation : Anticiper l’effet d’une décision stratégique ou d’un lancement en quelques minutes

Effet “laboratoire virtuel” : Tester des scénarios impossibles à modéliser rapidement dans le réel

Compréhension augmentée : Visualiser, expliquer, convaincre avec des insights visuels et argumentés

Gain de temps et de ressources : Limiter les coûts d’études, maximiser la pertinence des actions

Roadmap & perspectives
Intégration de nouvelles sources (veille, réseaux sociaux, open data…)

Développement de modules sectoriels (santé, mobilité, culture, éducation…)

Personnalisation avancée des scénarios et populations

Extension API et interopérabilité

Crédits & contact
Primatoms Society – Laboratoire de Disruption Cognitive
Moteur IA : PoliSynth Disruptor
Contact : [à compléter]
Documentation, démos et support : [liens à compléter]

# PRIMATOMS SOCIETY LAB 1.0

## 🔬 Qloo Hackathon - Méthodologie de Debugging Systématique

### 🎯 Approche Méthodologique

#### **ÉTAPE 1: Validation des Prérequis** ✅
- Clé API présente et format valide
- URL de base correcte (hackathon.api.qloo.com)
- Environment et User-Agent

#### **ÉTAPE 2: Test de Connectivité Réseau** 🌐
- Connectivité basique au serveur
- Résolution DNS
- Temps de réponse

#### **ÉTAPE 3: Test d'Authentification** 🔑
- X-Api-Key Header (standard)
- Authorization Bearer
- Authorization Basic
- API Key Query Parameter

#### **ÉTAPE 4: Test des Endpoints** 📡
- /v2/insights/ (principal)
- /v2/insights (sans slash)
- /v1/insights (legacy)
- /insights (simplifié)
- /api/v2/insights/ (avec préfixe)

#### **ÉTAPE 5: Analyse des Headers** 📋
- Headers minimaux
- Headers standard
- Headers étendus
- Headers CORS

#### **ÉTAPE 6: Test de Payload** 📦
- Paramètres minimaux (?limit=1)
- Avec filtres (filter.type)
- Avec signaux (signal.interests)
- Paramètres complexes

#### **ÉTAPE 7: Diagnostic Final** 🎯
- Résumé des résultats
- Identification de la cause racine
- Recommandations d'action

### 🚀 **Comment Utiliser le Debugging Systématique**

1. **Ouvrez DevTools** (F12)
2. **Allez dans Console**
3. **Cliquez "🔬 Debug Systématique"**
4. **Analysez les résultats étape par étape**

### 📊 **Résultats Attendus**

Le debugging systématique vous dira **exactement** :
- ✅ Quelle étape échoue
- ✅ Quel est le code d'erreur précis
- ✅ Quelle méthode d'auth fonctionne (si applicable)
- ✅ Quel endpoint est correct (si applicable)
- ✅ La cause racine du problème

### 🔧 **Mode Simulation Avancé**

En attendant la résolution, le système utilise un **mode simulation avancé** qui :
- 📊 Génère des données culturelles réalistes
- 🎯 Simule les patterns Qloo authentiques  
- 🔄 Permet de continuer le développement
- ✅ Fournit des résultats cohérents pour la démo

**Le debugging systématique identifiera la cause exacte !** 🎯