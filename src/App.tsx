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
import { 
  Activity, BarChart3, User, Target, Brain, Zap, AlertTriangle, Users, Settings, 
  Play, Pause, RotateCcw, Search, FileText, Cpu, Atom, Network, Waves, Globe,
  Sparkles, Rocket, Crown, Gem, TrendingUp, Eye, DollarSign, Shield, Flame,
  Star, ArrowUpRight, CheckCircle, Clock, Gauge, LineChart
} from 'lucide-react';

// COMPOSANT SPLASH SCREEN ÉPIQUE
const EpicSplashScreen: React.FC<{ onComplete: () => void }> = ({ onComplete }) => {
  const [progress, setProgress] = useState(0);
  const [phase, setPhase] = useState('initializing');

  useEffect(() => {
    const phases = [
      { name: 'initializing', text: 'Initialisation des Algorithmes IA...', duration: 800 },
      { name: 'loading', text: 'Chargement de l\'Intelligence Collective...', duration: 600 },
      { name: 'connecting', text: 'Connexion aux Réseaux Sociaux Quantiques...', duration: 700 },
      { name: 'complete', text: 'Système Prêt • Commençons l\'Expérience', duration: 500 }
    ];

    let currentPhase = 0;
    let currentProgress = 0;

    const interval = setInterval(() => {
      currentProgress += 2;
      setProgress(currentProgress);

      if (currentProgress >= (currentPhase + 1) * 25 && currentPhase < phases.length - 1) {
        currentPhase++;
        setPhase(phases[currentPhase].name);
      }

      if (currentProgress >= 100) {
        clearInterval(interval);
        setTimeout(onComplete, 800);
      }
    }, 30);

    return () => clearInterval(interval);
  }, [onComplete]);

  return (
    <div className="fixed inset-0 bg-gradient-to-br from-slate-950 via-slate-900 to-black z-50 flex items-center justify-center">
      <div className="text-center max-w-md mx-auto px-6">
        {/* Logo Animé */}
        <div className="relative mb-8">
          <div className="w-24 h-24 mx-auto bg-gradient-to-r from-cyan-500 via-purple-600 to-pink-500 rounded-2xl flex items-center justify-center shadow-2xl animate-pulse">
            <Brain className="w-12 h-12 text-white" />
          </div>
          <div className="absolute -top-2 -right-2 w-6 h-6 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full flex items-center justify-center animate-bounce">
            <Sparkles className="w-3 h-3 text-white" />
          </div>
        </div>

        {/* Titre Principal */}
        <h1 className="text-4xl font-bold bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 bg-clip-text text-transparent mb-2">
          PRIMATOMS SOCIETY
        </h1>
        <p className="text-slate-400 text-sm mb-8">
          Laboratoire de Disruption Cognitive Avancée
        </p>

        {/* Barre de Progression */}
        <div className="w-full bg-slate-800 rounded-full h-2 mb-4 overflow-hidden">
          <div 
            className="h-full bg-gradient-to-r from-cyan-500 to-purple-600 transition-all duration-300 ease-out rounded-full"
            style={{ width: `${progress}%` }}
          />
        </div>

        {/* Texte de Phase */}
        <div className="text-sm text-slate-300 mb-4">
          {phase === 'initializing' && (
            <div className="flex items-center justify-center gap-2">
              <Cpu className="w-4 h-4 text-cyan-400 animate-spin" />
              Initialisation des Algorithmes IA...
            </div>
          )}
          {phase === 'loading' && (
            <div className="flex items-center justify-center gap-2">
              <Brain className="w-4 h-4 text-purple-400 animate-pulse" />
              Chargement de l'Intelligence Collective...
            </div>
          )}
          {phase === 'connecting' && (
            <div className="flex items-center justify-center gap-2">
              <Network className="w-4 h-4 text-pink-400 animate-bounce" />
              Connexion aux Réseaux Sociaux Quantiques...
            </div>
          )}
          {phase === 'complete' && (
            <div className="flex items-center justify-center gap-2">
              <CheckCircle className="w-4 h-4 text-green-400" />
              Système Prêt • Commençons l'Expérience
            </div>
          )}
        </div>

        {/* Pourcentage */}
        <div className="text-2xl font-bold text-white">
          {progress}%
        </div>
      </div>
    </div>
  );
};

