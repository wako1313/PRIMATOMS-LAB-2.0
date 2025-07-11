import React, { useState, useEffect } from 'react';
import { SimulationState } from '../types';
import { PoliSynthCore } from '../engine/PoliSynthCore';
import { Network, Brain, Zap, TrendingUp, Target, AlertTriangle, Activity, Users, Cpu, Eye } from 'lucide-react';

interface EmergentIntelligenceTrackerProps {
  state: SimulationState;
  poliSynthCore: PoliSynthCore;
  isRunning: boolean;
}

interface IntelligenceCluster {
  id: string;
  centerPrimatom: string;
  members: string[];
  intelligenceLevel: number;
  emergenceType: 'collective' | 'distributed' | 'hierarchical' | 'swarm' | 'hybrid';
  capabilities: string[];
  evolutionStage: number;
  timestamp: number;
}

interface EmergentBehavior {
  id: string;
  type: 'problem_solving' | 'pattern_recognition' | 'adaptive_learning' | 'creative_synthesis' | 'meta_cognition';
  description: string;
  complexity: number;
  participants: string[];
  emergenceTime: number;
  stability: number;
}

const EmergentIntelligenceTracker: React.FC<EmergentIntelligenceTrackerProps> = ({
  state,
  poliSynthCore,
  isRunning
}) => {
  const [intelligenceClusters, setIntelligenceClusters] = useState<IntelligenceCluster[]>([]);
  const [emergentBehaviors, setEmergentBehaviors] = useState<EmergentBehavior[]>([]);
  const [isScanning, setIsScanning] = useState(false);
  const [globalIntelligence, setGlobalIntelligence] = useState(0);
  const [emergenceMetrics, setEmergenceMetrics] = useState({
    collectiveIQ: 0,
    adaptabilityIndex: 0,
    innovationPotential: 0,
    learningRate: 0,
    problemSolvingCapacity: 0
  });

  useEffect(() => {
    if (isRunning) {
      const interval = setInterval(() => {
        scanForEmergentIntelligence();
      }, 3000);

      return () => clearInterval(interval);
    }
  }, [isRunning, state]);

  const scanForEmergentIntelligence = () => {
    setIsScanning(true);
    
    // Détection des clusters d'intelligence
    const clusters = detectIntelligenceClusters();
    
    // Détection des comportements émergents
    const behaviors = detectEmergentBehaviors();
    
    // Calcul de l'intelligence globale
    const globalIQ = calculateGlobalIntelligence();
    
    // Calcul des métriques d'émergence
    const metrics = calculateEmergenceMetrics();
    
    setIntelligenceClusters(clusters);
    setEmergentBehaviors(behaviors);
    setGlobalIntelligence(globalIQ);
    setEmergenceMetrics(metrics);
    
    setTimeout(() => setIsScanning(false), 1000);
  };

  const detectIntelligenceClusters = (): IntelligenceCluster[] => {
    const clusters: IntelligenceCluster[] = [];
    const processedPrimatoms = new Set<string>();
    
    state.primatoms.forEach(centerPrimatom => {
      if (processedPrimatoms.has(centerPrimatom.id)) return;
      
      // Recherche des Primatoms connectés avec haute innovation/coopération
      const connectedPrimatoms = state.primatoms.filter(p => {
        if (p.id === centerPrimatom.id) return false;
        
        const relationship = centerPrimatom.relationships[p.id] || 0;
        const distance = Math.sqrt(
          Math.pow(centerPrimatom.x - p.x, 2) + 
          Math.pow(centerPrimatom.y - p.y, 2)
        );
        
        return relationship > 60 && distance < 150 && 
               (p.innovation > 70 || p.cooperation > 75);
      });
      
      if (connectedPrimatoms.length >= 3) {
        const members = [centerPrimatom.id, ...connectedPrimatoms.map(p => p.id)];
        
        // Calcul du niveau d'intelligence du cluster
        const avgInnovation = members.reduce((sum, id) => {
          const p = state.primatoms.find(pr => pr.id === id);
          return sum + (p?.innovation || 0);
        }, 0) / members.length;
        
        const avgCooperation = members.reduce((sum, id) => {
          const p = state.primatoms.find(pr => pr.id === id);
          return sum + (p?.cooperation || 0);
        }, 0) / members.length;
        
        const intelligenceLevel = (avgInnovation + avgCooperation) / 2;
        
        if (intelligenceLevel > 65) {
          const cluster: IntelligenceCluster = {
            id: `cluster-${Date.now()}-${Math.random()}`,
            centerPrimatom: centerPrimatom.id,
            members,
            intelligenceLevel,
            emergenceType: determineEmergenceType(members, state),
            capabilities: generateCapabilities(intelligenceLevel, members.length),
            evolutionStage: calculateEvolutionStage(intelligenceLevel, members.length),
            timestamp: Date.now()
          };
          
          clusters.push(cluster);
          members.forEach(id => processedPrimatoms.add(id));
        }
      }
    });
    
    return clusters.sort((a, b) => b.intelligenceLevel - a.intelligenceLevel);
  };

  const determineEmergenceType = (members: string[], state: SimulationState): IntelligenceCluster['emergenceType'] => {
    const memberPrimatoms = members.map(id => state.primatoms.find(p => p.id === id)).filter(Boolean);
    
    const leaderCount = memberPrimatoms.filter(p => p?.behaviorType === 'leader').length;
    const innovatorCount = memberPrimatoms.filter(p => p?.behaviorType === 'innovator').length;
    const mediatorCount = memberPrimatoms.filter(p => p?.behaviorType === 'mediator').length;
    
    if (leaderCount > members.length * 0.3) return 'hierarchical';
    if (innovatorCount > members.length * 0.4) return 'distributed';
    if (mediatorCount > members.length * 0.3) return 'collective';
    if (members.length > 10) return 'swarm';
    return 'hybrid';
  };

  const generateCapabilities = (intelligenceLevel: number, memberCount: number): string[] => {
    const capabilities: string[] = [];
    
    if (intelligenceLevel > 80) {
      capabilities.push('Résolution de problèmes complexes');
      capabilities.push('Innovation disruptive');
    }
    
    if (intelligenceLevel > 70) {
      capabilities.push('Apprentissage adaptatif');
      capabilities.push('Reconnaissance de patterns');
    }
    
    if (memberCount > 8) {
      capabilities.push('Traitement parallèle');
      capabilities.push('Intelligence distribuée');
    }
    
    if (intelligenceLevel > 75 && memberCount > 5) {
      capabilities.push('Méta-cognition collective');
      capabilities.push('Auto-organisation avancée');
    }
    
    return capabilities;
  };

  const calculateEvolutionStage = (intelligenceLevel: number, memberCount: number): number => {
    const baseStage = Math.floor(intelligenceLevel / 20);
    const sizeBonus = Math.floor(memberCount / 5);
    return Math.min(5, baseStage + sizeBonus);
  };

  const detectEmergentBehaviors = (): EmergentBehavior[] => {
    const behaviors: EmergentBehavior[] = [];
    
    // Détection de résolution de problèmes collectifs
    const problemSolvingGroups = detectProblemSolvingBehavior();
    behaviors.push(...problemSolvingGroups);
    
    // Détection d'apprentissage adaptatif
    const learningBehaviors = detectAdaptiveLearning();
    behaviors.push(...learningBehaviors);
    
    // Détection de synthèse créative
    const creativeBehaviors = detectCreativeSynthesis();
    behaviors.push(...creativeBehaviors);
    
    return behaviors.slice(0, 15); // Limiter à 15 comportements
  };

  const detectProblemSolvingBehavior = (): EmergentBehavior[] => {
    const behaviors: EmergentBehavior[] = [];
    
    // Recherche de groupes avec haute coopération face au stress
    const stressedPrimatoms = state.primatoms.filter(p => (p.stressLevel || 0) > 50);
    
    if (stressedPrimatoms.length > 5) {
      const cooperativeGroups = groupByProximityAndCooperation(stressedPrimatoms);
      
      cooperativeGroups.forEach(group => {
        if (group.length >= 4) {
          const avgCooperation = group.reduce((sum, p) => sum + p.cooperation, 0) / group.length;
          
          if (avgCooperation > 70) {
            behaviors.push({
              id: `problem-solving-${Date.now()}-${Math.random()}`,
              type: 'problem_solving',
              description: `Résolution collective de stress par groupe de ${group.length} Primatoms`,
              complexity: Math.min(100, avgCooperation + group.length * 5),
              participants: group.map(p => p.id),
              emergenceTime: Date.now(),
              stability: avgCooperation
            });
          }
        }
      });
    }
    
    return behaviors;
  };

  const detectAdaptiveLearning = (): EmergentBehavior[] => {
    const behaviors: EmergentBehavior[] = [];
    
    // Recherche de Primatoms avec adaptation rapide
    const adaptivePrimatoms = state.primatoms.filter(p => 
      (p.adaptabilityScore || 50) > 75 && p.memories.length > 10
    );
    
    if (adaptivePrimatoms.length > 3) {
      const learningClusters = groupByProximityAndCooperation(adaptivePrimatoms);
      
      learningClusters.forEach(cluster => {
        if (cluster.length >= 3) {
          const avgAdaptability = cluster.reduce((sum, p) => sum + (p.adaptabilityScore || 50), 0) / cluster.length;
          
          behaviors.push({
            id: `adaptive-learning-${Date.now()}-${Math.random()}`,
            type: 'adaptive_learning',
            description: `Apprentissage adaptatif collectif par ${cluster.length} Primatoms`,
            complexity: avgAdaptability,
            participants: cluster.map(p => p.id),
            emergenceTime: Date.now(),
            stability: avgAdaptability
          });
        }
      });
    }
    
    return behaviors;
  };

  const detectCreativeSynthesis = (): EmergentBehavior[] => {
    const behaviors: EmergentBehavior[] = [];
    
    // Recherche de groupes d'innovateurs connectés
    const innovators = state.primatoms.filter(p => 
      p.behaviorType === 'innovator' && p.innovation > 80
    );
    
    if (innovators.length > 2) {
      const creativeNetworks = findConnectedInnovators(innovators);
      
      creativeNetworks.forEach(network => {
        if (network.length >= 3) {
          const avgInnovation = network.reduce((sum, p) => sum + p.innovation, 0) / network.length;
          
          behaviors.push({
            id: `creative-synthesis-${Date.now()}-${Math.random()}`,
            type: 'creative_synthesis',
            description: `Synthèse créative par réseau de ${network.length} innovateurs`,
            complexity: avgInnovation + network.length * 3,
            participants: network.map(p => p.id),
            emergenceTime: Date.now(),
            stability: avgInnovation
          });
        }
      });
    }
    
    return behaviors;
  };

  const groupByProximityAndCooperation = (primatoms: any[]): any[][] => {
    const groups: any[][] = [];
    const processed = new Set<string>();
    
    primatoms.forEach(primatom => {
      if (processed.has(primatom.id)) return;
      
      const group = [primatom];
      processed.add(primatom.id);
      
      primatoms.forEach(other => {
        if (processed.has(other.id)) return;
        
        const distance = Math.sqrt(
          Math.pow(primatom.x - other.x, 2) + 
          Math.pow(primatom.y - other.y, 2)
        );
        
        const relationship = primatom.relationships[other.id] || 0;
        
        if (distance < 120 && relationship > 60) {
          group.push(other);
          processed.add(other.id);
        }
      });
      
      if (group.length > 1) {
        groups.push(group);
      }
    });
    
    return groups;
  };

  const findConnectedInnovators = (innovators: any[]): any[][] => {
    const networks: any[][] = [];
    const processed = new Set<string>();
    
    innovators.forEach(innovator => {
      if (processed.has(innovator.id)) return;
      
      const network = [innovator];
      processed.add(innovator.id);
      
      const findConnected = (current: any) => {
        innovators.forEach(other => {
          if (processed.has(other.id)) return;
          
          const relationship = current.relationships[other.id] || 0;
          
          if (relationship > 70) {
            network.push(other);
            processed.add(other.id);
            findConnected(other); // Recherche récursive
          }
        });
      };
      
      findConnected(innovator);
      
      if (network.length > 1) {
        networks.push(network);
      }
    });
    
    return networks;
  };

  const calculateGlobalIntelligence = (): number => {
    const avgInnovation = state.primatoms.reduce((sum, p) => sum + p.innovation, 0) / state.primatoms.length;
    const avgCooperation = state.primatoms.reduce((sum, p) => sum + p.cooperation, 0) / state.primatoms.length;
    const avgAdaptability = state.primatoms.reduce((sum, p) => sum + (p.adaptabilityScore || 50), 0) / state.primatoms.length;
    
    const clusterBonus = intelligenceClusters.length * 5;
    const behaviorBonus = emergentBehaviors.length * 3;
    
    return Math.min(100, (avgInnovation + avgCooperation + avgAdaptability) / 3 + clusterBonus + behaviorBonus);
  };

  const calculateEmergenceMetrics = () => {
    const collectiveIQ = intelligenceClusters.reduce((sum, c) => sum + c.intelligenceLevel, 0) / Math.max(1, intelligenceClusters.length);
    
    const adaptabilityIndex = state.primatoms.reduce((sum, p) => sum + (p.adaptabilityScore || 50), 0) / state.primatoms.length;
    
    const innovationPotential = state.primatoms.filter(p => p.innovation > 75).length / state.primatoms.length * 100;
    
    const learningRate = emergentBehaviors.filter(b => b.type === 'adaptive_learning').length * 10;
    
    const problemSolvingCapacity = emergentBehaviors.filter(b => b.type === 'problem_solving').length * 15;
    
    return {
      collectiveIQ,
      adaptabilityIndex,
      innovationPotential,
      learningRate: Math.min(100, learningRate),
      problemSolvingCapacity: Math.min(100, problemSolvingCapacity)
    };
  };

  const getIntelligenceColor = (level: number): string => {
    if (level > 85) return 'text-purple-400';
    if (level > 70) return 'text-blue-400';
    if (level > 55) return 'text-green-400';
    if (level > 40) return 'text-yellow-400';
    return 'text-red-400';
  };

  const getEmergenceTypeIcon = (type: IntelligenceCluster['emergenceType']) => {
    switch (type) {
      case 'collective': return <Users className="w-4 h-4" />;
      case 'distributed': return <Network className="w-4 h-4" />;
      case 'hierarchical': return <Target className="w-4 h-4" />;
      case 'swarm': return <Activity className="w-4 h-4" />;
      case 'hybrid': return <Brain className="w-4 h-4" />;
      default: return <Cpu className="w-4 h-4" />;
    }
  };

  const getBehaviorTypeIcon = (type: EmergentBehavior['type']) => {
    switch (type) {
      case 'problem_solving': return <Target className="w-4 h-4" />;
      case 'pattern_recognition': return <Eye className="w-4 h-4" />;
      case 'adaptive_learning': return <TrendingUp className="w-4 h-4" />;
      case 'creative_synthesis': return <Zap className="w-4 h-4" />;
      case 'meta_cognition': return <Brain className="w-4 h-4" />;
      default: return <Activity className="w-4 h-4" />;
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-slate-800/50 backdrop-blur-sm rounded-lg p-6 border border-slate-700">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-white flex items-center gap-2">
            <Network className="w-5 h-5 text-purple-400" />
            Détecteur d'Intelligence Émergente
            {isScanning && (
              <span className="text-xs bg-purple-500/20 text-purple-400 px-2 py-1 rounded border border-purple-500/30 animate-pulse">
                SCAN EN COURS
              </span>
            )}
          </h3>
          <button
            onClick={scanForEmergentIntelligence}
            disabled={!isRunning}
            className="flex items-center gap-2 px-4 py-2 rounded-lg font-medium bg-purple-600 hover:bg-purple-700 disabled:bg-gray-600 disabled:cursor-not-allowed text-white transition-colors"
          >
            <Brain className="w-4 h-4" />
            Scan Intelligence
          </button>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
          <div className="bg-slate-700/50 rounded-lg p-4 border border-slate-600">
            <div className="flex items-center gap-2 mb-2">
              <Brain className="w-4 h-4 text-purple-400" />
              <span className="text-sm font-medium text-gray-300">IQ Global</span>
            </div>
            <div className={`text-2xl font-bold ${getIntelligenceColor(globalIntelligence)}`}>
              {globalIntelligence.toFixed(0)}
            </div>
            <div className="text-xs text-gray-400">Intelligence collective</div>
          </div>

          <div className="bg-slate-700/50 rounded-lg p-4 border border-slate-600">
            <div className="flex items-center gap-2 mb-2">
              <Network className="w-4 h-4 text-blue-400" />
              <span className="text-sm font-medium text-gray-300">Clusters</span>
            </div>
            <div className="text-2xl font-bold text-blue-400">
              {intelligenceClusters.length}
            </div>
            <div className="text-xs text-gray-400">Groupes intelligents</div>
          </div>

          <div className="bg-slate-700/50 rounded-lg p-4 border border-slate-600">
            <div className="flex items-center gap-2 mb-2">
              <TrendingUp className="w-4 h-4 text-green-400" />
              <span className="text-sm font-medium text-gray-300">Adaptabilité</span>
            </div>
            <div className="text-2xl font-bold text-green-400">
              {emergenceMetrics.adaptabilityIndex.toFixed(0)}
            </div>
            <div className="text-xs text-gray-400">Index d'adaptation</div>
          </div>

          <div className="bg-slate-700/50 rounded-lg p-4 border border-slate-600">
            <div className="flex items-center gap-2 mb-2">
              <Zap className="w-4 h-4 text-yellow-400" />
              <span className="text-sm font-medium text-gray-300">Innovation</span>
            </div>
            <div className="text-2xl font-bold text-yellow-400">
              {emergenceMetrics.innovationPotential.toFixed(0)}%
            </div>
            <div className="text-xs text-gray-400">Potentiel créatif</div>
          </div>

          <div className="bg-slate-700/50 rounded-lg p-4 border border-slate-600">
            <div className="flex items-center gap-2 mb-2">
              <Activity className="w-4 h-4 text-cyan-400" />
              <span className="text-sm font-medium text-gray-300">Comportements</span>
            </div>
            <div className="text-2xl font-bold text-cyan-400">
              {emergentBehaviors.length}
            </div>
            <div className="text-xs text-gray-400">Émergences actives</div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Clusters d'intelligence */}
        <div className="bg-slate-800/50 backdrop-blur-sm rounded-lg p-6 border border-slate-700">
          <h4 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
            <Network className="w-5 h-5 text-blue-400" />
            Clusters d'Intelligence ({intelligenceClusters.length})
          </h4>
          
          <div className="space-y-3 max-h-64 overflow-y-auto">
            {intelligenceClusters.map((cluster, index) => {
              const centerPrimatom = state.primatoms.find(p => p.id === cluster.centerPrimatom);
              
              return (
                <div key={cluster.id} className="bg-slate-700/50 rounded-lg p-4 border border-slate-600">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      {getEmergenceTypeIcon(cluster.emergenceType)}
                      <span className="font-medium text-white">
                        Cluster #{index + 1} - {cluster.emergenceType}
                      </span>
                    </div>
                    <span className={`text-lg font-bold ${getIntelligenceColor(cluster.intelligenceLevel)}`}>
                      {cluster.intelligenceLevel.toFixed(0)}
                    </span>
                  </div>
                  
                  <div className="mb-3">
                    <div className="text-sm text-gray-300 mb-1">
                      Centre: {centerPrimatom?.name} | Membres: {cluster.members.length}
                    </div>
                    <div className="text-xs text-gray-400">
                      Évolution: Stade {cluster.evolutionStage}/5
                    </div>
                  </div>
                  
                  <div className="space-y-1">
                    <div className="text-xs font-medium text-gray-300">Capacités:</div>
                    <div className="flex flex-wrap gap-1">
                      {cluster.capabilities.map((capability, i) => (
                        <span key={i} className="text-xs bg-purple-500/20 text-purple-400 px-2 py-1 rounded">
                          {capability}
                        </span>
                      ))}
                    </div>
                  </div>
                  
                  <div className="mt-2">
                    <div className="w-full bg-slate-600 rounded-full h-2">
                      <div 
                        className="h-2 rounded-full bg-purple-500 transition-all duration-300"
                        style={{ width: `${cluster.intelligenceLevel}%` }}
                      />
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
          
          {intelligenceClusters.length === 0 && (
            <div className="text-center py-8 text-gray-400">
              <Network className="w-12 h-12 mx-auto mb-3 opacity-50" />
              <p>Aucun cluster d'intelligence détecté</p>
              <p className="text-xs">Augmentez l'innovation et la coopération</p>
            </div>
          )}
        </div>

        {/* Comportements émergents */}
        <div className="bg-slate-800/50 backdrop-blur-sm rounded-lg p-6 border border-slate-700">
          <h4 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
            <Activity className="w-5 h-5 text-cyan-400" />
            Comportements Émergents ({emergentBehaviors.length})
          </h4>
          
          <div className="space-y-3 max-h-64 overflow-y-auto">
            {emergentBehaviors.map((behavior, index) => (
              <div key={behavior.id} className="bg-slate-700/50 rounded-lg p-4 border border-slate-600">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    {getBehaviorTypeIcon(behavior.type)}
                    <span className="font-medium text-white text-sm">
                      {behavior.description}
                    </span>
                  </div>
                  <span className="text-sm font-bold text-cyan-400">
                    {behavior.complexity.toFixed(0)}
                  </span>
                </div>
                
                <div className="flex items-center justify-between text-xs text-gray-400 mb-2">
                  <span>Participants: {behavior.participants.length}</span>
                  <span>Stabilité: {behavior.stability.toFixed(0)}%</span>
                </div>
                
                <div className="w-full bg-slate-600 rounded-full h-1">
                  <div 
                    className="h-1 rounded-full bg-cyan-500 transition-all duration-300"
                    style={{ width: `${behavior.stability}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
          
          {emergentBehaviors.length === 0 && (
            <div className="text-center py-8 text-gray-400">
              <Activity className="w-12 h-12 mx-auto mb-3 opacity-50" />
              <p>Aucun comportement émergent détecté</p>
              <p className="text-xs">Les comportements apparaîtront avec l'évolution</p>
            </div>
          )}
        </div>
      </div>

      {/* Métriques détaillées */}
      <div className="bg-slate-800/50 backdrop-blur-sm rounded-lg p-6 border border-slate-700">
        <h4 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
          <TrendingUp className="w-5 h-5 text-green-400" />
          Métriques d'Émergence Avancées
        </h4>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <div className="bg-slate-700/50 rounded-lg p-4 border border-slate-600">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium text-gray-300">QI Collectif</span>
              <span className={`font-bold ${getIntelligenceColor(emergenceMetrics.collectiveIQ)}`}>
                {emergenceMetrics.collectiveIQ.toFixed(0)}
              </span>
            </div>
            <div className="w-full bg-slate-600 rounded-full h-2">
              <div 
                className="h-2 rounded-full bg-purple-500 transition-all duration-300"
                style={{ width: `${emergenceMetrics.collectiveIQ}%` }}
              />
            </div>
          </div>
          
          <div className="bg-slate-700/50 rounded-lg p-4 border border-slate-600">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium text-gray-300">Taux d'Apprentissage</span>
              <span className="font-bold text-green-400">
                {emergenceMetrics.learningRate.toFixed(0)}%
              </span>
            </div>
            <div className="w-full bg-slate-600 rounded-full h-2">
              <div 
                className="h-2 rounded-full bg-green-500 transition-all duration-300"
                style={{ width: `${emergenceMetrics.learningRate}%` }}
              />
            </div>
          </div>
          
          <div className="bg-slate-700/50 rounded-lg p-4 border border-slate-600">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium text-gray-300">Résolution de Problèmes</span>
              <span className="font-bold text-blue-400">
                {emergenceMetrics.problemSolvingCapacity.toFixed(0)}%
              </span>
            </div>
            <div className="w-full bg-slate-600 rounded-full h-2">
              <div 
                className="h-2 rounded-full bg-blue-500 transition-all duration-300"
                style={{ width: `${emergenceMetrics.problemSolvingCapacity}%` }}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Théories scientifiques */}
      <div className="bg-slate-800/50 backdrop-blur-sm rounded-lg p-6 border border-slate-700">
        <h4 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
          <Brain className="w-5 h-5 text-purple-400" />
          Fondements Théoriques de l'Intelligence Émergente
        </h4>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-slate-700/50 rounded-lg p-4 border border-slate-600">
            <h5 className="font-medium text-white mb-2">Intelligence Collective</h5>
            <p className="text-sm text-gray-300 mb-2">
              Émergence de capacités cognitives supérieures à partir d'interactions entre agents individuels.
            </p>
            <div className="text-xs text-purple-400">
              Basé sur les travaux de Pierre Lévy et Tom Malone (MIT)
            </div>
          </div>
          
          <div className="bg-slate-700/50 rounded-lg p-4 border border-slate-600">
            <h5 className="font-medium text-white mb-2">Systèmes Adaptatifs Complexes</h5>
            <p className="text-sm text-gray-300 mb-2">
              Auto-organisation et adaptation émergente dans les réseaux sociaux complexes.
            </p>
            <div className="text-xs text-green-400">
              Théorie de John Holland et Stuart Kauffman
            </div>
          </div>
          
          <div className="bg-slate-700/50 rounded-lg p-4 border border-slate-600">
            <h5 className="font-medium text-white mb-2">Cognition Distribuée</h5>
            <p className="text-sm text-gray-300 mb-2">
              Processus cognitifs répartis entre individus, outils et représentations externes.
            </p>
            <div className="text-xs text-blue-400">
              Modèle d'Edwin Hutchins (UC San Diego)
            </div>
          </div>
          
          <div className="bg-slate-700/50 rounded-lg p-4 border border-slate-600">
            <h5 className="font-medium text-white mb-2">Méta-Cognition Sociale</h5>
            <p className="text-sm text-gray-300 mb-2">
              Capacité collective à réfléchir sur ses propres processus de pensée et d'apprentissage.
            </p>
            <div className="text-xs text-yellow-400">
              Recherches de Marlene Scardamalia (OISE/UT)
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmergentIntelligenceTracker;