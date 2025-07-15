import React, { useState, useEffect } from 'react';
import { SimulationState } from '../types';
import { PoliSynthCore } from '../engine/PoliSynthCore';
import { Atom, Zap, TrendingUp, Network, Brain, Target, AlertTriangle, Activity, Waves, Cpu } from 'lucide-react';

interface QuantumSocialAnalyzerProps {
  state: SimulationState;
  poliSynthCore: PoliSynthCore;
  isRunning: boolean;
}

interface QuantumState {
  entanglement: number;
  coherence: number;
  superposition: number;
  decoherence: number;
  quantumTunneling: number;
  waveFunction: number[];
}

interface QuantumEvent {
  id: string;
  timestamp: number;
  type: 'entanglement_formation' | 'coherence_collapse' | 'quantum_tunneling' | 'superposition_state' | 'decoherence_event';
  magnitude: number;
  affectedNodes: string[];
  probability: number;
  description: string;
}

const QuantumSocialAnalyzer: React.FC<QuantumSocialAnalyzerProps> = ({
  state,
  poliSynthCore,
  isRunning
}) => {
  const [quantumState, setQuantumState] = useState<QuantumState>({
    entanglement: 0,
    coherence: 0,
    superposition: 0,
    decoherence: 0,
    quantumTunneling: 0,
    waveFunction: []
  });
  
  const [quantumEvents, setQuantumEvents] = useState<QuantumEvent[]>([]);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [quantumField, setQuantumField] = useState<number[][]>([]);
  const [entanglementPairs, setEntanglementPairs] = useState<Array<{id1: string, id2: string, strength: number}>>([]);

  useEffect(() => {
    if (isRunning) {
      const interval = setInterval(() => {
        try {
          analyzeQuantumSocialStates();
          console.log("⚛️ Analyzing quantum social states");
        } catch (error) {
          console.error("Error analyzing quantum social states:", error);
        }
      }, 2000);

      return () => clearInterval(interval);
    }
  }, [isRunning, state]);

  const analyzeQuantumSocialStates = () => {
    setIsAnalyzing(true);
    
    // Calcul de l'intrication sociale (entanglement)
    const entanglement = calculateSocialEntanglement();
    
    // Calcul de la cohérence collective
    const coherence = calculateCollectiveCoherence();
    
    // Calcul de la superposition comportementale
    const superposition = calculateBehavioralSuperposition();
    
    // Calcul de la décohérence
    const decoherence = calculateSocialDecoherence();
    
    // Calcul de l'effet tunnel quantique social
    const quantumTunneling = calculateSocialQuantumTunneling();
    
    // Génération de la fonction d'onde sociale
    const waveFunction = generateSocialWaveFunction();
    
    // Génération du champ quantique social
    const field = generateQuantumSocialField();
    
    // Détection des paires intriquées
    const pairs = detectEntangledPairs();
    
    setQuantumState({
      entanglement,
      coherence,
      superposition,
      decoherence,
      quantumTunneling,
      waveFunction
    });
    
    setQuantumField(field);
    setEntanglementPairs(pairs);
    
    // Génération d'événements quantiques
    generateQuantumEvents();
    
    setTimeout(() => setIsAnalyzing(false), 500);
  };

  const calculateSocialEntanglement = (): number => {
    // Mesure l'intrication entre les Primatoms basée sur leurs relations
    let totalEntanglement = 0;
    let pairCount = 0;
    
    state.primatoms.forEach(p1 => {
      state.primatoms.forEach(p2 => {
        if (p1.id !== p2.id) {
          const relationship = p1.relationships[p2.id] || 0;
          const distance = Math.sqrt(Math.pow(p1.x - p2.x, 2) + Math.pow(p1.y - p2.y, 2));
          
          // Intrication inversement proportionnelle à la distance et proportionnelle à la relation
          const entanglement = (relationship / 100) * (1 / (1 + distance / 100));
          totalEntanglement += entanglement;
          pairCount++;
        }
      });
    });
    
    return pairCount > 0 ? (totalEntanglement / pairCount) * 100 : 0;
  };

  const calculateCollectiveCoherence = (): number => {
    // Mesure la cohérence des comportements collectifs
    const behaviors = state.primatoms.map(p => ({
      trust: p.trust,
      cooperation: p.cooperation,
      innovation: p.innovation,
      energy: p.energy
    }));
    
    const avgTrust = behaviors.reduce((sum, b) => sum + b.trust, 0) / behaviors.length;
    const avgCooperation = behaviors.reduce((sum, b) => sum + b.cooperation, 0) / behaviors.length;
    const avgInnovation = behaviors.reduce((sum, b) => sum + b.innovation, 0) / behaviors.length;
    const avgEnergy = behaviors.reduce((sum, b) => sum + b.energy, 0) / behaviors.length;
    
    // Calcul de la variance pour mesurer la cohérence
    const trustVariance = behaviors.reduce((sum, b) => sum + Math.pow(b.trust - avgTrust, 2), 0) / behaviors.length;
    const cooperationVariance = behaviors.reduce((sum, b) => sum + Math.pow(b.cooperation - avgCooperation, 2), 0) / behaviors.length;
    const innovationVariance = behaviors.reduce((sum, b) => sum + Math.pow(b.innovation - avgInnovation, 2), 0) / behaviors.length;
    const energyVariance = behaviors.reduce((sum, b) => sum + Math.pow(b.energy - avgEnergy, 2), 0) / behaviors.length;
    
    const avgVariance = (trustVariance + cooperationVariance + innovationVariance + energyVariance) / 4;
    
    // Cohérence inversement proportionnelle à la variance
    return Math.max(0, 100 - (avgVariance / 10));
  };

  const calculateBehavioralSuperposition = (): number => {
    // Mesure la capacité des Primatoms à être dans plusieurs états comportementaux
    let superpositionScore = 0;
    
    state.primatoms.forEach(primatom => {
      const behaviors = [primatom.trust, primatom.cooperation, primatom.innovation, primatom.energy];
      const maxBehavior = Math.max(...behaviors);
      const minBehavior = Math.min(...behaviors);
      
      // Superposition élevée si les comportements sont équilibrés
      const balance = 1 - ((maxBehavior - minBehavior) / 100);
      superpositionScore += balance;
    });
    
    return (superpositionScore / state.primatoms.length) * 100;
  };

  const calculateSocialDecoherence = (): number => {
    // Mesure la perte de cohérence due aux disruptions et au stress
    const avgStress = state.primatoms.reduce((sum, p) => sum + (p.stressLevel || 0), 0) / state.primatoms.length;
    const disruptionLevel = state.activeDisruptions?.reduce((sum, d) => sum + d.intensity, 0) || 0;
    
    return Math.min(100, avgStress + disruptionLevel * 5);
  };

  const calculateSocialQuantumTunneling = (): number => {
    // Mesure la capacité des Primatoms à "traverser" les barrières sociales
    let tunnelingEvents = 0;
    
    state.primatoms.forEach(primatom => {
      // Recherche de connexions improbables (tunneling social)
      Object.entries(primatom.relationships).forEach(([otherId, strength]) => {
        const other = state.primatoms.find(p => p.id === otherId);
        if (other && strength > 60) {
          const distance = Math.sqrt(Math.pow(primatom.x - other.x, 2) + Math.pow(primatom.y - other.y, 2));
          const behaviorCompatibility = getBehaviorCompatibility(primatom.behaviorType, other.behaviorType);
          
          // Tunneling si forte relation malgré distance élevée ou incompatibilité comportementale
          if (distance > 200 || behaviorCompatibility < 40) {
            tunnelingEvents++;
          }
        }
      });
    });
    
    return Math.min(100, (tunnelingEvents / state.primatoms.length) * 50);
  };

  const getBehaviorCompatibility = (type1: string, type2: string): number => {
    const compatibilityMatrix: Record<string, Record<string, number>> = {
      leader: { leader: 25, follower: 85, innovator: 65, mediator: 75, explorer: 55 },
      follower: { leader: 85, follower: 70, innovator: 50, mediator: 80, explorer: 60 },
      innovator: { leader: 65, follower: 50, innovator: 80, mediator: 70, explorer: 90 },
      mediator: { leader: 75, follower: 80, innovator: 70, mediator: 85, explorer: 65 },
      explorer: { leader: 55, follower: 60, innovator: 90, mediator: 65, explorer: 75 }
    };
    
    return compatibilityMatrix[type1]?.[type2] || 50;
  };

  const generateSocialWaveFunction = (): number[] => {
    // Génère une fonction d'onde représentant l'état quantique social
    const waveFunction: number[] = [];
    const resolution = 50;
    
    for (let i = 0; i < resolution; i++) {
      const x = (i / resolution) * 2 * Math.PI;
      
      // Combinaison de plusieurs harmoniques basées sur les métriques sociales
      const trustWave = Math.sin(x * 2) * (quantumState.coherence / 100);
      const cooperationWave = Math.cos(x * 3) * (quantumState.entanglement / 100);
      const innovationWave = Math.sin(x * 5) * (quantumState.superposition / 100);
      
      const amplitude = (trustWave + cooperationWave + innovationWave) / 3;
      waveFunction.push(amplitude);
    }
    
    return waveFunction;
  };

  const generateQuantumSocialField = (): number[][] => {
    // Génère un champ quantique social 2D
    const field: number[][] = [];
    const size = 20;
    
    for (let i = 0; i < size; i++) {
      field[i] = [];
      for (let j = 0; j < size; j++) {
        let fieldStrength = 0;
        
        // Influence de chaque Primatom sur le champ
        state.primatoms.forEach(primatom => {
          const x = (primatom.x / 1600) * size;
          const y = (primatom.y / 900) * size;
          const distance = Math.sqrt(Math.pow(i - x, 2) + Math.pow(j - y, 2));
          
          const influence = (primatom.influence || 50) / 100;
          const fieldContribution = influence * Math.exp(-distance / 5);
          fieldStrength += fieldContribution;
        });
        
        field[i][j] = Math.min(1, fieldStrength);
      }
    }
    
    return field;
  };

  const detectEntangledPairs = (): Array<{id1: string, id2: string, strength: number}> => {
    const pairs: Array<{id1: string, id2: string, strength: number}> = [];
    
    state.primatoms.forEach(p1 => {
      state.primatoms.forEach(p2 => {
        if (p1.id < p2.id) { // Éviter les doublons
          const relationship1 = p1.relationships[p2.id] || 0;
          const relationship2 = p2.relationships[p1.id] || 0;
          
          // Intrication si relations mutuelles fortes
          if (relationship1 > 70 && relationship2 > 70) {
            const entanglementStrength = (relationship1 + relationship2) / 2;
            pairs.push({
              id1: p1.id,
              id2: p2.id,
              strength: entanglementStrength
            });
          }
        }
      });
    });
    
    return pairs.sort((a, b) => b.strength - a.strength).slice(0, 10);
  };

  const generateQuantumEvents = () => {
    const events: QuantumEvent[] = [];
    
    // Événement d'intrication
    if (quantumState.entanglement > 70 && Math.random() < 0.3) {
      events.push({
        id: `entanglement-${Date.now()}`,
        timestamp: Date.now(),
        type: 'entanglement_formation',
        magnitude: quantumState.entanglement,
        affectedNodes: entanglementPairs.slice(0, 3).map(p => `${p.id1}-${p.id2}`),
        probability: 0.85,
        description: 'Formation d\'intrication quantique sociale entre groupes distants'
      });
    }
    
    // Événement de cohérence
    if (quantumState.coherence < 30 && Math.random() < 0.4) {
      events.push({
        id: `coherence-${Date.now()}`,
        timestamp: Date.now(),
        type: 'coherence_collapse',
        magnitude: 100 - quantumState.coherence,
        affectedNodes: state.primatoms.slice(0, 5).map(p => p.id),
        probability: 0.75,
        description: 'Effondrement de la cohérence quantique collective'
      });
    }
    
    // Événement de tunneling
    if (quantumState.quantumTunneling > 60 && Math.random() < 0.25) {
      events.push({
        id: `tunneling-${Date.now()}`,
        timestamp: Date.now(),
        type: 'quantum_tunneling',
        magnitude: quantumState.quantumTunneling,
        affectedNodes: state.primatoms.filter(p => (p.stressLevel || 0) > 50).map(p => p.id),
        probability: 0.65,
        description: 'Effet tunnel quantique social - connexions improbables détectées'
      });
    }
    
    setQuantumEvents(prev => [...events, ...prev].slice(0, 20));
  };

  const getQuantumStateColor = (value: number): string => {
    if (value > 75) return 'text-green-400';
    if (value > 50) return 'text-yellow-400';
    if (value > 25) return 'text-orange-400';
    return 'text-red-400';
  };

  const getEventTypeIcon = (type: QuantumEvent['type']) => {
    switch (type) {
      case 'entanglement_formation': return <Network className="w-4 h-4" />;
      case 'coherence_collapse': return <AlertTriangle className="w-4 h-4" />;
      case 'quantum_tunneling': return <Zap className="w-4 h-4" />;
      case 'superposition_state': return <Waves className="w-4 h-4" />;
      case 'decoherence_event': return <Activity className="w-4 h-4" />;
      default: return <Atom className="w-4 h-4" />;
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-slate-800/50 backdrop-blur-sm rounded-lg p-6 border border-slate-700">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-white flex items-center gap-2">
            <Atom className="w-5 h-5 text-cyan-400" />
            Analyseur Quantique Social - Recherche Avancée
            {isAnalyzing && (
              <span className="text-xs bg-cyan-500/20 text-cyan-400 px-2 py-1 rounded border border-cyan-500/30 animate-pulse">
                ANALYSE EN COURS
              </span>
            )}
          </h3>
          <button
            onClick={analyzeQuantumSocialStates}
            disabled={!isRunning}
            className="flex items-center gap-2 px-4 py-2 rounded-lg font-medium bg-cyan-600 hover:bg-cyan-700 disabled:bg-gray-600 disabled:cursor-not-allowed text-white transition-colors"
          >
            <Cpu className="w-4 h-4" />
            Analyse Quantique
          </button>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
          <div className="bg-slate-700/50 rounded-lg p-4 border border-slate-600">
            <div className="flex items-center gap-2 mb-2">
              <Network className="w-4 h-4 text-blue-400" />
              <span className="text-sm font-medium text-gray-300">Intrication</span>
            </div>
            <div className={`text-2xl font-bold ${getQuantumStateColor(quantumState.entanglement)}`}>
              {quantumState.entanglement.toFixed(1)}%
            </div>
            <div className="text-xs text-gray-400">Connexions quantiques</div>
          </div>

          <div className="bg-slate-700/50 rounded-lg p-4 border border-slate-600">
            <div className="flex items-center gap-2 mb-2">
              <Waves className="w-4 h-4 text-green-400" />
              <span className="text-sm font-medium text-gray-300">Cohérence</span>
            </div>
            <div className={`text-2xl font-bold ${getQuantumStateColor(quantumState.coherence)}`}>
              {quantumState.coherence.toFixed(1)}%
            </div>
            <div className="text-xs text-gray-400">Synchronisation collective</div>
          </div>

          <div className="bg-slate-700/50 rounded-lg p-4 border border-slate-600">
            <div className="flex items-center gap-2 mb-2">
              <Brain className="w-4 h-4 text-purple-400" />
              <span className="text-sm font-medium text-gray-300">Superposition</span>
            </div>
            <div className={`text-2xl font-bold ${getQuantumStateColor(quantumState.superposition)}`}>
              {quantumState.superposition.toFixed(1)}%
            </div>
            <div className="text-xs text-gray-400">États multiples</div>
          </div>

          <div className="bg-slate-700/50 rounded-lg p-4 border border-slate-600">
            <div className="flex items-center gap-2 mb-2">
              <AlertTriangle className="w-4 h-4 text-orange-400" />
              <span className="text-sm font-medium text-gray-300">Décohérence</span>
            </div>
            <div className={`text-2xl font-bold ${getQuantumStateColor(100 - quantumState.decoherence)}`}>
              {quantumState.decoherence.toFixed(1)}%
            </div>
            <div className="text-xs text-gray-400">Perte de cohérence</div>
          </div>

          <div className="bg-slate-700/50 rounded-lg p-4 border border-slate-600">
            <div className="flex items-center gap-2 mb-2">
              <Zap className="w-4 h-4 text-yellow-400" />
              <span className="text-sm font-medium text-gray-300">Tunneling</span>
            </div>
            <div className={`text-2xl font-bold ${getQuantumStateColor(quantumState.quantumTunneling)}`}>
              {quantumState.quantumTunneling.toFixed(1)}%
            </div>
            <div className="text-xs text-gray-400">Effet tunnel social</div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Fonction d'onde sociale */}
        <div className="bg-slate-800/50 backdrop-blur-sm rounded-lg p-6 border border-slate-700">
          <h4 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
            <Waves className="w-5 h-5 text-cyan-400" />
            Fonction d'Onde Sociale
          </h4>
          
          <div className="h-48 bg-slate-900/50 rounded-lg p-4 border border-slate-600">
            <svg width="100%" height="100%" viewBox="0 0 400 160">
              <defs>
                <linearGradient id="waveGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                  <stop offset="0%" stopColor="#06B6D4" stopOpacity="0.8"/>
                  <stop offset="100%" stopColor="#06B6D4" stopOpacity="0.1"/>
                </linearGradient>
              </defs>
              
              {/* Grille de fond */}
              <g stroke="#334155" strokeWidth="0.5" opacity="0.3">
                {[...Array(9)].map((_, i) => (
                  <line key={i} x1={i * 50} y1="0" x2={i * 50} y2="160" />
                ))}
                {[...Array(5)].map((_, i) => (
                  <line key={i} x1="0" y1={i * 40} x2="400" y2={i * 40} />
                ))}
              </g>
              
              {/* Fonction d'onde */}
              {quantumState.waveFunction.length > 0 && (
                <path
                  d={`M ${quantumState.waveFunction.map((value, index) => 
                    `${(index / quantumState.waveFunction.length) * 400},${80 + value * 60}`
                  ).join(' L ')}`}
                  fill="none"
                  stroke="#06B6D4"
                  strokeWidth="2"
                  className="animate-pulse"
                />
              )}
              
              {/* Zone remplie */}
              {quantumState.waveFunction.length > 0 && (
                <path
                  d={`M 0,80 L ${quantumState.waveFunction.map((value, index) => 
                    `${(index / quantumState.waveFunction.length) * 400},${80 + value * 60}`
                  ).join(' L ')} L 400,80 Z`}
                  fill="url(#waveGradient)"
                />
              )}
              
              {/* Ligne zéro */}
              <line x1="0" y1="80" x2="400" y2="80" stroke="#64748B" strokeWidth="1" strokeDasharray="5,5" />
            </svg>
          </div>
          
          <div className="mt-4 text-xs text-gray-400">
            Représentation quantique de l'état collectif du système social
          </div>
        </div>

        {/* Paires intriquées */}
        <div className="bg-slate-800/50 backdrop-blur-sm rounded-lg p-6 border border-slate-700">
          <h4 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
            <Network className="w-5 h-5 text-blue-400" />
            Paires Intriquées ({entanglementPairs.length})
          </h4>
          
          <div className="space-y-3 max-h-48 overflow-y-auto">
            {entanglementPairs.map((pair, index) => {
              const p1 = state.primatoms.find(p => p.id === pair.id1);
              const p2 = state.primatoms.find(p => p.id === pair.id2);
              
              return (
                <div key={index} className="bg-slate-700/50 rounded-lg p-3 border border-slate-600">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <Network className="w-4 h-4 text-blue-400" />
                      <span className="text-sm font-medium text-white">
                        {p1?.name} ↔ {p2?.name}
                      </span>
                    </div>
                    <span className="text-sm font-bold text-blue-400">
                      {pair.strength.toFixed(0)}%
                    </span>
                  </div>
                  <div className="flex items-center gap-4 text-xs text-gray-400">
                    <span>{p1?.behaviorType} - {p2?.behaviorType}</span>
                    <span>Intrication: {(pair.strength / 100 * quantumState.entanglement / 100).toFixed(2)}</span>
                  </div>
                </div>
              );
            })}
          </div>
          
          {entanglementPairs.length === 0 && (
            <div className="text-center py-8 text-gray-400">
              <Network className="w-12 h-12 mx-auto mb-3 opacity-50" />
              <p>Aucune paire intriquée détectée</p>
              <p className="text-xs">Augmentez les interactions pour créer des intrications</p>
            </div>
          )}
        </div>
      </div>

      {/* Événements quantiques */}
      <div className="bg-slate-800/50 backdrop-blur-sm rounded-lg p-6 border border-slate-700">
        <h4 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
          <Atom className="w-5 h-5 text-purple-400" />
          Événements Quantiques Sociaux
        </h4>
        
        <div className="space-y-3 max-h-64 overflow-y-auto">
          {quantumEvents.map((event, index) => (
            <div key={event.id} className="bg-slate-700/50 rounded-lg p-4 border border-slate-600">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  {getEventTypeIcon(event.type)}
                  <span className="font-medium text-white">{event.description}</span>
                </div>
                <div className="flex items-center gap-2 text-xs text-gray-400">
                  <span>P: {(event.probability * 100).toFixed(0)}%</span>
                  <span>M: {event.magnitude.toFixed(1)}</span>
                </div>
              </div>
              
              <div className="text-xs text-gray-400">
                Nœuds affectés: {event.affectedNodes.length} | 
                Timestamp: {new Date(event.timestamp).toLocaleTimeString()}
              </div>
              
              <div className="mt-2">
                <div className="w-full bg-slate-600 rounded-full h-1">
                  <div 
                    className="h-1 rounded-full bg-purple-500 transition-all duration-300"
                    style={{ width: `${event.magnitude}%` }}
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
        
        {quantumEvents.length === 0 && (
          <div className="text-center py-8 text-gray-400">
            <Atom className="w-12 h-12 mx-auto mb-3 opacity-50" />
            <p>Aucun événement quantique détecté</p>
            <p className="text-xs">Les événements apparaîtront lors de l'analyse en temps réel</p>
          </div>
        )}
      </div>

      {/* Théories scientifiques */}
      <div className="bg-slate-800/50 backdrop-blur-sm rounded-lg p-6 border border-slate-700">
        <h4 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
          <Brain className="w-5 h-5 text-green-400" />
          Fondements Théoriques Quantiques
        </h4>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-slate-700/50 rounded-lg p-4 border border-slate-600">
            <h5 className="font-medium text-white mb-2">Intrication Sociale</h5>
            <p className="text-sm text-gray-300 mb-2">
              Phénomène où deux Primatoms distants maintiennent une corrélation instantanée de leurs états comportementaux.
            </p>
            <div className="text-xs text-cyan-400">
              Applications: Prédiction de comportements collectifs, synchronisation à distance
            </div>
          </div>
          
          <div className="bg-slate-700/50 rounded-lg p-4 border border-slate-600">
            <h5 className="font-medium text-white mb-2">Superposition Comportementale</h5>
            <p className="text-sm text-gray-300 mb-2">
              Capacité d'un Primatom à exister simultanément dans plusieurs états comportementaux.
            </p>
            <div className="text-xs text-purple-400">
              Applications: Adaptabilité maximale, résolution de conflits cognitifs
            </div>
          </div>
          
          <div className="bg-slate-700/50 rounded-lg p-4 border border-slate-600">
            <h5 className="font-medium text-white mb-2">Effet Tunnel Social</h5>
            <p className="text-sm text-gray-300 mb-2">
              Franchissement de barrières sociales normalement infranchissables par effet quantique.
            </p>
            <div className="text-xs text-yellow-400">
              Applications: Innovation disruptive, résolution de blocages sociaux
            </div>
          </div>
          
          <div className="bg-slate-700/50 rounded-lg p-4 border border-slate-600">
            <h5 className="font-medium text-white mb-2">Décohérence Collective</h5>
            <p className="text-sm text-gray-300 mb-2">
              Perte progressive de la cohérence quantique due aux interactions avec l'environnement.
            </p>
            <div className="text-xs text-orange-400">
              Applications: Prévention de l'effondrement social, maintien de la stabilité
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuantumSocialAnalyzer;