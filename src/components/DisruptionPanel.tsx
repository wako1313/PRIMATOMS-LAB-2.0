import React, { useState, useCallback, useEffect } from 'react';
import { DisruptiveEvent, SimulationState } from '../types';
import { Zap, AlertTriangle, TrendingUp, Shield, Users, Brain, Target, Clock, Activity } from 'lucide-react';

interface DisruptionPanelProps {
  state: SimulationState;
  onInjectEvent: (eventConfig: Partial<DisruptiveEvent>) => void;
  onPredictImpact: (eventConfig: Partial<DisruptiveEvent>) => any;
}

const DisruptionPanel: React.FC<DisruptionPanelProps> = ({ state, onInjectEvent, onPredictImpact }) => {
  const [selectedEventType, setSelectedEventType] = useState<DisruptiveEvent['type']>('innovation_catalyst');
  const [eventIntensity, setEventIntensity] = useState(5);
  const [eventDuration, setEventDuration] = useState(30);
  const [customName, setCustomName] = useState('');
  const [customDescription, setCustomDescription] = useState('');
  const [predictionResult, setPredictionResult] = useState<any>(null);
  const [disruptionHistory, setDisruptionHistory] = useState<Partial<DisruptiveEvent>[]>([]);

  const eventTypes = [
    { type: 'resource_scarcity', name: 'Rareté des Ressources', icon: <AlertTriangle className="w-4 h-4" />, color: 'text-red-400', description: 'Réduction des ressources disponibles' },
    { type: 'environmental_change', name: 'Changement Environnemental', icon: <TrendingUp className="w-4 h-4" />, color: 'text-orange-400', description: 'Modification des conditions environnementales' },
    { type: 'newcomer_arrival', name: 'Arrivée de Nouveaux Membres', icon: <Users className="w-4 h-4" />, color: 'text-blue-400', description: 'Intégration de nouveaux Primatoms' },
    { type: 'innovation_catalyst', name: 'Catalyseur d\'Innovation', icon: <Brain className="w-4 h-4" />, color: 'text-purple-400', description: 'Stimulation de l\'innovation collective' },
    { type: 'governance_crisis', name: 'Crise de Gouvernance', icon: <Target className="w-4 h-4" />, color: 'text-yellow-400', description: 'Remise en question des structures de pouvoir' },
    { type: 'conflict_trigger', name: 'Déclencheur de Conflit', icon: <Shield className="w-4 h-4" />, color: 'text-red-500', description: 'Génération de tensions sociales' },
  ];

  const generateEffects = useCallback((type: DisruptiveEvent['type'], intensity: number) => {
    const factor = intensity / 10;
    switch (type) {
      case 'resource_scarcity':
        return { trustModifier: -0.3 * factor, energyModifier: -0.5 * factor, cooperationModifier: 0.2 * factor, innovationModifier: 0.4 * factor };
      case 'innovation_catalyst':
        return { trustModifier: 0.2 * factor, energyModifier: 0.3 * factor, cooperationModifier: 0.4 * factor, innovationModifier: 0.6 * factor };
      case 'governance_crisis':
        return { trustModifier: -0.4 * factor, energyModifier: -0.2 * factor, cooperationModifier: -0.3 * factor, innovationModifier: 0.5 * factor };
      case 'newcomer_arrival':
        return { trustModifier: -0.1 * factor, energyModifier: 0.1 * factor, cooperationModifier: -0.2 * factor, innovationModifier: 0.3 * factor };
      case 'environmental_change':
        return { trustModifier: 0.1 * factor, energyModifier: -0.6 * factor, cooperationModifier: 0.5 * factor, innovationModifier: 0.7 * factor };
      case 'conflict_trigger':
        return { trustModifier: -0.5 * factor, energyModifier: -0.3 * factor, cooperationModifier: -0.4 * factor, innovationModifier: 0.2 * factor };
      default:
        return { trustModifier: 0, energyModifier: 0, cooperationModifier: 0, innovationModifier: 0 };
    }
  }, []);

  const handleInjectEvent = () => {
    const eventConfig: Partial<DisruptiveEvent> = {
      type: selectedEventType,
      name: customName || eventTypes.find(t => t.type === selectedEventType)?.name,
      description: customDescription || eventTypes.find(t => t.type === selectedEventType)?.description,
      intensity: eventIntensity,
      duration: eventDuration,
      effects: generateEffects(selectedEventType, eventIntensity),
      timestamp: new Date().toISOString(),
    };
    onInjectEvent(eventConfig);
    setDisruptionHistory(prev => [...prev, eventConfig].slice(-10)); // Limit history to last 10 events
  };

  const handlePredictImpact = () => {
    const eventConfig: Partial<DisruptiveEvent> = {
      type: selectedEventType,
      intensity: eventIntensity,
      duration: eventDuration,
      effects: generateEffects(selectedEventType, eventIntensity),
    };
    const result = onPredictImpact(eventConfig);
    setPredictionResult(result);
  };

  useEffect(() => {
    // Sync active disruptions with history if not already present
    const activeEvents = state.activeDisruptions || [];
    const newHistory = activeEvents.filter(event => 
      !disruptionHistory.some(h => h.timestamp === event.timestamp)
    ).map(event => ({ ...event, timestamp: event.timestamp }));
    if (newHistory.length > 0) {
      setDisruptionHistory(prev => [...prev, ...newHistory].slice(-10));
    }
  }, [state.activeDisruptions, disruptionHistory]);

  return (
    <div className="space-y-6">
      <div className="bg-slate-800/50 backdrop-blur-sm rounded-lg p-6 border border-slate-700">
        <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
          <Activity className="w-5 h-5 text-cyan-400" />
          Disruptions Actives
        </h3>
        {state.activeDisruptions && state.activeDisruptions.length > 0 ? (
          <div className="space-y-3">
            {state.activeDisruptions.map((event, index) => (
              <div key={index} className="bg-slate-700/50 rounded-lg p-4 border border-slate-600">
                <div className="flex items-center justify-between mb-2">
                  <h4 className="font-medium text-white flex items-center gap-2">
                    <Zap className="w-4 h-4 text-yellow-400" />
                    {event.name}
                  </h4>
                  <div className="flex items-center gap-2 text-sm text-gray-400">
                    <Clock className="w-4 h-4" />
                    {event.duration} cycles restants
                  </div>
                </div>
                <p className="text-sm text-gray-300 mb-3">{event.description}</p>
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-1">
                    <span className="text-xs text-gray-400">Intensité:</span>
                    <div className="flex">
                      {[...Array(10)].map((_, i) => (
                        <div
                          key={i}
                          className={`w-2 h-2 rounded-full mr-1 ${
                            i < event.intensity ? 'bg-red-500' : 'bg-gray-600'
                          }`}
                        />
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-8">
            <Zap className="w-12 h-12 text-gray-400 mx-auto mb-3" />
            <p className="text-gray-400">Aucune disruption active</p>
            <p className="text-sm text-gray-500">Le système est en état stable</p>
          </div>
        )}
      </div>

      <div className="bg-slate-800/50 backdrop-blur-sm rounded-lg p-6 border border-slate-700">
        <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
          <Brain className="w-5 h-5 text-purple-400" />
          Laboratoire de Disruption Cognitive
        </h3>

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">Type d'Événement</label>
            <div className="grid grid-cols-2 gap-2">
              {eventTypes.map((eventType) => (
                <button
                  key={eventType.type}
                  onClick={() => setSelectedEventType(eventType.type)}
                  className={`p-3 rounded-lg border text-left transition-colors ${
                    selectedEventType === eventType.type
                      ? 'border-cyan-500 bg-cyan-500/10'
                      : 'border-slate-600 bg-slate-700/50 hover:bg-slate-700'
                  }`}
                >
                  <div className="flex items-center gap-2 mb-1">
                    <span className={eventType.color}>{eventType.icon}</span>
                    <span className="text-sm font-medium text-white">{eventType.name}</span>
                  </div>
                  <p className="text-xs text-gray-400">{eventType.description}</p>
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Intensité ({eventIntensity}/10)
              </label>
              <input
                type="range"
                min="1"
                max="10"
                value={eventIntensity}
                onChange={(e) => setEventIntensity(Number(e.target.value))}
                className="w-full h-2 bg-slate-700 rounded-lg appearance-none cursor-pointer slider"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Durée ({eventDuration} cycles)
              </label>
              <input
                type="range"
                min="10"
                max="100"
                value={eventDuration}
                onChange={(e) => setEventDuration(Number(e.target.value))}
                className="w-full h-2 bg-slate-700 rounded-lg appearance-none cursor-pointer slider"
              />
            </div>
          </div>

          <div className="space-y-3">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Nom Personnalisé</label>
              <input
                type="text"
                value={customName}
                onChange={(e) => setCustomName(e.target.value)}
                placeholder="Nom de l'événement (optionnel)"
                className="w-full px-3 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white placeholder-gray-400 focus:border-cyan-500 focus:outline-none"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Description Personnalisée</label>
              <textarea
                value={customDescription}
                onChange={(e) => setCustomDescription(e.target.value)}
                placeholder="Description de l'événement (optionnel)"
                rows={2}
                className="w-full px-3 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white placeholder-gray-400 focus:border-cyan-500 focus:outline-none resize-none"
              />
            </div>
          </div>

          <div className="flex gap-3">
            <button
              onClick={handlePredictImpact}
              className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-colors"
            >
              <TrendingUp className="w-4 h-4" />
              Prédire l'Impact
            </button>
            <button
              onClick={handleInjectEvent}
              className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg font-medium transition-colors"
            >
              <Zap className="w-4 h-4" />
              Injecter l'Événement
            </button>
          </div>
        </div>
      </div>

      {predictionResult && (
        <div className="bg-slate-800/50 backdrop-blur-sm rounded-lg p-6 border border-slate-700">
          <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
            <TrendingUp className="w-5 h-5 text-blue-400" />
            Analyse Prédictive d'Impact
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            <div className="bg-slate-700/50 rounded-lg p-3 border border-slate-600">
              <h4 className="text-sm font-medium text-gray-300 mb-1">Impact Confiance</h4>
              <span className={`text-lg font-bold ${predictionResult.trustImpact >= 0 ? 'text-green-400' : 'text-red-400'}`}>
                {predictionResult.trustImpact >= 0 ? '+' : ''}{predictionResult.trustImpact.toFixed(1)}
              </span>
            </div>
            <div className="bg-slate-700/50 rounded-lg p-3 border border-slate-600">
              <h4 className="text-sm font-medium text-gray-300 mb-1">Impact Coopération</h4>
              <span className={`text-lg font-bold ${predictionResult.cooperationImpact >= 0 ? 'text-green-400' : 'text-red-400'}`}>
                {predictionResult.cooperationImpact >= 0 ? '+' : ''}{predictionResult.cooperationImpact.toFixed(1)}
              </span>
            </div>
            <div className="bg-slate-700/50 rounded-lg p-3 border border-slate-600">
              <h4 className="text-sm font-medium text-gray-300 mb-1">Impact Innovation</h4>
              <span className={`text-lg font-bold ${predictionResult.innovationImpact >= 0 ? 'text-green-400' : 'text-red-400'}`}>
                {predictionResult.innovationImpact >= 0 ? '+' : ''}{predictionResult.innovationImpact.toFixed(1)}
              </span>
            </div>
            <div className="bg-slate-700/50 rounded-lg p-3 border border-slate-600">
              <h4 className="text-sm font-medium text-gray-300 mb-1">Stabilité Coalitions</h4>
              <span className={`text-lg font-bold ${predictionResult.coalitionStabilityImpact >= 0 ? 'text-green-400' : 'text-red-400'}`}>
                {predictionResult.coalitionStabilityImpact >= 0 ? '+' : ''}{predictionResult.coalitionStabilityImpact.toFixed(1)}
              </span>
            </div>
            <div className="bg-slate-700/50 rounded-lg p-3 border border-slate-600">
              <h4 className="text-sm font-medium text-gray-300 mb-1">Émergence Comportements</h4>
              <span className="text-lg font-bold text-purple-400">
                {(predictionResult.emergentBehaviorsProbability * 100).toFixed(0)}%
              </span>
            </div>
          </div>
        </div>
      )}

      {state.emergentPhenomena && state.emergentPhenomena.length > 0 && (
        <div className="bg-slate-800/50 backdrop-blur-sm rounded-lg p-6 border border-slate-700">
          <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
            <Brain className="w-5 h-5 text-purple-400" />
            Phénomènes Émergents Détectés
          </h3>
          <div className="space-y-2">
            {state.emergentPhenomena.map((phenomenon, index) => (
              <div key={index} className="bg-purple-500/10 border border-purple-500/30 rounded-lg p-3">
                <span className="text-purple-400 font-medium">{phenomenon}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {disruptionHistory.length > 0 && (
        <div className="bg-slate-800/50 backdrop-blur-sm rounded-lg p-6 border border-slate-700">
          <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
            <Clock className="w-5 h-5 text-gray-400" />
            Historique des Disruptions (Derniers 10 Événements)
          </h3>
          <div className="space-y-3">
            {disruptionHistory.map((event, index) => (
              <div key={index} className="bg-slate-700/50 rounded-lg p-4 border border-slate-600">
                <div className="flex items-center justify-between mb-2">
                  <h4 className="font-medium text-white flex items-center gap-2">
                    <Zap className="w-4 h-4 text-yellow-400" />
                    {event.name}
                  </h4>
                  <span className="text-sm text-gray-400">
                    {new Date(event.timestamp || '').toLocaleTimeString()}
                  </span>
                </div>
                <p className="text-sm text-gray-300 mb-2">{event.description}</p>
                <div className="text-xs text-gray-400">
                  Intensité: {event.intensity}/10 | Durée: {event.duration} cycles
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default React.memo(DisruptionPanel);