import React from 'react';
import { Scenario } from '../types';
import { Play, Pause, RotateCcw, Target, Clock, CheckCircle2 } from 'lucide-react';

interface ScenarioPanelProps {
  scenarios: Scenario[];
  currentScenario: Scenario | null;
  onSelectScenario: (scenario: Scenario) => void;
  isRunning: boolean;
  onStart: () => void;
  onStop: () => void;
  onReset: () => void;
}

const ScenarioPanel: React.FC<ScenarioPanelProps> = ({
  scenarios,
  currentScenario,
  onSelectScenario,
  isRunning,
  onStart,
  onStop,
  onReset
}) => {
  const predefinedScenarios: Scenario[] = [
    {
      id: 'resource-scarcity',
      name: 'Rareté des Ressources',
      description: 'Simulation de la gestion collective lors de pénurie de ressources',
      duration: 300,
      objectives: ['Optimiser la distribution', 'Maintenir la cohésion sociale', 'Éviter les conflits'],
      challenges: ['Ressources limitées', 'Besoins croissants', 'Pression temporelle'],
      isActive: false
    },
    {
      id: 'newcomer-integration',
      name: 'Intégration de Nouveaux Membres',
      description: 'Étude des mécanismes d\'accueil et d\'adaptation culturelle',
      duration: 240,
      objectives: ['Faciliter l\'intégration', 'Préserver la culture existante', 'Enrichir la diversité'],
      challenges: ['Résistance au changement', 'Différences culturelles', 'Adaptation mutuelle'],
      isActive: false
    },
    {
      id: 'conflict-resolution',
      name: 'Résolution de Conflits',
      description: 'Émergence de systèmes de justice et médiation spontanée',
      duration: 180,
      objectives: ['Résoudre les disputes', 'Établir des normes', 'Maintenir la paix'],
      challenges: ['Conflits d\'intérêts', 'Émotions fortes', 'Besoin de justice'],
      isActive: false
    },
    {
      id: 'innovation-collaborative',
      name: 'Innovation Collaborative',
      description: 'Observation de l\'émergence de découvertes collectives',
      duration: 360,
      objectives: ['Stimuler la créativité', 'Favoriser la collaboration', 'Partager les connaissances'],
      challenges: ['Complexité des problèmes', 'Coordination requise', 'Temps d\'adaptation'],
      isActive: false
    },
    {
      id: 'crisis-resilience',
      name: 'Résilience Face aux Crises',
      description: 'Adaptation aux changements environnementaux majeurs',
      duration: 420,
      objectives: ['Survivre aux perturbations', 'Adapter les stratégies', 'Renforcer la résilience'],
      challenges: ['Changements rapides', 'Stress environnemental', 'Besoin d\'adaptation'],
      isActive: false
    }
  ];

  const allScenarios = [...predefinedScenarios, ...scenarios];

  return (
    <div className="space-y-4">
      {/* Contrôles de simulation */}
      <div className="bg-slate-800/50 backdrop-blur-sm rounded-lg p-4 border border-slate-700">
        <h2 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
          <Target className="w-5 h-5" />
          Contrôles de Simulation
        </h2>
        <div className="flex items-center gap-3">
          <button
            onClick={isRunning ? onStop : onStart}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-colors ${
              isRunning 
                ? 'bg-red-500 hover:bg-red-600 text-white' 
                : 'bg-green-500 hover:bg-green-600 text-white'
            }`}
          >
            {isRunning ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
            {isRunning ? 'Arrêter' : 'Démarrer'}
          </button>
          <button
            onClick={onReset}
            className="flex items-center gap-2 px-4 py-2 rounded-lg font-medium bg-slate-600 hover:bg-slate-500 text-white transition-colors"
          >
            <RotateCcw className="w-4 h-4" />
            Réinitialiser
          </button>
        </div>
      </div>

      {/* Scénario actuel */}
      {currentScenario && (
        <div className="bg-slate-800/50 backdrop-blur-sm rounded-lg p-4 border border-slate-700">
          <h3 className="text-lg font-semibold text-white mb-2">Scénario Actuel</h3>
          <div className="bg-slate-700/50 rounded-lg p-4 border border-slate-600">
            <h4 className="font-medium text-cyan-400 mb-2">{currentScenario.name}</h4>
            <p className="text-sm text-gray-300 mb-3">{currentScenario.description}</p>
            <div className="flex items-center gap-4 text-sm text-gray-400">
              <span className="flex items-center gap-1">
                <Clock className="w-4 h-4" />
                {currentScenario.duration}s
              </span>
              <span className="flex items-center gap-1">
                <CheckCircle2 className="w-4 h-4" />
                {currentScenario.objectives.length} objectifs
              </span>
            </div>
          </div>
        </div>
      )}

      {/* Sélection de scénarios */}
      <div className="bg-slate-800/50 backdrop-blur-sm rounded-lg p-4 border border-slate-700">
        <h3 className="text-lg font-semibold text-white mb-4">Scénarios Disponibles</h3>
        <div className="space-y-3">
          {allScenarios.map((scenario) => (
            <div
              key={scenario.id}
              className={`p-4 rounded-lg border cursor-pointer transition-all ${
                currentScenario?.id === scenario.id
                  ? 'border-cyan-500 bg-cyan-500/10'
                  : 'border-slate-600 bg-slate-700/50 hover:bg-slate-700'
              }`}
              onClick={() => onSelectScenario(scenario)}
            >
              <div className="flex items-center justify-between mb-2">
                <h4 className="font-medium text-white">{scenario.name}</h4>
                <span className="text-xs text-gray-400">{scenario.duration}s</span>
              </div>
              <p className="text-sm text-gray-300 mb-3">{scenario.description}</p>
              
              <div className="space-y-2">
                <div>
                  <h5 className="text-xs font-medium text-gray-400 mb-1">Objectifs:</h5>
                  <div className="flex flex-wrap gap-1">
                    {scenario.objectives.map((objective, index) => (
                      <span
                        key={index}
                        className="text-xs bg-green-500/20 text-green-400 px-2 py-1 rounded"
                      >
                        {objective}
                      </span>
                    ))}
                  </div>
                </div>
                
                <div>
                  <h5 className="text-xs font-medium text-gray-400 mb-1">Défis:</h5>
                  <div className="flex flex-wrap gap-1">
                    {scenario.challenges.map((challenge, index) => (
                      <span
                        key={index}
                        className="text-xs bg-red-500/20 text-red-400 px-2 py-1 rounded"
                      >
                        {challenge}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ScenarioPanel;