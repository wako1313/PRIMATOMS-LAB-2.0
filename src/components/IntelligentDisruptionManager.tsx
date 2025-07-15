import React, { useState, useEffect, useRef } from 'react';
import { DisruptiveEvent, SimulationState } from '../types';
import { PoliSynthCore } from '../engine/PoliSynthCore';
import { Zap, Brain, Settings, Play, Pause, RotateCcw, TrendingUp, AlertTriangle, Target } from 'lucide-react';

interface IntelligentDisruptionManagerProps {
  state: SimulationState;
  poliSynthCore: PoliSynthCore;
  onInjectEvent: (eventConfig: Partial<DisruptiveEvent>) => void;
  isRunning: boolean;
}

const IntelligentDisruptionManager: React.FC<IntelligentDisruptionManagerProps> = ({
  state,
  poliSynthCore,
  onInjectEvent,
  isRunning
}) => {
  const [autoMode, setAutoMode] = useState(false);
  const [intelligenceLevel, setIntelligenceLevel] = useState(3); // 1-5
  const [adaptiveFrequency, setAdaptiveFrequency] = useState(true);
  const [contextualTriggers, setContextualTriggers] = useState(true);
  const [lastAutoEvent, setLastAutoEvent] = useState<number>(0);
  const [nextEventPrediction, setNextEventPrediction] = useState<string>('');
  const [systemAnalysis, setSystemAnalysis] = useState<any>(null);
  
  // Référence pour persister l'état du mode auto
  const autoModeRef = useRef(autoMode);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  // Synchroniser la référence avec l'état
  useEffect(() => {
    autoModeRef.current = autoMode;
  }, [autoMode]);

  // Gestion de la persistance du mode auto
  useEffect(() => {
    if (autoMode && isRunning) {
      const interval = setInterval(() => {
        try {
          if (autoModeRef.current) {
            analyzeAndTrigger();
            console.log("🤖 Auto-triggering intelligent disruption");
          }
          performSystemAnalysis();
        } catch (error) {
          console.error("Error in intelligent disruption:", error);
        }
      }, 5000);
      
      return () => clearInterval(interval);
    } else {
      // Arrêter l'intervalle si mode auto désactivé ou simulation arrêtée
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    }
  }, [autoMode, isRunning]);

  useEffect(() => {
    // Analyse continue du système pour prédictions
    const analysisInterval = setInterval(() => {
      performSystemAnalysis();
    }, 3000);

    return () => clearInterval(analysisInterval);
  }, [state]);

  const analyzeAndTrigger = () => {
    const now = Date.now();
    const timeSinceLastEvent = now - lastAutoEvent;
    const minInterval = getAdaptiveInterval();

    if (timeSinceLastEvent < minInterval) return;

    const shouldTrigger = evaluateDisruptionNeed();
    
    if (shouldTrigger) {
      // Génération d'événement intelligent basé sur l'analyse du système
      const intelligentEvent = generateContextualDisruption();
      
      if (intelligentEvent) {
        onInjectEvent(intelligentEvent);
        setLastAutoEvent(now);
        
        // Log de l'événement intelligent
        console.log(`[IA Disruption] Événement déclenché: ${intelligentEvent.name} (Intensité: ${intelligentEvent.intensity})`);
      }
    }
  };

  const generateContextualDisruption = (): Partial<DisruptiveEvent> | null => {
    const systemStability = state.systemStability || 75;
    const coalitionCount = state.coalitions.length;
    const avgStress = state.primatoms.reduce((sum, p) => sum + (p.stressLevel || 0), 0) / state.primatoms.length;
    const avgInnovation = state.primatoms.reduce((sum, p) => sum + p.innovation, 0) / state.primatoms.length;
    
    // Logique intelligente de sélection d'événement
    if (systemStability > 85 && avgStress < 20) {
      // Système trop stable - Injecter un défi
      return {
        type: 'resource_scarcity',
        name: `Défi de Résilience Adaptatif (IA-${intelligenceLevel})`,
        description: 'Test intelligent de la capacité d\'adaptation collective face à une contrainte de ressources',
        intensity: Math.min(8, 4 + intelligenceLevel),
        duration: 30 + (intelligenceLevel * 10),
        effects: {
          trustModifier: -0.1 - (intelligenceLevel * 0.05),
          energyModifier: -0.3 - (intelligenceLevel * 0.1),
          cooperationModifier: 0.2 + (intelligenceLevel * 0.1),
          innovationModifier: 0.4 + (intelligenceLevel * 0.15)
        }
      };
    }
    
    if (avgInnovation > 80 && coalitionCount > 3) {
      // Potentiel d'innovation élevé - Catalyseur
      return {
        type: 'innovation_catalyst',
        name: `Catalyseur d'Innovation Collective (IA-${intelligenceLevel})`,
        description: 'Amplification intelligente du potentiel créatif détecté dans le système',
        intensity: 6 + intelligenceLevel,
        duration: 40 + (intelligenceLevel * 5),
        effects: {
          trustModifier: 0.2 + (intelligenceLevel * 0.05),
          energyModifier: 0.3 + (intelligenceLevel * 0.1),
          cooperationModifier: 0.4 + (intelligenceLevel * 0.1),
          innovationModifier: 0.6 + (intelligenceLevel * 0.2)
        }
      };
    }
    
    if (coalitionCount > 5 && systemStability < 60) {
      // Fragmentation détectée - Médiation
      return {
        type: 'governance_crisis',
        name: `Intervention de Médiation Intelligente (IA-${intelligenceLevel})`,
        description: 'Restructuration adaptative des dynamiques de pouvoir pour optimiser la cohésion',
        intensity: 5 + Math.floor(intelligenceLevel / 2),
        duration: 50 + (intelligenceLevel * 8),
        effects: {
          trustModifier: -0.1 + (intelligenceLevel * 0.05),
          energyModifier: 0.1,
          cooperationModifier: 0.3 + (intelligenceLevel * 0.1),
          innovationModifier: 0.2 + (intelligenceLevel * 0.1)
        }
      };
    }
    
    if (avgStress < 10 && avgInnovation < 60) {
      // Système en stagnation - Stimulation
      return {
        type: 'environmental_change',
        name: `Stimulation Environnementale Adaptative (IA-${intelligenceLevel})`,
        description: 'Modification contextuelle pour stimuler l\'évolution et l\'adaptation',
        intensity: 4 + intelligenceLevel,
        duration: 35 + (intelligenceLevel * 7),
        effects: {
          trustModifier: 0.1,
          energyModifier: -0.2 + (intelligenceLevel * 0.05),
          cooperationModifier: 0.3 + (intelligenceLevel * 0.1),
          innovationModifier: 0.5 + (intelligenceLevel * 0.15)
        }
      };
    }
    
    return null;
  };
  const getAdaptiveInterval = (): number => {
    if (!adaptiveFrequency) return 30000; // 30 secondes fixe

    const systemStability = state.systemStability || 75;
    const coalitionCount = state.coalitions.length;
    const avgStress = state.primatoms.reduce((sum, p) => sum + (p.stressLevel || 0), 0) / state.primatoms.length;

    // Plus le système est stable, plus l'intervalle est long
    let baseInterval = 20000; // 20 secondes de base
    
    if (systemStability > 80) baseInterval *= 2;
    if (systemStability < 50) baseInterval *= 0.5;
    
    if (avgStress > 60) baseInterval *= 0.7; // Plus fréquent si stress élevé
    if (coalitionCount > 5) baseInterval *= 1.3; // Moins fréquent si beaucoup de coalitions
    
    return Math.max(10000, Math.min(60000, baseInterval * (6 - intelligenceLevel))); // Entre 10s et 60s
  };

  const evaluateDisruptionNeed = (): boolean => {
    const systemStability = state.systemStability || 75;
    const coalitionCount = state.coalitions.length;
    const avgInnovation = state.primatoms.reduce((sum, p) => sum + p.innovation, 0) / state.primatoms.length;
    const avgStress = state.primatoms.reduce((sum, p) => sum + (p.stressLevel || 0), 0) / state.primatoms.length;

    let disruptionProbability = 0;

    // Facteurs favorisant la disruption
    if (systemStability > 85) disruptionProbability += 0.4; // Système trop stable
    if (avgStress < 15) disruptionProbability += 0.3; // Pas assez de challenge
    if (avgInnovation < 60) disruptionProbability += 0.3; // Innovation faible
    if (coalitionCount < 2) disruptionProbability += 0.5; // Pas assez de dynamique sociale

    // Facteurs défavorisant la disruption
    if (systemStability < 40) disruptionProbability -= 0.6; // Système déjà instable
    if (avgStress > 70) disruptionProbability -= 0.4; // Trop de stress
    if (state.activeDisruptions && state.activeDisruptions.length > 2) disruptionProbability -= 0.8;

    // Ajustement par niveau d'intelligence
    disruptionProbability *= (intelligenceLevel / 5);

    return Math.random() < Math.max(0, Math.min(1, disruptionProbability));
  };

  const performSystemAnalysis = () => {
    const analysis = {
      stabilityTrend: calculateStabilityTrend(),
      coalitionDynamics: analyzeCoalitionDynamics(),
      behavioralPatterns: analyzeBehavioralPatterns(),
      emergentRisks: identifyEmergentRisks(),
      opportunities: identifyOpportunities()
    };

    setSystemAnalysis(analysis);
    setNextEventPrediction(generateEventPrediction(analysis));
  };

  const calculateStabilityTrend = (): 'rising' | 'stable' | 'declining' => {
    // Analyse simplifiée - dans un vrai système, on utiliserait l'historique
    const currentStability = state.systemStability || 75;
    
    if (currentStability > 80) return 'stable';
    if (currentStability < 60) return 'declining';
    return 'rising';
  };

  const analyzeCoalitionDynamics = () => {
    const avgCohesion = state.coalitions.reduce((sum, c) => sum + c.cohesion, 0) / Math.max(1, state.coalitions.length);
    const largeCoalitions = state.coalitions.filter(c => c.members.length > 10).length;
    
    return {
      averageCohesion: avgCohesion,
      largeCoalitionsCount: largeCoalitions,
      fragmentationRisk: avgCohesion < 50 ? 'high' : avgCohesion < 70 ? 'medium' : 'low'
    };
  };

  const analyzeBehavioralPatterns = () => {
    const behaviorCounts = state.primatoms.reduce((acc, p) => {
      acc[p.behaviorType] = (acc[p.behaviorType] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);

    const dominantBehavior = Object.entries(behaviorCounts)
      .sort(([,a], [,b]) => b - a)[0][0];

    return {
      distribution: behaviorCounts,
      dominantBehavior,
      diversity: Object.keys(behaviorCounts).length
    };
  };

  const identifyEmergentRisks = (): string[] => {
    const risks: string[] = [];
    
    const avgStress = state.primatoms.reduce((sum, p) => sum + (p.stressLevel || 0), 0) / state.primatoms.length;
    if (avgStress > 60) risks.push('Stress collectif élevé');
    
    const weakCoalitions = state.coalitions.filter(c => c.cohesion < 40).length;
    if (weakCoalitions > 1) risks.push('Fragmentation des coalitions');
    
    const isolatedPrimatoms = state.primatoms.filter(p => !p.coalition).length;
    if (isolatedPrimatoms > state.primatoms.length * 0.3) risks.push('Isolement social croissant');
    
    return risks;
  };

  const identifyOpportunities = (): string[] => {
    const opportunities: string[] = [];
    
    const avgInnovation = state.primatoms.reduce((sum, p) => sum + p.innovation, 0) / state.primatoms.length;
    if (avgInnovation > 75) opportunities.push('Potentiel d\'innovation élevé');
    
    const strongCoalitions = state.coalitions.filter(c => c.cohesion > 80).length;
    if (strongCoalitions > 2) opportunities.push('Structures sociales solides');
    
    const avgCooperation = state.primatoms.reduce((sum, p) => sum + p.cooperation, 0) / state.primatoms.length;
    if (avgCooperation > 70) opportunities.push('Climat collaboratif favorable');
    
    return opportunities;
  };

  const generateEventPrediction = (analysis: any): string => {
    if (!analysis) return 'Analyse en cours...';
    
    const systemStability = state.systemStability || 75;
    const avgStress = state.primatoms.reduce((sum, p) => sum + (p.stressLevel || 0), 0) / state.primatoms.length;
    const avgInnovation = state.primatoms.reduce((sum, p) => sum + p.innovation, 0) / state.primatoms.length;
    
    // Prédictions contextuelles intelligentes
    if (systemStability > 85 && avgStress < 20) {
      return `Défi de résilience recommandé dans ${Math.round(getAdaptiveInterval() / 1000)}s - Système trop stable`;
    }
    
    if (avgInnovation > 80 && state.coalitions.length > 3) {
      return `Catalyseur d'innovation optimal détecté - Déclenchement imminent`;
    }
    
    if (state.coalitions.length > 5 && systemStability < 60) {
      return `Intervention de médiation nécessaire - Fragmentation détectée`;
    }
    
    if (analysis.emergentRisks.length > 2) {
      return `Disruption de stabilisation dans ${Math.round(getAdaptiveInterval() / 1000)}s - ${analysis.emergentRisks.length} risques détectés`;
    }
    
    if (analysis.opportunities.length > 2) {
      return `Catalyseur de croissance dans ${Math.round(getAdaptiveInterval() / 1000)}s - ${analysis.opportunities.length} opportunités`;
    }
    
    if (analysis.coalitionDynamics.fragmentationRisk === 'high') {
      return `Médiation urgente dans ${Math.round(getAdaptiveInterval() / 1000)}s - Risque de fragmentation élevé`;
    }
    
    return `Système en équilibre - Prochaine analyse dans ${Math.round(getAdaptiveInterval() / 1000)}s`;
  };

  const manualTriggerIntelligent = () => {
    const intelligentEvent = generateContextualDisruption();
    
    if (intelligentEvent) {
      onInjectEvent(intelligentEvent);
      setLastAutoEvent(Date.now());
      
      // Feedback immédiat à l'utilisateur
      console.log(`[IA Disruption] Trigger manuel: ${intelligentEvent.name}`);
    } else {
      // Générer un événement par défaut si aucun contexte spécifique
      const defaultEvent = {
        type: 'innovation_catalyst' as const,
        name: `Disruption Manuelle (IA-${intelligenceLevel})`,
        description: 'Événement déclenché manuellement par l\'intelligence artificielle',
        intensity: 5 + intelligenceLevel,
        duration: 30 + (intelligenceLevel * 5),
        effects: {
          trustModifier: 0.1,
          energyModifier: 0.2,
          cooperationModifier: 0.3,
          innovationModifier: 0.4
        }
      };
      onInjectEvent(defaultEvent);
      setLastAutoEvent(Date.now());
    }
  };

  const handleAutoModeToggle = () => {
    setAutoMode(!autoMode);
  };

  return (
    <div className="space-y-6">
      {/* Contrôles principaux */}
      <div className="bg-slate-800/50 backdrop-blur-sm rounded-lg p-6 border border-slate-700">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-white flex items-center gap-2">
            <Brain className="w-5 h-5 text-purple-400" />
            Gestionnaire de Disruption Intelligent
            {autoMode && (
              <span className="text-xs bg-green-500/20 text-green-400 px-2 py-1 rounded border border-green-500/30">
                AUTO ACTIF
              </span>
            )}
          </h3>
          <div className="flex items-center gap-2">
            <button
              onClick={handleAutoModeToggle}
              disabled={!isRunning}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-colors ${
                autoMode 
                  ? 'bg-green-600 hover:bg-green-700 text-white' 
                  : 'bg-slate-600 hover:bg-slate-500 text-white'
              } disabled:opacity-50 disabled:cursor-not-allowed`}
            >
              {autoMode ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
              Mode Auto {autoMode ? 'ON' : 'OFF'}
            </button>
            <button
              onClick={manualTriggerIntelligent}
              disabled={!isRunning}
              className="flex items-center gap-2 px-4 py-2 rounded-lg font-medium bg-purple-600 hover:bg-purple-700 text-white transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <Zap className="w-4 h-4" />
              Trigger Intelligent
            </button>
          </div>
        </div>

        {/* Configuration */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Niveau d'Intelligence ({intelligenceLevel}/5)
            </label>
            <input
              type="range"
              min="1"
              max="5"
              value={intelligenceLevel}
              onChange={(e) => setIntelligenceLevel(Number(e.target.value))}
              className="w-full h-2 bg-slate-700 rounded-lg appearance-none cursor-pointer slider"
            />
            <div className="flex justify-between text-xs text-gray-500 mt-1">
              <span>Basique</span>
              <span>Expert</span>
            </div>
          </div>

          <div className="space-y-3">
            <label className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={adaptiveFrequency}
                onChange={(e) => setAdaptiveFrequency(e.target.checked)}
                className="rounded border-slate-600 bg-slate-700 text-cyan-500 focus:ring-cyan-500"
              />
              <span className="text-sm text-gray-300">Fréquence Adaptive</span>
            </label>
            <label className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={contextualTriggers}
                onChange={(e) => setContextualTriggers(e.target.checked)}
                className="rounded border-slate-600 bg-slate-700 text-cyan-500 focus:ring-cyan-500"
              />
              <span className="text-sm text-gray-300">Déclencheurs Contextuels</span>
            </label>
          </div>

          <div className="bg-slate-700/50 rounded-lg p-3">
            <div className="text-sm font-medium text-white mb-1">Prochaine Action Prédite</div>
            <div className="text-xs text-gray-300">{nextEventPrediction}</div>
            {autoMode && (
              <div className="text-xs text-green-400 mt-1">
                Intervalle: {Math.round(getAdaptiveInterval() / 1000)}s
              </div>
            )}
          </div>
        </div>

        {/* Indicateur de persistance */}
        {autoMode && (
          <div className="mt-4 p-3 bg-green-500/10 border border-green-500/30 rounded-lg">
            <p className="text-xs text-green-400">
              ✓ Mode automatique persistant - Continuera même si vous changez d'onglet
            </p>
          </div>
        )}
      </div>

      {/* Analyse du système */}
      {systemAnalysis && (
        <div className="bg-slate-800/50 backdrop-blur-sm rounded-lg p-6 border border-slate-700">
          <h4 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
            <TrendingUp className="w-5 h-5 text-cyan-400" />
            Analyse Systémique Temps Réel
          </h4>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {/* Tendance de stabilité */}
            <div className="bg-slate-700/50 rounded-lg p-4">
              <h5 className="text-sm font-medium text-white mb-2">Tendance de Stabilité</h5>
              <div className={`text-lg font-bold ${
                systemAnalysis.stabilityTrend === 'rising' ? 'text-green-400' :
                systemAnalysis.stabilityTrend === 'stable' ? 'text-blue-400' : 'text-red-400'
              }`}>
                {systemAnalysis.stabilityTrend === 'rising' ? 'En hausse' :
                 systemAnalysis.stabilityTrend === 'stable' ? 'Stable' : 'En baisse'}
              </div>
            </div>

            {/* Dynamiques de coalition */}
            <div className="bg-slate-700/50 rounded-lg p-4">
              <h5 className="text-sm font-medium text-white mb-2">Coalitions</h5>
              <div className="space-y-1 text-sm">
                <div className="text-gray-300">
                  Cohésion moy: {systemAnalysis.coalitionDynamics.averageCohesion.toFixed(0)}%
                </div>
                <div className="text-gray-300">
                  Grandes coalitions: {systemAnalysis.coalitionDynamics.largeCoalitionsCount}
                </div>
                <div className={`text-xs ${
                  systemAnalysis.coalitionDynamics.fragmentationRisk === 'high' ? 'text-red-400' :
                  systemAnalysis.coalitionDynamics.fragmentationRisk === 'medium' ? 'text-yellow-400' : 'text-green-400'
                }`}>
                  Risque fragmentation: {systemAnalysis.coalitionDynamics.fragmentationRisk}
                </div>
              </div>
            </div>

            {/* Patterns comportementaux */}
            <div className="bg-slate-700/50 rounded-lg p-4">
              <h5 className="text-sm font-medium text-white mb-2">Comportements</h5>
              <div className="space-y-1 text-sm">
                <div className="text-gray-300">
                  Dominant: {systemAnalysis.behavioralPatterns.dominantBehavior}
                </div>
                <div className="text-gray-300">
                  Diversité: {systemAnalysis.behavioralPatterns.diversity}/5
                </div>
              </div>
            </div>
          </div>

          {/* Risques et opportunités */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
            <div>
              <h5 className="text-sm font-medium text-white mb-2 flex items-center gap-2">
                <AlertTriangle className="w-4 h-4 text-red-400" />
                Risques Émergents
              </h5>
              {systemAnalysis.emergentRisks.length > 0 ? (
                <ul className="space-y-1">
                  {systemAnalysis.emergentRisks.map((risk: string, i: number) => (
                    <li key={i} className="text-sm text-red-400 flex items-start gap-1">
                      <span>•</span>
                      {risk}
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="text-sm text-gray-400">Aucun risque majeur détecté</p>
              )}
            </div>

            <div>
              <h5 className="text-sm font-medium text-white mb-2 flex items-center gap-2">
                <Target className="w-4 h-4 text-green-400" />
                Opportunités
              </h5>
              {systemAnalysis.opportunities.length > 0 ? (
                <ul className="space-y-1">
                  {systemAnalysis.opportunities.map((opp: string, i: number) => (
                    <li key={i} className="text-sm text-green-400 flex items-start gap-1">
                      <span>•</span>
                      {opp}
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="text-sm text-gray-400">Aucune opportunité spécifique identifiée</p>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Historique des actions intelligentes */}
      <div className="bg-slate-800/50 backdrop-blur-sm rounded-lg p-6 border border-slate-700">
        <h4 className="text-lg font-semibold text-white mb-4">Historique des Actions IA</h4>
        
        {state.activeDisruptions && state.activeDisruptions.length > 0 ? (
          <div className="space-y-3">
            {state.activeDisruptions.map((disruption, index) => (
              <div key={index} className="bg-slate-700/50 rounded-lg p-3 border border-slate-600">
                <div className="flex items-center justify-between mb-2">
                  <h5 className="font-medium text-white">{disruption.name}</h5>
                  <span className="text-xs text-gray-400">
                    Intensité: {disruption.intensity}/10
                  </span>
                </div>
                <p className="text-sm text-gray-300 mb-2">{disruption.description}</p>
                <div className="flex items-center gap-4 text-xs text-gray-400">
                  <span>Durée restante: {disruption.duration} cycles</span>
                  <span>Type: {disruption.type}</span>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-8">
            <Settings className="w-12 h-12 text-gray-400 mx-auto mb-3" />
            <p className="text-gray-400">Aucune disruption active</p>
            <p className="text-sm text-gray-500">Le système IA surveille et analysera les opportunités</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default IntelligentDisruptionManager;