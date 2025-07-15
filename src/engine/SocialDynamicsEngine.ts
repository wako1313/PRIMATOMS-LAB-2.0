import { Primatom, Coalition, SocialMetric, SimulationState, DisruptiveEvent, BehaviorDistribution } from '../types';
import { DisruptionEngine } from './DisruptionEngine';
import { qlooService } from '../services/QlooAPIService';
import { LLMOrchestrator } from '../services/LLMOrchestrator';

// Interfaces étendues pour les métriques avancées
interface AdvancedMetrics extends SocialMetric {
  // Métriques d'intelligence collective
  collectiveIntelligence: number;
  emergenceIndex: number;
  culturalVelocity: number;
  socialCoherence: number;
  
  // Métriques prédictives
  stabilityTrend: 'rising' | 'stable' | 'declining' | 'volatile';
  coalitionFormationRate: number;
  innovationMomentum: number;
  adaptabilityScore: number;
  
  // Métriques de réseau
  networkDensity: number;
  influenceDistribution: number;
  communicationEfficiency: number;
  trustPropagation: number;
  
  // Métriques émergentes
  culturalSynchronization: number;
  behavioralComplexity: number;
  systemResilience: number;
  evolutionaryPressure: number;
}

interface CulturalTrend {
  id: string;
  name: string;
  type: 'behavioral' | 'social' | 'technological' | 'cultural';
  intensity: number;
  growthRate: number;
  affectedBehaviorTypes: string[];
  emergenceTimestamp: number;
  predictedPeak: number;
}

interface EmergentPhenomenon {
  id: string;
  name: string;
  description: string;
  type: 'cognitive' | 'social' | 'territorial' | 'technological' | 'cultural';
  intensity: number;
  participants: string[];
  emergenceConditions: string[];
  predictedEvolution: string;
  timestamp: number;
}

interface PredictiveInsight {
  type: 'trend' | 'risk' | 'opportunity' | 'phenomenon';
  confidence: number;
  timeframe: 'immediate' | 'short' | 'medium' | 'long';
  description: string;
  impactLevel: 'low' | 'medium' | 'high' | 'critical';
  affectedEntities: string[];
  recommendedActions: string[];
}

export class SocialDynamicsEngine {
  private state: SimulationState;
  private updateInterval: number | null = null;
  private disruptionEngine: DisruptionEngine;
  private llmOrchestrator: LLMOrchestrator;
  private populationSize: number = 200;
  private movementSpeed: number = 0.3;
  private territoryInfluence: Map<string, { x: number, y: number, radius: number }> = new Map();
  private metricsHistory: AdvancedMetrics[] = [];
  
  // Nouveaux systèmes avancés
  private culturalTrends: CulturalTrend[] = [];
  private emergentPhenomena: EmergentPhenomenon[] = [];
  private predictiveInsights: PredictiveInsight[] = [];
  private behaviorDistribution: BehaviorDistribution;
  private aiPredictionCache: Map<string, any> = new Map();
  private lastAIAnalysis: number = 0;
  private culturalEvolutionTracker: Map<string, number[]> = new Map();

  constructor() {
    this.disruptionEngine = new DisruptionEngine();
    this.llmOrchestrator = new LLMOrchestrator();
    this.behaviorDistribution = {
      leader: 0.08,
      innovator: 0.15,
      mediator: 0.12,
      explorer: 0.20,
      follower: 0.45
    };
    this.state = this.initializeState();
    this.initializeAdvancedSystems();
  }

  private initializeAdvancedSystems() {
    // Initialiser les systèmes de tracking culturel
    ['trust', 'cooperation', 'innovation', 'adaptability', 'influence'].forEach(metric => {
      this.culturalEvolutionTracker.set(metric, []);
    });
  }

  private initializeState(): SimulationState {
    const primatoms: Primatom[] = [];
    
    let currentId = 0;
    Object.entries(this.behaviorDistribution).forEach(([behaviorType, ratio]) => {
      const count = Math.floor(this.populationSize * ratio);
      
      for (let i = 0; i < count; i++) {
        const primatom = this.createAdvancedPrimatom(currentId++, behaviorType as Primatom['behaviorType']);
        primatoms.push(primatom);
      }
    });

    this.initializeClusterPositions(primatoms);

    return {
      primatoms,
      coalitions: [],
      metrics: [],
      currentScenario: null,
      isRunning: false,
      generation: 1,
      globalKnowledge: [],
      activeDisruptions: [],
      emergentPhenomena: [],
      systemStability: 75,
      territoryMap: new Map(),
      influenceZones: [],
      // Nouvelles propriétés avancées
      culturalTrends: [],
      predictionAccuracy: 85,
      aiInsights: [],
      socialComplexity: 'medium',
      evolutionaryStage: 'formation'
    };
  }

  private createAdvancedPrimatom(id: number, behaviorType: Primatom['behaviorType']): Primatom {
    const baseStats = this.getBehaviorBaseStats(behaviorType);
    
    return {
      id: `primatom-${id}`,
      name: `${this.getBehaviorPrefix(behaviorType)}-${id + 1}`,
      x: 0,
      y: 0,
      targetX: 0,
      targetY: 0,
      energy: baseStats.energy + Math.random() * 20,
      trust: baseStats.trust + Math.random() * 20,
      innovation: baseStats.innovation + Math.random() * 20,
      cooperation: baseStats.cooperation + Math.random() * 20,
      age: Math.random() * 50 + 20,
      memories: [],
      relationships: {},
      behaviorType,
      culturalNorms: [],
      adaptabilityScore: baseStats.adaptability + Math.random() * 20,
      stressLevel: Math.random() * 15,
      influence: baseStats.influence,
      territoryRadius: baseStats.territoryRadius,
      movementPattern: this.getMovementPattern(behaviorType),
      socialRange: baseStats.socialRange,
      
      // Nouvelles propriétés avancées
      culturalAlignment: Math.random() * 100,
      innovationPotential: baseStats.innovation + Math.random() * 30,
      leadershipCapacity: behaviorType === 'leader' ? 80 + Math.random() * 20 : Math.random() * 40,
      networkInfluence: 0,
      emergentTraits: [],
      cognitiveLoad: Math.random() * 50,
      socialIntelligence: baseStats.socialRange / 2 + Math.random() * 30,
      adaptationHistory: [],
      culturalContributions: [],
      predictedBehavior: 'stable'
    };
  }

  private getBehaviorBaseStats(type: Primatom['behaviorType']) {
    const stats = {
      leader: { 
        energy: 75, trust: 60, innovation: 65, cooperation: 70, 
        adaptability: 80, influence: 85, territoryRadius: 60, socialRange: 120 
      },
      innovator: { 
        energy: 80, trust: 50, innovation: 90, cooperation: 60, 
        adaptability: 95, influence: 70, territoryRadius: 40, socialRange: 100 
      },
      mediator: { 
        energy: 65, trust: 85, innovation: 55, cooperation: 90, 
        adaptability: 75, influence: 75, territoryRadius: 50, socialRange: 140 
      },
      explorer: { 
        energy: 85, trust: 55, innovation: 75, cooperation: 50, 
        adaptability: 90, influence: 60, territoryRadius: 30, socialRange: 80 
      },
      follower: { 
        energy: 60, trust: 70, innovation: 45, cooperation: 80, 
        adaptability: 60, influence: 40, territoryRadius: 35, socialRange: 90 
      }
    };
    return stats[type];
  }

  private getBehaviorPrefix(type: Primatom['behaviorType']): string {
    const prefixes = {
      leader: 'Alpha',
      innovator: 'Sigma',
      mediator: 'Omega',
      explorer: 'Delta',
      follower: 'Beta'
    };
    return prefixes[type];
  }

  private getMovementPattern(type: Primatom['behaviorType']): 'territorial' | 'nomadic' | 'social' | 'strategic' {
    const patterns = {
      leader: 'territorial',
      innovator: 'nomadic',
      mediator: 'social',
      explorer: 'nomadic',
      follower: 'social'
    };
    return patterns[type];
  }

  private initializeClusterPositions(primatoms: Primatom[]) {
    const clusters = [
      { x: 200, y: 150, types: ['leader', 'follower'] },
      { x: 600, y: 150, types: ['innovator', 'explorer'] },
      { x: 400, y: 300, types: ['mediator', 'follower'] },
      { x: 150, y: 450, types: ['explorer', 'follower'] },
      { x: 650, y: 450, types: ['leader', 'innovator'] }
    ];

    primatoms.forEach(primatom => {
      const compatibleClusters = clusters.filter(cluster => 
        cluster.types.includes(primatom.behaviorType)
      );
      
      const selectedCluster = compatibleClusters[Math.floor(Math.random() * compatibleClusters.length)];
      
      const angle = Math.random() * 2 * Math.PI;
      const distance = Math.random() * 80 + 20;
      
      primatom.x = selectedCluster.x + Math.cos(angle) * distance;
      primatom.y = selectedCluster.y + Math.sin(angle) * distance;
      primatom.targetX = primatom.x;
      primatom.targetY = primatom.y;
      
      primatom.x = Math.max(20, Math.min(1180, primatom.x));
      primatom.y = Math.max(20, Math.min(680, primatom.y));
      primatom.targetX = primatom.x;
      primatom.targetY = primatom.y;
    });
  }

  start() {
    if (this.state.isRunning) return;
    
    this.state.isRunning = true;
    this.updateInterval = setInterval(() => {
      this.update();
    }, 100);
    
    // Démarrer l'analyse IA périodique
    this.startAIAnalysis();
  }

  stop() {
    if (!this.state.isRunning) return;
    
    this.state.isRunning = false;
    if (this.updateInterval) {
      clearInterval(this.updateInterval);
      this.updateInterval = null;
    }
  }

  private async startAIAnalysis() {
    // Analyse IA toutes les 10 secondes
    setInterval(async () => {
      if (this.state.isRunning) {
        await this.performAIAnalysis();
      }
    }, 10000);
  }

  private async performAIAnalysis() {
    try {
      // Éviter les analyses trop fréquentes
      if (Date.now() - this.lastAIAnalysis < 8000) return;
      
      const currentMetrics = this.calculateAdvancedMetrics();
      const populationSnapshot = this.createPopulationSnapshot();
      
      // Analyse des tendances émergentes
      const emergingTrends = await this.analyzeEmergingTrends(populationSnapshot);
      this.culturalTrends = emergingTrends;
      
      // Prédictions comportementales
      const behaviorPredictions = await this.predictBehavioralShifts();
      this.updatePredictiveInsights(behaviorPredictions);
      
      // Détection de phénomènes émergents
      const phenomena = await this.detectAdvancedPhenomena();
      this.emergentPhenomena = phenomena;
      
      this.lastAIAnalysis = Date.now();
      
    } catch (error) {
      console.warn('Analyse IA échouée:', error);
    }
  }

  private async analyzeEmergingTrends(snapshot: any): Promise<CulturalTrend[]> {
    const prompt = `
    Analysez cette population de ${this.populationSize} primatoms et identifiez les tendances culturelles émergentes:
    
    Métriques actuelles:
    - Confiance moyenne: ${snapshot.avgTrust.toFixed(1)}%
    - Coopération: ${snapshot.avgCooperation.toFixed(1)}%
    - Innovation: ${snapshot.avgInnovation.toFixed(1)}%
    - Nombre de coalitions: ${this.state.coalitions.length}
    - Phénomènes actifs: ${this.state.emergentPhenomena?.length || 0}
    
    Distribution comportementale:
    ${Object.entries(this.getCurrentBehaviorDistribution())
      .map(([type, ratio]) => `- ${type}: ${(ratio * 100).toFixed(1)}%`)
      .join('\n')}
    
    Identifiez 3-5 tendances émergentes avec leur type, intensité et taux de croissance.
    `;

    try {
      const analysis = await this.llmOrchestrator.analyzePattern(prompt);
      return this.parseTrendAnalysis(analysis);
    } catch (error) {
      return this.generateFallbackTrends();
    }
  }

  private parseTrendAnalysis(analysis: string): CulturalTrend[] {
    // Parser la réponse IA et générer des objets CulturalTrend
    const trends: CulturalTrend[] = [];
    
    // Fallback avec tendances générées algorithmiquement
    const trendNames = [
      'Synchronisation Cognitive Collective',
      'Émergence de Leaders Hybrides',
      'Innovation Collaborative Décentralisée',
      'Médiation Préventive Systémique',
      'Exploration Coordonnée Multi-Coalition'
    ];
    
    trendNames.forEach((name, index) => {
      trends.push({
        id: `trend-${Date.now()}-${index}`,
        name,
        type: ['behavioral', 'social', 'technological', 'cultural'][index % 4] as any,
        intensity: 60 + Math.random() * 35,
        growthRate: Math.random() * 20 - 5,
        affectedBehaviorTypes: this.getRandomBehaviorTypes(),
        emergenceTimestamp: Date.now(),
        predictedPeak: Date.now() + (30000 + Math.random() * 60000)
      });
    });
    
    return trends.slice(0, 3 + Math.floor(Math.random() * 3));
  }

  private getRandomBehaviorTypes(): string[] {
    const types = ['leader', 'innovator', 'mediator', 'explorer', 'follower'];
    const count = 1 + Math.floor(Math.random() * 3);
    return types.sort(() => Math.random() - 0.5).slice(0, count);
  }

  private generateFallbackTrends(): CulturalTrend[] {
    return [
      {
        id: `trend-fallback-${Date.now()}`,
        name: 'Évolution Comportementale Adaptative',
        type: 'behavioral',
        intensity: 70,
        growthRate: 5,
        affectedBehaviorTypes: ['innovator', 'explorer'],
        emergenceTimestamp: Date.now(),
        predictedPeak: Date.now() + 45000
      }
    ];
  }

  private async predictBehavioralShifts(): Promise<any> {
    const recentMetrics = this.metricsHistory.slice(-10);
    if (recentMetrics.length < 3) return null;
    
    const trends = {
      trustTrend: this.calculateTrend(recentMetrics.map(m => m.trustNetwork)),
      cooperationTrend: this.calculateTrend(recentMetrics.map(m => m.cooperation)),
      innovationTrend: this.calculateTrend(recentMetrics.map(m => m.innovation)),
      coalitionTrend: this.calculateTrend(recentMetrics.map(m => m.governance))
    };
    
    return trends;
  }

  private calculateTrend(values: number[]): number {
    if (values.length < 2) return 0;
    const recent = values.slice(-3).reduce((a, b) => a + b, 0) / 3;
    const older = values.slice(0, -3).reduce((a, b) => a + b, 0) / Math.max(1, values.length - 3);
    return recent - older;
  }

  private async detectAdvancedPhenomena(): Promise<EmergentPhenomenon[]> {
    const phenomena: EmergentPhenomenon[] = [];
    
    // Détection de phénomènes cognitifs
    const avgInnovation = this.state.primatoms.reduce((sum, p) => sum + p.innovation, 0) / this.state.primatoms.length;
    if (avgInnovation > 85) {
      phenomena.push({
        id: `phenomenon-cognitive-${Date.now()}`,
        name: 'Renaissance Cognitive Collective',
        description: 'Émergence d\'une intelligence collective transcendante',
        type: 'cognitive',
        intensity: avgInnovation,
        participants: this.state.primatoms.filter(p => p.innovation > 80).map(p => p.id),
        emergenceConditions: ['Innovation élevée', 'Synchronisation comportementale'],
        predictedEvolution: 'Expansion vers méta-intelligence',
        timestamp: Date.now()
      });
    }
    
    // Détection de phénomènes sociaux
    const megaCoalitions = this.state.coalitions.filter(c => c.members.length > 15);
    if (megaCoalitions.length > 1) {
      phenomena.push({
        id: `phenomenon-social-${Date.now()}`,
        name: 'Émergence de Méga-Structures Sociales',
        description: 'Formation de coalitions géantes interconnectées',
        type: 'social',
        intensity: megaCoalitions.reduce((sum, c) => sum + c.cohesion, 0) / megaCoalitions.length,
        participants: megaCoalitions.flatMap(c => c.members),
        emergenceConditions: ['Cohésion élevée', 'Masse critique atteinte'],
        predictedEvolution: 'Fusion en super-organisme social',
        timestamp: Date.now()
      });
    }
    
    // Détection de phénomènes territoriaux
    const territorialOverlap = this.calculateTerritorialOverlap();
    if (territorialOverlap > 0.4) {
      phenomena.push({
        id: `phenomenon-territorial-${Date.now()}`,
        name: 'Fusion Territoriale Multi-Coalitions',
        description: 'Chevauchement massif des zones d\'influence',
        type: 'territorial',
        intensity: territorialOverlap * 100,
        participants: this.state.coalitions.map(c => c.id),
        emergenceConditions: ['Expansion territoriale', 'Proximité géographique'],
        predictedEvolution: 'Création de méga-territoires partagés',
        timestamp: Date.now()
      });
    }
    
    return phenomena;
  }

  private updatePredictiveInsights(predictions: any) {
    this.predictiveInsights = [];
    
    if (predictions) {
      // Analyser les tendances et générer des insights
      Object.entries(predictions).forEach(([metric, trend]: [string, any]) => {
        if (Math.abs(trend) > 5) {
          this.predictiveInsights.push({
            type: trend > 0 ? 'opportunity' : 'risk',
            confidence: Math.min(95, 60 + Math.abs(trend) * 3),
            timeframe: Math.abs(trend) > 15 ? 'immediate' : 'short',
            description: `${metric} montre une tendance ${trend > 0 ? 'positive' : 'négative'} significative`,
            impactLevel: Math.abs(trend) > 20 ? 'high' : Math.abs(trend) > 10 ? 'medium' : 'low',
            affectedEntities: this.getAffectedEntities(metric),
            recommendedActions: this.generateRecommendations(metric, trend)
          });
        }
      });
    }
  }

  private getAffectedEntities(metric: string): string[] {
    const entityMap = {
      trustTrend: ['coalitions', 'relationships'],
      cooperationTrend: ['coalitions', 'governance'],
      innovationTrend: ['innovators', 'explorers'],
      coalitionTrend: ['all_coalitions', 'social_structure']
    };
    return entityMap[metric] || ['population'];
  }

  private generateRecommendations(metric: string, trend: number): string[] {
    const recommendationMap = {
      trustTrend: trend > 0 
        ? ['Encourager la formation de nouvelles coalitions', 'Faciliter les échanges inter-groupes']
        : ['Renforcer la médiation', 'Adresser les sources de méfiance'],
      cooperationTrend: trend > 0
        ? ['Lancer des projets collaboratifs', 'Récompenser la coopération']
        : ['Identifier les facteurs de division', 'Promouvoir l\'empathie'],
      innovationTrend: trend > 0
        ? ['Faciliter le partage d\'innovations', 'Créer des espaces créatifs']
        : ['Stimuler la créativité', 'Réduire la pression conservative'],
      coalitionTrend: trend > 0
        ? ['Optimiser la gouvernance', 'Prévenir la fragmentation']
        : ['Faciliter la formation de coalitions', 'Améliorer la communication']
    };
    
    return recommendationMap[metric] || ['Surveiller l\'évolution', 'Adapter la stratégie'];
  }

  private update() {
    this.updateStrategicMovements();
    
    const newDisruptions = this.disruptionEngine.evaluateDisruptionTriggers(this.state);
    this.state.activeDisruptions = this.disruptionEngine.getActiveEvents();

    this.disruptionEngine.applyDisruptiveEffects(this.state.primatoms, this.state.coalitions);

    this.updateRelationships();
    this.updateCoalitions();
    this.updateTerritorialInfluence();
    this.updateAdvancedBehaviors();
    this.updateNetworkMetrics();
    
    if (Date.now() % 1000 < 100) {
      this.updateAdvancedMetrics();
      this.processAdvancedGovernance();
      this.updateCulturalEvolution();
      this.updateSystemStability();
    }

    if (this.state.generation % 100 === 0) {
      this.processGenerationalEvolution();
    }
  }

  private updateStrategicMovements() {
    this.state.primatoms.forEach(primatom => {
      this.calculateTargetPosition(primatom);
      
      const dx = primatom.targetX - primatom.x;
      const dy = primatom.targetY - primatom.y;
      const distance = Math.sqrt(dx * dx + dy * dy);
      
      if (distance > 2) {
        const moveX = (dx / distance) * this.movementSpeed;
        const moveY = (dy / distance) * this.movementSpeed;
        
        primatom.x += moveX;
        primatom.y += moveY;
        
        primatom.x = Math.max(10, Math.min(1190, primatom.x));
        primatom.y = Math.max(10, Math.min(690, primatom.y));
      }
    });
  }

  private calculateTargetPosition(primatom: Primatom) {
    let targetX = primatom.x;
    let targetY = primatom.y;
    
    switch (primatom.movementPattern) {
      case 'territorial':
        if (primatom.coalition) {
          const coalition = this.state.coalitions.find(c => c.id === primatom.coalition);
          if (coalition) {
            const members = this.state.primatoms.filter(p => p.coalition === coalition.id);
            const centerX = members.reduce((sum, p) => sum + p.x, 0) / members.length;
            const centerY = members.reduce((sum, p) => sum + p.y, 0) / members.length;
            
            targetX = centerX + (Math.random() - 0.5) * 40;
            targetY = centerY + (Math.random() - 0.5) * 40;
          }
        }
        break;
        
      case 'social':
        const nearbyAllies = this.state.primatoms.filter(other => 
          other.id !== primatom.id && 
          primatom.relationships[other.id] > 60 &&
          this.distance(primatom, other) < primatom.socialRange
        );
        
        if (nearbyAllies.length > 0) {
          const avgX = nearbyAllies.reduce((sum, p) => sum + p.x, 0) / nearbyAllies.length;
          const avgY = nearbyAllies.reduce((sum, p) => sum + p.y, 0) / nearbyAllies.length;
          
          targetX = (primatom.x + avgX) / 2;
          targetY = (primatom.y + avgY) / 2;
        }
        break;
        
      case 'nomadic':
        if (Math.random() < 0.02) {
          targetX = primatom.x + (Math.random() - 0.5) * 200;
          targetY = primatom.y + (Math.random() - 0.5) * 200;
          
          targetX = Math.max(50, Math.min(1150, targetX));
          targetY = Math.max(50, Math.min(650, targetY));
        }
        break;
        
      case 'strategic':
        const threats = this.identifyThreats(primatom);
        const opportunities = this.identifyOpportunities(primatom);
        
        if (threats.length > 0) {
          const avgThreatX = threats.reduce((sum, p) => sum + p.x, 0) / threats.length;
          const avgThreatY = threats.reduce((sum, p) => sum + p.y, 0) / threats.length;
          
          targetX = primatom.x + (primatom.x - avgThreatX) * 0.1;
          targetY = primatom.y + (primatom.y - avgThreatY) * 0.1;
        } else if (opportunities.length > 0) {
          const bestOpportunity = opportunities[0];
          targetX = (primatom.x + bestOpportunity.x) / 2;
          targetY = (primatom.y + bestOpportunity.y) / 2;
        }
        break;
    }
    
    primatom.targetX = targetX;
    primatom.targetY = targetY;
  }

  private identifyThreats(primatom: Primatom): Primatom[] {
    return this.state.primatoms.filter(other => 
      other.id !== primatom.id &&
      primatom.relationships[other.id] < 30 &&
      this.distance(primatom, other) < 100 &&
      other.behaviorType === 'leader' && primatom.behaviorType === 'leader'
    );
  }

  private identifyOpportunities(primatom: Primatom): Primatom[] {
    return this.state.primatoms.filter(other => 
      other.id !== primatom.id &&
      !primatom.relationships[other.id] &&
      this.distance(primatom, other) < 150 &&
      this.getBehaviorCompatibility(primatom.behaviorType, other.behaviorType) > 70
    ).sort((a, b) => this.distance(primatom, a) - this.distance(primatom, b));
  }

  private getBehaviorCompatibility(type1: Primatom['behaviorType'], type2: Primatom['behaviorType']): number {
    const compatibilityMatrix: Record<string, Record<string, number>> = {
      leader: { leader: 25, follower: 85, innovator: 65, mediator: 75, explorer: 55 },
      follower: { leader: 85, follower: 70, innovator: 50, mediator: 80, explorer: 60 },
      innovator: { leader: 65, follower: 50, innovator: 80, mediator: 70, explorer: 90 },
      mediator: { leader: 75, follower: 80, innovator: 70, mediator: 85, explorer: 65 },
      explorer: { leader: 55, follower: 60, innovator: 90, mediator: 65, explorer: 75 }
    };
    
    return compatibilityMatrix[type1][type2];
  }

  private distance(p1: Primatom, p2: Primatom): number {
    return Math.sqrt(Math.pow(p1.x - p2.x, 2) + Math.pow(p1.y - p2.y, 2));
  }

  private updateNetworkMetrics() {
    // Calcul de l'influence réseau de chaque primatom
    this.state.primatoms.forEach(primatom => {
      const connections = Object.values(primatom.relationships).filter(rel => rel > 50).length;
      const avgRelationQuality = Object.values(primatom.relationships).reduce((sum, rel) => sum + rel, 0) / Math.max(1, Object.keys(primatom.relationships).length);
      
      primatom.networkInfluence = (connections * 10) + (avgRelationQuality * 0.5);
      
      // Mise à jour de la charge cognitive
      const socialLoad = connections * 2;
      const coalitionLoad = primatom.coalition ? 15 : 0;
      const stressLoad = (primatom.stressLevel || 0) * 0.8;
      
      primatom.cognitiveLoad = Math.min(100, socialLoad + coalitionLoad + stressLoad);
    });
  }

