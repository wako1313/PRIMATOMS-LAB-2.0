import { Primatom, Coalition, SimulationState, DisruptiveEvent } from '../types';

export interface AnalysisEvent {
  id: string;
  timestamp: number;
  type: 'coalition_formation' | 'disruption_trigger' | 'behavior_shift' | 'innovation_emergence' | 'conflict_resolution' | 'cultural_evolution';
  severity: 'low' | 'medium' | 'high' | 'critical';
  description: string;
  affectedPrimatoms: string[];
  metrics: Record<string, number>;
  predictedImpact: {
    shortTerm: string;
    mediumTerm: string;
    longTerm: string;
  };
  recommendations: string[];
}

export interface SessionReport {
  sessionId: string;
  startTime: number;
  endTime: number;
  totalEvents: number;
  keyFindings: string[];
  emergentPatterns: string[];
  stabilityAnalysis: {
    initialStability: number;
    finalStability: number;
    volatilityPeriods: Array<{ start: number; end: number; cause: string }>;
  };
  coalitionEvolution: {
    formed: number;
    dissolved: number;
    merged: number;
    averageLifespan: number;
  };
  behavioralInsights: {
    dominantBehaviors: string[];
    adaptationPatterns: string[];
    innovationCatalysts: string[];
  };
  recommendations: string[];
  dataQuality: number;
  confidenceLevel: number;
}

export class PoliSynthCore {
  private events: AnalysisEvent[] = [];
  private sessionStartTime: number = Date.now();
  private disruptionQueue: DisruptiveEvent[] = [];
  private analysisBuffer: any[] = [];
  
  // Protocole anti-hallucination intégré
  private validateData(data: any, source: string): boolean {
    if (!data || typeof data !== 'object') return false;
    
    // Vérification de cohérence temporelle
    if (data.timestamp && (data.timestamp > Date.now() || data.timestamp < this.sessionStartTime)) {
      console.warn(`Données temporelles incohérentes détectées - Source: ${source}`);
      return false;
    }
    
    return true;
  }

  // Analyse contextuelle avancée
  analyzeSystemState(state: SimulationState): AnalysisEvent[] {
    const newEvents: AnalysisEvent[] = [];
    
    // Détection de formations de coalitions
    const recentCoalitions = state.coalitions.filter(c => 
      Date.now() - c.created < 10000 // Dernières 10 secondes
    );
    
    recentCoalitions.forEach(coalition => {
      const event: AnalysisEvent = {
        id: `coalition-${coalition.id}-${Date.now()}`,
        timestamp: Date.now(),
        type: 'coalition_formation',
        severity: coalition.members.length > 10 ? 'high' : 'medium',
        description: `Formation de la coalition "${coalition.name}" avec ${coalition.members.length} membres`,
        affectedPrimatoms: coalition.members,
        metrics: {
          cohesion: coalition.cohesion,
          memberCount: coalition.members.length,
          leadershipStrength: this.calculateLeadershipStrength(coalition, state.primatoms)
        },
        predictedImpact: this.predictCoalitionImpact(coalition, state),
        recommendations: this.generateCoalitionRecommendations(coalition, state)
      };
      
      if (this.validateData(event, 'coalition_analysis')) {
        newEvents.push(event);
      }
    });

    // Détection de changements comportementaux significatifs
    const behaviorShifts = this.detectBehaviorShifts(state);
    newEvents.push(...behaviorShifts);

    // Analyse des innovations émergentes
    const innovations = this.detectInnovationPatterns(state);
    newEvents.push(...innovations);

    this.events.push(...newEvents);
    return newEvents;
  }

  private calculateLeadershipStrength(coalition: Coalition, primatoms: Primatom[]): number {
    const leader = primatoms.find(p => p.id === coalition.leadership);
    if (!leader) return 0;
    
    const leaderInfluence = leader.influence || 50;
    const memberTrust = coalition.members.reduce((sum, memberId) => {
      const member = primatoms.find(p => p.id === memberId);
      return sum + (member?.trust || 0);
    }, 0) / coalition.members.length;
    
    return (leaderInfluence + memberTrust) / 2;
  }

  private predictCoalitionImpact(coalition: Coalition, state: SimulationState) {
    const memberCount = coalition.members.length;
    const cohesion = coalition.cohesion;
    
    return {
      shortTerm: memberCount > 8 ? 
        "Stabilisation locale et renforcement des liens internes" : 
        "Formation de micro-alliances tactiques",
      mediumTerm: cohesion > 75 ? 
        "Expansion territoriale et influence accrue sur les groupes voisins" : 
        "Consolidation interne et recherche d'équilibres",
      longTerm: memberCount > 15 && cohesion > 80 ? 
        "Émergence potentielle d'une super-structure sociale dominante" : 
        "Évolution vers spécialisation fonctionnelle ou fragmentation"
    };
  }

  private generateCoalitionRecommendations(coalition: Coalition, state: SimulationState): string[] {
    const recommendations: string[] = [];
    
    if (coalition.cohesion < 50) {
      recommendations.push("Surveiller les risques de fragmentation - Intervention de médiation recommandée");
    }
    
    if (coalition.members.length > 20) {
      recommendations.push("Coalition de grande taille détectée - Analyser les sous-groupes émergents");
    }
    
    const territorialOverlap = this.calculateTerritorialOverlap(coalition, state);
    if (territorialOverlap > 0.7) {
      recommendations.push("Forte superposition territoriale - Potentiel de conflit ou de fusion");
    }
    
    return recommendations;
  }

  private detectBehaviorShifts(state: SimulationState): AnalysisEvent[] {
    const events: AnalysisEvent[] = [];
    
    // Analyse des changements de stress collectif
    const avgStress = state.primatoms.reduce((sum, p) => sum + (p.stressLevel || 0), 0) / state.primatoms.length;
    
    if (avgStress > 60) {
      events.push({
        id: `stress-spike-${Date.now()}`,
        timestamp: Date.now(),
        type: 'behavior_shift',
        severity: avgStress > 80 ? 'critical' : 'high',
        description: `Pic de stress collectif détecté (${avgStress.toFixed(1)}%)`,
        affectedPrimatoms: state.primatoms.filter(p => (p.stressLevel || 0) > 70).map(p => p.id),
        metrics: { averageStress: avgStress, affectedCount: state.primatoms.filter(p => (p.stressLevel || 0) > 70).length },
        predictedImpact: {
          shortTerm: "Réduction de la coopération et augmentation des comportements défensifs",
          mediumTerm: "Possible fragmentation des coalitions existantes",
          longTerm: "Adaptation ou effondrement des structures sociales actuelles"
        },
        recommendations: [
          "Identifier les sources de stress primaires",
          "Activer les mécanismes de médiation",
          "Surveiller la stabilité des coalitions vulnérables"
        ]
      });
    }
    
    return events;
  }

  private detectInnovationPatterns(state: SimulationState): AnalysisEvent[] {
    const events: AnalysisEvent[] = [];
    
    const innovators = state.primatoms.filter(p => p.behaviorType === 'innovator');
    const avgInnovation = innovators.reduce((sum, p) => sum + p.innovation, 0) / Math.max(1, innovators.length);
    
    if (avgInnovation > 85 && innovators.length > 5) {
      events.push({
        id: `innovation-surge-${Date.now()}`,
        timestamp: Date.now(),
        type: 'innovation_emergence',
        severity: 'high',
        description: `Émergence d'un cluster d'innovation (${innovators.length} innovateurs actifs)`,
        affectedPrimatoms: innovators.map(p => p.id),
        metrics: { 
          innovationLevel: avgInnovation, 
          innovatorCount: innovators.length,
          networkDensity: this.calculateInnovatorNetworkDensity(innovators)
        },
        predictedImpact: {
          shortTerm: "Accélération des découvertes et solutions créatives",
          mediumTerm: "Diffusion des innovations vers les autres groupes comportementaux",
          longTerm: "Transformation structurelle des méthodes de résolution de problèmes"
        },
        recommendations: [
          "Faciliter les connexions entre innovateurs",
          "Protéger l'espace d'expérimentation",
          "Préparer l'intégration des innovations dans les structures existantes"
        ]
      });
    }
    
    return events;
  }

  private calculateInnovatorNetworkDensity(innovators: Primatom[]): number {
    if (innovators.length < 2) return 0;
    
    let connections = 0;
    const maxConnections = innovators.length * (innovators.length - 1) / 2;
    
    for (let i = 0; i < innovators.length; i++) {
      for (let j = i + 1; j < innovators.length; j++) {
        const relationship = innovators[i].relationships[innovators[j].id] || 0;
        if (relationship > 60) connections++;
      }
    }
    
    return connections / maxConnections;
  }

  private calculateTerritorialOverlap(coalition: Coalition, state: SimulationState): number {
    const members = state.primatoms.filter(p => coalition.members.includes(p.id));
    if (members.length === 0) return 0;
    
    const centerX = members.reduce((sum, p) => sum + p.x, 0) / members.length;
    const centerY = members.reduce((sum, p) => sum + p.y, 0) / members.length;
    const radius = Math.sqrt(members.length) * 40;
    
    let overlapCount = 0;
    state.coalitions.forEach(otherCoalition => {
      if (otherCoalition.id === coalition.id) return;
      
      const otherMembers = state.primatoms.filter(p => otherCoalition.members.includes(p.id));
      if (otherMembers.length === 0) return;
      
      const otherCenterX = otherMembers.reduce((sum, p) => sum + p.x, 0) / otherMembers.length;
      const otherCenterY = otherMembers.reduce((sum, p) => sum + p.y, 0) / otherMembers.length;
      const otherRadius = Math.sqrt(otherMembers.length) * 40;
      
      const distance = Math.sqrt(Math.pow(centerX - otherCenterX, 2) + Math.pow(centerY - otherCenterY, 2));
      
      if (distance < radius + otherRadius) {
        overlapCount++;
      }
    });
    
    return overlapCount / Math.max(1, state.coalitions.length - 1);
  }

  // Génération de disruptions intelligentes
  generateIntelligentDisruption(state: SimulationState): DisruptiveEvent | null {
    const systemStability = state.systemStability || 75;
    const coalitionCount = state.coalitions.length;
    const avgStress = state.primatoms.reduce((sum, p) => sum + (p.stressLevel || 0), 0) / state.primatoms.length;
    
    // Logique adaptative de génération de disruptions
    if (systemStability > 85 && coalitionCount > 3 && Math.random() < 0.03) {
      return this.createStabilityChallenge(state);
    }
    
    if (avgStress < 20 && Math.random() < 0.02) {
      return this.createGrowthOpportunity(state);
    }
    
    if (coalitionCount > 5 && Math.random() < 0.025) {
      return this.createGovernanceChallenge(state);
    }
    
    return null;
  }

  private createStabilityChallenge(state: SimulationState): DisruptiveEvent {
    return {
      id: `stability-challenge-${Date.now()}`,
      type: 'resource_scarcity',
      name: 'Défi de Résilience Systémique',
      description: 'Test de la capacité d\'adaptation face à une contrainte de ressources',
      intensity: 6,
      duration: 40,
      effects: {
        trustModifier: -0.2,
        energyModifier: -0.4,
        cooperationModifier: 0.3,
        innovationModifier: 0.5
      },
      emergenceConditions: {
        minGeneration: 0,
        requiredCoalitions: 0,
        stabilityThreshold: 0
      },
      isActive: true,
      startTime: Date.now()
    };
  }

  private createGrowthOpportunity(state: SimulationState): DisruptiveEvent {
    return {
      id: `growth-opportunity-${Date.now()}`,
      type: 'innovation_catalyst',
      name: 'Catalyseur de Croissance Collective',
      description: 'Opportunité d\'expansion et d\'innovation collaborative',
      intensity: 7,
      duration: 50,
      effects: {
        trustModifier: 0.3,
        energyModifier: 0.4,
        cooperationModifier: 0.5,
        innovationModifier: 0.6
      },
      emergenceConditions: {
        minGeneration: 0,
        requiredCoalitions: 0,
        stabilityThreshold: 0
      },
      isActive: true,
      startTime: Date.now()
    };
  }

  private createGovernanceChallenge(state: SimulationState): DisruptiveEvent {
    return {
      id: `governance-challenge-${Date.now()}`,
      type: 'governance_crisis',
      name: 'Évolution Gouvernementale Nécessaire',
      description: 'Besoin d\'adaptation des structures de pouvoir existantes',
      intensity: 8,
      duration: 60,
      effects: {
        trustModifier: -0.3,
        energyModifier: -0.1,
        cooperationModifier: -0.2,
        innovationModifier: 0.7
      },
      emergenceConditions: {
        minGeneration: 0,
        requiredCoalitions: 0,
        stabilityThreshold: 0
      },
      isActive: true,
      startTime: Date.now()
    };
  }

