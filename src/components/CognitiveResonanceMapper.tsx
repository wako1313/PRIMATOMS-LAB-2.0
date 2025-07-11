import React, { useState, useEffect } from 'react';
import { SimulationState } from '../types';
import { PoliSynthCore } from '../engine/PoliSynthCore';
import { Waves, Brain, Zap, TrendingUp, Target, Activity, Users, Radio, Cpu, Eye } from 'lucide-react';

interface CognitiveResonanceMapperProps {
  state: SimulationState;
  poliSynthCore: PoliSynthCore;
  isRunning: boolean;
}

interface ResonanceField {
  id: string;
  centerX: number;
  centerY: number;
  frequency: number;
  amplitude: number;
  phase: number;
  type: 'cognitive' | 'emotional' | 'behavioral' | 'social';
  participants: string[];
  stability: number;
}

interface ResonancePattern {
  id: string;
  type: 'synchronization' | 'interference' | 'amplification' | 'dampening' | 'phase_lock';
  description: string;
  strength: number;
  frequency: number;
  affectedFields: string[];
  emergenceTime: number;
}

interface CognitiveWave {
  id: string;
  sourceId: string;
  waveType: 'thought' | 'emotion' | 'decision' | 'memory' | 'intention';
  frequency: number;
  amplitude: number;
  propagationSpeed: number;
  currentRadius: number;
  maxRadius: number;
  timestamp: number;
}

const CognitiveResonanceMapper: React.FC<CognitiveResonanceMapperProps> = ({
  state,
  poliSynthCore,
  isRunning
}) => {
  const [resonanceFields, setResonanceFields] = useState<ResonanceField[]>([]);
  const [resonancePatterns, setResonancePatterns] = useState<ResonancePattern[]>([]);
  const [cognitiveWaves, setCognitiveWaves] = useState<CognitiveWave[]>([]);
  const [isMapping, setIsMapping] = useState(false);
  const [globalResonance, setGlobalResonance] = useState(0);
  const [resonanceMetrics, setResonanceMetrics] = useState({
    coherenceLevel: 0,
    synchronizationIndex: 0,
    interferenceLevel: 0,
    amplificationFactor: 0,
    cognitiveEntropy: 0
  });

  useEffect(() => {
    if (isRunning) {
      const interval = setInterval(() => {
        mapCognitiveResonance();
        updateCognitiveWaves();
      }, 1500);

      return () => clearInterval(interval);
    }
  }, [isRunning, state]);

  const mapCognitiveResonance = () => {
    setIsMapping(true);
    
    // Détection des champs de résonance
    const fields = detectResonanceFields();
    
    // Détection des patterns de résonance
    const patterns = detectResonancePatterns(fields);
    
    // Génération des ondes cognitives
    const waves = generateCognitiveWaves();
    
    // Calcul de la résonance globale
    const globalRes = calculateGlobalResonance(fields);
    
    // Calcul des métriques
    const metrics = calculateResonanceMetrics(fields, patterns);
    
    setResonanceFields(fields);
    setResonancePatterns(patterns);
    setCognitiveWaves(prev => [...waves, ...prev].slice(0, 50));
    setGlobalResonance(globalRes);
    setResonanceMetrics(metrics);
    
    setTimeout(() => setIsMapping(false), 800);
  };

  const detectResonanceFields = (): ResonanceField[] => {
    const fields: ResonanceField[] = [];
    
    // Champs cognitifs basés sur l'innovation
    const innovatorGroups = groupPrimatomsByBehavior('innovator');
    innovatorGroups.forEach(group => {
      if (group.length >= 3) {
        const center = calculateGroupCenter(group);
        const avgInnovation = group.reduce((sum, p) => sum + p.innovation, 0) / group.length;
        
        fields.push({
          id: `cognitive-${Date.now()}-${Math.random()}`,
          centerX: center.x,
          centerY: center.y,
          frequency: 0.8 + (avgInnovation / 100) * 0.4, // 0.8-1.2 Hz
          amplitude: avgInnovation,
          phase: Math.random() * 2 * Math.PI,
          type: 'cognitive',
          participants: group.map(p => p.id),
          stability: avgInnovation
        });
      }
    });
    
    // Champs émotionnels basés sur la confiance
    const trustGroups = groupPrimatomsByTrust();
    trustGroups.forEach(group => {
      if (group.length >= 4) {
        const center = calculateGroupCenter(group);
        const avgTrust = group.reduce((sum, p) => sum + p.trust, 0) / group.length;
        
        fields.push({
          id: `emotional-${Date.now()}-${Math.random()}`,
          centerX: center.x,
          centerY: center.y,
          frequency: 0.3 + (avgTrust / 100) * 0.5, // 0.3-0.8 Hz
          amplitude: avgTrust,
          phase: Math.random() * 2 * Math.PI,
          type: 'emotional',
          participants: group.map(p => p.id),
          stability: avgTrust
        });
      }
    });
    
    // Champs comportementaux basés sur la coopération
    const cooperationGroups = groupPrimatomsByCooperation();
    cooperationGroups.forEach(group => {
      if (group.length >= 3) {
        const center = calculateGroupCenter(group);
        const avgCooperation = group.reduce((sum, p) => sum + p.cooperation, 0) / group.length;
        
        fields.push({
          id: `behavioral-${Date.now()}-${Math.random()}`,
          centerX: center.x,
          centerY: center.y,
          frequency: 0.5 + (avgCooperation / 100) * 0.6, // 0.5-1.1 Hz
          amplitude: avgCooperation,
          phase: Math.random() * 2 * Math.PI,
          type: 'behavioral',
          participants: group.map(p => p.id),
          stability: avgCooperation
        });
      }
    });
    
    // Champs sociaux basés sur les coalitions
    state.coalitions.forEach(coalition => {
      if (coalition.members.length >= 5) {
        const members = state.primatoms.filter(p => coalition.members.includes(p.id));
        const center = calculateGroupCenter(members);
        
        fields.push({
          id: `social-${coalition.id}`,
          centerX: center.x,
          centerY: center.y,
          frequency: 0.2 + (coalition.cohesion / 100) * 0.4, // 0.2-0.6 Hz
          amplitude: coalition.cohesion,
          phase: Math.random() * 2 * Math.PI,
          type: 'social',
          participants: coalition.members,
          stability: coalition.cohesion
        });
      }
    });
    
    return fields;
  };

  const groupPrimatomsByBehavior = (behaviorType: string) => {
    const primatoms = state.primatoms.filter(p => p.behaviorType === behaviorType);
    return groupByProximity(primatoms, 150);
  };

  const groupPrimatomsByTrust = () => {
    const highTrustPrimatoms = state.primatoms.filter(p => p.trust > 70);
    return groupByProximity(highTrustPrimatoms, 120);
  };

  const groupPrimatomsByCooperation = () => {
    const cooperativePrimatoms = state.primatoms.filter(p => p.cooperation > 75);
    return groupByProximity(cooperativePrimatoms, 130);
  };

  const groupByProximity = (primatoms: any[], maxDistance: number) => {
    const groups: any[][] = [];
    const processed = new Set<string>();
    
    primatoms.forEach(primatom => {
      if (processed.has(primatom.id)) return;
      
      const group = [primatom];
      processed.add(primatom.id);
      
      const findNearby = (current: any) => {
        primatoms.forEach(other => {
          if (processed.has(other.id)) return;
          
          const distance = Math.sqrt(
            Math.pow(current.x - other.x, 2) + 
            Math.pow(current.y - other.y, 2)
          );
          
          if (distance < maxDistance) {
            group.push(other);
            processed.add(other.id);
            findNearby(other);
          }
        });
      };
      
      findNearby(primatom);
      
      if (group.length > 1) {
        groups.push(group);
      }
    });
    
    return groups;
  };

  const calculateGroupCenter = (group: any[]) => {
    const x = group.reduce((sum, p) => sum + p.x, 0) / group.length;
    const y = group.reduce((sum, p) => sum + p.y, 0) / group.length;
    return { x, y };
  };

  const detectResonancePatterns = (fields: ResonanceField[]): ResonancePattern[] => {
    const patterns: ResonancePattern[] = [];
    
    // Détection de synchronisation
    for (let i = 0; i < fields.length; i++) {
      for (let j = i + 1; j < fields.length; j++) {
        const field1 = fields[i];
        const field2 = fields[j];
        
        const frequencyDiff = Math.abs(field1.frequency - field2.frequency);
        const phaseDiff = Math.abs(field1.phase - field2.phase);
        
        // Synchronisation si fréquences et phases similaires
        if (frequencyDiff < 0.1 && phaseDiff < Math.PI / 4) {
          patterns.push({
            id: `sync-${field1.id}-${field2.id}`,
            type: 'synchronization',
            description: `Synchronisation entre champs ${field1.type} et ${field2.type}`,
            strength: 100 - (frequencyDiff * 500 + phaseDiff * 50),
            frequency: (field1.frequency + field2.frequency) / 2,
            affectedFields: [field1.id, field2.id],
            emergenceTime: Date.now()
          });
        }
        
        // Interférence si fréquences proches mais phases opposées
        if (frequencyDiff < 0.05 && phaseDiff > 3 * Math.PI / 4) {
          patterns.push({
            id: `interference-${field1.id}-${field2.id}`,
            type: 'interference',
            description: `Interférence destructive entre champs ${field1.type} et ${field2.type}`,
            strength: 80 - (frequencyDiff * 1000),
            frequency: (field1.frequency + field2.frequency) / 2,
            affectedFields: [field1.id, field2.id],
            emergenceTime: Date.now()
          });
        }
        
        // Amplification si fréquences harmoniques
        const harmonicRatio = field1.frequency / field2.frequency;
        if (Math.abs(harmonicRatio - Math.round(harmonicRatio)) < 0.1) {
          patterns.push({
            id: `amplification-${field1.id}-${field2.id}`,
            type: 'amplification',
            description: `Amplification harmonique entre champs ${field1.type} et ${field2.type}`,
            strength: (field1.amplitude + field2.amplitude) / 2,
            frequency: Math.max(field1.frequency, field2.frequency),
            affectedFields: [field1.id, field2.id],
            emergenceTime: Date.now()
          });
        }
      }
    }
    
    return patterns.slice(0, 20); // Limiter à 20 patterns
  };

  const generateCognitiveWaves = (): CognitiveWave[] => {
    const waves: CognitiveWave[] = [];
    
    // Génération d'ondes basées sur les actions des Primatoms
    state.primatoms.forEach(primatom => {
      // Onde de pensée pour les innovateurs
      if (primatom.behaviorType === 'innovator' && primatom.innovation > 80 && Math.random() < 0.3) {
        waves.push({
          id: `thought-${primatom.id}-${Date.now()}`,
          sourceId: primatom.id,
          waveType: 'thought',
          frequency: 1.0 + (primatom.innovation / 100) * 0.5,
          amplitude: primatom.innovation,
          propagationSpeed: 2.0,
          currentRadius: 0,
          maxRadius: 200,
          timestamp: Date.now()
        });
      }
      
      // Onde émotionnelle pour les médiateurs
      if (primatom.behaviorType === 'mediator' && primatom.trust > 75 && Math.random() < 0.25) {
        waves.push({
          id: `emotion-${primatom.id}-${Date.now()}`,
          sourceId: primatom.id,
          waveType: 'emotion',
          frequency: 0.6 + (primatom.trust / 100) * 0.4,
          amplitude: primatom.trust,
          propagationSpeed: 1.5,
          currentRadius: 0,
          maxRadius: 180,
          timestamp: Date.now()
        });
      }
      
      // Onde de décision pour les leaders
      if (primatom.behaviorType === 'leader' && (primatom.influence || 50) > 70 && Math.random() < 0.2) {
        waves.push({
          id: `decision-${primatom.id}-${Date.now()}`,
          sourceId: primatom.id,
          waveType: 'decision',
          frequency: 0.8 + ((primatom.influence || 50) / 100) * 0.6,
          amplitude: primatom.influence || 50,
          propagationSpeed: 2.5,
          currentRadius: 0,
          maxRadius: 250,
          timestamp: Date.now()
        });
      }
    });
    
    return waves;
  };

  const updateCognitiveWaves = () => {
    setCognitiveWaves(prev => 
      prev.map(wave => ({
        ...wave,
        currentRadius: Math.min(wave.maxRadius, wave.currentRadius + wave.propagationSpeed)
      })).filter(wave => wave.currentRadius < wave.maxRadius)
    );
  };

  const calculateGlobalResonance = (fields: ResonanceField[]): number => {
    if (fields.length === 0) return 0;
    
    const avgAmplitude = fields.reduce((sum, f) => sum + f.amplitude, 0) / fields.length;
    const avgStability = fields.reduce((sum, f) => sum + f.stability, 0) / fields.length;
    const fieldDensity = fields.length / 10; // Normalisation
    
    return Math.min(100, (avgAmplitude + avgStability) / 2 + fieldDensity * 5);
  };

  const calculateResonanceMetrics = (fields: ResonanceField[], patterns: ResonancePattern[]) => {
    const coherenceLevel = patterns.filter(p => p.type === 'synchronization').length * 10;
    
    const synchronizationIndex = patterns
      .filter(p => p.type === 'synchronization')
      .reduce((sum, p) => sum + p.strength, 0) / Math.max(1, patterns.length);
    
    const interferenceLevel = patterns.filter(p => p.type === 'interference').length * 15;
    
    const amplificationFactor = patterns
      .filter(p => p.type === 'amplification')
      .reduce((sum, p) => sum + p.strength, 0) / Math.max(1, patterns.length);
    
    // Entropie cognitive basée sur la diversité des fréquences
    const frequencies = fields.map(f => f.frequency);
    const uniqueFrequencies = new Set(frequencies.map(f => Math.round(f * 10) / 10)).size;
    const cognitiveEntropy = (uniqueFrequencies / Math.max(1, frequencies.length)) * 100;
    
    return {
      coherenceLevel: Math.min(100, coherenceLevel),
      synchronizationIndex: Math.min(100, synchronizationIndex),
      interferenceLevel: Math.min(100, interferenceLevel),
      amplificationFactor: Math.min(100, amplificationFactor),
      cognitiveEntropy
    };
  };

  const getResonanceColor = (value: number): string => {
    if (value > 80) return 'text-purple-400';
    if (value > 60) return 'text-blue-400';
    if (value > 40) return 'text-green-400';
    if (value > 20) return 'text-yellow-400';
    return 'text-red-400';
  };

  const getFieldTypeColor = (type: ResonanceField['type']): string => {
    switch (type) {
      case 'cognitive': return '#8B5CF6';
      case 'emotional': return '#EF4444';
      case 'behavioral': return '#10B981';
      case 'social': return '#06B6D4';
      default: return '#64748B';
    }
  };

  const getWaveTypeColor = (type: CognitiveWave['waveType']): string => {
    switch (type) {
      case 'thought': return '#8B5CF6';
      case 'emotion': return '#EF4444';
      case 'decision': return '#F59E0B';
      case 'memory': return '#10B981';
      case 'intention': return '#06B6D4';
      default: return '#64748B';
    }
  };

  const getPatternTypeIcon = (type: ResonancePattern['type']) => {
    switch (type) {
      case 'synchronization': return <Radio className="w-4 h-4" />;
      case 'interference': return <Zap className="w-4 h-4" />;
      case 'amplification': return <TrendingUp className="w-4 h-4" />;
      case 'dampening': return <Activity className="w-4 h-4" />;
      case 'phase_lock': return <Target className="w-4 h-4" />;
      default: return <Waves className="w-4 h-4" />;
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-slate-800/50 backdrop-blur-sm rounded-lg p-6 border border-slate-700">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-white flex items-center gap-2">
            <Waves className="w-5 h-5 text-cyan-400" />
            Cartographe de Résonance Cognitive
            {isMapping && (
              <span className="text-xs bg-cyan-500/20 text-cyan-400 px-2 py-1 rounded border border-cyan-500/30 animate-pulse">
                CARTOGRAPHIE EN COURS
              </span>
            )}
          </h3>
          <button
            onClick={mapCognitiveResonance}
            disabled={!isRunning}
            className="flex items-center gap-2 px-4 py-2 rounded-lg font-medium bg-cyan-600 hover:bg-cyan-700 disabled:bg-gray-600 disabled:cursor-not-allowed text-white transition-colors"
          >
            <Brain className="w-4 h-4" />
            Cartographier
          </button>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
          <div className="bg-slate-700/50 rounded-lg p-4 border border-slate-600">
            <div className="flex items-center gap-2 mb-2">
              <Waves className="w-4 h-4 text-cyan-400" />
              <span className="text-sm font-medium text-gray-300">Résonance</span>
            </div>
            <div className={`text-2xl font-bold ${getResonanceColor(globalResonance)}`}>
              {globalResonance.toFixed(0)}
            </div>
            <div className="text-xs text-gray-400">Niveau global</div>
          </div>

          <div className="bg-slate-700/50 rounded-lg p-4 border border-slate-600">
            <div className="flex items-center gap-2 mb-2">
              <Radio className="w-4 h-4 text-blue-400" />
              <span className="text-sm font-medium text-gray-300">Champs</span>
            </div>
            <div className="text-2xl font-bold text-blue-400">
              {resonanceFields.length}
            </div>
            <div className="text-xs text-gray-400">Zones actives</div>
          </div>

          <div className="bg-slate-700/50 rounded-lg p-4 border border-slate-600">
            <div className="flex items-center gap-2 mb-2">
              <Target className="w-4 h-4 text-green-400" />
              <span className="text-sm font-medium text-gray-300">Cohérence</span>
            </div>
            <div className="text-2xl font-bold text-green-400">
              {resonanceMetrics.coherenceLevel.toFixed(0)}%
            </div>
            <div className="text-xs text-gray-400">Synchronisation</div>
          </div>

          <div className="bg-slate-700/50 rounded-lg p-4 border border-slate-600">
            <div className="flex items-center gap-2 mb-2">
              <Activity className="w-4 h-4 text-yellow-400" />
              <span className="text-sm font-medium text-gray-300">Patterns</span>
            </div>
            <div className="text-2xl font-bold text-yellow-400">
              {resonancePatterns.length}
            </div>
            <div className="text-xs text-gray-400">Émergents</div>
          </div>

          <div className="bg-slate-700/50 rounded-lg p-4 border border-slate-600">
            <div className="flex items-center gap-2 mb-2">
              <Zap className="w-4 h-4 text-purple-400" />
              <span className="text-sm font-medium text-gray-300">Ondes</span>
            </div>
            <div className="text-2xl font-bold text-purple-400">
              {cognitiveWaves.length}
            </div>
            <div className="text-xs text-gray-400">Cognitives</div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Champs de résonance */}
        <div className="bg-slate-800/50 backdrop-blur-sm rounded-lg p-6 border border-slate-700">
          <h4 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
            <Radio className="w-5 h-5 text-blue-400" />
            Champs de Résonance ({resonanceFields.length})
          </h4>
          
          <div className="space-y-3 max-h-64 overflow-y-auto">
            {resonanceFields.map((field, index) => (
              <div key={field.id} className="bg-slate-700/50 rounded-lg p-4 border border-slate-600">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <div 
                      className="w-3 h-3 rounded-full"
                      style={{ backgroundColor: getFieldTypeColor(field.type) }}
                    />
                    <span className="font-medium text-white">
                      Champ {field.type} #{index + 1}
                    </span>
                  </div>
                  <span className="text-sm font-bold text-cyan-400">
                    {field.frequency.toFixed(2)} Hz
                  </span>
                </div>
                
                <div className="grid grid-cols-2 gap-4 text-xs text-gray-400 mb-2">
                  <div>Amplitude: {field.amplitude.toFixed(0)}</div>
                  <div>Participants: {field.participants.length}</div>
                  <div>Phase: {(field.phase * 180 / Math.PI).toFixed(0)}°</div>
                  <div>Stabilité: {field.stability.toFixed(0)}%</div>
                </div>
                
                <div className="w-full bg-slate-600 rounded-full h-2">
                  <div 
                    className="h-2 rounded-full transition-all duration-300"
                    style={{ 
                      width: `${field.amplitude}%`,
                      backgroundColor: getFieldTypeColor(field.type)
                    }}
                  />
                </div>
              </div>
            ))}
          </div>
          
          {resonanceFields.length === 0 && (
            <div className="text-center py-8 text-gray-400">
              <Radio className="w-12 h-12 mx-auto mb-3 opacity-50" />
              <p>Aucun champ de résonance détecté</p>
              <p className="text-xs">Augmentez les interactions pour créer des champs</p>
            </div>
          )}
        </div>

        {/* Patterns de résonance */}
        <div className="bg-slate-800/50 backdrop-blur-sm rounded-lg p-6 border border-slate-700">
          <h4 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
            <Activity className="w-5 h-5 text-yellow-400" />
            Patterns de Résonance ({resonancePatterns.length})
          </h4>
          
          <div className="space-y-3 max-h-64 overflow-y-auto">
            {resonancePatterns.map((pattern, index) => (
              <div key={pattern.id} className="bg-slate-700/50 rounded-lg p-4 border border-slate-600">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    {getPatternTypeIcon(pattern.type)}
                    <span className="font-medium text-white text-sm">
                      {pattern.description}
                    </span>
                  </div>
                  <span className="text-sm font-bold text-yellow-400">
                    {pattern.strength.toFixed(0)}
                  </span>
                </div>
                
                <div className="flex items-center justify-between text-xs text-gray-400 mb-2">
                  <span>Fréquence: {pattern.frequency.toFixed(2)} Hz</span>
                  <span>Champs: {pattern.affectedFields.length}</span>
                </div>
                
                <div className="w-full bg-slate-600 rounded-full h-1">
                  <div 
                    className="h-1 rounded-full bg-yellow-500 transition-all duration-300"
                    style={{ width: `${pattern.strength}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
          
          {resonancePatterns.length === 0 && (
            <div className="text-center py-8 text-gray-400">
              <Activity className="w-12 h-12 mx-auto mb-3 opacity-50" />
              <p>Aucun pattern de résonance détecté</p>
              <p className="text-xs">Les patterns émergent avec l'interaction des champs</p>
            </div>
          )}
        </div>
      </div>

      {/* Ondes cognitives */}
      <div className="bg-slate-800/50 backdrop-blur-sm rounded-lg p-6 border border-slate-700">
        <h4 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
          <Zap className="w-5 h-5 text-purple-400" />
          Ondes Cognitives Actives ({cognitiveWaves.length})
        </h4>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 max-h-48 overflow-y-auto">
          {cognitiveWaves.map((wave, index) => {
            const sourcePrimatom = state.primatoms.find(p => p.id === wave.sourceId);
            const progress = (wave.currentRadius / wave.maxRadius) * 100;
            
            return (
              <div key={wave.id} className="bg-slate-700/50 rounded-lg p-3 border border-slate-600">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <div 
                      className="w-2 h-2 rounded-full animate-pulse"
                      style={{ backgroundColor: getWaveTypeColor(wave.waveType) }}
                    />
                    <span className="text-sm font-medium text-white">
                      {wave.waveType}
                    </span>
                  </div>
                  <span className="text-xs text-gray-400">
                    {wave.frequency.toFixed(1)} Hz
                  </span>
                </div>
                
                <div className="text-xs text-gray-400 mb-2">
                  Source: {sourcePrimatom?.name}
                </div>
                
                <div className="w-full bg-slate-600 rounded-full h-1">
                  <div 
                    className="h-1 rounded-full transition-all duration-300"
                    style={{ 
                      width: `${progress}%`,
                      backgroundColor: getWaveTypeColor(wave.waveType)
                    }}
                  />
                </div>
              </div>
            );
          })}
        </div>
        
        {cognitiveWaves.length === 0 && (
          <div className="text-center py-8 text-gray-400">
            <Zap className="w-12 h-12 mx-auto mb-3 opacity-50" />
            <p>Aucune onde cognitive active</p>
            <p className="text-xs">Les ondes se propagent lors d'activités cognitives intenses</p>
          </div>
        )}
      </div>

      {/* Métriques détaillées */}
      <div className="bg-slate-800/50 backdrop-blur-sm rounded-lg p-6 border border-slate-700">
        <h4 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
          <TrendingUp className="w-5 h-5 text-green-400" />
          Métriques de Résonance Avancées
        </h4>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <div className="bg-slate-700/50 rounded-lg p-4 border border-slate-600">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium text-gray-300">Index de Synchronisation</span>
              <span className="font-bold text-blue-400">
                {resonanceMetrics.synchronizationIndex.toFixed(0)}%
              </span>
            </div>
            <div className="w-full bg-slate-600 rounded-full h-2">
              <div 
                className="h-2 rounded-full bg-blue-500 transition-all duration-300"
                style={{ width: `${resonanceMetrics.synchronizationIndex}%` }}
              />
            </div>
          </div>
          
          <div className="bg-slate-700/50 rounded-lg p-4 border border-slate-600">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium text-gray-300">Niveau d'Interférence</span>
              <span className="font-bold text-red-400">
                {resonanceMetrics.interferenceLevel.toFixed(0)}%
              </span>
            </div>
            <div className="w-full bg-slate-600 rounded-full h-2">
              <div 
                className="h-2 rounded-full bg-red-500 transition-all duration-300"
                style={{ width: `${resonanceMetrics.interferenceLevel}%` }}
              />
            </div>
          </div>
          
          <div className="bg-slate-700/50 rounded-lg p-4 border border-slate-600">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium text-gray-300">Facteur d'Amplification</span>
              <span className="font-bold text-green-400">
                {resonanceMetrics.amplificationFactor.toFixed(0)}%
              </span>
            </div>
            <div className="w-full bg-slate-600 rounded-full h-2">
              <div 
                className="h-2 rounded-full bg-green-500 transition-all duration-300"
                style={{ width: `${resonanceMetrics.amplificationFactor}%` }}
              />
            </div>
          </div>
          
          <div className="bg-slate-700/50 rounded-lg p-4 border border-slate-600">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium text-gray-300">Entropie Cognitive</span>
              <span className="font-bold text-purple-400">
                {resonanceMetrics.cognitiveEntropy.toFixed(0)}%
              </span>
            </div>
            <div className="w-full bg-slate-600 rounded-full h-2">
              <div 
                className="h-2 rounded-full bg-purple-500 transition-all duration-300"
                style={{ width: `${resonanceMetrics.cognitiveEntropy}%` }}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Fondements théoriques */}
      <div className="bg-slate-800/50 backdrop-blur-sm rounded-lg p-6 border border-slate-700">
        <h4 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
          <Brain className="w-5 h-5 text-cyan-400" />
          Fondements Théoriques de la Résonance Cognitive
        </h4>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-slate-700/50 rounded-lg p-4 border border-slate-600">
            <h5 className="font-medium text-white mb-2">Résonance Neuronale</h5>
            <p className="text-sm text-gray-300 mb-2">
              Synchronisation des oscillations neuronales permettant la coordination cognitive à grande échelle.
            </p>
            <div className="text-xs text-cyan-400">
              Basé sur les travaux de Pascal Fries (Ernst Strüngmann Institute)
            </div>
          </div>
          
          <div className="bg-slate-700/50 rounded-lg p-4 border border-slate-600">
            <h5 className="font-medium text-white mb-2">Couplage Phase-Amplitude</h5>
            <p className="text-sm text-gray-300 mb-2">
              Mécanisme de communication entre différentes fréquences d'oscillation cérébrale.
            </p>
            <div className="text-xs text-blue-400">
              Théorie de Randy Buckner (Harvard) et Adriano Tort (UFRN)
            </div>
          </div>
          
          <div className="bg-slate-700/50 rounded-lg p-4 border border-slate-600">
            <h5 className="font-medium text-white mb-2">Synchronisation Globale</h5>
            <p className="text-sm text-gray-300 mb-2">
              Émergence de patterns cohérents à travers des réseaux distribués de neurones.
            </p>
            <div className="text-xs text-green-400">
              Modèle de Giulio Tononi (University of Wisconsin-Madison)
            </div>
          </div>
          
          <div className="bg-slate-700/50 rounded-lg p-4 border border-slate-600">
            <h5 className="font-medium text-white mb-2">Ondes Cérébrales Collectives</h5>
            <p className="text-sm text-gray-300 mb-2">
              Propagation d'activité neuronale coordonnée à travers les réseaux sociaux.
            </p>
            <div className="text-xs text-purple-400">
              Recherches de Mauricio Delgado (Rutgers) sur les neurosciences sociales
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CognitiveResonanceMapper;