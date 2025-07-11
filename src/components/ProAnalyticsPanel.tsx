import React, { useState, useEffect } from 'react';
import { AnalysisEvent, SessionReport, PoliSynthCore } from '../engine/PoliSynthCore';
import { SimulationState } from '../types';
import { Activity, AlertTriangle, TrendingUp, FileText, Download, Filter, Search, Clock, Target, Brain, Users } from 'lucide-react';

interface ProAnalyticsPanelProps {
  state: SimulationState;
  poliSynthCore: PoliSynthCore;
}

const ProAnalyticsPanel: React.FC<ProAnalyticsPanelProps> = ({ state, poliSynthCore }) => {
  const [events, setEvents] = useState<AnalysisEvent[]>([]);
  const [filteredEvents, setFilteredEvents] = useState<AnalysisEvent[]>([]);
  const [selectedEventType, setSelectedEventType] = useState<string>('all');
  const [selectedSeverity, setSelectedSeverity] = useState<string>('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [autoRefresh, setAutoRefresh] = useState(true);
  const [sessionReport, setSessionReport] = useState<SessionReport | null>(null);

  useEffect(() => {
    if (autoRefresh) {
      const interval = setInterval(() => {
        // Analyser l'état actuel et obtenir de nouveaux événements
        const newEvents = poliSynthCore.analyzeSystemState(state);
        const allEvents = poliSynthCore.getRecentEvents(50);
        setEvents(allEvents);
      }, 2000); // Mise à jour toutes les 2 secondes

      return () => clearInterval(interval);
    }
  }, [autoRefresh, state, poliSynthCore]);

  useEffect(() => {
    // Filtrer les événements
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
      const dataStr = JSON.stringify(sessionReport, null, 2);
      const dataUri = 'data:application/json;charset=utf-8,'+ encodeURIComponent(dataStr);
      
      const exportFileDefaultName = `primatoms-session-report-${new Date().toISOString().split('T')[0]}.json`;
      
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

  const formatTimestamp = (timestamp: number) => {
    return new Date(timestamp).toLocaleTimeString('fr-FR', {
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit'
    });
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

  return (
    <div className="space-y-6">
      {/* Header avec contrôles */}
      <div className="bg-slate-800/50 backdrop-blur-sm rounded-lg p-4 border border-slate-700">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-white flex items-center gap-2">
            <Activity className="w-5 h-5 text-cyan-400" />
            Analyse Temps Réel - Mode Professionnel
          </h3>
          <div className="flex items-center gap-2">
            <button
              onClick={() => setAutoRefresh(!autoRefresh)}
              className={`px-3 py-1 rounded text-xs font-medium transition-colors ${
                autoRefresh 
                  ? 'bg-green-500/20 text-green-400 border border-green-500/30' 
                  : 'bg-slate-700 text-gray-400 border border-slate-600'
              }`}
            >
              {autoRefresh ? 'Auto-Refresh ON' : 'Auto-Refresh OFF'}
            </button>
            <button
              onClick={generateSessionReport}
              className="flex items-center gap-2 px-3 py-1 rounded bg-blue-600 hover:bg-blue-700 text-white text-xs font-medium transition-colors"
            >
              <FileText className="w-4 h-4" />
              Rapport Final
            </button>
          </div>
        </div>

        {/* Filtres */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-3">
          <div className="relative">
            <Search className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Rechercher..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-3 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white placeholder-gray-400 focus:border-cyan-500 focus:outline-none text-sm"
            />
          </div>
          
          <select
            value={selectedEventType}
            onChange={(e) => setSelectedEventType(e.target.value)}
            className="px-3 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white focus:border-cyan-500 focus:outline-none text-sm"
          >
            {eventTypes.map(type => (
              <option key={type.value} value={type.value}>{type.label}</option>
            ))}
          </select>

          <select
            value={selectedSeverity}
            onChange={(e) => setSelectedSeverity(e.target.value)}
            className="px-3 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white focus:border-cyan-500 focus:outline-none text-sm"
          >
            {severityLevels.map(level => (
              <option key={level.value} value={level.value}>{level.label}</option>
            ))}
          </select>

          <div className="text-sm text-gray-400 flex items-center gap-2">
            <Filter className="w-4 h-4" />
            {filteredEvents.length} / {events.length} événements
          </div>
        </div>
      </div>

      {/* Métriques en temps réel */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-slate-800/50 backdrop-blur-sm rounded-lg p-4 border border-slate-700">
          <div className="flex items-center gap-2 mb-2">
            <AlertTriangle className="w-4 h-4 text-red-400" />
            <span className="text-sm font-medium text-gray-300">Événements Critiques</span>
          </div>
          <div className="text-2xl font-bold text-red-400">
            {events.filter(e => e.severity === 'critical').length}
          </div>
        </div>

        <div className="bg-slate-800/50 backdrop-blur-sm rounded-lg p-4 border border-slate-700">
          <div className="flex items-center gap-2 mb-2">
            <Users className="w-4 h-4 text-blue-400" />
            <span className="text-sm font-medium text-gray-300">Coalitions Actives</span>
          </div>
          <div className="text-2xl font-bold text-blue-400">
            {state.coalitions.length}
          </div>
        </div>

        <div className="bg-slate-800/50 backdrop-blur-sm rounded-lg p-4 border border-slate-700">
          <div className="flex items-center gap-2 mb-2">
            <Brain className="w-4 h-4 text-purple-400" />
            <span className="text-sm font-medium text-gray-300">Innovations</span>
          </div>
          <div className="text-2xl font-bold text-purple-400">
            {events.filter(e => e.type === 'innovation_emergence').length}
          </div>
        </div>

        <div className="bg-slate-800/50 backdrop-blur-sm rounded-lg p-4 border border-slate-700">
          <div className="flex items-center gap-2 mb-2">
            <TrendingUp className="w-4 h-4 text-green-400" />
            <span className="text-sm font-medium text-gray-300">Stabilité</span>
          </div>
          <div className="text-2xl font-bold text-green-400">
            {(state.systemStability || 75).toFixed(0)}%
          </div>
        </div>
      </div>

      {/* Journal des événements */}
      <div className="bg-slate-800/50 backdrop-blur-sm rounded-lg border border-slate-700">
        <div className="p-4 border-b border-slate-700">
          <h4 className="text-lg font-semibold text-white">Journal des Événements</h4>
        </div>
        
        <div className="max-h-96 overflow-y-auto">
          {filteredEvents.length === 0 ? (
            <div className="p-8 text-center text-gray-400">
              <Activity className="w-12 h-12 mx-auto mb-3 opacity-50" />
              <p>Aucun événement correspondant aux filtres</p>
            </div>
          ) : (
            <div className="space-y-2 p-4">
              {filteredEvents.map((event, index) => (
                <div
                  key={event.id}
                  className={`p-4 rounded-lg border transition-all hover:scale-[1.02] ${getSeverityColor(event.severity)}`}
                >
                  <div className="flex items-start justify-between mb-2">
                    <div className="flex items-center gap-2">
                      {getEventIcon(event.type)}
                      <span className="font-medium text-white">{event.description}</span>
                    </div>
                    <div className="flex items-center gap-2 text-xs text-gray-400">
                      <Clock className="w-3 h-3" />
                      {formatTimestamp(event.timestamp)}
                    </div>
                  </div>

                  {/* Métriques de l'événement */}
                  {Object.keys(event.metrics).length > 0 && (
                    <div className="mb-3">
                      <div className="text-xs text-gray-400 mb-1">Métriques:</div>
                      <div className="flex flex-wrap gap-2">
                        {Object.entries(event.metrics).map(([key, value]) => (
                          <span key={key} className="text-xs bg-slate-700/50 px-2 py-1 rounded">
                            {key}: {typeof value === 'number' ? value.toFixed(1) : value}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Primatoms affectés */}
                  {event.affectedPrimatoms.length > 0 && (
                    <div className="mb-3">
                      <div className="text-xs text-gray-400 mb-1">
                        Primatoms affectés ({event.affectedPrimatoms.length}):
                      </div>
                      <div className="text-xs text-gray-300">
                        {event.affectedPrimatoms.slice(0, 5).join(', ')}
                        {event.affectedPrimatoms.length > 5 && ` +${event.affectedPrimatoms.length - 5} autres`}
                      </div>
                    </div>
                  )}

                  {/* Impact prédit */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-2 text-xs">
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
                    <div className="mt-3 pt-3 border-t border-slate-600">
                      <div className="text-xs text-gray-400 mb-1">Recommandations:</div>
                      <ul className="text-xs text-gray-300 space-y-1">
                        {event.recommendations.map((rec, i) => (
                          <li key={i} className="flex items-start gap-1">
                            <span className="text-cyan-400">•</span>
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

      {/* Rapport de session */}
      {sessionReport && (
        <div className="bg-slate-800/50 backdrop-blur-sm rounded-lg border border-slate-700">
          <div className="p-4 border-b border-slate-700 flex items-center justify-between">
            <h4 className="text-lg font-semibold text-white">Rapport de Session Final</h4>
            <button
              onClick={exportReport}
              className="flex items-center gap-2 px-3 py-1 rounded bg-green-600 hover:bg-green-700 text-white text-xs font-medium transition-colors"
            >
              <Download className="w-4 h-4" />
              Exporter
            </button>
          </div>
          
          <div className="p-4 space-y-4">
            {/* Métriques de session */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="text-center">
                <div className="text-2xl font-bold text-cyan-400">{sessionReport.totalEvents}</div>
                <div className="text-xs text-gray-400">Événements totaux</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-green-400">{sessionReport.dataQuality.toFixed(0)}%</div>
                <div className="text-xs text-gray-400">Qualité des données</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-blue-400">{sessionReport.confidenceLevel.toFixed(0)}%</div>
                <div className="text-xs text-gray-400">Niveau de confiance</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-purple-400">
                  {Math.round((sessionReport.endTime - sessionReport.startTime) / 60000)}m
                </div>
                <div className="text-xs text-gray-400">Durée de session</div>
              </div>
            </div>

            {/* Découvertes clés */}
            <div>
              <h5 className="text-sm font-medium text-white mb-2">Découvertes Clés</h5>
              <ul className="space-y-1">
                {sessionReport.keyFindings.map((finding, i) => (
                  <li key={i} className="text-sm text-gray-300 flex items-start gap-2">
                    <span className="text-cyan-400">•</span>
                    {finding}
                  </li>
                ))}
              </ul>
            </div>

            {/* Patterns émergents */}
            <div>
              <h5 className="text-sm font-medium text-white mb-2">Patterns Émergents</h5>
              <ul className="space-y-1">
                {sessionReport.emergentPatterns.map((pattern, i) => (
                  <li key={i} className="text-sm text-gray-300 flex items-start gap-2">
                    <span className="text-purple-400">•</span>
                    {pattern}
                  </li>
                ))}
              </ul>
            </div>

            {/* Recommandations finales */}
            <div>
              <h5 className="text-sm font-medium text-white mb-2">Recommandations</h5>
              <ul className="space-y-1">
                {sessionReport.recommendations.map((rec, i) => (
                  <li key={i} className="text-sm text-gray-300 flex items-start gap-2">
                    <span className="text-green-400">•</span>
                    {rec}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProAnalyticsPanel;