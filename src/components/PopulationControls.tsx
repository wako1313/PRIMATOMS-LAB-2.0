import React, { useState } from 'react';
import { BehaviorDistribution } from '../types';
import { Users, Settings, RotateCcw, TrendingUp, Target } from 'lucide-react';

interface PopulationControlsProps {
  currentPopulation: number;
  currentDistribution: BehaviorDistribution;
  onPopulationChange: (size: number) => void;
  onDistributionChange: (distribution: BehaviorDistribution) => void;
  onReset: () => void;
  isRunning: boolean;
}

const PopulationControls: React.FC<PopulationControlsProps> = ({
  currentPopulation,
  currentDistribution,
  onPopulationChange,
  onDistributionChange,
  onReset,
  isRunning
}) => {
  const [tempPopulation, setTempPopulation] = useState(currentPopulation);
  const [tempDistribution, setTempDistribution] = useState(currentDistribution);
  const [showAdvanced, setShowAdvanced] = useState(false);

  const presetDistributions = {
    'Équilibrée': {
      leader: 0.15,
      innovator: 0.20,
      mediator: 0.15,
      explorer: 0.25,
      follower: 0.25
    },
    'Hiérarchique': {
      leader: 0.25,
      innovator: 0.10,
      mediator: 0.15,
      explorer: 0.15,
      follower: 0.35
    },
    'Innovante': {
      leader: 0.10,
      innovator: 0.35,
      mediator: 0.10,
      explorer: 0.30,
      follower: 0.15
    },
    'Collaborative': {
      leader: 0.08,
      innovator: 0.15,
      mediator: 0.30,
      explorer: 0.20,
      follower: 0.27
    },
    'Exploratrice': {
      leader: 0.12,
      innovator: 0.25,
      mediator: 0.08,
      explorer: 0.40,
      follower: 0.15
    }
  };

  const behaviorLabels = {
    leader: 'Alpha (Leaders)',
    innovator: 'Sigma (Innovateurs)',
    mediator: 'Omega (Médiateurs)',
    explorer: 'Delta (Explorateurs)',
    follower: 'Beta (Suiveurs)'
  };

  const behaviorColors = {
    leader: '#EF4444',
    innovator: '#8B5CF6',
    mediator: '#10B981',
    explorer: '#F59E0B',
    follower: '#06B6D4'
  };

  const handleDistributionChange = (type: keyof BehaviorDistribution, value: number) => {
    const newDistribution = { ...tempDistribution, [type]: value / 100 };
    
    setTempDistribution(newDistribution);
  };

  const applyPreset = (presetName: string) => {
    const preset = presetDistributions[presetName as keyof typeof presetDistributions];
    setTempDistribution(preset);
  };

  const applyChanges = () => {
    if (!isRunning) {
      onPopulationChange(tempPopulation);
      onDistributionChange(tempDistribution);
    }
  };

  const resetToDefaults = () => {
    const defaultPopulation = 200;
    const defaultDistribution = presetDistributions['Équilibrée'];
    
    setTempPopulation(defaultPopulation);
    setTempDistribution(defaultDistribution);
    
    if (!isRunning) {
      onPopulationChange(defaultPopulation);
      onDistributionChange(defaultDistribution);
    }
  };

  const getTotalPercentage = () => {
    return Object.values(tempDistribution).reduce((sum, val) => sum + val, 0) * 100;
  };

  return (
    <div className="bg-slate-800/50 backdrop-blur-sm rounded-lg p-6 border border-slate-700">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-white flex items-center gap-2">
          <Users className="w-5 h-5 text-cyan-400" />
          Configuration Populationnelle
        </h3>
        <button
          onClick={() => setShowAdvanced(!showAdvanced)}
          className="flex items-center gap-2 px-3 py-1 rounded-lg bg-slate-700 hover:bg-slate-600 text-white text-sm transition-colors"
        >
          <Settings className="w-4 h-4" />
          {showAdvanced ? 'Simple' : 'Avancé'}
        </button>
      </div>

      {/* Contrôle de la taille de population */}
      <div className="mb-6">
        <div className="flex items-center justify-between mb-2">
          <label className="text-sm font-medium text-gray-300">
            Taille de Population
          </label>
          <span className="text-sm text-cyan-400 font-medium">
            {tempPopulation} Primatoms
          </span>
        </div>
        <input
          type="range"
          min="50"
          max="500"
          step="10"
          value={tempPopulation}
          onChange={(e) => setTempPopulation(Number(e.target.value))}
          disabled={isRunning}
          className="w-full h-2 bg-slate-700 rounded-lg appearance-none cursor-pointer slider"
        />
        <div className="flex justify-between text-xs text-gray-500 mt-1">
          <span>50</span>
          <span>275</span>
          <span>500</span>
        </div>
      </div>

      {/* Presets de distribution */}
      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-300 mb-3">
          Profils Sociétaux Prédéfinis
        </label>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
          {Object.keys(presetDistributions).map((presetName) => (
            <button
              key={presetName}
              onClick={() => applyPreset(presetName)}
              disabled={isRunning}
              className="px-3 py-2 rounded-lg border text-sm font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed hover:bg-slate-700 border-slate-600 bg-slate-700/50 text-white"
            >
              {presetName}
            </button>
          ))}
        </div>
      </div>

      {/* Distribution comportementale détaillée */}
      {showAdvanced && (
        <div className="mb-6">
          <div className="flex items-center justify-between mb-3">
            <label className="text-sm font-medium text-gray-300">
              Distribution Comportementale Personnalisée
            </label>
            <span className={`text-sm font-medium ${
              Math.abs(getTotalPercentage() - 100) < 1 ? 'text-green-400' : 'text-red-400'
            }`}>
              Total: {getTotalPercentage().toFixed(1)}%
            </span>
          </div>
          
          <div className="space-y-4">
            {Object.entries(tempDistribution).map(([type, value]) => (
              <div key={type}>
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <div 
                      className="w-3 h-3 rounded-full"
                      style={{ backgroundColor: behaviorColors[type as keyof typeof behaviorColors] }}
                    />
                    <span className="text-sm text-gray-300">
                      {behaviorLabels[type as keyof typeof behaviorLabels]}
                    </span>
                  </div>
                  <span className="text-sm text-white font-medium">
                    {(value * 100).toFixed(1)}%
                  </span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="50"
                  step="0.5"
                  value={value * 100}
                  onChange={(e) => handleDistributionChange(type as keyof BehaviorDistribution, Number(e.target.value))}
                  disabled={isRunning}
                  className="w-full h-2 bg-slate-700 rounded-lg appearance-none cursor-pointer slider"
                />
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Visualisation de la distribution actuelle */}
      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-300 mb-3">
          Aperçu de la Distribution
        </label>
        <div className="h-4 bg-slate-700 rounded-lg overflow-hidden flex">
          {Object.entries(tempDistribution).map(([type, value]) => (
            <div
              key={type}
              className="h-full transition-all duration-300"
              style={{
                width: `${value * 100}%`,
                backgroundColor: behaviorColors[type as keyof typeof behaviorColors]
              }}
              title={`${behaviorLabels[type as keyof typeof behaviorLabels]}: ${(value * 100).toFixed(1)}%`}
            />
          ))}
        </div>
      </div>

      {/* Statistiques prédictives */}
      <div className="mb-6 p-4 bg-slate-700/50 rounded-lg border border-slate-600">
        <h4 className="text-sm font-medium text-white mb-3 flex items-center gap-2">
          <TrendingUp className="w-4 h-4 text-purple-400" />
          Prédictions Sociétales
        </h4>
        <div className="grid grid-cols-2 gap-4 text-xs">
          <div>
            <span className="text-gray-400">Stabilité Prédite:</span>
            <span className="text-green-400 ml-2 font-medium">
              {(85 - (tempDistribution.leader * 100) + (tempDistribution.mediator * 50)).toFixed(0)}%
            </span>
          </div>
          <div>
            <span className="text-gray-400">Innovation Potentielle:</span>
            <span className="text-purple-400 ml-2 font-medium">
              {((tempDistribution.innovator + tempDistribution.explorer) * 100).toFixed(0)}%
            </span>
          </div>
          <div>
            <span className="text-gray-400">Coalitions Attendues:</span>
            <span className="text-cyan-400 ml-2 font-medium">
              {Math.ceil(tempPopulation / 25)} - {Math.ceil(tempPopulation / 15)}
            </span>
          </div>
          <div>
            <span className="text-gray-400">Complexité Sociale:</span>
            <span className="text-yellow-400 ml-2 font-medium">
              {(tempPopulation > 300 ? 'Élevée' : tempPopulation > 150 ? 'Modérée' : 'Faible')}
            </span>
          </div>
        </div>
      </div>

      {/* Actions */}
      <div className="flex gap-3">
        <button
          onClick={applyChanges}
          disabled={isRunning || Math.abs(getTotalPercentage() - 100) > 1}
          className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-cyan-600 hover:bg-cyan-700 disabled:bg-gray-600 disabled:cursor-not-allowed text-white rounded-lg font-medium transition-colors"
        >
          <Target className="w-4 h-4" />
          Appliquer Configuration
        </button>
        <button
          onClick={resetToDefaults}
          disabled={isRunning}
          className="flex items-center justify-center gap-2 px-4 py-2 bg-slate-600 hover:bg-slate-500 disabled:bg-gray-600 disabled:cursor-not-allowed text-white rounded-lg font-medium transition-colors"
        >
          <RotateCcw className="w-4 h-4" />
          Défaut
        </button>
      </div>

      {isRunning && (
        <div className="mt-3 p-3 bg-yellow-500/10 border border-yellow-500/30 rounded-lg">
          <p className="text-xs text-yellow-400">
            ⚠️ Arrêtez la simulation pour modifier la configuration populationnelle
          </p>
        </div>
      )}
    </div>
  );
};

export default PopulationControls;