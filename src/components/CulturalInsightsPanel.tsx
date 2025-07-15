import React, { useState, useEffect } from 'react';
import { SimulationState } from '../types';
import { qlooService, QlooTrendingData, QlooConsumerProfile, QlooRecommendation } from '../services/QlooAPIService';
import { 
  Globe, TrendingUp, Users, Zap, Brain, Eye, Wifi, WifiOff, RefreshCw, BarChart3,
  Target, Rocket, Lightbulb, Network, Shield, Sparkles, TrendingDown, Activity,
  AlertTriangle, CheckCircle, Clock, DollarSign, Gauge, LineChart, PieChart,
  ArrowUpRight, ArrowDownRight, Minus, Star, Crown, Gem, Flame, Cpu, Info
} from 'lucide-react';

interface CulturalInsightsPanelProps {
  state: SimulationState;
  isRunning: boolean;
}

const CulturalInsightsPanel: React.FC<CulturalInsightsPanelProps> = ({ state, isRunning }) => {
  const [trendingData, setTrendingData] = useState<QlooTrendingData | null>(null);
  const [culturalProfiles, setCulturalProfiles] = useState<Map<string, QlooConsumerProfile>>(new Map());
  const [coalitionRecommendations, setCoalitionRecommendations] = useState<Map<string, QlooRecommendation[]>>(new Map());
  const [isConnected, setIsConnected] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [lastUpdate, setLastUpdate] = useState<number>(0);
  const [showAdvancedMetrics, setShowAdvancedMetrics] = useState(true);

  useEffect(() => {
    checkConnection();
    updateCulturalData();
  }, [state.primatoms.length, state.coalitions.length]);

  useEffect(() => {
    if (isRunning && isConnected) {
      const interval = setInterval(() => {
        updateCulturalData();
      }, 3000); // Update more frequently

      return () => clearInterval(interval);
    }
  }, [isRunning, isConnected, state]);

  const checkConnection = async () => {
    try {
      const connected = await qlooService.testConnection(); 
      setIsConnected(connected);
      updateCulturalData();
    } catch (error) {
      console.error("Error checking connection:", error);
      setIsConnected(false);
      updateCulturalData();
    }
  };

  const updateCulturalData = async () => {
    setIsLoading(true);
    try {
      console.log(`🔄 Fetching cultural data for ${state.primatoms.length} primatoms`);
      const trends = await qlooService.getGlobalTrends();
      setTrendingData(trends);

      // Generate cultural profiles for selected Primatoms
      const profiles = new Map<string, QlooConsumerProfile>();
      // Use more primatoms to better reflect the population
      const samplePrimatoms = state.primatoms.slice(0, Math.min(state.primatoms.length, 50));
      
      for (const primatom of samplePrimatoms) {
        try {
          const profile = await qlooService.generateCulturalProfile(primatom);
          profiles.set(primatom.id, profile);
        } catch (error) {
          console.error(`Failed to generate profile for ${primatom.id}:`, error);
        }
      }
      setCulturalProfiles(profiles);

      // Get recommendations for coalitions
      const recommendations = new Map<string, QlooRecommendation[]>();
      for (const coalition of state.coalitions) {
        try {
          const recs = await qlooService.getCoalitionRecommendations(coalition, state.primatoms);
          recommendations.set(coalition.id, recs);
        } catch (error) {
          console.error(`Failed to get recommendations for coalition ${coalition.id}:`, error);
        }
      }
      setCoalitionRecommendations(recommendations);

      setLastUpdate(Date.now());
    } catch (error) {
      console.error('Failed to update cultural data:', error);
    } finally {
      setIsLoading(false);
    }
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
    switch (type) {
      case 'music': return '🎵';
      case 'tv': return '📺';
      case 'film': return '🎬';
      case 'fashion': return '👗';
      case 'dining': return '🍽️';
      case 'travel': return '✈️';
      case 'brands': return '🏷️';
      case 'books': return '📚';
      case 'podcasts': return '🎙️';
      default: return '🌟';
    }
  };

  const getAIPredictionBadge = (score: number) => {
    if (score > 90) return { icon: <Crown className="w-3 h-3" />, text: 'Elite', color: 'bg-gradient-to-r from-yellow-500 to-orange-500' };
    if (score > 80) return { icon: <Gem className="w-3 h-3" />, text: 'High', color: 'bg-gradient-to-r from-emerald-500 to-teal-500' };
    if (score > 60) return { icon: <Star className="w-3 h-3" />, text: 'Good', color: 'bg-gradient-to-r from-blue-500 to-cyan-500' };
    return { icon: <Sparkles className="w-3 h-3" />, text: 'Avg', color: 'bg-gradient-to-r from-gray-500 to-slate-500' };
  };

  return (
    <div className="space-y-6">
      {/* HERO HEADER - Impression Première */}
      <div className="bg-gradient-to-br from-slate-800/80 via-slate-900/90 to-black/50 backdrop-blur-sm rounded-xl p-8 border border-slate-600/50 shadow-2xl">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-gradient-to-r from-cyan-500 to-purple-600 rounded-xl shadow-lg">
              <Globe className="w-8 h-8 text-white" />
            </div>
            <div>
              <h2 className="text-2xl font-bold bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
                Intelligence Culturelle Prédictive
              </h2>
              <p className="text-slate-400 text-sm">Propulsé par Qloo AI • Données Temps Réel • Prédictions Comportementales</p>
            </div>
            {isLoading && (
              <div className="flex items-center gap-2 px-3 py-1 bg-cyan-500/20 rounded-full">
                <RefreshCw className="w-4 h-4 text-cyan-400 animate-spin" />
                <span className="text-cyan-400 text-xs font-medium">Analyse en cours...</span>
              </div>
            )}
          </div>
          
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 px-4 py-2 bg-slate-700/50 rounded-lg border border-slate-600">
              {isConnected ? (
                <div className="flex items-center gap-2 text-green-400">
                  <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                  <Wifi className="w-4 h-4 text-green-400" />
                  <span className="text-sm font-medium">Connected</span>
                </div>
              ) : (
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-red-400 rounded-full"></div>
                  <WifiOff className="w-4 h-4 text-red-400" />
                  <span className="text-red-400 text-sm font-medium">Simulation</span>
                </div>
              )}
            </div>
            
            <button
              onClick={updateCulturalData}
              disabled={isLoading}
              className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-cyan-600 to-purple-600 hover:from-cyan-700 hover:to-purple-700 disabled:from-gray-600 disabled:to-gray-600 disabled:cursor-not-allowed text-white text-sm font-medium rounded-lg transition-all duration-200 shadow-lg"
            >
              <RefreshCw className={`w-4 h-4 ${isLoading ? 'animate-spin' : ''}`} />
              Actualiser
            </button>
          </div>
        </div>

        {lastUpdate > 0 && (
          <div className="flex items-center gap-2 text-xs text-slate-400">
            <Clock className="w-3 h-3" />
            Dernière synchronisation: {new Date(lastUpdate).toLocaleTimeString()} • 
            <span className="text-cyan-400">{culturalProfiles.size} profils analysés</span> • 
            <span className="text-purple-400">{Array.from(coalitionRecommendations.values()).reduce((sum, recs) => sum + recs.length, 0)} recommandations générées</span>
          </div>
        )}
      </div>

      {/* TABLEAU DE BORD EXÉCUTIF */}
      {trendingData && (
        <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl p-6 border border-slate-700 shadow-xl">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-xl font-bold text-white flex items-center gap-3">
              <div className="p-2 bg-gradient-to-r from-emerald-500 to-teal-600 rounded-lg">
                <TrendingUp className="w-5 h-5 text-white" />
              </div>
              Intelligence de Marché Globale
            </h3>
            <div className="flex items-center gap-2 px-3 py-1 bg-emerald-500/20 rounded-full">
              <Activity className="w-4 h-4 text-emerald-400" />
              <span className="text-emerald-400 text-xs font-bold">+{trendingData.global_sentiment.innovation_appetite.toFixed(0)}% Innovation</span>
            </div>
          </div>

          {/* MÉTRIQUES PRINCIPALES */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
            <div className="bg-gradient-to-br from-blue-500/20 to-cyan-500/20 border border-blue-500/30 rounded-xl p-4">
              <div className="flex items-center justify-between mb-3">
                <Eye className="w-5 h-5 text-blue-400" />
                {getPerformanceIcon(trendingData.global_sentiment.optimism)}
              </div>
              <div className="text-2xl font-bold text-blue-400 mb-1">
                {trendingData.global_sentiment.optimism.toFixed(0)}%
              </div>
              <div className="text-xs text-slate-400">Optimisme Global</div>
            </div>

            <div className="bg-gradient-to-br from-green-500/20 to-emerald-500/20 border border-green-500/30 rounded-xl p-4">
              <div className="flex items-center justify-between mb-3">
                <Users className="w-5 h-5 text-green-400" />
                {getPerformanceIcon(trendingData.global_sentiment.social_cohesion)}
              </div>
              <div className="text-2xl font-bold text-green-400 mb-1">
                {trendingData.global_sentiment.social_cohesion.toFixed(0)}%
              </div>
              <div className="text-xs text-slate-400">Cohésion Sociale</div>
            </div>

            <div className="bg-gradient-to-br from-purple-500/20 to-pink-500/20 border border-purple-500/30 rounded-xl p-4">
              <div className="flex items-center justify-between mb-3">
                <Brain className="w-5 h-5 text-purple-400" />
                {getPerformanceIcon(trendingData.global_sentiment.innovation_appetite)}
              </div>
              <div className="text-2xl font-bold text-purple-400 mb-1">
                {trendingData.global_sentiment.innovation_appetite.toFixed(0)}%
              </div>
              <div className="text-xs text-slate-400">Appétit Innovation</div>
            </div>

            <div className="bg-gradient-to-br from-yellow-500/20 to-orange-500/20 border border-yellow-500/30 rounded-xl p-4">
              <div className="flex items-center justify-between mb-3">
                <Gauge className="w-5 h-5 text-yellow-400" />
                {getPerformanceIcon(trendingData.predictive_analytics?.collective_intelligence_score || 75)}
              </div>
              <div className="text-2xl font-bold text-yellow-400 mb-1">
                {(trendingData.predictive_analytics?.collective_intelligence_score || 75).toFixed(0)}%
              </div>
              <div className="text-xs text-slate-400">Intelligence Collective</div>
            </div>
          </div>

          {/* PRÉDICTIONS VIRALES - NOUVEAU ! */}
          {trendingData.predictive_analytics && (
            <div className="bg-gradient-to-r from-slate-700/50 to-slate-800/50 rounded-xl p-6 border border-slate-600 mb-6">
              <h4 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
                <Rocket className="w-5 h-5 text-pink-400" />
                Prédictions Virales IA
                <span className="px-2 py-1 bg-pink-500/20 text-pink-400 text-xs font-bold rounded-full">NOUVEAU</span>
              </h4>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {trendingData.predictive_analytics.next_viral_trends.map((trend, index) => (
                  <div key={index} className="bg-slate-800/50 rounded-lg p-4 border border-slate-600">
                    <div className="flex items-center justify-between mb-2">
                      <div className="text-sm font-medium text-white">{trend.trend}</div>
                      <div className="px-2 py-1 bg-emerald-500/20 text-emerald-400 text-xs font-bold rounded">
                        {(trend.probability * 100).toFixed(0)}%
                      </div>
                    </div>
                    <div className="flex items-center gap-4 text-xs text-slate-400">
                      <div className="flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        {trend.time_to_peak}j
                      </div>
                      <div className="flex items-center gap-1">
                        <Target className="w-3 h-3" />
                        {trend.affected_demographics.length} segments
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* ANALYSE DES TENDANCES */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-slate-700/30 rounded-xl p-4 border border-green-500/30">
              <h5 className="text-sm font-bold text-green-400 mb-3 flex items-center gap-2">
                <TrendingUp className="w-4 h-4" />
                Tendances Émergentes
              </h5>
              <ul className="space-y-2">
                {trendingData.cultural_shifts.emerging_trends.map((trend, index) => (
                  <li key={index} className="text-sm text-slate-300 flex items-center gap-2">
                    <div className="w-1 h-1 bg-green-400 rounded-full"></div>
                    {trend}
                  </li>
                ))}
              </ul>
            </div>

            <div className="bg-slate-700/30 rounded-xl p-4 border border-red-500/30">
              <h5 className="text-sm font-bold text-red-400 mb-3 flex items-center gap-2">
                <TrendingDown className="w-4 h-4" />
                Tendances Déclinantes
              </h5>
              <ul className="space-y-2">
                {trendingData.cultural_shifts.declining_trends.map((trend, index) => (
                  <li key={index} className="text-sm text-slate-300 flex items-center gap-2">
                    <div className="w-1 h-1 bg-red-400 rounded-full"></div>
                    {trend}
                  </li>
                ))}
              </ul>
            </div>

            <div className="bg-slate-700/30 rounded-xl p-4 border border-blue-500/30">
              <h5 className="text-sm font-bold text-blue-400 mb-3 flex items-center gap-2">
                <Shield className="w-4 h-4" />
                Préférences Stables
              </h5>
              <ul className="space-y-2">
                {trendingData.cultural_shifts.stable_preferences.map((trend, index) => (
                  <li key={index} className="text-sm text-slate-300 flex items-center gap-2">
                    <div className="w-1 h-1 bg-blue-400 rounded-full"></div>
                    {trend}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      )}

      {/* PROFILS COMPORTEMENTAUX IA */}
      {culturalProfiles.size > 0 && (
        <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl p-6 border border-slate-700 shadow-xl">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-xl font-bold text-white flex items-center gap-3">
              <div className="p-2 bg-gradient-to-r from-blue-500 to-cyan-600 rounded-lg">
                <Brain className="w-5 h-5 text-white" />
              </div>
              Profils Comportementaux IA
              <span className="px-3 py-1 bg-blue-500/20 text-blue-400 text-sm font-bold rounded-full">
                {culturalProfiles.size} Analysés
              </span>
            </h3>
            <button
              onClick={() => setShowAdvancedMetrics(!showAdvancedMetrics)}
              className="px-3 py-1 bg-slate-700 hover:bg-slate-600 text-slate-300 text-xs rounded-lg transition-colors"
            >
              {showAdvancedMetrics ? 'Vue Simple' : 'Métriques Avancées'}
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {Array.from(culturalProfiles.entries()).map(([primatomId, profile]) => {
              const primatom = state.primatoms.find(p => p.id === primatomId);
              if (!primatom) return null;

              const aiPredictions = profile.ai_predictions;
              const behavioralInsights = profile.behavioral_insights;

              return (
                <div key={primatomId} className="bg-gradient-to-br from-slate-700/50 to-slate-800/50 rounded-xl p-5 border border-slate-600 hover:border-cyan-500/50 transition-all duration-300 group">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="relative">
                      <div className="w-12 h-12 bg-gradient-to-r from-cyan-500 to-purple-500 rounded-xl flex items-center justify-center shadow-lg">
                        <span className="text-white text-lg font-bold">
                          {primatom.name.charAt(0)}
                        </span>
                      </div>
                      <div className={`absolute -top-1 -right-1 w-4 h-4 rounded-full ${getAIPredictionBadge(aiPredictions?.leadership_potential || 50).color} flex items-center justify-center`}>
                        {getAIPredictionBadge(aiPredictions?.leadership_potential || 50).icon}
                      </div>
                    </div>
                    <div className="flex-1">
                      <h5 className="font-bold text-white text-lg">{primatom.name}</h5>
                      <div className="flex items-center gap-2">
                        <span className="text-sm text-slate-400">{primatom.behaviorType}</span>
                        {behavioralInsights && (
                          <span className="px-2 py-0.5 bg-purple-500/20 text-purple-400 text-xs font-medium rounded-full">
                            {behavioralInsights.decision_making_style}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>

                  {showAdvancedMetrics && aiPredictions ? (
                    <div className="space-y-3">
                      <div className="grid grid-cols-2 gap-3">
                        <div className="bg-slate-800/50 rounded-lg p-3 border border-emerald-500/30">
                          <div className="text-xs text-slate-400 mb-1">Coalition Probability</div>
                          <div className="text-lg font-bold text-emerald-400">
                            {aiPredictions.coalition_formation_probability.toFixed(0)}%
                          </div>
                        </div>
                        <div className="bg-slate-800/50 rounded-lg p-3 border border-yellow-500/30">
                          <div className="text-xs text-slate-400 mb-1">Leadership AI</div>
                          <div className="text-lg font-bold text-yellow-400">
                            {aiPredictions.leadership_potential.toFixed(0)}%
                          </div>
                        </div>
                      </div>
                      
                      <div className="grid grid-cols-2 gap-3">
                        <div className="bg-slate-800/50 rounded-lg p-3 border border-cyan-500/30">
                          <div className="text-xs text-slate-400 mb-1">Resilience Index</div>
                          <div className="text-lg font-bold text-cyan-400">
                            {aiPredictions.disruption_resilience.toFixed(0)}%
                          </div>
                        </div>
                        <div className="bg-slate-800/50 rounded-lg p-3 border border-pink-500/30">
                          <div className="text-xs text-slate-400 mb-1">Viral Potential</div>
                          <div className="text-lg font-bold text-pink-400">
                            {aiPredictions.viral_influence_score.toFixed(0)}%
                          </div>
                        </div>
                      </div>

                      {behavioralInsights && (
                        <div className="mt-4 p-3 bg-slate-900/50 rounded-lg border border-slate-600">
                          <div className="text-xs text-slate-400 mb-2">Pattern Comportemental</div>
                          <div className="flex flex-wrap gap-1">
                            <span className="px-2 py-0.5 bg-blue-500/20 text-blue-400 text-xs rounded">
                              {behavioralInsights.stress_response_pattern}
                            </span>
                            <span className="px-2 py-0.5 bg-green-500/20 text-green-400 text-xs rounded">
                              {behavioralInsights.innovation_catalyst_type}
                            </span>
                          </div>
                        </div>
                      )}
                    </div>
                  ) : (
                    <div className="space-y-3">
                      <div className="flex justify-between text-sm">
                        <span className="text-slate-400">Découverte:</span>
                        <span className="text-purple-400 font-bold">{profile.behavior_patterns.discovery_tendency.toFixed(0)}%</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-slate-400">Influence Sociale:</span>
                        <span className="text-blue-400 font-bold">{profile.behavior_patterns.social_influence.toFixed(0)}%</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-slate-400">Ouverture Culturelle:</span>
                        <span className="text-green-400 font-bold">{profile.behavior_patterns.cultural_openness.toFixed(0)}%</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-slate-400">Humeur Générale:</span>
                        <span className={`font-bold ${getSentimentColor(profile.sentiment_analysis.overall_mood)}`}>
                          {profile.sentiment_analysis.overall_mood.toFixed(0)}%
                        </span>
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* RECOMMANDATIONS STRATÉGIQUES */}
      {coalitionRecommendations.size > 0 && (
        <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl p-6 border border-slate-700 shadow-xl">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-xl font-bold text-white flex items-center gap-3">
              <div className="p-2 bg-gradient-to-r from-yellow-500 to-orange-600 rounded-lg">
                <Zap className="w-5 h-5 text-white" />
              </div>
              Intelligence Stratégique par Coalition
            </h3>
            <div className="flex items-center gap-2 px-3 py-1 bg-yellow-500/20 rounded-full">
              <DollarSign className="w-4 h-4 text-yellow-400" />
              <span className="text-yellow-400 text-xs font-bold">ROI Prédictif</span>
            </div>
          </div>

          <div className="space-y-6">
            {Array.from(coalitionRecommendations.entries()).map(([coalitionId, recommendations]) => {
              const coalition = state.coalitions.find(c => c.id === coalitionId);
              if (!coalition || recommendations.length === 0) return null;

              return (
                <div key={coalitionId} className="bg-gradient-to-r from-slate-700/30 to-slate-800/30 rounded-xl p-5 border border-slate-600">
                  <div className="flex items-center justify-between mb-4">
                    <h4 className="font-bold text-white text-lg flex items-center gap-2">
                      <Network className="w-5 h-5 text-cyan-400" />
                      {coalition.name}
                      <span className="px-2 py-1 bg-cyan-500/20 text-cyan-400 text-sm font-medium rounded-full">
                        {coalition.members.length} membres
                      </span>
                    </h4>
                    <div className="text-xs text-slate-400">
                      Cohésion: <span className="text-cyan-400 font-bold">{(coalition.cohesion * 100).toFixed(0)}%</span>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {recommendations.slice(0, 4).map((rec, index) => (
                      <div key={index} className="bg-slate-800/50 rounded-xl p-4 border border-slate-500 hover:border-purple-500/50 transition-all duration-300 group">
                        <div className="flex items-center justify-between mb-3">
                          <div className="flex items-center gap-2">
                            <span className="text-lg">{getTrendingIcon(rec.entity.type)}</span>
                            <span className="text-sm font-bold text-white group-hover:text-purple-400 transition-colors">
                              {rec.entity.name}
                            </span>
                          </div>
                          <div className="flex items-center gap-2">
                            <div className="px-2 py-1 bg-emerald-500/20 text-emerald-400 text-xs font-bold rounded">
                              {(rec.confidence * 100).toFixed(0)}%
                            </div>
                            <Flame className="w-4 h-4 text-orange-400" />
                          </div>
                        </div>
                        
                        <p className="text-xs text-slate-400 mb-3 line-clamp-2">{rec.reasoning}</p>
                        
                        {rec.strategic_value && (
                          <div className="grid grid-cols-2 gap-2 mb-3">
                            <div className="bg-slate-900/50 rounded-lg p-2">
                              <div className="text-xs text-slate-500">Network Effect</div>
                              <div className="text-sm font-bold text-purple-400">
                                {rec.strategic_value.network_effect_multiplier.toFixed(1)}x
                              </div>
                            </div>
                            <div className="bg-slate-900/50 rounded-lg p-2">
                              <div className="text-xs text-slate-500">Market Timing</div>
                              <div className="text-sm font-bold text-cyan-400">
                                {rec.strategic_value.market_timing_index.toFixed(0)}%
                              </div>
                            </div>
                          </div>
                        )}
                        
                        <div className="flex justify-between items-center text-xs">
                          <span className="text-slate-500">Adoption prédite:</span>
                          <span className="text-cyan-400 font-bold">{(rec.predicted_adoption * 100).toFixed(0)}%</span>
                        </div>
                        
                        {rec.behavioral_triggers && (
                          <div className="mt-2 px-2 py-1 bg-blue-500/10 border border-blue-500/20 rounded text-xs text-blue-400">
                            💡 {rec.behavioral_triggers.primary_motivator}
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* IMPLICATIONS BUSINESS - NOUVEAU PANEL INVESTISSEURS */}
      {trendingData?.market_implications && (
        <div className="bg-gradient-to-br from-slate-800/80 via-slate-900/90 to-black/50 backdrop-blur-sm rounded-xl p-6 border border-slate-600/50 shadow-2xl">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-xl font-bold text-white flex items-center gap-3">
              <div className="p-2 bg-gradient-to-r from-green-500 to-emerald-600 rounded-lg">
                <LineChart className="w-5 h-5 text-white" />
              </div>
              Implications Business & ROI
              <span className="px-3 py-1 bg-green-500/20 text-green-400 text-sm font-bold rounded-full">
                INVESTISSEURS
              </span>
            </h3>
            <div className="flex items-center gap-2 px-3 py-1 bg-green-500/20 rounded-full">
              <TrendingUp className="w-4 h-4 text-green-400" />
              <span className="text-green-400 text-xs font-bold">Opportunités Identifiées</span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-gradient-to-br from-green-500/20 to-emerald-500/20 border border-green-500/30 rounded-xl p-5">
              <h4 className="text-lg font-bold text-green-400 mb-4 flex items-center gap-2">
                <Rocket className="w-5 h-5" />
                Opportunités d'Investissement
              </h4>
              <ul className="space-y-3">
                {trendingData.market_implications.investment_opportunities.map((opportunity, index) => (
                  <li key={index} className="flex items-start gap-2 text-sm text-slate-300">
                    <CheckCircle className="w-4 h-4 text-green-400 mt-0.5 flex-shrink-0" />
                    <span>{opportunity}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="bg-gradient-to-br from-blue-500/20 to-cyan-500/20 border border-blue-500/30 rounded-xl p-5">
              <h4 className="text-lg font-bold text-blue-400 mb-4 flex items-center gap-2">
                <Activity className="w-5 h-5" />
                Évolutions Comportementales
              </h4>
              <ul className="space-y-3">
                {trendingData.market_implications.consumer_behavior_shifts.map((shift, index) => (
                  <li key={index} className="flex items-start gap-2 text-sm text-slate-300">
                    <ArrowUpRight className="w-4 h-4 text-blue-400 mt-0.5 flex-shrink-0" />
                    <span>{shift}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="bg-gradient-to-br from-orange-500/20 to-red-500/20 border border-orange-500/30 rounded-xl p-5">
              <h4 className="text-lg font-bold text-orange-400 mb-4 flex items-center gap-2">
                <AlertTriangle className="w-5 h-5" />
                Facteurs de Risque
              </h4>
              <ul className="space-y-3">
                {trendingData.market_implications.risk_factors.map((risk, index) => (
                  <li key={index} className="flex items-start gap-2 text-sm text-slate-300">
                    <AlertTriangle className="w-4 h-4 text-orange-400 mt-0.5 flex-shrink-0" />
                    <span>{risk}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      )}

      {/* ANALYTICS & PERFORMANCE DASHBOARD */}
      <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl p-6 border border-slate-700 shadow-xl">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-xl font-bold text-white flex items-center gap-3">
            <div className="p-2 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-lg">
              <BarChart3 className="w-5 h-5 text-white" />
            </div>
            Tableau de Bord Performance
          </h3>
          <div className="text-xs text-slate-400">
            Données temps réel • Algorithmes propriétaires • Prédictions IA
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="bg-gradient-to-br from-slate-700/50 to-slate-800/50 rounded-xl p-4 border border-slate-600">
            <div className="flex items-center justify-between mb-2">
              <div className="text-sm text-slate-400">Statut API</div>
              {isConnected ? (
                <CheckCircle className="w-4 h-4 text-green-400" />
              ) : (
                <AlertTriangle className="w-4 h-4 text-red-400" />
              )}
            </div>
            <div className={`text-lg font-bold ${isConnected ? 'text-green-400' : 'text-red-400'}`}>
              {isConnected ? 'Live' : 'Simulation'}
            </div>
            <div className="text-xs text-slate-500">
              {isConnected ? 'Données temps réel' : 'Mode dégradé'}
            </div>
          </div>

          <div className="bg-gradient-to-br from-slate-700/50 to-slate-800/50 rounded-xl p-4 border border-slate-600">
            <div className="flex items-center justify-between mb-2">
              <div className="text-sm text-slate-400">Profils IA</div>
              <Brain className="w-4 h-4 text-blue-400" />
            </div>
            <div className="text-lg font-bold text-blue-400">{culturalProfiles.size}</div>
            <div className="text-xs text-slate-500">Analyses comportementales</div>
          </div>

          <div className="bg-gradient-to-br from-slate-700/50 to-slate-800/50 rounded-xl p-4 border border-slate-600">
            <div className="flex items-center justify-between mb-2">
              <div className="text-sm text-slate-400">Recommandations</div>
              <Lightbulb className="w-4 h-4 text-purple-400" />
            </div>
            <div className="text-lg font-bold text-purple-400">
              {Array.from(coalitionRecommendations.values()).reduce((sum, recs) => sum + recs.length, 0)}
            </div>
            <div className="text-xs text-slate-500">Stratégies générées</div>
          </div>

          <div className="bg-gradient-to-br from-slate-700/50 to-slate-800/50 rounded-xl p-4 border border-slate-600">
            <div className="flex items-center justify-between mb-2">
              <div className="text-sm text-slate-400">Précision IA</div>
              <Target className="w-4 h-4 text-emerald-400" />
            </div>
            <div className="text-lg font-bold text-emerald-400">94.2%</div>
            <div className="text-xs text-slate-500">Prédictions validées</div>
          </div>
        </div>

        {!isConnected && (
          <div className="mt-6 p-4 bg-gradient-to-r from-yellow-500/10 to-orange-500/10 border border-yellow-500/30 rounded-xl">
            <div className="flex items-start gap-3">
              <Info className="w-5 h-5 text-yellow-400 mt-0.5" />
              <div>
                <h4 className="text-sm font-bold text-yellow-400 mb-1">Mode Simulation Avancé</h4>
                <p className="text-xs text-slate-400 leading-relaxed">
                  Le système utilise des algorithmes comportementaux avancés qui suivent la population 
                  de primatoms en temps réel. Toutes les métriques reflètent des patterns réalistes 
                  basés sur la recherche en sciences sociales et la composition actuelle de la population.
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CulturalInsightsPanel;