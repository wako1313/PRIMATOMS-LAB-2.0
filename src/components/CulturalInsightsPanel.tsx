import React, { useState, useEffect } from 'react';
import { SimulationState } from '../types';
import { 
  Globe, TrendingUp, Users, Zap, Brain, Eye, Wifi, RefreshCw, BarChart3,
  Target, Rocket, Lightbulb, Network, Shield, Sparkles, TrendingDown, Activity,
  AlertTriangle, CheckCircle, Clock, DollarSign, Gauge, LineChart,
  ArrowUpRight, ArrowDownRight, Minus, Star, Crown, Gem, Flame, Cpu, Info,
  Atom, Circle, Search, Telescope
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
}

interface GlobalSentiment {
  optimism: number;
  social_cohesion: number;
  innovation_appetite: number;
  collective_intelligence: number;
  cultural_velocity: number;
  trust_index: number;
}

interface PredictiveAnalytics {
  next_viral_trends: Array<{
    trend: string;
    probability: number;
    time_to_peak: number;
    affected_demographics: string[];
    catalyst_factor: string;
  }>;
  collective_intelligence_score: number;
  social_tension_index: number;
  disruption_likelihood: number;
  emergence_patterns: string[];
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
}

interface MarketImplications {
  investment_opportunities: string[];
  consumer_behavior_shifts: string[];
  risk_factors: string[];
  market_timing_signals: string[];
  competitive_advantages: string[];
}