// NOTIFICATION SYSTÈME INTELLIGENTE
const SmartNotification: React.FC<{ 
  type: 'success' | 'warning' | 'info' | 'achievement',
  title: string,
  message: string,
  onClose: () => void 
}> = ({ type, title, message, onClose }) => {
  useEffect(() => {
    const timer = setTimeout(onClose, 5000);
    return () => clearTimeout(timer);
  }, [onClose]);

  const getIcon = () => {
    switch (type) {
      case 'success': return <CheckCircle className="w-5 h-5 text-green-400" />;
      case 'warning': return <AlertTriangle className="w-5 h-5 text-yellow-400" />;
      case 'achievement': return <Crown className="w-5 h-5 text-yellow-400" />;
      default: return <Sparkles className="w-5 h-5 text-cyan-400" />;
    }
  };

  const getBgClass = () => {
    switch (type) {
      case 'success': return 'from-green-500/20 to-emerald-500/20 border-green-500/30';
      case 'warning': return 'from-yellow-500/20 to-orange-500/20 border-yellow-500/30';
      case 'achievement': return 'from-yellow-500/20 to-amber-500/20 border-yellow-500/30';
      default: return 'from-cyan-500/20 to-blue-500/20 border-cyan-500/30';
    }
  };

  return (
    <div className={`fixed top-20 right-6 z-40 bg-gradient-to-r ${getBgClass()} border backdrop-blur-sm rounded-xl p-4 shadow-2xl animate-slide-in-right max-w-sm`}>
      <div className="flex items-start gap-3">
        {getIcon()}
        <div className="flex-1">
          <h4 className="font-bold text-white text-sm mb-1">{title}</h4>
          <p className="text-xs text-slate-300">{message}</p>
        </div>
        <button 
          onClick={onClose}
          className="text-slate-400 hover:text-white transition-colors"
        >
          ×
        </button>
      </div>
    </div>
  );
};

function App() {
  const [engine] = useState(() => new SocialDynamicsEngine());
  const [poliSynthCore] = useState(() => new PoliSynthCore());
  const [state, setState] = useState<SimulationState>(engine.getState());
  const [selectedPrimatom, setSelectedPrimatom] = useState<Primatom | null>(null);
  const [activeTab, setActiveTab] = useState<'simulation' | 'metrics' | 'details' | 'scenarios' | 'disruption' | 'population' | 'analytics' | 'ai-disruption' | 'quantum' | 'emergence' | 'resonance' | 'cultural'>('simulation');
  const [isIntelligentZoom, setIsIntelligentZoom] = useState(false);
  
  // NOUVEAUX ÉTATS POUR L'EXPÉRIENCE ÉPIQUE
  const [showSplash, setShowSplash] = useState(true);
  const [notifications, setNotifications] = useState<Array<{
    id: string;
    type: 'success' | 'warning' | 'info' | 'achievement';
    title: string;
    message: string;
  }>>([]);
  const [isFirstTime, setIsFirstTime] = useState(true);
  const [achievements, setAchievements] = useState<string[]>([]);

  useEffect(() => {
    const interval = setInterval(() => {
      const newState = engine.getState();
      setState(newState);
      
      // DÉTECTION D'ACHIEVEMENTS INTELLIGENTS
      checkForAchievements(newState);
    }, 100);

    return () => clearInterval(interval);
  }, [engine]);

  // SYSTÈME D'ACHIEVEMENTS AUTOMATIQUE
  const checkForAchievements = (newState: SimulationState) => {
    const { primatoms, coalitions, generation } = newState;
    
    // Achievement: Premier démarrage
    if (isFirstTime && newState.isRunning) {
      setIsFirstTime(false);
      addNotification('success', '🚀 Simulation Lancée !', 'Votre écosystème social prend vie...');
    }

    // Achievement: 100 Primatoms
    if (primatoms.length >= 100 && !achievements.includes('population_100')) {
      setAchievements(prev => [...prev, 'population_100']);
      addNotification('achievement', '👥 Société Complexe', '100+ Primatoms évoluent ensemble !');
    }

    // Achievement: Première Coalition
    if (coalitions.length >= 1 && !achievements.includes('first_coalition')) {
      setAchievements(prev => [...prev, 'first_coalition']);
      addNotification('achievement', '🤝 Première Alliance', 'Les Primatoms s\'organisent spontanément !');
    }

    // Achievement: Génération 50
    if (generation >= 50 && !achievements.includes('generation_50')) {
      setAchievements(prev => [...prev, 'generation_50']);
      addNotification('achievement', '⏰ Évolution Avancée', '50 générations d\'intelligence collective !');
    }

    // Achievement: Système Instable
    if ((newState.systemStability || 100) < 30 && !achievements.includes('chaos_mode')) {
      setAchievements(prev => [...prev, 'chaos_mode']);
      addNotification('warning', '⚡ Mode Chaos', 'Le système explore de nouveaux équilibres...');
    }
  };

  const addNotification = (type: 'success' | 'warning' | 'info' | 'achievement', title: string, message: string) => {
    const id = Date.now().toString();
    setNotifications(prev => [...prev, { id, type, title, message }]);
  };

  const removeNotification = (id: string) => {
    setNotifications(prev => prev.filter(n => n.id !== id));
  };

  const handleStart = () => {
    engine.start();
    if (isFirstTime) {
      addNotification('info', '🧠 IA Activée', 'L\'intelligence collective s\'éveille...');
    }
  };

  const handleStop = () => {
    engine.stop();
    addNotification('info', '⏸️ Simulation Suspendue', 'L\'écosystème est en pause.');
  };

  const handleReset = () => {
    engine.resetSimulation();
    poliSynthCore.resetSession();
    setState(engine.getState());
    setSelectedPrimatom(null);
    setIsIntelligentZoom(false);
    setAchievements([]);
    setIsFirstTime(true);
    addNotification('info', '🔄 Nouveau Cycle', 'L\'univers renaît... Prêt pour de nouvelles découvertes !');
  };

  const handleSelectScenario = (scenario: Scenario) => {
    console.log('Scénario sélectionné:', scenario);
    addNotification('info', '🎯 Scénario Activé', `Configuration: ${scenario.name}`);
  };

  const handleInjectDisruption = (eventConfig: Partial<DisruptiveEvent>) => {
    engine.injectDisruptiveEvent(eventConfig);
    addNotification('warning', '⚡ Disruption Injectée', `Impact prévu: ${eventConfig.intensity}/10`);
  };

  const handlePredictImpact = (eventConfig: Partial<DisruptiveEvent>) => {
    return engine.predictDisruptionImpact(eventConfig);
  };

  const handlePopulationChange = (size: number) => {
    engine.setPopulationSize(size);
    setState(engine.getState());
    setSelectedPrimatom(null);
    addNotification('info', '👥 Population Ajustée', `Nouvelle taille: ${size} Primatoms`);
  };

  const handleDistributionChange = (distribution: BehaviorDistribution) => {
    engine.setBehaviorDistribution(distribution);
    setState(engine.getState());
    setSelectedPrimatom(null);
    addNotification('info', '🧬 Comportements Modifiés', 'Distribution génétique mise à jour');
  };

  const handleSelectPrimatom = (primatom: Primatom) => {
    setSelectedPrimatom(primatom);
    if (!isIntelligentZoom) {
      setIsIntelligentZoom(true);
      setActiveTab('details');
      addNotification('info', '🔍 Focus Intelligent', `Analyse de ${primatom.name}`);
    }
  };

  const handleZoomOut = () => {
    setIsIntelligentZoom(false);
    setSelectedPrimatom(null);
    setActiveTab('simulation');
  };

  // ONGLETS AVEC BADGES ET ANIMATIONS
  const tabs = [
    { 
      id: 'simulation', 
      label: 'Écosystème', 
      icon: <Activity className="w-4 h-4" />, 
      badge: state.isRunning ? 'LIVE' : null,
      color: 'cyan'
    },
    { 
      id: 'cultural', 
      label: 'Intelligence Culturelle', 
      icon: <Globe className="w-4 h-4" />, 
      badge: 'IA',
      color: 'purple',
      premium: true
    },
    { 
      id: 'population', 
      label: 'Population', 
      icon: <Users className="w-4 h-4" />,
      badge: state.primatoms.length > 200 ? 'MEGA' : null,
      color: 'blue'
    },
    { 
      id: 'metrics', 
      label: 'Métriques', 
      icon: <BarChart3 className="w-4 h-4" />,
      color: 'green'
    },
    { 
      id: 'ai-disruption', 
      label: 'IA Disruption', 
      icon: <Cpu className="w-4 h-4" />, 
      badge: 'AUTO',
      color: 'pink',
      premium: true
    },
    { 
      id: 'quantum', 
      label: 'Analyse Quantique', 
      icon: <Atom className="w-4 h-4" />, 
      badge: 'RECHERCHE',
      color: 'indigo',
      premium: true
    },
    { 
      id: 'emergence', 
      label: 'Intelligence Émergente', 
      icon: <Network className="w-4 h-4" />, 
      badge: state.emergentPhenomena?.length || 0 > 0 ? 'DÉTECTÉ' : null,
      color: 'emerald',
      premium: true
    },
    { 
      id: 'resonance', 
      label: 'Résonance Cognitive', 
      icon: <Waves className="w-4 h-4" />, 
      color: 'teal',
      premium: true
    },
    { 
      id: 'details', 
      label: 'Zoom Intelligent', 
      icon: <Search className="w-4 h-4" />, 
      badge: selectedPrimatom ? 'FOCUS' : null,
      color: 'yellow'
    },
    { 
      id: 'analytics', 
      label: 'Analytics Pro', 
      icon: <FileText className="w-4 h-4" />, 
      badge: 'PRO',
      color: 'orange',
      premium: true
    },
    { 
      id: 'disruption', 
      label: 'Disruption', 
      icon: <AlertTriangle className="w-4 h-4" />, 
      badge: state.activeDisruptions?.length || 0 > 0 ? 'ACTIF' : null,
      color: 'red'
    },
    { 
      id: 'scenarios', 
      label: 'Scénarios', 
      icon: <Target className="w-4 h-4" />,
      color: 'violet'
    },
  ];

  const getSystemStatusColor = () => {
    const stability = state.systemStability || 75;
    if (stability > 70) return 'text-emerald-400';
    if (stability > 40) return 'text-yellow-400';
    return 'text-red-400';
  };

  const getSystemStatusText = () => {
    const stability = state.systemStability || 75;
    if (stability > 80) return 'Optimal';
    if (stability > 70) return 'Stable';
    if (stability > 40) return 'Instable';
    return 'Critique';
  };

  const getPopulationComplexity = () => {
    const size = state.primatoms.length;
    if (size > 500) return { text: 'Méga-Société', color: 'text-purple-400', icon: <Crown className="w-4 h-4" /> };
    if (size > 300) return { text: 'Société Complexe', color: 'text-purple-400', icon: <Gem className="w-4 h-4" /> };
    if (size > 150) return { text: 'Communauté Étendue', color: 'text-blue-400', icon: <Star className="w-4 h-4" /> };
    return { text: 'Groupe Social', color: 'text-green-400', icon: <Users className="w-4 h-4" /> };
  };

  const complexity = getPopulationComplexity();

  // SPLASH SCREEN
  if (showSplash) {
    return <EpicSplashScreen onComplete={() => setShowSplash(false)} />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-800 relative">
      {/* NOTIFICATIONS SYSTÈME */}
      <div className="fixed top-4 right-4 z-30 space-y-2">
        {notifications.map((notification) => (
          <SmartNotification
            key={notification.id}
            type={notification.type}
            title={notification.title}
            message={notification.message}
            onClose={() => removeNotification(notification.id)}
          />
        ))}
      </div>

      {/* HEADER ÉPIQUE */}
      <header className="bg-gradient-to-r from-slate-900/80 via-slate-800/90 to-slate-900/80 backdrop-blur-md border-b border-slate-600/50 shadow-2xl relative overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/5 via-purple-500/5 to-pink-500/5 animate-pulse"></div>
        
        <div className="relative w-full px-8 py-6">
          <div className="flex items-center justify-between">
            {/* LOGO & TITRE AVEC EFFETS */}
            <div className="flex items-center gap-6">
              <div className="relative">
                <div className="flex items-center gap-3">
                  <div className="relative p-3 bg-gradient-to-r from-cyan-500 to-purple-600 rounded-xl shadow-xl">
                    <Brain className="w-8 h-8 text-white" />
                    {state.isRunning && (
                      <div className="absolute -top-1 -right-1 w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
                    )}
                  </div>
                  <div>
                    <h1 className="text-3xl font-bold bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
                      PRIMATOMS SOCIETY
                    </h1>
                    <div className="flex items-center gap-4 mt-1">
                      <p className="text-sm text-slate-400">Laboratoire de Disruption Cognitive Avancée</p>
                      <div className="flex items-center gap-2 px-2 py-1 bg-green-500/20 rounded-full">
                        <CheckCircle className="w-3 h-3 text-green-400" />
                        <span className="text-green-400 text-xs font-bold">v2.0 • IA Enhanced</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            {/* MÉTRIQUES TEMPS RÉEL + CONTRÔLES */}
            <div className="flex items-center gap-6">
              {/* Métriques Intelligentes */}
              <div className="hidden lg:flex items-center gap-4">
                <div className="flex items-center gap-2 px-3 py-2 bg-slate-800/60 rounded-lg border border-slate-600/50">
                  <complexity.icon />
                  <div className="text-right">
                    <div className="text-xs text-slate-400">Population</div>
                    <div className={`text-sm font-bold ${complexity.color}`}>
                      {state.primatoms.length}
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-2 px-3 py-2 bg-slate-800/60 rounded-lg border border-slate-600/50">
                  <Gauge className="w-4 h-4 text-cyan-400" />
                  <div className="text-right">
                    <div className="text-xs text-slate-400">Stabilité</div>
                    <div className={`text-sm font-bold ${getSystemStatusColor()}`}>
                      {(state.systemStability || 75).toFixed(0)}%
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-2 px-3 py-2 bg-slate-800/60 rounded-lg border border-slate-600/50">
                  <Zap className="w-4 h-4 text-purple-400" />
                  <div className="text-right">
                    <div className="text-xs text-slate-400">Génération</div>
                    <div className="text-sm font-bold text-purple-400">
                      {state.generation}
                    </div>
                  </div>
                </div>

                {state.coalitions.length > 0 && (
                  <div className="flex items-center gap-2 px-3 py-2 bg-slate-800/60 rounded-lg border border-slate-600/50">
                    <Network className="w-4 h-4 text-emerald-400" />
                    <div className="text-right">
                      <div className="text-xs text-slate-400">Coalitions</div>
                      <div className="text-sm font-bold text-emerald-400">
                        {state.coalitions.length}
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* CONTRÔLES PRINCIPAUX AVEC STYLE */}
              <div className="flex items-center gap-3">
                <button
                  onClick={state.isRunning ? handleStop : handleStart}
                  className={`flex items-center gap-2 px-6 py-3 rounded-xl font-bold text-sm transition-all duration-300 shadow-lg transform hover:scale-105 ${
                    state.isRunning 
                      ? 'bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white' 
                      : 'bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white'
                  }`}
                >
                  {state.isRunning ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5" />}
                  {state.isRunning ? 'PAUSE' : 'START'}
                </button>
                
                <button
                  onClick={handleReset}
                  className="flex items-center gap-2 px-4 py-3 rounded-xl font-bold text-sm bg-gradient-to-r from-slate-600 to-slate-700 hover:from-slate-700 hover:to-slate-800 text-white transition-all duration-300 shadow-lg transform hover:scale-105"
                >
                  <RotateCcw className="w-4 h-4" />
                  RESET
                </button>
              </div>

              {/* STATUT SYSTÈME */}
              <div className="flex items-center gap-3">
                <div className={`flex items-center gap-2 px-3 py-2 rounded-lg border ${
                  state.isRunning 
                    ? 'bg-green-500/20 border-green-500/30 text-green-400' 
                    : 'bg-slate-700/50 border-slate-600 text-slate-400'
                }`}>
                  <div className={`w-2 h-2 rounded-full ${state.isRunning ? 'bg-green-400 animate-pulse' : 'bg-slate-400'}`} />
                  <span className="text-sm font-medium">
                    {state.isRunning ? 'SIMULATION ACTIVE' : 'PAUSE'}
                  </span>
                </div>

                {state.activeDisruptions && state.activeDisruptions.length > 0 && (
                  <div className="flex items-center gap-2 px-3 py-2 bg-red-500/20 border border-red-500/30 rounded-lg">
                    <AlertTriangle className="w-4 h-4 text-red-400 animate-pulse" />
                    <span className="text-red-400 text-sm font-bold">
                      {state.activeDisruptions.length} DISRUPTION{state.activeDisruptions.length > 1 ? 'S' : ''}
                    </span>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* MAIN CONTENT */}
      <main className="w-full px-8 py-8">
        {/* NAVIGATION AVEC BADGES ET ANIMATIONS */}
        <div className="mb-8">
          <div className="flex flex-wrap gap-2 bg-slate-800/50 p-2 rounded-xl backdrop-blur-sm border border-slate-700 shadow-xl">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`group relative flex items-center gap-2 px-4 py-3 rounded-lg font-medium transition-all duration-300 transform hover:scale-105 ${
                  activeTab === tab.id
                    ? `bg-gradient-to-r from-${tab.color}-500 to-${tab.color}-600 text-white shadow-lg`
                    : 'text-slate-400 hover:text-white hover:bg-slate-700/70'
                }`}
              >
                {tab.icon}
                <span className="text-sm font-bold">{tab.label}</span>
                
                {tab.premium && (
                  <Crown className="w-3 h-3 text-yellow-400" />
                )}
                
                {tab.badge && (
                  <span className={`px-1.5 py-0.5 text-xs font-bold rounded-full ${
                    activeTab === tab.id 
                      ? '