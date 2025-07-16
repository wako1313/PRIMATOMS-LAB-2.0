import { Primatom, Coalition, DisruptiveEvent, SimulationState } from '../types';

export interface DisruptiveEvent {
  id: string;
  type: 'resource_scarcity' | 'environmental_change' | 'newcomer_arrival' | 'conflict_trigger' | 'innovation_catalyst' | 'governance_crisis';
  name: string;
  description: string;
  intensity: number; // 1-10
  duration: number; // en cycles de simulation
  targetGroup?: string; // coalition ou comportement spécifique
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

export class DisruptionEngine {
  private events: DisruptiveEvent[] = [];
  private activeEvents: DisruptiveEvent[] = [];
  private eventHistory: DisruptiveEvent[] = [];

  constructor() {
    this.loadStateFromSession();
    this.initializePredefinedEvents();
    this.saveStateToSession();
  }

  private initializePredefinedEvents(): void {
    this.events = [
      {
        id: 'resource-crisis-alpha',
        type: 'resource_scarcity',
        name: 'Crise des Ressources Énergétiques',
        description: 'Réduction drastique des ressources disponibles - test de solidarité collective',
        intensity: 7,
        duration: 50,
        effects: {
          trustModifier: -0.3,
          energyModifier: -0.5,
          cooperationModifier: 0.2,
          innovationModifier: 0.4
        },
        emergenceConditions: {
          minGeneration: 5,
          requiredCoalitions: 2,
          stabilityThreshold: 60
        },
        isActive: false,
        startTime: 0
      },
      {
        id: 'newcomer-integration-beta',
        type: 'newcomer_arrival',
        name: 'Arrivée de Nouveaux Primatoms',
        description: 'Intégration de 10 nouveaux individus avec comportements divergents',
        intensity: 5,
        duration: 30,
        effects: {
          trustModifier: -0.1,
          energyModifier: 0.1,
          cooperationModifier: -0.2,
          innovationModifier: 0.3
        },
        emergenceConditions: {
          minGeneration: 3,
          requiredCoalitions: 1,
          stabilityThreshold: 70
        },
        isActive: false,
        startTime: 0
      },
      {
        id: 'innovation-catalyst-gamma',
        type: 'innovation_catalyst',
        name: 'Découverte Technologique Majeure',
        description: 'Émergence d\'une innovation révolutionnaire nécessitant collaboration',
        intensity: 8,
        duration: 40,
        effects: {
          trustModifier: 0.2,
          energyModifier: 0.3,
          cooperationModifier: 0.4,
          innovationModifier: 0.6
        },
        emergenceConditions: {
          minGeneration: 8,
          requiredCoalitions: 3,
          stabilityThreshold: 80
        },
        isActive: false,
        startTime: 0
      },
      {
        id: 'governance-crisis-delta',
        type: 'governance_crisis',
        name: 'Crise de Légitimité Gouvernementale',
        description: 'Remise en question des structures de pouvoir établies',
        intensity: 9,
        duration: 60,
        effects: {
          trustModifier: -0.4,
          energyModifier: -0.2,
          cooperationModifier: -0.3,
          innovationModifier: 0.5
        },
        emergenceConditions: {
          minGeneration: 12,
          requiredCoalitions: 4,
          stabilityThreshold: 50
        },
        isActive: false,
        startTime: 0
      },
      {
        id: 'environmental-shift-epsilon',
        type: 'environmental_change',
        name: 'Mutation Environnementale Critique',
        description: 'Changement radical des conditions de survie - adaptation forcée',
        intensity: 10,
        duration: 80,
        effects: {
          trustModifier: 0.1,
          energyModifier: -0.6,
          cooperationModifier: 0.5,
          innovationModifier: 0.7
        },
        emergenceConditions: {
          minGeneration: 15,
          requiredCoalitions: 5,
          stabilityThreshold: 40
        },
        isActive: false,
        startTime: 0
      }
    ];
  }