  // Génération de rapport de session
  generateSessionReport(state: SimulationState): SessionReport {
    const endTime = Date.now();
    const sessionDuration = endTime - this.sessionStartTime;
    
    const keyFindings = this.extractKeyFindings();
    const emergentPatterns = this.identifyEmergentPatterns(state);
    const stabilityAnalysis = this.analyzeStabilityEvolution(state);
    const coalitionEvolution = this.analyzeCoalitionEvolution(state);
    const behavioralInsights = this.extractBehavioralInsights(state);
    
    return {
      sessionId: `session-${this.sessionStartTime}`,
      startTime: this.sessionStartTime,
      endTime,
      totalEvents: this.events.length,
      keyFindings,
      emergentPatterns,
      stabilityAnalysis,
      coalitionEvolution,
      behavioralInsights,
      recommendations: this.generateFinalRecommendations(state),
      dataQuality: this.assessDataQuality(),
      confidenceLevel: this.calculateConfidenceLevel()
    };
  }

  private extractKeyFindings(): string[] {
    const findings: string[] = [];
    
    const criticalEvents = this.events.filter(e => e.severity === 'critical');
    if (criticalEvents.length > 0) {
      findings.push(`${criticalEvents.length} événements critiques détectés nécessitant une attention particulière`);
    }
    
    const coalitionEvents = this.events.filter(e => e.type === 'coalition_formation');
    if (coalitionEvents.length > 5) {
      findings.push(`Période de forte activité coalitionnelle avec ${coalitionEvents.length} formations`);
    }
    
    const innovationEvents = this.events.filter(e => e.type === 'innovation_emergence');
    if (innovationEvents.length > 2) {
      findings.push(`Émergence significative d'innovations collectives (${innovationEvents.length} clusters détectés)`);
    }
    
    return findings;
  }

  private identifyEmergentPatterns(state: SimulationState): string[] {
    const patterns: string[] = [];
    
    // Analyse des patterns de formation de coalitions
    const avgCoalitionSize = state.coalitions.reduce((sum, c) => sum + c.members.length, 0) / Math.max(1, state.coalitions.length);
    if (avgCoalitionSize > 12) {
      patterns.push("Tendance vers la formation de méga-coalitions");
    }
    
    // Analyse des patterns comportementaux
    const leaderCount = state.primatoms.filter(p => p.behaviorType === 'leader').length;
    const followerCount = state.primatoms.filter(p => p.behaviorType === 'follower').length;
    
    if (leaderCount / followerCount > 0.3) {
      patterns.push("Émergence d'une société à leadership distribué");
    }
    
    return patterns;
  }

  private analyzeStabilityEvolution(state: SimulationState) {
    return {
      initialStability: 75, // Valeur par défaut, à tracker réellement
      finalStability: state.systemStability || 75,
      volatilityPeriods: this.identifyVolatilityPeriods()
    };
  }

  private identifyVolatilityPeriods() {
    const periods: Array<{ start: number; end: number; cause: string }> = [];
    
    const stressEvents = this.events.filter(e => e.type === 'behavior_shift' && e.severity === 'high');
    stressEvents.forEach(event => {
      periods.push({
        start: event.timestamp,
        end: event.timestamp + 30000, // 30 secondes de volatilité estimée
        cause: event.description
      });
    });
    
    return periods;
  }

  private analyzeCoalitionEvolution(state: SimulationState) {
    const coalitionEvents = this.events.filter(e => e.type === 'coalition_formation');
    
    return {
      formed: coalitionEvents.length,
      dissolved: 0, // À implémenter avec tracking des dissolutions
      merged: 0, // À implémenter avec tracking des fusions
      averageLifespan: this.calculateAverageCoalitionLifespan(state.coalitions)
    };
  }

  private calculateAverageCoalitionLifespan(coalitions: Coalition[]): number {
    if (coalitions.length === 0) return 0;
    
    const currentTime = Date.now();
    const totalLifespan = coalitions.reduce((sum, c) => sum + (currentTime - c.created), 0);
    
    return totalLifespan / coalitions.length / 1000; // En secondes
  }

