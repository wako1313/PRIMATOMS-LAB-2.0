import React, { useState, useEffect } from 'react';
import { BehaviorDistribution } from '../types';
import { 
  Users, Settings, RotateCcw, TrendingUp, Target, Brain, Zap, 
  Activity, AlertCircle, CheckCircle, BarChart3, Cpu, Network,
  Sparkles, Eye, Gauge, LineChart, ArrowUpRight, Info, Globe
} from 'lucide-react';

interface PopulationControlsProps {
  currentPopulation: number;
  currentDistribution: BehaviorDistribution;
  onPopulationChange: (size: number) => void;
  onDistributionChange: (distribution: BehaviorDistribution) => void;
  onReset: () => void;
  isRunning: boolean;
  // Nouvelles props pour l'intégration avancée
  simulationMetrics?: {
    stability: number;
    innovation: number;
    coalitionCount: number;
    avgTrust: number;
    socialComplexity: string;
  };
  onPresetAnalysis?: (presetName: string) => Promise<any>;
}

interface AdvancedPreset {
  name: string;
  distribution: BehaviorDistribution;
  description: string;
  aiInsights: {
    emergentBehaviors: string[];
    riskFactors: string[];
    expectedOutcomes: string[];
  };
  complexity: 'low' | 'medium' | 'high' | 'extreme';
  recommendedPopulation: [number, number];
}

