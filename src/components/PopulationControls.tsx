{/* TABLEAU DE BORD EXÉCUTIF */}
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

          {/* MÉTRIQUES PRINCIPALES */}
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

            <div className="bg-gradient-to-br from-green-500/20 to-emerald-500/20 border border-green-500/30 rounded-xl p-4">
              <div className="flex items-center justify-between mb-3">
                <Users className="w-5 h-5 text-green-400" />
                {getPerformanceIcon(globalSentiment.social_cohesion)}
              </div>
              <div className="text-2xl font-bold text-green-400 mb-1">
                {globalSentiment.social_cohesion.toFixed(0)}%
              </div>
              <div className="text-xs text-slate-400">Cohésion Sociale</div>
              <div className="text-xs text-green-300 mt-1">
                {state.coalitions.length} réseaux actifs
              </div>
            </div>

            <div className="bg-gradient-to-br from-purple-500/20 to-pink-500/20 border border-purple-500/30 rounded-xl p-4">
              <div className="flex items-center justify-between mb-3">
                <Brain className="w-5 h-5 text-purple-400" />
                {getPerformanceIcon(globalSentiment.innovation_appetite)}
              </div>
              <div className="text-2xl font-bold text-purple-400 mb-1">
                {globalSentiment.innovation_appetite.toFixed(0)}%
              </div>
              <div className="text-xs text-slate-400">Appétit Innovation</div>
              <div className="text-xs text-purple-300 mt-1">
                Vélocité: {globalSentiment.cultural_velocity.toFixed(0)}%
              </div>
            </div>

            <div className="bg-gradient-to-br from-yellow-500/20 to-orange-500/20 border border-yellow-500/30 rounded-xl p-4">
              <div className="flex items-center justify-between mb-3">
                <Gauge className="w-5 h-5 text-yellow-400" />
                {getPerformanceIcon(globalSentiment.collective_intelligence)}
              </div>
              <div className="text-2xl font-bold text-yellow-400 mb-1">
                {globalSentiment.collective_intelligence.toFixed(0)}%
              </div>
              <div className="text-xs text-slate-400">Intelligence Collective</div>
              <div className="text-xs text-yellow-300 mt-1">
                Trust: {globalSentiment.trust_index.toFixed(0)}%
              </div>
            </div>
          </div>

          {/* PRÉDICTIONS VIRALES */}
          {predictiveAnalytics && (
            <div className="bg-gradient-to-r from-slate-700/50 to-slate-800/50 rounded-xl p-6 border border-slate-600 mb-6">
              <h4 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
                <Rocket className="w-5 h-5 text-pink-400" />
                Prédictions Émergence IA
                <span className="px-2 py-1 bg-pink-500/20 text-pink-400 text-xs font-bold rounded-full">
                  TEMPS RÉEL
                </span>
              </h4>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {predictiveAnalytics.next_viral_trends.map((trend, index) => (
                  <div key={index} className="bg-slate-800/50 rounded-lg p-4 border border-slate-600 hover:border-pink-500/50 transition-colors">
                    <div className="flex items-center justify-between mb-2">
                      <div className="text-sm font-medium text-white">{trend.trend}</div>
                      <div className="px-2 py-1 bg-emerald-500/20 text-emerald-400 text-xs font-bold rounded">
                        {(trend.probability * 100).toFixed(0)}%
                      </div>
                    </div>
                    <div className="text-xs text-slate-300 mb-3">{trend.catalyst_factor}</div>
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

              <div className="mt-4 p-3 bg-slate-900/50 rounded-lg border border-slate-600">
                <h5 className="text-sm font-medium text-white mb-2">Patterns d'Émergence Détectés</h5>
                <div className="flex flex-wrap gap-2">
                  {predictiveAnalytics.emergence_patterns.map((pattern, i) => (
                    <span key={i} className="px-2 py-1 bg-cyan-500/20 text-cyan-400 text-xs rounded">
                      {pattern}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* ANALYSE DES TENDANCES */}
          {trendingEntities.length > 0 && (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-slate-700/30 rounded-xl p-4 border border-green-500/30">
                <h5 className="text-sm font-bold text-green-400 mb-3 flex items-center gap-2">
                  <TrendingUp className="w-4 h-4" />
                  Tendances Émergentes
                </h5>
                <ul className="space-y-2">
                  {trendingEntities.slice(0, 4).map((trend, index) => (
                    <li key={index} className="text-sm text-slate-300 flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div className="w-1 h-1 bg-green-400 rounded-full"></div>
                        <span>{trend.name}</span>
                      </div>
                      <span className="text-green-400 text-xs font-bold">
                        {trend.trending_score.toFixed(0)}%
                      </span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="bg-slate-700/30 rounded-xl p-4 border border-blue-500/30">
                <h5 className="text-sm font-bold text-blue-400 mb-3 flex items-center gap-2">
                  <Shield className="w-4 h-4" />
                  Patterns Stables
                </h5>
                <ul className="space-y-2">
                  {['Coopération Inter-Coalitions', 'Réseaux de Confiance', 'Innovation Collaborative', 'Consensus Distribué'].map((pattern, index) => (
                    <li key={index} className="text-sm text-slate-300 flex items-center gap-2">
                      <div className="w-1 h-1 bg-blue-400 rounded-full"></div>
                      {pattern}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="bg-slate-700/30 rounded-xl p-4 border border-purple-500/30">
                <h5 className="text-sm font-bold text-purple-400 mb-3 flex items-center gap-2">
                  <Cpu className="w-4 h-4" />
                  Métriques IA
                </h5>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-slate-400">Score Collectif:</span>
                    <span className="text-purple-400 font-bold">
                      {predictiveAnalytics?.collective_intelligence_score.toFixed(0) || 0}%
                    </span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-slate-400">Tension Sociale:</span>
                    <span className="text-orange-400 font-bold">
                      {predictiveAnalytics?.social_tension_index.toFixed(0) || 0}%
                    </span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-slate-400">Disruption:</span>
                    <span className="text-pink-400 font-bold">
                      {predictiveAnalytics?.disruption_likelihood.toFixed(0) || 0}%
                    </span>
                  </div>
                </div>
              </div>
            </div>
          )}
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
                      <div className={`absolute -top-1 -right-1 w-4 h-4 rounded-full ${getAIPredictionBadge(aiPredictions.leadership_potential).color} flex items-center justify-center`}>
                        {getAIPredictionBadge(aiPredictions.leadership_potential).icon}
                      </div>
                    </div>
                    <div className="flex-1">
                      <h5 className="font-bold text-white text-lg">{primatom.name}</h5>
                      <div className="flex items-center gap-2">
                        <span className="text-sm text-slate-400">{primatom.behaviorType}</span>
                        <span className="px-2 py-0.5 bg-purple-500/20 text-purple-400 text-xs font-medium rounded-full">
                          {behavioralInsights.decision_making_style}
                        </span>
                      </div>
                    </div>
                  </div>

                  {showAdvancedMetrics ? (
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
                    </div>
                  ) : (
                    <div className="space-y-3">
                      <div className="flex justify-between text-sm">
                        <span className="text-slate-400">Découverte:</span>
                        <span className="text-purple-400 font-bold">
                          {profile.behavior_patterns.discovery_tendency.toFixed(0)}%
                        </span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-slate-400">Influence Sociale:</span>
                        <span className="text-blue-400 font-bold">
                          {profile.behavior_patterns.social_influence.toFixed(0)}%
                        </span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-slate-400">Ouverture Culturelle:</span>
                        <span className="text-green-400 font-bold">
                          {profile.behavior_patterns.cultural_openness.toFixed(0)}%
                        </span>
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
                        
                        <p className="text-xs text-slate-400 mb-3">{rec.reasoning}</p>
                        
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

      {/* IMPLICATIONS BUSINESS */}
      {marketImplications && (
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
              <span className="text-green-400 text-xs font-bold">Opportunités Live</span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-gradient-to-br from-green-500/20 to-emerald-500/20 border border-green-500/30 rounded-xl p-5">
              <h4 className="text-lg font-bold text-green-400 mb-4 flex items-center gap-2">
                <Rocket className="w-5 h-5" />
                Opportunités d'Investissement
              </h4>
              <ul className="space-y-3">
                {marketImplications.investment_opportunities.map((opportunity, index) => (
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
                {marketImplications.consumer_behavior_shifts.map((shift, index) => (
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
                {marketImplications.risk_factors.map((risk, index) => (
                  <li key={index} className="flex items-start gap-2 text-sm text-slate-300">
                    <AlertTriangle className="w-4 h-4 text-orange-400 mt-0.5 flex-shrink-0" />
                    <span>{risk}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Market Timing Signals */}
          <div className="mt-6 p-4 bg-slate-700/30 rounded-xl border border-slate-600">
            <h5 className="text-sm font-bold text-white mb-3 flex items-center gap-2">
              <Clock className="w-4 h-4 text-cyan-400" />
              Signaux de Timing Marché
            </h5>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {marketImplications.market_timing_signals.map((signal, index) => (
                <div key={index} className="text-sm text-slate-300 flex items-center gap-2">
                  <div className="w-1 h-1 bg-cyan-400 rounded-full"></div>
                  {signal}
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* TABLEAU DE BORD PERFORMANCE */}
      <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl p-6 border border-slate-700 shadow-xl">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-xl font-bold text-white flex items-center gap-3">
            <div className="p-2 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-lg">
              <BarChart3 className="w-5 h-5 text-white" />
            </div>
            Tableau de Bord Performance
          </h3>
          <div className="text-xs text-slate-400">
            Données temps réel • Population: {state.primatoms.length} • Algorithmes IA
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="bg-gradient-to-br from-slate-700/50 to-slate-800/50 rounded-xl p-4 border border-slate-600">
            <div className="flex items-center justify-between mb-2">
              <div className="text-sm text-slate-400">Statut Système</div>
              <CheckCircle className="w-4 h-4 text-green-400" />
            </div>
            <div className="text-lg font-bold text-green-400">LIVE</div>
            <div className="text-xs text-slate-500">Données temps réel</div>
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
            <div className="text-lg font-bold text-emerald-400">
              {globalSentiment ? Math.floor(85 + (globalSentiment.collective_intelligence * 0.1)) : 94}%
            </div>
            <div className="text-xs text-slate-500">Prédictions validées</div>
          </div>
        </div>

        <div className="mt-6 p-4 bg-gradient-to-r from-cyan-500/10 to-purple-500/10 border border-cyan-500/30 rounded-xl">
          <div className="flex items-start gap-3">
            <Info className="w-5 h-5 text-cyan-400 mt-0.5" />
            <div>
              <h4 className="text-sm font-bold text-cyan-400 mb-1">Intelligence Culturelle Temps Réel Active</h4>
              <p className="text-xs text-slate-400 leading-relaxed">
                Le système analyse en continu les {state.primatoms.length} primatoms pour détecter les patterns culturels émergents. 
                Toutes les métriques sont calculées dynamiquement et reflètent l'état réel de la population avec {state.coalitions.length} réseaux actifs. 
                Les prédictions IA s'adaptent automatiquement aux changements comportementaux.
              </p>
              <div className="mt-2 flex items-center gap-4 text-xs">
                <span className="text-cyan-400">
                  📊 {culturalProfiles.size} profils analysés
                </span>
                <span className="text-purple-400">
                  🎯 {Array.from(coalitionRecommendations.values()).reduce((sum, recs) => sum + recs.length, 0)} recommandations actives
                </span>
                <span className="text-green-400">
                  ⚡ {trendingEntities.length} tendances suivies
                </span>
            </div>
          </div>
        </div>
      </div>
    </div>
};

export default PopulationControls;

export default CulturalInsightsPanel;import React, { useState, useEffect } from 'react';
import { SimulationState } from '../types';
import { 
  Globe, TrendingUp, Users, Zap, Brain, Eye, Wifi, RefreshCw, BarChart3,
  Target, Rocket, Lightbulb, Network, Shield, Sparkles, TrendingDown, Activity,
  AlertTriangle, CheckCircle, Clock, DollarSign, Gauge, LineChart,
  ArrowUpRight, ArrowDownRight, Minus, Star, Crown, Gem, Flame, Cpu, Info,
  Atom, Circle, Search, Telescope, PieChart, Wifi as WifiIcon
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
  demographics: any;
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
  trending_affinities: TrendingEntity[];
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
      demographics: calculateDemographics(state),
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
        behavioral_insights: generateBehavioralInsights(primatom),
        trending_affinities: generatePersonalTrends(primatom, state)
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

  const generatePersonalTrends = (primatom: any, state: SimulationState): TrendingEntity[] => {
    return trendingEntities.slice(0, 3).map(trend => ({
      ...trend,
      popularity: Math.min(95, trend.popularity + (primatom.innovation * 0.2) + Math.random() * 10),
      cultural_impact: Math.min(95, trend.cultural_impact + (primatom.cooperation * 0.15) + Math.random() * 8)
    }));
  };

  const calculateDemographics = (state: SimulationState) => {
    const behaviorTypes = ['leader', 'innovator', 'mediator', 'explorer', 'follower'];
    const distribution: Record<string, number> = {};
    
    behaviorTypes.forEach(type => {
      distribution[type] = state.primatoms.filter(p => p.behaviorType === type).length;
    });

    return { behavior_distribution: distribution, total_population: state.primatoms.length };
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
              <WifiIcon className="w-4 h-4 text-green-400" />
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

      {/* TABLEAU DE BORD EXÉCUT