  private updateAdvancedBehaviors() {
    this.state.primatoms.forEach(primatom => {
      const socialInfluence = this.calculateSocialInfluence(primatom);
      
      const adaptationRate = (primatom.adaptabilityScore || 50) / 2000;
      const stressFactor = 1 + (primatom.stressLevel || 0) * 0.008;
      const cognitiveLoadFactor = 1 - (primatom.cognitiveLoad || 0) * 0.003;
      
      // Intégration des influences culturelles Qloo
      this.applyCulturalInfluences(primatom);
      
      // Application des tendances culturelles
      this.applyTrendInfluences(primatom);
      
      primatom.trust += socialInfluence.trust * adaptationRate * stressFactor * cognitiveLoadFactor;
      primatom.cooperation += socialInfluence.cooperation * adaptationRate * cognitiveLoadFactor;
      primatom.innovation += socialInfluence.innovation * adaptationRate;
      
      // Évolution de l'alignement culturel
      primatom.culturalAlignment = this.calculateCulturalAlignment(primatom);
      
      // Mise à jour du potentiel d'innovation
      this.updateInnovationPotential(primatom);
      
      if (this.state.activeDisruptions && this.state.activeDisruptions.length > 0) {
        const disruptionIntensity = this.state.activeDisruptions.reduce((sum, d) => sum + d.intensity, 0) / this.state.activeDisruptions.length;
        primatom.stressLevel = Math.min(100, (primatom.stressLevel || 0) + disruptionIntensity * 0.3);
      } else {
        primatom.stressLevel = Math.max(0, (primatom.stressLevel || 0) - 0.5);
      }
      
      // Clamping des valeurs
      primatom.trust = Math.max(0, Math.min(100, primatom.trust));
      primatom.cooperation = Math.max(0, Math.min(100, primatom.cooperation));
      primatom.innovation = Math.max(0, Math.min(100, primatom.innovation));
      primatom.culturalAlignment = Math.max(0, Math.min(100, primatom.culturalAlignment));
      
      primatom.age += 0.05;
      if (Math.random() < 0.05) {
        primatom.memories.push(`Expérience-${Date.now()}`);
        if (primatom.memories.length > 15) {
          primatom.memories.shift();
        }
      }
    });
  }

  private calculateSocialInfluence(primatom: Primatom) {
    const nearbyPrimatoms = this.state.primatoms.filter(other => 
      other.id !== primatom.id && 
      this.distance(primatom, other) < primatom.socialRange
    );

    const influence = nearbyPrimatoms.reduce((acc, other) => {
      const relationStrength = primatom.relationships[other.id] || 0;
      const weight = (relationStrength / 100) * (other.influence || 50) / 100;
      
      return {
        trust: acc.trust + (other.trust - primatom.trust) * weight,
        cooperation: acc.cooperation + (other.cooperation - primatom.cooperation) * weight,
        innovation: acc.innovation + (other.innovation - primatom.innovation) * weight
      };
    }, { trust: 0, cooperation: 0, innovation: 0 });

    return influence;
  }

  private async applyCulturalInfluences(primatom: Primatom) {
    try {
      // Appliquer les influences culturelles basées sur les tendances Qloo
      const trends = await qlooService.getGlobalTrends();
      
      // Ajuster les comportements selon les tendances globales
      const culturalImpact = trends.global_sentiment.innovation_appetite / 1000;
      primatom.innovation += culturalImpact;
      
      const socialCohesionImpact = trends.global_sentiment.social_cohesion / 1000;
      primatom.cooperation += socialCohesionImpact;
      
      const optimismImpact = trends.global_sentiment.optimism / 1000;
      primatom.trust += optimismImpact;
      
    } catch (error) {
      // Silently fail if API is not available
    }
  }

  private applyTrendInfluences(primatom: Primatom) {
    this.culturalTrends.forEach(trend => {
      if (trend.affectedBehaviorTypes.includes(primatom.behaviorType)) {
        const influence = (trend.intensity / 100) * (trend.growthRate / 100) * 0.1;
        
        switch (trend.type) {
          case 'behavioral':
            primatom.adaptabilityScore = Math.min(100, (primatom.adaptabilityScore || 50) + influence);
            break;
          case 'social':
            primatom.cooperation += influence;
            break;
          case 'technological':
            primatom.innovation += influence;
            break;
          case 'cultural':
            primatom.culturalAlignment += influence * 2;
            break;
        }
      }
    });
  }

  private calculateCulturalAlignment(primatom: Primatom): number {
    const globalAvg = {
      trust: this.state.primatoms.reduce((sum, p) => sum + p.trust, 0) / this.state.primatoms.length,
      cooperation: this.state.primatoms.reduce((sum, p) => sum + p.cooperation, 0) / this.state.primatoms.length,
      innovation: this.state.primatoms.reduce((sum, p) => sum + p.innovation, 0) / this.state.primatoms.length
    };
    
    const alignment = 100 - (
      Math.abs(primatom.trust - globalAvg.trust) +
      Math.abs(primatom.cooperation - globalAvg.cooperation) +
      Math.abs(primatom.innovation - globalAvg.innovation)
    ) / 3;
    
    return Math.max(0, Math.min(100, alignment));
  }

  private updateInnovationPotential(primatom: Primatom) {
    const innovationInfluence = this.culturalTrends
      .filter(trend => trend.type === 'technological' && trend.affectedBehaviorTypes.includes(primatom.behaviorType))
      .reduce((sum, trend) => sum + trend.intensity, 0);
    
    primatom.innovationPotential = Math.min(100, primatom.innovationPotential + (innovationInfluence / 1000));
  }

  private updateTerritorialInfluence() {
    this.state.influenceZones = [];
    
    this.state.coalitions.forEach(coalition => {
      const members = this.state.primatoms.filter(p => p.coalition === coalition.id);
      if (members.length < 2) return;
      
      const centerX = members.reduce((sum, p) => sum + p.x, 0) / members.length;
      const centerY = members.reduce((sum, p) => sum + p.y, 0) / members.length;
      
      const baseRadius = Math.sqrt(members.length) * 30;
      const cohesionMultiplier = coalition.cohesion / 100;
      const radius = baseRadius * cohesionMultiplier;
      
      this.state.influenceZones.push({
        coalitionId: coalition.id,
        x: centerX,
        y: centerY,
        radius: radius,
        strength: coalition.cohesion,
        color: this.getCoalitionColor(coalition.id)
      });
    });
  }

  private getCoalitionColor(coalitionId: string): string {
    const colors = [
      '#06B6D4', '#8B5CF6', '#F59E0B', '#EF4444', '#10B981', 
      '#F97316', '#EC4899', '#6366F1', '#84CC16', '#F43F5E'
    ];
    const index = this.state.coalitions.findIndex(c => c.id === coalitionId);
    return colors[index % colors.length];
  }

  private updateRelationships() {
    this.state.primatoms.forEach(primatom => {
      const nearbyPrimatoms = this.state.primatoms.filter(other => 
        other.id !== primatom.id && 
        this.distance(primatom, other) < primatom.socialRange
      );

      nearbyPrimatoms.forEach(other => {
        const currentRelation = primatom.relationships[other.id] || 0;
        const trustDiff = Math.abs(primatom.trust - other.trust);
        const behaviorCompatibility = this.getBehaviorCompatibility(primatom.behaviorType, other.behaviorType);
        
        const stressImpact = (primatom.stressLevel || 0) * 0.01;
        const relationChange = (behaviorCompatibility - trustDiff * 0.1 - stressImpact) * 0.05;
        
        primatom.relationships[other.id] = Math.max(0, Math.min(100, currentRelation + relationChange));
      });
    });
  }

  private updateCoalitions() {
    const unalignedPrimatoms = this.state.primatoms.filter(p => !p.coalition);
    
    unalignedPrimatoms.forEach(primatom => {
      const potentialAllies = unalignedPrimatoms.filter(other => 
        other.id !== primatom.id && 
        primatom.relationships[other.id] > 65 &&
        this.distance(primatom, other) < 120
      );

      const disruptionBonus = this.state.activeDisruptions?.length > 0 ? 0.04 : 0;
      const leadershipBonus = primatom.behaviorType === 'leader' ? 0.03 : 0;
      const formationProbability = 0.02 + disruptionBonus + leadershipBonus;

      if (potentialAllies.length >= 2 && Math.random() < formationProbability) {
        const newCoalition: Coalition = {
          id: `coalition-${Date.now()}-${Math.random()}`,
          name: this.generateCoalitionName(),
          members: [primatom.id, ...potentialAllies.slice(0, 4).map(p => p.id)],
          leadership: primatom.id,
          cohesion: 60 + Math.random() * 25,
          goals: this.generateCoalitionGoals(),
          created: Date.now(),
          adaptationStrategies: this.generateAdaptationStrategies(),
          crisisResponse: this.determineCrisisResponse()
        };

        this.state.coalitions.push(newCoalition);
        newCoalition.members.forEach(memberId => {
          const member = this.state.primatoms.find(p => p.id === memberId);
          if (member) member.coalition = newCoalition.id;
        });
      }
    });

    this.state.coalitions.forEach(coalition => {
      const members = this.state.primatoms.filter(p => p.coalition === coalition.id);
      const avgTrust = members.reduce((sum, p) => sum + p.trust, 0) / members.length;
      const avgStress = members.reduce((sum, p) => sum + (p.stressLevel || 0), 0) / members.length;
      
      const avgDistance = this.calculateAverageInternalDistance(members);
      const proximityFactor = Math.max(0, 1 - avgDistance / 200);
      
      const stressImpact = avgStress * 0.015;
      const cohesionChange = (avgTrust - 50) * 0.01 + proximityFactor * 0.02 - stressImpact;
      
      coalition.cohesion = Math.max(0, Math.min(100, coalition.cohesion + cohesionChange));
      
      if (coalition.cohesion < 25) {
        members.forEach(member => member.coalition = undefined);
        this.state.coalitions = this.state.coalitions.filter(c => c.id !== coalition.id);
      }
    });
  }

  private generateCoalitionName(): string {
    const prefixes = ['Alliance', 'Pacte', 'Union', 'Cercle', 'Ligue', 'Consortium'];
    const suffixes = ['Progressiste', 'Stratégique', 'Innovante', 'Harmonieuse', 'Résiliente', 'Adaptative'];
    
    const prefix = prefixes[Math.floor(Math.random() * prefixes.length)];
    const suffix = suffixes[Math.floor(Math.random() * suffixes.length)];
    
    return `${prefix} ${suffix}`;
  }

  private calculateAverageInternalDistance(members: Primatom[]): number {
    if (members.length < 2) return 0;
    
    let totalDistance = 0;
    let pairCount = 0;
    
    for (let i = 0; i < members.length; i++) {
      for (let j = i + 1; j < members.length; j++) {
        totalDistance += this.distance(members[i], members[j]);
        pairCount++;
      }
    }
    
    return totalDistance / pairCount;
  }

  private calculateAdvancedMetrics(): AdvancedMetrics {
    const avgTrust = this.state.primatoms.reduce((sum, p) => sum + p.trust, 0) / this.state.primatoms.length;
    const avgCooperation = this.state.primatoms.reduce((sum, p) => sum + p.cooperation, 0) / this.state.primatoms.length;
    const avgInnovation = this.state.primatoms.reduce((sum, p) => sum + p.innovation, 0) / this.state.primatoms.length;
    
    const coalitionStrength = this.state.coalitions.reduce((sum, c) => sum + c.cohesion, 0) / Math.max(1, this.state.coalitions.length);
    const culturalStability = this.calculateCulturalStability();
    const resilience = this.calculateResilience();
    
    const disruptionLevel = this.calculateDisruptionLevel();
    const emergentBehaviors = this.countEmergentBehaviors();

    const newMetric: AdvancedMetrics = {
      timestamp: Date.now(),
      trustNetwork: avgTrust,
      cooperation: avgCooperation,
      innovation: avgInnovation,
      governance: coalitionStrength,
      resilience: resilience,
      culturalStability: culturalStability,
      disruptionLevel: disruptionLevel,
      emergentBehaviors: emergentBehaviors,
      collectiveIntelligence: this.calculateCollectiveIntelligence(),
      emergenceIndex: this.calculateEmergenceIndex(),
      culturalVelocity: this.calculateCulturalVelocity(),
      socialCoherence: this.calculateSocialCoherence(),
      stabilityTrend: this.determineStabilityTrend(),
      coalitionFormationRate: this.calculateCoalitionFormationRate(),
      innovationMomentum: this.calculateInnovationMomentum(),
      adaptabilityScore: this.calculateAdaptabilityScore(),
      networkDensity: this.calculateNetworkDensity(),
      influenceDistribution: this.calculateInfluenceDistribution(),
      communicationEfficiency: this.calculateCommunicationEfficiency(),
      trustPropagation: this.calculateTrustPropagation(),
      culturalSynchronization: this.calculateCulturalSynchronization(),
      behavioralComplexity: this.calculateBehavioralComplexity(),
      systemResilience: this.calculateSystemResilience(),
      evolutionaryPressure: this.calculateEvolutionaryPressure()
    };

    this.state.metrics.push(newMetric);
    this.metricsHistory.push(newMetric);
    
    if (this.state.metrics.length > 200) {
      this.state.metrics.shift();
    }

    return newMetric;
  }

  private updateAdvancedMetrics() {
    const newMetric = this.calculateAdvancedMetrics();
    this.culturalEvolutionTracker.get('trust')!.push(newMetric.trustNetwork);
    this.culturalEvolutionTracker.get('cooperation')!.push(newMetric.cooperation);
    this.culturalEvolutionTracker.get('innovation')!.push(newMetric.innovation);
    this.culturalEvolutionTracker.get('adaptability')!.push(newMetric.adaptabilityScore);
    this.culturalEvolutionTracker.get('influence')!.push(newMetric.influenceDistribution);
  }

  private processAdvancedGovernance() {
    const leaders = this.state.primatoms.filter(p => p.behaviorType === 'leader');
    const strongCoalitions = this.state.coalitions.filter(c => c.cohesion > 75);
    
    const adaptiveNormProbability = this.state.activeDisruptions?.length > 0 ? 0.08 : 0.03;
    
    if (strongCoalitions.length > 0 && Math.random() < adaptiveNormProbability) {
      const newKnowledge = `Norme-Adaptative-${Date.now()}-${Math.random()}`;
      this.state.globalKnowledge.push(newKnowledge);
      
      strongCoalitions.forEach(coalition => {
        const members = this.state.primatoms.filter(p => p.coalition === coalition.id);
        members.forEach(member => {
          if (Math.random() < 0.6) {
            member.culturalNorms.push(newKnowledge);
            member.culturalContributions.push(`Contribution-${Date.now()}`);
          }
        });
      });
    }
  }

  private updateCulturalEvolution() {
    this.culturalTrends = this.culturalTrends.filter(trend => 
      Date.now() < trend.predictedPeak && trend.intensity > 10
    );

    this.culturalTrends.forEach(trend => {
      trend.intensity += trend.growthRate * 0.1;
      trend.intensity = Math.max(0, Math.min(100, trend.intensity));
    });
  }

  private updateSystemStability() {
    const avgTrust = this.state.primatoms.reduce((sum, p) => sum + p.trust, 0) / this.state.primatoms.length;
    const avgStress = this.state.primatoms.reduce((sum, p) => sum + (p.stressLevel || 0), 0) / this.state.primatoms.length;
    const coalitionStability = this.state.coalitions.reduce((sum, c) => sum + c.cohesion, 0) / Math.max(1, this.state.coalitions.length);
    
    const disruptionImpact = this.state.activeDisruptions?.reduce((sum, d) => sum + d.intensity, 0) || 0;
    const territorialStability = 100 - (this.calculateTerritorialOverlap() * 100);
    
    this.state.systemStability = Math.max(0, Math.min(100, 
      (avgTrust * 0.3 + coalitionStability * 0.3 + territorialStability * 0.2 + (100 - avgStress) * 0.2) - disruptionImpact * 0.2
    ));
  }

  private processGenerationalEvolution() {
    this.state.generation++;
    
    this.state.primatoms.forEach(primatom => {
      if (primatom.memories.length > 8) {
        primatom.adaptabilityScore = Math.min(100, (primatom.adaptabilityScore || 50) + 1.5);
        primatom.socialIntelligence = Math.min(100, primatom.socialIntelligence + 1);
      }
    });
  }

  private calculateCollectiveIntelligence(): number {
    const avgInnovation = this.state.primatoms.reduce((sum, p) => sum + p.innovation, 0) / this.state.primatoms.length;
    const networkDensity = this.calculateNetworkDensity();
    return Math.min(100, (avgInnovation * 0.6 + networkDensity * 0.4));
  }

  private calculateEmergenceIndex(): number {
    return this.emergentPhenomena.length * 20;
  }

  private calculateCulturalVelocity(): number {
    const recentTrends = this.culturalTrends.filter(t => Date.now() - t.emergenceTimestamp < 30000);
    return recentTrends.reduce((sum, t) => sum + t.growthRate, 0) / Math.max(1, recentTrends.length);
  }

  private calculateSocialCoherence(): number {
    const avgCulturalAlignment = this.state.primatoms.reduce((sum, p) => sum + p.culturalAlignment, 0) / this.state.primatoms.length;
    return avgCulturalAlignment;
  }

  private determineStabilityTrend(): 'rising' | 'stable' | 'declining' | 'volatile' {
    const recentMetrics = this.metricsHistory.slice(-10);
    if (recentMetrics.length < 3) return 'stable';
    
    const stabilityValues = recentMetrics.map(m => m.resilience);
    const trend = this.calculateTrend(stabilityValues);
    
    if (Math.abs(trend) < 2) return 'stable';
    if (trend > 5) return 'rising';
    if (trend < -5) return 'declining';
    return 'volatile';
  }

  private calculateCoalitionFormationRate(): number {
    const recentCoalitions = this.state.coalitions.filter(c => Date.now() - c.created < 60000).length;
    return recentCoalitions / 60;
  }

  private calculateInnovationMomentum(): number {
    const innovators = this.state.primatoms.filter(p => p.behaviorType === 'innovator');
    return innovators.reduce((sum, p) => sum + p.innovationPotential, 0) / Math.max(1, innovators.length);
  }

  private calculateAdaptabilityScore(): number {
    return this.state.primatoms.reduce((sum, p) => sum + (p.adaptabilityScore || 50), 0) / this.state.primatoms.length;
  }

  private calculateNetworkDensity(): number {
    const totalConnections = this.state.primatoms.reduce((sum, p) => 
      sum + Object.values(p.relationships).filter(rel => rel > 50).length, 0) / 2;
    const maxPossibleConnections = (this.state.primatoms.length * (this.state.primatoms.length - 1)) / 2;
    return (totalConnections / Math.max(1, maxPossibleConnections)) * 100;
  }

  private calculateInfluenceDistribution(): number {
    const influences = this.state.primatoms.map(p => p.networkInfluence);
    const avg = influences.reduce((sum, val) => sum + val, 0) / influences.length;
    const variance = influences.reduce((sum, val) => sum + Math.pow(val - avg, 2), 0) / influences.length;
    return Math.sqrt(variance);
  }

  private calculateCommunicationEfficiency(): number {
    const avgSocialRange = this.state.primatoms.reduce((sum, p) => sum + p.socialRange, 0) / this.state.primatoms.length;
    return Math.min(100, avgSocialRange / 2);
  }

  private calculateTrustPropagation(): number {
    const trustValues = this.state.primatoms.map(p => p.trust);
    const avgTrust = trustValues.reduce((sum, val) => sum + val, 0) / trustValues.length;
    const variance = trustValues.reduce((sum, val) => sum + Math.pow(val - avgTrust, 2), 0) / trustValues.length;
    return 100 - Math.sqrt(variance);
  }

  private calculateCulturalSynchronization(): number {
    return this.state.primatoms.reduce((sum, p) => sum + p.culturalAlignment, 0) / this.state.primatoms.length;
  }

  private calculateBehavioralComplexity(): number {
    const uniqueBehaviors = new Set(this.state.primatoms.map(p => p.behaviorType)).size;
    return uniqueBehaviors * 20;
  }

  private calculateSystemResilience(): number {
    return (this.state.systemStability + this.calculateResilience()) / 2;
  }

  private calculateEvolutionaryPressure(): number {
    const disruptionImpact = this.calculateDisruptionLevel();
    const adaptability = this.calculateAdaptabilityScore();
    return Math.min(100, disruptionImpact * 0.6 + (100 - adaptability) * 0.4);
  }

  private calculateDisruptionLevel(): number {
    if (!this.state.activeDisruptions || this.state.activeDisruptions.length === 0) return 0;
    
    return this.state.activeDisruptions.reduce((sum, d) => sum + d.intensity, 0) / this.state.activeDisruptions.length;
  }

  private countEmergentBehaviors(): number {
    return this.emergentPhenomena.length;
  }

