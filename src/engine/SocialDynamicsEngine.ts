import React, { useState, useEffect } from 'react';
import { SocialDynamicsEngine } from './SocialDynamicsEngine';
import { SimulationState, AdvancedMetrics } from './types';
import './App.css'; // Optional: pour des styles supplémentaires
import { v4 as uuidv4 } from 'uuid';

// Mock LLMOrchestrator pour éviter les erreurs en développement
class MockLLMOrchestrator {
  async analyzePattern(prompt: string) {
    return Promise.resolve({
      trends: [
        {
          id: `trend-${uuidv4()}`,
          name: 'Mocked Cultural Trend',
          type: 'cultural',
          intensity: 70,
          growthRate: 5,
          affectedBehaviorTypes: ['innovator', 'leader'],
          emergenceTimestamp: Date.now(),
          predictedPeak: Date.now() + 45000,
        },
      ],
    });
  }
}

const App: React.FC = () => {
  const [engine, setEngine] = useState<SocialDynamicsEngine | null>(null);
  const [state, setState] = useState<SimulationState | null>(null);
  const [metrics, setMetrics] = useState<AdvancedMetrics[]>([]);

  useEffect(() => {
    // Initialisation du moteur avec un mock en développement
    const llmOrchestrator = process.env.NODE_ENV === 'development' ? new MockLLMOrchestrator() : new (window as any).LLMOrchestrator();
    const simulationEngine = new SocialDynamicsEngine();
    // Injecter le mock LLMOrchestrator si nécessaire
    (simulationEngine as any).llmOrchestrator = llmOrchestrator;
    setEngine(simulationEngine);

    // Mettre à jour l'état toutes les 100ms
    const interval = setInterval(() => {
      if (simulationEngine.getState().isRunning) {
        setState({ ...simulationEngine.getState() });
        setMetrics([...simulationEngine.getMetricsHistory()]);
      }
    }, 100);

    // Démarrer la simulation
    simulationEngine.start();

    return () => {
      simulationEngine.stop();
      clearInterval(interval);
    };
  }, []);

  const handleReset = () => {
    if (engine) {
      engine.resetSimulation();
      setState({ ...engine.getState() });
      setMetrics([...engine.getMetricsHistory()]);
    }
  };

  const handlePopulationChange = (size: number) => {
    if (engine) {
      try {
        engine.setPopulationSize(size);
        setState({ ...engine.getState() });
        setMetrics([...engine.getMetricsHistory()]);
      } catch (error) {
        console.error('Erreur lors du changement de taille de population:', error);
      }
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-900 to-gray-800 text-white p-6">
      <div className="container mx-auto">
        <h1 className="text-4xl font-bold mb-6 text-center animate-pulse">Simulation des Dynamiques Sociales</h1>

        {/* Contrôles de la simulation */}
        <div className="mb-8 p-4 bg-gray-700 bg-opacity-50 rounded-lg shadow-lg">
          <button
            onClick={() => engine?.start()}
            className="mr-4 px-6 py-2 bg-green-500 hover:bg-green-600 rounded-lg transition duration-300"
            disabled={state?.isRunning}
          >
            Démarrer
          </button>
          <button
            onClick={() => engine?.stop()}
            className="mr-4 px-6 py-2 bg-red-500 hover:bg-red-600 rounded-lg transition duration-300"
            disabled={!state?.isRunning}
          >
            Arrêter
          </button>
          <button
            onClick={handleReset}
            className="px-6 py-2 bg-yellow-500 hover:bg-yellow-600 rounded-lg transition duration-300"
          >
            Réinitialiser
          </button>
          <div className="mt-4">
            <label htmlFor="populationSize" className="mr-2">Taille de la population:</label>
            <input
              id="populationSize"
              type="number"
              min="50"
              max="500"
              defaultValue="200"
              onChange={(e) => handlePopulationChange(Number(e.target.value))}
              className="p-2 bg-gray-800 rounded-lg text-white"
            />
          </div>
        </div>

        {/* Visualisation des Primatoms */}
        <div className="relative w-full h-[600px] bg-gray-900 rounded-lg overflow-hidden shadow-lg">
          <svg className="w-full h-full">
            {state?.primatoms.map((primatom) => (
              <circle
                key={primatom.id}
                cx={primatom.x}
                cy={primatom.y}
                r={primatom.territoryRadius / 5}
                fill={
                  primatom.behaviorType === 'leader' ? '#EF4444' :
                  primatom.behaviorType === 'innovator' ? '#10B981' :
                  primatom.behaviorType === 'mediator' ? '#8B5CF6' :
                  primatom.behaviorType === 'explorer' ? '#F59E0B' :
                  '#3B82F6'
                }
                className="transition-all duration-300 ease-in-out"
              />
            ))}
            {state?.influenceZones.map((zone) => (
              <circle
                key={zone.coalitionId}
                cx={zone.x}
                cy={zone.y}
                r={zone.radius}
                fill={zone.color}
                fillOpacity={0.2}
                className="animate-pulse"
              />
            ))}
          </svg>
        </div>

        {/* Métriques avancées */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {metrics.length > 0 && (
            <>
              <div className="p-4 bg-gray-700 bg-opacity-50 rounded-lg shadow-lg">
                <h2 className="text-xl font-semibold">Confiance Réseau</h2>
                <p className="text-2xl">{metrics[metrics.length - 1].trustNetwork.toFixed(1)}%</p>
              </div>
              <div className="p-4 bg-gray-700 bg-opacity-50 rounded-lg shadow-lg">
                <h2 className="text-xl font-semibold">Coopération</h2>
                <p className="text-2xl">{metrics[metrics.length - 1].cooperation.toFixed(1)}%</p>
              </div>
              <div className="p-4 bg-gray-700 bg-opacity-50 rounded-lg shadow-lg">
                <h2 className="text-xl font-semibold">Innovation</h2>
                <p className="text-2xl">{metrics[metrics.length - 1].innovation.toFixed(1)}%</p>
              </div>
              <div className="p-4 bg-gray-700 bg-opacity-50 rounded-lg shadow-lg">
                <h2 className="text-xl font-semibold">Stabilité Système</h2>
                <p className="text-2xl">{state?.systemStability.toFixed(1)}%</p>
              </div>
            </>
          )}
        </div>

        {/* Tendances culturelles */}
        <div className="mt-8 p-4 bg-gray-700 bg-opacity-50 rounded-lg shadow-lg">
          <h2 className="text-2xl font-semibold mb-4">Tendances Culturelles</h2>
          <ul className="space-y-2">
            {state?.culturalTrends.map((trend) => (
              <li key={trend.id} className="p-2 bg-gray-800 rounded-lg">
                <span className="font-bold">{trend.name}</span> ({trend.type}) - Intensité: {trend.intensity.toFixed(1)}%
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default App;