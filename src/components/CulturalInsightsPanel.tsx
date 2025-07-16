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
  const [showAdvancedMetrics, setShowAdvancedMetrics] = useState(true);
  const [realTimeInsights, setRealTimeInsights] = useState<string[]>([]);
  const [animationTriggers, setAnimationTriggers] = useState<Set<string>>(new Set());
  const [liveMetrics, setLiveMetrics] = useState({
    processingRate: 0,
    predictionAccuracy: 94,
    dataFlowRate: 0,
    systemHealth: 100
  });

  // Références pour les intervalles
  const updateIntervalRef = React.useRef<NodeJS.Timeout | null>(null);
  const animationIntervalRef = React.useRef<NodeJS.Timeout | null>(null);
  const metricsIntervalRef = React.useRef<NodeJS.Timeout | null>(null);

  // Fonction pour déclencher des animations
  const triggerAnimation = useCallback((key: string) => {
    setAnimationTriggers(prev => new Set(prev).add(key));
    setTimeout(() => {
      setAnimationTriggers(prev => {
        const newSet = new Set(prev);
        newSet.delete(key);
        return newSet;
      });
    }, 1000);
  }, []);

  // Mise à jour des métriques live
  const updateLiveMetrics = useCallback(() => {
    setLiveMetrics(prev => ({
      processingRate: Math.floor(50 + Math.random() * 30 + state.primatoms.length * 0.2),
      predictionAccuracy: Math.floor(92 + Math.random() * 6),
      dataFlowRate: Math.floor(80 + Math.random() * 40 + state.coalitions.length * 2),
      systemHealth: isRunning ? Math.floor(95 + Math.random() * 5) : 85
    }));
  }, [state.primatoms.length, state.coalitions.length, isRunning]);

  // Auto-mise à jour des données culturelles
  useEffect(() => {
    // Nettoyage des intervalles précédents
    if (updateIntervalRef.current) clearInterval(updateIntervalRef.current);
    if (animationIntervalRef.current) clearInterval(animationIntervalRef.current);
    if (metricsIntervalRef.current) clearInterval(metricsIntervalRef.current);

    if (isRunning) {
      // Mise à jour initiale
      updateCulturalIntelligence();
      
      // Mise à jour principale toutes les 4 secondes
      updateIntervalRef.current = setInterval(() => {
        updateCulturalIntelligence();
        generateRealTimeInsights();
      }, 4000);

      // Animations et effets visuels toutes les secondes
      animationIntervalRef.current = setInterval(() => {
        triggerAnimation('pulse');
        updateLiveMetrics();
      }, 1500);

      // Métriques temps réel très fréquentes
      metricsIntervalRef.current = setInterval(() => {
        updateLiveMetrics();
        generateMicroInsights();
      }, 800);
    }

    return () => {
      if (updateIntervalRef.current) clearInterval(updateIntervalRef.current);
      if (animationIntervalRef.current) clearInterval(animationIntervalRef.current);
      if (metricsIntervalRef.current) clearInterval(metricsIntervalRef.current);
    };
  }, [isRunning, state.primatoms.length, state.coalitions.length, triggerAnimation, updateLiveMetrics]);

  const updateCulturalIntelligence = async () => {
    setIsLoading(true);
    triggerAnimation('update');
    
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

      // FIX: Assurer la persistance des recommandations
      const recommendations = generateCoalitionRecommendations(state, currentTime);
      setCoalitionRecommendations(prev => {
        const newMap = new Map(prev);
        
        // Mettre à jour ou ajouter les nouvelles recommandations
        recommendations.forEach((recs, coalitionId) => {
          if (recs.length > 0) {
            newMap.set(coalitionId, recs);
          }
        });
        
        // Garder les recommandations existantes si la coalition existe toujours
        prev.forEach((recs, coalitionId) => {
          const coalitionExists = state.coalitions.some(c => c.id === coalitionId);
          if (coalitionExists && !newMap.has(coalitionId)) {
            // Réactiver les recommandations existantes avec timestamp mis à jour
            const updatedRecs = recs.map(rec => ({
              ...rec,
              timestamp: currentTime,
              isActive: true
            }));
            newMap.set(coalitionId, updatedRecs);
          }
        });
        
        return newMap;
      });

      setLastUpdate(currentTime);
      triggerAnimation('success');
    } catch (error) {
      console.error('Failed to update cultural intelligence:', error);
      triggerAnimation('error');
    } finally {
      setIsLoading(false);
    }
  };

  const generateMicroInsights = () => {
    const microInsights = [
      `🧪 ${state.primatoms.length} agents • ${Math.floor(Math.random() * 15 + 8)} patterns détectés`,
      `⚡ Propagation virale: ${Math.floor(Math.random() * 25 + 60)}% • ${state.coalitions.length} réseaux`,
      `🎯 Prédiction temps réel: ${Math.floor(Math.random() * 8 + 90)}% précision`,
      `🌊 Emergence collective: ${Math.floor(Math.random() * 20 + 70)}% synchronisation`,
      `🚀 Innovation momentum: +${Math.floor(Math.random() * 15 + 5)}% cette minute`
    ];
    
    if (Math.random() > 0.7) { // 30% de chance de mettre à jour
      setRealTimeInsights([microInsights[Math.floor(Math.random() * microInsights.length)]]);
    }
  };

  const generateGlobalSentiment = (state: SimulationState, timestamp: number): GlobalSentiment => {
    const population = state.primatoms.length;
    const avgTrust = state.primatoms.reduce((sum, p) => sum + p.trust, 0) / Math.max(population, 1);
    const avgCooperation = state.primatoms.reduce((sum, p) => sum + p.cooperation, 0) / Math.max(population, 1);
    const avgInnovation = state.primatoms.reduce((sum, p) => sum + p.innovation, 0) / Math.max(population, 1);
    const avgEnergy = state.primatoms.reduce((sum, p) => sum + p.energy, 0) / Math.max(population, 1);
    const coalitionDensity = state.coalitions.length / Math.max(population, 1);

    // Ajout de variations temporelles pour rendre plus vivant
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
    const avgCooperation = state.primatoms.reduce((sum, p) => sum + p.cooperation, 0) / Math.max(population, 1);

    const baseEntities = [
      { name: 'Intelligence Collective Émergente', type: 'concepts', base_pop: 85, priority: 1 },
      { name: 'Réseaux de Confiance Décentralisés', type: 'social', base_pop: 78, priority: 2 },
      { name: 'Innovation Collaborative', type: 'innovation', base_pop: 82, priority: 1 },
      { name: 'Synchronisation Comportementale', type: 'behavior', base_pop: 75, priority: 3 },
      { name: 'Méta-Coalitions Adaptatives', type: 'governance', base_pop: 70, priority: 2 },
      { name: 'Résonnance Culturelle Quantique', type: 'culture', base_pop: 88, priority: 1 },
      { name: 'Protocoles de Coopération Auto-Adaptatifs', type: 'protocols', base_pop: 73, priority: 3 },
      { name: 'Emergence de Consensus Distribué', type: 'consensus', base_pop: 80, priority: 2 }
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
        sentiment: Math.min(95, Math.max(40, 70 + (avgCooperation * 0.3) + timeBoost + (Math.random() * 15))),
        cultural_impact: Math.min(95, Math.max(35, entity.base_pop + populationBoost + timeBoost + (Math.random() * 8))),
        trending_score: Math.min(95, Math.max(25, entity.base_pop + innovationBoost + populationBoost * 0.08 + timeBoost + (Math.random() * 12))),
        growth_velocity: Math.min(95, Math.max(10, (avgInnovation * 0.6) + populationBoost * 0.3 + timeBoost + (Math.random() * 20))),
        timestamp
      };
    });
  };

  const generateCulturalProfiles = (state: SimulationState, timestamp: number): Map<string, CulturalProfile> => {
    const profiles = new Map<string, CulturalProfile>();
    
    const sampleSize = Math.min(state.primatoms.length, 25);
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
        },
        {
          trend: `Réseaux de Confiance Distribués (${coalitions} hubs)`,
          probability: Math.min(0.82, Math.max(0.2, 0.4 + (avgTrust * 0.005) + (coalitions * 0.03) + timeModulator)),
          time_to_peak: Math.max(15, 60 - population + Math.floor(Math.random() * 20)),
          affected_demographics: ['mediators', 'cooperators'],
          catalyst_factor: 'Densité de réseau optimale',
          confidence: Math.min(0.85, 0.65 + timeModulator + (Math.random() * 0.15)),
          momentum: Math.min(85, 55 + (avgTrust * 0.4) + (Math.random() * 20))
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
        `Outils de Prédiction Culturelle IA-Driven`,
        `Infrastructures de Confiance Décentralisées`
      ],
      consumer_behavior_shifts: [
        `Adoption collective accélérée (+${Math.floor(avgInnovation + Math.random() * 10)}% vs traditionnel)`,
        `Préférence pour la prise de décision distribuée`,
        `Demande croissante pour la transparence algorithmique`,
        `Évolution vers les modèles de gouvernance collaborative`,
        `Émergence de nouveaux patterns de consommation collective`
      ],
      risk_factors: [
        population < 30 ? 'Masse critique insuffisante pour stabilité' : 'Risque de fragmentation à grande échelle',
        avgInnovation > 80 ? 'Innovation trop rapide vs adoption' : 'Inertie face au changement',
        `Complexité de gouvernance avec ${state.coalitions.length} coalitions`,
        'Résistance des systèmes centralisés établis',
        'Défis de scalabilité des consensus distribués'
      ],
      market_timing_signals: [
        `Signal d'adoption: ${Math.floor((population / 100) * avgInnovation + Math.random() * 5)}% de pénétration`,
        `Vélocité de croissance: ${Math.floor(avgInnovation * 1.2 + Math.random() * 8)}% mensuel`,
        `Saturation prévue: ${Math.floor(population * (2.5 + Math.random() * 0.5))} utilisateurs potentiels`,
        `Fenêtre d'opportunité: ${Math.max(12, 36 - Math.floor(population * 0.5) + Math.floor(Math.random() * 6))} mois`
      ],
      competitive_advantages: [
        'Premier réseau de consensus vraiment distribué',
        'Algorithmes d\'intelligence collective propriétaires',
        'Base d\'utilisateurs early adopters engagés',
        'Modèles prédictifs comportementaux validés'
      ],
      timestamp
    };
  };

  const generateCoalitionRecommendations = (state: SimulationState, timestamp: number): Map<string, RecommendationItem[]> => {
    const recommendations = new Map<string, RecommendationItem[]>();
    
    state.coalitions.forEach(coalition => {
      // Générer 3-5 recommandations par coalition
      const numRecommendations = Math.min(5, Math.max(3, Math.floor(coalition.members.length / 3) + 2));
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
    