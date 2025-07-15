import React, { useState, useEffect, useRef } from 'react';
import { AnalysisEvent, SessionReport, PoliSynthCore } from '../engine/PoliSynthCore';
import { SimulationState, Primatom, Coalition } from '../types';
import { SocialDynamicsEngine } from '../engine/SocialDynamicsEngine';
import { 
  Activity, AlertTriangle, TrendingUp, FileText, Download, Filter, Search, Clock, Target, Brain, Users,
  BarChart3, LineChart, PieChart, Zap, Eye, Network, Gauge, Sparkles, Cpu, Globe, ArrowUpRight,
  TrendingDown, RefreshCw, Play, Pause, SkipForward, Rewind, Settings, Maximize2, Minimize2,
  ChevronDown, ChevronUp, Star, Crown, Gem, Flame, Info, CheckCircle, AlertCircle, XCircle,
  Layers, Shield, Waves, Radar, Binary, Database, Workflow, GitBranch, Compass
} from 'lucide-react';

interface ProAnalyticsPanelProps {
  state: SimulationState;
  poliSynthCore: PoliSynthCore;
  socialEngine?: SocialDynamicsEngine; // Nouvelle intégration directe
  realtimeInsights?: any;
  culturalTrends?: any[];
}

interface LiveAdvancedMetrics {
  // Métriques temps réel du SocialDynamicsEngine
  collectiveIntelligence: number;
  emergenceIndex: number;
  culturalVelocity: number;
  socialCoherence: number;
  stabilityTrend: 'rising' | 'stable' | 'declining' | 'volatile';
  coalitionFormationRate: number;
  innovationMomentum: number;
  adaptabilityScore: number;
  networkDensity: number;
  influenceDistribution: number;
  communicationEfficiency: number;
  trustPropagation: number;
  culturalSynchronization: number;
  behavioralComplexity: number;
  systemResilience: number;
  evolutionaryPressure: number;
  
  // Métriques dérivées
  emergenceVelocity: number;
  systemStability: number;
  disruptionLevel: number;
  culturalStability: number;
  resilience: number;
  cooperation: number;
  innovation: number;
  trustNetwork: number;
  governance: number;
  emergentBehaviors: number;
}

interface RealTimeEvent {
  id: string;
  timestamp: number;
  type: 'coalition_formation' | 'disruption_trigger' | 'behavior_shift' | 'innovation_emergence' | 
        'conflict_resolution' | 'cultural_evolution' | 'territorial_expansion' | 'alliance_break' | 
        'leadership_change' | 'norm_adaptation';
  severity: 'low' | 'medium' | 'high' | 'critical';
  title: string;
  description: string;
  affectedPrimatoms: string[];
  metrics: any;
  predictedImpact: {
    shortTerm: string;
    mediumTerm: string;
    longTerm: string;
  };
  recommendations: string[];
  
