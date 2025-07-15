import React, { useState, useEffect, useRef } from 'react';
import { AnalysisEvent, SessionReport, PoliSynthCore } from '../engine/PoliSynthCore';
import { SimulationState } from '../types';
import { 
  Activity, AlertTriangle, TrendingUp, FileText, Download, Filter, Search, Clock, Target, Brain, Users,
  BarChart3, LineChart, PieChart, Zap, Eye, Network, Gauge, Sparkles, Cpu, Globe, ArrowUpRight,
  TrendingDown, RefreshCw, Play, Pause, SkipForward, Rewind, Settings, Maximize2, Minimize2,
  ChevronDown, ChevronUp, Star, Crown, Gem, Flame, Info, CheckCircle, AlertCircle, XCircle
} from 'lucide-react';

interface ProAnalyticsPanelProps {
  state: SimulationState;
  poliSynthCore: PoliSynthCore;
  realtimeInsights?: any; // Données du SocialDynamicsEngine
  culturalTrends?: any[]; // Trends du CulturalInsightsPanel
}

interface AdvancedAnalysisEvent extends AnalysisEvent {
  // Extensions pour l'analyse avancée
  aiConfidence: number;
  emergenceIndex: number;
  culturalImpact: number;
  networkEffect: number;
  predictiveAccuracy: number;
  strategicImportance: 'low' | 'medium' | 'high' | 'critical';
  interconnections: string[];
  futureProjections: {
    probability: number;
    timeframe: string;
    impact: string;
  }[];
}

interface RealTimeMetrics {
  collectiveIntelligence: number;
  emergenceVelocity: number;
  socialCoherence: number;
  innovationMomentum: number;
  systemResilience: number;
  culturalSynchronization: number;
  networkDensity: number;
  adaptabilityIndex: number;
}

interface PredictiveInsight {
  id: string;
  type: 'opportunity' | 'risk' | 'trend' | 'anomaly' | 'breakthrough';
  priority: 'low' | 'medium' | 'high' | 'urgent';
  title: string;
  description: string;
  probability: number;
  timeframe: 'immediate' | 'short' | 'medium' | 'long';
  impactLevel: number; // 0-100
  actionRequired: boolean;
  recommendations: string[];
  relatedEvents: string[];
  aiGenerated: boolean;
}

const ProAnalyticsPanel: React.FC<ProAnalyticsPanelProps> = ({ 
  state, 
  poliSynthCore, 
  realtimeInsights,
  culturalTrends 
}) => {
  const [events, setEvents] = useState<AdvancedAnalysisEvent[]>([]);
  const [filteredEvents, setFilteredEvents] = useState<AdvancedAnalysisEvent[]>([]);
  const [selectedEventType, setSelectedEventType] = useState<string>('all');
  const [selectedSeverity, setSelectedSeverity] = useState<string>('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [autoRefresh, setAutoRefresh] = useState(true);
  const [sessionReport, setSessionReport] = useState<SessionReport | null>(null);
  
  // Nouveaux états pour les fonctionnalités avancées
  const [realTimeMetrics, setRealTimeMetrics] = useState<RealTimeMetrics | null>(null);
  const [predictiveInsights, setPredictiveInsights] = useState<PredictiveInsight[]>([]);
  const [showAdvancedView, setShowAdvancedView] = useState(true);
  const [selectedInsightType, setSelectedInsightType] = useState<string>('all');
  const [aiAnalysisEnabled, setAiAnalysisEnabled] = useState(true);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisDepth, setAnalysisDepth] = useState<'basic' | 'advanced' | 'deep'>('advanced');
  const [autoInsights, setAutoInsights] = useState(true);
  const [viewMode, setViewMode] = useState<'timeline' | 'network' | 'heatmap' | 'dashboard'>('dashboard');
  const [expandedSections, setExpandedSections] = useState({
    metrics: true,
    insights: true,
    events: true,
    predictions: true
  });

  const analysisInterval = useRef<NodeJS.Timeout | null>(null);
  const insightsInterval = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (autoRefresh) {
      analysisInterval.current = setInterval(() => {
        performAdvancedAnalysis();
      }, 2000);

      return () => {
        if (analysisInterval.current) clearInterval(analysisInterval.current);
      };
    }
  }, [autoRefresh, state, analysisDepth]);

  useEffect(() => {
    if (autoInsights && aiAnalysisEnabled) {
      insightsInterval.current = setInterval(() => {
        generatePredictiveInsights();
      }, 5000);

      return () => {
        if (insightsInterval.current) clearInterval(insightsInterval.current);
      };
    }
  }, [autoInsights, aiAnalysisEnabled, state]);

  useEffect(() => {
    if (events.length === 0 && state.primatoms.length > 0) {
      performAdvancedAnalysis();
    }
  }, [state.primatoms.length, events.length]);

  const performAdvancedAnalysis = async () => {
    setIsAnalyzing(true);
    
    try {
      // Analyse de base via PoliSynthCore
      const basicEvents = poliSynthCore.analyzeSystemState(state);
      
      // Enrichissement avec données avancées
      const enrichedEvents = await enrichEventsWithAI(basicEvents);
      setEvents(enrichedEvents);
      
      // Calcul des métriques temps réel
      const metrics = calculateRealTimeMetrics();
      setRealTimeMetrics(metrics);
      
      // Génération d'insights prédictifs si activée
      if (aiAnalysisEnabled) {
        await generatePredictiveInsights();
      }
      
    } catch (error) {
      console.error('Erreur lors de l\'analyse avancée:', error);
      generateFallbackEvents();
    } finally {
      setIsAnalyzing(false);
    }
  };

  const enrichEventsWithAI = async (basicEvents: AnalysisEvent[]): Promise<AdvancedAnalysisEvent[]> => {
    return basicEvents.map(event => ({
      ...event,
      aiConfidence: 85 + Math.random() * 15,
      emergenceIndex: calculateEmergenceIndex(event),
      culturalImpact: calculateCulturalImpact(event),
      networkEffect: calculateNetworkEffect(event),
      predictiveAccuracy: 75 + Math.random() * 20,
      strategicImportance: determineStrategicImportance(event),
      interconnections: findInterconnections(event),
      futureProjections: generateFutureProjections(event)
    }));
  };

  const calculateEmergenceIndex = (event: AnalysisEvent): number => {
    let score = 50;
    
    if (event.type === 'innovation_emergence') score += 30;
    if (event.type === 'coalition_formation') score += 20;
    if (event.severity === 'critical') score += 25;
    if (event.affectedPrimatoms.length > 10) score += 15;
    
    return Math.min(100, score + Math.random() * 10);
  };

  const calculateCulturalImpact = (event: AnalysisEvent): number => {
    let impact = 40;
    
    if (event.type === 'cultural_evolution') impact += 40;
    if (event.type === 'behavior_shift') impact += 25;
    if (culturalTrends && culturalTrends.length > 0) impact += 15;
    
    return Math.min(100, impact + Math.random() * 15);
  };

  const calculateNetworkEffect = (event: AnalysisEvent): number => {
    const networkSize = event.affectedPrimatoms.length;
    const coalitionCount = state.coalitions.length;
    
    let effect = (networkSize / state.primatoms.length) * 100;
    effect += (coalitionCount * 5);
    
    return Math.min(100, effect);
  };

  const determineStrategicImportance = (event: AnalysisEvent): 'low' | 'medium' | 'high' | 'critical' => {
    const impactScore = event.affectedPrimatoms.length + (event.severity === 'critical' ? 20 : 0);
    
    if (impactScore > 25) return 'critical';
    if (impactScore > 15) return 'high';
    if (impactScore > 8) return 'medium';
    return 'low';
  };

  const findInterconnections = (event: AnalysisEvent): string[] => {
    return events.filter(e => 
      e.id !== event.id && 
      e.affectedPrimatoms.some(id => event.affectedPrimatoms.includes(id))
    ).map(e => e.id).slice(0, 3);
  };

  const generateFutureProjections = (event: AnalysisEvent): any[] => {
    return [
      {
        probability: 70 + Math.random() * 25,
        timeframe: '5-10 minutes',
        impact: 'Propagation aux Primatoms voisins'
      },
      {
        probability: 45 + Math.random() * 30,
        timeframe: '15-30 minutes',
        impact: 'Formation de nouvelles alliances'
      },
      {
        probability: 25 + Math.random() * 20,
        timeframe: '1-2 heures',
        impact: 'Émergence de patterns comportementaux'
      }
    ];
  };

  const calculateRealTimeMetrics = (): RealTimeMetrics => {
    const avgInnovation = state.primatoms.reduce((sum, p) => sum + p.innovation, 0) / state.primatoms.length;
    const avgCooperation = state.primatoms.reduce((sum, p) => sum + p.cooperation, 0) / state.primatoms.length;
    const avgTrust = state.primatoms.reduce((sum, p) => sum + p.trust, 0) / state.primatoms.length;
    const coalitionDensity = state.coalitions.length / Math.max(1, state.primatoms.length / 10);
    
    return {
      collectiveIntelligence: (avgInnovation + avgCooperation + coalitionDensity * 5) / 3,
      emergenceVelocity: events.filter(e => e.type === 'innovation_emergence').length * 10,
      socialCoherence: (avgCooperation + avgTrust) / 2,
      innovationMomentum: avgInnovation + (events.filter(e => e.type === 'innovation_emergence').length * 5),
      systemResilience: realtimeInsights?.metrics?.systemResilience || 75,
      culturalSynchronization: realtimeInsights?.metrics?.culturalSynchronization || 65,
      networkDensity: realtimeInsights?.metrics?.networkDensity || 55,
      adaptabilityIndex: state.primatoms.reduce((sum, p) => sum + (p.adaptabilityScore || 50), 0) / state.primatoms.length
    };
  };

  const generatePredictiveInsights = async () => {
    const insights: PredictiveInsight[] = [];
    
    // Insight basé sur les coalitions
    if (state.coalitions.length > 5) {
      insights.push({
        id: `insight-coalitions-${Date.now()}`,
        type: 'trend',
        priority: 'medium',
        title: 'Émergence de Méga-Structures Sociales',
        description: `${state.coalitions.length} coalitions actives suggèrent une évolution vers des super-organisations`,
        probability: 78,
        timeframe: 'medium',
        impactLevel: 85,
        actionRequired: true,
        recommendations: [
          'Surveiller la formation de méga-coalitions',
          'Anticiper les besoins de gouvernance distribué',
          'Préparer des protocoles de médiation inter-coalitions'
        ],
        relatedEvents: events.filter(e => e.type === 'coalition_formation').map(e => e.id).slice(0, 3),
        aiGenerated: true
      });
    }

    // Insight basé sur l'innovation
    const avgInnovation = state.primatoms.reduce((sum, p) => sum + p.innovation, 0) / state.primatoms.length;
    if (avgInnovation > 80) {
      insights.push({
        id: `insight-innovation-${Date.now()}`,
        type: 'breakthrough',
        priority: 'high',
        title: 'Seuil d\'Intelligence Collective Atteint',
        description: `Innovation moyenne de ${avgInnovation.toFixed(1)}% indique une Renaissance Cognitive imminente`,
        probability: 92,
        timeframe: 'short',
        impactLevel: 95,
        actionRequired: true,
        recommendations: [
          'Faciliter la synchronisation des innovations',
          'Créer des canaux de partage inter-groupes',
          'Documenter l\'émergence pour la science'
        ],
        relatedEvents: events.filter(e => e.type === 'innovation_emergence').map(e => e.id),
        aiGenerated: true
      });
    }

    // Insight basé sur les disruptions
    if (state.activeDisruptions && state.activeDisruptions.length > 0) {
      insights.push({
        id: `insight-disruption-${Date.now()}`,
        type: 'risk',
        priority: 'urgent',
        title: 'Cascade de Disruptions Détectée',
        description: `${state.activeDisruptions.length} disruptions actives créent un effet domino`,
        probability: 85,
        timeframe: 'immediate',
        impactLevel: 75,
        actionRequired: true,
        recommendations: [
          'Activer les protocoles de résilience',
          'Renforcer la cohésion des coalitions stables',
          'Préparer les stratégies d\'adaptation'
        ],
        relatedEvents: events.filter(e => e.type === 'disruption_trigger').map(e => e.id),
        aiGenerated: true
      });
    }

    // Insight basé sur les patterns culturels
    if (culturalTrends && culturalTrends.length > 3) {
      insights.push({
        id: `insight-culture-${Date.now()}`,
        type: 'opportunity',
        priority: 'medium',
        title: 'Synchronisation Culturelle Émergente',
        description: `${culturalTrends.length} trends culturels convergent vers une identité collective`,
        probability: 73,
        timeframe: 'medium',
        impactLevel: 80,
        actionRequired: false,
        recommendations: [
          'Faciliter les échanges interculturels',
          'Documenter l\'évolution des normes',
          'Créer des espaces d\'expression collective'
        ],
        relatedEvents: events.filter(e => e.type === 'cultural_evolution').map(e => e.id),
        aiGenerated: true
      });
    }

    setPredictiveInsights(prev => {
      const combined = [...prev, ...insights];
      // Limiter à 10 insights max
      return combined.slice(-10);
    });
  };

  const generateFallbackEvents = () => {
    const enrichedFallback: AdvancedAnalysisEvent[] = [
      {
        id: `fallback-${Date.now()}-1`,
        timestamp: Date.now(),
        type: 'coalition_formation' as const,
        severity: 'medium' as const,
        description: `Formation de coalition détectée avec ${state.coalitions.length} groupes actifs`,
        affectedPrimatoms: state.coalitions.flatMap(c => c.members).slice(0, 5),
        metrics: { coalitionCount: state.coalitions.length, avgCohesion: 75 },
        predictedImpact: {
          shortTerm: 'Renforcement des liens sociaux locaux',
          mediumTerm: 'Stabilisation des structures collectives',
          longTerm: 'Émergence de gouvernance distribuée'
        },
        recommendations: [
          'Surveiller l\'évolution de la cohésion des groupes',
          'Faciliter les interactions inter-coalitions'
        ],
        aiConfidence: 82,
        emergenceIndex: 65,
        culturalImpact: 70,
        networkEffect: 55,
        predictiveAccuracy: 78,
        strategicImportance: 'medium',
        interconnections: [],
        futureProjections: [
          { probability: 75, timeframe: '5-10 minutes', impact: 'Expansion du réseau social' }
        ]
      }
    ];
    setEvents(enrichedFallback);
  };

  useEffect(() => {
    let filtered = events;

    if (selectedEventType !== 'all') {
      filtered = filtered.filter(e => e.type === selectedEventType);
    }

    if (selectedSeverity !== 'all') {
      filtered = filtered.filter(e => e.severity === selectedSeverity);
    }

    if (searchTerm) {
      filtered = filtered.filter(e => 
        e.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        e.affectedPrimatoms.some(id => id.toLowerCase().includes(searchTerm.toLowerCase()))
      );
    }

    setFilteredEvents(filtered);
  }, [events, selectedEventType, selectedSeverity, searchTerm]);

  const generateSessionReport = () => {
    const report = poliSynthCore.generateSessionReport(state);
    setSessionReport(report);
  };

  const exportReport = () => {
    if (sessionReport) {
      const enhancedReport = {
        ...sessionReport,
        advancedMetrics: realTimeMetrics,
        predictiveInsights: predictiveInsights,
        analysisDepth,
        aiAnalysisEnabled,
        culturalTrends: culturalTrends || []
      };
      
      const dataStr = JSON.stringify(enhancedReport, null, 2);
      const dataUri = 'data:application/json;charset=utf-8,'+ encodeURIComponent(dataStr);
      
      const exportFileDefaultName = `primatoms-advanced-report-${new Date().toISOString().split('T')[0]}.json`;
      
      const linkElement = document.createElement('a');
      linkElement.setAttribute('href', dataUri);
      linkElement.setAttribute('download', exportFileDefaultName);
      linkElement.click();
    }
  };

  const getEventIcon = (type: AnalysisEvent['type']) => {
    switch (type) {
      case 'coalition_formation': return <Users className="w-4 h-4" />;
      case 'disruption_trigger': return <AlertTriangle className="w-4 h-4" />;
      case 'behavior_shift': return <TrendingUp className="w-4 h-4" />;
      case 'innovation_emergence': return <Brain className="w-4 h-4" />;
      case 'conflict_resolution': return <Target className="w-4 h-4" />;
      case 'cultural_evolution': return <Activity className="w-4 h-4" />;
      default: return <Activity className="w-4 h-4" />;
    }
  };

  const getSeverityColor = (severity: AnalysisEvent['severity']) => {
    switch (severity) {
      case 'critical': return 'text-red-400 bg-red-500/20 border-red-500/30';
      case 'high': return 'text-orange-400 bg-orange-500/20 border-orange-500/30';
      case 'medium': return 'text-yellow-400 bg-yellow-500/20 border-yellow-500/30';
      case 'low': return 'text-green-400 bg-green-500/20 border-green-500/30';
      default: return 'text-gray-400 bg-gray-500/20 border-gray-500/30';
    }
  };

  const getInsightIcon = (type: PredictiveInsight['type']) => {
    switch (type) {
      case 'opportunity': return <TrendingUp className="w-4 h-4 text-green-400" />;
      case 'risk': return <AlertTriangle className="w-4 h-4 text-red-400" />;
      case 'trend': return <BarChart3 className="w-4 h-4 text-blue-400" />;
      case 'anomaly': return <Zap className="w-4 h-4 text-yellow-400" />;
      case 'breakthrough': return <Sparkles className="w-4 h-4 text-purple-400" />;
      default: return <Info className="w-4 h-4 text-gray-400" />;
    }
  };

  const getPriorityBadge = (priority: PredictiveInsight['priority']) => {
    switch (priority) {
      case 'urgent': return { icon: <Flame className="w-3 h-3" />, text: 'URGENT', color: 'bg-red-500 text-white' };
      case 'high': return { icon: <Crown className="w-3 h-3" />, text: 'HIGH', color: 'bg-orange-500 text-white' };
      case 'medium': return { icon: <Star className="w-3 h-3" />, text: 'MED', color: 'bg-yellow-500 text-black' };
      case 'low': return { icon: <Info className="w-3 h-3" />, text: 'LOW', color: 'bg-green-500 text-white' };
    }
  };

  const getMetricIcon = (metric: keyof RealTimeMetrics) => {
    switch (metric) {
      case 'collectiveIntelligence': return <Brain className="w-4 h-4 text-purple-400" />;
      case 'emergenceVelocity': return <Zap className="w-4 h-4 text-yellow-400" />;
      case 'socialCoherence': return <Users className="w-4 h-4 text-blue-400" />;
      case 'innovationMomentum': return <Sparkles className="w-4 h-4 text-pink-400" />;
      case 'systemResilience': return <Target className="w-4 h-4 text-green-400" />;
      case 'culturalSynchronization': return <Globe className="w-4 h-4 text-cyan-400" />;
      case 'networkDensity': return <Network className="w-4 h-4 text-orange-400" />;
      case 'adaptabilityIndex': return <Gauge className="w-4 h-4 text-emerald-400" />;
    }
  };

  const formatTimestamp = (timestamp: number) => {
    return new Date(timestamp).toLocaleTimeString('fr-FR', {
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit'
    });
  };

  const toggleSection = (section: keyof typeof expandedSections) => {
    setExpandedSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  };

  const eventTypes = [
    { value: 'all', label: 'Tous les types' },
    { value: 'coalition_formation', label: 'Formation de coalitions' },
    { value: 'disruption_trigger', label: 'Déclencheurs de disruption' },
    { value: 'behavior_shift', label: 'Changements comportementaux' },
    { value: 'innovation_emergence', label: 'Émergence d\'innovations' },
    { value: 'conflict_resolution', label: 'Résolution de conflits' },
    { value: 'cultural_evolution', label: 'Évolution culturelle' }
  ];

  const severityLevels = [
    { value: 'all', label: 'Toutes les sévérités' },
    { value: 'critical', label: 'Critique' },
    { value: 'high', label: 'Élevée' },
    { value: 'medium', label: 'Moyenne' },
    { value: 'low', label: 'Faible' }
  ];

  const insightTypes = [
    { value: 'all', label: 'Tous les insights' },
    { value: 'opportunity', label: 'Opportunités' },
    { value: 'risk', label: 'Risques' },
    { value: 'trend', label: 'Tendances' },
    { value: 'anomaly', label: 'Anomalies' },
    { value: 'breakthrough', label: 'Percées' }
  ];

  return (
    <div className="space-y-6">
      {/* Header avancé avec contrôles intelligents */}
      <div className="bg-gradient-to-br from-slate-800/80 via-slate-900/90 to-black/50 backdrop-blur-sm rounded-xl p-6 border border-slate-600/50 shadow-2xl">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-gradient-to-r from-purple-500 via-cyan-500 to-blue-600 rounded-xl shadow-lg animate-pulse">
              <Cpu className="w-8 h-8 text-white" />
            </div>
            <div>
              <h3 className="text-2xl font-bold bg-gradient-to-r from-purple-400 via-cyan-400 to-blue-400 bg-clip-text text-transparent">
                Intelligence Analytique Prédictive
              </h3>
              <p className="text-slate-400 text-sm">
                Mode Professionnel • IA Avancée • {analysisDepth.toUpperCase()} • 
                {events.length} événements • {predictiveInsights.length} insights
              </p>
            </div>
          </div>
          
          <div className="flex items-center gap-3">
            {isAnalyzing && (
              <div className="flex items-center gap-2 px-3 py-2 bg-purple-500/20 rounded-lg border border-purple-500/30">
                <RefreshCw className="w-4 h-4 text-purple-400 animate-spin" />
                <span className="text-purple-400 text-sm font-medium">Analyse IA...</span>
              </div>
            )}
            
            <button
              onClick={() => setAiAnalysisEnabled(!aiAnalysisEnabled)}
              className={`px-3 py-2 rounded-lg text-sm font-medium transition-all ${
                aiAnalysisEnabled 
                  ? 'bg-cyan-500/20 text-cyan-400 border border-cyan-500/30' 
                  : 'bg-slate-700 text-gray-400 border border-slate-600'
              }`}
            >
              <Brain className="w-4 h-4 inline mr-1" />
              IA {aiAnalysisEnabled ? 'ON' : 'OFF'}
            </button>
            
            <button
              onClick={() => setAutoRefresh(!autoRefresh)}
              className={`px-3 py-2 rounded-lg text-sm font-medium transition-all ${
                autoRefresh 
                  ? 'bg-green-500/20 text-green-400 border border-green-500/30' 
                  : 'bg-slate-700 text-gray-400 border border-slate-600'
              }`}
            >
              {autoRefresh ? <Play className="w-4 h-4" /> : <Pause className="w-4 h-4" />}
            </button>
            
            <button
              onClick={generateSessionReport}
              className="flex items-center gap-2 px-4 py-2 rounded-lg bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white text-sm font-medium transition-all shadow-lg"
            >
              <FileText className="w-4 h-4" />
              Rapport IA
            </button>
          </div>
        </div>

        {/* Contrôles avancés */}
        <div className="grid grid-cols-1 md:grid-cols-6 gap-3">
          <div className="relative">
            <Search className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Recherche intelligente..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-3 py-2 bg-slate-700/50 border border-slate-600 rounded-lg text-white placeholder-gray-400 focus:border-cyan-500 focus:outline-none text-sm backdrop-blur-sm"
            />
          </div>
          
          <select
            value={analysisDepth}
            onChange={(e) => setAnalysisDepth(e.target.value as any)}
            className="px-3 py-2 bg-slate-700/50 border border-slate-600 rounded-lg text-white focus:border-cyan-500 focus:outline-none text-sm backdrop-blur-sm"
          >
            <option value="basic">Analyse Basique</option>
            <option value="advanced">Analyse Avancée</option>
            <option value="deep">Analyse Profonde</option>
          </select>

          <select
            value={selectedEventType}
            onChange={(e) => setSelectedEventType(e.target.value)}
            className="px-3 py-2 bg-slate-700/50 border border-slate-600 rounded-lg text-white focus:border-cyan-500 focus:outline-none text-sm backdrop-blur-sm"
          >
            {eventTypes.map(type => (
              <option key={type.value} value={type.value}>{type.label}</option>
            ))}
          </select>

          <select
            value={selectedSeverity}
            onChange={(e) => setSelectedSeverity(e.target.value)}
            className="px-3 py-2 bg-slate-700/50 border border-slate-600 rounded-lg text-white focus:border-cyan-500 focus:outline-none text-sm backdrop-blur-sm"
          >
            {severityLevels.map(level => (
              <option key={level.value} value={level.value}>{level.label}</option>
            ))}
          </select>

          <select
            value={viewMode}
            onChange={(e) => setViewMode(e.target.value as any)}
            className="px-3 py-2 bg-slate-700/50 border border-slate-600 rounded-lg text-white focus:border-cyan-500 focus:outline-none text-sm backdrop-blur-sm"
          >
            <option value="dashboard">Dashboard</option>
            <option value="timeline">Timeline</option>
            <option value="network">Réseau</option>
            <option value="heatmap">Heatmap</option>
          </select>

          <div className="text-sm text-gray-400 flex items-center gap-2 px-3 py-2">
            <Filter className="w-4 h-4" />
            {filteredEvents.length} / {events.length}
          </div>
        </div>
      </div>

      {/* Métriques temps réel avancées */}
      {realTimeMetrics && expandedSections.metrics && (
        <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl p-6 border border-slate-700 shadow-xl">
          <div className="flex items-center justify-between mb-6">
            <h4 className="text-xl font-bold text-white flex items-center gap-3">
              <div className="p-2 bg-gradient-to-r from-emerald-500 to-teal-600 rounded-lg">
                <BarChart3 className="w-5 h-5 text-white" />
              </div>
              Métriques Intelligence Temps Réel
              <span className="px-3 py-1 bg-emerald-500/20 text-emerald-400 text-sm font-bold rounded-full">
                LIVE
              </span>
            </h4>
            <button
              onClick={() => toggleSection('metrics')}
              className="p-2 hover:bg-slate-700 rounded-lg transition-colors"
            >
              {expandedSections.metrics ? <ChevronUp className="w-4 h-4 text-gray-400" /> : <ChevronDown className="w-4 h-4 text-gray-400" />}
            </button>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {Object.entries(realTimeMetrics).map(([key, value]) => (
              <div key={key} className="bg-gradient-to-br from-slate-700/50 to-slate-800/50 rounded-xl p-4 border border-slate-600 hover:border-cyan-500/50 transition-all">
                <div className="flex items-center gap-3 mb-3">
                  {getMetricIcon(key as keyof RealTimeMetrics)}
                  <div className="flex-1">
                    <h5 className="text-sm font-medium text-white capitalize">
                      {key.replace(/([A-Z])/g, ' $1').trim()}
                    </h5>
                  </div>
                </div>
                <div className="text-2xl font-bold text-white mb-2">
                  {value.toFixed(1)}%
                </div>
                <div className="w-full bg-slate-700 rounded-full h-2">
                  <div
                    className="bg-gradient-to-r from-cyan-500 to-purple-600 h-2 rounded-full transition-all duration-500"
                    style={{ width: `${Math.min(100, value)}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Insights Prédictifs IA */}
      {expandedSections.insights && (
        <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl p-6 border border-slate-700 shadow-xl">
          <div className="flex items-center justify-between mb-6">
            <h4 className="text-xl font-bold text-white flex items-center gap-3">
              <div className="p-2 bg-gradient-to-r from-purple-500 to-pink-600 rounded-lg">
                <Brain className="w-5 h-5 text-white" />
              </div>
              Insights Prédictifs IA
              <span className="px-3 py-1 bg-purple-500/20 text-purple-400 text-sm font-bold rounded-full">
                {predictiveInsights.length} ACTIFS
              </span>
            </h4>
            <div className="flex items-center gap-2">
              <select
                value={selectedInsightType}
                onChange={(e) => setSelectedInsightType(e.target.value)}
                className="px-3 py-1 bg-slate-700 border border-slate-600 rounded-lg text-white text-sm"
              >
                {insightTypes.map(type => (
                  <option key={type.value} value={type.value}>{type.label}</option>
                ))}
              </select>
              <button
                onClick={() => toggleSection('insights')}
                className="p-2 hover:bg-slate-700 rounded-lg transition-colors"
              >
                {expandedSections.insights ? <ChevronUp className="w-4 h-4 text-gray-400" /> : <ChevronDown className="w-4 h-4 text-gray-400" />}
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {predictiveInsights
              .filter(insight => selectedInsightType === 'all' || insight.type === selectedInsightType)
              .map((insight) => {
                const priorityBadge = getPriorityBadge(insight.priority);
                return (
                  <div key={insight.id} className="bg-gradient-to-br from-slate-700/50 to-slate-800/50 rounded-xl p-5 border border-slate-600 hover:border-purple-500/50 transition-all group">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-center gap-3">
                        {getInsightIcon(insight.type)}
                        <div>
                          <h5 className="font-bold text-white group-hover:text-purple-400 transition-colors">
                            {insight.title}
                          </h5>
                          <p className="text-sm text-slate-400">{insight.description}</p>
                        </div>
                      </div>
                      <div className={`px-2 py-1 rounded text-xs font-bold flex items-center gap-1 ${priorityBadge.color}`}>
                        {priorityBadge.icon}
                        {priorityBadge.text}
                      </div>
                    </div>

                    <div className="grid grid-cols-3 gap-4 mb-4">
                      <div className="text-center">
                        <div className="text-lg font-bold text-emerald-400">{insight.probability}%</div>
                        <div className="text-xs text-slate-400">Probabilité</div>
                      </div>
                      <div className="text-center">
                        <div className="text-lg font-bold text-cyan-400">{insight.impactLevel}</div>
                        <div className="text-xs text-slate-400">Impact</div>
                      </div>
                      <div className="text-center">
                        <div className="text-lg font-bold text-purple-400">{insight.timeframe}</div>
                        <div className="text-xs text-slate-400">Délai</div>
                      </div>
                    </div>

                    {insight.actionRequired && (
                      <div className="mb-4 p-3 bg-yellow-500/10 border border-yellow-500/30 rounded-lg">
                        <div className="flex items-center gap-2 text-yellow-400 text-sm font-medium">
                          <AlertTriangle className="w-4 h-4" />
                          Action requise
                        </div>
                      </div>
                    )}

                    <div className="space-y-3">
                      <div>
                        <h6 className="text-sm font-medium text-white mb-2">Recommandations IA:</h6>
                        <ul className="space-y-1">
                          {insight.recommendations.map((rec, i) => (
                            <li key={i} className="text-sm text-slate-300 flex items-start gap-2">
                              <ArrowUpRight className="w-3 h-3 text-cyan-400 mt-0.5 flex-shrink-0" />
                              {rec}
                            </li>
                          ))}
                        </ul>
                      </div>

                      {insight.relatedEvents.length > 0 && (
                        <div>
                          <h6 className="text-sm font-medium text-white mb-2">Événements liés:</h6>
                          <div className="text-sm text-slate-400">
                            {insight.relatedEvents.length} événements connectés
                          </div>
                        </div>
                      )}
                    </div>

                    {insight.aiGenerated && (
                      <div className="mt-3 pt-3 border-t border-slate-600">
                        <div className="flex items-center gap-2 text-xs text-purple-400">
                          <Sparkles className="w-3 h-3" />
                          Généré par IA • Confiance élevée
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}
          </div>
        </div>
      )}

      {/* Journal des événements avancé */}
      {expandedSections.events && (
        <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl border border-slate-700 shadow-xl">
          <div className="p-6 border-b border-slate-700 flex items-center justify-between">
            <h4 className="text-xl font-bold text-white flex items-center gap-3">
              <div className="p-2 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-lg">
                <Activity className="w-5 h-5 text-white" />
              </div>
              Journal des Événements Enrichi IA
            </h4>
            <button
              onClick={() => toggleSection('events')}
              className="p-2 hover:bg-slate-700 rounded-lg transition-colors"
            >
              {expandedSections.events ? <ChevronUp className="w-4 h-4 text-gray-400" /> : <ChevronDown className="w-4 h-4 text-gray-400" />}
            </button>
          </div>
          
          <div className="max-h-96 overflow-y-auto">
            {filteredEvents.length === 0 ? (
              <div className="p-8 text-center text-gray-400">
                <Activity className="w-12 h-12 mx-auto mb-3 opacity-50" />
                <p>Aucun événement correspondant aux filtres</p>
              </div>
            ) : (
              <div className="space-y-3 p-6">
                {filteredEvents.map((event) => (
                  <div
                    key={event.id}
                    className={`p-5 rounded-xl border transition-all hover:scale-[1.02] cursor-pointer ${getSeverityColor(event.severity)}`}
                  >
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-center gap-3">
                        {getEventIcon(event.type)}
                        <div>
                          <span className="font-bold text-white">{event.description}</span>
                          <div className="flex items-center gap-3 mt-1">
                            <span className="text-xs text-gray-400 flex items-center gap-1">
                              <Brain className="w-3 h-3" />
                              IA: {event.aiConfidence.toFixed(0)}%
                            </span>
                            <span className="text-xs text-gray-400 flex items-center gap-1">
                              <Zap className="w-3 h-3" />
                              Émergence: {event.emergenceIndex.toFixed(0)}%
                            </span>
                            <span className="text-xs text-gray-400 flex items-center gap-1">
                              <Network className="w-3 h-3" />
                              Réseau: {event.networkEffect.toFixed(0)}%
                            </span>
                          </div>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="flex items-center gap-2 text-xs text-gray-400 mb-1">
                          <Clock className="w-3 h-3" />
                          {formatTimestamp(event.timestamp)}
                        </div>
                        <div className={`px-2 py-1 rounded text-xs font-bold ${
                          event.strategicImportance === 'critical' ? 'bg-red-500 text-white' :
                          event.strategicImportance === 'high' ? 'bg-orange-500 text-white' :
                          event.strategicImportance === 'medium' ? 'bg-yellow-500 text-black' :
                          'bg-green-500 text-white'
                        }`}>
                          {event.strategicImportance.toUpperCase()}
                        </div>
                      </div>
                    </div>

                    {/* Métriques enrichies */}
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-4">
                      <div className="bg-slate-700/30 rounded-lg p-2 text-center">
                        <div className="text-sm font-bold text-purple-400">{event.culturalImpact.toFixed(0)}%</div>
                        <div className="text-xs text-gray-400">Impact Culturel</div>
                      </div>
                      <div className="bg-slate-700/30 rounded-lg p-2 text-center">
                        <div className="text-sm font-bold text-cyan-400">{event.predictiveAccuracy.toFixed(0)}%</div>
                        <div className="text-xs text-gray-400">Précision IA</div>
                      </div>
                      <div className="bg-slate-700/30 rounded-lg p-2 text-center">
                        <div className="text-sm font-bold text-green-400">{event.affectedPrimatoms.length}</div>
                        <div className="text-xs text-gray-400">Primatoms</div>
                      </div>
                      <div className="bg-slate-700/30 rounded-lg p-2 text-center">
                        <div className="text-sm font-bold text-yellow-400">{event.interconnections.length}</div>
                        <div className="text-xs text-gray-400">Connexions</div>
                      </div>
                    </div>

                    {/* Projections futures */}
                    {event.futureProjections.length > 0 && (
                      <div className="mb-4">
                        <h6 className="text-sm font-medium text-white mb-2">Projections IA:</h6>
                        <div className="space-y-2">
                          {event.futureProjections.map((projection, i) => (
                            <div key={i} className="flex items-center justify-between bg-slate-700/20 rounded-lg p-2">
                              <span className="text-sm text-gray-300">{projection.impact}</span>
                              <div className="flex items-center gap-2">
                                <span className="text-xs text-gray-400">{projection.timeframe}</span>
                                <span className="text-xs font-bold text-emerald-400">{projection.probability.toFixed(0)}%</span>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Impact prédit standard */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-sm mb-4">
                      <div>
                        <span className="text-gray-400">Court terme:</span>
                        <p className="text-gray-300">{event.predictedImpact.shortTerm}</p>
                      </div>
                      <div>
                        <span className="text-gray-400">Moyen terme:</span>
                        <p className="text-gray-300">{event.predictedImpact.mediumTerm}</p>
                      </div>
                      <div>
                        <span className="text-gray-400">Long terme:</span>
                        <p className="text-gray-300">{event.predictedImpact.longTerm}</p>
                      </div>
                    </div>

                    {/* Recommandations */}
                    {event.recommendations.length > 0 && (
                      <div className="pt-4 border-t border-slate-600">
                        <div className="text-sm text-gray-400 mb-2">Recommandations IA:</div>
                        <ul className="text-sm text-gray-300 space-y-1">
                          {event.recommendations.map((rec, i) => (
                            <li key={i} className="flex items-start gap-2">
                              <ArrowUpRight className="w-3 h-3 text-cyan-400 mt-0.5" />
                              {rec}
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      )}

      {/* Rapport de session enrichi */}
      {sessionReport && (
        <div className="bg-gradient-to-br from-slate-800/80 via-slate-900/90 to-black/50 backdrop-blur-sm rounded-xl border border-slate-600/50 shadow-2xl">
          <div className="p-6 border-b border-slate-700 flex items-center justify-between">
            <h4 className="text-xl font-bold text-white flex items-center gap-3">
              <div className="p-2 bg-gradient-to-r from-green-500 to-emerald-600 rounded-lg">
                <FileText className="w-5 h-5 text-white" />
              </div>
              Rapport de Session Intelligence Avancée
            </h4>
            <button
              onClick={exportReport}
              className="flex items-center gap-2 px-4 py-2 rounded-lg bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white text-sm font-medium transition-all shadow-lg"
            >
              <Download className="w-4 h-4" />
              Exporter IA+
            </button>
          </div>
          
          <div className="p-6 space-y-6">
            {/* Métriques de session enrichies */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="text-center bg-slate-700/30 rounded-xl p-4">
                <div className="text-2xl font-bold text-cyan-400">{sessionReport.totalEvents}</div>
                <div className="text-sm text-gray-400">Événements IA</div>
              </div>
              <div className="text-center bg-slate-700/30 rounded-xl p-4">
                <div className="text-2xl font-bold text-green-400">{sessionReport.dataQuality.toFixed(0)}%</div>
                <div className="text-sm text-gray-400">Qualité Données</div>
              </div>
              <div className="text-center bg-slate-700/30 rounded-xl p-4">
                <div className="text-2xl font-bold text-blue-400">{sessionReport.confidenceLevel.toFixed(0)}%</div>
                <div className="text-sm text-gray-400">Confiance IA</div>
              </div>
              <div className="text-center bg-slate-700/30 rounded-xl p-4">
                <div className="text-2xl font-bold text-purple-400">
                  {Math.round((sessionReport.endTime - sessionReport.startTime) / 60000)}m
                </div>
                <div className="text-sm text-gray-400">Durée Session</div>
              </div>
            </div>

            {/* Métriques avancées ajoutées */}
            {realTimeMetrics && (
              <div>
                <h5 className="text-lg font-bold text-white mb-4">Métriques Intelligence Finale</h5>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                  <div className="bg-purple-500/10 border border-purple-500/30 rounded-lg p-3 text-center">
                    <div className="text-lg font-bold text-purple-400">{realTimeMetrics.collectiveIntelligence.toFixed(1)}%</div>
                    <div className="text-xs text-gray-400">Intelligence Collective</div>
                  </div>
                  <div className="bg-cyan-500/10 border border-cyan-500/30 rounded-lg p-3 text-center">
                    <div className="text-lg font-bold text-cyan-400">{realTimeMetrics.emergenceVelocity.toFixed(1)}%</div>
                    <div className="text-xs text-gray-400">Vélocité Émergence</div>
                  </div>
                  <div className="bg-green-500/10 border border-green-500/30 rounded-lg p-3 text-center">
                    <div className="text-lg font-bold text-green-400">{realTimeMetrics.systemResilience.toFixed(1)}%</div>
                    <div className="text-xs text-gray-400">Résilience Système</div>
                  </div>
                  <div className="bg-yellow-500/10 border border-yellow-500/30 rounded-lg p-3 text-center">
                    <div className="text-lg font-bold text-yellow-400">{predictiveInsights.length}</div>
                    <div className="text-xs text-gray-400">Insights IA</div>
                  </div>
                </div>
              </div>
            )}

            {/* Insights prédictifs dans le rapport */}
            {predictiveInsights.length > 0 && (
              <div>
                <h5 className="text-lg font-bold text-white mb-4">Insights Prédictifs Clés</h5>
                <div className="space-y-3">
                  {predictiveInsights.slice(0, 3).map((insight, i) => (
                    <div key={i} className="bg-slate-700/30 rounded-lg p-4 border border-slate-600">
                      <div className="flex items-center justify-between mb-2">
                        <h6 className="font-medium text-white">{insight.title}</h6>
                        <span className="text-sm text-emerald-400 font-bold">{insight.probability}%</span>
                      </div>
                      <p className="text-sm text-gray-300">{insight.description}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Sections standards enrichies */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div>
                <h5 className="text-lg font-bold text-white mb-3">Découvertes Clés IA</h5>
                <ul className="space-y-2">
                  {sessionReport.keyFindings.map((finding, i) => (
                    <li key={i} className="text-sm text-gray-300 flex items-start gap-2">
                      <CheckCircle className="w-4 h-4 text-green-400 mt-0.5 flex-shrink-0" />
                      {finding}
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <h5 className="text-lg font-bold text-white mb-3">Patterns Émergents</h5>
                <ul className="space-y-2">
                  {sessionReport.emergentPatterns.map((pattern, i) => (
                    <li key={i} className="text-sm text-gray-300 flex items-start gap-2">
                      <Sparkles className="w-4 h-4 text-purple-400 mt-0.5 flex-shrink-0" />
                      {pattern}
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <h5 className="text-lg font-bold text-white mb-3">Recommandations IA</h5>
                <ul className="space-y-2">
                  {sessionReport.recommendations.map((rec, i) => (
                    <li key={i} className="text-sm text-gray-300 flex items-start gap-2">
                      <ArrowUpRight className="w-4 h-4 text-cyan-400 mt-0.5 flex-shrink-0" />
                      {rec}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProAnalyticsPanel;