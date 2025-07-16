// App.tsx
import React, { useState, useEffect } from 'react';
import { SocialDynamicsEngine } from './engine/SocialDynamicsEngine';
import { PoliSynthCore } from './engine/PoliSynthCore';
import { Primatom, Scenario, SimulationState, DisruptiveEvent, BehaviorDistribution } from './types';
import SimulationCanvas from './components/SimulationCanvas';
import MetricsDashboard from './components/MetricsDashboard';
import PrimatomDetails from './components/PrimatomDetails';
import ScenarioPanel from './components/ScenarioPanel';
import DisruptionPanel from './components/DisruptionPanel';
import PopulationControls from './components/PopulationControls';
import IntelligentZoom from './components/IntelligentZoom';
import ProAnalyticsPanel from './components/ProAnalyticsPanel';
import IntelligentDisruptionManager from './components/IntelligentDisruptionManager';
import QuantumSocialAnalyzer from './components/QuantumSocialAnalyzer';
import EmergentIntelligenceTracker from './components/EmergentIntelligenceTracker';
import CognitiveResonanceMapper from './components/CognitiveResonanceMapper';
import CulturalInsightsPanel from './components/CulturalInsightsPanel';
import CultureEnginePanel from './components/CultureEnginePanel';
import QlooConnectionTester from './components/QlooConnectionTester';
import { Activity, BarChart3, User, Target, Brain, Zap, AlertTriangle, Users, Settings, Play, Pause, RotateCcw, Search, FileText, Cpu, Atom, Network, Waves, Globe, Wifi } from 'lucide-react';

function App() {
  const [engine] = useState(() => new SocialDynamicsEngine());
  const [poliSynthCore] = useState(() => new PoliSynthCore());
  const [state, setState] = useState<SimulationState>(engine.getState());
  const [selectedPrimatom, setSelectedPrimatom] = useState<Primatom | null>(null);
  const [activeTab, setActiveTab] = useState<'simulation' | 'metrics' | 'details' | 'scenarios' | 'disruption' | 'population' | 'analytics' | 'ai-disruption' | 'quantum' | 'emergence' | 'resonance' | 'cultural' | 'culture-engine' | 'qloo-test'>('simulation');
  const [isIntelligentZoom, setIsIntelligentZoom] = useState(false);

  // Mise à jour de l'état de la simulation toutes les 100ms
  useEffect(() => {
    const interval = setInterval(() => {
      setState(engine.getState());
    }, 100);

    return () => clearInterval(interval);
  }, [engine]);

  // Gestion des actions principales
  const handleStart = () => engine.start();
  const handleStop = () => engine.stop();
  const handleReset = () => {
    engine.resetSimulation();
    poliSynthCore.resetSession();
    setState(engine.getState());
    setSelectedPrimatom(null);
    setIsIntelligentZoom(false);
  };

  const handleSelectScenario = (scenario: Scenario) => {
    console.log('Scénario sélectionné :', scenario);
  };

  const handleInjectDisruption = (eventConfig: Partial<DisruptiveEvent>) => {
    engine.injectDisruptiveEvent(eventConfig);
  };

  const handlePredictImpact = (eventConfig: Partial<DisruptiveEvent>) => {
    return engine.predictDisruptionImpact(eventConfig);
  };

  const handlePopulationChange = (size: number) => {
    engine.setPopulationSize(size);
    setState(engine.getState());
    setSelectedPrimatom(null);
  };

  const handleDistributionChange = (distribution: BehaviorDistribution) => {
    engine.setBehaviorDistribution(distribution);
    setState(engine.getState());
    setSelectedPrimatom(null);
  };

  const handleSelectPrimatom = (primatom: Primatom) => {
    setSelectedPrimatom(primatom);
    if (!isIntelligentZoom) {
      setIsIntelligentZoom(true);
      setActiveTab('details');
    }
  };

  const handleZoomOut = () => {
    setIsIntelligentZoom(false);
    setSelectedPrimatom(null);
    setActiveTab('simulation');
  };

  // Configuration des onglets
  const tabs = [
    { id: 'simulation', label: 'Écosystème', icon: <Activity className="w-4 h-4" /> },
    { id: 'population', label: 'Population', icon: <Users className="w-4 h-4" /> },
    { id: 'metrics', label: 'Métriques', icon: <BarChart3 className="w-4 h-4" /> },
    { id: 'disruption', label: 'Disruption', icon: <AlertTriangle className="w-4 h-4" /> },
    { id: 'ai-disruption', label: 'IA Disruption', icon: <Cpu className="w-4 h-4" /> },
    { id: 'quantum', label: 'Analyse Quantique', icon: <Atom className="w-4 h-4" /> },
    { id: 'emergence', label: 'Intelligence Émergente', icon: <Network className="w-4 h-4" /> },
    { id: 'resonance', label: 'Résonance Cognitive', icon: <Waves className="w-4 h-4" /> },
    { id: 'cultural', label: 'Insights Culturels', icon: <Globe className="w-4 h-4" /> },
    { id: 'culture-engine', label: 'Culture Engine', icon: <Brain className="w-4 h-4" /> },
    { id: 'qloo-test', label: 'Qloo API Test', icon: <Wifi className="w-4 h-4" /> },
    { id: 'details', label: 'Zoom Intelligent', icon: <Search className="w-4 h-4" /> },
    { id: 'analytics', label: 'Analytics Pro', icon: <FileText className="w-4 h-4" /> },
    { id: 'scenarios', label: 'Scénarios', icon: <Target className="w-4 h-4" /> },
  ];

  // Calcul des couleurs et textes de statut
  const getSystemStatusColor = () => {
    const stability = state.systemStability || 75;
    return stability > 70 ? 'text-green-400' : stability > 40 ? 'text-yellow-400' : 'text-red-400';
  };

  const getSystemStatusText = () => {
    const stability = state.systemStability || 75;
    return stability > 70 ? 'Stable' : stability > 40 ? 'Instable' : 'Critique';
  };

  const getPopulationComplexity = () => {
    const size = state.primatoms.length;
    return size > 300 ? { text: 'Société Complexe', color: 'text-purple-400' }
      : size > 150 ? { text: 'Communauté Étendue', color: 'text-blue-400' }
      : { text: 'Groupe Social', color: 'text-green-400' };
  };

  const complexity = getPopulationComplexity();

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-800">
      {/* En-tête avec informations système */}
      <header className="bg-slate-900/50 backdrop-blur-sm border-b border-slate-700">
        <div className="w-full px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <Brain className="w-8 h-8 text-cyan-400" />
                <div>
                  <h1 className="text-2xl font-bold text-white">PRIMATOMS SOCIETY</h1>
                  <p className="text-sm text-gray-400">Laboratoire de Disruption Cognitive - Hackathon Qloo 2025</p>
                </div>
              </div>
            </div>
            
            <div className="flex items-center gap-6">
              {/* Contrôles principaux */}
              <div className="flex items-center gap-2 bg-slate-800/50 rounded-lg p-2">
                <button
                  onClick={state.isRunning ? handleStop : handleStart}
                  className={`flex items-center gap-2 px-3 py-1 rounded-md font-medium transition-colors ${
                    state.isRunning ? 'bg-red-500 hover:bg-red-600 text-white' : 'bg-green-500 hover:bg-green-600 text-white'
                  }`}
                >
                  {state.isRunning ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                  {state.isRunning ? 'Arrêter' : 'Démarrer'}
                </button>
                <button
                  onClick={handleReset}
                  className="flex items-center gap-2 px-3 py-1 rounded-md font-medium bg-slate-600 hover:bg-slate-500 text-white transition-colors"
                >
                  <RotateCcw className="w-4 h-4" />
                  Réinitialiser
                </button>
              </div>

              <div className="flex items-center gap-2 text-sm text-gray-300">
                <Zap className="w-4 h-4" />
                <span>Génération {state.generation}</span>
              </div>

              <div className="flex items-center gap-2 text-sm">
                <span className="text-gray-400">Population :</span>
                <span className={`font-semibold ${complexity.color}`}>
                  {state.primatoms.length} ({complexity.text})
                </span>
              </div>
              
              <div className="flex items-center gap-2 text-sm">
                <span className="text-gray-400">Stabilité :</span>
                <span className={`font-semibold ${getSystemStatusColor()}`}>
                  {(state.systemStability || 75).toFixed(0)}% ({getSystemStatusText()})
                </span>
              </div>

              {state.activeDisruptions && state.activeDisruptions.length > 0 && (
                <div className="flex items-center gap-2 text-sm">
                  <AlertTriangle className="w-4 h-4 text-red-400 animate-pulse" />
                  <span className="text-red-400 font-medium">
                    {state.activeDisruptions.length} Disruption{state.activeDisruptions.length > 1 ? 's' : ''} Active{state.activeDisruptions.length > 1 ? 's' : ''}
                  </span>
                </div>
              )}
              
              <div className="flex items-center gap-2">
                <div className={`w-2 h-2 rounded-full ${state.isRunning ? 'bg-green-400 animate-pulse' : 'bg-gray-400'}`} />
                <span className="text-sm text-gray-300">
                  {state.isRunning ? 'Simulation Active' : 'Simulation Arrêtée'}
                </span>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Contenu principal */}
      <main className="w-full px-6 py-6">
        {/* Navigation par onglets */}
        <div className="mb-6">
          <div className="flex flex-wrap gap-1 bg-slate-800/50 p-1 rounded-lg backdrop-blur-sm border border-slate-700">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`flex items-center gap-2 px-4 py-2 rounded-md font-medium transition-colors ${
                  activeTab === tab.id
                    ? 'bg-cyan-500 text-white shadow-lg'
                    : 'text-gray-400 hover:text-white hover:bg-slate-700'
                }`}
              >
                {tab.icon}
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Disposition des sections */}
        <div className="grid grid-cols-1 xl:grid-cols-5 gap-6">
          {/* Zone principale */}
          <div className="xl:col-span-4 min-h-[900px]">
            {activeTab === 'simulation' && (
              <div className="h-full">
                <SimulationCanvas
                  primatoms={state.primatoms}
                  coalitions={state.coalitions}
                  influenceZones={state.influenceZones}
                  selectedPrimatom={selectedPrimatom}
                  onSelectPrimatom={handleSelectPrimatom}
                />
              </div>
            )}

            {activeTab === 'population' && (
              <PopulationControls
                currentPopulation={engine.getPopulationSize()}
                currentDistribution={engine.getCurrentBehaviorDistribution()}
                onPopulationChange={handlePopulationChange}
                onDistributionChange={handleDistributionChange}
                onReset={handleReset}
                isRunning={state.isRunning}
              />
            )}
            
            {activeTab === 'metrics' && (
              <MetricsDashboard state={state} />
            )}

            {activeTab === 'disruption' && (
              <DisruptionPanel
                state={state}
                onInjectEvent={handleInjectDisruption}
                onPredictImpact={handlePredictImpact}
              />
            )}

            {activeTab === 'ai-disruption' && (
              <IntelligentDisruptionManager
                state={state}
                poliSynthCore={poliSynthCore}
                onInjectEvent={handleInjectDisruption}
                isRunning={state.isRunning}
              />
            )}

            {activeTab === 'quantum' && (
              <QuantumSocialAnalyzer
                state={state}
                poliSynthCore={poliSynthCore}
                isRunning={state.isRunning}
              />
            )}

            {activeTab === 'emergence' && (
              <EmergentIntelligenceTracker
                state={state}
                poliSynthCore={poliSynthCore}
                isRunning={state.isRunning}
              />
            )}

            {activeTab === 'resonance' && (
              <CognitiveResonanceMapper
                state={state}
                poliSynthCore={poliSynthCore}
                isRunning={state.isRunning}
              />
            )}

            {activeTab === 'cultural' && (
              <CulturalInsightsPanel
                state={state}
                isRunning={state.isRunning}
              />
            )}

            {activeTab === 'culture-engine' && (
              <CultureEnginePanel
                state={state}
                poliSynthCore={poliSynthCore}
                isRunning={state.isRunning}
              />
            )}

            {activeTab === 'qloo-test' && (
              <QlooConnectionTester />
            )}

            {activeTab === 'details' && (
              <IntelligentZoom
                primatoms={state.primatoms}
                coalitions={state.coalitions}
                selectedPrimatom={selectedPrimatom}
                onSelectPrimatom={handleSelectPrimatom}
                onZoomOut={handleZoomOut}
              />
            )}

            {activeTab === 'analytics' && (
              <ProAnalyticsPanel
                state={state}
                poliSynthCore={poliSynthCore}
              />
            )}

            {activeTab === 'scenarios' && (
              <ScenarioPanel
                scenarios={[]}
                currentScenario={state.currentScenario}
                onSelectScenario={handleSelectScenario}
                isRunning={state.isRunning}
                onStart={handleStart}
                onStop={handleStop}
                onReset={handleReset}
              />
            )}
          </div>

          {/* Barre latérale */}
          <div className="xl:col-span-1">
            <div className="space-y-4">
              {/* Statistiques rapides */}
              <div className="bg-slate-800/50 backdrop-blur-sm rounded-lg p-4 border border-slate-700">
                <h3 className="text-lg font-semibold text-white mb-4">Statistiques Écosystème</h3>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-400">Primatoms Actifs</span>
                    <span className="font-semibold text-white">{state.primatoms.length}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-400">Coalitions</span>
                    <span className="font-semibold text-white">{state.coalitions.length}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-400">Zones d'Influence</span>
                    <span className="font-semibold text-white">{state.influenceZones?.length || 0}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-400">Connaissances</span>
                    <span className="font-semibold text-white">{state.globalKnowledge.length}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-400">Métriques</span>
                    <span className="font-semibold text-white">{state.metrics.length}</span>
                  </div>
                  {state.emergentPhenomena && state.emergentPhenomena.length > 0 && (
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-400">Phénomènes Émergents</span>
                      <span className="font-semibold text-purple-400">{state.emergentPhenomena.length}</span>
                    </div>
                  )}
                </div>
              </div>

              {/* État du système */}
              <div className="bg-slate-800/50 backdrop-blur-sm rounded-lg p-4 border border-slate-700">
                <h3 className="text-lg font-semibold text-white mb-4">État du Système</h3>
                <div className="space-y-3">
                  <div>
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-sm text-gray-400">Stabilité Globale</span>
                      <span className={`text-sm font-semibold ${getSystemStatusColor()}`}>
                        {(state.systemStability || 75).toFixed(0)}%
                      </span>
                    </div>
                    <div className="w-full bg-slate-700 rounded-full h-2">
                      <div
                        className={`h-2 rounded-full transition-all duration-300 ${
                          (state.systemStability || 75) > 70 ? 'bg-green-500'
                          : (state.systemStability || 75) > 40 ? 'bg-yellow-500' : 'bg-red-500'
                        }`}
                        style={{ width: `${state.systemStability || 75}%` }}
                      />
                    </div>
                  </div>

                  <div>
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-sm text-gray-400">Stress Moyen</span>
                      <span className="text-sm font-semibold text-orange-400">
                        {(state.primatoms.reduce((sum, p) => sum + (p.stressLevel || 0), 0) / state.primatoms.length).toFixed(1)}%
                      </span>
                    </div>
                    <div className="w-full bg-slate-700 rounded-full h-2">
                      <div
                        className="h-2 rounded-full transition-all duration-300 bg-orange-500"
                        style={{ width: `${(state.primatoms.reduce((sum, p) => sum + (p.stressLevel || 0), 0) / state.primatoms.length)}%` }}
                      />
                    </div>
                  </div>
                  
                  {state.activeDisruptions && state.activeDisruptions.length > 0 && (
                    <div>
                      <span className="text-sm text-gray-400">Niveau de Disruption</span>
                      <div className="mt-1">
                        {state.activeDisruptions.map((disruption, index) => (
                          <div key={index} className="text-xs text-red-400 bg-red-500/10 rounded px-2 py-1 mb-1">
                            {disruption.name} (Intensité: {disruption.intensity}/10)
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* Événements récents */}
              <div className="bg-slate-800/50 backdrop-blur-sm rounded-lg p-4 border border-slate-700">
                <h3 className="text-lg font-semibold text-white mb-4">Événements Récents</h3>
                <div className="space-y-2">
                  {state.emergentPhenomena && state.emergentPhenomena.slice(-3).map((phenomenon, index) => (
                    <div key={index} className="text-sm bg-purple-500/20 text-purple-400 rounded p-2">
                      <span className="font-medium">Émergence :</span>
                      <span className="ml-1">{phenomenon}</span>
                    </div>
                  ))}
                  
                  {state.coalitions.slice(-2).map((coalition, index) => (
                    <div key={index} className="text-sm bg-slate-700/50 rounded p-2">
                      <span className="text-cyan-400">Nouvelle coalition :</span>
                      <span className="text-gray-300 ml-1">{coalition.name}</span>
                    </div>
                  ))}
                  
                  {state.globalKnowledge.slice(-1).map((knowledge, index) => (
                    <div key={index} className="text-sm bg-slate-700/50 rounded p-2">
                      <span className="text-green-400">Connaissance :</span>
                      <span className="text-gray-300 ml-1">{knowledge.split('-')[0]}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Informations sur le Primatom sélectionné */}
              {selectedPrimatom && (
                <div className="bg-slate-800/50 backdrop-blur-sm rounded-lg p-4 border border-slate-700">
                  <h3 className="text-lg font-semibold text-white mb-2">Focus Actuel</h3>
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-gradient-to-r from-cyan-500 to-purple-500 rounded-full flex items-center justify-center">
                      <User className="w-4 h-4 text-white" />
                    </div>
                    <div>
                      <h4 className="font-medium text-white">{selectedPrimatom.name}</h4>
                      <p className="text-sm text-gray-400">{selectedPrimatom.behaviorType}</p>
                      {selectedPrimatom.stressLevel && selectedPrimatom.stressLevel > 30 && (
                        <p className="text-xs text-red-400">Stress élevé : {selectedPrimatom.stressLevel.toFixed(0)}%</p>
                      )}
                      {selectedPrimatom.coalition && (
                        <p className="text-xs text-cyan-400">
                          Coalition : {state.coalitions.find(c => c.id === selectedPrimatom.coalition)?.name}
                        </p>
                      )}
                    </div>
                  </div>
                  
                  {!isIntelligentZoom && (
                    <button
                      onClick={activeTab === 'details' && (
  <IntelligentZoom
    primatoms={state.primatoms}
    coalitions={state.coalitions}
    selectedPrimatom={selectedPrimatom}
    onSelectPrimatom={handleSelectPrimatom}
    onZoomOut={handleZoomOut}
    isRunning={state.isRunning} // Ajout de cette prop
  />
)}
                      className="w-full mt-3 px-3 py-2 bg-cyan-600 hover:bg-cyan-700 text-white rounded-lg text-sm font-medium transition-colors"
                    >
                      Zoom Intelligent
                    </button>
                  )}
                </div>
              )}

              {/* Aide à la navigation */}
              <div className="bg-slate-800/50 backdrop-blur-sm rounded-lg p-4 border border-slate-700">
                <h3 className="text-lg font-semibold text-white mb-3">Navigation</h3>
                <div className="space-y-2 text-xs text-gray-400">
                  <div>🖱️ <span className="text-gray-300">Clic + Glisser :</span> Déplacer la vue</div>
                  <div>🔍 <span className="text-gray-300">Molette :</span> Zoom avant/arrière</div>
                  <div>👆 <span className="text-gray-300">Clic sur Primatom :</span> Focus intelligent</div>
                  <div>⚡ <span className="text-gray-300">Analytics Pro :</span> Logs temps réel</div>
                  <div>🤖 <span className="text-gray-300">IA Disruption :</span> Mode automatique</div>
                  <div>🔬 <span className="text-gray-300">Analyse Quantique :</span> Recherche avancée</div>
                  <div>🧠 <span className="text-gray-300">Intelligence Émergente :</span> Détection IA</div>
                  <div>🌊 <span className="text-gray-300">Résonance Cognitive :</span> Patterns mentaux</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default App;