const PopulationControls: React.FC<PopulationControlsProps> = ({
  currentPopulation,
  currentDistribution,
  onPopulationChange,
  onDistributionChange,
  onReset,
  isRunning,
  simulationMetrics,
  onPresetAnalysis
}) => {
  const [tempPopulation, setTempPopulation] = useState(currentPopulation);
  const [tempDistribution, setTempDistribution] = useState(currentDistribution);
  const [showAdvanced, setShowAdvanced] = useState(false);
  const [selectedPreset, setSelectedPreset] = useState<string | null>(null);
  const [aiPredictions, setAiPredictions] = useState<any>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [realTimeMetrics, setRealTimeMetrics] = useState<any>(null);

  // Presets avancés avec IA insights
  const advancedPresets: AdvancedPreset[] = [
    {
      name: 'Équilibrée',
      distribution: {
        leader: 0.15,
        innovator: 0.20,
        mediator: 0.15,
        explorer: 0.25,
        follower: 0.25
      },
      description: 'Société harmonieuse avec distribution naturelle des rôles',
      aiInsights: {
        emergentBehaviors: ['Consensus distribué', 'Innovation collaborative', 'Auto-régulation sociale'],
        riskFactors: ['Inertie décisionnelle', 'Manque de disruption'],
        expectedOutcomes: ['Stabilité à long terme', 'Croissance modérée', 'Cohésion sociale forte']
      },
      complexity: 'medium',
      recommendedPopulation: [150, 300]
    },
    {
      name: 'Disruptive',
      distribution: {
        leader: 0.30,
        innovator: 0.35,
        mediator: 0.05,
        explorer: 0.25,
        follower: 0.05
      },
      description: 'Société hyper-innovante focalisée sur la transformation',
      aiInsights: {
        emergentBehaviors: ['Révolutions technologiques', 'Chaos créatif', 'Émergence rapide'],
        riskFactors: ['Instabilité sociale', 'Fragmentation', 'Burn-out collectif'],
        expectedOutcomes: ['Innovation explosive', 'Volatilité élevée', 'Transformation radicale']
      },
      complexity: 'extreme',
      recommendedPopulation: [100, 200]
    },
    {
      name: 'Hyper-Collaborative',
      distribution: {
        leader: 0.05,
        innovator: 0.15,
        mediator: 0.40,
        explorer: 0.20,
        follower: 0.20
      },
      description: 'Intelligence collective maximisée par la médiation',
      aiInsights: {
        emergentBehaviors: ['Consensus universel', 'Résolution de conflits', 'Intelligence de ruche'],
        riskFactors: ['Lenteur décisionnelle', 'Évitement des risques'],
        expectedOutcomes: ['Harmonie maximale', 'Décisions consensuelles', 'Résilience collective']
      },
      complexity: 'high',
      recommendedPopulation: [200, 400]
    },
    {
      name: 'Exploration Quantique',
      distribution: {
        leader: 0.08,
        innovator: 0.25,
        mediator: 0.12,
        explorer: 0.45,
        follower: 0.10
      },
      description: 'Société nomade axée sur la découverte et l\'adaptation',
      aiInsights: {
        emergentBehaviors: ['Découvertes emergentes', 'Adaptation rapide', 'Réseaux dynamiques'],
        riskFactors: ['Manque de consolidation', 'Dispersion des efforts'],
        expectedOutcomes: ['Innovation continue', 'Flexibilité maximale', 'Évolution constante']
      },
      complexity: 'high',
      recommendedPopulation: [80, 250]
    },
    {
      name: 'Post-Singularité',
      distribution: {
        leader: 0.12,
        innovator: 0.40,
        mediator: 0.25,
        explorer: 0.20,
        follower: 0.03
      },
      description: 'Société post-humaine avec intelligence augmentée',
      aiInsights: {
        emergentBehaviors: ['Conscience collective', 'Créativité transcendante', 'Évolution dirigée'],
        riskFactors: ['Perte d\'humanité', 'Déconnexion sociale', 'Complexité ingérable'],
        expectedOutcomes: ['Intelligence supra-humaine', 'Créations impossibles', 'Nouvelle espèce sociale']
      },
      complexity: 'extreme',
      recommendedPopulation: [50, 150]
    }
  ];

  const behaviorLabels = {
    leader: 'Alpha (Leaders)',
    innovator: 'Sigma (Innovateurs)',
    mediator: 'Omega (Médiateurs)',
    explorer: 'Delta (Explorateurs)',
    follower: 'Beta (Suiveurs)'
  };

  const behaviorColors = {
    leader: '#EF4444',
    innovator: '#8B5CF6',
    mediator: '#10B981',
    explorer: '#F59E0B',
    follower: '#06B6D4'
  };

  // Calcul des métriques en temps réel
  useEffect(() => {
    if (tempPopulation && tempDistribution) {
      generateRealTimeMetrics();
    }
  }, [tempPopulation, tempDistribution]);

  const generateRealTimeMetrics = () => {
    const stability = Math.max(0, Math.min(100, 
      85 - (tempDistribution.leader * 100) + (tempDistribution.mediator * 50) + 
      (tempPopulation > 200 ? 10 : -5)
    ));
    
    const innovation = (tempDistribution.innovator + tempDistribution.explorer) * 100;
    
    const coalitionPotential = Math.ceil(tempPopulation / (25 - (tempDistribution.mediator * 10)));
    
    const socialComplexity = tempPopulation > 300 
      ? (tempDistribution.leader > 0.2 ? 'Extrême' : 'Élevée')
      : tempPopulation > 150 
        ? 'Modérée' 
        : 'Faible';

    const emergenceIndex = Math.min(100, 
      (innovation * 0.6) + 
      (tempDistribution.explorer * 100 * 0.4) + 
      (tempPopulation / 5)
    );

    const coherenceIndex = Math.max(0,
      (tempDistribution.mediator * 100 * 0.5) +
      (tempDistribution.follower * 100 * 0.3) +
      (stability * 0.2)
    );

    setRealTimeMetrics({
      stability,
      innovation,
      coalitionPotential,
      socialComplexity,
      emergenceIndex,
      coherenceIndex,
      optimalRange: getOptimalPopulationRange(),
      riskLevel: getRiskLevel(),
      predictedDuration: getPredictedSimulationDuration()
    });
  };

  const getOptimalPopulationRange = (): [number, number] => {
    const complexity = (tempDistribution.leader + tempDistribution.innovator) * 100;
    if (complexity > 60) return [80, 200];
    if (complexity > 40) return [150, 350];
    return [200, 500];
  };

  const getRiskLevel = (): 'low' | 'medium' | 'high' | 'extreme' => {
    const instability = tempDistribution.leader * 100 + (tempDistribution.innovator * 50);
    if (instability > 70) return 'extreme';
    if (instability > 50) return 'high';
    if (instability > 30) return 'medium';
    return 'low';
  };

  const getPredictedSimulationDuration = (): string => {
    const complexity = tempPopulation * ((tempDistribution.leader + tempDistribution.innovator) * 2);
    if (complexity > 200) return '45-90 min';
    if (complexity > 100) return '20-45 min';
    return '10-20 min';
  };

  const handleDistributionChange = (type: keyof BehaviorDistribution, value: number) => {
    const newDistribution = { ...tempDistribution, [type]: value / 100 };
    setTempDistribution(newDistribution);
  };

  const applyAdvancedPreset = async (preset: AdvancedPreset) => {
    setIsAnalyzing(true);
    setSelectedPreset(preset.name);
    setTempDistribution(preset.distribution);
    
    // Analyse IA du preset (si disponible)
    if (onPresetAnalysis) {
      try {
        const analysis = await onPresetAnalysis(preset.name);
        setAiPredictions(analysis);
      } catch (error) {
        console.error('Erreur analyse IA:', error);
      }
    }
    
    // Auto-ajustement de la population recommandée
    const [minPop, maxPop] = preset.recommendedPopulation;
    const recommendedPop = Math.floor((minPop + maxPop) / 2);
    setTempPopulation(recommendedPop);
    
    setIsAnalyzing(false);
  };

  const applyChanges = () => {
    if (!isRunning) {
      onPopulationChange(tempPopulation);
      onDistributionChange(tempDistribution);
      setSelectedPreset(null);
    }
  };

  const resetToDefaults = () => {
    const defaultPopulation = 200;
    const defaultDistribution = advancedPresets[0].distribution;
    
    setTempPopulation(defaultPopulation);
    setTempDistribution(defaultDistribution);
    setSelectedPreset(null);
    setAiPredictions(null);
    
    if (!isRunning) {
      onPopulationChange(defaultPopulation);
      onDistributionChange(defaultDistribution);
    }
  };

  const getTotalPercentage = () => {
    return Object.values(tempDistribution).reduce((sum, val) => sum + val, 0) * 100;
  };

  const getComplexityColor = (complexity: string) => {
    switch (complexity) {
      case 'low': return 'text-green-400';
      case 'medium': return 'text-yellow-400';
      case 'high': return 'text-orange-400';
      case 'extreme': return 'text-red-400';
      default: return 'text-gray-400';
    }
  };

  const getRiskColor = (risk: string) => {
    switch (risk) {
      case 'low': return 'bg-green-500/20 border-green-500/30 text-green-400';
      case 'medium': return 'bg-yellow-500/20 border-yellow-500/30 text-yellow-400';
      case 'high': return 'bg-orange-500/20 border-orange-500/30 text-orange-400';
      case 'extreme': return 'bg-red-500/20 border-red-500/30 text-red-400';
      default: return 'bg-gray-500/20 border-gray-500/30 text-gray-400';
    }
  };

  return (
    <div className="bg-gradient-to-br from-slate-800/80 via-slate-900/90 to-black/50 backdrop-blur-sm rounded-xl p-6 border border-slate-600/50 shadow-2xl">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-gradient-to-r from-cyan-500 to-purple-600 rounded-lg">
            <Users className="w-6 h-6 text-white" />
          </div>
          <div>
            <h3 className="text-xl font-bold bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
              Ingénierie Populationnelle IA
            </h3>
            <p className="text-slate-400 text-sm">
              Configuration avancée • {tempPopulation} Primatoms • Prédictions temps réel
            </p>
          </div>
        </div>
        <button
          onClick={() => setShowAdvanced(!showAdvanced)}
          className="flex items-center gap-2 px-3 py-2 rounded-lg bg-slate-700/50 hover:bg-slate-600/50 text-white text-sm transition-all border border-slate-600"
        >
          <Settings className="w-4 h-4" />
          {showAdvanced ? 'Vue Simple' : 'Mode Expert'}
        </button>
      </div>

      {/* Métriques temps réel */}
      {realTimeMetrics && (
        <div className="mb-6 p-4 bg-slate-700/30 rounded-xl border border-slate-600">
          <h4 className="text-sm font-bold text-white mb-3 flex items-center gap-2">
            <Activity className="w-4 h-4 text-cyan-400" />
            Métriques Prédictives Temps Réel
          </h4>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="text-center">
              <div className="text-lg font-bold text-green-400">{realTimeMetrics.stability.toFixed(0)}%</div>
              <div className="text-xs text-slate-400">Stabilité</div>
            </div>
            <div className="text-center">
              <div className="text-lg font-bold text-purple-400">{realTimeMetrics.innovation.toFixed(0)}%</div>
              <div className="text-xs text-slate-400">Innovation</div>
            </div>
            <div className="text-center">
              <div className="text-lg font-bold text-cyan-400">{realTimeMetrics.coalitionPotential}</div>
              <div className="text-xs text-slate-400">Coalitions</div>
            </div>
            <div className="text-center">
              <div className="text-lg font-bold text-yellow-400">{realTimeMetrics.emergenceIndex.toFixed(0)}%</div>
              <div className="text-xs text-slate-400">Émergence</div>
            </div>
          </div>
        </div>
      )}

      {/* Contrôle population avec zone optimale */}
      <div className="mb-6">
        <div className="flex items-center justify-between mb-2">
          <label className="text-sm font-medium text-gray-300">
            Taille de Population
          </label>
          <div className="flex items-center gap-2">
            <span className="text-sm text-cyan-400 font-medium">
              {tempPopulation} Primatoms
            </span>
            {realTimeMetrics && (
              <div className={`px-2 py-1 rounded text-xs font-medium ${
                tempPopulation >= realTimeMetrics.optimalRange[0] && 
                tempPopulation <= realTimeMetrics.optimalRange[1]
                  ? 'bg-green-500/20 text-green-400' 
                  : 'bg-orange-500/20 text-orange-400'
              }`}>
                {tempPopulation >= realTimeMetrics.optimalRange[0] && 
                 tempPopulation <= realTimeMetrics.optimalRange[1] ? 'Optimal' : 'Sous-optimal'}
              </div>
            )}
          </div>
        </div>
        <input
          type="range"
          min="50"
          max="500"
          step="10"
          value={tempPopulation}
          onChange={(e) => setTempPopulation(Number(e.target.value))}
          disabled={isRunning}
          className="w-full h-3 bg-slate-700 rounded-lg appearance-none cursor-pointer slider"
        />
        <div className="flex justify-between text-xs text-gray-500 mt-1">
          <span>50</span>
          {realTimeMetrics && (
            <>
              <span className="text-green-400">
                Zone optimale: {realTimeMetrics.optimalRange[0]}-{realTimeMetrics.optimalRange[1]}
              </span>
            </>
          )}
          <span>500</span>
        </div>
      </div>

      {/* Presets avancés */}
      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-300 mb-3">
          Architectures Sociétales IA-Optimisées
        </label>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
          {advancedPresets.map((preset) => (
            <div
              key={preset.name}
              className={`p-4 rounded-xl border transition-all cursor-pointer hover:scale-105 ${
                selectedPreset === preset.name
                  ? 'border-cyan-500 bg-cyan-500/10'
                  : 'border-slate-600 bg-slate-700/30 hover:border-slate-500'
              }`}
              onClick={() => applyAdvancedPreset(preset)}
            >
              <div className="flex items-center justify-between mb-2">
                <h5 className="font-medium text-white">{preset.name}</h5>
                <div className={`px-2 py-1 rounded text-xs font-medium ${getComplexityColor(preset.complexity)}`}>
                  {preset.complexity}
                </div>
              </div>
              <p className="text-xs text-slate-400 mb-3">{preset.description}</p>
              <div className="text-xs text-slate-500">
                Population: {preset.recommendedPopulation[0]}-{preset.recommendedPopulation[1]}
              </div>
              {isAnalyzing && selectedPreset === preset.name && (
                <div className="mt-2 flex items-center gap-2 text-xs text-cyan-400">
                  <Brain className="w-3 h-3 animate-pulse" />
                  Analyse IA en cours...
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* IA Insights pour le preset sélectionné */}
      {selectedPreset && (
        <div className="mb-6 p-4 bg-gradient-to-r from-purple-500/10 to-cyan-500/10 border border-purple-500/30 rounded-xl">
          <h4 className="text-sm font-bold text-purple-400 mb-3 flex items-center gap-2">
            <Sparkles className="w-4 h-4" />
            Insights IA - {selectedPreset}
          </h4>
          {(() => {
            const preset = advancedPresets.find(p => p.name === selectedPreset);
            if (!preset) return null;
            
            return (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
                <div>
                  <h6 className="text-green-400 font-medium mb-2">Comportements Émergents</h6>
                  <ul className="space-y-1">
                    {preset.aiInsights.emergentBehaviors.map((behavior, i) => (
                      <li key={i} className="text-slate-300 flex items-center gap-1">
                        <ArrowUpRight className="w-3 h-3 text-green-400" />
                        {behavior}
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h6 className="text-orange-400 font-medium mb-2">Facteurs de Risque</h6>
                  <ul className="space-y-1">
                    {preset.aiInsights.riskFactors.map((risk, i) => (
                      <li key={i} className="text-slate-300 flex items-center gap-1">
                        <AlertCircle className="w-3 h-3 text-orange-400" />
                        {risk}
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h6 className="text-cyan-400 font-medium mb-2">Résultats Attendus</h6>
                  <ul className="space-y-1">
                    {preset.aiInsights.expectedOutcomes.map((outcome, i) => (
                      <li key={i} className="text-slate-300 flex items-center gap-1">
                        <Target className="w-3 h-3 text-cyan-400" />
                        {outcome}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            );
          })()}
        </div>
      )}

      {/* Distribution avancée */}
      {showAdvanced && (
        <div className="mb-6">
          <div className="flex items-center justify-between mb-3">
            <label className="text-sm font-medium text-gray-300">
              Distribution Comportementale Personnalisée
            </label>
            <div className="flex items-center gap-2">
              <span className={`text-sm font-medium ${
                Math.abs(getTotalPercentage() - 100) < 1 ? 'text-green-400' : 'text-red-400'
              }`}>
                Total: {getTotalPercentage().toFixed(1)}%
              </span>
              {realTimeMetrics && (
                <div className={`px-2 py-1 rounded text-xs ${getRiskColor(realTimeMetrics.riskLevel)}`}>
                  Risque: {realTimeMetrics.riskLevel}
                </div>
              )}
            </div>
          </div>
          
          <div className="space-y-4">
            {Object.entries(tempDistribution).map(([type, value]) => (
              <div key={type}>
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <div 
                      className="w-3 h-3 rounded-full"
                      style={{ backgroundColor: behaviorColors[type as keyof typeof behaviorColors] }}
                    />
                    <span className="text-sm text-gray-300">
                      {behaviorLabels[type as keyof typeof behaviorLabels]}
                    </span>
                  </div>
                  <span className="text-sm text-white font-medium">
                    {(value * 100).toFixed(1)}%
                  </span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="50"
                  step="0.5"
                  value={value * 100}
                  onChange={(e) => handleDistributionChange(type as keyof BehaviorDistribution, Number(e.target.value))}
                  disabled={isRunning}
                  className="w-full h-2 bg-slate-700 rounded-lg appearance-none cursor-pointer slider"
                />
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Visualisation distribution */}
      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-300 mb-3">
          Aperçu de la Distribution
        </label>
        <div className="h-6 bg-slate-700 rounded-lg overflow-hidden flex shadow-inner">
          {Object.entries(tempDistribution).map(([type, value]) => (
            <div
              key={type}
              className="h-full transition-all duration-500 hover:brightness-110 relative group"
              style={{
                width: `${value * 100}%`,
                backgroundColor: behaviorColors[type as keyof typeof behaviorColors]
              }}
            >
              <div className="absolute inset-0 bg-white/20 opacity-0 group-hover:opacity-100 transition-opacity" />
              <div className="absolute top-full left-1/2 transform -translate-x-1/2 mt-2 px-2 py-1 bg-black/80 text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap z-10">
                {behaviorLabels[type as keyof typeof behaviorLabels]}: {(value * 100).toFixed(1)}%
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Prédictions avancées */}
      {realTimeMetrics && (
        <div className="mb-6 p-4 bg-slate-700/50 rounded-lg border border-slate-600">
          <h4 className="text-sm font-medium text-white mb-3 flex items-center gap-2">
            <Cpu className="w-4 h-4 text-purple-400" />
            Analyse Prédictive Avancée
          </h4>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-xs">
            <div>
              <span className="text-gray-400">Durée Estimée:</span>
              <span className="text-cyan-400 ml-2 font-medium">
                {realTimeMetrics.predictedDuration}
              </span>
            </div>
            <div>
              <span className="text-gray-400">Cohérence Index:</span>
              <span className="text-green-400 ml-2 font-medium">
                {realTimeMetrics.coherenceIndex.toFixed(0)}%
              </span>
            </div>
            <div>
              <span className="text-gray-400">Émergence Index:</span>
              <span className="text-purple-400 ml-2 font-medium">
                {realTimeMetrics.emergenceIndex.toFixed(0)}%
              </span>
            </div>
            <div>
              <span className="text-gray-400">Complexité:</span>
              <span className={`ml-2 font-medium ${getComplexityColor(realTimeMetrics.socialComplexity.toLowerCase())}`}>
                {realTimeMetrics.socialComplexity}
              </span>
            </div>
          </div>
        </div>
      )}

      {/* Actions */}
      <div className="flex gap-3">
        <button
          onClick={applyChanges}
          disabled={isRunning || Math.abs(getTotalPercentage() - 100) > 1}
          className="flex-1 flex items-center justify-center gap-2 px-4 py-3 bg-gradient-to-r from-cyan-600 to-purple-600 hover:from-cyan-700 hover:to-purple-700 disabled:from-gray-600 disabled:to-gray-700 disabled:cursor-not-allowed text-white rounded-lg font-medium transition-all shadow-lg"
        >
          <Target className="w-4 h-4" />
          Déployer Configuration
        </button>
        <button
          onClick={resetToDefaults}
          disabled={isRunning}
          className="flex items-center justify-center gap-2 px-4 py-3 bg-slate-600/50 hover:bg-slate-500/50 disabled:bg-gray-600 disabled:cursor-not-allowed text-white rounded-lg font-medium transition-colors border border-slate-600"
        >
          <RotateCcw className="w-4 h-4" />
          Reset
        </button>
      </div>

      {/* Alertes et statuts */}
      {isRunning && (
        <div className="mt-4 p-3 bg-yellow-500/10 border border-yellow-500/30 rounded-lg">
          <p className="text-xs text-yellow-400 flex items-center gap-2">
            <AlertCircle className="w-4 h-4" />
            ⚠️ Arrêtez la simulation pour modifier la configuration populationnelle
          </p>
        </div>
      )}

      {Math.abs(getTotalPercentage() - 100) > 1 && !isRunning && (
        <div className="mt-4 p-3 bg-red-500/10 border border-red-500/30 rounded-lg">
          <p className="text-xs text-red-400 flex items-center gap-2">
            <AlertCircle className="w-4 h-4" />
            Distribution invalide: le total doit être exactement 100%
          </p>
        </div>
      )}

      {realTimeMetrics && realTimeMetrics.riskLevel === 'extreme' && !isRunning && (
        <div className="mt-4 p-3 bg-red-500/10 border border-red-500/30 rounded-lg">
          <p className="text-xs text-red-400 flex items-center gap-2">
            <AlertCircle className="w-4 h-4" />
            ⚠️ Configuration à risque extrême détectée - instabilité sociale probable
          </p>
        </div>
      )}

      {realTimeMetrics && (
        tempPopulation < realTimeMetrics.optimalRange[0] || 
        tempPopulation > realTimeMetrics.optimalRange[1]
      ) && !isRunning && (
        <div className="mt-4 p-3 bg-orange-500/10 border border-orange-500/30 rounded-lg">
          <p className="text-xs text-orange-400 flex items-center gap-2">
            <Info className="w-4 h-4" />
            Population sous-optimale pour cette distribution. Zone recommandée: {realTimeMetrics.optimalRange[0]}-{realTimeMetrics.optimalRange[1]}
          </p>
        </div>
      )}

      {/* Footer informatif */}
      <div className="mt-4 p-3 bg-slate-900/50 rounded-lg border border-slate-600">
        <div className="flex items-start gap-3">
          <Globe className="w-4 h-4 text-cyan-400 mt-0.5" />
          <div>
            <h5 className="text-xs font-bold text-cyan-400 mb-1">Système d'Ingénierie Populationnelle IA</h5>
            <p className="text-xs text-slate-400 leading-relaxed">
              Configuration avancée utilisant des modèles prédictifs IA pour optimiser la dynamique sociale. 
              Les métriques sont calculées en temps réel et s'adaptent aux changements de distribution comportementale.
            </p>
            <div className="mt-2 flex items-center gap-4 text-xs">
              <span className="text-cyan-400">
                🧠 {advancedPresets.length} architectures sociétales
              </span>
              <span className="text-purple-400">
                ⚡ Prédictions temps réel
              </span>
              <span className="text-green-400">
                🎯 Optimisation automatique
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PopulationControls;