  private generateAdaptationStrategies(): string[] {
    const strategies = [
      'Redistribution Équitable des Ressources',
      'Formation de Sous-Groupes Spécialisés',
      'Développement de Compétences Hybrides',
      'Renforcement des Liens Inter-Coalitions',
      'Innovation Collaborative Accélérée',
      'Médiation Préventive Systémique',
      'Exploration Territoriale Coordonnée',
      'Partage de Connaissances Transgénérationnel'
    ];
    
    return strategies.sort(() => Math.random() - 0.5).slice(0, 3 + Math.floor(Math.random() * 2));
  }

  private determineCrisisResponse(): 'cooperative' | 'competitive' | 'isolationist' {
    const responses: ('cooperative' | 'competitive' | 'isolationist')[] = ['cooperative', 'competitive', 'isolationist'];
    return responses[Math.floor(Math.random() * responses.length)];
  }

  private calculateCulturalStability(): number {
    const totalNorms = this.state.primatoms.reduce((sum, p) => sum + p.culturalNorms.length, 0);
    const avgNormsPerPrimatom = totalNorms / this.state.primatoms.length;
    return Math.min(100, avgNormsPerPrimatom * 8);
  }

  private calculateResilience(): number {
    const avgEnergy = this.state.primatoms.reduce((sum, p) => sum + p.energy, 0) / this.state.primatoms.length;
    const coalitionCoverage = this.state.primatoms.filter(p => p.coalition).length / this.state.primatoms.length;
    const adaptabilityFactor = this.state.primatoms.reduce((sum, p) => sum + (p.adaptabilityScore || 50), 0) / this.state.primatoms.length;
    
    return (avgEnergy + coalitionCoverage * 100 + adaptabilityFactor) / 3;
  }

  private generateCoalitionGoals(): string[] {
    const possibleGoals = [
      "Optimisation Collective des Ressources",
      "Innovation Technologique Disruptive",
      "Stabilité Sociale Durable",
      "Exploration Territoriale Stratégique",
      "Renforcement des Liens Inter-Communautaires",
      "Résolution Pacifique des Conflits",
      "Préservation Culturelle Adaptative",
      "Résilience Face aux Crises Systémiques",
      "Collaboration Inter-Coalitions",
      "Développement Durable Intégré"
    ];
    
    return possibleGoals
      .sort(() => Math.random() - 0.5)
      .slice(0, 3 + Math.floor(Math.random() * 2));
  }

  private createPopulationSnapshot(): any {
    return {
      avgTrust: this.state.primatoms.reduce((sum, p) => sum + p.trust, 0) / this.state.primatoms.length,
      avgCooperation: this.state.primatoms.reduce((sum, p) => sum + p.cooperation, 0) / this.state.primatoms.length,
      avgInnovation: this.state.primatoms.reduce((sum, p) => sum + p.innovation, 0) / this.state.primatoms.length,
      coalitionCount: this.state.coalitions.length,
      activePhenomena: this.emergentPhenomena.length
    };
  }

  setBehaviorDistribution(distribution: Record<string, number>) {
    // Normaliser la distribution pour qu'elle totalise 1
    const total = Object.values(distribution).reduce((sum, val) => sum + val, 0);
    let normalizedDistribution: Record<string, number> = {};
    
    if (total > 0) {
      Object.entries(distribution).forEach(([key, value]) => {
        normalizedDistribution[key] = value / total;
      });
    } else {
      // Distribution par défaut si total = 0
      normalizedDistribution = {
        leader: 0.08,
        innovator: 0.15,
        mediator: 0.12,
        explorer: 0.20,
        follower: 0.45
      };
    }
    
    this.stop();
    
    // Recalculer la distribution
    this.behaviorDistribution = normalizedDistribution;
    
    // Régénérer les Primatoms avec la nouvelle distribution
    const primatoms: Primatom[] = [];
    let currentId = 0;
    
    Object.entries(this.behaviorDistribution).forEach(([behaviorType, ratio]) => {
      const count = Math.floor(this.populationSize * ratio);
      
      for (let i = 0; i < count; i++) {
        const primatom = this.createAdvancedPrimatom(currentId++, behaviorType as Primatom['behaviorType']);
        primatoms.push(primatom);
      }
    });
    
    this.initializeClusterPositions(primatoms);
    this.state.primatoms = primatoms;
    this.state.coalitions = [];
    this.state.metrics = [];
    this.state.generation = 1;
    this.state.globalKnowledge = [];
    this.state.activeDisruptions = [];
    this.state.emergentPhenomena = [];
    this.state.culturalTrends = [];
    this.state.aiInsights = [];
    this.state.systemStability = 75;
    this.state.influenceZones = [];
    this.culturalTrends = [];
    this.emergentPhenomena = [];
    this.predictiveInsights = [];
    this.aiPredictionCache.clear();
    this.culturalEvolutionTracker.clear();
    this.initializeAdvancedSystems();
  }

  setPopulationSize(size: number) {
    if (size < 50 || size > 500) {
      throw new Error('La taille de population doit être entre 50 et 500');
    }
    
    this.populationSize = size;
    this.stop();
    this.state = this.initializeState();
    this.culturalTrends = [];
    this.emergentPhenomena = [];
    this.predictiveInsights = [];
    this.aiPredictionCache.clear();
    this.culturalEvolutionTracker.clear();
    this.initializeAdvancedSystems();
  }

  getState(): SimulationState {
    return { ...this.state };
  }

  resetSimulation() {
    this.stop();
    this.disruptionEngine = new DisruptionEngine();
    this.llmOrchestrator = new LLMOrchestrator();
    this.state = this.initializeState();
    this.metricsHistory = [];
    this.culturalTrends = [];
    this.emergentPhenomena = [];
    this.predictiveInsights = [];
    this.aiPredictionCache.clear();
    this.culturalEvolutionTracker.clear();
    this.initializeAdvancedSystems();
  }

  injectDisruptiveEvent(eventConfig: Partial<DisruptiveEvent>): DisruptiveEvent {
    return this.disruptionEngine.injectCustomEvent(eventConfig);
  }

  predictDisruptionImpact(eventConfig: Partial<DisruptiveEvent>) {
    const event = this.disruptionEngine.injectCustomEvent(eventConfig);
    return this.disruptionEngine.predictEventImpact(event, this.state);
  }

  getDisruptionEngine(): DisruptionEngine {
    return this.disruptionEngine;
  }

  getPopulationSize(): number {
    return this.populationSize;
  }

  getCurrentBehaviorDistribution(): Record<string, number> {
    const distribution: Record<string, number> = {};
    const total = this.state.primatoms.length;
    
    ['leader', 'innovator', 'mediator', 'explorer', 'follower'].forEach(type => {
      const count = this.state.primatoms.filter(p => p.behaviorType === type).length;
      distribution[type] = count / total;
    });
    
    return distribution;
  }

  getMetricsHistory(): AdvancedMetrics[] {
    return [...this.metricsHistory];
  }
}