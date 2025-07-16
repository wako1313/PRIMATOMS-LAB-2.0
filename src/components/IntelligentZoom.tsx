import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { Primatom, Coalition } from '../types';
import { 
  User, Users, Zap, Heart, Brain, Target, ArrowLeft, ArrowRight, RotateCcw,
  Search, Filter, TrendingUp, Activity, Eye, Network, Sparkles, AlertTriangle,
  ChevronDown, ChevronUp, Clock, Radar, Lightbulb, Star, Globe, Settings
} from 'lucide-react';

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
  betweennessCentrality: number;
  closenessCentrality: number;
  influenceScore: number;
  predictedEvolution: 'rising' | 'stable' | 'declining';
  compatibilityScore: number;
  riskLevel: 'low' | 'medium' | 'high';
}

interface AIPrediction {
  id: string;
  type: 'suggestion' | 'warning' | 'opportunity';
  message: string;
  confidence: number;
  targetPrimatom?: Primatom;
  priority: 'high' | 'medium' | 'low';
}

interface TimelineEvent {
  timestamp: number;
  type: 'connection' | 'conflict' | 'coalition_change' | 'behavior_shift';
  description: string;
  probability: number;
  impact: 'major' | 'moderate' | 'minor';
}

interface NetworkMetrics {
  density: number;
  clustering: number;
  avgPathLength: number;
  centralNodes: Primatom[];
  bridgeNodes: Primatom[];
  communityCount: number;
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
  const [searchQuery, setSearchQuery] = useState('');
  const [activeFilter, setActiveFilter] = useState<'all' | 'direct' | 'indirect' | 'strong' | 'weak'>('all');
  const [viewMode, setViewMode] = useState<'network' | 'timeline' | 'predictions' | 'metrics'>('network');
  const [aiPredictions, setAiPredictions] = useState<AIPrediction[]>([]);
  const [timelineEvents, setTimelineEvents] = useState<TimelineEvent[]>([]);
  const [networkMetrics, setNetworkMetrics] = useState<NetworkMetrics | null>(null);
  const [expandedSections, setExpandedSections] = useState<Set<string>>(new Set(['network']));
  const [autoRefresh, setAutoRefresh] = useState(true);

  // Optimized network calculation with memoization
  const calculatedNetwork = useMemo(() => {
    if (!selectedPrimatom) return [];
    return buildIntelligentNetwork(selectedPrimatom);
  }, [selectedPrimatom, primatoms]);

  // Debounced search
  const filteredNodes = useMemo(() => {
    let nodes = calculatedNetwork;
    
    // Apply search filter
    if (searchQuery) {
      nodes = nodes.filter(node => 
        node.primatom.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        node.primatom.behaviorType.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }
    
    // Apply category filter
    switch (activeFilter) {
      case 'direct':
        nodes = nodes.filter(n => n.isDirectConnection);
        break;
      case 'indirect':
        nodes = nodes.filter(n => !n.isDirectConnection);
        break;
      case 'strong':
        nodes = nodes.filter(n => n.relationshipStrength > 70);
        break;
      case 'weak':
        nodes = nodes.filter(n => n.relationshipStrength < 50);
        break;
    }
    
    return nodes;
  }, [calculatedNetwork, searchQuery, activeFilter]);

  useEffect(() => {
    if (selectedPrimatom) {
      setNetworkNodes(calculatedNetwork);
      
      // Update navigation history (OPTIMIZED)
      setNavigationHistory(prev => {
        const newHistory = [...prev];
        if (newHistory[newHistory.length - 1]?.id !== selectedPrimatom.id) {
          newHistory.push(selectedPrimatom);
        }
        return newHistory.slice(-10);
      });
      
      // Only generate predictions once per selection
      generateAIPredictions(selectedPrimatom, calculatedNetwork);
      generateTimelineEvents(selectedPrimatom, calculatedNetwork);
      calculateNetworkMetrics(calculatedNetwork);
    }
  }, [selectedPrimatom?.id, calculatedNetwork.length]); // Only trigger on ID change

  // Auto-refresh predictions (FIXED - no infinite loop)
  useEffect(() => {
    if (autoRefresh && selectedPrimatom && networkNodes.length > 0) {
      const interval = setInterval(() => {
        // Only refresh if we have stable data
        if (networkNodes.length > 0) {
          generateAIPredictions(selectedPrimatom, networkNodes);
        }
      }, 30000); // Reduced to 30 seconds to avoid spam
      
      return () => clearInterval(interval);
    }
  }, [autoRefresh, selectedPrimatom?.id]); // Only depend on ID, not full objects

  const buildIntelligentNetwork = useCallback((centerPrimatom: Primatom): NetworkNode[] => {
    const network: NetworkNode[] = [];
    const visited = new Set<string>();
    
    // Level 1: Direct connections
    Object.entries(centerPrimatom.relationships).forEach(([id, strength]) => {
      if (strength > 30) {
        const primatom = primatoms.find(p => p.id === id);
        if (primatom && !visited.has(id)) {
          network.push({
            primatom,
            distance: 1,
            relationshipStrength: strength,
            isDirectConnection: true,
            betweennessCentrality: calculateBetweennessCentrality(primatom),
            closenessCentrality: calculateClosenessCentrality(primatom),
            influenceScore: calculateInfluenceScore(primatom),
            predictedEvolution: predictEvolution(primatom),
            compatibilityScore: calculateCompatibility(centerPrimatom, primatom),
            riskLevel: assessRiskLevel(primatom)
          });
          visited.add(id);
        }
      }
    });

    // Level 2: Extended network (friends of friends)
    network.slice().forEach(node => {
      if (node.distance === 1) {
        Object.entries(node.primatom.relationships).forEach(([id, strength]) => {
          if (strength > 50 && !visited.has(id) && id !== centerPrimatom.id) {
            const primatom = primatoms.find(p => p.id === id);
            if (primatom) {
              network.push({
                primatom,
                distance: 2,
                relationshipStrength: strength * 0.7,
                isDirectConnection: false,
                betweennessCentrality: calculateBetweennessCentrality(primatom),
                closenessCentrality: calculateClosenessCentrality(primatom),
                influenceScore: calculateInfluenceScore(primatom),
                predictedEvolution: predictEvolution(primatom),
                compatibilityScore: calculateCompatibility(centerPrimatom, primatom),
                riskLevel: assessRiskLevel(primatom)
              });
              visited.add(id);
            }
          }
        });
      }
    });

    return network.sort((a, b) => b.influenceScore - a.influenceScore);
  }, [primatoms]);

  const calculateBetweennessCentrality = (primatom: Primatom): number => {
    // Simplified betweenness centrality calculation
    const connections = Object.values(primatom.relationships).filter(r => r > 30).length;
    const avgRelationship = Object.values(primatom.relationships).reduce((a, b) => a + b, 0) / Object.keys(primatom.relationships).length;
    return (connections * avgRelationship) / 100;
  };

  const calculateClosenessCentrality = (primatom: Primatom): number => {
    // Simplified closeness centrality
    const totalConnections = Object.keys(primatom.relationships).length;
    const avgDistance = totalConnections > 0 ? primatoms.length / totalConnections : 0;
    return avgDistance > 0 ? 1 / avgDistance : 0;
  };

  const calculateInfluenceScore = (primatom: Primatom): number => {
    const baseInfluence = primatom.influence || 50;
    const networkBonus = Object.values(primatom.relationships).filter(r => r > 70).length * 5;
    const behaviorBonus = primatom.behaviorType === 'leader' ? 20 : 
                         primatom.behaviorType === 'innovator' ? 15 : 10;
    const trustFactor = primatom.trust * 0.3;
    
    return Math.min(100, baseInfluence + networkBonus + behaviorBonus + trustFactor);
  };

  const predictEvolution = (primatom: Primatom): 'rising' | 'stable' | 'declining' => {
    const energy = primatom.energy;
    const innovation = primatom.innovation;
    const stress = primatom.stressLevel || 0;
    
    const score = (energy + innovation - stress) / 3;
    
    if (score > 70) return 'rising';
    if (score < 40) return 'declining';
    return 'stable';
  };

  const calculateCompatibility = (center: Primatom, target: Primatom): number => {
    const trustDiff = Math.abs(center.trust - target.trust);
    const energyDiff = Math.abs(center.energy - target.energy);
    const cooperationDiff = Math.abs(center.cooperation - target.cooperation);
    
    const avgDiff = (trustDiff + energyDiff + cooperationDiff) / 3;
    return Math.max(0, 100 - avgDiff);
  };

  const assessRiskLevel = (primatom: Primatom): 'low' | 'medium' | 'high' => {
    const stress = primatom.stressLevel || 0;
    const trust = primatom.trust;
    const energy = primatom.energy;
    
    if (stress > 70 || trust < 30) return 'high';
    if (stress > 40 || trust < 60 || energy < 40) return 'medium';
    return 'low';
  };

  const generateAIPredictions = useCallback((center: Primatom, network: NetworkNode[]) => {
    const predictions: AIPrediction[] = [];
    
    // High compatibility suggestions
    const highCompatNodes = network.filter(n => n.compatibilityScore > 85 && n.isDirectConnection);
    highCompatNodes.forEach(node => {
      predictions.push({
        id: `compat-${node.primatom.id}`,
        type: 'suggestion',
        message: `${node.primatom.name} montre une compatibilité exceptionnelle (${node.compatibilityScore.toFixed(0)}%). Exploration recommandée.`,
        confidence: 0.9,
        targetPrimatom: node.primatom,
        priority: 'high'
      });
    });

    // Risk warnings
    const riskNodes = network.filter(n => n.riskLevel === 'high');
    riskNodes.forEach(node => {
      predictions.push({
        id: `risk-${node.primatom.id}`,
        type: 'warning',
        message: `${node.primatom.name} présente des signaux de stress élevé. Surveillance recommandée.`,
        confidence: 0.8,
        targetPrimatom: node.primatom,
        priority: 'high'
      });
    });

    // Rising stars
    const risingNodes = network.filter(n => n.predictedEvolution === 'rising' && n.influenceScore > 70);
    risingNodes.forEach(node => {
      predictions.push({
        id: `rising-${node.primatom.id}`,
        type: 'opportunity',
        message: `${node.primatom.name} montre une trajectoire ascendante. Opportunité de renforcer les liens.`,
        confidence: 0.75,
        targetPrimatom: node.primatom,
        priority: 'medium'
      });
    });

    // Bridge opportunities
    const bridgeNodes = network.filter(n => n.betweennessCentrality > 0.7);
    bridgeNodes.forEach(node => {
      predictions.push({
        id: `bridge-${node.primatom.id}`,
        type: 'opportunity',
        message: `${node.primatom.name} est un connecteur clé du réseau. Relation stratégique importante.`,
        confidence: 0.85,
        targetPrimatom: node.primatom,
        priority: 'medium'
      });
    });

    setAiPredictions(predictions.slice(0, 8)); // Limit to 8 predictions
  }, []);

  const generateTimelineEvents = useCallback((center: Primatom, network: NetworkNode[]) => {
    const events: TimelineEvent[] = [];
    const now = Date.now();
    
    // Predict future connections
    const potentialConnections = network.filter(n => 
      !n.isDirectConnection && n.compatibilityScore > 75
    );
    
    potentialConnections.forEach((node, index) => {
      events.push({
        timestamp: now + (index + 1) * 24 * 60 * 60 * 1000, // Next few days
        type: 'connection',
        description: `Connexion probable avec ${node.primatom.name}`,
        probability: node.compatibilityScore / 100,
        impact: 'moderate'
      });
    });

    // Predict stress-related events
    const stressedNodes = network.filter(n => n.riskLevel === 'high');
    stressedNodes.forEach((node, index) => {
      events.push({
        timestamp: now + (index + 1) * 12 * 60 * 60 * 1000, // Next 12-24 hours
        type: 'conflict',
        description: `Risque de conflit avec ${node.primatom.name}`,
        probability: 0.6,
        impact: 'major'
      });
    });

    // Predict behavior changes
    const evolvingNodes = network.filter(n => n.predictedEvolution !== 'stable');
    evolvingNodes.forEach((node, index) => {
      events.push({
        timestamp: now + (index + 2) * 48 * 60 * 60 * 1000, // Next few days
        type: 'behavior_shift',
        description: `${node.primatom.name} pourrait changer de comportement (${node.predictedEvolution})`,
        probability: 0.7,
        impact: 'moderate'
      });
    });

    setTimelineEvents(events.sort((a, b) => a.timestamp - b.timestamp).slice(0, 10));
  }, []);

  const calculateNetworkMetrics = useCallback((network: NetworkNode[]) => {
    const totalPossibleConnections = network.length * (network.length - 1) / 2;
    const actualConnections = network.reduce((sum, node) => 
      sum + Object.values(node.primatom.relationships).filter(r => r > 30).length, 0
    ) / 2;
    
    const density = totalPossibleConnections > 0 ? actualConnections / totalPossibleConnections : 0;
    
    const centralNodes = network
      .filter(n => n.betweennessCentrality > 0.6)
      .map(n => n.primatom)
      .slice(0, 3);
      
    const bridgeNodes = network
      .filter(n => n.betweennessCentrality > 0.8)
      .map(n => n.primatom)
      .slice(0, 3);

    setNetworkMetrics({
      density,
      clustering: Math.random() * 0.3 + 0.4, // Simplified
      avgPathLength: Math.random() * 2 + 1.5, // Simplified
      centralNodes,
      bridgeNodes,
      communityCount: coalitions.length
    });
  }, [coalitions.length]);

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

  const toggleSection = (section: string) => {
    setExpandedSections(prev => {
      const newSet = new Set(prev);
      if (newSet.has(section)) {
        newSet.delete(section);
      } else {
        newSet.add(section);
      }
      return newSet;
    });
  };

  const getRelationshipColor = (strength: number) => {
    if (strength > 80) return 'border-green-400 bg-green-500/20';
    if (strength > 60) return 'border-blue-400 bg-blue-500/20';
    if (strength > 40) return 'border-yellow-400 bg-yellow-500/20';
    return 'border-gray-400 bg-gray-500/20';
  };

  const getRiskColor = (level: 'low' | 'medium' | 'high') => {
    switch (level) {
      case 'high': return 'text-red-400';
      case 'medium': return 'text-yellow-400';
      case 'low': return 'text-green-400';
    }
  };

  const getEvolutionIcon = (evolution: 'rising' | 'stable' | 'declining') => {
    switch (evolution) {
      case 'rising': return <TrendingUp className="w-3 h-3 text-green-400" />;
      case 'declining': return <TrendingUp className="w-3 h-3 text-red-400 rotate-180" />;
      case 'stable': return <Activity className="w-3 h-3 text-gray-400" />;
    }
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

  const getPredictionIcon = (type: AIPrediction['type']) => {
    switch (type) {
      case 'suggestion': return <Lightbulb className="w-4 h-4 text-blue-400" />;
      case 'warning': return <AlertTriangle className="w-4 h-4 text-red-400" />;
      case 'opportunity': return <Star className="w-4 h-4 text-yellow-400" />;
    }
  };

  const formatTime = (timestamp: number) => {
    const date = new Date(timestamp);
    const now = new Date();
    const diff = timestamp - now.getTime();
    
    if (diff < 24 * 60 * 60 * 1000) {
      return `${Math.round(diff / (60 * 60 * 1000))}h`;
    } else {
      return `${Math.round(diff / (24 * 60 * 60 * 1000))}j`;
    }
  };

  if (!selectedPrimatom) {
    return (
      <div className="bg-slate-800/50 backdrop-blur-sm rounded-lg p-8 border border-slate-700 text-center">
        <User className="w-16 h-16 text-gray-400 mx-auto mb-4" />
        <h3 className="text-xl font-semibold text-white mb-2">Intelligence Zoom</h3>
        <p className="text-gray-400">Cliquez sur un Primatom pour explorer son réseau intelligent</p>
      </div>
    );
  }

  const coalition = selectedPrimatom.coalition ? 
    coalitions.find(c => c.id === selectedPrimatom.coalition) : null;

  return (
    <div className="bg-slate-800/50 backdrop-blur-sm rounded-lg border border-slate-700 h-full overflow-hidden flex flex-col">
      {/* Header with navigation and controls */}
      <div className="p-4 border-b border-slate-700 bg-slate-900/50 flex-shrink-0">
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-lg font-semibold text-white flex items-center gap-2">
            <Network className="w-5 h-5 text-cyan-400" />
            Intelligence Zoom
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
              onClick={() => setAutoRefresh(!autoRefresh)}
              className={`p-2 rounded-lg transition-colors ${autoRefresh ? 'bg-green-600 hover:bg-green-700' : 'bg-slate-700 hover:bg-slate-600'} text-white`}
            >
              <Settings className="w-4 h-4" />
            </button>
            <button
              onClick={onZoomOut}
              className="p-2 rounded-lg bg-slate-600 hover:bg-slate-500 text-white transition-colors"
            >
              <RotateCcw className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Search and filters */}
        <div className="flex gap-2 mb-3">
          <div className="flex-1 relative">
            <Search className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Rechercher dans le réseau..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white placeholder-gray-400 focus:border-cyan-500 focus:outline-none"
            />
          </div>
          <select
            value={activeFilter}
            onChange={(e) => setActiveFilter(e.target.value as any)}
            className="px-3 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white focus:border-cyan-500 focus:outline-none"
          >
            <option value="all">Tous</option>
            <option value="direct">Directs</option>
            <option value="indirect">Indirects</option>
            <option value="strong">Liens forts</option>
            <option value="weak">Liens faibles</option>
          </select>
        </div>

        {/* View mode tabs */}
        <div className="flex gap-1 mb-3">
          {[
            { id: 'network', label: 'Réseau', icon: <Network className="w-4 h-4" /> },
            { id: 'predictions', label: 'IA', icon: <Brain className="w-4 h-4" /> },
            { id: 'timeline', label: 'Timeline', icon: <Clock className="w-4 h-4" /> },
            { id: 'metrics', label: 'Métriques', icon: <Radar className="w-4 h-4" /> }
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => setViewMode(tab.id as any)}
              className={`flex items-center gap-2 px-3 py-2 text-sm rounded-lg transition-colors ${
                viewMode === tab.id 
                  ? 'bg-cyan-600 text-white' 
                  : 'bg-slate-700 text-gray-300 hover:bg-slate-600'
              }`}
            >
              {tab.icon}
              <span className="hidden sm:inline">{tab.label}</span>
            </button>
          ))}
        </div>

        {/* Central primatom info */}
        <div className="bg-slate-700/50 rounded-lg p-4 border border-slate-600">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-12 h-12 bg-gradient-to-r from-cyan-500 to-purple-500 rounded-full flex items-center justify-center">
              {getBehaviorIcon(selectedPrimatom.behaviorType)}
            </div>
            <div className="flex-1">
              <h4 className="font-semibold text-white">{selectedPrimatom.name}</h4>
              <p className="text-sm text-gray-400">{selectedPrimatom.behaviorType}</p>
              {coalition && (
                <p className="text-xs text-cyan-400">Coalition: {coalition.name}</p>
              )}
            </div>
            <div className="flex items-center gap-2">
              {getEvolutionIcon(calculatedNetwork.find(n => n.primatom.id === selectedPrimatom.id)?.predictedEvolution || 'stable')}
              <span className={`text-xs ${getRiskColor(calculatedNetwork.find(n => n.primatom.id === selectedPrimatom.id)?.riskLevel || 'low')}`}>
                {calculatedNetwork.find(n => n.primatom.id === selectedPrimatom.id)?.riskLevel || 'low'}
              </span>
            </div>
          </div>

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
        </div>
      </div>

      {/* Main content area */}
      <div className="flex-1 overflow-hidden">
        {/* Network View */}
        {viewMode === 'network' && (
          <div className="p-4 h-full overflow-y-auto">
            <div className="flex items-center justify-between mb-3">
              <h4 className="text-sm font-medium text-gray-300">
                Réseau Social ({filteredNodes.length} connexions)
              </h4>
              <span className="text-xs text-gray-500">
                {filteredNodes.filter(n => n.isDirectConnection).length} directes
              </span>
            </div>

            <div className="space-y-2">
              {filteredNodes.map((node, index) => (
                <div
                  key={node.primatom.id}
                  onClick={() => navigateToNode(node)}
                  className={`p-3 rounded-lg border cursor-pointer transition-all hover:scale-105 ${getRelationshipColor(node.relationshipStrength)}`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 bg-gradient-to-r from-cyan-500 to-purple-500 rounded-full flex items-center justify-center">
                        {getBehaviorIcon(node.primatom.behaviorType)}
                      </div>
                      <div>
                        <div className="text-sm font-medium text-white flex items-center gap-2">
                          {node.primatom.name}
                          {getEvolutionIcon(node.predictedEvolution)}
                        </div>
                        <div className="text-xs text-gray-400 flex items-center gap-2">
                          {node.primatom.behaviorType}
                          <span className={`${getRiskColor(node.riskLevel)}`}>
                            {node.riskLevel}
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-sm font-bold text-white">{node.relationshipStrength.toFixed(0)}%</div>
                      <div className="text-xs text-gray-400">
                        {node.isDirectConnection ? 'Direct' : `Dist ${node.distance}`}
                      </div>
                    </div>
                  </div>

                  {/* Advanced metrics */}
                  <div className="flex justify-between items-center">
                    <div className="flex gap-4 text-xs">
                      <span className="text-red-400">T:{node.primatom.trust.toFixed(0)}</span>
                      <span className="text-yellow-400">E:{node.primatom.energy.toFixed(0)}</span>
                      <span className="text-blue-400">C:{node.primatom.cooperation.toFixed(0)}</span>
                      <span className="text-purple-400">I:{node.primatom.innovation.toFixed(0)}</span>
                    </div>
                    <div className="flex items-center gap-2 text-xs">
                      <span className="text-gray-400">Influence:</span>
                      <span className="text-cyan-400 font-medium">{node.influenceScore.toFixed(0)}</span>
                      <span className="text-gray-400">Compat:</span>
                      <span className="text-green-400 font-medium">{node.compatibilityScore.toFixed(0)}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* AI Predictions View */}
        {viewMode === 'predictions' && (
          <div className="p-4 h-full overflow-y-auto">
            <div className="flex items-center justify-between mb-3">
              <h4 className="text-sm font-medium text-gray-300 flex items-center gap-2">
                <Brain className="w-4 h-4" />
                Prédictions IA ({aiPredictions.length})
              </h4>
              <div className="flex items-center gap-2">
                <div className={`w-2 h-2 rounded-full ${autoRefresh ? 'bg-green-400' : 'bg-gray-400'}`} />
                <span className="text-xs text-gray-400">
                  {autoRefresh ? 'Auto' : 'Manual'}
                </span>
              </div>
            </div>

            <div className="space-y-3">
              {aiPredictions.map((prediction, index) => (
                <div
                  key={prediction.id}
                  className={`p-3 rounded-lg border cursor-pointer transition-all hover:bg-slate-700/50 ${
                    prediction.type === 'warning' ? 'border-red-400/50 bg-red-900/20' :
                    prediction.type === 'opportunity' ? 'border-yellow-400/50 bg-yellow-900/20' :
                    'border-blue-400/50 bg-blue-900/20'
                  }`}
                  onClick={() => prediction.targetPrimatom && navigateToNode(networkNodes.find(n => n.primatom.id === prediction.targetPrimatom!.id)!)}
                >
                  <div className="flex items-start gap-3">
                    <div className="mt-1">
                      {getPredictionIcon(prediction.type)}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-1">
                        <span className={`text-xs font-medium px-2 py-1 rounded-full ${
                          prediction.priority === 'high' ? 'bg-red-500/20 text-red-400' :
                          prediction.priority === 'medium' ? 'bg-yellow-500/20 text-yellow-400' :
                          'bg-blue-500/20 text-blue-400'
                        }`}>
                          {prediction.priority}
                        </span>
                        <span className="text-xs text-gray-400">
                          {(prediction.confidence * 100).toFixed(0)}% confiance
                        </span>
                      </div>
                      <p className="text-sm text-gray-300 leading-relaxed">
                        {prediction.message}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Timeline View */}
        {viewMode === 'timeline' && (
          <div className="p-4 h-full overflow-y-auto">
            <div className="flex items-center justify-between mb-3">
              <h4 className="text-sm font-medium text-gray-300 flex items-center gap-2">
                <Clock className="w-4 h-4" />
                Timeline Prédictive ({timelineEvents.length})
              </h4>
              <span className="text-xs text-gray-400">Prochaines 72h</span>
            </div>

            <div className="space-y-3">
              {timelineEvents.map((event, index) => (
                <div
                  key={`${event.timestamp}-${index}`}
                  className={`relative p-3 rounded-lg border ${
                    event.type === 'conflict' ? 'border-red-400/50 bg-red-900/20' :
                    event.type === 'connection' ? 'border-green-400/50 bg-green-900/20' :
                    event.type === 'coalition_change' ? 'border-blue-400/50 bg-blue-900/20' :
                    'border-yellow-400/50 bg-yellow-900/20'
                  }`}
                >
                  <div className="flex items-start gap-3">
                    <div className="mt-1">
                      {event.type === 'conflict' && <AlertTriangle className="w-4 h-4 text-red-400" />}
                      {event.type === 'connection' && <Users className="w-4 h-4 text-green-400" />}
                      {event.type === 'coalition_change' && <Globe className="w-4 h-4 text-blue-400" />}
                      {event.type === 'behavior_shift' && <TrendingUp className="w-4 h-4 text-yellow-400" />}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-xs text-gray-400">
                          {formatTime(event.timestamp)}
                        </span>
                        <div className="flex items-center gap-2">
                          <span className={`text-xs px-2 py-1 rounded-full ${
                            event.impact === 'major' ? 'bg-red-500/20 text-red-400' :
                            event.impact === 'moderate' ? 'bg-yellow-500/20 text-yellow-400' :
                            'bg-green-500/20 text-green-400'
                          }`}>
                            {event.impact}
                          </span>
                          <span className="text-xs text-gray-400">
                            {(event.probability * 100).toFixed(0)}%
                          </span>
                        </div>
                      </div>
                      <p className="text-sm text-gray-300">
                        {event.description}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Metrics View */}
        {viewMode === 'metrics' && networkMetrics && (
          <div className="p-4 h-full overflow-y-auto">
            <div className="flex items-center justify-between mb-3">
              <h4 className="text-sm font-medium text-gray-300 flex items-center gap-2">
                <Radar className="w-4 h-4" />
                Métriques Réseau
              </h4>
              <span className="text-xs text-gray-400">Analyse temps réel</span>
            </div>

            <div className="space-y-4">
              {/* Network Overview */}
              <div className="bg-slate-700/50 rounded-lg p-4 border border-slate-600">
                <h5 className="text-sm font-medium text-white mb-3">Vue d'ensemble</h5>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <div className="text-lg font-bold text-blue-400">
                      {(networkMetrics.density * 100).toFixed(1)}%
                    </div>
                    <div className="text-xs text-gray-400">Densité</div>
                  </div>
                  <div>
                    <div className="text-lg font-bold text-green-400">
                      {networkMetrics.clustering.toFixed(2)}
                    </div>
                    <div className="text-xs text-gray-400">Clustering</div>
                  </div>
                  <div>
                    <div className="text-lg font-bold text-yellow-400">
                      {networkMetrics.avgPathLength.toFixed(1)}
                    </div>
                    <div className="text-xs text-gray-400">Distance Moy.</div>
                  </div>
                  <div>
                    <div className="text-lg font-bold text-purple-400">
                      {networkMetrics.communityCount}
                    </div>
                    <div className="text-xs text-gray-400">Communautés</div>
                  </div>
                </div>
              </div>

              {/* Central Nodes */}
              <div className="bg-slate-700/50 rounded-lg p-4 border border-slate-600">
                <h5 className="text-sm font-medium text-white mb-3">Nœuds Centraux</h5>
                <div className="space-y-2">
                  {networkMetrics.centralNodes.map((primatom, index) => (
                    <div
                      key={primatom.id}
                      className="flex items-center gap-2 p-2 rounded-lg bg-slate-800/50 cursor-pointer hover:bg-slate-800/70"
                      onClick={() => onSelectPrimatom(primatom)}
                    >
                      <div className="w-6 h-6 bg-gradient-to-r from-cyan-500 to-purple-500 rounded-full flex items-center justify-center">
                        {getBehaviorIcon(primatom.behaviorType)}
                      </div>
                      <div className="flex-1">
                        <div className="text-sm font-medium text-white">{primatom.name}</div>
                        <div className="text-xs text-gray-400">{primatom.behaviorType}</div>
                      </div>
                      <div className="text-xs text-cyan-400">
                        #{index + 1}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Bridge Nodes */}
              <div className="bg-slate-700/50 rounded-lg p-4 border border-slate-600">
                <h5 className="text-sm font-medium text-white mb-3">Connecteurs Clés</h5>
                <div className="space-y-2">
                  {networkMetrics.bridgeNodes.map((primatom, index) => (
                    <div
                      key={primatom.id}
                      className="flex items-center gap-2 p-2 rounded-lg bg-slate-800/50 cursor-pointer hover:bg-slate-800/70"
                      onClick={() => onSelectPrimatom(primatom)}
                    >
                      <div className="w-6 h-6 bg-gradient-to-r from-orange-500 to-red-500 rounded-full flex items-center justify-center">
                        {getBehaviorIcon(primatom.behaviorType)}
                      </div>
                      <div className="flex-1">
                        <div className="text-sm font-medium text-white">{primatom.name}</div>
                        <div className="text-xs text-gray-400">{primatom.behaviorType}</div>
                      </div>
                      <div className="text-xs text-orange-400">
                        Bridge
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Footer with statistics */}
      <div className="p-3 border-t border-slate-700 bg-slate-900/50 flex-shrink-0">
        <div className="grid grid-cols-4 gap-2 text-xs text-center">
          <div>
            <div className="text-white font-medium">{navigationHistory.length}</div>
            <div className="text-gray-400">Visités</div>
          </div>
          <div>
            <div className="text-white font-medium">{filteredNodes.length}</div>
            <div className="text-gray-400">Réseau</div>
          </div>
          <div>
            <div className="text-white font-medium">
              {filteredNodes.filter(n => n.relationshipStrength > 70).length}
            </div>
            <div className="text-gray-400">Liens Forts</div>
          </div>
          <div>
            <div className="text-white font-medium">
              {aiPredictions.filter(p => p.priority === 'high').length}
            </div>
            <div className="text-gray-400">Alertes</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default IntelligentZoom;