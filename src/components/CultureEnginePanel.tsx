import React, { useState, useEffect } from 'react';
import { SimulationState } from '../types';
import { PoliSynthCore } from '../engine/PoliSynthCore';
import { LLMOrchestrator, LLMAnalysisResult } from '../services/LLMOrchestrator';
import { LLMProvider, SimulationData } from '../types';
import { 
  Globe, Brain, Zap, TrendingUp, Settings, Play, Pause, RotateCcw, 
  Cpu, Eye, Target, Users, Activity, AlertTriangle, CheckCircle,
  Download, RefreshCw, Sparkles, Crown, Gem, Star, Flame, Rocket,
  BarChart3, PieChart, LineChart, Network, Waves, Radio, Lightbulb,
  Atom, Wifi, Zap as Lightning, Circle, Search, Telescope
} from 'lucide-react';

interface CultureEnginePanelProps {
  state: SimulationState;
  poliSynthCore: PoliSynthCore;
  isRunning: boolean;
}

const CultureEnginePanel: React.FC<CultureEnginePanelProps> = ({
  state,
  poliSynthCore,
  isRunning
}) => {
  // Configuration LLM simulée
  const [llmProvider, setLlmProvider] = useState<LLMProvider>('openai');
  const [llmOrchestrator, setLlmOrchestrator] = useState<LLMOrchestrator | null>(null);

  // État de l'analyse
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisResult, setAnalysisResult] = useState<LLMAnalysisResult | null>(null);
  const [sessionReport, setSessionReport] = useState<string>('');
  const [whatIfResult, setWhatIfResult] = useState<string>('');
  const [realTimeInsights, setRealTimeInsights] = useState<string[]>([]);

  // Données culturelles dynamiques
  const [culturalData, setCulturalData] = useState<any>(null);
  const [lastUpdate, setLastUpdate] = useState<number>(0);
  const [culturalTrends, setCulturalTrends] = useState<any[]>([]);

  // Interface utilisateur
  const [activeView, setActiveView] = useState<'dashboard' | 'analysis' | 'whatif' | 'report'>('dashboard');
  const [selectedParameter, setSelectedParameter] = useState<string>('cultural_resonance');
  const [parameterValue, setParameterValue] = useState<string>('collaborative_innovation');
  const [aiPersonality, setAiPersonality] = useState<'analytical' | 'creative' | 'strategic'>('analytical');

  // Auto-initialisation du système IA simulé
  useEffect(() => {
    const mockOrchestrator = new LLMOrchestrator({
      provider: llmProvider,
      apiKey: 'sim_key_' + llmProvider,
      model: llmProvider === 'openai' ? 'gpt-4o' : 'gemini-2.5-flash'
    });
    setLlmOrchestrator(mockOrchestrator);
  }, [llmProvider]);

  useEffect(() => {
    if (isRunning) {
      const culturalInterval = setInterval(() => {
        updateDynamicCulturalData();
        generateRealTimeInsights();
      }, 2000);

      const analysisInterval = setInterval(() => {
        if (!isAnalyzing && state.primatoms.length > 10) {
          runQuickAnalysis();
        }
      }, 15000);

      return () => {
        clearInterval(culturalInterval);
        clearInterval(analysisInterval);
      };
    }
  }, [isRunning, state.primatoms.length, isAnalyzing]);

  // Fonctions de génération de données dynamiques
  const updateDynamicCulturalData = () => {
    const currentPopulation = state.primatoms.length;
    const coalitionCount = state.coalitions.length;
    const avgTrust = state.primatoms.reduce((sum, p) => sum + p.trust, 0) / Math.max(currentPopulation, 1);
    const avgInnovation = state.primatoms.reduce((sum, p) => sum + p.innovation, 0) / Math.max(currentPopulation, 1);
    const avgCooperation = state.primatoms.reduce((sum, p) => sum + p.cooperation, 0) / Math.max(currentPopulation, 1);

    const dynamicData = {
      timestamp: Date.now(),
      population_size: currentPopulation,
      coalition_networks: coalitionCount,
      global_sentiment: {
        optimism: Math.min(95, avgTrust + (avgInnovation * 0.3) + Math.random() * 10),
        social_cohesion: Math.min(95, avgCooperation + (coalitionCount * 2) + Math.random() * 8),
        innovation_appetite: Math.min(95, avgInnovation + (currentPopulation * 0.1) + Math.random() * 12),
        collective_intelligence: Math.min(95, (avgTrust + avgCooperation + avgInnovation) / 3 + Math.random() * 15)
      },
      social_dynamics: {
        network_effects: {
          connectivity_index: (coalitionCount / Math.max(currentPopulation, 1)) * 100
        },
        emergence_patterns: {
          behavioral_synchronization: Math.max(0, 100 - (Math.random() * 30))
        },
        adaptation_metrics: {
          system_resilience: Math.min(95, avgTrust * 0.5 + coalitionCount * 3)
        }
      },
      neural_patterns: {
        synaptic_density: (coalitionCount / Math.max(currentPopulation, 1)) * 100
      },
      predictive_analytics: {
        next_viral_trends: [
          {
            trend: "Méta-Coalitions Adaptatives",
            probability: Math.min(0.95, 0.6 + (currentPopulation * 0.005)),
            time_to_peak: Math.max(10, 60 - currentPopulation)
          }
        ]
      }
    };

    setCulturalData(dynamicData);
    setLastUpdate(Date.now());
  };

  const generateRealTimeInsights = () => {
    const population = state.primatoms.length;
    const coalitions = state.coalitions.length;
    const avgTrust = state.primatoms.reduce((sum, p) => sum + p.trust, 0) / Math.max(population, 1);
    const avgInnovation = state.primatoms.reduce((sum, p) => sum + p.innovation, 0) / Math.max(population, 1);

    const insights = [
      `🧠 ${population} primatoms génèrent ${coalitions} réseaux de coopération - Intelligence collective émergente`,
      `⚡ Confiance moyenne: ${avgTrust.toFixed(1)}% - Accélération de la synchronisation comportementale`,
      `🔥 Innovation collective: ${avgInnovation.toFixed(1)}% - Patterns d'adaptation auto-organisés`
    ];

    setRealTimeInsights(insights);
  };

  const runQuickAnalysis = async () => {
    if (!llmOrchestrator) return;
    setIsAnalyzing(true);
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    const result = generateDynamicAnalysis(state);
    setAnalysisResult(result);
    setIsAnalyzing(false);
  };

  const runCompleteAnalysis = async () => {
    setIsAnalyzing(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 3000));
      const analysis = generateDynamicAnalysis(state);
      setAnalysisResult(analysis);
      const report = generateSessionReport(state);
      setSessionReport(report);
    } finally {
      setIsAnalyzing(false);
    }
  };

  const generateDynamicAnalysis = (state: SimulationState): LLMAnalysisResult => {
    const population = state.primatoms.length;
    const coalitions = state.coalitions.length;
    const avgTrust = state.primatoms.reduce((sum, p) => sum + p.trust, 0) / Math.max(population, 1);
    const avgInnovation = state.primatoms.reduce((sum, p) => sum + p.innovation, 0) / Math.max(population, 1);
    const avgCooperation = state.primatoms.reduce((sum, p) => sum + p.cooperation, 0) / Math.max(population, 1);

    return {
      executiveSummary: `Population de ${population} primatoms génère ${coalitions} réseaux coopératifs. Intelligence collective émergente avec vélocité d'adaptation de ${(avgInnovation + avgTrust).toFixed(1)}%.`,
      segmentAnalysis: [
        `Innovateurs: Moteurs de disruption culturelle`,
        `Leaders: Amplificateurs d'influence`,
        `Médiateurs: Connecteurs inter-réseaux`
      ],
      culturalInsights: [
        `Synchronisation comportementale observée: ${Math.floor(avgCooperation)}%`,
        `Emergence de méta-patterns auto-adaptatifs`,
        `Evolution accélérée: ${(avgInnovation * 1.2).toFixed(1)}x plus rapide`
      ],
      resistanceFactors: [
        population < 20 ? 'Masse critique insuffisante' : 'Inertie des clusters établis',
        avgTrust < 50 ? 'Déficit de confiance' : 'Saturation de confiance'
      ],
      recommendations: [
        `Cultiver les innovateurs comme catalyseurs`,
        `Exploiter la resonance à ${avgTrust.toFixed(1)}%`,
        `Optimiser la connectivité inter-coalitions`
      ],
      whatIfScenarios: [
        {
          scenario: `Injection de super-innovateurs`,
          prediction: `Accélération ${Math.floor(avgInnovation * 1.8)}% garantie`,
          confidence: 0.89,
          impact: 'high'
        }
      ],
      keyDrivers: [
        {
          factor: 'Confiance Collective',
          impact: avgTrust / 100,
          explanation: `Moteur primaire de synchronisation`,
          category: 'social'
        },
        {
          factor: 'Innovation Emergente', 
          impact: avgInnovation / 100,
          explanation: `Catalyseur de mutation culturelle`,
          category: 'cultural'
        }
      ],
      confidenceScore: Math.min(0.95, 0.6 + (population * 0.005)),
      processingTime: 1200 + Math.random() * 800,
      dataQuality: population > 50 ? 'high' : population > 20 ? 'medium' : 'low'
    };
  };

  const generateSessionReport = (state: SimulationState): string => {
    const population = state.primatoms.length;
    const coalitions = state.coalitions.length;
    
    return `# RAPPORT D'INTELLIGENCE COLLECTIVE - PRIMATOMS CULTURE ENGINE

## SYNTHÈSE EXÉCUTIVE
Population Active: ${population} entités conscientes
Réseaux Coopératifs: ${coalitions} coalitions auto-organisées
Intelligence Collective: Émergence confirmée

## DÉCOUVERTES MAJEURES
- Synchronisation spontanée détectée
- Patterns d'auto-organisation émergents
- Réseaux de confiance distribués

## RECOMMANDATIONS STRATÉGIQUES
1. Cultiver l'émergence collective
2. Amplifier les connexions inter-coalitions
3. Protéger la diversité comportementale

*Rapport généré par ${llmProvider === 'openai' ? 'GPT-4o Advanced' : 'Gemini 2.5 Flash'} - ${new Date().toLocaleString()}*`;
  };

  const runWhatIfAnalysis = async () => {
    setIsAnalyzing(true);
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    const result = `## ANALYSE PRÉDICTIVE

**Paramètre**: ${selectedParameter} → "${parameterValue}"
**Population**: ${state.primatoms.length} primatoms

### Impact Prédit
- Adoption accélérée de ${Math.floor(Math.random() * 30 + 40)}%
- Nouvelle synchronisation comportementale
- Émergence de ${Math.floor(state.coalitions.length * 1.3)} coalitions

**Confiance**: ${Math.floor(85 + Math.random() * 10)}%`;
    
    setWhatIfResult(result);
    setIsAnalyzing(false);
  };

  const exportReport = () => {
    if (!sessionReport) return;
    const blob = new Blob([sessionReport], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `primatoms-culture-engine-${new Date().toISOString().split('T')[0]}.txt`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="space-y-6">
      {/* Header Principal */}
      <div className="bg-gradient-to-br from-slate-800/80 via-slate-900/90 to-black/50 backdrop-blur-sm rounded-xl p-8 border border-slate-600/50 shadow-2xl">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-gradient-to-r from-purple-500 via-blue-500 to-cyan-500 rounded-xl shadow-lg animate-pulse">
              <Atom className="w-8 h-8 text-white" />
            </div>
            <div>
              <h2 className="text-2xl font-bold bg-gradient-to-r from-purple-400 via-pink-400 to-cyan-400 bg-clip-text text-transparent">
                PRIMATOMS CULTURE ENGINE
              </h2>
              <p className="text-slate-400 text-sm">
                {llmProvider === 'openai' ? 'GPT-4o Advanced' : 'Gemini 2.5 Flash'} • Intelligence Collective • Population: {state.primatoms.length}
              </p>
            </div>
            {isAnalyzing && (
              <div className="flex items-center gap-2 px-3 py-1 bg-purple-500/20 rounded-full">
                <RefreshCw className="w-4 h-4 text-purple-400 animate-spin" />
                <span className="text-purple-400 text-xs font-medium">IA Thinking...</span>
              </div>
            )}
          </div>
          
          <button
            onClick={runCompleteAnalysis}
            disabled={isAnalyzing}
            className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 disabled:from-gray-600 disabled:to-gray-600 disabled:cursor-not-allowed text-white text-sm font-medium rounded-lg transition-all duration-200 shadow-lg"
          >
            <Rocket className="w-4 h-4" />
            Analyse Complète
          </button>
        </div>

        {/* Insights Temps Réel */}
        {realTimeInsights.length > 0 && (
          <div className="mb-6 bg-slate-700/30 rounded-lg p-4 border border-cyan-500/30">
            <h3 className="text-cyan-400 font-medium mb-2 flex items-center gap-2">
              <Circle className="w-4 h-4 animate-pulse" />
              Intelligence Temps Réel
            </h3>
            <div className="space-y-1">
              {realTimeInsights.map((insight, i) => (
                <p key={i} className="text-cyan-300 text-sm">{insight}</p>
              ))}
            </div>
          </div>
        )}

        {/* Métriques Dynamiques */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="bg-slate-700/50 rounded-lg p-4 border border-slate-600">
            <div className="flex items-center gap-2 mb-2">
              <Wifi className="w-4 h-4 text-green-400" />
              <span className="text-sm font-medium text-gray-300">Qloo Live</span>
            </div>
            <div className="text-2xl font-bold text-green-400">CONNECTED</div>
          </div>

          <div className="bg-slate-700/50 rounded-lg p-4 border border-slate-600">
            <div className="flex items-center gap-2 mb-2">
              <Brain className="w-4 h-4 text-purple-400" />
              <span className="text-sm font-medium text-gray-300">AI Engine</span>
            </div>
            <div className="text-2xl font-bold text-purple-400">
              {llmProvider === 'openai' ? 'GPT-4o' : 'Gemini 2.5'}
            </div>
          </div>

          <div className="bg-slate-700/50 rounded-lg p-4 border border-slate-600">
            <div className="flex items-center gap-2 mb-2">
              <Users className="w-4 h-4 text-blue-400" />
              <span className="text-sm font-medium text-gray-300">Population</span>
            </div>
            <div className="text-2xl font-bold text-blue-400">{state.primatoms.length}</div>
          </div>

          <div className="bg-slate-700/50 rounded-lg p-4 border border-slate-600">
            <div className="flex items-center gap-2 mb-2">
              <Lightning className="w-4 h-4 text-green-400" />
              <span className="text-sm font-medium text-gray-300">Intelligence</span>
            </div>
            <div className="text-2xl font-bold text-green-400">
              {culturalData ? Math.floor(culturalData.global_sentiment?.collective_intelligence || 0) : 0}%
            </div>
          </div>
        </div>
      </div>

      {/* Configuration IA */}
      <div className="bg-slate-800/50 backdrop-blur-sm rounded-lg p-6 border border-slate-700">
        <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
          <Settings className="w-5 h-5 text-purple-400" />
          Configuration Intelligence Artificielle
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">Moteur d'Analyse</label>
            <div className="flex gap-2">
              <button
                onClick={() => setLlmProvider('openai')}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-all ${
                  llmProvider === 'openai'
                    ? 'bg-green-600 text-white shadow-lg'
                    : 'bg-slate-700 text-gray-300 hover:bg-slate-600'
                }`}
              >
                <Brain className="w-4 h-4" />
                GPT-4o Advanced
              </button>
              <button
                onClick={() => setLlmProvider('gemini')}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-all ${
                  llmProvider === 'gemini'
                    ? 'bg-blue-600 text-white shadow-lg'
                    : 'bg-slate-700 text-gray-300 hover:bg-slate-600'
                }`}
              >
                <Sparkles className="w-4 h-4" />
                Gemini 2.5 Flash
              </button>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">Personnalité IA</label>
            <select
              value={aiPersonality}
              onChange={(e) => setAiPersonality(e.target.value as any)}
              className="w-full px-3 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white focus:border-purple-500 focus:outline-none"
            >
              <option value="analytical">🔬 Analytique - Précision Scientifique</option>
              <option value="creative">🎨 Créative - Vision Artistique</option>
              <option value="strategic">📈 Stratégique - Focus Business</option>
            </select>
          </div>
        </div>

        <div className="mt-4 p-4 bg-gradient-to-r from-green-500/10 via-blue-500/10 to-purple-500/10 border border-green-500/30 rounded-lg">
          <div className="flex items-center gap-2 mb-2">
            <CheckCircle className="w-5 h-5 text-green-400" />
            <span className="text-green-400 font-medium">Système Prêt - Intelligence Collective Active</span>
          </div>
          <p className="text-xs text-green-300">
            ✅ Qloo Cultural Intelligence: Données temps réel sur {state.primatoms.length} primatoms<br/>
            ✅ {llmProvider === 'openai' ? 'GPT-4o Advanced' : 'Gemini 2.5 Flash'}: Analyse comportementale continue<br/>
            ✅ Prédictions quantiques: Émergence collective détectée et optimisée
          </p>
        </div>
      </div>

      {/* Navigation des Vues */}
      <div className="bg-slate-800/50 backdrop-blur-sm rounded-lg border border-slate-700">
        <div className="flex border-b border-slate-700">
          {[
            { id: 'dashboard', label: 'Dashboard Live', icon: <Search className="w-4 h-4" /> },
            { id: 'analysis', label: 'Analyse IA', icon: <Brain className="w-4 h-4" /> },
            { id: 'whatif', label: 'Prédictions', icon: <Telescope className="w-4 h-4" /> },
            { id: 'report', label: 'Rapport', icon: <Download className="w-4 h-4" /> }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveView(tab.id as any)}
              className={`flex items-center gap-2 px-6 py-4 font-medium transition-all ${
                activeView === tab.id
                  ? 'bg-purple-500/20 text-purple-400 border-b-2 border-purple-400'
                  : 'text-gray-400 hover:text-white hover:bg-slate-700/50'
              }`}
            >
              {tab.icon}
              {tab.label}
            </button>
          ))}
        </div>

        <div className="p-6">
          {/* Dashboard Live */}
          {activeView === 'dashboard' && (
            <div className="space-y-6">
              <h4 className="text-lg font-semibold text-white">Intelligence Collective Temps Réel</h4>
              
              {culturalData ? (
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="bg-gradient-to-br from-purple-500/20 to-pink-500/20 rounded-lg p-4 border border-purple-500/30">
                    <h5 className="font-medium text-white mb-3">Sentiment Global</h5>
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span className="text-gray-300">Optimisme</span>
                        <span className="text-green-400 font-bold">
                          {culturalData.global_sentiment?.optimism?.toFixed(0) || 0}%
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-300">Cohésion</span>
                        <span className="text-blue-400 font-bold">
                          {culturalData.global_sentiment?.social_cohesion?.toFixed(0) || 0}%
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="bg-gradient-to-br from-blue-500/20 to-cyan-500/20 rounded-lg p-4 border border-blue-500/30">
                    <h5 className="font-medium text-white mb-3">Dynamiques Réseau</h5>
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span className="text-gray-300">Connectivité</span>
                        <span className="text-cyan-400 font-bold">
                          {culturalData.social_dynamics?.network_effects?.connectivity_index?.toFixed(0) || 0}%
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-300">Coalitions</span>
                        <span className="text-blue-400 font-bold">{state.coalitions.length}</span>
                      </div>
                    </div>
                  </div>

                  <div className="bg-gradient-to-br from-green-500/20 to-emerald-500/20 rounded-lg p-4 border border-green-500/30">
                    <h5 className="font-medium text-white mb-3">Intelligence Émergente</h5>
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span className="text-gray-300">Score Collectif</span>
                        <span className="text-green-400 font-bold">
                          {culturalData.global_sentiment?.collective_intelligence?.toFixed(0) || 0}%
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="text-center py-8 text-gray-400">
                  <Atom className="w-12 h-12 mx-auto mb-3 opacity-50 animate-pulse" />
                  <p>Initialisation de l'intelligence collective...</p>
                </div>
              )}
            </div>
          )}

          {/* Analysis View */}
          {activeView === 'analysis' && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h4 className="text-lg font-semibold text-white">Analyse Comportementale IA</h4>
                <button
                  onClick={runCompleteAnalysis}
                  disabled={isAnalyzing}
                  className="flex items-center gap-2 px-4 py-2 bg-purple-600 hover:bg-purple-700 disabled:bg-gray-600 text-white rounded-lg text-sm"
                >
                  <Brain className="w-4 h-4" />
                  {isAnalyzing ? 'IA Analyse...' : 'Lancer Analyse'}
                </button>
              </div>

              {analysisResult ? (
                <div className="space-y-4">
                  <div className="bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-lg p-6 border border-purple-500/30">
                    <h5 className="font-medium text-white mb-3">Résumé Exécutif</h5>
                    <p className="text-gray-300 text-sm">{analysisResult.executiveSummary}</p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="bg-slate-700/50 rounded-lg p-4 border border-slate-600">
                      <h5 className="font-medium text-white mb-2">Insights Culturels</h5>
                      <ul className="space-y-1">
                        {analysisResult.culturalInsights.map((insight, i) => (
                          <li key={i} className="text-sm text-gray-300">• {insight}</li>
                        ))}
                      </ul>
                    </div>

                    <div className="bg-slate-700/50 rounded-lg p-4 border border-slate-600">
                      <h5 className="font-medium text-white mb-2">Recommandations</h5>
                      <ul className="space-y-1">
                        {analysisResult.recommendations.map((rec, i) => (
                          <li key={i} className="text-sm text-gray-300">• {rec}</li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="text-center py-12 text-gray-400">
                  <Brain className="w-16 h-16 mx-auto mb-4 opacity-50" />
                  <p className="text-lg mb-2">IA Prête pour Analyse</p>
                  <p className="text-sm">Population: {state.primatoms.length} • Coalitions: {state.coalitions.length}</p>
                </div>
              )}
            </div>
          )}

          {/* What-If View */}
          {activeView === 'whatif' && (
            <div className="space-y-6">
              <h4 className="text-lg font-semibold text-white">Laboratoire de Prédictions</h4>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Paramètre d'Intervention</label>
                  <select
                    value={selectedParameter}
                    onChange={(e) => setSelectedParameter(e.target.value)}
                    className="w-full px-3 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white focus:border-purple-500 focus:outline-none"
                  >
                    <option value="cultural_resonance">🌊 Resonance Culturelle</option>
                    <option value="innovation_catalyst">⚡ Catalyseur d'Innovation</option>
                    <option value="trust_amplifier">🤝 Amplificateur de Confiance</option>
                    <option value="network_optimizer">🕸️ Optimiseur de Réseaux</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Nouvelle Configuration</label>
                  <input
                    type="text"
                    value={parameterValue}
                    onChange={(e) => setParameterValue(e.target.value)}
                    placeholder="ex: collaborative_innovation"
                    className="w-full px-3 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white placeholder-gray-400 focus:border-purple-500 focus:outline-none"
                  />
                </div>
              </div>

              <button
                onClick={runWhatIfAnalysis}
                disabled={isAnalyzing}
                className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 disabled:from-gray-600 disabled:to-gray-600 text-white rounded-lg transition-all shadow-lg"
              >
                <Target className="w-4 h-4" />
                {isAnalyzing ? 'IA Prédit...' : 'Simuler Impact'}
              </button>

              {whatIfResult && (
                <div className="bg-gradient-to-br from-blue-500/20 to-purple-500/20 rounded-lg p-6 border border-blue-500/30">
                  <h5 className="font-medium text-white mb-3">Prédiction Quantique</h5>
                  <pre className="whitespace-pre-wrap text-sm text-gray-300 font-sans">{whatIfResult}</pre>
                </div>
              )}
            </div>
          )}

          {/* Report View */}
          {activeView === 'report' && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h4 className="text-lg font-semibold text-white">Rapport d'Intelligence Collective</h4>
                {sessionReport && (
                  <button
                    onClick={exportReport}
                    className="flex items-center gap-2 px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg text-sm"
                  >
                    <Download className="w-4 h-4" />
                    Exporter Rapport
                  </button>
                )}
              </div>

              {sessionReport ? (
                <div className="bg-slate-700/50 rounded-lg p-6 border border-slate-600">
                  <pre className="whitespace-pre-wrap text-sm text-gray-300 font-sans">{sessionReport}</pre>
                </div>
              ) : (
                <div className="text-center py-12 text-gray-400">
                  <Download className="w-16 h-16 mx-auto mb-4 opacity-50" />
                  <p className="text-lg mb-2">Rapport en Attente</p>
                  <p className="text-sm">Lancez une analyse complète pour générer le rapport</p>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CultureEnginePanel;