  private extractBehavioralInsights(state: SimulationState) {
    const behaviorCounts = state.primatoms.reduce((acc, p) => {
      acc[p.behaviorType] = (acc[p.behaviorType] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);
    
    const dominantBehaviors = Object.entries(behaviorCounts)
      .sort(([,a], [,b]) => b - a)
      .slice(0, 2)
      .map(([type]) => type);
    
    return {
      dominantBehaviors,
      adaptationPatterns: this.identifyAdaptationPatterns(),
      innovationCatalysts: this.identifyInnovationCatalysts(state)
    };
  }

  private identifyAdaptationPatterns(): string[] {
    const patterns: string[] = [];
    
    const adaptationEvents = this.events.filter(e => 
      e.description.includes('adaptation') || e.description.includes('évolution')
    );
    
    if (adaptationEvents.length > 3) {
      patterns.push("Adaptation rapide aux changements environnementaux");
    }
    
    return patterns;
  }

  private identifyInnovationCatalysts(state: SimulationState): string[] {
    const catalysts: string[] = [];
    
    const innovators = state.primatoms.filter(p => p.behaviorType === 'innovator' && p.innovation > 80);
    if (innovators.length > 0) {
      catalysts.push(`${innovators.length} innovateurs de haut niveau identifiés`);
    }
    
    return catalysts;
  }

  private generateFinalRecommendations(state: SimulationState): string[] {
    const recommendations: string[] = [];
    
    if (state.systemStability && state.systemStability < 60) {
      recommendations.push("Priorité à la stabilisation du système - Réduire les facteurs de stress");
    }
    
    if (state.coalitions.length < 3) {
      recommendations.push("Encourager la formation de coalitions pour améliorer la gouvernance");
    }
    
    const avgInnovation = state.primatoms.reduce((sum, p) => sum + p.innovation, 0) / state.primatoms.length;
    if (avgInnovation > 75) {
      recommendations.push("Capitaliser sur le potentiel d'innovation élevé pour des transformations positives");
    }
    
    return recommendations;
  }

  private assessDataQuality(state: SimulationState): number {
    // Évaluation de la qualité des données basée sur la cohérence et la complétude
    let qualityScore = 100;
    
    // Vérification de la cohérence des données de base
    if (state.primatoms.length === 0) qualityScore -= 50;
    if (state.metrics.length === 0) qualityScore -= 20;
    
    // Vérification de la cohérence des métriques
    const invalidPrimatoms = state.primatoms.filter(p => 
      p.trust < 0 || p.trust > 100 || 
      p.cooperation < 0 || p.cooperation > 100 ||
      p.innovation < 0 || p.innovation > 100
    );
    if (invalidPrimatoms.length > 0) qualityScore -= (invalidPrimatoms.length / state.primatoms.length) * 30;
    
    const invalidEvents = this.events.filter(e => !this.validateData(e, 'quality_assessment'));
    if (this.events.length > 0) {
      qualityScore -= (invalidEvents.length / this.events.length) * 20;
    }
    
    // Bonus pour la richesse des données
    if (state.coalitions.length > 0) qualityScore += 5;
    if (state.globalKnowledge.length > 0) qualityScore += 5;
    if (state.emergentPhenomena && state.emergentPhenomena.length > 0) qualityScore += 10;
    
    return Math.max(0, Math.min(100, qualityScore));
  }

  private calculateConfidenceLevel(state: SimulationState): number {
    // Calcul du niveau de confiance basé sur la quantité et la qualité des données
    const eventCount = this.events.length;
    const dataQuality = this.assessDataQuality(state);
    const sessionDuration = Date.now() - this.sessionStartTime;
    const populationSize = state.primatoms.length;
    
    let confidence = Math.min(70, eventCount * 3); // Base sur le nombre d'événements
    
    // Bonus pour la durée de session
    if (sessionDuration > 60000) confidence += 10; // Plus d'1 minute
    if (sessionDuration > 300000) confidence += 10; // Plus de 5 minutes
    
    // Bonus pour la taille de population
    if (populationSize > 100) confidence += 5;
    if (populationSize > 200) confidence += 5;
    
    // Bonus pour la richesse des données
    if (state.coalitions.length > 0) confidence += 5;
    if (state.generation > 10) confidence += 5;
    
    confidence = (confidence + dataQuality) / 2; // Pondération avec la qualité
    
    return Math.max(60, Math.min(95, confidence));
  }

  // Méthodes publiques pour l'interface
  getRecentEvents(limit: number = 10): AnalysisEvent[] {
    return this.events
      .sort((a, b) => b.timestamp - a.timestamp)
      .slice(0, limit);
  }

  getEventsByType(type: AnalysisEvent['type']): AnalysisEvent[] {
    return this.events.filter(e => e.type === type);
  }

  getCriticalEvents(): AnalysisEvent[] {
    return this.events.filter(e => e.severity === 'critical' || e.severity === 'high');
  }

  clearEvents(): void {
    this.events = [];
  }

  resetSession(): void {
    this.events = [];
    this.sessionStartTime = Date.now();
    this.disruptionQueue = [];
    this.analysisBuffer = [];
  }
}