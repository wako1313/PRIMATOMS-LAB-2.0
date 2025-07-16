import React, { useState, useRef, useCallback, useEffect } from 'react';
import { Primatom, Coalition, InfluenceZone } from '../types';
import { Maximize2, Minimize2, Settings, Users, Target, Zap, ZoomIn, ZoomOut, RotateCcw, Move, Focus } from 'lucide-react';

interface SimulationCanvasProps {
  primatoms: Primatom[];
  coalitions: Coalition[];
  influenceZones?: InfluenceZone[];
  selectedPrimatom?: Primatom;
  onSelectPrimatom: (primatom: Primatom) => void;
}

const SimulationCanvas: React.FC<SimulationCanvasProps> = ({
  primatoms,
  coalitions,
  influenceZones = [],
  selectedPrimatom,
  onSelectPrimatom
}) => {
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [showInfluenceZones, setShowInfluenceZones] = useState(true);
  const [showMovementTrails, setShowMovementTrails] = useState(true);
  const [showRelationships, setShowRelationships] = useState(false);
  const [showVisualConnections, setShowVisualConnections] = useState(false);
  
  // États pour le zoom et le pan
  const [zoom, setZoom] = useState(1);
  const [panX, setPanX] = useState(0);
  const [panY, setPanY] = useState(0);
  const [isPanning, setIsPanning] = useState(false);
  const [lastPanPoint, setLastPanPoint] = useState({ x: 0, y: 0 });
  
  // États pour le zoom visuel intelligent
  const [visualZoomTarget, setVisualZoomTarget] = useState<Primatom | null>(null);
  const [isVisualZooming, setIsVisualZooming] = useState(false);
  
  const svgRef = useRef<SVGSVGElement>(null);

  // Canvas maximisé pour utiliser toute la largeur disponible
  const canvasWidth = isFullscreen ? window.innerWidth : 1600; // Largeur maximisée
  const canvasHeight = isFullscreen ? window.innerHeight - 100 : 900; // Hauteur augmentée

  // Effet pour le zoom visuel automatique avec focalisation correcte
  useEffect(() => {
    if (selectedPrimatom && !isVisualZooming) {
      performVisualZoomOnPrimatom(selectedPrimatom);
    }
  }, [selectedPrimatom]);

  // Gestion du zoom avec la molette
  const handleWheel = useCallback((e: WheelEvent) => {
    e.preventDefault();
    const zoomFactor = e.deltaY > 0 ? 0.9 : 1.1;
    setZoom(prev => Math.max(0.3, Math.min(5, prev * zoomFactor)));
  }, []);

  useEffect(() => {
    const svgElement = svgRef.current;
    if (svgElement) {
      svgElement.addEventListener('wheel', handleWheel, { passive: false });
      return () => svgElement.removeEventListener('wheel', handleWheel);
    }
  }, [handleWheel, svgRef]);

  const performVisualZoomOnPrimatom = (primatom: Primatom) => {
    setIsVisualZooming(true);
    setVisualZoomTarget(primatom);
    setShowVisualConnections(true);
    
    // Calculer le zoom optimal pour voir le Primatom et son réseau
    const networkPrimatoms = getNetworkPrimatoms(primatom);
    const optimalZoom = calculateOptimalZoomForPrimatom(primatom, networkPrimatoms);
    
    // Calculer le pan pour centrer exactement sur le Primatom sélectionné
    const targetPanX = canvasWidth / 2 - primatom.x * optimalZoom;
    const targetPanY = canvasHeight / 2 - primatom.y * optimalZoom;
    
    // Animation fluide vers la position cible
    animateToPosition(optimalZoom, targetPanX, targetPanY);
  };

  const calculateOptimalZoomForPrimatom = (centerPrimatom: Primatom, networkPrimatoms: Primatom[]): number => {
    // Si le réseau est petit, zoom plus fort sur le Primatom
    if (networkPrimatoms.length <= 3) {
      return 2.5; // Zoom fort pour voir les détails
    }
    
    // Calculer les limites du réseau
    const bounds = calculateNetworkBounds(networkPrimatoms);
    const networkWidth = bounds.maxX - bounds.minX;
    const networkHeight = bounds.maxY - bounds.minY;
    
    // Calculer le zoom pour que le réseau occupe environ 70% de l'écran
    const padding = 150;
    const zoomX = (canvasWidth - padding * 2) / Math.max(networkWidth, 200);
    const zoomY = (canvasHeight - padding * 2) / Math.max(networkHeight, 200);
    
    // Prendre le zoom le plus restrictif, mais avec des limites raisonnables
    const optimalZoom = Math.min(zoomX, zoomY);
    return Math.max(1.2, Math.min(3.5, optimalZoom)); // Entre 1.2x et 3.5x
  };

  const getNetworkPrimatoms = (centerPrimatom: Primatom): Primatom[] => {
    const network = [centerPrimatom];
    const visited = new Set([centerPrimatom.id]);
    
    // Ajouter les connexions directes fortes
    Object.entries(centerPrimatom.relationships).forEach(([id, strength]) => {
      if (strength > 50) {
        const primatom = primatoms.find(p => p.id === id);
        if (primatom && !visited.has(id)) {
          network.push(primatom);
          visited.add(id);
        }
      }
    });
    
    // Ajouter les membres de la même coalition
    if (centerPrimatom.coalition) {
      const coalitionMembers = primatoms.filter(p => 
        p.coalition === centerPrimatom.coalition && !visited.has(p.id)
      );
      network.push(...coalitionMembers);
      coalitionMembers.forEach(p => visited.add(p.id));
    }
    
    // Ajouter les primatoms proches géographiquement (rayon réduit pour plus de précision)
    const nearbyPrimatoms = primatoms.filter(p => {
      if (visited.has(p.id)) return false;
      const distance = Math.sqrt(
        Math.pow(p.x - centerPrimatom.x, 2) + 
        Math.pow(p.y - centerPrimatom.y, 2)
      );
      return distance < 120; // Rayon réduit de 150 à 120
    });
    
    network.push(...nearbyPrimatoms.slice(0, 6)); // Limiter à 6 primatoms proches
    
    return network;
  };

  const calculateNetworkBounds = (networkPrimatoms: Primatom[]) => {
    if (networkPrimatoms.length === 0) {
      return { minX: 0, maxX: canvasWidth, minY: 0, maxY: canvasHeight };
    }
    
    const xs = networkPrimatoms.map(p => p.x);
    const ys = networkPrimatoms.map(p => p.y);
    
    return {
      minX: Math.min(...xs) - 80,
      maxX: Math.max(...xs) + 80,
      minY: Math.min(...ys) - 80,
      maxY: Math.max(...ys) + 80
    };
  };

  const animateToPosition = (targetZoom: number, targetPanX: number, targetPanY: number) => {
    const startZoom = zoom;
    const startPanX = panX;
    const startPanY = panY;
    const duration = 1000; // 1 seconde d'animation pour plus de fluidité
    const startTime = Date.now();
    
    const animate = () => {
      const elapsed = Date.now() - startTime;
      const progress = Math.min(elapsed / duration, 1);
      
      // Fonction d'easing pour une animation très fluide
      const easeProgress = 1 - Math.pow(1 - progress, 4);
      
      const currentZoom = startZoom + (targetZoom - startZoom) * easeProgress;
      const currentPanX = startPanX + (targetPanX - startPanX) * easeProgress;
      const currentPanY = startPanY + (targetPanY - startPanY) * easeProgress;
      
      setZoom(currentZoom);
      setPanX(currentPanX);
      setPanY(currentPanY);
      
      if (progress < 1) {
        requestAnimationFrame(animate);
      } else {
        setIsVisualZooming(false);
      }
    };
    
    requestAnimationFrame(animate);
  };

  const getBehaviorColor = (behaviorType: Primatom['behaviorType']) => {
    switch (behaviorType) {
      case 'leader': return '#EF4444';
      case 'follower': return '#06B6D4';
      case 'innovator': return '#8B5CF6';
      case 'mediator': return '#10B981';
      case 'explorer': return '#F59E0B';
      default: return '#64748B';
    }
  };

  const getPrimatomSize = (primatom: Primatom) => {
    const baseSize = 6;
    const influenceMultiplier = (primatom.influence || 50) / 50;
    const stressMultiplier = 1 + ((primatom.stressLevel || 0) / 100) * 0.3;
    
    // Augmenter la taille si c'est le primatom sélectionné ou dans son réseau
    let networkMultiplier = 1;
    if (visualZoomTarget) {
      if (primatom.id === visualZoomTarget.id) {
        networkMultiplier = 1.8; // Primatom central encore plus grand
      } else if (showVisualConnections) {
        const networkPrimatoms = getNetworkPrimatoms(visualZoomTarget);
        if (networkPrimatoms.some(p => p.id === primatom.id)) {
          networkMultiplier = 1.3; // Primatoms du réseau plus visibles
        }
      }
    }
    
    const zoomAdjustedSize = Math.max(4, Math.min(24, baseSize * influenceMultiplier * stressMultiplier * networkMultiplier * Math.min(zoom, 2.5)));
    return zoomAdjustedSize;
  };

  const getMovementTrail = (primatom: Primatom) => {
    const dx = primatom.targetX - primatom.x;
    const dy = primatom.targetY - primatom.y;
    const distance = Math.sqrt(dx * dx + dy * dy);
    
    if (distance < 5) return null;
    
    return {
      x1: primatom.x,
      y1: primatom.y,
      x2: primatom.targetX,
      y2: primatom.targetY,
      opacity: Math.min(0.6, distance / 100)
    };
  };

  // Gestion du zoom
  const handleZoomIn = () => {
    setZoom(prev => Math.min(prev * 1.5, 5));
  };

  const handleZoomOut = () => {
    setZoom(prev => Math.max(prev / 1.5, 0.3));
  };

  const resetView = () => {
    setZoom(1);
    setPanX(0);
    setPanY(0);
    setVisualZoomTarget(null);
    setShowVisualConnections(false);
    setIsVisualZooming(false);
  };

  const focusOnSelected = () => {
    if (selectedPrimatom) {
      performVisualZoomOnPrimatom(selectedPrimatom);
    }
  };

  // Gestion du pan (déplacement)
  const handleMouseDown = useCallback((e: React.MouseEvent) => {
    if (e.button === 0) { // Clic gauche
      setIsPanning(true);
      setLastPanPoint({ x: e.clientX, y: e.clientY });
    }
  }, []);

  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    if (isPanning) {
      const deltaX = e.clientX - lastPanPoint.x;
      const deltaY = e.clientY - lastPanPoint.y;
      
      setPanX(prev => prev + deltaX / zoom);
      setPanY(prev => prev + deltaY / zoom);
      setLastPanPoint({ x: e.clientX, y: e.clientY });
    }
  }, [isPanning, lastPanPoint, zoom]);

  const handleMouseUp = useCallback(() => {
    setIsPanning(false);
  }, []);

  // Gestion du clic sur un Primatom avec zoom visuel focalisé
  const handlePrimatomClick = (primatom: Primatom, e: React.MouseEvent) => {
    e.stopPropagation();
    onSelectPrimatom(primatom);
    // Le zoom visuel sera déclenché par l'effet useEffect avec focalisation correcte
  };

  const toggleFullscreen = () => {
    setIsFullscreen(!isFullscreen);
  };

  // Vérifier si un primatom est dans le réseau visuel
  const isInVisualNetwork = (primatom: Primatom): boolean => {
    if (!visualZoomTarget || !showVisualConnections) return false;
    if (primatom.id === visualZoomTarget.id) return true;
    
    const networkPrimatoms = getNetworkPrimatoms(visualZoomTarget);
    return networkPrimatoms.some(p => p.id === primatom.id);
  };

  // Obtenir l'opacité d'un primatom selon le contexte visuel
  const getPrimatomOpacity = (primatom: Primatom): number => {
    if (!showVisualConnections || !visualZoomTarget) return 1;
    
    if (isInVisualNetwork(primatom)) return 1;
    return 0.25; // Primatoms hors réseau encore plus atténués
  };

  // Transformation SVG pour zoom et pan
  const transform = `translate(${panX + canvasWidth / 2}, ${panY + canvasHeight / 2}) scale(${zoom}) translate(${-canvasWidth / 2}, ${-canvasHeight / 2})`;

  return (
    <div className={`bg-slate-900 rounded-lg border border-slate-700 overflow-hidden ${
      isFullscreen ? 'fixed inset-0 z-50' : 'relative'
    }`}>
      {/* Header avec contrôles */}
      <div className="p-4 border-b border-slate-700 bg-slate-800/50 backdrop-blur-sm">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <h2 className="text-lg font-semibold text-white flex items-center gap-2">
              <div className="w-2 h-2 bg-cyan-400 rounded-full animate-pulse"></div>
              Écosystème Social Dynamique - Laboratoire Scientifique
              {visualZoomTarget && (
                <span className="text-sm text-cyan-400 ml-2">
                  → Focus: {visualZoomTarget.name}
                </span>
              )}
            </h2>
            <div className="flex items-center gap-2 text-sm text-gray-400">
              <Users className="w-4 h-4" />
              <span>{primatoms.length} Primatoms</span>
              <Target className="w-4 h-4 ml-2" />
              <span>{coalitions.length} Coalitions</span>
              {influenceZones.length > 0 && (
                <>
                  <Zap className="w-4 h-4 ml-2" />
                  <span>{influenceZones.length} Zones d'Influence</span>
                </>
              )}
            </div>
          </div>
          
          <div className="flex items-center gap-2">
            {/* Contrôles de zoom */}
            <div className="flex items-center gap-1 mr-2 bg-slate-700/50 rounded-lg p-1">
              <button
                onClick={handleZoomOut}
                className="p-1 rounded hover:bg-slate-600 text-white transition-colors"
                title="Zoom arrière"
              >
                <ZoomOut className="w-4 h-4" />
              </button>
              <span className="text-xs text-gray-300 px-2 min-w-[3rem] text-center">
                {(zoom * 100).toFixed(0)}%
              </span>
              <button
                onClick={handleZoomIn}
                className="p-1 rounded hover:bg-slate-600 text-white transition-colors"
                title="Zoom avant"
              >
                <ZoomIn className="w-4 h-4" />
              </button>
              <button
                onClick={resetView}
                className="p-1 rounded hover:bg-slate-600 text-white transition-colors ml-1"
                title="Réinitialiser la vue"
              >
                <RotateCcw className="w-4 h-4" />
              </button>
              {selectedPrimatom && (
                <button
                  onClick={focusOnSelected}
                  className="p-1 rounded hover:bg-slate-600 text-cyan-400 transition-colors ml-1"
                  title="Recentrer sur sélection"
                >
                  <Focus className="w-4 h-4" />
                </button>
              )}
            </div>

            {/* Contrôles d'affichage */}
            <div className="flex items-center gap-2 mr-4">
              <button
                onClick={() => setShowInfluenceZones(!showInfluenceZones)}
                className={`px-3 py-1 rounded text-xs font-medium transition-colors ${
                  showInfluenceZones 
                    ? 'bg-purple-500/20 text-purple-400 border border-purple-500/30' 
                    : 'bg-slate-700 text-gray-400 border border-slate-600'
                }`}
              >
                Zones d'Influence
              </button>
              <button
                onClick={() => setShowMovementTrails(!showMovementTrails)}
                className={`px-3 py-1 rounded text-xs font-medium transition-colors ${
                  showMovementTrails 
                    ? 'bg-cyan-500/20 text-cyan-400 border border-cyan-500/30' 
                    : 'bg-slate-700 text-gray-400 border border-slate-600'
                }`}
              >
                Trajectoires
              </button>
              <button
                onClick={() => setShowRelationships(!showRelationships)}
                className={`px-3 py-1 rounded text-xs font-medium transition-colors ${
                  showRelationships 
                    ? 'bg-green-500/20 text-green-400 border border-green-500/30' 
                    : 'bg-slate-700 text-gray-400 border border-slate-600'
                }`}
              >
                Relations
              </button>
              <button
                onClick={() => setShowVisualConnections(!showVisualConnections)}
                className={`px-3 py-1 rounded text-xs font-medium transition-colors ${
                  showVisualConnections 
                    ? 'bg-yellow-500/20 text-yellow-400 border border-yellow-500/30' 
                    : 'bg-slate-700 text-gray-400 border border-slate-600'
                }`}
              >
                Réseau Visuel
              </button>
            </div>
            
            <button
              onClick={toggleFullscreen}
              className="p-2 rounded-lg bg-slate-700 hover:bg-slate-600 text-white transition-colors"
            >
              {isFullscreen ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
            </button>
          </div>
        </div>
      </div>
      
      {/* Canvas de simulation avec zoom et pan - Taille maximisée */}
      <div className="relative overflow-hidden bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
        <svg 
          ref={svgRef}
          width={canvasWidth} 
          height={canvasHeight} 
          className="bg-slate-800 cursor-move"
          style={{ 
            background: 'radial-gradient(circle at 30% 20%, rgba(59, 130, 246, 0.1) 0%, transparent 50%), radial-gradient(circle at 70% 80%, rgba(139, 92, 246, 0.1) 0%, transparent 50%)'
          }}
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseUp}
        >
          {/* Grille de fond subtile */}
          <defs>
            <pattern id="grid" width="50" height="50" patternUnits="userSpaceOnUse">
              <path d="M 50 0 L 0 0 0 50" fill="none" stroke="#334155" strokeWidth="0.5" opacity="0.3"/>
            </pattern>
            
            {/* Filtres pour les effets visuels */}
            <filter id="glow">
              <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
              <feMerge> 
                <feMergeNode in="coloredBlur"/>
                <feMergeNode in="SourceGraphic"/>
              </feMerge>
            </filter>
            
            <filter id="strongGlow">
              <feGaussianBlur stdDeviation="5" result="coloredBlur"/>
              <feMerge> 
                <feMergeNode in="coloredBlur"/>
                <feMergeNode in="SourceGraphic"/>
              </feMerge>
            </filter>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid)" />
          
          {/* Groupe principal avec transformation */}
          <g transform={transform}>
            {/* Zones d'influence des coalitions */}
            {showInfluenceZones && influenceZones.map((zone, index) => (
              <g key={`influence-${zone.coalitionId}`}>
                {/* Zone d'influence principale */}
                <circle
                  cx={zone.x}
                  cy={zone.y}
                  r={zone.radius}
                  fill={zone.color}
                  opacity={0.15}
                  stroke={zone.color}
                  strokeWidth={2 / zoom}
                  strokeOpacity={0.4}
                  className="animate-pulse"
                  style={{ animationDuration: '3s' }}
                />
                
                {/* Zone d'influence secondaire */}
                <circle
                  cx={zone.x}
                  cy={zone.y}
                  r={zone.radius * 0.6}
                  fill={zone.color}
                  opacity={0.08}
                  stroke={zone.color}
                  strokeWidth={1 / zoom}
                  strokeOpacity={0.6}
                />
                
                {/* Centre de pouvoir */}
                <circle
                  cx={zone.x}
                  cy={zone.y}
                  r={8 / zoom}
                  fill={zone.color}
                  opacity={0.3}
                  stroke={zone.color}
                  strokeWidth={2 / zoom}
                />
                
                {/* Indicateur de force (visible seulement si zoom suffisant) */}
                {zoom > 0.8 && (
                  <text
                    x={zone.x}
                    y={zone.y - zone.radius - 10 / zoom}
                    textAnchor="middle"
                    className="fill-white font-medium"
                    fontSize={12 / zoom}
                    opacity={0.8}
                  >
                    {zone.strength.toFixed(0)}%
                  </text>
                )}
              </g>
            ))}
            
            {/* Relations entre Primatoms */}
            {showRelationships && primatoms.map(primatom => 
              Object.entries(primatom.relationships)
                .filter(([_, strength]) => strength > 70)
                .map(([otherId, strength]) => {
                  const other = primatoms.find(p => p.id === otherId);
                  if (!other) return null;
                  
                  return (
                    <line
                      key={`relation-${primatom.id}-${otherId}`}
                      x1={primatom.x}
                      y1={primatom.y}
                      x2={other.x}
                      y2={other.y}
                      stroke="#10B981"
                      strokeWidth={Math.max(1, (strength - 70) / 10) / zoom}
                      opacity={0.4 * getPrimatomOpacity(primatom)}
                      strokeDasharray={`${2 / zoom},${2 / zoom}`}
                    />
                  );
                })
            )}

            {/* Connexions du réseau visuel avec effet de focus */}
            {showVisualConnections && visualZoomTarget && primatoms.map(primatom => {
              if (!isInVisualNetwork(primatom) || primatom.id === visualZoomTarget.id) return null;
              
              const strength = visualZoomTarget.relationships[primatom.id] || 0;
              if (strength < 30) return null;
              
              return (
                <line
                  key={`visual-connection-${visualZoomTarget.id}-${primatom.id}`}
                  x1={visualZoomTarget.x}
                  y1={visualZoomTarget.y}
                  x2={primatom.x}
                  y2={primatom.y}
                  stroke="#FBBF24"
                  strokeWidth={Math.max(3, strength / 20) / zoom}
                  opacity={0.8}
                  filter="url(#strongGlow)"
                  className="animate-pulse"
                  style={{ animationDuration: '2s' }}
                />
              );
            })}
            
            {/* Trajectoires de mouvement */}
            {showMovementTrails && primatoms.map(primatom => {
              const trail = getMovementTrail(primatom);
              if (!trail) return null;
              
              return (
                <g key={`trail-${primatom.id}`}>
                  <line
                    x1={trail.x1}
                    y1={trail.y1}
                    x2={trail.x2}
                    y2={trail.y2}
                    stroke={getBehaviorColor(primatom.behaviorType)}
                    strokeWidth={2 / zoom}
                    opacity={trail.opacity * 0.6 * getPrimatomOpacity(primatom)}
                    strokeDasharray={`${5 / zoom},${5 / zoom}`}
                  />
                  
                  {/* Flèche de direction */}
                  <polygon
                    points={`${trail.x2-5/zoom},${trail.y2-3/zoom} ${trail.x2},${trail.y2} ${trail.x2-5/zoom},${trail.y2+3/zoom}`}
                    fill={getBehaviorColor(primatom.behaviorType)}
                    opacity={trail.opacity * 0.8 * getPrimatomOpacity(primatom)}
                  />
                </g>
              );
            })}
            
            {/* Primatoms */}
            {primatoms.map(primatom => {
              const size = getPrimatomSize(primatom);
              const isSelected = selectedPrimatom?.id === primatom.id;
              const stressLevel = primatom.stressLevel || 0;
              const opacity = getPrimatomOpacity(primatom);
              const isInNetwork = isInVisualNetwork(primatom);
              const isCenterOfNetwork = visualZoomTarget?.id === primatom.id;
              
              return (
                <g key={primatom.id} opacity={opacity}>
                  {/* Aura de sélection avec effet spécial pour le centre du réseau */}
                  {isSelected && (
                    <circle
                      cx={primatom.x}
                      cy={primatom.y}
                      r={size + (isCenterOfNetwork ? 12 : 8) / zoom}
                      fill="none"
                      stroke="#FBBF24"
                      strokeWidth={(isCenterOfNetwork ? 4 : 3) / zoom}
                      opacity={0.9}
                      className="animate-pulse"
                      filter="url(#strongGlow)"
                    />
                  )}

                  {/* Aura de réseau visuel */}
                  {isInNetwork && visualZoomTarget && primatom.id !== visualZoomTarget.id && (
                    <circle
                      cx={primatom.x}
                      cy={primatom.y}
                      r={size + 6 / zoom}
                      fill="none"
                      stroke="#FBBF24"
                      strokeWidth={2 / zoom}
                      opacity={0.6}
                      strokeDasharray={`${3 / zoom},${3 / zoom}`}
                      className="animate-pulse"
                      style={{ animationDuration: '3s' }}
                    />
                  )}

                  {/* Aura spéciale pour le centre du réseau */}
                  {isCenterOfNetwork && (
                    <circle
                      cx={primatom.x}
                      cy={primatom.y}
                      r={size + 15 / zoom}
                      fill="none"
                      stroke="#FBBF24"
                      strokeWidth={2 / zoom}
                      opacity={0.4}
                      className="animate-pulse"
                      style={{ animationDuration: '1.5s' }}
                    />
                  )}
                  
                  {/* Aura de stress */}
                  {stressLevel > 50 && (
                    <circle
                      cx={primatom.x}
                      cy={primatom.y}
                      r={size + 4 / zoom}
                      fill="#EF4444"
                      opacity={0.2}
                      className="animate-pulse"
                      style={{ animationDuration: '1s' }}
                    />
                  )}
                  
                  {/* Corps principal */}
                  <circle
                    cx={primatom.x}
                    cy={primatom.y}
                    r={size}
                    fill={primatom.coalition ? 
                      coalitions.find(c => c.id === primatom.coalition)?.id ? 
                        influenceZones.find(z => z.coalitionId === primatom.coalition)?.color || getBehaviorColor(primatom.behaviorType)
                        : getBehaviorColor(primatom.behaviorType)
                      : getBehaviorColor(primatom.behaviorType)
                    }
                    stroke={isSelected ? '#FBBF24' : isInNetwork ? '#FBBF24' : '#1E293B'}
                    strokeWidth={(isSelected || isInNetwork ? 2 : 1) / zoom}
                    className="cursor-pointer transition-all hover:brightness-110"
                    onClick={(e) => handlePrimatomClick(primatom, e)}
                    filter={isSelected || isCenterOfNetwork ? "url(#strongGlow)" : isInNetwork ? "url(#glow)" : undefined}
                  />
                  
                  {/* Indicateur de comportement */}
                  <circle
                    cx={primatom.x + size * 0.6}
                    cy={primatom.y - size * 0.6}
                    r={size * 0.3}
                    fill={getBehaviorColor(primatom.behaviorType)}
                    stroke="#1E293B"
                    strokeWidth={0.5 / zoom}
                  />
                  
                  {/* Barre d'énergie (visible seulement si zoom suffisant) */}
                  {zoom > 0.6 && (
                    <>
                      <rect
                        x={primatom.x - size}
                        y={primatom.y - size - 8 / zoom}
                        width={size * 2}
                        height={2 / zoom}
                        fill="#1E293B"
                        rx={1 / zoom}
                      />
                      <rect
                        x={primatom.x - size}
                        y={primatom.y - size - 8 / zoom}
                        width={(size * 2) * (primatom.energy / 100)}
                        height={2 / zoom}
                        fill="#10B981"
                        rx={1 / zoom}
                      />
                    </>
                  )}
                  
                  {/* Nom et informations (si sélectionné et zoom suffisant) */}
                  {(isSelected || isInNetwork) && zoom > 0.5 && (
                    <g>
                      <text
                        x={primatom.x}
                        y={primatom.y - size - 15 / zoom}
                        textAnchor="middle"
                        className="fill-white font-semibold"
                        fontSize={14 / zoom}
                      >
                        {primatom.name}
                      </text>
                      <text
                        x={primatom.x}
                        y={primatom.y + size + 15 / zoom}
                        textAnchor="middle"
                        className="fill-gray-300"
                        fontSize={12 / zoom}
                      >
                        {primatom.behaviorType} | Influence: {(primatom.influence || 50).toFixed(0)}
                      </text>
                      {stressLevel > 30 && (
                        <text
                          x={primatom.x}
                          y={primatom.y + size + 28 / zoom}
                          textAnchor="middle"
                          className="fill-red-400"
                          fontSize={10 / zoom}
                        >
                          Stress: {stressLevel.toFixed(0)}%
                        </text>
                      )}
                      {isInNetwork && visualZoomTarget && primatom.id !== visualZoomTarget.id && (
                        <text
                          x={primatom.x}
                          y={primatom.y + size + 40 / zoom}
                          textAnchor="middle"
                          className="fill-yellow-400"
                          fontSize={10 / zoom}
                        >
                          Relation: {(visualZoomTarget.relationships[primatom.id] || 0).toFixed(0)}%
                        </text>
                      )}
                    </g>
                  )}
                </g>
              );
            })}
          </g>
        </svg>
        
        {/* Légende comportementale */}
        <div className="absolute top-4 right-4 bg-slate-800/90 backdrop-blur-sm rounded-lg p-4 border border-slate-700">
          <h3 className="text-sm font-medium text-white mb-3">Typologie Comportementale</h3>
          <div className="space-y-2">
            {[
              { type: 'leader', label: 'Alpha (Leaders)', color: '#EF4444', count: primatoms.filter(p => p.behaviorType === 'leader').length },
              { type: 'innovator', label: 'Sigma (Innovateurs)', color: '#8B5CF6', count: primatoms.filter(p => p.behaviorType === 'innovator').length },
              { type: 'mediator', label: 'Omega (Médiateurs)', color: '#10B981', count: primatoms.filter(p => p.behaviorType === 'mediator').length },
              { type: 'explorer', label: 'Delta (Explorateurs)', color: '#F59E0B', count: primatoms.filter(p => p.behaviorType === 'explorer').length },
              { type: 'follower', label: 'Beta (Suiveurs)', color: '#06B6D4', count: primatoms.filter(p => p.behaviorType === 'follower').length }
            ].map(({ type, label, color, count }) => (
              <div key={type} className="flex items-center justify-between gap-3">
                <div className="flex items-center gap-2">
                  <div 
                    className="w-3 h-3 rounded-full" 
                    style={{ backgroundColor: color }}
                  />
                  <span className="text-xs text-gray-300">{label}</span>
                </div>
                <span className="text-xs text-white font-medium">{count}</span>
              </div>
            ))}
          </div>
          
          {/* Statistiques dynamiques */}
          <div className="mt-4 pt-3 border-t border-slate-600">
            <div className="text-xs text-gray-400 space-y-1">
              <div>Population: {primatoms.length}</div>
              <div>Coalitions: {coalitions.length}</div>
              <div>Zones d'Influence: {influenceZones.length}</div>
              <div>Stress Moyen: {(primatoms.reduce((sum, p) => sum + (p.stressLevel || 0), 0) / primatoms.length).toFixed(1)}%</div>
              {visualZoomTarget && (
                <div className="text-yellow-400 font-medium">Focus: {visualZoomTarget.name}</div>
              )}
            </div>
          </div>
        </div>

        {/* Contrôles de navigation */}
        <div className="absolute bottom-4 left-4 bg-slate-800/90 backdrop-blur-sm rounded-lg p-3 border border-slate-700">
          <div className="text-xs text-gray-400 space-y-1">
            <div className="flex items-center gap-2">
              <Move className="w-3 h-3" />
              <span>Clic + Glisser: Déplacer</span>
            </div>
            <div>Molette: Zoom</div>
            <div>Clic sur Primatom: Focus réseau</div>
            <div>Mode: {isFullscreen ? 'Plein Écran' : 'Fenêtré'}</div>
            <div>Zoom: {(zoom * 100).toFixed(0)}%</div>
            <div>Canvas: {canvasWidth}x{canvasHeight}px</div>
            {visualZoomTarget && (
              <div className="text-yellow-400">Focus: {getNetworkPrimatoms(visualZoomTarget).length} membres</div>
            )}
          </div>
        </div>

        {/* Indicateur de sélection avec informations de focus */}
        {selectedPrimatom && (
          <div className="absolute top-4 left-4 bg-slate-800/90 backdrop-blur-sm rounded-lg p-3 border border-slate-700">
            <div className="text-sm text-white font-medium mb-1">Focus Actuel</div>
            <div className="text-xs text-gray-300">{selectedPrimatom.name}</div>
            <div className="text-xs text-cyan-400">{selectedPrimatom.behaviorType}</div>
            {selectedPrimatom.coalition && (
              <div className="text-xs text-purple-400">
                Coalition: {coalitions.find(c => c.id === selectedPrimatom.coalition)?.name}
              </div>
            )}
            {visualZoomTarget && (
              <div className="text-xs text-yellow-400 mt-1 font-medium">
                Réseau: {getNetworkPrimatoms(visualZoomTarget).length} membres connectés
              </div>
            )}
            <div className="text-xs text-gray-500 mt-1">
              Cliquez sur Focus pour recentrer
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default SimulationCanvas;