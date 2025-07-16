import React, { useState, useEffect, useCallback } from 'react';
import { SimulationState } from '../types';
import { 
  Globe, TrendingUp, Users, Zap, Brain, Eye, Wifi, RefreshCw, BarChart3,
  Target, Rocket, Lightbulb, Network, Shield, Sparkles, TrendingDown, Activity,
  AlertTriangle, CheckCircle, Clock, DollarSign, Gauge, LineChart,
  ArrowUpRight, ArrowDownRight, Minus, Star, Crown, Gem, Flame, Cpu, Info,
  Atom, Circle, Search, Telescope, ChevronRight, Play, Pause, Zap as ZapIcon
} from 'lucide-react';

interface CulturalInsightsPanelProps {
  state: SimulationState;
  isRunning: boolean;
}

interface TrendingEntity {
  id: string;
  name: string;
  type: string;
  popularity: number;
  sentiment: number;
  cultural_impact: number;
  trending_score: number;
  growth_velocity: number;
  timestamp: number;
}

interface GlobalSentiment {
  optimism: number;
  social_cohesion: number;
  innovation_appetite: number;
  collective_intelligence: number;
  cultural_velocity: number;
  trust_index: number;
  timestamp: number;
}

interface PredictiveAnalytics {
  next_viral_trends: Array<{
    trend: string;
    probability: number;
    time_to_peak: number;
    affected_demographics: string[];
    catalyst_factor: string;
    confidence: number;
    momentum: number;
  }>;
  collective_intelligence_score: number;
  social_tension_index: number;
  disruption_likelihood: number;
  emergence_patterns: string[];
  timestamp: number;
}

interface CulturalProfile {
  id: string;
  behavior_patterns: {
    discovery_tendency: number;
    social_influence: number;
    cultural_openness: number;
    innovation_affinity: number;
    coalition_propensity: number;
  };
  sentiment_analysis: {
    overall_mood: number;
    stress_tolerance: number;
    optimism_bias: number;
  };
  ai_predictions: {
    leadership_potential: number;
    coalition_formation_probability: number;
    disruption_resilience: number;
    viral_influence_score: number;
    cultural_bridge_potential: number;
  };
  behavioral_insights: {
    decision_making_style: string;
    stress_response_pattern: string;
    innovation_catalyst_type: string;
    social_connectivity_pattern: string;
  };
  timestamp: number;
  isNew: boolean;
}

interface MarketImplications {
  investment_opportunities: string[];
  consumer_behavior_shifts: string[];
  risk_factors: string[];
  market_timing_signals: string[];
  competitive_advantages: string[];
  timestamp: number;
}

interface RecommendationItem {
  id: string;
  entity: {
    name: string;
    type: string;
    cultural_impact: number;
  };
  confidence: number;
  reasoning: string;
  predicted_adoption: number;
  strategic_value: {
    network_effect_multiplier: number;
    market_timing_index: number;
    viral_potential: number;
  };
  behavioral_triggers: {
    primary_motivator: string;
    adoption_catalyst: string;
    resistance_factors: string[];
  };
  timestamp: number;
  isActive: boolean;
  coalitionId: string;
}

