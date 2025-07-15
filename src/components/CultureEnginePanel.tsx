import React, { useState, useEffect } from 'react';
import { SimulationState } from '../types';
import { PoliSynthCore } from '../engine/PoliSynthCore';
import { qlooService } from '../services/QlooAPIService';
import { LLMOrchestrator, LLMProvider, SimulationData, LLMAnalysisResult } from '../services/LLMOrchestrator';
import { 
  Globe, Brain, Zap, TrendingUp, Settings, Play, Pause, RotateCcw, 
  Cpu, Eye, Target, Users, Activity, AlertTriangle, CheckCircle,
  Download, RefreshCw, Sparkles, Crown, Gem, Star, Flame, Rocket,
  BarChart3, PieChart, LineChart, Network, Waves, Radio
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
  // Configuration LLM
  const [llmProvider, setLlmProvider] = useState<LLMProvider>('openai');
  const [openaiKey, setOpenaiKey] = useState('');
  const [geminiKey, setGeminiKey] = useState('');
  const [llmOrchestrator, setLlmOrchestrator] = useState<LLMOrchestrator | null>(null);

  // État de l'analyse
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisResult, setAnalysisResult] = useState<LLMAnalysisResult | null>(null);
  const [sessionReport, setSessionReport] = useState<string>('');
  const [whatIfResult, setWhatIfResult] = useState<string>('');

  // Données culturelles Qloo
  const [qlooConnected, setQlooConnected] = useState(false);
  const [culturalData, setCulturalData] = useState<any>(null);
  const [lastUpdate, setLastUpdate] = useState<number>(0);

  // Interface utilisateur
  const [activeView, setActiveView] = useState<'dashboard' | 'analysis' | 'whatif' | 'report'>('dashboard');
  const [selectedParameter, setSelectedParameter] = useState<string>('musical_affinity');
  const [parameterValue, setParameterValue] = useState<string>('alternative_rock');

  useEffect(() => {
    checkQlooConnection();
    if (isRunning) {
      const interval = setInterval(() => {
        updateCulturalData();
      }, 30000);
      return () => clearInterval(interval);
    }
  }, [isRunning]);

  useEffect(() => {
    if (llmProvider && (openaiKey || geminiKey)) {
      const apiKey = llmProvider === 'openai' ? openaiKey : geminiKey;
      if (apiKey) {
        const orchestrator = new LLMOrchestrator({
          provider: llmProvider,
          apiKey,
          model: llmProvider === 'openai' ? 'gpt-4o' : 'gemini-pro'
        });
        setLlmOrchestrator(orchestrator);
      }
    }
  }, [llmProvider, openaiKey, geminiKey]);

  const checkQlooConnection = async () => {
    try {
      const connected = await qlooService.testConnection();
      setQlooConnected(connected);
    } catch (error) {
      setQlooConnected(false);
    }
  };

  const updateCulturalData = async () => {
    if (!qlooConnected) return;
    
    try {
      const trends = await qlooService.getGlobalTrends();
      const profiles = new Map();
      
      // Générer des profils pour un échantillon de Primatoms
      const samplePrimatoms = state.primatoms.slice(0, 10);
      for (const primatom of samplePrimatoms) {
        const profile = await qlooService.generateCulturalProfile(primatom);
        profiles.set(primatom.id, profile);
      }
      
      setCulturalData({ trends, profiles });
      setLastUpdate(Date.now());
    } catch (error) {
      console.error('Failed to update cultural data:', error);
    }
  };

  const runCompleteAnalysis = async () => {
    if (!llmOrchestrator) {
      alert('Veuillez configurer un LLM (OpenAI ou Gemini) avant l\'analyse');
      return;
    }

    setIsAnalyzing(true);
    
    try {
      // Préparer les données de simulation
      const simulationData: SimulationData = {
        personas: state.primatoms.map(p => ({
          id: p.id,
          name: p.name,
          behaviorType: p.behaviorType,
          culturalProfile: culturalData?.profiles.get(p.id),
          metrics: {
            trust: p.trust,
            cooperation: p.cooperation,
            innovation: p.innovation,
            energy: p.energy,
            stress: p.stressLevel || 0
          }
        })),
        culturalAffinities: culturalData?.trends?.trending_entities || [],
        adoptionRates: calculateAdoptionRates(),
        frictionZones: identifyFrictionZones(),
        propagationPath: analyzePropagationPath(),
        timelineEvents: state.metrics.slice(-20),
        culturalDrivers: calculateCulturalDrivers()
      };

      // Lancer l'analyse LLM
      const result = await llmOrchestrator.analyzeSimulation(simulationData);
      setAnalysisResult(result);
      
      // Générer le rapport de session
      const report = await llmOrchestrator.generateSessionReport(simulationData, {
        duration: Date.now() - (state.metrics[0]?.timestamp || Date.now()),
        totalEvents: state.metrics.length,
        coalitions: state.coalitions.length,
        stability: state.systemStability
      });
      setSessionReport(report);
      
    } catch (error) {
      console.error('Analysis failed:', error);
      alert('Erreur lors de l\'analyse. Vérifiez votre configuration LLM.');
    } finally {
      setIsAnalyzing(false);
    }
  };

  const runWhatIfAnalysis = async () => {
    if (!llmOrchestrator || !analysisResult) return;

    setIsAnalyzing(true);
    
    try {
      const simulationData: SimulationData = {
        personas: state.primatoms.slice(0, 5).map(p => ({ id: p.id, name: p.name })),
        culturalAffinities: culturalData?.trends?.trending_entities || [],
        adoptionRates: calculateAdoptionRates(),
        frictionZones: identifyFrictionZones(),
        propagationPath: [],
        timelineEvents: [],
        culturalDrivers: calculateCulturalDrivers()
      };

      const result = await llmOrchestrator.generateWhatIfScenario(
        simulationData,
        selectedParameter,
        parameterValue
      );
      setWhatIfResult(result);
    } catch (error) {
      console.error('What-if analysis failed:', error);
    } finally {
      setIsAnalyzing(false);
    }
  };

  const calculateAdoptionRates = (): Record<string, number> => {
    const behaviorTypes = ['leader', 'innovator', 'mediator', 'explorer', 'follower'];
    const rates: Record<string, number> = {};
    
    behaviorTypes.forEach(type => {
      const primatoms = state.primatoms.filter(p => p.behaviorType === type);
      const avgInnovation = primatoms.reduce((sum, p) => sum + p.innovation, 0) / Math.max(primatoms.length, 1);
      rates[type] = Math.min(95, avgInnovation + Math.random() * 20);
    });
    
    return rates;
  };

  const identifyFrictionZones = (): string[] => {
    const zones: string[] = [];
    
    if (state.systemStability && state.systemStability < 60) {
      zones.push('Instabilité systémique globale');
    }
    
    const stressedPrimatoms = state.primatoms.filter(p => (p.stressLevel || 0) > 60);
    if (stressedPrimatoms.length > state.primatoms.length * 0.3) {
      zones.push('Stress collectif élevé');
    }
    
    const weakCoalitions = state.coalitions.filter(c => c.cohesion < 50);
    if (weakCoalitions.length > 2) {
      zones.push('Fragmentation des coalitions');
    }
    
    return zones;
  };

  const analyzePropagationPath = (): any[] => {
    return state.coalitions.map(c => ({
      coalitionId: c.id,
      name: c.name,
      memberCount: c.members.length,
      cohesion: c.cohesion,
      influence: c.members.reduce((sum, id) => {
        const member = state.primatoms.find(p => p.id === id);
        return sum + (member?.influence || 50);
      }, 0) / c.members.length
    }));
  };

  const calculateCulturalDrivers = (): Record<string, number> => {
    return {
      musical_affinity: 0.85,
      food_preferences: 0.72,
      entertainment_habits: 0.68,
      fashion_trends: 0.61,
      travel_behavior: 0.55,
      social_media_usage: 0.78,
      lifestyle_choices: 0.64
    };
  };

  const exportReport = () => {
    if (!sessionReport) return;
    
    const blob = new Blob([sessionReport], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `primatoms-culture-report-${new Date().toISOString().split('T')[0]}.txt`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const getProviderIcon = (provider: LLMProvider) => {
    return provider === 'openai' ? <Brain className="w-4 h-4" /> : <Sparkles className="w-4 h-4" />;
  };

  const getConnectionStatus = () => {
    const llmConfigured = llmOrchestrator !== null;
    const qlooStatus = qlooConnected;
    
    if (llmConfigured && qlooStatus) return { status: 'optimal', text: 'Système Optimal', color: 'text-green-400' };
    if (llmConfigured || qlooStatus) return { status: 'partial', text: 'Configuration Partielle', color: 'text-yellow-400' };
    return { status: 'offline', text: 'Configuration Requise', color: 'text-red-400' };
  };

  const connectionStatus = getConnectionStatus();

  return (
    <div className="space-y-6">
      {/* Header Principal */}
      <div className="bg-gradient-to-br from-slate-800/80 via-slate-900/90 to-black/50 backdrop-blur-sm rounded-xl p-8 border border-slate-600/50 shadow-2xl">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-gradient-to-r from-purple-500 to-pink-600 rounded-xl shadow-lg">
              <Globe className="w-8 h-8 text-white" />
            </div>
            <div>
              <h2 className="text-2xl font-bold bg-gradient-to-r from-purple-400 via-pink-400 to-cyan-400 bg-clip-text text-transparent">
                PRIMATOMS CULTURE ENGINE
              </h2>
              <p className="text-slate-400 text-sm">Qloo API + LLM • Prédiction Culturelle • Intelligence Collective</p>
            </div>
            {isAnalyzing && (
              <div className="flex items-center gap-2 px-3 py-1 bg-purple-500/20 rounded-full">
                <RefreshCw className="w-4 h-4 text-purple-400 animate-spin" />
                <span className="text-purple-400 text-xs font-medium">Analyse IA en cours...</span>
              </div>
            )}
          </div>
          
          <div className="flex items-center gap-4">
            <div className={`flex items-center gap-2 px-4 py-2 bg-slate-700/50 rounded-lg border border-slate-600 ${connectionStatus.color}`}>
              <div className={`w-2 h-2 rounded-full ${connectionStatus.status === 'optimal' ? 'bg-green-400 animate-pulse' : connectionStatus.status === 'partial' ? 'bg-yellow-400' : 'bg-red-400'}`}></div>
              <span className="text-sm font-medium">{connectionStatus.text}</span>
            </div>
            
            <button
              onClick={runCompleteAnalysis}
              disabled={!llmOrchestrator || isAnalyzing}
              className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 disabled:from-gray-600 disabled:to-gray-600 disabled:cursor-not-allowed text-white text-sm font-medium rounded-lg transition-all duration-200 shadow-lg"
            >
              <Rocket className="w-4 h-4" />
              Analyse Complète
            </button>
          </div>
        </div>

        {/* Métriques de statut */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="bg-slate-700/50 rounded-lg p-4 border border-slate-600">
            <div className="flex items-center gap-2 mb-2">
              <Globe className="w-4 h-4 text-cyan-400" />
              <span className="text-sm font-medium text-gray-300">Qloo API</span>
            </div>
            <div className={`text-2xl font-bold ${qlooConnected ? 'text-green-400' : 'text-red-400'}`}>
              {qlooConnected ? 'LIVE' : 'OFF'}
            </div>
            <div className="text-xs text-gray-400">
              {qlooConnected ? 'Données temps réel' : 'Configuration requise'}
            </div>
          </div>

          <div className="bg-slate-700/50 rounded-lg p-4 border border-slate-600">
            <div className="flex items-center gap-2 mb-2">
              {getProviderIcon(llmProvider)}
              <span className="text-sm font-medium text-gray-300">LLM Engine</span>
            </div>
            <div className={`text-2xl font-bold ${llmOrchestrator ? 'text-purple-400' : 'text-gray-400'}`}>
              {llmProvider.toUpperCase()}
            </div>
            <div className="text-xs text-gray-400">
              {llmOrchestrator ? 'Configuré' : 'Clé API requise'}
            </div>
          </div>

          <div className="bg-slate-700/50 rounded-lg p-4 border border-slate-600">
            <div className="flex items-center gap-2 mb-2">
              <Users className="w-4 h-4 text-blue-400" />
              <span className="text-sm font-medium text-gray-300">Personas</span>
            </div>
            <div className="text-2xl font-bold text-blue-400">
              {state.primatoms.length}
            </div>
            <div className="text-xs text-gray-400">Profils culturels</div>
          </div>

          <div className="bg-slate-700/50 rounded-lg p-4 border border-slate-600">
            <div className="flex items-center gap-2 mb-2">
              <Activity className="w-4 h-4 text-green-400" />
              <span className="text-sm font-medium text-gray-300">Analyses</span>
            </div>
            <div className="text-2xl font-bold text-green-400">
              {analysisResult ? '1' : '0'}
            </div>
            <div className="text-xs text-gray-400">Rapports générés</div>
          </div>
        </div>
      </div>

      {/* Configuration LLM */}
      <div className="bg-slate-800/50 backdrop-blur-sm rounded-lg p-6 border border-slate-700">
        <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
          <Settings className="w-5 h-5 text-purple-400" />
          Configuration Intelligence Artificielle
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Fournisseur LLM
            </label>
            <div className="flex gap-2">
              <button
                onClick={() => setLlmProvider('openai')}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-colors ${
                  llmProvider === 'openai'
                    ? 'bg-green-600 text-white'
                    : 'bg-slate-700 text-gray-300 hover:bg-slate-600'
                }`}
              >
                <Brain className="w-4 h-4" />
                OpenAI GPT-4o
              </button>
              <button
                onClick={() => setLlmProvider('gemini')}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-colors ${
                  llmProvider === 'gemini'
                    ? 'bg-blue-600 text-white'
                    : 'bg-slate-700 text-gray-300 hover:bg-slate-600'
                }`}
              >
                <Sparkles className="w-4 h-4" />
                Google Gemini
              </button>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Clé API {llmProvider === 'openai' ? 'OpenAI' : 'Gemini'}
            </label>
            <input
              type="password"
              value={llmProvider === 'openai' ? openaiKey : geminiKey}
              onChange={(e) => llmProvider === 'openai' ? setOpenaiKey(e.target.value) : setGeminiKey(e.target.value)}
              placeholder={`Entrez votre clé API ${llmProvider === 'openai' ? 'OpenAI' : 'Gemini'}`}
              className="w-full px-3 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white placeholder-gray-400 focus:border-purple-500 focus:outline-none"
            />
          </div>
        </div>

        {!llmOrchestrator && (
          <div className="mt-4 p-3 bg-yellow-500/10 border border-yellow-500/30 rounded-lg">
            <p className="text-xs text-yellow-400">
              ⚠️ Configuration LLM requise pour l'analyse culturelle avancée
            </p>
          </div>
        )}
      </div>

      {/* Navigation des vues */}
      <div className="bg-slate-800/50 backdrop-blur-sm rounded-lg border border-slate-700">
        <div className="flex border-b border-slate-700">
          {[
            { id: 'dashboard', label: 'Dashboard', icon: <BarChart3 className="w-4 h-4" /> },
            { id: 'analysis', label: 'Analyse IA', icon: <Brain className="w-4 h-4" /> },
            { id: 'whatif', label: 'What-If', icon: <Target className="w-4 h-4" /> },
            { id: 'report', label: 'Rapport', icon: <Download className="w-4 h-4" /> }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveView(tab.id as any)}
              className={`flex items-center gap-2 px-6 py-4 font-medium transition-colors ${
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
          {/* Dashboard View */}
          {activeView === 'dashboard' && (
            <div className="space-y-6">
              <h4 className="text-lg font-semibold text-white">Tableau de Bord Culturel</h4>
              
              {culturalData ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="bg-slate-700/50 rounded-lg p-4 border border-slate-600">
                    <h5 className="font-medium text-white mb-3">Tendances Qloo Globales</h5>
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span className="text-gray-300">Optimisme Global</span>
                        <span className="text-green-400 font-bold">
                          {culturalData.trends?.global_sentiment?.optimism?.toFixed(0) || 'N/A'}%
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-300">Cohésion Sociale</span>
                        <span className="text-blue-400 font-bold">
                          {culturalData.trends?.global_sentiment?.social_cohesion?.toFixed(0) || 'N/A'}%
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-300">Appétit Innovation</span>
                        <span className="text-purple-400 font-bold">
                          {culturalData.trends?.global_sentiment?.innovation_appetite?.toFixed(0) || 'N/A'}%
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="bg-slate-700/50 rounded-lg p-4 border border-slate-600">
                    <h5 className="font-medium text-white mb-3">Profils Culturels Générés</h5>
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span className="text-gray-300">Profils Actifs</span>
                        <span className="text-cyan-400 font-bold">{culturalData.profiles?.size || 0}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-300">Dernière MAJ</span>
                        <span className="text-gray-400 text-sm">
                          {lastUpdate ? new Date(lastUpdate).toLocaleTimeString() : 'Jamais'}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="text-center py-8 text-gray-400">
                  <Globe className="w-12 h-12 mx-auto mb-3 opacity-50" />
                  <p>Données culturelles Qloo en cours de chargement...</p>
                  <button
                    onClick={updateCulturalData}
                    className="mt-3 px-4 py-2 bg-cyan-600 hover:bg-cyan-700 text-white rounded-lg text-sm transition-colors"
                  >
                    Actualiser
                  </button>
                </div>
              )}
            </div>
          )}

          {/* Analysis View */}
          {activeView === 'analysis' && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h4 className="text-lg font-semibold text-white">Analyse Culturelle IA</h4>
                <button
                  onClick={runCompleteAnalysis}
                  disabled={!llmOrchestrator || isAnalyzing}
                  className="flex items-center gap-2 px-4 py-2 bg-purple-600 hover:bg-purple-700 disabled:bg-gray-600 disabled:cursor-not-allowed text-white rounded-lg text-sm transition-colors"
                >
                  <Brain className="w-4 h-4" />
                  {isAnalyzing ? 'Analyse...' : 'Analyser'}
                </button>
              </div>

              {analysisResult ? (
                <div className="space-y-4">
                  <div className="bg-slate-700/50 rounded-lg p-4 border border-slate-600">
                    <h5 className="font-medium text-white mb-2">Résumé Exécutif</h5>
                    <p className="text-gray-300 text-sm">{analysisResult.executiveSummary}</p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="bg-slate-700/50 rounded-lg p-4 border border-slate-600">
                      <h5 className="font-medium text-white mb-2">Insights Culturels</h5>
                      <ul className="space-y-1">
                        {analysisResult.culturalInsights.map((insight, i) => (
                          <li key={i} className="text-sm text-gray-300 flex items-start gap-2">
                            <span className="text-cyan-400">•</span>
                            {insight}
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="bg-slate-700/50 rounded-lg p-4 border border-slate-600">
                      <h5 className="font-medium text-white mb-2">Recommandations</h5>
                      <ul className="space-y-1">
                        {analysisResult.recommendations.map((rec, i) => (
                          <li key={i} className="text-sm text-gray-300 flex items-start gap-2">
                            <span className="text-green-400">•</span>
                            {rec}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  <div className="bg-slate-700/50 rounded-lg p-4 border border-slate-600">
                    <h5 className="font-medium text-white mb-2">Drivers Culturels Clés</h5>
                    <div className="space-y-2">
                      {analysisResult.keyDrivers.map((driver, i) => (
                        <div key={i} className="flex items-center justify-between">
                          <span className="text-gray-300 text-sm">{driver.factor}</span>
                          <div className="flex items-center gap-2">
                            <div className="w-20 bg-slate-600 rounded-full h-2">
                              <div 
                                className="bg-purple-500 h-2 rounded-full"
                                style={{ width: `${driver.impact}%` }}
                              />
                            </div>
                            <span className="text-purple-400 text-sm font-bold">
                              {driver.impact.toFixed(0)}%
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              ) : (
                <div className="text-center py-12 text-gray-400">
                  <Brain className="w-16 h-16 mx-auto mb-4 opacity-50" />
                  <p className="text-lg mb-2">Analyse IA Prête</p>
                  <p className="text-sm">Cliquez sur "Analyser" pour générer l'analyse culturelle complète</p>
                </div>
              )}
            </div>
          )}

          {/* What-If View */}
          {activeView === 'whatif' && (
            <div className="space-y-6">
              <h4 className="text-lg font-semibold text-white">Analyse What-If</h4>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Paramètre à Modifier
                  </label>
                  <select
                    value={selectedParameter}
                    onChange={(e) => setSelectedParameter(e.target.value)}
                    className="w-full px-3 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white focus:border-purple-500 focus:outline-none"
                  >
                    <option value="musical_affinity">Affinités Musicales</option>
                    <option value="food_preferences">Préférences Alimentaires</option>
                    <option value="entertainment_habits">Habitudes de Divertissement</option>
                    <option value="fashion_trends">Tendances Mode</option>
                    <option value="social_media_usage">Usage Réseaux Sociaux</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Nouvelle Valeur
                  </label>
                  <input
                    type="text"
                    value={parameterValue}
                    onChange={(e) => setParameterValue(e.target.value)}
                    placeholder="ex: jazz, cuisine_asiatique, streaming_video"
                    className="w-full px-3 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white placeholder-gray-400 focus:border-purple-500 focus:outline-none"
                  />
                </div>
              </div>

              <button
                onClick={runWhatIfAnalysis}
                disabled={!llmOrchestrator || isAnalyzing}
                className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-600 disabled:cursor-not-allowed text-white rounded-lg transition-colors"
              >
                <Target className="w-4 h-4" />
                {isAnalyzing ? 'Analyse...' : 'Simuler Scénario'}
              </button>

              {whatIfResult && (
                <div className="bg-slate-700/50 rounded-lg p-4 border border-slate-600">
                  <h5 className="font-medium text-white mb-2">Prédiction Scénario</h5>
                  <p className="text-gray-300 text-sm whitespace-pre-wrap">{whatIfResult}</p>
                </div>
              )}
            </div>
          )}

          {/* Report View */}
          {activeView === 'report' && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h4 className="text-lg font-semibold text-white">Rapport de Session</h4>
                {sessionReport && (
                  <button
                    onClick={exportReport}
                    className="flex items-center gap-2 px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg text-sm transition-colors"
                  >
                    <Download className="w-4 h-4" />
                    Exporter
                  </button>
                )}
              </div>

              {sessionReport ? (
                <div className="bg-slate-700/50 rounded-lg p-6 border border-slate-600">
                  <div className="prose prose-invert max-w-none">
                    <pre className="whitespace-pre-wrap text-sm text-gray-300 font-sans">
                      {sessionReport}
                    </pre>
                  </div>
                </div>
              ) : (
                <div className="text-center py-12 text-gray-400">
                  <Download className="w-16 h-16 mx-auto mb-4 opacity-50" />
                  <p className="text-lg mb-2">Rapport Non Généré</p>
                  <p className="text-sm">Lancez une analyse complète pour générer le rapport de session</p>
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