  // Enrichissements IA
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

interface LivePredictiveInsight {
  id: string;
  type: 'opportunity' | 'risk' | 'trend' | 'anomaly' | 'breakthrough' | 'pattern' | 'emergence';
  priority: 'low' | 'medium' | 'high' | 'urgent' | 'critical';
  title: string;
  description: string;
  probability: number;
  timeframe: 'immediate' | 'short' | 'medium' | 'long';
  impactLevel: number;
  actionRequired: boolean;
  recommendations: string[];
  relatedEvents: string[];
  aiGenerated: boolean;
  confidence: number;
  source: 'engine' | 'analysis' | 'pattern' | 'prediction';
  emergenceLevel: number;
}

interface LiveSystemSnapshot {
  timestamp: number;
  population: {
    total: number;
    byBehavior: Record<string, number>;
    avgMetrics: {
      trust: number;
      cooperation: number;
      innovation: number;
      energy: number;
      stress: number;
      adaptability: number;
    };
  };
  coalitions: {
    count: number;
    avgCohesion: number;
    avgSize: number;
    formation: number;
    dissolution: number;
    territories: number;
  };
  emergentPhenomena: string[];
  disruptions: {
    active: number;
    avgIntensity: number;
    types: string[];
  };
  predictions: {
    stability: number;
    growth: number;
    innovation: number;
    conflict: number;
  };
}

const ProAnalyticsPanel: React.FC<ProAnalyticsPanelProps> = ({ 
  state, 
  poliSynthCore, 
  socialEngine,
  realtimeInsights,
  culturalTrends 
}) => {
  // États principaux
  const [liveMetrics, setLiveMetrics] = useState<LiveAdvancedMetrics | null>(null);
  const [liveEvents, setLiveEvents] = useState<RealTimeEvent[]>([]);
  const [liveInsights, setLiveInsights] = useState<LivePredictiveInsight[]>([]);
  const [systemSnapshot, setSystemSnapshot] = useState<LiveSystemSnapshot | null>(null);
  
  // États de filtrage et contrôle
  const [filteredEvents, setFilteredEvents] = useState<RealTimeEvent[]>([]);
  const [selectedEventType, setSelectedEventType] = useState<string>('all');
  const [selectedSeverity, setSelectedSeverity] = useState<string>('all');
  const [selectedInsightType, setSelectedInsightType] = useState<string>('all');
  const [searchTerm, setSearchTerm] = useState('');
  
  // États de configuration
  const [autoRefresh, setAutoRefresh] = useState(true);
  const [refreshInterval, setRefreshInterval] = useState(1000); // 1 seconde pour démo live
  const [analysisDepth, setAnalysisDepth] = useState<'basic' | 'advanced' | 'deep'>('deep');
  const [aiAnalysisEnabled, setAiAnalysisEnabled] = useState(true);
  const [predictiveMode, setPredictiveMode] = useState<'conservative' | 'balanced' | 'aggressive'>('balanced');
  
  // États d'interface
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [viewMode, setViewMode] = useState<'dashboard' | 'timeline' | 'network' | 'heatmap' | 'insights'>('dashboard');
  const [expandedSections, setExpandedSections] = useState({
    metrics: true,
    insights: true,
    events: true,
    predictions: true,
    system: true
  });

  // États pour session report
  const [sessionReport, setSessionReport] = useState<SessionReport | null>(null);
  
  // Refs pour intervalles
  const analysisInterval = useRef<NodeJS.Timeout | null>(null);
  const predictionInterval = useRef<NodeJS.Timeout | null>(null);

  // Effet principal pour l'analyse en temps réel
  useEffect(() => {
    if (autoRefresh && socialEngine) {
      analysisInterval.current = setInterval(() => {
        performLiveAnalysis();
      }, refreshInterval);

      return () => {
        if (analysisInterval.current) clearInterval(analysisInterval.current);
      };
    }
  }, [autoRefresh, refreshInterval, socialEngine, analysisDepth]);

  // Effet pour les prédictions IA
  useEffect(() => {
    if (aiAnalysisEnabled && socialEngine) {
      predictionInterval.current = setInterval(() => {
        generateLivePredictions();
      }, refreshInterval * 3); // Prédictions moins fréquentes

      return () => {
        if (predictionInterval.current) clearInterval(predictionInterval.current);
      };
    }
  }, [aiAnalysisEnabled, socialEngine, refreshInterval, predictiveMode]);

  // Analyse initiale
  useEffect(() => {
    if (socialEngine && state.primatoms.length > 0) {
      performLiveAnalysis();
      generateLivePredictions();
    }
  }, [socialEngine, state.primatoms.length]);

  // Analyse en temps réel avec le SocialDynamicsEngine
  const performLiveAnalysis = async () => {
    if (!socialEngine) return;
    
    setIsAnalyzing(true);
    
    try {
      // Récupération des métriques avancées du SocialDynamicsEngine
      const engineMetrics = socialEngine.getAdvancedMetrics();
      const realtimeData = socialEngine.getRealtimeInsights();
      
      if (engineMetrics) {
        setLiveMetrics(engineMetrics);
      }
      
      // Génération d'événements basés sur l'état réel
      const newEvents = await generateRealTimeEvents();
      setLiveEvents(prev => {
        const combined = [...prev, ...newEvents];
        return combined.slice(-50); // Garder les 50 derniers événements
      });
      
      // Snapshot du système
      const snapshot = generateSystemSnapshot();
      setSystemSnapshot(snapshot);
      
    } catch (error) {
      console.error('Erreur lors de l\'analyse live:', error);
    } finally {
      setIsAnalyzing(false);
    }
  };

  // Génération d'événements temps réel basés sur l'état du système
  const generateRealTimeEvents = async (): Promise<RealTimeEvent[]> => {
    const events: RealTimeEvent[] = [];
    const currentTime = Date.now();
    
    // Événements de formation de coalitions
    const recentCoalitions = state.coalitions.filter(c => 
      currentTime - c.created < refreshInterval * 2
    );
    
    recentCoalitions.forEach(coalition => {
      const members = state.primatoms.filter(p => p.coalition === coalition.id);
      const event: RealTimeEvent = {
        id: `coalition-${coalition.id}-${currentTime}`,
        timestamp: currentTime,
        type: 'coalition_formation',
        severity: coalition.members.length > 10 ? 'high' : coalition.members.length > 5 ? 'medium' : 'low',
        title: `Formation: ${coalition.name}`,
        description: `Nouvelle coalition "${coalition.name}" formée avec ${coalition.members.length} membres (cohésion: ${coalition.cohesion.toFixed(1)}%)`,
        affectedPrimatoms: coalition.members,
        metrics: {
          cohesion: coalition.cohesion,
          memberCount: coalition.members.length,
          avgTrust: members.reduce((sum, p) => sum + p.trust, 0) / members.length,
          territorySize: calculateCoalitionTerritory(coalition)
        },
        predictedImpact: {
          shortTerm: `Stabilisation locale dans un rayon de ${Math.round(Math.sqrt(coalition.members.length) * 20)}px`,
          mediumTerm: `Influence sur ${Math.round(coalition.members.length * 1.5)} Primatoms voisins`,
          longTerm: coalition.cohesion > 80 ? 'Formation possible de méga-structure' : 'Évolution vers spécialisation'
        },
        recommendations: generateCoalitionRecommendations(coalition),
        aiConfidence: 85 + Math.random() * 12,
        emergenceIndex: calculateEventEmergence('coalition_formation', coalition.members.length),
        culturalImpact: coalition.cohesion * 0.8,
        networkEffect: calculateNetworkEffect(coalition.members),
        predictiveAccuracy: 78 + Math.random() * 15,
        strategicImportance: coalition.members.length > 15 ? 'critical' : 
                           coalition.members.length > 10 ? 'high' : 
                           coalition.members.length > 5 ? 'medium' : 'low',
        interconnections: findCoalitionInterconnections(coalition.id),
        futureProjections: generateCoalitionProjections(coalition)
      };
      events.push(event);
    });

    // Événements d'innovation
    const innovators = state.primatoms.filter(p => p.innovation > 85 && p.behaviorType === 'innovator');
    if (innovators.length > 0 && Math.random() < 0.3) {
      const innovator = innovators[Math.floor(Math.random() * innovators.length)];
      const nearbyPrimatoms = state.primatoms.filter(p => 
        distance(innovator, p) < 80 && p.id !== innovator.id
      );
      
      const event: RealTimeEvent = {
        id: `innovation-${innovator.id}-${currentTime}`,
        timestamp: currentTime,
        type: 'innovation_emergence',
        severity: innovator.innovation > 95 ? 'critical' : 'high',
        title: `Percée Innovation: ${innovator.name}`,
        description: `${innovator.name} génère une innovation majeure (niveau ${innovator.innovation.toFixed(1)}) influençant ${nearbyPrimatoms.length} Primatoms`,
        affectedPrimatoms: [innovator.id, ...nearbyPrimatoms.slice(0, 8).map(p => p.id)],
        metrics: {
          innovationLevel: innovator.innovation,
          radiusInfluence: 80,
          affectedCount: nearbyPrimatoms.length,
          propagationSpeed: innovator.energy * 0.1
        },
        predictedImpact: {
          shortTerm: `Boost d'innovation de +${Math.round(innovator.innovation * 0.1)} pour les Primatoms proches`,
          mediumTerm: `Propagation vers ${Math.round(nearbyPrimatoms.length * 1.5)} autres Primatoms`,
          longTerm: 'Catalyseur potentiel de Renaissance Cognitive'
        },
        recommendations: [
          'Faciliter la diffusion de l\'innovation',
          'Créer des canaux de communication optimisés',
          'Surveiller l\'adoption par les coalitions voisines'
        ],
        aiConfidence: 92,
        emergenceIndex: innovator.innovation,
        culturalImpact: innovator.innovation * 0.7,
        networkEffect: nearbyPrimatoms.length * 2,
        predictiveAccuracy: 85,
        strategicImportance: 'critical',
        interconnections: nearbyPrimatoms.slice(0, 3).map(p => p.id),
        futureProjections: [
          { probability: 85, timeframe: '2-5 minutes', impact: 'Adoption par Primatoms voisins' },
          { probability: 65, timeframe: '5-10 minutes', impact: 'Intégration dans coalitions' },
          { probability: 40, timeframe: '10-20 minutes', impact: 'Émergence de nouveaux patterns' }
        ]
      };
      events.push(event);
    }

    // Événements de disruption
    if (state.activeDisruptions && state.activeDisruptions.length > 0) {
      state.activeDisruptions.forEach(disruption => {
        const affectedPrimatoms = state.primatoms.filter(p => 
          p.stressLevel && p.stressLevel > 60
        ).slice(0, 12);
        
        if (affectedPrimatoms.length > 3) {
          const event: RealTimeEvent = {
            id: `disruption-${disruption.id}-${currentTime}`,
            timestamp: currentTime,
            type: 'disruption_trigger',
            severity: disruption.intensity > 80 ? 'critical' : 
                     disruption.intensity > 60 ? 'high' : 
                     disruption.intensity > 40 ? 'medium' : 'low',
            title: `Disruption Active: ${disruption.type}`,
            description: `Disruption "${disruption.type}" (intensité ${disruption.intensity.toFixed(1)}) affecte ${affectedPrimatoms.length} Primatoms`,
            affectedPrimatoms: affectedPrimatoms.map(p => p.id),
            metrics: {
              intensity: disruption.intensity,
              duration: disruption.duration,
              stressLevel: affectedPrimatoms.reduce((sum, p) => sum + (p.stressLevel || 0), 0) / affectedPrimatoms.length,
              adaptationRate: affectedPrimatoms.reduce((sum, p) => sum + (p.adaptabilityScore || 50), 0) / affectedPrimatoms.length
            },
            predictedImpact: {
              shortTerm: `Augmentation du stress de ${Math.round(disruption.intensity * 0.3)}% pour les Primatoms affectés`,
              mediumTerm: `Possible formation de ${Math.ceil(affectedPrimatoms.length / 8)} coalitions défensives`,
              longTerm: 'Renforcement de la résilience systémique ou fragmentation'
            },
            recommendations: [
              'Activer protocoles de résilience',
              'Faciliter formation coalitions de soutien',
              'Surveiller propagation du stress'
            ],
            aiConfidence: 88,
            emergenceIndex: disruption.intensity * 0.6,
            culturalImpact: disruption.intensity * 0.5,
            networkEffect: affectedPrimatoms.length * 1.5,
            predictiveAccuracy: 82,
            strategicImportance: disruption.intensity > 70 ? 'critical' : 'high',
            interconnections: affectedPrimatoms.slice(0, 4).map(p => p.id),
            futureProjections: [
              { probability: 75, timeframe: '1-3 minutes', impact: 'Propagation du stress' },
              { probability: 55, timeframe: '5-8 minutes', impact: 'Réponses adaptatives' },
              { probability: 35, timeframe: '10-15 minutes', impact: 'Stabilisation ou escalade' }
            ]
          };
          events.push(event);
        }
      });
    }

    // Événements culturels basés sur l'évolution
    if (state.emergentPhenomena && state.emergentPhenomena.length > 0) {
      state.emergentPhenomena.forEach(phenomenon => {
        const event: RealTimeEvent = {
          id: `culture-${phenomenon.replace(/\s+/g, '-')}-${currentTime}`,
          timestamp: currentTime,
          type: 'cultural_evolution',
          severity: 'medium',
          title: `Phénomène Émergent: ${phenomenon}`,
          description: `Détection du phénomène émergent: "${phenomenon}"`,
          affectedPrimatoms: state.primatoms.slice(0, Math.floor(state.primatoms.length * 0.3)).map(p => p.id),
          metrics: {
            emergenceLevel: 75 + Math.random() * 20,
            culturalSynchronization: calculateCulturalSync(),
            populationCoverage: 0.3
          },
          predictedImpact: {
            shortTerm: 'Synchronisation culturelle accrue',
            mediumTerm: 'Émergence de nouvelles normes collectives',
            longTerm: 'Évolution paradigmatique possible'
          },
          recommendations: [
            'Documenter l\'évolution culturelle',
            'Faciliter l\'adoption progressive',
            'Surveiller la résistance au changement'
          ],
          aiConfidence: 78,
          emergenceIndex: 85,
          culturalImpact: 90,
          networkEffect: state.primatoms.length * 0.3,
          predictiveAccuracy: 72,
          strategicImportance: 'high',
          interconnections: [],
          futureProjections: [
            { probability: 70, timeframe: '5-10 minutes', impact: 'Adoption par nouvelles coalitions' },
            { probability: 50, timeframe: '15-30 minutes', impact: 'Intégration dans normes globales' }
          ]
        };
        events.push(event);
      });
    }

    return events;
  };

  // Génération de prédictions IA avancées
  const generateLivePredictions = async () => {
    if (!socialEngine || !liveMetrics) return;

    const insights: LivePredictiveInsight[] = [];
    const currentTime = Date.now();
    
    // Prédiction basée sur l'intelligence collective
    if (liveMetrics.collectiveIntelligence > 85) {
      insights.push({
        id: `ci-breakthrough-${currentTime}`,
        type: 'breakthrough',
        priority: 'critical',
        title: 'Seuil d\'Intelligence Collective Critique',
        description: `Intelligence collective à ${liveMetrics.collectiveIntelligence.toFixed(1)}% - Point de bascule imminent vers superintelligence émergente`,
        probability: 94,
        timeframe: 'immediate',
        impactLevel: 98,
        actionRequired: true,
        recommendations: [
          'Synchroniser immédiatement les canaux de communication',
          'Préparer l\'infrastructure pour l\'émergence',
          'Documenter en temps réel pour la science',
          'Faciliter la convergence cognitive'
        ],
        relatedEvents: liveEvents.filter(e => e.type === 'innovation_emergence').map(e => e.id).slice(-3),
        aiGenerated: true,
        confidence: 96,
        source: 'analysis',
        emergenceLevel: liveMetrics.collectiveIntelligence
      });
    }

    // Prédiction basée sur la vélocité d'émergence
    if (liveMetrics.emergenceVelocity > 75) {
      insights.push({
        id: `emergence-cascade-${currentTime}`,
        type: 'pattern',
        priority: 'high',
        title: 'Cascade d\'Émergence Accélérée',
        description: `Vélocité d'émergence à ${liveMetrics.emergenceVelocity.toFixed(1)}% - Cascade de phénomènes émergents en cours`,
        probability: 87,
        timeframe: 'short',
        impactLevel: 85,
        actionRequired: true,
        recommendations: [
          'Surveiller les points de convergence',
          'Anticiper les besoins en ressources',
          'Préparer les mécanismes d\'adaptation'
        ],
        relatedEvents: liveEvents.filter(e => e.emergenceIndex > 70).map(e => e.id).slice(-4),
        aiGenerated: true,
        confidence: 89,
        source: 'pattern',
        emergenceLevel: liveMetrics.emergenceVelocity
      });
    }

    // Prédiction basée sur la formation de coalitions
    if (liveMetrics.coalitionFormationRate > 30) {
      insights.push({
        id: `mega-structure-${currentTime}`,
        type: 'trend',
        priority: 'high',
        title: 'Émergence de Méga-Structures Sociales',
        description: `Taux de formation à ${liveMetrics.coalitionFormationRate.toFixed(1)}/h - Évolution vers super-organisations`,
        probability: 82,
        timeframe: 'medium',
        impactLevel: 90,
        actionRequired: true,
        recommendations: [
          'Préparer protocoles de gouvernance distribuée',
          'Anticiper les besoins de coordination',
          'Surveiller l\'équilibre des pouvoirs'
        ],
        relatedEvents: liveEvents.filter(e => e.type === 'coalition_formation').map(e => e.id).slice(-5),
        aiGenerated: true,
        confidence: 84,
        source: 'trend',
        emergenceLevel: liveMetrics.coalitionFormationRate
      });
    }

    // Prédiction basée sur la pression évolutionnaire
    if (liveMetrics.evolutionaryPressure > 70) {
      insights.push({
        id: `evolution-leap-${currentTime}`,
        type: 'opportunity',
        priority: 'medium',
        title: 'Saut Évolutionnaire Imminent',
        description: `Pression évolutionnaire à ${liveMetrics.evolutionaryPressure.toFixed(1)}% - Conditions optimales pour mutation comportementale`,
        probability: 76,
        timeframe: 'medium',
        impactLevel: 80,
        actionRequired: false,
        recommendations: [
          'Faciliter l\'expérimentation comportementale',
          'Créer des espaces d\'innovation sécurisés',
          'Documenter les mutations émergentes'
        ],
        relatedEvents: liveEvents.filter(e => e.type === 'behavior_shift').map(e => e.id).slice(-3),
        aiGenerated: true,
        confidence: 78,
        source: 'prediction',
        emergenceLevel: liveMetrics.evolutionaryPressure
      });
    }

    // Prédiction de risque basée sur la résilience
    if (liveMetrics.systemResilience < 60 && state.activeDisruptions && state.activeDisruptions.length > 0) {
      insights.push({
        id: `resilience-crisis-${currentTime}`,
        type: 'risk',
        priority: 'urgent',
        title: 'Alerte Résilience Systémique',
        description: `Résilience à ${liveMetrics.systemResilience.toFixed(1)}% avec ${state.activeDisruptions.length} disruptions actives - Risque de cascade d'échec`,
        probability: 85,
        timeframe: 'immediate',
        impactLevel: 92,
        actionRequired: true,
        recommendations: [
          'Activer immédiatement les protocoles d\'urgence',
          'Renforcer les coalitions stables',
          'Distribuer les ressources critiques',
          'Préparer les stratégies de récupération'
        ],
        relatedEvents: liveEvents.filter(e => e.type === 'disruption_trigger').map(e => e.id),
        aiGenerated: true,
        confidence: 91,
        source: 'analysis',
        emergenceLevel: 100 - liveMetrics.systemResilience
      });
    }

    // Anomalie basée sur la synchronisation culturelle
    if (liveMetrics.culturalSynchronization > 90) {
      insights.push({
        id: `sync-anomaly-${currentTime}`,
        type: 'anomaly',
        priority: 'medium',
        title: 'Hyper-Synchronisation Culturelle Détectée',
        description: `Synchronisation à ${liveMetrics.culturalSynchronization.toFixed(1)}% - Phénomène rare de convergence totale`,
        probability: 95,
        timeframe: 'immediate',
        impactLevel: 75,
        actionRequired: false,
        recommendations: [
          'Documenter ce phénomène exceptionnel',
          'Étudier les mécanismes de convergence',
          'Préserver la diversité cognitive'
        ],
        relatedEvents: liveEvents.filter(e => e.type === 'cultural_evolution').map(e => e.id),
        aiGenerated: true,
        confidence: 93,
        source: 'pattern',
        emergenceLevel: liveMetrics.culturalSynchronization
      });
    }

    setLiveInsights(prev => {
      const combined = [...prev, ...insights];
      return combined.slice(-15); // Garder les 15 insights les plus récents
    });
  };

  // Génération du snapshot système
  const generateSystemSnapshot = (): LiveSystemSnapshot => {
    const behaviorCounts = state.primatoms.reduce((acc, p) => {
      acc[p.behaviorType] = (acc[p.behaviorType] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);

    const avgMetrics = {
      trust: state.primatoms.reduce((sum, p) => sum + p.trust, 0) / state.primatoms.length,
      cooperation: state.primatoms.reduce((sum, p) => sum + p.cooperation, 0) / state.primatoms.length,
      innovation: state.primatoms.reduce((sum, p) => sum + p.innovation, 0) / state.primatoms.length,
      energy: state.primatoms.reduce((sum, p) => sum + p.energy, 0) / state.primatoms.length,
      stress: state.primatoms.reduce((sum, p) => sum + (p.stressLevel || 0), 0) / state.primatoms.length,
      adaptability: state.primatoms.reduce((sum, p) => sum + (p.adaptabilityScore || 50), 0) / state.primatoms.length
    };

    return {
      timestamp: Date.now(),
      population: {
        total: state.primatoms.length,
        byBehavior: behaviorCounts,
        avgMetrics
      },
      coalitions: {
        count: state.coalitions.length,
        avgCohesion: state.coalitions.reduce((sum, c) => sum + c.cohesion, 0) / Math.max(1, state.coalitions.length),
        avgSize: state.coalitions.reduce((sum, c) => sum + c.members.length, 0) / Math.max(1, state.coalitions.length),
        formation: liveEvents.filter(e => e.type === 'coalition_formation' && Date.now() - e.timestamp < 60000).length,
        dissolution: 0, // À implémenter si nécessaire
        territories: state.influenceZones?.length || 0
      },
      emergentPhenomena: state.emergentPhenomena || [],
      disruptions: {
        active: state.activeDisruptions?.length || 0,
        avgIntensity: state.activeDisruptions?.reduce((sum, d) => sum + d.intensity, 0) / Math.max(1, state.activeDisruptions?.length || 1) || 0,
        types: state.activeDisruptions?.map(d => d.type) || []
      },
      predictions: {
        stability: liveMetrics?.systemResilience || state.systemStability || 75,
        growth: liveMetrics?.coalitionFormationRate || 0,
        innovation: liveMetrics?.innovationMomentum || avgMetrics.innovation,
        conflict: avgMetrics.stress
      }
    };
  };

  // Fonctions utilitaires
  const distance = (p1: Primatom, p2: Primatom): number => {
    return Math.sqrt(Math.pow(p1.x - p2.x, 2) + Math.pow(p1.y - p2.y, 2));
  };

  const calculateCoalitionTerritory = (coalition: Coalition): number => {
    const members = state.primatoms.filter(p => p.coalition === coalition.id);
    if (members.length < 2) return 0;
    
    const centerX = members.reduce((sum, p) => sum + p.x, 0) / members.length;
    const centerY = members.reduce((sum, p) => sum + p.y, 0) / members.length;
    const maxDistance = Math.max(...members.map(p => distance(p, { x: centerX, y: centerY } as Primatom)));
    
    return Math.PI * maxDistance * maxDistance;
  };

  const generateCoalitionRecommendations = (coalition: Coalition): string[] => {
    const recommendations = [];
    
    if (coalition.cohesion > 80) {
      recommendations.push('Exploiter la forte cohésion pour l\'expansion');
      recommendations.push('Développer des compétences spécialisées');
    } else if (coalition.cohesion < 50) {
      recommendations.push('Renforcer les liens internes urgents');
      recommendations.push('Résoudre les conflits internes');
    }
    
    if (coalition.members.length > 15) {
      recommendations.push('Considérer la création de sous-groupes');
      recommendations.push('Implémenter une gouvernance distribuée');
    }
    
    return recommendations.slice(0, 3);
  };

  const calculateEventEmergence = (type: string, magnitude: number): number => {
    const baseEmergence = {
      'coalition_formation': 60,
      'innovation_emergence': 80,
      'disruption_trigger': 40,
      'cultural_evolution': 70,
      'behavior_shift': 55
    };
    
    return Math.min(100, (baseEmergence[type] || 50) + (magnitude * 2));
  };

  const calculateNetworkEffect = (affectedIds: string[]): number => {
    const affected = state.primatoms.filter(p => affectedIds.includes(p.id));
    const totalConnections = affected.reduce((sum, p) => sum + Object.keys(p.relationships).length, 0);
    return Math.min(100, totalConnections * 2);
  };

  const findCoalitionInterconnections = (coalitionId: string): string[] => {
    const coalition = state.coalitions.find(c => c.id === coalitionId);
    if (!coalition) return [];
    
    const members = state.primatoms.filter(p => p.coalition === coalitionId);
    const externalConnections = new Set<string>();
    
    members.forEach(member => {
      Object.keys(member.relationships).forEach(otherId => {
        const other = state.primatoms.find(p => p.id === otherId);
        if (other && other.coalition && other.coalition !== coalitionId) {
          externalConnections.add(other.coalition);
        }
      });
    });
    
    return Array.from(externalConnections).slice(0, 3);
  };

  const generateCoalitionProjections = (coalition: Coalition) => {
    return [
      {
        probability: Math.min(95, 60 + coalition.cohesion * 0.4),
        timeframe: '2-5 minutes',
        impact: `Expansion vers ${Math.ceil(coalition.members.length * 0.3)} nouveaux membres`
      },
      {
        probability: Math.min(85, 40 + coalition.cohesion * 0.5),
        timeframe: '5-15 minutes',
        impact: coalition.cohesion > 75 ? 'Spécialisation et leadership territorial' : 'Consolidation interne'
      },
      {
        probability: Math.min(70, 20 + coalition.cohesion * 0.6),
        timeframe: '15-30 minutes',
        impact: coalition.members.length > 10 ? 'Formation de méga-structure' : 'Alliance inter-coalitions'
      }
    ];
  };

  const calculateCulturalSync = (): number => {
    const culturalNorms = state.primatoms.flatMap(p => p.culturalNorms);
    const uniqueNorms = new Set(culturalNorms);
    const avgNormsPerPrimatom = culturalNorms.length / state.primatoms.length;
    
    return Math.min(100, (avgNormsPerPrimatom / uniqueNorms.size) * 100);
  };

  // Effets de filtrage
  useEffect(() => {
    let filtered = liveEvents;

    if (selectedEventType !== 'all') {
      filtered = filtered.filter(e => e.type === selectedEventType);
    }

    if (selectedSeverity !== 'all') {
      filtered = filtered.filter(e => e.severity === selectedSeverity);
    }

    if (searchTerm) {
      filtered = filtered.filter(e => 
        e.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        e.description.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    setFilteredEvents(filtered);
  }, [liveEvents, selectedEventType, selectedSeverity, searchTerm]);

  // Génération et export de rapport
  const generateSessionReport = () => {
    if (!socialEngine) return;
    
    const baseReport = poliSynthCore.generateSessionReport(state);
    const enhancedReport = {
      ...baseReport,
      liveMetrics,
      systemSnapshot,
      liveInsights: liveInsights.slice(-10),
      recentEvents: liveEvents.slice(-20),
      engineMetrics: socialEngine.getAdvancedMetrics(),
      realtimeData: socialEngine.getRealtimeInsights(),
      analysisDepth,
      refreshInterval,
      predictiveMode
    };
    
    setSessionReport(enhancedReport);
  };

  const exportReport = () => {
    if (!sessionReport) return;
    
    const dataStr = JSON.stringify(sessionReport, null, 2);
    const dataUri = 'data:application/json;charset=utf-8,'+ encodeURIComponent(dataStr);
    const exportFileDefaultName = `primatoms-live-analytics-${new Date().toISOString().split('T')[0]}.json`;
    
    const linkElement = document.createElement('a');
    linkElement.setAttribute('href', dataUri);
    linkElement.setAttribute('download', exportFileDefaultName);
    linkElement.click();
  };

  // Fonctions d'interface
  const getEventIcon = (type: RealTimeEvent['type']) => {
    const icons = {
      coalition_formation: <Users className="w-4 h-4" />,
      disruption_trigger: <AlertTriangle className="w-4 h-4" />,
      behavior_shift: <TrendingUp className="w-4 h-4" />,
      innovation_emergence: <Brain className="w-4 h-4" />,
      conflict_resolution: <Target className="w-4 h-4" />,
      cultural_evolution: <Globe className="w-4 h-4" />,
      territorial_expansion: <Compass className="w-4 h-4" />,
      alliance_break: <GitBranch className="w-4 h-4" />,
      leadership_change: <Crown className="w-4 h-4" />,
      norm_adaptation: <Workflow className="w-4 h-4" />
    };
    return icons[type] || <Activity className="w-4 h-4" />;
  };

  const getSeverityColor = (severity: RealTimeEvent['severity']) => {
    const colors = {
      critical: 'text-red-400 bg-red-500/20 border-red-500/30',
      high: 'text-orange-400 bg-orange-500/20 border-orange-500/30',
      medium: 'text-yellow-400 bg-yellow-500/20 border-yellow-500/30',
      low: 'text-green-400 bg-green-500/20 border-green-500/30'
    };
    return colors[severity];
  };

  const getInsightIcon = (type: LivePredictiveInsight['type']) => {
    const icons = {
      opportunity: <TrendingUp className="w-4 h-4 text-green-400" />,
      risk: <AlertTriangle className="w-4 h-4 text-red-400" />,
      trend: <BarChart3 className="w-4 h-4 text-blue-400" />,
      anomaly: <Zap className="w-4 h-4 text-yellow-400" />,
      breakthrough: <Sparkles className="w-4 h-4 text-purple-400" />,
      pattern: <Network className="w-4 h-4 text-cyan-400" />,
      emergence: <Layers className="w-4 h-4 text-pink-400" />
    };
    return icons[type] || <Info className="w-4 h-4 text-gray-400" />;
  };

  const getPriorityBadge = (priority: LivePredictiveInsight['priority']) => {
    const badges = {
      critical: { icon: <Flame className="w-3 h-3" />, text: 'CRITICAL', color: 'bg-red-600 text-white animate-pulse' },
      urgent: { icon: <AlertTriangle className="w-3 h-3" />, text: 'URGENT', color: 'bg-red-500 text-white' },
      high: { icon: <Crown className="w-3 h-3" />, text: 'HIGH', color: 'bg-orange-500 text-white' },
      medium: { icon: <Star className="w-3 h-3" />, text: 'MED', color: 'bg-yellow-500 text-black' },
      low: { icon: <Info className="w-3 h-3" />, text: 'LOW', color: 'bg-green-500 text-white' }
    };
    return badges[priority];
  };

  const getMetricIcon = (metric: keyof LiveAdvancedMetrics) => {
    const icons = {
      collectiveIntelligence: <Brain className="w-4 h-4 text-purple-400" />,
      emergenceVelocity: <Zap className="w-4 h-4 text-yellow-400" />,
      socialCoherence: <Users className="w-4 h-4 text-blue-400" />,
      innovationMomentum: <Sparkles className="w-4 h-4 text-pink-400" />,
      systemResilience: <Shield className="w-4 h-4 text-green-400" />,
      culturalSynchronization: <Globe className="w-4 h-4 text-cyan-400" />,
      networkDensity: <Network className="w-4 h-4 text-orange-400" />,
      adaptabilityScore: <Gauge className="w-4 h-4 text-emerald-400" />,
      emergenceIndex: <Layers className="w-4 h-4 text-purple-400" />,
      culturalVelocity: <Waves className="w-4 h-4 text-blue-400" />,
      stabilityTrend: <TrendingUp className="w-4 h-4 text-green-400" />,
      coalitionFormationRate: <Users className="w-4 h-4 text-cyan-400" />,
      influenceDistribution: <Radar className="w-4 h-4 text-yellow-400" />,
      communicationEfficiency: <Network className="w-4 h-4 text-orange-400" />,
      trustPropagation: <Waves className="w-4 h-4 text-green-400" />,
      behavioralComplexity: <Binary className="w-4 h-4 text-purple-400" />,
      evolutionaryPressure: <TrendingUp className="w-4 h-4 text-red-400" />
    };
    return icons[metric] || <Gauge className="w-4 h-4 text-gray-400" />;
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

  const getMetricTrend = (value: number): { color: string; icon: React.ReactNode } => {
    if (value > 80) return { color: 'text-green-400', icon: <TrendingUp className="w-3 h-3" /> };
    if (value > 60) return { color: 'text-blue-400', icon: <TrendingUp className="w-3 h-3" /> };
    if (value > 40) return { color: 'text-yellow-400', icon: <TrendingUp className="w-3 h-3" /> };
    return { color: 'text-red-400', icon: <TrendingDown className="w-3 h-3" /> };
  };

  // Options de configuration
  const eventTypes = [
    { value: 'all', label: 'Tous les événements' },
    { value: 'coalition_formation', label: 'Formation coalitions' },
    { value: 'innovation_emergence', label: 'Émergence innovations' },
    { value: 'disruption_trigger', label: 'Déclencheurs disruption' },
    { value: 'cultural_evolution', label: 'Évolution culturelle' },
    { value: 'behavior_shift', label: 'Changements comportements' },
    { value: 'territorial_expansion', label: 'Expansion territoriale' }
  ];

  const severityLevels = [
    { value: 'all', label: 'Toutes sévérités' },
    { value: 'critical', label: 'Critique' },
    { value: 'high', label: 'Élevée' },
    { value: 'medium', label: 'Moyenne' },
    { value: 'low', label: 'Faible' }
  ];

  const insightTypes = [
    { value: 'all', label: 'Tous insights' },
    { value: 'breakthrough', label: 'Percées' },
    { value: 'pattern', label: 'Patterns' },
    { value: 'trend', label: 'Tendances' },
    { value: 'opportunity', label: 'Opportunités' },
    { value: 'risk', label: 'Risques' },
    { value: 'anomaly', label: 'Anomalies' },
    { value: 'emergence', label: 'Émergences' }
  ];

  return (
    <div className="space-y-6">
      {/* Header de contrôle avancé */}
      <div className="bg-gradient-to-br from-slate-800/80 via-slate-900/90 to-black/50 backdrop-blur-sm rounded-xl p-6 border border-slate-600/50 shadow-2xl">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-gradient-to-r from-purple-500 via-cyan-500 to-blue-600 rounded-xl shadow-lg">
              <Database className="w-8 h-8 text-white animate-pulse" />
            </div>
            <div>
              <h3 className="text-2xl font-bold bg-gradient-to-r from-purple-400 via-cyan-400 to-blue-400 bg-clip-text text-transparent">
                Intelligence Analytique Live • Social Engine
              </h3>
              <p className="text-slate-400 text-sm">
                Mode Professionnel • IA Temps Réel • {analysisDepth.toUpperCase()} • 
                {liveEvents.length} événements • {liveInsights.length} insights live
                {socialEngine && <span className="text-green-400 ml-2">• CONNECTÉ</span>}
              </p>
            </div>
          </div>
          
          <div className="flex items-center gap-3">
            {isAnalyzing && (
              <div className="flex items-center gap-2 px-3 py-2 bg-purple-500/20 rounded-lg border border-purple-500/30">
                <Database className="w-4 h-4 text-purple-400 animate-spin" />
                <span className="text-purple-400 text-sm font-medium">Analyse Live...</span>
              </div>
            )}
            
            <div className="flex items-center gap-2 px-3 py-2 bg-slate-700/50 rounded-lg border border-slate-600">
              <RefreshCw className="w-4 h-4 text-cyan-400" />
              <span className="text-cyan-400 text-sm">{refreshInterval}ms</span>
            </div>
            
            <button
              onClick={() => setAutoRefresh(!autoRefresh)}
              className={`px-3 py-2 rounded-lg text-sm font-medium transition-all ${
                autoRefresh 
                  ? 'bg-green-500/20 text-green-400 border border-green-500/30' 
                  : 'bg-slate-700 text-gray-400 border border-slate-600'
              }`}
            >
              {autoRefresh ? <Play className="w-4 h-4" /> : <Pause className="w-4 h-4" />}
              LIVE
            </button>
            
            <button
              onClick={generateSessionReport}
              className="flex items-center gap-2 px-4 py-2 rounded-lg bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white text-sm font-medium transition-all shadow-lg"
            >
              <FileText className="w-4 h-4" />
              Rapport Live
            </button>
          </div>
        </div>

        {/* Contrôles avancés */}
        <div className="grid grid-cols-1 md:grid-cols-7 gap-3">
          <div className="relative">
            <Search className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Recherche live..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-3 py-2 bg-slate-700/50 border border-slate-600 rounded-lg text-white placeholder-gray-400 focus:border-cyan-500 focus:outline-none text-sm backdrop-blur-sm"
            />
          </div>
          
          <select
            value={refreshInterval}
            onChange={(e) => setRefreshInterval(Number(e.target.value))}
            className="px-3 py-2 bg-slate-700/50 border border-slate-600 rounded-lg text-white focus:border-cyan-500 focus:outline-none text-sm backdrop-blur-sm"
          >
            <option value={500}>500ms</option>
            <option value={1000}>1s</option>
            <option value={2000}>2s</option>
            <option value={5000}>5s</option>
          </select>

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
            value={predictiveMode}
            onChange={(e) => setPredictiveMode(e.target.value as any)}
            className="px-3 py-2 bg-slate-700/50 border border-slate-600 rounded-lg text-white focus:border-cyan-500 focus:outline-none text-sm backdrop-blur-sm"
          >
            <option value="conservative">Prédiction Conservative</option>
            <option value="balanced">Prédiction Équilibrée</option>
            <option value="aggressive">Prédiction Agressive</option>
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

          <div className="text-sm text-gray-400 flex items-center gap-2 px-3 py-2">
            <Eye className="w-4 h-4" />
            {filteredEvents.length} / {liveEvents.length}
          </div>
        </div>
      </div>

      {/* Snapshot système temps réel */}
      {systemSnapshot && expandedSections.system && (
        <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl p-6 border border-slate-700 shadow-xl">
          <div className="flex items-center justify-between mb-6">
            <h4 className="text-xl font-bold text-white flex items-center gap-3">
              <div className="p-2 bg-gradient-to-r from-green-500 to-emerald-600 rounded-lg">
                <Radar className="w-5 h-5 text-white" />
              </div>
              Snapshot Système Live
              <span className="px-3 py-1 bg-green-500/20 text-green-400 text-sm font-bold rounded-full animate-pulse">
                TEMPS RÉEL
              </span>
            </h4>
            <button
              onClick={() => toggleSection('system')}
              className="p-2 hover:bg-slate-700 rounded-lg transition-colors"
            >
              {expandedSections.system ? <ChevronUp className="w-4 h-4 text-gray-400" /> : <ChevronDown className="w-4 h-4 text-gray-400" />}
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {/* Population */}
            <div className="bg-gradient-to-br from-slate-700/50 to-slate-800/50 rounded-xl p-4 border border-slate-600">
              <h5 className="text-sm font-medium text-white mb-3 flex items-center gap-2">
                <Users className="w-4 h-4 text-blue-400" />
                Population
              </h5>
              <div className="text-2xl font-bold text-white mb-2">{systemSnapshot.population.total}</div>
              <div className="space-y-1">
                {Object.entries(systemSnapshot.population.byBehavior).map(([type, count]) => (
                  <div key={type} className="flex justify-between text-sm">
                    <span className="text-gray-400 capitalize">{type}:</span>
                    <span className="text-white font-medium">{count}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Coalitions */}
            <div className="bg-gradient-to-br from-slate-700/50 to-slate-800/50 rounded-xl p-4 border border-slate-600">
              <h5 className="text-sm font-medium text-white mb-3 flex items-center gap-2">
                <Network className="w-4 h-4 text-purple-400" />
                Coalitions
              </h5>
              <div className="text-2xl font-bold text-white mb-2">{systemSnapshot.coalitions.count}</div>
              <div className="space-y-1 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-400">Cohésion moy.:</span>
                  <span className="text-white font-medium">{systemSnapshot.coalitions.avgCohesion.toFixed(1)}%</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Taille moy.:</span>
                  <span className="text-white font-medium">{systemSnapshot.coalitions.avgSize.toFixed(1)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Territoires:</span>
                  <span className="text-white font-medium">{systemSnapshot.coalitions.territories}</span>
                </div>
              </div>
            </div>

            {/* Métriques moyennes */}
            <div className="bg-gradient-to-br from-slate-700/50 to-slate-800/50 rounded-xl p-4 border border-slate-600">
              <h5 className="text-sm font-medium text-white mb-3 flex items-center gap-2">
                <BarChart3 className="w-4 h-4 text-cyan-400" />
                Métriques Moyennes
              </h5>
              <div className="space-y-2">
                {Object.entries(systemSnapshot.population.avgMetrics).map(([metric, value]) => {
                  const trend = getMetricTrend(value);
                  return (
                    <div key={metric} className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className={`text-xs ${trend.color}`}>{trend.icon}</span>
                        <span className="text-gray-400 text-sm capitalize">{metric}:</span>
                      </div>
                      <span className={`font-medium text-sm ${trend.color}`}>{value.toFixed(1)}</span>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Prédictions */}
            <div className="bg-gradient-to-br from-slate-700/50 to-slate-800/50 rounded-xl p-4 border border-slate-600">
              <h5 className="text-sm font-medium text-white mb-3 flex items-center gap-2">
                <Brain className="w-4 h-4 text-pink-400" />
                Prédictions IA
              </h5>
              <div className="space-y-2">
                {Object.entries(systemSnapshot.predictions).map(([pred, value]) => {
                  const trend = getMetricTrend(value);
                  return (
                    <div key={pred} className="flex items-center justify-between">
                      <span className="text-gray-400 text-sm capitalize">{pred}:</span>
                      <div className="flex items-center gap-1">
                        <span className={`font-medium text-sm ${trend.color}`}>{value.toFixed(1)}</span>
                        <span className={`text-xs ${trend.color}`}>{trend.icon}</span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Phénomènes émergents */}
          {systemSnapshot.emergentPhenomena.length > 0 && (
            <div className="mt-6 p-4 bg-purple-500/10 border border-purple-500/30 rounded-lg">
              <h6 className="text-sm font-medium text-purple-400 mb-2 flex items-center gap-2">
                <Sparkles className="w-4 h-4" />
                Phénomènes Émergents Actifs
              </h6>
              <div className="flex flex-wrap gap-2">
                {systemSnapshot.emergentPhenomena.map((phenomenon, i) => (
                  <span key={i} className="px-3 py-1 bg-purple-500/20 text-purple-300 text-sm rounded-full border border-purple-500/40">
                    {phenomenon}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>
      )}

      {/* Métriques temps réel du Social Engine */}
      {liveMetrics && expandedSections.metrics && (
        <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl p-6 border border-slate-700 shadow-xl">
          <div className="flex items-center justify-between mb-6">
            <h4 className="text-xl font-bold text-white flex items-center gap-3">
              <div className="p-2 bg-gradient-to-r from-emerald-500 to-teal-600 rounded-lg">
                <Gauge className="w-5 h-5 text-white" />
              </div>
              Métriques Live • Social Engine
              <span className="px-3 py-1 bg-emerald-500/20 text-emerald-400 text-sm font-bold rounded-full">
                {Object.keys(liveMetrics).length} MÉTRIQUES
              </span>
            </h4>
            <button
              onClick={() => toggleSection('metrics')}
              className="p-2 hover:bg-slate-700 rounded-lg transition-colors"
            >
              {expandedSections.metrics ? <ChevronUp className="w-4 h-4 text-gray-400" /> : <ChevronDown className="w-4 h-4 text-gray-400" />}
            </button>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {Object.entries(liveMetrics).map(([key, value]) => {
              const trend = getMetricTrend(value);
              return (
                <div key={key} className="bg-gradient-to-br from-slate-700/50 to-slate-800/50 rounded-xl p-4 border border-slate-600 hover:border-cyan-500/50 transition-all">
                  <div className="flex items-center gap-3 mb-3">
                    {getMetricIcon(key as keyof LiveAdvancedMetrics)}
                    <div className="flex-1">
                      <h5 className="text-sm font-medium text-white capitalize">
                        {key.replace(/([A-Z])/g, ' $1').trim()}
                      </h5>
                    </div>
                    <div className={`text-xs ${trend.color}`}>
                      {trend.icon}
                    </div>
                  </div>
                  <div className="text-2xl font-bold text-white mb-2">
                    {typeof value === 'number' ? value.toFixed(1) : value}
                    {typeof value === 'number' && '%'}
                  </div>
                  <div className="w-full bg-slate-700 rounded-full h-2">
                    <div
                      className="bg-gradient-to-r from-cyan-500 to-purple-600 h-2 rounded-full transition-all duration-500"
                      style={{ width: `${typeof value === 'number' ? Math.min(100, Math.max(0, value)) : 0}%` }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Insights Prédictifs Live */}
      {expandedSections.insights && (
        <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl p-6 border border-slate-700 shadow-xl">
          <div className="flex items-center justify-between mb-6">
            <h4 className="text-xl font-bold text-white flex items-center gap-3">
              <div className="p-2 bg-gradient-to-r from-purple-500 to-pink-600 rounded-lg">
                <Brain className="w-5 h-5 text-white" />
              </div>
              Insights Prédictifs Live
              <span className="px-3 py-1 bg-purple-500/20 text-purple-400 text-sm font-bold rounded-full">
                {liveInsights.length} ACTIFS
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
            {liveInsights
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

                    <div className="grid grid-cols-4 gap-3 mb-4">
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
                      <div className="text-center">
                        <div className="text-lg font-bold text-yellow-400">{insight.confidence}%</div>
                        <div className="text-xs text-slate-400">Confiance</div>
                      </div>
                    </div>

                    {insight.actionRequired && (
                      <div className="mb-4 p-3 bg-yellow-500/10 border border-yellow-500/30 rounded-lg">
                        <div className="flex items-center gap-2 text-yellow-400 text-sm font-medium">
                          <AlertTriangle className="w-4 h-4" />
                          Action requise immédiatement
                        </div>
                      </div>
                    )}

                    <div className="space-y-3">
                      <div>
                        <h6 className="text-sm font-medium text-white mb-2">Recommandations Live:</h6>
                        <ul className="space-y-1">
                          {insight.recommendations.map((rec, i) => (
                            <li key={i} className="text-sm text-slate-300 flex items-start gap-2">
                              <ArrowUpRight className="w-3 h-3 text-cyan-400 mt-0.5 flex-shrink-0" />
                              {rec}
                            </li>
                          ))}
                        </ul>
                      </div>

                      <div className="flex items-center justify-between text-xs">
                        <div className="flex items-center gap-2 text-slate-400">
                          <span className="px-2 py-1 bg-slate-600 rounded text-xs">{insight.source.toUpperCase()}</span>
                          <span>Émergence: {insight.emergenceLevel.toFixed(0)}%</span>
                        </div>
                        {insight.aiGenerated && (
                          <div className="flex items-center gap-1 text-purple-400">
                            <Sparkles className="w-3 h-3" />
                            <span>IA Live</span>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}
          </div>
        </div>
      )}

      {/* Journal des événements temps réel */}
      {expandedSections.events && (
        <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl border border-slate-700 shadow-xl">
          <div className="p-6 border-b border-slate-700 flex items-center justify-between">
            <h4 className="text-xl font-bold text-white flex items-center gap-3">
              <div className="p-2 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-lg">
                <Activity className="w-5 h-5 text-white" />
              </div>
              Journal Événements Temps Réel
              <span className="px-3 py-1 bg-cyan-500/20 text-cyan-400 text-sm font-bold rounded-full">
                {liveEvents.length} ÉVÉNEMENTS
              </span>
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
                <p>Aucun événement en temps réel détecté</p>
                <p className="text-sm mt-1">Les événements apparaîtront automatiquement</p>
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
                          <span className="font-bold text-white">{event.title}</span>
                          <p className="text-sm text-slate-300 mt-1">{event.description}</p>
                          <div className="flex items-center gap-3 mt-2">
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
                        <h6 className="text-sm font-medium text-white mb-2">Projections IA Live:</h6>
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

                    {/* Impact prédit */}
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
                        <div className="text-sm text-gray-400 mb-2">Recommandations Live:</div>
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
              Rapport Live • Intelligence Avancée + Social Engine
            </h4>
            <button
              onClick={exportReport}
              className="flex items-center gap-2 px-4 py-2 rounded-lg bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white text-sm font-medium transition-all shadow-lg"
            >
              <Download className="w-4 h-4" />
              Export Live
            </button>
          </div>
          
          <div className="p-6 space-y-6">
            {/* Métriques de session enrichies */}
            <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
              <div className="text-center bg-slate-700/30 rounded-xl p-4">
                <div className="text-2xl font-bold text-cyan-400">{liveEvents.length}</div>
                <div className="text-sm text-gray-400">Événements Live</div>
              </div>
              <div className="text-center bg-slate-700/30 rounded-xl p-4">
                <div className="text-2xl font-bold text-purple-400">{liveInsights.length}</div>
                <div className="text-sm text-gray-400">Insights IA</div>
              </div>
              <div className="text-center bg-slate-700/30 rounded-xl p-4">
                <div className="text-2xl font-bold text-green-400">{sessionReport.dataQuality?.toFixed(0) || 95}%</div>
                <div className="text-sm text-gray-400">Qualité Data</div>
              </div>
              <div className="text-center bg-slate-700/30 rounded-xl p-4">
                <div className="text-2xl font-bold text-blue-400">{sessionReport.confidenceLevel?.toFixed(0) || 88}%</div>
                <div className="text-sm text-gray-400">Confiance IA</div>
              </div>
              <div className="text-center bg-slate-700/30 rounded-xl p-4">
                <div className="text-2xl font-bold text-yellow-400">
                  {refreshInterval}ms
                </div>
                <div className="text-sm text-gray-400">Fréquence</div>
              </div>
            </div>

            {/* Métriques Social Engine */}
            {liveMetrics && (
              <div>
                <h5 className="text-lg font-bold text-white mb-4">Métriques Social Engine Finales</h5>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                  <div className="bg-purple-500/10 border border-purple-500/30 rounded-lg p-3 text-center">
                    <div className="text-lg font-bold text-purple-400">{liveMetrics.collectiveIntelligence.toFixed(1)}%</div>
                    <div className="text-xs text-gray-400">Intelligence Collective</div>
                  </div>
                  <div className="bg-cyan-500/10 border border-cyan-500/30 rounded-lg p-3 text-center">
                    <div className="text-lg font-bold text-cyan-400">{liveMetrics.emergenceVelocity.toFixed(1)}%</div>
                    <div className="text-xs text-gray-400">Vélocité Émergence</div>
                  </div>
                  <div className="bg-green-500/10 border border-green-500/30 rounded-lg p-3 text-center">
                    <div className="text-lg font-bold text-green-400">{liveMetrics.systemResilience.toFixed(1)}%</div>
                    <div className="text-xs text-gray-400">Résilience Système</div>
                  </div>
                  <div className="bg-yellow-500/10 border border-yellow-500/30 rounded-lg p-3 text-center">
                    <div className="text-lg font-bold text-yellow-400">{liveMetrics.evolutionaryPressure.toFixed(1)}%</div>
                    <div className="text-xs text-gray-400">Pression Évolution</div>
                  </div>
                </div>
              </div>
            )}

            {/* Top insights prédictifs */}
            {liveInsights.length > 0 && (
              <div>
                <h5 className="text-lg font-bold text-white mb-4">Top Insights Prédictifs Live</h5>
                <div className="space-y-3">
                  {liveInsights.slice(0, 3).map((insight, i) => (
                    <div key={i} className="bg-slate-700/30 rounded-lg p-4 border border-slate-600">
                      <div className="flex items-center justify-between mb-2">
                        <h6 className="font-medium text-white flex items-center gap-2">
                          {getInsightIcon(insight.type)}
                          {insight.title}
                        </h6>
                        <span className="text-sm text-emerald-400 font-bold">{insight.probability}%</span>
                      </div>
                      <p className="text-sm text-gray-300">{insight.description}</p>
                      <div className="mt-2 text-xs text-gray-400">
                        Impact: {insight.impactLevel}% • Confiance: {insight.confidence}% • Source: {insight.source}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Événements marquants */}
            <div>
              <h5 className="text-lg font-bold text-white mb-4">Événements Marquants Live</h5>
              <div className="space-y-2">
                {liveEvents.filter(e => e.severity === 'critical' || e.severity === 'high').slice(0, 5).map((event, i) => (
                  <div key={i} className="flex items-center justify-between bg-slate-700/20 rounded-lg p-3">
                    <div className="flex items-center gap-3">
                      {getEventIcon(event.type)}
                      <span className="text-white font-medium">{event.title}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-xs text-gray-400">{formatTimestamp(event.timestamp)}</span>
                      <span className={`px-2 py-1 rounded text-xs font-bold ${getSeverityColor(event.severity)}`}>
                        {event.severity.toUpperCase()}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Configuration technique */}
            <div className="pt-4 border-t border-slate-700">
              <h5 className="text-lg font-bold text-white mb-3">Configuration Technique</h5>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                <div>
                  <span className="text-gray-400">Mode Analyse:</span>
                  <p className="text-white font-medium">{analysisDepth.toUpperCase()}</p>
                </div>
                <div>
                  <span className="text-gray-400">Mode Prédiction:</span>
                  <p className="text-white font-medium">{predictiveMode.toUpperCase()}</p>
                </div>
                <div>
                  <span className="text-gray-400">Fréquence Refresh:</span>
                  <p className="text-white font-medium">{refreshInterval}ms</p>
                </div>
                <div>
                  <span className="text-gray-400">Social Engine:</span>
                  <p className="text-green-400 font-medium">{socialEngine ? 'CONNECTÉ' : 'DÉCONNECTÉ'}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProAnalyticsPanel;