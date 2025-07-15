# PRIMATOMS SOCIETY LAB 1.0

## 🏆 Qloo Hackathon - Diagnostic API

### 🔍 Problème Actuel
L'API Qloo Hackathon ne se connecte pas malgré une clé API valide.

### 🛠️ Solutions à Tester

#### 1. **Test Direct dans la Console**
Ouvrez DevTools → Console et exécutez :
```javascript
fetch('https://hackathon.api.qloo.com/v2/insights/?limit=1', {
  method: 'GET',
  headers: {
    'X-Api-Key': 'L8q5OjsxUNnY7_NFTuQmKXKYHtKshbhf8-P1zOurvY8',
    'Content-Type': 'application/json'
  }
}).then(r => r.json()).then(console.log).catch(console.error);
```

#### 2. **Causes Probables**
- **CORS** : Le serveur hackathon peut bloquer les requêtes browser
- **Endpoint différent** : Peut-être `/v1/` au lieu de `/v2/`
- **Headers** : Peut-être `Authorization: Bearer` au lieu de `X-Api-Key`
- **Serveur down** : Le serveur hackathon peut être temporairement indisponible

#### 3. **Tests Alternatifs**
```javascript
// Test v1
fetch('https://hackathon.api.qloo.com/v1/insights?limit=1', {
  headers: { 'X-Api-Key': 'VOTRE_CLE' }
})

// Test Bearer
fetch('https://hackathon.api.qloo.com/v2/insights/?limit=1', {
  headers: { 'Authorization': 'Bearer VOTRE_CLE' }
})
```

#### 4. **Mode Simulation**
En attendant, le système utilise un **mode simulation avancé** avec des données culturelles réalistes basées sur les patterns Qloo.

### 🚀 Instructions
1. Testez les commandes ci-dessus dans la console
2. Utilisez le bouton "🧪 Direct Test" dans l'interface
3. Vérifiez les logs détaillés pour identifier la cause exacte
