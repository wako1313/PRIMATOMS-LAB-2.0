import React, { useState, useEffect } from 'react';
import { Primatom, Coalition } from '../types';
import { User, Users, Zap, Heart, Brain, Target, ArrowLeft, ArrowRight, RotateCcw } from 'lucide-react';

interface IntelligentZoomProps {
  primatoms: Primatom[];
  coalitions: Coalition[];
  selectedPrimatom: Primatom | null;
  onSelectPrimatom: (primatom: Primatom) => void;
  onZoomOut: () => void;
}

interface NetworkNode {
  primatom: Primatom;
  distance: number;
  relationshipStrength: number;
  isDirectConnection: boolean;
}

const IntelligentZoom: React.FC<IntelligentZoomProps> = ({
  primatoms,
  coalitions,
  selectedPrimatom,
  onSelectPrimatom,
  onZoomOut
}) => {
  const [networkNodes, setNetworkNodes] = useState<NetworkNode[]>([]);
  const [zoomLevel, setZoomLevel] = useState(1);
  const [navigationHistory, setNavigationHistory] = useState<Primatom[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (selectedPrimatom) {
      const network = buildIntelligentNetwork(selectedPrimatom);
      setNetworkNodes(network);
      
      // Ajouter à l'historique de navigation
      setNavigationHistory(prev => {
        const newHistory = [...prev];
        if (newHistory[newHistory.length - 1]?.id !== selectedPrimatom.id) {
          newHistory.push(selectedPrimatom);
        }
        return newHistory.slice(-10); // Garder les 10 derniers
      });
      setCurrentIndex(navigationHistory.length);
    }
  }, [selectedPrimatom]);

  const buildIntelligentNetwork = (centerPrimatom: Primatom): NetworkNode[] => {
    const network: NetworkNode[] = [];
    const visited = new Set<string>();
    
    // Niveau 1: Connexions directes
    Object.entries(centerPrimatom.relationships).forEach(([id, strength]) => {
      if (strength > 30) {
        const primatom = primatoms.find(p => p.id === id);
        if (primatom && !visited.has(id)) {
          network.push({
            primatom,
            distance: 1,
            relationshipStrength: strength,
            isDirectConnection: true
          });
          visited.add(id);
        }
      }
    });

    // Niveau 2: Connexions des connexions (amis des amis)
    network.slice().forEach(node => {
      if (node.distance === 1) {
        Object.entries(node.primatom.relationships).forEach(([id, strength]) => {
          if (strength > 50 && !visited.has(id) && id !== centerPrimatom.id) {
            const primatom = primatoms.find(p => p.id === id);
            if (primatom) {
              network.push({
                primatom,
                distance: 2,
                relationshipStrength: strength * 0.7, // Atténuation
                isDirectConnection: false
              });
              visited.add(id);
            }
          }
        });
      }
    });

    // Tri par force de relation
    return network.sort((a, b) => b.relationshipStrength - a.relationshipStrength);
  };

  const navigateToNode = (node: NetworkNode) => {
    onSelectPrimatom(node.primatom);
  };

  const navigateBack = () => {
    if (currentIndex > 0) {
      const prevPrimatom = navigationHistory[currentIndex - 1];
      setCurrentIndex(currentIndex - 1);
      onSelectPrimatom(prevPrimatom);
    }
  };

  const navigateForward = () => {
    if (currentIndex < navigationHistory.length - 1) {
      const nextPrimatom = navigationHistory[currentIndex + 1];
      setCurrentIndex(currentIndex + 1);
      onSelectPrimatom(nextPrimatom);
    }
  };

  const getRelationshipColor = (strength: number) => {
    if (strength > 80) return 'border-green-400 bg-green-500/20';
    if (strength > 60) return 'border-blue-400 bg-blue-500/20';
    if (strength > 40) return 'border-yellow-400 bg-yellow-500/20';
    return 'border-gray-400 bg-gray-500/20';
  };

  const getBehaviorIcon = (type: Primatom['behaviorType']) => {
    switch (type) {
      case 'leader': return <Target className="w-4 h-4 text-red-400" />;
      case 'innovator': return <Brain className="w-4 h-4 text-purple-400" />;
      case 'mediator': return <Heart className="w-4 h-4 text-green-400" />;
      case 'explorer': return <Zap className="w-4 h-4 text-yellow-400" />;
      case 'follower': return <Users className="w-4 h-4 text-cyan-400" />;
      default: return <User className="w-4 h-4 text-gray-400" />;
    }
  };

  if (!selectedPrimatom) {
    return (
      <div className="bg-slate-800/50 backdrop-blur-sm rounded-lg p-8 border border-slate-700 text-center">
        <User className="w-16 h-16 text-gray-400 mx-auto mb-4" />
        <h3 className="text-xl font-semibold text-white mb-2">Mode Zoom Intelligent</h3>
        <p className="text-gray-400">Cliquez sur un Primatom pour explorer son réseau social</p>
      </div>
    );
  }

  const coalition = selectedPrimatom.coalition ? 
    coalitions.find(c => c.id === selectedPrimatom.coalition) : null;

  return (
    <div className="bg-slate-800/50 backdrop-blur-sm rounded-lg border border-slate-700 h-full overflow-hidden">
      {/* Header avec navigation */}
      <div className="p-4 border-b border-slate-700 bg-slate-900/50">
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-lg font-semibold text-white flex items-center gap-2">
            <User className="w-5 h-5 text-cyan-400" />
            Réseau Social Intelligent
          </h3>
          <div className="flex items-center gap-2">
            <button
              onClick={navigateBack}
              disabled={currentIndex <= 0}
              className="p-2 rounded-lg bg-slate-700 hover:bg-slate-600 disabled:opacity-50 disabled:cursor-not-allowed text-white transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
            </button>
            <button
              onClick={navigateForward}
              disabled={currentIndex >= navigationHistory.length - 1}
              className="p-2 rounded-lg bg-slate-700 hover:bg-slate-600 disabled:opacity-50 disabled:cursor-not-allowed text-white transition-colors"
            >
              <ArrowRight className="w-4 h-4" />
            </button>
            <button
              onClick={onZoomOut}
              className="p-2 rounded-lg bg-slate-600 hover:bg-slate-500 text-white transition-colors"
            >
              <RotateCcw className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Primatom central */}
        <div className="bg-slate-700/50 rounded-lg p-4 border border-slate-600">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-12 h-12 bg-gradient-to-r from-cyan-500 to-purple-500 rounded-full flex items-center justify-center">
              {getBehaviorIcon(selectedPrimatom.behaviorType)}
            </div>
            <div>
              <h4 className="font-semibold text-white">{selectedPrimatom.name}</h4>
              <p className="text-sm text-gray-400">{selectedPrimatom.behaviorType}</p>
              {coalition && (
                <p className="text-xs text-cyan-400">Coalition: {coalition.name}</p>
              )}
            </div>
          </div>

          {/* Métriques en temps réel */}
          <div className="grid grid-cols-4 gap-3">
            <div className="text-center">
              <div className="text-lg font-bold text-red-400">{selectedPrimatom.trust.toFixed(0)}</div>
              <div className="text-xs text-gray-400">Confiance</div>
            </div>
            <div className="text-center">
              <div className="text-lg font-bold text-yellow-400">{selectedPrimatom.energy.toFixed(0)}</div>
              <div className="text-xs text-gray-400">Énergie</div>
            </div>
            <div className="text-center">
              <div className="text-lg font-bold text-blue-400">{selectedPrimatom.cooperation.toFixed(0)}</div>
              <div className="text-xs text-gray-400">Coopération</div>
            </div>
            <div className="text-center">
              <div className="text-lg font-bold text-purple-400">{selectedPrimatom.innovation.toFixed(0)}</div>
              <div className="text-xs text-gray-400">Innovation</div>
            </div>
          </div>

          {/* Indicateurs avancés */}
          <div className="mt-3 pt-3 border-t border-slate-600">
            <div className="flex justify-between text-sm">
              <span className="text-gray-400">Influence:</span>
              <span className="text-white font-medium">{(selectedPrimatom.influence || 50).toFixed(0)}%</span>
            </div>
            {selectedPrimatom.stressLevel && selectedPrimatom.stressLevel > 20 && (
              <div className="flex justify-between text-sm">
                <span className="text-gray-400">Stress:</span>
                <span className="text-red-400 font-medium">{selectedPrimatom.stressLevel.toFixed(0)}%</span>
              </div>
            )}
            <div className="flex justify-between text-sm">
              <span className="text-gray-400">Connexions:</span>
              <span className="text-cyan-400 font-medium">{networkNodes.filter(n => n.isDirectConnection).length}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Réseau social */}
      <div className="p-4 overflow-y-auto max-h-96">
        <h4 className="text-sm font-medium text-gray-300 mb-3">
          Réseau Social ({networkNodes.length} connexions)
        </h4>

        {/* Connexions directes */}
        <div className="mb-4">
          <h5 className="text-xs font-medium text-gray-400 mb-2 uppercase tracking-wide">
            Connexions Directes ({networkNodes.filter(n => n.isDirectConnection).length})
          </h5>
          <div className="space-y-2">
            {networkNodes.filter(n => n.isDirectConnection).map((node, index) => (
              <div
                key={node.primatom.id}
                onClick={() => navigateToNode(node)}
                className={`p-3 rounded-lg border cursor-pointer transition-all hover:scale-105 ${getRelationshipColor(node.relationshipStrength)}`}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 bg-gradient-to-r from-cyan-500 to-purple-500 rounded-full flex items-center justify-center">
                      {getBehaviorIcon(node.primatom.behaviorType)}
                    </div>
                    <div>
                      <div className="text-sm font-medium text-white">{node.primatom.name}</div>
                      <div className="text-xs text-gray-400">{node.primatom.behaviorType}</div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-sm font-bold text-white">{node.relationshipStrength.toFixed(0)}%</div>
                    <div className="text-xs text-gray-400">Relation</div>
                  </div>
                </div>

                {/* Mini métriques */}
                <div className="mt-2 flex gap-4 text-xs">
                  <span className="text-red-400">T:{node.primatom.trust.toFixed(0)}</span>
                  <span className="text-yellow-400">E:{node.primatom.energy.toFixed(0)}</span>
                  <span className="text-blue-400">C:{node.primatom.cooperation.toFixed(0)}</span>
                  <span className="text-purple-400">I:{node.primatom.innovation.toFixed(0)}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Connexions indirectes */}
        {networkNodes.filter(n => !n.isDirectConnection).length > 0 && (
          <div>
            <h5 className="text-xs font-medium text-gray-400 mb-2 uppercase tracking-wide">
              Réseau Étendu ({networkNodes.filter(n => !n.isDirectConnection).length})
            </h5>
            <div className="space-y-2">
              {networkNodes.filter(n => !n.isDirectConnection).slice(0, 5).map((node, index) => (
                <div
                  key={node.primatom.id}
                  onClick={() => navigateToNode(node)}
                  className="p-2 rounded-lg border border-slate-600 bg-slate-700/30 cursor-pointer transition-all hover:bg-slate-700/50"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="w-6 h-6 bg-gradient-to-r from-gray-500 to-gray-600 rounded-full flex items-center justify-center">
                        {getBehaviorIcon(node.primatom.behaviorType)}
                      </div>
                      <div>
                        <div className="text-xs font-medium text-white">{node.primatom.name}</div>
                        <div className="text-xs text-gray-500">via réseau</div>
                      </div>
                    </div>
                    <div className="text-xs text-gray-400">{node.relationshipStrength.toFixed(0)}%</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Footer avec statistiques */}
      <div className="p-3 border-t border-slate-700 bg-slate-900/50">
        <div className="grid grid-cols-3 gap-2 text-xs text-center">
          <div>
            <div className="text-white font-medium">{navigationHistory.length}</div>
            <div className="text-gray-400">Visités</div>
          </div>
          <div>
            <div className="text-white font-medium">{networkNodes.length}</div>
            <div className="text-gray-400">Réseau</div>
          </div>
          <div>
            <div className="text-white font-medium">
              {networkNodes.filter(n => n.relationshipStrength > 70).length}
            </div>
            <div className="text-gray-400">Liens Forts</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default IntelligentZoom;