const CulturalInsightsPanel: React.FC<CulturalInsightsPanelProps> = ({ state, isRunning }) => {
  const [globalSentiment, setGlobalSentiment] = useState<GlobalSentiment | null>(null);
  const [trendingEntities, setTrendingEntities] = useState<TrendingEntity[]>([]);
  const [culturalProfiles, setCulturalProfiles] = useState<Map<string, CulturalProfile>>(new Map());
  const [predictiveAnalytics, setPredictiveAnalytics] = useState<PredictiveAnalytics | null>(null);
  const [marketImplications, setMarketImplications] = useState<MarketImplications | null>(null);
  const [coalitionRecommendations, setCoalitionRecommendations] = useState<Map<string, any[]>>(new Map());
  
  const [isLoading, setIsLoading] = useState(false);
  const [lastUpdate, setLastUpdate] = useState<number>(0);
  const [showAdvancedMetrics, setShowAdvancedMetrics] = useState(true);
  const [realTimeInsights, setRealTimeInsights] = useState<string[]>([]);

  // Auto-mise à jour des données culturelles basées sur la population
  useEffect(() => {
    if (isRunning) {
      updateCulturalIntelligence();
      
      const interval = setInterval(() => {
        updateCulturalIntelligence();
        generateRealTimeInsights();
      }, 3000);

      return () => clearInterval(interval);
    }
  }, [isRunning, state.primatoms.length, state.coalitions.length]);

  const updateCulturalIntelligence = async () => {
    setIsLoading(true);
    
    try {
      // Génération des métriques globales basées sur la population réelle
      const sentiment = generateGlobalSentiment(state);
      setGlobalSentiment(sentiment);

      // Génération des entités tendance basées sur les comportements
      const trending = generateTrendingEntities(state);
      setTrendingEntities(trending);

      // Génération des profils culturels individuels
      const profiles = generateCulturalProfiles(state);
      setCulturalProfiles(profiles);

      // Analytics prédictifs basés sur les patterns de population
      const analytics = generatePredictiveAnalytics(state);
      setPredictiveAnalytics(analytics);

      // Implications business dynamiques
      const implications = generateMarketImplications(state);
      setMarketImplications(implications);

      // Recommandations par coalition
      const recommendations = generateCoalitionRecommendations(state);
      setCoalitionRecommendations(recommendations);

      setLastUpdate(Date.now());
    } catch (error) {
      console.error('Failed to update cultural intelligence:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const generateGlobalSentiment = (state: SimulationState): GlobalSentiment => {
    const population = state.primatoms.length;
    const avgTrust = state.primatoms.reduce((sum, p) => sum + p.trust, 0) / Math.max(population, 1);
    const avgCooperation = state.primatoms.reduce((sum, p) => sum + p.cooperation, 0) / Math.max(population, 1);
    const avgInnovation = state.primatoms.reduce((sum, p) => sum + p.innovation, 0) / Math.max(population, 1);
    const avgEnergy = state.primatoms.reduce((sum, p) => sum + p.energy, 0) / Math.max(population, 1);
    const coalitionDensity = state.coalitions.length / Math.max(population, 1);

    return {
      optimism: Math.min(95, avgTrust + (avgEnergy * 0.3) + (population * 0.1) + Math.random() * 10),
      social_cohesion: Math.min(95, avgCooperation + (coalitionDensity * 20) + Math.random() * 8),
      innovation_appetite: Math.min(95, avgInnovation + (population * 0.15) + Math.random() * 12),
      collective_intelligence: Math.min(95, (avgTrust + avgCooperation + avgInnovation) / 3 + (coalitionDensity * 15)),
      cultural_velocity: Math.min(95, (avgInnovation * 0.8) + (population * 0.2) + Math.random() * 15),
      trust_index: Math.min(95, avgTrust + (coalitionDensity * 10) + Math.random() * 5)
    };
  };

  const generateTrendingEntities = (state: SimulationState): TrendingEntity[] => {
    const population = state.primatoms.length;
    const avgInnovation = state.primatoms.reduce((sum, p) => sum + p.innovation, 0) / Math.max(population, 1);
    const avgCooperation = state.primatoms.reduce((sum, p) => sum + p.cooperation, 0) / Math.max(population, 1);

    const baseEntities = [
      { name: 'Intelligence Collective Émergente', type: 'concepts', base_pop: 85 },
      { name: 'Réseaux de Confiance Décentralisés', type: 'social', base_pop: 78 },
      { name: 'Innovation Collaborative', type: 'innovation', base_pop: 82 },
      { name: 'Synchronisation Comportementale', type: 'behavior', base_pop: 75 },
      { name: 'Méta-Coalitions Adaptatives', type: 'governance', base_pop: 70 },
      { name: 'Résonnance Culturelle Quantique', type: 'culture', base_pop: 88 },
      { name: 'Protocoles de Coopération Auto-Adaptatifs', type: 'protocols', base_pop: 73 },
      { name: 'Emergence de Consensus Distribué', type: 'consensus', base_pop: 80 }
    ];

    return baseEntities.map((entity, i) => ({
      id: `trend-${i}`,
      name: entity.name,
      type: entity.type,
      popularity: Math.min(95, entity.base_pop + (population * 0.1) + (avgInnovation * 0.2) + Math.random() * 15),
      sentiment: Math.min(95, 70 + (avgCooperation * 0.3) + Math.random() * 20),
      cultural_impact: Math.min(95, entity.base_pop + (population * 0.15) + Math.random() * 10),
      trending_score: Math.min(95, entity.base_pop + (avgInnovation * 0.25) + (population * 0.08) + Math.random() * 12),
      growth_velocity: Math.min(95, (avgInnovation * 0.6) + (population * 0.3) + Math.random() * 25)
    }));
  };

  const generateCulturalProfiles = (state: SimulationState): Map<string, CulturalProfile> => {
    const profiles = new Map<string, CulturalProfile>();
    
    // Analyser un échantillon représentatif de la population
    const sampleSize = Math.min(state.primatoms.length, 20);
    const samplePrimatoms = state.primatoms.slice(0, sampleSize);

    samplePrimatoms.forEach(primatom => {
      const profile: CulturalProfile = {
        id: primatom.id,
        behavior_patterns: {
          discovery_tendency: Math.min(95, primatom.innovation + Math.random() * 20),
          social_influence: Math.min(95, (primatom.influence || 50) + (primatom.trust * 0.3) + Math.random() * 15),
          cultural_openness: Math.min(95, primatom.cooperation + (primatom.innovation * 0.4) + Math.random() * 10),
          innovation_affinity: Math.min(95, primatom.innovation + Math.random() * 15),
          coalition_propensity: Math.min(95, primatom.cooperation + (primatom.trust * 0.5) + Math.random() * 12)
        },
        sentiment_analysis: {
          overall_mood: Math.min(95, (primatom.trust + primatom.cooperation) / 2 + Math.random() * 20),
          stress_tolerance: Math.min(95, 100 - (primatom.stressLevel || 20) + Math.random() * 15),
          optimism_bias: Math.min(95, primatom.trust + (primatom.innovation * 0.3) + Math.random() * 18)
        },
        ai_predictions: {
          leadership_potential: calculateLeadershipPotential(primatom, state),
          coalition_formation_probability: calculateCoalitionProbability(primatom, state),
          disruption_resilience: Math.min(95, primatom.trust + (primatom.cooperation * 0.6) + Math.random() * 20),
          viral_influence_score: Math.min(95, (primatom.influence || 50) + (primatom.innovation * 0.4) + Math.random() * 25),
          cultural_bridge_potential: Math.min(95, primatom.cooperation + (primatom.trust * 0.4) + Math.random() * 15)
        },
        behavioral_insights: generateBehavioralInsights(primatom)
      };
      
      profiles.set(primatom.id, profile);
    });

    return profiles;
  };

  const generatePredictiveAnalytics = (state: SimulationState): PredictiveAnalytics => {
    const population = state.primatoms.length;
    const coalitions = state.coalitions.length;
    const avgInnovation = state.primatoms.reduce((sum, p) => sum + p.innovation, 0) / Math.max(population, 1);
    const avgTrust = state.primatoms.reduce((sum, p) => sum + p.trust, 0) / Math.max(population, 1);

    return {
      next_viral_trends: [
        {
          trend: `Super-Coalitions de ${Math.floor(population * 0.6)} Primatoms`,
          probability: Math.min(0.95, 0.6 + (population * 0.005) + (coalitions * 0.02)),
          time_to_peak: Math.max(5, 30 - population),
          affected_demographics: ['innovators', 'leaders', 'mediators'],
          catalyst_factor: 'Masse critique atteinte'
        },
        {
          trend: 'Intelligence Collective Émergente Global',
          probability: Math.min(0.88, 0.5 + (avgInnovation * 0.004) + (avgTrust * 0.003)),
          time_to_peak: Math.max(10, 45 - (population * 0.5)),
          affected_demographics: ['all_segments'],
          catalyst_factor: 'Synchronisation comportementale'
        },
        {
          trend: `Réseaux de Confiance Distribués (${coalitions} hubs)`,
          probability: Math.min(0.82, 0.4 + (avgTrust * 0.005) + (coalitions * 0.03)),
          time_to_peak: Math.max(15, 60 - population),
          affected_demographics: ['mediators', 'cooperators'],
          catalyst_factor: 'Densité de réseau optimale'
        }
      ],
      collective_intelligence_score: (avgTrust + avgInnovation) / 2 + (coalitions * 2) + (population * 0.1),
      social_tension_index: Math.max(5, 30 - avgTrust - (avgInnovation * 0.3)),
      disruption_likelihood: Math.min(85, avgInnovation + (population * 0.2) + Math.random() * 15),
      emergence_patterns: generateEmergencePatterns(state)
    };
  };

  const generateMarketImplications = (state: SimulationState): MarketImplications => {
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
        `Adoption collective accélérée (+${Math.floor(avgInnovation)}% vs traditionnel)`,
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
        `Signal d'adoption: ${Math.floor((population / 100) * avgInnovation)}% de pénétration`,
        `Vélocité de croissance: ${Math.floor(avgInnovation * 1.2)}% mensuel`,
        `Saturation prévue: ${Math.floor(population * 2.5)} utilisateurs potentiels`,
        `Fenêtre d'opportunité: ${Math.max(12, 36 - Math.floor(population * 0.5))} mois`
      ],
      competitive_advantages: [
        'Premier réseau de consensus vraiment distribué',
        'Algorithms d\'intelligence collective propriétaires',
        'Base d\'utilisateurs early adopters engagés',
        'Modèles prédictifs comportementaux validés'
      ]
    };
  };

  const generateCoalitionRecommendations = (state: SimulationState): Map<string, any[]> => {
    const recommendations = new Map<string, any[]>();
    
    state.coalitions.forEach(coalition => {
      const coalitionTrends = trendingEntities.slice(0, 4).map(entity => ({
        entity: {
          name: entity.name,
          type: entity.type,
          cultural_impact: entity.cultural_impact
        },
        confidence: Math.min(0.95, 0.6 + (coalition.cohesion * 0.003) + Math.random() * 0.2),
        reasoning: `Alignement optimal avec les ${coalition.members.length} membres de ${coalition.name}`,
        predicted_adoption: Math.min(0.9, coalition.cohesion * 0.8 + Math.random() * 0.2),
        strategic_value: {
          network_effect_multiplier: 1 + (coalition.members.length * 0.1),
          market_timing_index: Math.min(95, 70 + (coalition.cohesion * 20) + Math.random() * 15),
          viral_potential: Math.min(90, 60 + (coalition.members.length * 2) + Math.random() * 20)
        },
        behavioral_triggers: {
          primary_motivator: coalition.members.length > 5 ? 'Influence collective' : 'Innovation personnelle',
          adoption_catalyst: 'Validation par les pairs',
          resistance_factors: coalition.cohesion < 50 ? ['Manque de cohésion'] : ['Inertie du succès']
        }
      }));
      
      recommendations.set(coalition.id, coalitionTrends);
    });

    return recommendations;
  };

  const generateRealTimeInsights = () => {
    const population = state.primatoms.length;
    const coalitions = state.coalitions.length;
    const avgTrust = state.primatoms.reduce((sum, p) => sum + p.trust, 0) / Math.max(population, 1);
    const avgInnovation = state.primatoms.reduce((sum, p) => sum + p.innovation, 0) / Math.max(population, 1);

    const insights = [
      `🧠 ${population} primatoms génèrent ${Math.floor(population * 0.15)} insights culturels par minute`,
      `⚡ Vélocité d'innovation: ${avgInnovation.toFixed(1)}% - Propagation virale détectée dans ${coalitions} réseaux`,
      `🌊 Emergence collective: ${Math.floor((avgTrust + avgInnovation) / 2)}% de synchronisation comportementale`,
      `🎯 Prédiction: Formation de ${Math.floor(coalitions * 1.3)} nouvelles méta-coalitions dans les 48h`,
      `🚀 Intelligence collective: Score de ${Math.floor(globalSentiment?.collective_intelligence || 0)}% atteint`
    ];

    setRealTimeInsights(insights.slice(0, 3));
  };

  // Fonctions utilitaires
  const calculateLeadershipPotential = (primatom: any, state: SimulationState): number => {
    const baseScore = (primatom.influence || 50) + primatom.trust + primatom.innovation;
    const coalitionBonus = state.coalitions.some(c => c.members.includes(primatom.id)) ? 15 : 0;
    return Math.min(95, (baseScore / 3) + coalitionBonus + Math.random() * 10);
  };

  const calculateCoalitionProbability = (primatom: any, state: SimulationState): number => {
    const isInCoalition = state.coalitions.some(c => c.members.includes(primatom.id));
    const baseProb = primatom.cooperation + (primatom.trust * 0.5);
    return Math.min(95, baseProb + (isInCoalition ? 20 : 0) + Math.random() * 15);
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

  const getSentimentColor = (sentiment: number): string => {
    if (sentiment > 80) return 'text-emerald-400';
    if (sentiment > 70) return 'text-green-400';
    if (sentiment > 60) return 'text-yellow-400';
    if (sentiment > 40) return 'text-orange-400';
    return 'text-red-400';
  };

  const getPerformanceIcon = (value: number) => {
    if (value > 80) return <ArrowUpRight className="w-4 h-4 text-emerald-400" />;
    if (value > 60) return <ArrowUpRight className="w-4 h-4 text-green-400" />;
    if (value > 40) return <Minus className="w-4 h-4 text-yellow-400" />;
    return <ArrowDownRight className="w-4 h-4 text-red-400" />;
  };

  const getTrendingIcon = (type: string) => {
    const icons = {
      'concepts': '💡', 'social': '🤝', 'innovation': '🚀', 'behavior': '🧠',
      'governance': '⚖️', 'culture': '🌍', 'protocols': '🔧', 'consensus': '✅'
    };
    return icons[type] || '🌟';
  };

  const getAIPredictionBadge = (score: number) => {
    if (score > 90) return { icon: <Crown className="w-3 h-3" />, text: 'Elite', color: 'bg-gradient-to-r from-yellow-500 to-orange-500' };
    if (score > 80) return { icon: <Gem className="w-3 h-3" />, text: 'High', color: 'bg-gradient-to-r from-emerald-500 to-teal-500' };
    if (score > 60) return { icon: <Star className="w-3 h-3" />, text: 'Good', color: 'bg-gradient-to-r from-blue-500 to-cyan-500' };
    return { icon: <Sparkles className="w-3 h-3" />, text: 'Avg', color: 'bg-gradient-to-r from-gray-500 to-slate-500' };
  };

  return (
    <div className="space-y-6">
      {/* HERO HEADER - Données Temps Réel */}
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
            
            <button
              onClick={updateCulturalIntelligence}
              disabled={isLoading}
              className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-cyan-600 to-purple-600 hover:from-cyan-700 hover:to-purple-700 disabled:from-gray-600 disabled:to-gray-600 text-white text-sm font-medium rounded-lg transition-all shadow-lg"
            >
              <RefreshCw className={`w-4 h-4 ${isLoading ? 'animate-spin' : ''}`} />
              Actualiser
            </button>
          </div>
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

        {lastUpdate > 0 && (
          <div className="flex items-center gap-2 text-xs text-slate-400">
            <Clock className="w-3 h-3" />
            Synchronisation: {new Date(lastUpdate).toLocaleTimeString()} • 
            <span className="text-cyan-400">{culturalProfiles.size} profils analysés</span> • 
            <span className="text-purple-400">{Array.from(coalitionRecommendations.values()).reduce((sum, recs) => sum + recs.length, 0)} recommandations</span>
          </div>
        )}
      </div>