const CulturalInsightsPanel: React.FC<CulturalInsightsPanelProps> = ({ state, isRunning }) => {
  const [globalSentiment, setGlobalSentiment] = useState<GlobalSentiment | null>(null);
  const [trendingEntities, setTrendingEntities] = useState<TrendingEntity[]>([]);
  const [culturalProfiles, setCulturalProfiles] = useState<Map<string, CulturalProfile>>(new Map());
  const [predictiveAnalytics, setPredictiveAnalytics] = useState<PredictiveAnalytics | null>(null);
  const [marketImplications, setMarketImplications] = useState<MarketImplications | null>(null);
  const [coalitionRecommendations, setCoalitionRecommendations] = useState<Map<string, RecommendationItem[]>>(new Map());
  
  const [isLoading, setIsLoading] = useState(false);
  const [lastUpdate, setLastUpdate] = useState<number>(0);
  const [realTimeInsights, setRealTimeInsights] = useState<string[]>([]);
  const [liveMetrics, setLiveMetrics] = useState({
    processingRate: 0,
    predictionAccuracy: 94,
    dataFlowRate: 0,
    systemHealth: 100
  });

  const updateIntervalRef = React.useRef<NodeJS.Timeout | null>(null);

  const updateLiveMetrics = useCallback(() => {
    setLiveMetrics(prev => ({
      processingRate: Math.floor(50 + Math.random() * 30 + state.primatoms.length * 0.2),
      predictionAccuracy: Math.floor(92 + Math.random() * 6),
      dataFlowRate: Math.floor(80 + Math.random() * 40 + state.coalitions.length * 2),
      systemHealth: isRunning ? Math.floor(95 + Math.random() * 5) : 85
    }));
  }, [state.primatoms.length, state.coalitions.length, isRunning]);

  useEffect(() => {
    if (updateIntervalRef.current) clearInterval(updateIntervalRef.current);

    if (isRunning) {
      updateCulturalIntelligence();
      
      updateIntervalRef.current = setInterval(() => {
        updateCulturalIntelligence();
        generateRealTimeInsights();
        updateLiveMetrics();
      }, 4000);
    }

    return () => {
      if (updateIntervalRef.current) clearInterval(updateIntervalRef.current);
    };
  }, [isRunning, state.primatoms.length, state.coalitions.length, updateLiveMetrics]);

  const updateCulturalIntelligence = async () => {
    setIsLoading(true);
    
    try {
      const currentTime = Date.now();
      
      const sentiment = generateGlobalSentiment(state, currentTime);
      setGlobalSentiment(sentiment);

      const trending = generateTrendingEntities(state, currentTime);
      setTrendingEntities(trending);

      const profiles = generateCulturalProfiles(state, currentTime);
      setCulturalProfiles(profiles);

      const analytics = generatePredictiveAnalytics(state, currentTime);
      setPredictiveAnalytics(analytics);

      const implications = generateMarketImplications(state, currentTime);
      setMarketImplications(implications);

      const recommendations = generateCoalitionRecommendations(state, currentTime);
      setCoalitionRecommendations(recommendations);

      setLastUpdate(currentTime);
    } catch (error) {
      console.error('Failed to update cultural intelligence:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const generateGlobalSentiment = (state: SimulationState, timestamp: number): GlobalSentiment => {
    const population = state.primatoms.length;
    const avgTrust = state.primatoms.reduce((sum, p) => sum + p.trust, 0) / Math.max(population, 1);
    const avgCooperation = state.primatoms.reduce((sum, p) => sum + p.cooperation, 0) / Math.max(population, 1);
    const avgInnovation = state.primatoms.reduce((sum, p) => sum + p.innovation, 0) / Math.max(population, 1);
    const avgEnergy = state.primatoms.reduce((sum, p) => sum + p.energy, 0) / Math.max(population, 1);
    const coalitionDensity = state.coalitions.length / Math.max(population, 1);

    const timeVariation = Math.sin(timestamp / 10000) * 3;
    const randomVariation = (Math.random() - 0.5) * 4;

    return {
      optimism: Math.min(95, Math.max(20, avgTrust + (avgEnergy * 0.3) + (population * 0.1) + timeVariation + randomVariation)),
      social_cohesion: Math.min(95, Math.max(15, avgCooperation + (coalitionDensity * 20) + timeVariation)),
      innovation_appetite: Math.min(95, Math.max(25, avgInnovation + (population * 0.15) + timeVariation + randomVariation)),
      collective_intelligence: Math.min(95, Math.max(30, (avgTrust + avgCooperation + avgInnovation) / 3 + (coalitionDensity * 15) + timeVariation)),
      cultural_velocity: Math.min(95, Math.max(20, (avgInnovation * 0.8) + (population * 0.2) + timeVariation + randomVariation)),
      trust_index: Math.min(95, Math.max(10, avgTrust + (coalitionDensity * 10) + timeVariation)),
      timestamp
    };
  };

  const generateTrendingEntities = (state: SimulationState, timestamp: number): TrendingEntity[] => {
    const population = state.primatoms.length;
    const avgInnovation = state.primatoms.reduce((sum, p) => sum + p.innovation, 0) / Math.max(population, 1);

    const baseEntities = [
      { name: 'Intelligence Collective Émergente', type: 'concepts', base_pop: 85 },
      { name: 'Réseaux de Confiance Décentralisés', type: 'social', base_pop: 78 },
      { name: 'Innovation Collaborative', type: 'innovation', base_pop: 82 },
      { name: 'Synchronisation Comportementale', type: 'behavior', base_pop: 75 },
      { name: 'Méta-Coalitions Adaptatives', type: 'governance', base_pop: 70 }
    ];

    return baseEntities.map((entity, i) => {
      const timeBoost = Math.sin((timestamp + i * 1000) / 15000) * 10;
      const populationBoost = population * 0.1;
      const innovationBoost = avgInnovation * 0.2;
      
      return {
        id: `trend-${i}`,
        name: entity.name,
        type: entity.type,
        popularity: Math.min(95, Math.max(30, entity.base_pop + populationBoost + innovationBoost + timeBoost + (Math.random() * 10))),
        sentiment: Math.min(95, Math.max(40, 70 + timeBoost + (Math.random() * 15))),
        cultural_impact: Math.min(95, Math.max(35, entity.base_pop + populationBoost + timeBoost + (Math.random() * 8))),
        trending_score: Math.min(95, Math.max(25, entity.base_pop + innovationBoost + populationBoost * 0.08 + timeBoost + (Math.random() * 12))),
        growth_velocity: Math.min(95, Math.max(10, (avgInnovation * 0.6) + populationBoost * 0.3 + timeBoost + (Math.random() * 20))),
        timestamp
      };
    });
  };

  const generateCulturalProfiles = (state: SimulationState, timestamp: number): Map<string, CulturalProfile> => {
    const profiles = new Map<string, CulturalProfile>();
    
    const sampleSize = Math.min(state.primatoms.length, 15);
    const samplePrimatoms = state.primatoms.slice(0, sampleSize);

    samplePrimatoms.forEach((primatom, index) => {
      const isNew = !culturalProfiles.has(primatom.id);
      const timeVariation = Math.sin((timestamp + index * 500) / 8000) * 5;
      
      const profile: CulturalProfile = {
        id: primatom.id,
        behavior_patterns: {
          discovery_tendency: Math.min(95, Math.max(10, primatom.innovation + timeVariation + (Math.random() * 15))),
          social_influence: Math.min(95, Math.max(15, (primatom.influence || 50) + (primatom.trust * 0.3) + timeVariation + (Math.random() * 12))),
          cultural_openness: Math.min(95, Math.max(20, primatom.cooperation + (primatom.innovation * 0.4) + timeVariation + (Math.random() * 8))),
          innovation_affinity: Math.min(95, Math.max(15, primatom.innovation + timeVariation + (Math.random() * 12))),
          coalition_propensity: Math.min(95, Math.max(25, primatom.cooperation + (primatom.trust * 0.5) + timeVariation + (Math.random() * 10)))
        },
        sentiment_analysis: {
          overall_mood: Math.min(95, Math.max(20, (primatom.trust + primatom.cooperation) / 2 + timeVariation + (Math.random() * 15))),
          stress_tolerance: Math.min(95, Math.max(30, 100 - (primatom.stressLevel || 20) + timeVariation + (Math.random() * 12))),
          optimism_bias: Math.min(95, Math.max(25, primatom.trust + (primatom.innovation * 0.3) + timeVariation + (Math.random() * 14)))
        },
        ai_predictions: {
          leadership_potential: calculateLeadershipPotential(primatom, state, timeVariation),
          coalition_formation_probability: calculateCoalitionProbability(primatom, state, timeVariation),
          disruption_resilience: Math.min(95, Math.max(20, primatom.trust + (primatom.cooperation * 0.6) + timeVariation + (Math.random() * 15))),
          viral_influence_score: Math.min(95, Math.max(15, (primatom.influence || 50) + (primatom.innovation * 0.4) + timeVariation + (Math.random() * 20))),
          cultural_bridge_potential: Math.min(95, Math.max(30, primatom.cooperation + (primatom.trust * 0.4) + timeVariation + (Math.random() * 12)))
        },
        behavioral_insights: generateBehavioralInsights(primatom),
        timestamp,
        isNew
      };
      
      profiles.set(primatom.id, profile);
    });

    return profiles;
  };

  const generatePredictiveAnalytics = (state: SimulationState, timestamp: number): PredictiveAnalytics => {
    const population = state.primatoms.length;
    const coalitions = state.coalitions.length;
    const avgInnovation = state.primatoms.reduce((sum, p) => sum + p.innovation, 0) / Math.max(population, 1);
    const avgTrust = state.primatoms.reduce((sum, p) => sum + p.trust, 0) / Math.max(population, 1);

    const timeModulator = Math.sin(timestamp / 12000) * 0.1;

    return {
      next_viral_trends: [
        {
          trend: `Super-Coalitions de ${Math.floor(population * (0.6 + timeModulator))} Primatoms`,
          probability: Math.min(0.95, Math.max(0.3, 0.6 + (population * 0.005) + (coalitions * 0.02) + timeModulator)),
          time_to_peak: Math.max(5, 30 - population + Math.floor(Math.random() * 10)),
          affected_demographics: ['innovators', 'leaders', 'mediators'],
          catalyst_factor: 'Masse critique atteinte',
          confidence: Math.min(0.98, 0.8 + timeModulator + (Math.random() * 0.15)),
          momentum: Math.min(95, 60 + (population * 0.2) + (Math.random() * 25))
        },
        {
          trend: 'Intelligence Collective Émergente Global',
          probability: Math.min(0.88, Math.max(0.25, 0.5 + (avgInnovation * 0.004) + (avgTrust * 0.003) + timeModulator)),
          time_to_peak: Math.max(10, 45 - (population * 0.5) + Math.floor(Math.random() * 15)),
          affected_demographics: ['all_segments'],
          catalyst_factor: 'Synchronisation comportementale',
          confidence: Math.min(0.92, 0.75 + timeModulator + (Math.random() * 0.12)),
          momentum: Math.min(90, 70 + (avgInnovation * 0.3) + (Math.random() * 15))
        }
      ],
      collective_intelligence_score: Math.min(95, Math.max(30, (avgTrust + avgInnovation) / 2 + (coalitions * 2) + (population * 0.1) + (timeModulator * 20))),
      social_tension_index: Math.max(5, Math.min(70, 30 - avgTrust - (avgInnovation * 0.3) + (Math.random() * 10))),
      disruption_likelihood: Math.min(85, Math.max(15, avgInnovation + (population * 0.2) + (timeModulator * 15) + (Math.random() * 12))),
      emergence_patterns: generateEmergencePatterns(state),
      timestamp
    };
  };

  const generateMarketImplications = (state: SimulationState, timestamp: number): MarketImplications => {
    const population = state.primatoms.length;
    const avgInnovation = state.primatoms.reduce((sum, p) => sum + p.innovation, 0) / Math.max(population, 1);
    
    return {
      investment_opportunities: [
        `Plateformes d'Intelligence Collective (${population} utilisateurs actifs)`,
        `Technologies de Consensus Distribué (${state.coalitions.length} réseaux)`,
        `Solutions de Synchronisation Comportementale`,
        `Outils de Prédiction Culturelle IA-Driven`
      ],
      consumer_behavior_shifts: [
        `Adoption collective accélérée (+${Math.floor(avgInnovation + Math.random() * 10)}% vs traditionnel)`,
        `Préférence pour la prise de décision distribuée`,
        `Demande croissante pour la transparence algorithmique`,
        `Évolution vers les modèles de gouvernance collaborative`
      ],
      risk_factors: [
        population < 30 ? 'Masse critique insuffisante pour stabilité' : 'Risque de fragmentation à grande échelle',
        avgInnovation > 80 ? 'Innovation trop rapide vs adoption' : 'Inertie face au changement',
        `Complexité de gouvernance avec ${state.coalitions.length} coalitions`
      ],
      market_timing_signals: [
        `Signal d'adoption: ${Math.floor((population / 100) * avgInnovation + Math.random() * 5)}% de pénétration`,
        `Vélocité de croissance: ${Math.floor(avgInnovation * 1.2 + Math.random() * 8)}% mensuel`,
        `Fenêtre d'opportunité: ${Math.max(12, 36 - Math.floor(population * 0.5) + Math.floor(Math.random() * 6))} mois`
      ],
      competitive_advantages: [
        'Premier réseau de consensus vraiment distribué',
        'Algorithmes d\'intelligence collective propriétaires',
        'Base d\'utilisateurs early adopters engagés'
      ],
      timestamp
    };
  };

  const generateCoalitionRecommendations = (state: SimulationState, timestamp: number): Map<string, RecommendationItem[]> => {
    const recommendations = new Map<string, RecommendationItem[]>();
    
    state.coalitions.forEach(coalition => {
      const numRecommendations = Math.min(3, Math.max(2, Math.floor(coalition.members.length / 5) + 1));
      const coalitionTrends: RecommendationItem[] = [];
      
      for (let i = 0; i < numRecommendations; i++) {
        const trendEntity = trendingEntities[i % trendingEntities.length];
        if (!trendEntity) continue;
        
        const timeBonus = Math.sin((timestamp + i * 2000) / 10000) * 0.1;
        const cohesionBonus = coalition.cohesion / 1000;
        
        coalitionTrends.push({
          id: `rec-${coalition.id}-${i}-${timestamp}`,
          entity: {
            name: trendEntity.name,
            type: trendEntity.type,
            cultural_impact: trendEntity.cultural_impact
          },
          confidence: Math.min(0.95, Math.max(0.3, 0.6 + cohesionBonus + timeBonus + (Math.random() * 0.25))),
          reasoning: `Alignement optimal avec les ${coalition.members.length} membres de ${coalition.name}`,
          predicted_adoption: Math.min(0.9, Math.max(0.2, coalition.cohesion * 0.008 + timeBonus + (Math.random() * 0.3))),
          strategic_value: {
            network_effect_multiplier: 1 + (coalition.members.length * 0.1) + timeBonus,
            market_timing_index: Math.min(95, Math.max(30, 70 + (coalition.cohesion * 0.2) + (timeBonus * 20) + (Math.random() * 12))),
            viral_potential: Math.min(90, Math.max(25, 60 + (coalition.members.length * 2) + (timeBonus * 15) + (Math.random() * 15)))
          },
          behavioral_triggers: {
            primary_motivator: coalition.members.length > 5 ? 'Influence collective' : 'Innovation personnelle',
            adoption_catalyst: 'Validation par les pairs',
            resistance_factors: coalition.cohesion < 50 ? ['Manque de cohésion'] : ['Inertie du succès']
          },
          timestamp,
          isActive: true,
          coalitionId: coalition.id
        });
      }
      
      if (coalitionTrends.length > 0) {
        recommendations.set(coalition.id, coalitionTrends);
      }
    });

    return recommendations;
  };

  const generateRealTimeInsights = () => {
    const population = state.primatoms.length;
    const coalitions = state.coalitions.length;
    const avgTrust = state.primatoms.reduce((sum, p) => sum + p.trust, 0) / Math.max(population, 1);
    const avgInnovation = state.primatoms.reduce((sum, p) => sum + p.innovation, 0) / Math.max(population, 1);

    const insights = [
      `🧠 ${population} primatoms génèrent ${Math.floor(population * 0.15 + Math.random() * 5)} insights culturels par minute`,
      `⚡ Vélocité d'innovation: ${(avgInnovation + Math.random() * 8 - 4).toFixed(1)}% - Propagation virale détectée dans ${coalitions} réseaux`,
      `🌊 Emergence collective: ${Math.floor((avgTrust + avgInnovation) / 2 + Math.random() * 10 - 5)}% de synchronisation comportementale`,
      `🎯 Prédiction: Formation de ${Math.floor(coalitions * (1.3 + Math.random() * 0.4))} nouvelles méta-coalitions dans les 48h`,
      `🚀 Intelligence collective: Score de ${Math.floor((globalSentiment?.collective_intelligence || 0) + Math.random() * 6 - 3)}% atteint`
    ];

    setRealTimeInsights(insights.slice(0, 3));
  };

  const calculateLeadershipPotential = (primatom: any, state: SimulationState, timeVariation: number): number => {
    const baseScore = (primatom.influence || 50) + primatom.trust + primatom.innovation;
    const coalitionBonus = state.coalitions.some(c => c.members.includes(primatom.id)) ? 15 : 0;
    return Math.min(95, Math.max(15, (baseScore / 3) + coalitionBonus + timeVariation + (Math.random() * 10)));
  };

  const calculateCoalitionProbability = (primatom: any, state: SimulationState, timeVariation: number): number => {
    const isInCoalition = state.coalitions.some(c => c.members.includes(primatom.id));
    const baseProb = primatom.cooperation + (primatom.trust * 0.5);
    return Math.min(95, Math.max(20, baseProb + (isInCoalition ? 20 : 0) + timeVariation + (Math.random() * 15)));
  };

  const generateBehavioralInsights = (primatom: any) => {
    const styles = ['Analytique', 'Intuitif', 'Collaboratif', 'Disruptif'];
    const stressPatterns = ['Resilient', 'Adaptatif', 'Proactif', 'Zen'];
    const innovationTypes = ['Incrémental', 'Radical', 'Synthétique', 'Émergent'];
    const socialPatterns = ['Hub Central', 'Pont Inter-Réseaux', 'Catalyseur', 'Harmoniseur'];

    return {
      decision_making_style: styles[Math.floor(Math.random() * styles.length)],
      stress_response_pattern: stressPatterns[Math.floor(Math.random() * stressPatterns.length)],
      innovation_catalyst_type: innovationTypes[Math.floor(Math.random() * innovationTypes.length)],
      social_connectivity_pattern: socialPatterns[Math.floor(Math.random() * socialPatterns.length)]
    };
  };

  const generateEmergencePatterns = (state: SimulationState): string[] => {
    const patterns = [
      'Auto-organisation spontanée détectée',
      'Synchronisation comportementale en cours',
      'Formation de méta-structures collectives',
      'Emergence de protocoles de consensus',
      'Évolution vers intelligence distribuée'
    ];
    
    return patterns.slice(0, Math.min(patterns.length, Math.floor(state.primatoms.length / 10) + 2));
  };

  const getPerformanceIcon = (value: number) => {
    if (value > 80) return <ArrowUpRight className="w-4 h-4 text-emerald-400" />;
    if (value > 60) return <ArrowUpRight className="w-4 h-4 text-green-400" />;
    if (value > 40) return <Minus className="w-4 h-4 text-yellow-400" />;
    return <ArrowDownRight className="w-4 h-4 text-red-400" />;
  };

  const getAIPredictionBadge = (score: number) => {
    if (score > 90) return { icon: <Crown className="w-3 h-3" />, text: 'Elite', color: 'bg-gradient-to-r from-yellow-500 to-orange-500' };
    if (score > 80) return { icon: <Gem className="w-3 h-3" />, text: 'High', color: 'bg-gradient-to-r from-emerald-500 to-teal-500' };
    if (score > 60) return { icon: <Star className="w-3 h-3" />, text: 'Good', color: 'bg-gradient-to-r from-blue-500 to-cyan-500' };
    return { icon: <Sparkles className="w-3 h-3" />, text: 'Avg', color: 'bg-gradient-to-r from-gray-500 to-slate-500' };
  };

  return (
    <div className="space-y-6">
      <div className="bg-gradient-to-br from-slate-800/80 via-slate-900/90 to-black/50 backdrop-blur-sm rounded-xl p-8 border border-slate-600/50 shadow-2xl">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-gradient-to-r from-cyan-500 via-purple-500 to-pink-600 rounded-xl shadow-lg animate-pulse">
              <Atom className="w-8 h-8 text-white" />
            </div>
            <div>
              <h2 className="text-2xl font-bold bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
                Intelligence Culturelle Prédictive
              </h2>
              <p className="text-slate-400 text-sm">
                Système Temps Réel • Population: {state.primatoms.length} • Coalitions: {state.coalitions.length} • IA Prédictive
              </p>
            </div>
          </div>
          {isLoading && (
            <div className="flex items-center gap-2 px-3 py-1 bg-cyan-500/20 rounded-full">
              <RefreshCw className="w-4 h-4 text-cyan-400 animate-spin" />
              <span className="text-cyan-400 text-xs font-medium">Analyse IA...</span>
            </div>
          )}
        </div>
        
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2 px-4 py-2 bg-green-500/20 rounded-lg border border-green-500/50">
            <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
            <Wifi className="w-4 h-4 text-green-400" />
            <span className="text-green-400 text-sm font-medium">Live Data</span>
          </div>
          
          <div className="flex items-center gap-2 px-3 py-1 bg-slate-700/50 rounded-lg">
            <Activity className="w-4 h-4 text-blue-400" />
            <span className="text-blue-400 text-sm font-medium">{liveMetrics.processingRate}/min</span>
          </div>

          <div className="flex items-center gap-2 px-3 py-1 bg-slate-700/50 rounded-lg">
            <Target className="w-4 h-4 text-emerald-400" />
            <span className="text-emerald-400 text-sm font-medium">{liveMetrics.predictionAccuracy}%</span>
          </div>
          
          <button
            onClick={updateCulturalIntelligence}
            disabled={isLoading}
            className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-cyan-600 to-purple-600 hover:from-cyan-700 hover:to-purple-700 disabled:from-gray-600 disabled:to-gray-600 text-white text-sm font-medium rounded-lg transition-all shadow-lg"
          >
            <RefreshCw className={`w-4 h-4 ${isLoading ? 'animate-spin' : ''}`} />
            Actualiser
          </button>
        </div>

        {realTimeInsights.length > 0 && (
          <div className="mt-6 bg-slate-700/30 rounded-lg p-4 border border-cyan-500/30">
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

        {lastUpdate > 0 && (
          <div className="flex items-center gap-2 text-xs text-slate-400 mt-4">
            <Clock className="w-3 h-3" />
            Synchronisation: {new Date(lastUpdate).toLocaleTimeString()} • 
            <span className="text-cyan-400">{culturalProfiles.size} profils analysés</span> • 
            <span className="text-purple-400">{Array.from(coalitionRecommendations.values()).reduce((sum, recs) => sum + recs.length, 0)} recommandations</span>
          </div>
        )}
      </div>

      {globalSentiment && (
        <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl p-6 border border-slate-700 shadow-xl">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-xl font-bold text-white flex items-center gap-3">
              <div className="p-2 bg-gradient-to-r from-emerald-500 to-teal-600 rounded-lg">
                <TrendingUp className="w-5 h-5 text-white" />
              </div>
              Intelligence de Marché Globale
              <span className="px-3 py-1 bg-emerald-500/20 text-emerald-400 text-sm font-bold rounded-full">
                LIVE
              </span>
            </h3>
            <div className="flex items-center gap-2 px-3 py-1 bg-emerald-500/20 rounded-full">
              <Activity className="w-4 h-4 text-emerald-400" />
              <span className="text-emerald-400 text-xs font-bold">
                +{globalSentiment.innovation_appetite.toFixed(0)}% Innovation
              </span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
            <div className="bg-gradient-to-br from-blue-500/20 to-cyan-500/20 border border-blue-500/30 rounded-xl p-4">
              <div className="flex items-center justify-between mb-3">
                <Eye className="w-5 h-5 text-blue-400" />
                {getPerformanceIcon(globalSentiment.optimism)}
              </div>
              <div className="text-2xl font-bold text-blue-400 mb-1">
                {globalSentiment.optimism.toFixed(0)}%
              </div>
              <div className="text-xs text-slate-400">Optimisme Global</div>
              <div className="text-xs text-blue-300 mt-1">
                Population: {state.primatoms.length}
              </div>
            </div>

            <div className="bg-gradient-to-br from-green-500/20 to-emerald-500