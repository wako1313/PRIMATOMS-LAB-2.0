export interface Primatom {
  id: string;
  name: string;
  x: number;
  y: number;
  targetX: number;
  targetY: number;
  energy: number;
  trust: number;
  innovation: number;
  cooperation: number;
  age: number;
  coalition?: string;
  memories: string[];
  relationships: Record<string, number>;
  behaviorType: 'leader' | 'follower' | 'innovator' | 'mediator' | 'explorer';
  culturalNorms: string[];
  adaptabilityScore?: number;
  stressLevel?: number;
  influence?: number;
  territoryRadius?: number;
  movementPattern?: 'territorial' | 'nomadic' | 'social' | 'strategic';
  socialRange?: number;
}

export interface Coalition {
  id: string;
  name: string;
  members: string[];
  leadership: string;
  cohesion: number;
  goals: string[];
  created: number;
  adaptationStrategies?: string[];
  crisisResponse?: 'cooperative' | 'competitive' | 'isolationist';
}

export interface SocialMetric {
  timestamp: number;
  trustNetwork: number;
  cooperation: number;
  innovation: number;
  governance: number;
  resilience: number;
  culturalStability: number;
  disruptionLevel?: number;
  emergentBehaviors?: number;
}

export interface DisruptiveEvent {
  id: string;
  type: 'resource_scarcity' | 'environmental_change' | 'newcomer_arrival' | 'conflict_trigger' | 'innovation_catalyst' | 'governance_crisis';
  name: string;
  description: string;
  intensity: number;
  duration: number;
  targetGroup?: string;
  effects: {
    trustModifier: number;
    energyModifier: number;
    cooperationModifier: number;
    innovationModifier: number;
  };
  emergenceConditions: {
    minGeneration: number;
    requiredCoalitions: number;
    stabilityThreshold: number;
  };
  isActive: boolean;
  startTime: number;
}

export interface InfluenceZone {
  coalitionId: string;
  x: number;
  y: number;
  radius: number;
  strength: number;
  color: string;
}

export interface Scenario {
  id: string;
  name: string;
  description: string;
  duration: number;
  objectives: string[];
  challenges: string[];
  isActive: boolean;
  disruptiveEvents?: DisruptiveEvent[];
  expectedOutcomes?: string[];
}

export interface SimulationState {
  primatoms: Primatom[];
  coalitions: Coalition[];
  metrics: SocialMetric[];
  currentScenario: Scenario | null;
  isRunning: boolean;
  generation: number;
  globalKnowledge: string[];
  activeDisruptions?: DisruptiveEvent[];
  emergentPhenomena?: string[];
  systemStability?: number;
  territoryMap?: Map<string, any>;
  influenceZones?: InfluenceZone[];
}

export interface CognitiveDisruptionAnalysis {
  disruptionIntensity: number;
  adaptationPatterns: string[];
  emergentBehaviors: string[];
  resilientStrategies: string[];
  vulnerabilityPoints: string[];
  innovationCatalysts: string[];
}

export interface BehaviorDistribution {
  leader: number;
  innovator: number;
  mediator: number;
  explorer: number;
  follower: number;
}