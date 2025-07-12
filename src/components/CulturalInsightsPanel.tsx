import React, { useState, useEffect } from 'react';
import { SimulationState } from '../types';
import { qlooService, QlooTrendingData, QlooConsumerProfile, QlooRecommendation } from '../services/QlooAPIService';
import { Globe, TrendingUp, Users, Zap, Brain, Eye, Wifi, WifiOff, RefreshCw, BarChart3 } from 'lucide-react';

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

  useEffect(() => {
    checkConnection();
  }, []);

  useEffect(() => {
    if (isRunning && isConnected) {
      const interval = setInterval(() => {
        updateCulturalData();
      }, 30000); // Update every 30 seconds

      return () => clearInterval(interval);
    }
  }, [isRunning, isConnected, state]);

  const checkConnection = async () => {
    try {
      const connected = await qlooService.testConnection();
      setIsConnected(connected);
      if (connected) {
        updateCulturalData();
      }
    } catch (error) {
      setIsConnected(false);
    }
  };

  const updateCulturalData = async () => {
    if (!isConnected) return;
    
    setIsLoading(true);
    try {
      // Fetch global trends
      const trends = await qlooService.getGlobalTrends();
      setTrendingData(trends);

      // Generate cultural profiles for selected Primatoms
      const profiles = new Map<string, QlooConsumerProfile>();
      const samplePrimatoms = state.primatoms.slice(0, 10); // Limit to avoid API rate limits
      
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
      for (const coalition of state.coalitions.slice(0, 5)) {
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
    if (sentiment > 70) return 'text-green-400';
    if (sentiment > 40) return 'text-yellow-400';
    return 'text-red-400';
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

  return (
    <div className="space-y-6">
      {/* Header with connection status */}
      <div className="bg-slate-800/50 backdrop-blur-sm rounded-lg p-6 border border-slate-700">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-white flex items-center gap-2">
            <Globe className="w-5 h-5 text-cyan-400" />
            Insights Culturels Mondiaux - Qloo API
            {isLoading && (
              <RefreshCw className="w-4 h-4 text-cyan-400 animate-spin" />
            )}
          </h3>
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2">
              {isConnected ? (
                <Wifi className="w-4 h-4 text-green-400" />
              ) : (
                <WifiOff className="w-4 h-4 text-red-400" />
              )}
              <span className={`text-sm font-medium ${isConnected ? 'text-green-400' : 'text-red-400'}`}>
                {isConnected ? 'Connecté' : 'Déconnecté'}
              </span>
            </div>
            <button
              onClick={updateCulturalData}
              disabled={!isConnected || isLoading}
              className="flex items-center gap-2 px-3 py-1 rounded-lg bg-cyan-600 hover:bg-cyan-700 disabled:bg-gray-600 disabled:cursor-not-allowed text-white text-sm transition-colors"
            >
              <RefreshCw className="w-4 h-4" />
              Actualiser
            </button>
          </div>
        </div>

        {lastUpdate > 0 && (
          <div className="text-xs text-gray-400">
            Dernière mise à jour: {new Date(lastUpdate).toLocaleTimeString()}
          </div>
        )}
      </div>

      {/* Global Trends */}
      {trendingData && (
        <div className="bg-slate-800/50 backdrop-blur-sm rounded-lg p-6 border border-slate-700">
          <h4 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
            <TrendingUp className="w-5 h-5 text-green-400" />
            Tendances Culturelles Mondiales
          </h4>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <div className="bg-slate-700/50 rounded-lg p-4">
              <div className="flex items-center gap-2 mb-2">
                <Eye className="w-4 h-4 text-blue-400" />
                <span className="text-sm font-medium text-gray-300">Optimisme Global</span>
              </div>
              <div className={`text-2xl font-bold ${getSentimentColor(trendingData.global_sentiment.optimism)}`}>
                {trendingData.global_sentiment.optimism.toFixed(0)}%
              </div>
            </div>

            <div className="bg-slate-700/50 rounded-lg p-4">
              <div className="flex items-center gap-2 mb-2">
                <Users className="w-4 h-4 text-green-400" />
                <span className="text-sm font-medium text-gray-300">Cohésion Sociale</span>
              </div>
              <div className={`text-2xl font-bold ${getSentimentColor(trendingData.global_sentiment.social_cohesion)}`}>
                {trendingData.global_sentiment.social_cohesion.toFixed(0)}%
              </div>
            </div>

            <div className="bg-slate-700/50 rounded-lg p-4">
              <div className="flex items-center gap-2 mb-2">
                <Brain className="w-4 h-4 text-purple-400" />
                <span className="text-sm font-medium text-gray-300">Appétit Innovation</span>
              </div>
              <div className={`text-2xl font-bold ${getSentimentColor(trendingData.global_sentiment.innovation_appetite)}`}>
                {trendingData.global_sentiment.innovation_appetite.toFixed(0)}%
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <h5 className="text-sm font-medium text-green-400 mb-2">Tendances Émergentes</h5>
              <ul className="space-y-1">
                {trendingData.cultural_shifts.emerging_trends.map((trend, index) => (
                  <li key={index} className="text-sm text-gray-300 flex items-center gap-2">
                    <span className="text-green-400">↗</span>
                    {trend}
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h5 className="text-sm font-medium text-red-400 mb-2">Tendances Déclinantes</h5>
              <ul className="space-y-1">
                {trendingData.cultural_shifts.declining_trends.map((trend, index) => (
                  <li key={index} className="text-sm text-gray-300 flex items-center gap-2">
                    <span className="text-red-400">↘</span>
                    {trend}
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h5 className="text-sm font-medium text-blue-400 mb-2">Préférences Stables</h5>
              <ul className="space-y-1">
                {trendingData.cultural_shifts.stable_preferences.map((trend, index) => (
                  <li key={index} className="text-sm text-gray-300 flex items-center gap-2">
                    <span className="text-blue-400">→</span>
                    {trend}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      )}

      {/* Cultural Profiles */}
      {culturalProfiles.size > 0 && (
        <div className="bg-slate-800/50 backdrop-blur-sm rounded-lg p-6 border border-slate-700">
          <h4 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
            <Users className="w-5 h-5 text-blue-400" />
            Profils Culturels des Primatoms ({culturalProfiles.size})
          </h4>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {Array.from(culturalProfiles.entries()).map(([primatomId, profile]) => {
              const primatom = state.primatoms.find(p => p.id === primatomId);
              if (!primatom) return null;

              return (
                <div key={primatomId} className="bg-slate-700/50 rounded-lg p-4 border border-slate-600">
                  <div className="flex items-center gap-2 mb-3">
                    <div className="w-8 h-8 bg-gradient-to-r from-cyan-500 to-purple-500 rounded-full flex items-center justify-center">
                      <span className="text-white text-xs font-bold">
                        {primatom.name.charAt(0)}
                      </span>
                    </div>
                    <div>
                      <h5 className="font-medium text-white">{primatom.name}</h5>
                      <p className="text-xs text-gray-400">{primatom.behaviorType}</p>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <div className="flex justify-between text-xs">
                      <span className="text-gray-400">Découverte:</span>
                      <span className="text-purple-400">{profile.behavior_patterns.discovery_tendency.toFixed(0)}%</span>
                    </div>
                    <div className="flex justify-between text-xs">
                      <span className="text-gray-400">Influence Sociale:</span>
                      <span className="text-blue-400">{profile.behavior_patterns.social_influence.toFixed(0)}%</span>
                    </div>
                    <div className="flex justify-between text-xs">
                      <span className="text-gray-400">Ouverture Culturelle:</span>
                      <span className="text-green-400">{profile.behavior_patterns.cultural_openness.toFixed(0)}%</span>
                    </div>
                    <div className="flex justify-between text-xs">
                      <span className="text-gray-400">Humeur Générale:</span>
                      <span className={getSentimentColor(profile.sentiment_analysis.overall_mood)}>
                        {profile.sentiment_analysis.overall_mood.toFixed(0)}%
                      </span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Coalition Recommendations */}
      {coalitionRecommendations.size > 0 && (
        <div className="bg-slate-800/50 backdrop-blur-sm rounded-lg p-6 border border-slate-700">
          <h4 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
            <Zap className="w-5 h-5 text-yellow-400" />
            Recommandations Culturelles par Coalition
          </h4>

          <div className="space-y-4">
            {Array.from(coalitionRecommendations.entries()).map(([coalitionId, recommendations]) => {
              const coalition = state.coalitions.find(c => c.id === coalitionId);
              if (!coalition || recommendations.length === 0) return null;

              return (
                <div key={coalitionId} className="bg-slate-700/50 rounded-lg p-4 border border-slate-600">
                  <h5 className="font-medium text-white mb-3 flex items-center gap-2">
                    <Users className="w-4 h-4 text-cyan-400" />
                    {coalition.name} ({coalition.members.length} membres)
                  </h5>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {recommendations.slice(0, 4).map((rec, index) => (
                      <div key={index} className="bg-slate-800/50 rounded-lg p-3 border border-slate-500">
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-sm font-medium text-white flex items-center gap-1">
                            {getTrendingIcon(rec.entity.type)}
                            {rec.entity.name}
                          </span>
                          <span className="text-xs text-green-400 font-bold">
                            {(rec.confidence * 100).toFixed(0)}%
                          </span>
                        </div>
                        <p className="text-xs text-gray-400 mb-2">{rec.reasoning}</p>
                        <div className="flex justify-between text-xs">
                          <span className="text-gray-500">Adoption prédite:</span>
                          <span className="text-cyan-400">{(rec.predicted_adoption * 100).toFixed(0)}%</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* API Status and Info */}
      <div className="bg-slate-800/50 backdrop-blur-sm rounded-lg p-6 border border-slate-700">
        <h4 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
          <BarChart3 className="w-5 h-5 text-cyan-400" />
          Statut de l'API Qloo
        </h4>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-slate-700/50 rounded-lg p-4">
            <div className="text-sm text-gray-400 mb-1">Statut de Connexion</div>
            <div className={`font-bold ${isConnected ? 'text-green-400' : 'text-red-400'}`}>
              {isConnected ? 'Connecté' : 'Déconnecté'}
            </div>
          </div>

          <div className="bg-slate-700/50 rounded-lg p-4">
            <div className="text-sm text-gray-400 mb-1">Profils Générés</div>
            <div className="font-bold text-blue-400">{culturalProfiles.size}</div>
          </div>

          <div className="bg-slate-700/50 rounded-lg p-4">
            <div className="text-sm text-gray-400 mb-1">Recommandations</div>
            <div className="font-bold text-purple-400">
              {Array.from(coalitionRecommendations.values()).reduce((sum, recs) => sum + recs.length, 0)}
            </div>
          </div>
        </div>

        {!isConnected && (
          <div className="mt-4 p-3 bg-yellow-500/10 border border-yellow-500/30 rounded-lg">
            <p className="text-xs text-yellow-400">
              ⚠️ API Qloo non disponible. Vérifiez votre clé API dans les variables d'environnement.
              Les fonctionnalités culturelles utilisent des données simulées.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default CulturalInsightsPanel;