  private loadStateFromSession(): void {
    const savedState = sessionStorage.getItem('disruptionEngineState');
    if (savedState) {
      const { activeEvents, eventHistory } = JSON.parse(savedState);
      this.activeEvents = activeEvents.map((e: any) => ({ ...e, effects: { ...e.effects }, emergenceConditions: { ...e.emergenceConditions } }));
      this.eventHistory = eventHistory.map((e: any) => ({ ...e, effects: { ...e.effects }, emergenceConditions: { ...e.emergenceConditions } }));
    }
  }

  private saveStateToSession(): void {
    const state = {
      activeEvents: this.activeEvents,
      eventHistory: this.eventHistory
    };
    sessionStorage.setItem('disruptionEngineState', JSON.stringify(state));
  }

  evaluateDisruptionTriggers(state: SimulationState): DisruptiveEvent[] {
    const triggeredEvents: DisruptiveEvent[] = [];
    
    this.events.forEach(event => {
      if (this.shouldTriggerEvent(event, state)) {
        const activatedEvent = { ...event, isActive: true, startTime: Date.now() };
        triggeredEvents.push(activatedEvent);
        this.activeEvents.push(activatedEvent);
        this.events = this.events.filter(e => e.id !== event.id);
      }
    });

    this.saveStateToSession();
    return triggeredEvents;
  }

  private shouldTriggerEvent(event: DisruptiveEvent, state: SimulationState): boolean {
    if (state.generation < event.emergenceConditions.minGeneration) return false;
    if (state.coalitions.length < event.emergenceConditions.requiredCoalitions) return false;
    
    const avgStability = this.calculateSystemStability(state);
    if (avgStability < event.emergenceConditions.stabilityThreshold) return false;

    const activationProbability = this.calculateActivationProbability(event, state);
    return Math.random() < activationProbability;
  }

  private calculateSystemStability(state: SimulationState): number {
    const avgTrust = state.primatoms.reduce((sum, p) => sum + p.trust, 0) / Math.max(1, state.primatoms.length);
    const avgCooperation = state.primatoms.reduce((sum, p) => sum + p.cooperation, 0) / Math.max(1, state.primatoms.length);
    const coalitionStability = state.coalitions.reduce((sum, c) => sum + c.cohesion, 0) / Math.max(1, state.coalitions.length);
    
    return (avgTrust + avgCooperation + coalitionStability) / 3;
  }

  private calculateActivationProbability(event: DisruptiveEvent, state: SimulationState): number {
    let probability = 0.02 / event.intensity;
    
    if (state.generation > event.emergenceConditions.minGeneration + 5) {
      probability *= 1.5;
    }
    
    if (state.coalitions.length > event.emergenceConditions.requiredCoalitions + 2) {
      probability *= 1.3;
    }

    return Math.min(0.1, probability);
  }

  applyDisruptiveEffects(primatoms: Primatom[], coalitions: Coalition[]): void {
    this.activeEvents.forEach(event => {
      const updatedEvent = { ...event };
      this.applyEventEffects(updatedEvent, primatoms, coalitions);
      
      updatedEvent.duration--;
      if (updatedEvent.duration <= 0) {
        updatedEvent.isActive = false;
        this.eventHistory.push({ ...updatedEvent });
        this.activeEvents = this.activeEvents.filter(e => e.id !== updatedEvent.id);
      } else {
        this.activeEvents = this.activeEvents.map(e => e.id === updatedEvent.id ? updatedEvent : e);
      }
    });

    this.saveStateToSession();
  }

  private applyEventEffects(event: DisruptiveEvent, primatoms: Primatom[], coalitions: Coalition[]): void {
    const intensityFactor = event.intensity / 10;
    
    primatoms.forEach(primatom => {
      const variance = 0.2;
      primatom.trust += (event.effects.trustModifier * intensityFactor) * (1 + (Math.random() - 0.5) * variance);
      primatom.energy += (event.effects.energyModifier * intensityFactor) * (1 + (Math.random() - 0.5) * variance);
      primatom.cooperation += (event.effects.cooperationModifier * intensityFactor) * (1 + (Math.random() - 0.5) * variance);
      primatom.innovation += (event.effects.innovationModifier * intensityFactor) * (1 + (Math.random() - 0.5) * variance);
      
      primatom.trust = Math.max(0, Math.min(100, primatom.trust));
      primatom.energy = Math.max(0, Math.min(100, primatom.energy));
      primatom.cooperation = Math.max(0, Math.min(100, primatom.cooperation));
      primatom.innovation = Math.max(0, Math.min(100, primatom.innovation));
      
      if (Math.random() < 0.3) {
        primatom.memories.push(`Événement-${event.name}-${Date.now()}`);
      }
    });

    coalitions.forEach(coalition => {
      if (event.type === 'governance_crisis') {
        coalition.cohesion *= 0.8;
      } else if (event.type === 'innovation_catalyst') {
        coalition.cohesion *= 1.1;
      }
      coalition.cohesion = Math.max(0, Math.min(100, coalition.cohesion));
    });
  }

  getActiveEvents(): DisruptiveEvent[] {
    return [...this.activeEvents];
  }

  getEventHistory(): DisruptiveEvent[] {
    return [...this.eventHistory];
  }

  injectCustomEvent(eventConfig: Partial<DisruptiveEvent>): DisruptiveEvent {
    const customEvent: DisruptiveEvent = {
      id: `custom-${Date.now()}`,
      type: eventConfig.type || 'innovation_catalyst',
      name: eventConfig.name || 'Événement Personnalisé',
      description: eventConfig.description || 'Événement injecté manuellement',
      intensity: eventConfig.intensity || 5,
      duration: eventConfig.duration || 30,
      effects: eventConfig.effects || {
        trustModifier: 0,
        energyModifier: 0,
        cooperationModifier: 0,
        innovationModifier: 0
      },
      emergenceConditions: eventConfig.emergenceConditions || {
        minGeneration: 0,
        requiredCoalitions: 0,
        stabilityThreshold: 0
      },
      isActive: true,
      startTime: Date.now()
    };

    this.activeEvents.push(customEvent);
    this.saveStateToSession();
    return customEvent;
  }

  predictEventImpact(event: DisruptiveEvent, currentState: SimulationState): {
    trustImpact: number;
    cooperationImpact: number;
    innovationImpact: number;
    coalitionStabilityImpact: number;
    emergentBehaviorsProbability: number;
  } {
    const intensityFactor = event.intensity / 10;
    const populationSize = currentState.primatoms.length;
    
    return {
      trustImpact: event.effects.trustModifier * intensityFactor * populationSize,
      cooperationImpact: event.effects.cooperationModifier * intensityFactor * populationSize,
      innovationImpact: event.effects.innovationModifier * intensityFactor * populationSize,
      coalitionStabilityImpact: this.predictCoalitionImpact(event, currentState),
      emergentBehaviorsProbability: this.calculateEmergenceProbability(event, currentState)
    };
  }

  private predictCoalitionImpact(event: DisruptiveEvent, state: SimulationState): number {
    let impact = 0;
    
    switch (event.type) {
      case 'governance_crisis':
        impact = -20 * (event.intensity / 10);
        break;
      case 'innovation_catalyst':
        impact = 15 * (event.intensity / 10);
        break;
      case 'resource_scarcity':
        impact = state.coalitions.length > 3 ? 10 : -10;
        break;
      default:
        impact = 0;
    }
    
    return impact;
  }

  private calculateEmergenceProbability(event: DisruptiveEvent, state: SimulationState): number {
    let probability = event.intensity * 0.1;
    
    if (state.coalitions.length > 3) probability += 0.2;
    if (state.generation > 10) probability += 0.15;
    
    return Math.min(1, probability);
  }

  reset(): void {
    this.activeEvents = [];
    this.eventHistory = [];
    this.events = [];
    this.initializePredefinedEvents();
    sessionStorage.removeItem('disruptionEngineState');
  }
}