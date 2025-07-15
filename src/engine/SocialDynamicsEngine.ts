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

export class SocialDynamicsEngine {
  private state: SimulationState;
  private updateInterval: number | null = null;
  private disruptionEngine: DisruptionEngine;
  private llmOrchestrator: LLMOrchestrator;
  private populationSize: number = 200;
  private movementSpeed: number = 0.3;
  private metricsHistory: AdvancedMetrics[] = [];
  private behaviorDistribution: BehaviorDistribution;

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
  }

  private initializeState(): SimulationState {
    const primatoms: Primatom[] = [];
    
    let currentId = 0;
    Object.entries(this.behaviorDistribution).forEach(([behaviorType, ratio]) => {
      const count = Math.floor(this.populationSize * ratio);
      
      for (let i = 0; i < count; i++) {
        const primatom = this.createPrimatom(currentId++, behaviorType as Primatom['behaviorType']);
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
      influenceZones: []
    };
  }

  private createPrimatom(id: number, behaviorType: Primatom['behaviorType']): Primatom {
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
      socialRange: baseStats.socialRange
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
  }

  stop() {
    if (!this.state.isRunning) return;
    
    this.state.isRunning = false;
    if (this.updateInterval) {
      clearInterval(this.updateInterval);
      this.updateInterval = null;
    }
  }

  private update() {
    this.updateStrategicMovements();
    
    const newDisruptions = this.disruptionEngine.evaluateDisruptionTriggers(this.state);
    this.state.activeDisruptions = this.disruptionEngine.getActiveEvents();

    this.disruptionEngine.applyDisruptiveEffects(this.state.primatoms, this.state.coalitions);

    this.updateRelationships();
    this.updateCoalitions();
    this.updateTerritorialInfluence();
    this.updateBehaviors();
    
    if (Date.now() % 1000 < 100) {
      this.updateAdvancedMetrics();
      this.processGovernance();
      this.detectEmergentPhenomena();
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

  setBehaviorDistribution(distribution: BehaviorDistribution) {
    // Normaliser la distribution pour qu'elle totalise 1
    const total = Object.values(distribution).reduce((sum, val) => sum + val, 0);
    let normalizedDistribution: BehaviorDistribution;
    
    if (total > 0) {
      normalizedDistribution = {
        leader: distribution.leader / total,
        innovator: distribution.innovator / total,
        mediator: distribution.mediator / total,
        explorer: distribution.explorer / total,
        follower: distribution.follower / total
      };
    } else {
      normalizedDistribution = {
        leader: 0.08,
        innovator: 0.15,
        mediator: 0.12,
        explorer: 0.20,
        follower: 0.45
      };
    }
    
    this.behaviorDistribution = normalizedDistribution;
    this.stop();
    
    // Régénérer les Primatoms avec la nouvelle distribution
    const primatoms: Primatom[] = [];
    let currentId = 0;
    
    Object.entries(normalizedDistribution).forEach(([behaviorType, ratio]) => {
      const count = Math.floor(this.populationSize * ratio);
      
      for (let i = 0; i < count; i++) {
        const primatom = this.createPrimatom(currentId++, behaviorType as Primatom['behaviorType']);
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
    this.state.systemStability = 75;
    this.state.influenceZones = [];
  }

  setPopulationSize(size: number) {
    if (size < 50 || size > 500) {
      throw new Error('La taille de population doit être entre 50 et 500');
    }
    
    this.populationSize = size;
    this.stop();
    this.state = this.initializeState();
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

  private distance(p1: Primatom, p2: Primatom): number {
    return Math.sqrt(Math.pow(p1.x - p2.x, 2) + Math.pow(p1.y - p2.y, 2));
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

  private updateBehaviors() {
    this.state.primatoms.forEach(primatom => {
      const socialInfluence = this.calculateSocialInfluence(primatom);
      
      const adaptationRate = (primatom.adaptabilityScore || 50) / 2000;
      const stressFactor = 1 + (primatom.stressLevel || 0) * 0.008;
      
      // Intégration des influences culturelles Qloo
      this.applyCulturalInfluences(primatom);
      
      primatom.trust += socialInfluence.trust * adaptationRate * stressFactor;
      primatom.cooperation += socialInfluence.cooperation * adaptationRate;
      primatom.innovation += socialInfluence.innovation * adaptationRate;
      
      if (this.state.activeDisruptions && this.state.activeDisruptions.length > 0) {
        const disruptionIntensity = this.state.activeDisruptions.reduce((sum, d) => sum + d.intensity, 0) / this.state.activeDisruptions.length;
        primatom.stressLevel = Math.min(100, (primatom.stressLevel || 0) + disruptionIntensity * 0.3);
      } else {
        primatom.stressLevel = Math.max(0, (primatom.stressLevel || 0) - 0.5);
      }
      
      primatom.trust = Math.max(0, Math.min(100, primatom.trust));
      primatom.cooperation = Math.max(0, Math.min(100, primatom.cooperation));
      primatom.innovation = Math.max(0, Math.min(100, primatom.innovation));
      
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
      const culturalImpact = trends.global_sentiment.innovation_appetite / 1000; // Facteur d'influence subtil
      primatom.innovation += culturalImpact;
      
      const socialCohesionImpact = trends.global_sentiment.social_cohesion / 1000;
      primatom.cooperation += socialCohesionImpact;
      
      const optimismImpact = trends.global_sentiment.optimism / 1000;
      primatom.trust += optimismImpact;
      
    } catch (error) {
      // Silently fail if API is not available
    }
  }

  private updateAdvancedMetrics() {
    const avgTrust = this.state.primatoms.reduce((sum, p) => sum + p.trust, 0) / this.state.primatoms.length;
    const avgCooperation = this.state.primatoms.reduce((sum, p) => sum + p.cooperation, 0) / this.state.primatoms.length;
    const avgInnovation = this.state.primatoms.reduce((sum, p) => sum + p.innovation, 0) / this.state.primatoms.length;
    
    const coalitionStrength = this.state.coalitions.reduce((sum, c) => sum + c.cohesion, 0) / Math.max(1, this.state.coalitions.length);
    const culturalStability = this.calculateCulturalStability();
    const resilience = this.calculateResilience();
    
    const disruptionLevel = this.calculateDisruptionLevel();
    const emergentBehaviors = this.countEmergentBehaviors();

    // Calculs des métriques avancées
    const collectiveIntelligence = this.calculateCollectiveIntelligence();
    const emergenceIndex = this.calculateEmergenceIndex();
    const culturalVelocity = this.calculateCulturalVelocity();
    const socialCoherence = this.calculateSocialCoherence();
    const stabilityTrend = this.calculateStabilityTrend();
    const networkDensity = this.calculateNetworkDensity();

    const newMetric: AdvancedMetrics = {
      timestamp: Date.now(),
      trustNetwork: avgTrust,
      cooperation: avgCooperation,
      innovation: avgInnovation,
      governance: coalitionStrength,
      resilience: resilience,
      culturalStability: culturalStability,
      disruptionLevel