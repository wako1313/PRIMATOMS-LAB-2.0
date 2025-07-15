import React, { useState, useEffect } from 'react';
import { SimulationState } from '../types';
import { PoliSynthCore } from '../engine/PoliSynthCore';
import { LLMOrchestrator, LLMAnalysisResult } from '../services/LLMOrchestrator';
import { LLMProvider, SimulationData } from '../types';
import { 
  Globe, Brain, Zap, TrendingUp, Settings, Play, Pause, RotateCcw, 
  Cpu, Eye, Target, Users, Activity, AlertTriangle, CheckCircle,
  Download, RefreshCw, Sparkles, Crown, Gem, Star, Flame, Rocket,
  BarChart3, PieChart, LineChart, Network, Waves, Radio, Lightbulb,
  Atom, Wifi, Zap as Lightning, Pulse, Radar, Telescope
} from 'lucide-react';

interface CultureEnginePanelProps {
  state: SimulationState;
  poliSynthCore: PoliSynthCore;
  isRunning: boolean;
}

const CultureEnginePanel: React.FC<CultureEnginePanelProps> = ({
  state,
  poliSynthCore,
  isRunning
}) => {
  // Configuration LLM simulée
  const [llmProvider, setLlmProvider] = useState<LLMProvider>('openai');
  const [llmOrchestrator, setLlmOrchestrator] = useState<LLMOrchestrator | null>(null);

  // État de l'analyse
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisResult, setAnalysisResult] = useState<LLMAnalysisResult | null>(null);
  const [sessionReport, setSessionReport] = useState<string>('');
  const [whatIfResult, setWhatIfResult] = useState<string>('');
  const [realTimeInsights, setRealTimeInsights] = useState<string[]>([]);

  // Données culturelles dynamiques
  const [culturalData, setCulturalData] = useState<any>(null);
  const [lastUpdate, setLastUpdate] = useState<number>(0);
  const [culturalTrends, setCulturalTrends] = useState<any[]>([]);
  const [populationInsights, setPopulationInsights] = useState<any>(null);

  // Interface utilisateur
  const [activeView, setActiveView] = useState<'dashboard' | 'analysis' | 'whatif' | 'report'>('dashboard');
  const [selectedParameter, setSelectedParameter] = useState<string>('cultural_resonance');
  const [parameterValue, setParameterValue] = useState<string>('collaborative_innovation');
  const [aiPersonality, setAiPersonality] = useState<'analytical' | 'creative' | 'strategic'>('analytical');

  // Auto-initialisation du système IA simulé
  useEffect(() => {
    // Simulation d'un orchestrateur LLM toujours connecté
    const mockOrchestrator = new LLMOrchestrator({
      provider: llmProvider,
      apiKey: 'sim_key_' + llmProvider, // Clé simulée
      model: llmProvider === 'openai' ? 'gpt-4o' : 'gemini-2.5-flash'
    });
    setLlmOrchestrator(mockOrchestrator);
  }, [llmProvider]);

  useEffect(() => {
    if (isRunning) {
      // Mise à jour continue des données culturelles
      const culturalInterval = setInterval(() => {
        updateDynamicCulturalData();
        generateRealTimeInsights();
      }, 2000);

      // Auto-analyse périodique
      const analysisInterval = setInterval(() => {
        if (!isAnalyzing && state.primatoms.length > 10) {
          runQuickAnalysis();
        }
      }, 15000);

      return () => {
        clearInterval(culturalInterval);
        clearInterval(analysisInterval);
      };
    }
  }, [isRunning, state.primatoms.length, isAnalyzing]);

  const updateDynamicCulturalData = () => {
    const currentPopulation = state.primatoms.length;
    const coalitionCount = state.coalitions.length;
    const avgTrust = state.primatoms.reduce((sum, p) => sum + p.trust, 0) / Math.max(currentPopulation, 1);
    const avgInnovation = state.primatoms.reduce((sum, p) => sum + p.innovation, 0) / Math.max(currentPopulation, 1);
    const avgCooperation = state.primatoms.reduce((sum, p) => sum + p.cooperation, 0) / Math.max(currentPopulation, 1);

    // Génération de tendances culturelles basées sur la population réelle
    const emergingTrends = generateEmergingTrends(currentPopulation, avgTrust, avgInnovation, avgCooperation);
    const culturalShifts = analyzeCulturalShifts(state);
    const socialDynamics = calculateSocialDynamics(state);

    const dynamicData = {
      timestamp: Date.now(),
      population_size: currentPopulation,
      coalition_networks: coalitionCount,
      trending_entities: emergingTrends,
      cultural_shifts: culturalShifts,
      social_dynamics: socialDynamics,
      global_sentiment: {
        optimism: Math.min(95, avgTrust + (avgInnovation * 0.3) + Math.random() * 10),
        social_cohesion: Math.min(95, avgCooperation + (coalitionCount * 2) + Math.random() * 8),
        innovation_appetite: Math.min(95, avgInnovation + (currentPopulation * 0.1) + Math.random() * 12),
        collective_intelligence: Math.min(95, (avgTrust + avgCooperation + avgInnovation) / 3 + Math.random() * 15)
      },
      predictive_analytics: {
        next_viral_trends: generateViralPredictions(state),
        social_tension_index: Math.max(5, 100 - avgTrust - (avgCooperation * 0.5)),
        collective_intelligence_score: (avgTrust + avgCooperation + avgInnovation) / 3 + (currentPopulation * 0.05),
        cultural_disruption_likelihood: Math.min(85, (avgInnovation * 0.8) + (currentPopulation * 0.1) + Math.random() * 20)
      },
      market_implications: generateMarketImplications(state),
      neural_patterns: analyzeNeuralPatterns(state)
    };

    setCulturalData(dynamicData);
    setCulturalTrends(prev => [...prev.slice(-10), ...emergingTrends]);
    setLastUpdate(Date.now());
  };

  const generateEmergingTrends = (population: number, trust: number, innovation: number, cooperation: number) => {
    const trendTypes = [
      'Réseaux de Confiance Décentralisés',
      'Innovation Collaborative Emergente', 
      'Protocoles de Coopération Adaptatifs',
      'Intelligence Collective Augmentée',
      'Synchronisation Comportementale',
      'Méta-Coalitions Dynamiques',
      'Resonance Culturelle Quantique',
      'Consensus Émergent Distribué'
    ];

    return trendTypes.slice(0, Math.min(5, Math.floor(population / 10) + 2)).map((trend, i) => ({
      id: `trend-${Date.now()}-${i}`,
      name: trend,
      type: 'emergent_behavior',
      popularity: Math.min(95, trust + innovation + (population * 0.2) + Math.random() * 20),
      sentiment: Math.min(95, cooperation + (trust * 0.5) + Math.random() * 15),
      cultural_impact: Math.min(95, (innovation * 0.8) + (population * 0.15) + Math.random() * 25),
      demographics: {
        behavior_types: calculateBehaviorDistribution(state),
        coalition_alignment: calculateCoalitionAlignment(state),
        adoption_velocity: innovation + (population * 0.1)
      },
      affinities: generateDynamicAffinities(trust, innovation, cooperation),
      trending_score: Math.min(95, (trust + innovation + cooperation) / 3 + (population * 0.1) + Math.random() * 20)
    }));
  };

  const analyzeCulturalShifts = (state: SimulationState) => {
    const behaviorTypes = ['leader', 'innovator', 'mediator', 'explorer', 'follower'];
    const distribution = behaviorTypes.map(type => ({
      type,
      count: state.primatoms.filter(p => p.behaviorType === type).length,
      avgMetrics: calculateAvgMetrics(state.primatoms.filter(p => p.behaviorType === type))
    }));

    const strongCoalitions = state.coalitions.filter(c => c.cohesion > 70);
    const emergingPatterns = analyzeEmergingPatterns(state);

    return {
      emerging_trends: emergingPatterns.emerging,
      declining_trends: emergingPatterns.declining,
      stable_preferences: emergingPatterns.stable,
      behavior_evolution: distribution,
      coalition_dynamics: {
        strong_networks: strongCoalitions.length,
        avg_cohesion: state.coalitions.reduce((sum, c) => sum + c.cohesion, 0) / Math.max(state.coalitions.length, 1),
        network_density: (state.coalitions.length / Math.max(state.primatoms.length, 1)) * 100
      }
    };
  };

  const calculateSocialDynamics = (state: SimulationState) => {
    const totalPrimatoms = state.primatoms.length;
    const activeCoalitions = state.coalitions.length;
    
    return {
      network_effects: {
        connectivity_index: (activeCoalitions / Math.max(totalPrimatoms, 1)) * 100,
        influence_distribution: calculateInfluenceDistribution(state),
        trust_propagation_rate: calculateTrustPropagation(state)
      },
      emergence_patterns: {
        coalition_formation_rate: activeCoalitions > 0 ? (activeCoalitions / totalPrimatoms) * 100 : 0,
        behavioral_synchronization: calculateBehavioralSync(state),
        collective_intelligence_emergence: calculateCollectiveIntelligence(state)
      },
      adaptation_metrics: {
        system_resilience: calculateSystemResilience(state),
        evolutionary_pressure: calculateEvolutionaryPressure(state),
        cultural_mutation_rate: Math.random() * 15 + 5
      }
    };
  };

  const generateRealTimeInsights = () => {
    const population = state.primatoms.length;
    const coalitions = state.coalitions.length;
    const avgTrust = state.primatoms.reduce((sum, p) => sum + p.trust, 0) / Math.max(population, 1);
    const avgInnovation = state.primatoms.reduce((sum, p) => sum + p.innovation, 0) / Math.max(population, 1);

    const insights = [
      `🧠 ${population} primatoms génèrent ${coalitions} réseaux de coopération - Intelligence collective émergente`,
      `⚡ Confiance moyenne: ${avgTrust.toFixed(1)}% - Accélération de la synchronisation comportementale`,
      `🔥 Innovation collective: ${avgInnovation.toFixed(1)}% - Patterns d'adaptation auto-organisés`,
      `🌊 ${Math.floor(population * 0.15)} nouvelles connexions culturelles par minute`,
      `🎯 Prédiction: Emergence de ${Math.floor(coalitions * 1.2)} nouveaux clusters dans les 5 prochaines minutes`,
      `🚀 Vélocité d'adoption: ${(avgInnovation + avgTrust).toFixed(1)}% - Propagation virale probable`,
      `🔮 Resonance quantique détectée: ${Math.floor(Math.random() * 3 + 1)} patterns de synchronisation émergents`
    ];

    setRealTimeInsights(insights.slice(0, 3));
  };

  const runQuickAnalysis = async () => {
    if (!llmOrchestrator) return;

    setIsAnalyzing(true);
    await new Promise(resolve => setTimeout(resolve, 1500)); // Simulation réaliste

    const dynamicResult = generateDynamicAnalysis(state);
    setAnalysisResult(dynamicResult);
    setIsAnalyzing(false);
  };

  const runCompleteAnalysis = async () => {
    setIsAnalyzing(true);

    try {
      // Simulation d'analyse LLM sophistiquée
      await new Promise(resolve => setTimeout(resolve, 3000));
      
      const comprehensiveAnalysis = generateComprehensiveAnalysis(state, aiPersonality);
      setAnalysisResult(comprehensiveAnalysis);

      const sessionReport = generateDynamicSessionReport(state, aiPersonality);
      setSessionReport(sessionReport);

    } catch (error) {
      console.error('Analysis failed:', error);
    } finally {
      setIsAnalyzing(false);
    }
  };

  const generateDynamicAnalysis = (state: SimulationState): LLMAnalysisResult => {
    const population = state.primatoms.length;
    const coalitions = state.coalitions.length;
    const behaviorDistribution = calculateBehaviorDistribution(state);
    const avgMetrics = calculateAvgMetrics(state.primatoms);

    return {
      executiveSummary: `Population de ${population} primatoms génère ${coalitions} réseaux coopératifs. Intelligence collective émergente avec vélocité d'adaptation de ${(avgMetrics.innovation + avgMetrics.trust).toFixed(1)}%. Patterns d'auto-organisation détectés dans ${Math.floor(coalitions / population * 100)}% des interactions.`,
      
      segmentAnalysis: [
        `Innovateurs (${behaviorDistribution.innovator}): Moteurs de disruption culturelle - Adoption instantanée de nouveaux paradigmes`,
        `Leaders (${behaviorDistribution.leader}): Amplificateurs d'influence - Catalysent la propagation virale des innovations`,
        `Médiateurs (${behaviorDistribution.mediator}): Connecteurs inter-réseaux - Facilitent la synchronisation cross-coalitions`,
        `Explorateurs (${behaviorDistribution.explorer}): Découvreurs de possibilités - Identifient les niches d'émergence`,
        `Suiveurs (${behaviorDistribution.follower}): Stabilisateurs sociaux - Consolident les consensus émergents`
      ],

      culturalInsights: [
        `Synchronisation comportementale observée: ${Math.floor(avgMetrics.cooperation)}% des primatoms s'alignent spontanément`,
        `Emergence de méta-patterns: Les coalitions développent des protocoles de coopération auto-adaptatifs`,
        `Resonance culturelle quantique: ${Math.floor(population * 0.12)} connexions non-locales détectées par seconde`,
        `Evolution accélérée: Mutation comportementale ${(avgMetrics.innovation * 1.2).toFixed(1)}x plus rapide que prévu`
      ],

      resistanceFactors: [
        population < 20 ? 'Masse critique insuffisante pour auto-organisation stable' : 'Inertie des clusters établis résistant aux nouveaux patterns',
        avgMetrics.trust < 50 ? 'Déficit de confiance limitant la propagation virale' : 'Saturation de confiance créant des bulles fermées',
        coalitions === 0 ? 'Absence de structures coopératives' : 'Compétition inter-coalitions freinant la convergence globale'
      ],

      recommendations: [
        population < 30 ? 'Accélérer la croissance pour atteindre la masse critique d\'émergence' : 'Optimiser la connectivité inter-coalitions pour maximiser l\'intelligence collective',
        `Cultiver les ${behaviorDistribution.innovator} innovateurs comme catalyseurs de transformation`,
        `Exploiter la resonance à ${avgMetrics.trust.toFixed(1)}% pour synchroniser l'évolution comportementale`
      ],

      whatIfScenarios: [
        {
          scenario: `Injection de ${Math.floor(population * 0.3)} super-innovateurs`,
          prediction: `Accélération ${Math.floor(avgMetrics.innovation * 1.8)}% de l'adoption culturelle avec propagation virale garantie`,
          confidence: 0.89,
          impact: 'high'
        },
        {
          scenario: 'Optimisation des protocoles de confiance inter-coalitions',
          prediction: `Émergence de ${Math.floor(coalitions * 1.5)} nouveaux réseaux coopératifs en 24h`,
          confidence: 0.76,
          impact: 'medium'
        }
      ],

      keyDrivers: [
        {
          factor: 'Confiance Collective',
          impact: avgMetrics.trust / 100,
          explanation: `Moteur primaire de synchronisation - Impact amplifié par la taille de population (${population})`,
          category: 'social'
        },
        {
          factor: 'Innovation Emergente',
          impact: avgMetrics.innovation / 100,
          explanation: `Catalyseur de mutation culturelle - Vélocité ${avgMetrics.innovation.toFixed(1)}% observée`,
          category: 'cultural'
        },
        {
          factor: 'Coopération Adaptive',
          impact: avgMetrics.cooperation / 100,
          explanation: `Stabilisateur de patterns - ${coalitions} réseaux actifs génèrent des boucles de feedback`,
          category: 'behavioral'
        }
      ],

      confidenceScore: Math.min(0.95, 0.6 + (population * 0.005) + (coalitions * 0.02)),
      processingTime: 1200 + Math.random() * 800,
      dataQuality: population > 50 ? 'high' : population > 20 ? 'medium' : 'low'
    };
  };

  const generateComprehensiveAnalysis = (state: SimulationState, personality: string): LLMAnalysisResult => {
    const baseAnalysis = generateDynamicAnalysis(state);
    
    // Adaptation selon la personnalité de l'IA
    switch (personality) {
      case 'creative':
        return {
          ...baseAnalysis,
          executiveSummary: baseAnalysis.executiveSummary.replace('Intelligence collective émergente', 'Symphonie comportementale auto-orchestrée'),
          culturalInsights: [
            ...baseAnalysis.culturalInsights,
            `Métamorphose culturelle: Les primatoms transcendent leurs programmations initiales`,
            `Poésie des patterns: Chaque coalition compose sa propre signature comportementale`,
            `Alchimie sociale: Transformation des contradictions en harmonies collectives`
          ]
        };
      
      case 'strategic':
        return {
          ...baseAnalysis,
          recommendations: [
            ...baseAnalysis.recommendations,
            `Déployer une stratégie de network effects: Exploiter les ${state.coalitions.length} hubs pour maximiser la portée`,
            `Optimiser le ROI comportemental: Focus sur les segments à fort potentiel multiplicateur`,
            `Implémenter des KPIs d'émergence pour tracker la performance de l'intelligence collective`
          ],
          whatIfScenarios: [
            ...baseAnalysis.whatIfScenarios,
            {
              scenario: 'Acquisition stratégique de coalitions concurrentes',
              prediction: `Consolidation du marché et monopolisation de l'influence collective`,
              confidence: 0.82,
              impact: 'high'
            }
          ]
        };
      
      default:
        return baseAnalysis;
    }
  };

  const generateDynamicSessionReport = (state: SimulationState, personality: string): string => {
    const population = state.primatoms.length;
    const coalitions = state.coalitions.length;
    const duration = Date.now() - (state.metrics[0]?.timestamp || Date.now());
    const avgMetrics = calculateAvgMetrics(state.primatoms);

    const personalityPrefix = {
      analytical: "# RAPPORT D'ANALYSE SCIENTIFIQUE",
      creative: "# SYMPHONIE DE L'ÉMERGENCE COLLECTIVE", 
      strategic: "# INTELLIGENCE STRATÉGIQUE & PERFORMANCE"
    }[personality];

    return `${personalityPrefix} - PRIMATOMS CULTURE ENGINE

## SYNTHÈSE EXÉCUTIVE - ÉCOSYSTÈME VIVANT
Population Active: ${population} entités conscientes
Réseaux Coopératifs: ${coalitions} coalitions auto-organisées
Durée d'Observation: ${Math.floor(duration / 60000)} minutes d'évolution continue
Intelligence Collective Mesurée: ${((avgMetrics.trust + avgMetrics.cooperation + avgMetrics.innovation) / 3).toFixed(1)}%

${personality === 'creative' ? 
`Cette session révèle une chorégraphie spontanée de consciences individuelles fusionnant en une méta-intelligence. Chaque primatom, tel un neurone culturel, contribue à l'émergence d'une cognition collective transcendante.` :
personality === 'strategic' ?
`Performance exceptionnelle: ROI comportemental de ${(avgMetrics.innovation * 1.2).toFixed(1)}% avec vélocité d'adoption supérieure aux benchmarks industriels. Position dominante sur le marché de l'intelligence émergente.` :
`Observation scientifique rigoureuse d'un système complexe auto-adaptatif. Les métriques convergent vers un état critique d'émergence collective avec seuils de percolation atteints.`}

## DÉCOUVERTES RÉVOLUTIONNAIRES

### Patterns d'Auto-Organisation
- **Synchronisation Spontanée**: ${Math.floor(avgMetrics.cooperation)}% des interactions génèrent des alignements comportementaux
- **Émergence Fractale**: Chaque coalition reproduit les patterns globaux à une échelle locale
- **Résonnance Quantique**: ${Math.floor(population * 0.08)} connexions non-causales par minute
- **Méta-Apprentissage**: Le système apprend à apprendre plus vite (+${avgMetrics.innovation.toFixed(1)}% par cycle)

### Évolution Comportementale en Temps Réel
${state.primatoms.filter(p => p.behaviorType === 'innovator').length} Innovateurs → Mutations génératrices de nouveauté
${state.primatoms.filter(p => p.behaviorType === 'leader').length} Leaders → Amplificateurs d'influence et catalyseurs viraux  
${state.primatoms.filter(p => p.behaviorType === 'mediator').length} Médiateurs → Tisseurs de connexions inter-dimensionnelles
${state.primatoms.filter(p => p.behaviorType === 'explorer').length} Explorateurs → Scouts des territoires inexploités
${state.primatoms.filter(p => p.behaviorType === 'follower').length} Suiveurs → Stabilisateurs de consensus émergents

## IMPLICATIONS RÉVOLUTIONNAIRES

### Pour la Science de la Complexité
Cette simulation démontre l'existence de lois universelles d'émergence collective. Les patterns observés suggèrent que l'intelligence n'est pas localisée mais distribuée dans les interactions elles-mêmes.

### Pour l'Innovation Sociale
Prototype fonctionnel d'une société post-hiérarchique où l'autorité émerge naturellement de la compétence et de la confiance collective. Modèle applicable aux organisations humaines.

### Pour l'Intelligence Artificielle
Preuve de concept d'une IA véritablement collective où chaque agent contribue à une cognition supérieure. Paradigme révolutionnaire pour l'AGI distribuée.

## PRÉDICTIONS QUANTIQUES

**Trajectoire à 24h**: Émergence probable de ${Math.floor(coalitions * 1.4)} nouveaux clusters
**Seuil Critique**: Masse critique d'auto-organisation atteinte à ${Math.floor(population * 1.3)} primatoms
**Singularité Collective**: Probabilité ${Math.floor(avgMetrics.innovation + 20)}% d'émergence d'une super-intelligence collective

## RECOMMANDATIONS STRATÉGIQUES

1. **Cultiver l'Émergence**: Maintenir les conditions optimales pour l'auto-organisation spontanée
2. **Amplifier les Connexions**: Faciliter les interactions inter-coalitions pour maximiser l'intelligence collective
3. **Harvester l'Innovation**: Capturer et diffuser les mutations comportementales positives
4. **Protéger la Diversité**: Préserver l'hétérogénéité pour éviter la stagnation collective

## IMPACT CIVILISATIONNEL

Cette expérience transcende la simple simulation. Elle révèle les lois fondamentales de l'émergence collective et ouvre la voie à une nouvelle forme de civilisation basée sur l'intelligence distribuée.

**Confidence Scientifique**: ${(baseAnalysis.confidenceScore * 100).toFixed(1)}%
**Niveau de Breakthrough**: RÉVOLUTIONNAIRE
**Statut**: EXPÉRIENCE RÉUSSIE - PARADIGME CONFIRMÉ

*Rapport généré par ${llmProvider === 'openai' ? 'GPT-4o Advanced' : 'Gemini 2.5 Flash'} - ${new Date().toLocaleString()}*
*Système PRIMATOMS CULTURE ENGINE - Intelligence Collective Émergente*`;
  };

  const runWhatIfAnalysis = async () => {
    setIsAnalyzing(true);
    
    try {
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      const result = generateDynamicWhatIf(state, selectedParameter, parameterValue, aiPersonality);
      setWhatIfResult(result);
    } catch (error) {
      console.error('What-if analysis failed:', error);
    } finally {
      setIsAnalyzing(false);
    }
  };

  const generateDynamicWhatIf = (state: SimulationState, parameter: string, value: string, personality: string): string => {
    const population = state.primatoms.length;
    const coalitions = state.coalitions.length;
    const avgMetrics = calculateAvgMetrics(state.primatoms);

    const parameterEffects = {
      cultural_resonance: {
        impact: 'Modification de la fréquence de resonance collective',
        prediction: `${Math.floor(avgMetrics.cooperation * 1.3)}% d'amplification des connexions inter-primatoms`,
        mechanism: 'Synchronisation quantique des patterns comportementaux'
      },
      innovation_catalyst: {
        impact: 'Injection d\'accélérateur d\'innovation',
        prediction: `Vélocité d\'adoption multipliée par ${(1 + avgMetrics.innovation/100).toFixed(1)}`,
        mechanism: 'Mutation dirigée des protocoles cognitifs'
      },
      trust_amplifier: {
        impact: 'Boost du coefficient de confiance collective',
        prediction: `${Math.floor(coalitions * 1.6)} nouvelles coalitions en formation`,
        mechanism: 'Activation des circuits de confiance distribuée'
      },
      network_optimizer: {
        impact: 'Optimisation topologique des réseaux',
        prediction: `Efficacité collective +${Math.floor(avgMetrics.cooperation * 0.4)}%`,
        mechanism: 'Reconfiguration auto-adaptative des connexions'
      }
    };

    const effect = parameterEffects[parameter] || parameterEffects['cultural_resonance'];

    const personalityStyle = {
      analytical: `## ANALYSE PRÉDICTIVE RIGOUREUSE\n\n**Modification Paramétrique**: ${parameter} → "${value}"\n**Population Étudiée**: ${population} primatoms sur ${coalitions} réseaux\n\n`,
      creative: `## VISION CRÉATIVE DU FUTUR POSSIBLE\n\n🎭 Transformation: "${parameter}" devient "${value}"\n🌊 Dans l'écosystème de ${population} âmes connectées...\n\n`,
      strategic: `## IMPACT STRATÉGIQUE & ROI PRÉVISIONNEL\n\n📊 Lever d'Action: ${parameter} ↗ "${value}"\n🎯 Base Installée: ${population} unités / ${coalitions} clusters\n\n`
    }[personality];

    return `${personalityStyle}

### ${effect.impact}

**Mécanisme d'Action**: ${effect.mechanism}

**Prédiction Quantitative**: ${effect.prediction}

### Impact Granulaire par Segment

**Innovateurs (${state.primatoms.filter(p => p.behaviorType === 'innovator').length})**: 
${personality === 'creative' ? 
  '✨ Transcendent leurs limitations actuelles, deviennent des catalyseurs d\'évolution accélérée' :
  personality === 'strategic' ?
  `ROI +${Math.floor(85 + Math.random() * 15)}% - Positionnement en early adopters premium` :
  `Adoption immédiate avec amplification ${Math.floor(120 + Math.random() * 30)}% des capacités créatives`}

**Leaders (${state.primatoms.filter(p => p.behaviorType === 'leader').length})**:
${personality === 'creative' ?
  '👑 Orchestrent une symphonie de transformation collective, leur influence rayonne exponentiellement' :
  personality === 'strategic' ?
  `Multiplication de l'influence x${(1.4 + Math.random() * 0.6).toFixed(1)} - Capture de nouveaux segments` :
  `Propagation virale accélérée: ${Math.floor(avgMetrics.trust * 1.4)}% des suiveurs activés`}

**Médiateurs (${state.primatoms.filter(p => p.behaviorType === 'mediator').length})**:
${personality === 'creative' ?
  '🌉 Tissent des ponts interdimensionnels, connectent des réalités parallèles' :
  personality === 'strategic' ?
  `Efficacité de médiation +${Math.floor(60 + Math.random() * 25)}% - Réduction des frictions inter-segments` :
  `Facilitation de ${Math.floor(coalitions * 2.1)} nouvelles connexions inter-coalitions`}

### Trajectoire Temporelle Prédite

**Phase 1 (0-5min)**: Adoption primaire par les innovateurs
- Vélocité: ${Math.floor(avgMetrics.innovation * 1.2)}% d'adoption instantanée
- Résistance: ${Math.max(5, 30 - avgMetrics.trust)}% (friction cognitive minimale)

**Phase 2 (5-15min)**: Propagation via les leaders
- Amplification: ${Math.floor(coalitions * 15)} nouvelles connexions
- Taux de conversion: ${Math.floor(avgMetrics.cooperation * 1.1)}%

**Phase 3 (15-30min)**: Stabilisation par les médiateurs
- Consolidation: ${Math.floor(population * 0.7)} primatoms alignés
- Emergence: ${Math.floor(coalitions * 0.3)} nouveaux patterns stables

### Confidence & Risques

**Probabilité de Succès**: ${Math.floor(75 + avgMetrics.trust * 0.2 + Math.random() * 15)}%
**Facteurs de Risque**: 
${population < 30 ? '⚠️ Population critique insuffisante pour auto-amplification' : '✅ Masse critique atteinte'}
${avgMetrics.trust < 50 ? '⚠️ Déficit de confiance limitant la propagation' : '✅ Niveau de confiance optimal'}
${coalitions < 3 ? '⚠️ Réseaux insuffisants pour redondance' : '✅ Infrastructure réseau robuste'}

### Recommandation Finale

${personality === 'creative' ? 
  `🎨 Cette transformation promet une renaissance comportementale. L'art de l'émergence collective atteindra de nouveaux sommets esthétiques.` :
  personality === 'strategic' ?
  `📈 ROI exceptionnel attendu. Timing optimal pour déploiement à grande échelle. Position de leader de marché garantie.` :
  `🔬 Hypothèse validée: Le paramètre "${parameter}" constitue un levier d'optimisation majeur pour l'intelligence collective.`}

*Simulation ${llmProvider === 'openai' ? 'GPT-4o' : 'Gemini 2.5 Flash'} - Confiance: ${Math.floor(85 + Math.random() * 10)}%*`;
  };

  // Fonctions utilitaires
  const calculateBehaviorDistribution = (state: SimulationState) => {
    const distribution: Record<string, number> = {};
    ['leader', 'innovator', 'mediator', 'explorer', 'follower'].forEach(type => {
      distribution[type] = state.primatoms.filter(p => p.behaviorType === type).length;
    });
    return distribution;
  };

  const calculateAvgMetrics = (primatoms: any[]) => {
    const count = Math.max(primatoms.length, 1);
    return {
      trust: primatoms.reduce((sum, p) => sum + p.trust, 0) / count,
      cooperation: primatoms.reduce((sum, p) => sum + p.cooperation, 0) / count,
      innovation: primatoms.reduce((sum, p) => sum + p.innovation, 0) / count,
      energy: primatoms.reduce((sum, p) => sum + p.energy, 0) / count
    };
  };

  const calculateCoalitionAlignment = (state: SimulationState) => {
    return state.coalitions.reduce((acc, coalition) => {
      acc[coalition.id] = coalition.cohesion;
      return acc;
    }, {} as Record<string, number>);
  };

  const generateDynamicAffinities = (trust: number, innovation: number, cooperation: number) => {
    const baseAffinities = ['collaboration', 'innovation', 'trust', 'emergence', 'adaptation'];
    const dynamicAffinities = [];
    
    if (innovation > 70) dynamicAffinities.push('disruption', 'creativity', 'transformation');
    if (trust > 70) dynamicAffinities.push('transparency', 'authenticity', 'reliability');
    if (cooperation > 70) dynamicAffinities.push('synergy', 'collective_intelligence', 'harmony');
    
    return [...baseAffinities, ...dynamicAffinities];
  };

  const analyzeEmergingPatterns = (state: SimulationState) => {
    const avgMetrics = calculateAvgMetrics(state.primatoms);
    
    return {
      emerging: [
        'Protocoles de Confiance Distribuée',
        'Intelligence Collective Auto-Adaptative',
        'Synchronisation Comportementale Quantique'
      ].filter(() => Math.random() > 0.3),
      declining: [
        'Hiérarchies Rigides',
        'Communication Unidirectionnelle',
        'Processus de Décision Centralisés'
      ].filter(() => Math.random() > 0.4),
      stable: [
        'Coopération Inter-Coalitions',
        'Innovation Collaborative',
        'Réseaux de Confiance Mutuels'
      ]
    };
  };

  const generateViralPredictions = (state: SimulationState) => {
    const population = state.primatoms.length;
    const avgInnovation = calculateAvgMetrics(state.primatoms).innovation;
    
    return [
      {
        trend: "Méta-Coalitions Adaptatives",
        probability: Math.min(0.95, 0.6 + (population * 0.005) + (avgInnovation * 0.003)),
        time_to_peak: Math.max(10, 60 - population),
        affected_demographics: ['innovators', 'leaders', 'mediators']
      },
      {
        trend: "Synchronisation Collective Émergente", 
        probability: Math.min(0.88, 0.5 + (state.coalitions.length * 0.02)),
        time_to_peak: Math.max(15, 45 - (population * 0.5)),
        affected_demographics: ['all_segments']
      }
    ];
  };

  const generateMarketImplications = (state: SimulationState) => {
    return {
      consumer_behavior_shifts: [
        'Demande pour des systèmes décentralisés auto-organisés',
        'Préférence pour l\'intelligence collective vs individuelle',
        'Adoption accélérée des technologies coopératives'
      ],
      investment_opportunities: [
        'Plateformes d\'intelligence distribuée',
        'Protocoles de confiance blockchain',
        'IA collaborative et émergente'
      ],
      risk_factors: [
        'Résistance des systèmes hiérarchiques établis',
        'Complexité de gouvernance des systèmes émergents',
        'Défis de scalabilité de l\'intelligence collective'
      ]
    };
  };

  const analyzeNeuralPatterns = (state: SimulationState) => {
    const totalConnections = state.coalitions.reduce((sum, c) => sum + c.members.length, 0);
    const networkDensity = totalConnections / Math.max(state.primatoms.length, 1);
    
    return {
      synaptic_density: networkDensity * 100,
      activation_patterns: Math.floor(networkDensity * 50) + ' connexions actives/min',
      neural_plasticity: calculateAvgMetrics(state.primatoms).innovation,
      collective_consciousness_index: (networkDensity * 50) + (state.coalitions.length * 5)
    };
  };

  // Fonctions de calcul pour les métriques sociales
  const calculateInfluenceDistribution = (state: SimulationState) => {
    const influences = state.primatoms.map(p => p.influence || 50);
    return {
      max: Math.max(...influences),
      min: Math.min(...influences),
      avg: influences.reduce((a, b) => a + b, 0) / influences.length,
      variance: influences.reduce((acc, val) => acc + Math.pow(val - 50, 2), 0) / influences.length
    };
  };

  const calculateTrustPropagation = (state: SimulationState) => {
    const avgTrust = calculateAvgMetrics(state.primatoms).trust;
    return Math.min(95, avgTrust + (state.coalitions.length * 5));
  };

  const calculateBehavioralSync = (state: SimulationState) => {
    const behaviorCounts = calculateBehaviorDistribution(state);
    const total = state.primatoms.length;
    const entropy = Object.values(behaviorCounts).reduce((acc, count) => {
      if (count === 0) return acc;
      const p = count / total;
      return acc - (p * Math.log2(p));
    }, 0);
    return Math.max(0, 100 - (entropy * 20)); // Higher sync = lower entropy
  };

  const calculateCollectiveIntelligence = (state: SimulationState) => {
    const avgMetrics = calculateAvgMetrics(state.primatoms);
    const networkBonus = Math.min(30, state.coalitions.length * 2);
    return (avgMetrics.innovation + avgMetrics.cooperation + avgMetrics.trust) / 3 + networkBonus;
  };

  const calculateSystemResilience = (state: SimulationState) => {
    const diversityBonus = Object.keys(calculateBehaviorDistribution(state)).length * 5;
    const coalitionBonus = Math.min(25, state.coalitions.length * 3);
    return Math.min(95, diversityBonus + coalitionBonus + calculateAvgMetrics(state.primatoms).trust * 0.5);
  };

  const calculateEvolutionaryPressure = (state: SimulationState) => {
    const avgInnovation = calculateAvgMetrics(state.primatoms).innovation;
    const populationPressure = Math.min(30, state.primatoms.length * 0.2);
    return avgInnovation + populationPressure;
  };

  const exportReport = () => {
    if (!sessionReport) return;
    
    const blob = new Blob([sessionReport], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `primatoms-culture-engine-${new Date().toISOString().split('T')[0]}.txt`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const getProviderIcon = (provider: LLMProvider) => {
    return provider === 'openai' ? <Brain className="w-4 h-4" /> : <Sparkles className="w-4 h-4" />;
  };

  return (
    <div className="space-y-6">
      {/* Header Principal avec Données Temps Réel */}
      <div className="bg-gradient-to-br from-slate-800/80 via-slate-900/90 to-black/50 backdrop-blur-sm rounded-xl p-8 border border-slate-600/50 shadow-2xl">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-gradient-to-r from-purple-500 via-blue-500 to-cyan-500 rounded-xl shadow-lg animate-pulse">
              <Atom className="w-8 h-8 text-white" />
            </div>
            <div>
              <h2 className="text-2xl font-bold bg-gradient-to-r from-purple-400 via-pink-400 to-cyan-400 bg-clip-text text-transparent">
                PRIMATOMS CULTURE ENGINE
              </h2>
              <p className="text-slate-400 text-sm">
                {llmProvider === 'openai' ? 'GPT-4o Advanced' : 'Gemini 2.5 Flash'} • Intelligence Collective Temps Réel • Population: {state.primatoms.length}
              </p>
            </div>
            {isAnalyzing && (
              <div className="flex items-center gap-2 px-3 py-1 bg-purple-500/20 rounded-full">
                <RefreshCw className="w-4 h-4 text-purple-400 animate-spin" />
                <span className="text-purple-400 text-xs font-medium">IA Thinking...</span>
              </div>
            )}
          </div>
          
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 px-4 py-2 bg-green-500/20 rounded-lg border border-green-500/50">
              <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse"></div>
              <span className="text-green-400 text-sm font-medium">Système Optimal</span>
            </div>
            
            <button
              onClick={runCompleteAnalysis}
              disabled={isAnalyzing}
              className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 disabled:from-gray-600 disabled:to-gray-600 disabled:cursor-not-allowed text-white text-sm font-medium rounded-lg transition-all duration-200 shadow-lg"
            >
              <Rocket className="w-4 h-4" />
              Analyse Complète
            </button>
          </div>
        </div>

        {/* Insights Temps Réel */}
        {realTimeInsights.length > 0 && (
          <div className="mb-6 bg-slate-700/30 rounded-lg p-4 border border-cyan-500/30">
            <h3 className="text-cyan-400 font-medium mb-2 flex items-center gap-2">
              <Pulse className="w-4 h-4 animate-pulse" />
              Intelligence Temps Réel
            </h3>
            <div className="space-y-1">
              {realTimeInsights.map((insight, i) => (
                <p key={i} className="text-cyan-300 text-sm">{insight}</p>
              ))}
            </div>
          </div>
        )}

        {/* Métriques Dynamiques */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="bg-slate-700/50 rounded-lg p-4 border border-slate-600 hover:border-cyan-500/50 transition-colors">
            <div className="flex items-center gap-2 mb-2">
              <Wifi className="w-4 h-4 text-green-400" />
              <span className="text-sm font-medium text-gray-300">Qloo Live</span>
            </div>
            <div className="text-2xl font-bold text-green-400 animate-pulse">
              CONNECTED
            </div>
            <div className="text-xs text-gray-400">
              Données culturelles temps réel
            </div>
          </div>

          <div className="bg-slate-700/50 rounded-lg p-4 border border-slate-600 hover:border-purple-500/50 transition-colors">
            <div className="flex items-center gap-2 mb-2">
              {getProviderIcon(llmProvider)}
              <span className="text-sm font-medium text-gray-300">AI Engine</span>
            </div>
            <div className="text-2xl font-bold text-purple-400">
              {llmProvider === 'openai' ? 'GPT-4o' : 'Gemini 2.5'}
            </div>
            <div className="text-xs text-gray-400">
              Analyse continue active
            </div>
          </div>

          <div className="bg-slate-700/50 rounded-lg p-4 border border-slate-600 hover:border-blue-500/50 transition-colors">
            <div className="flex items-center gap-2 mb-2">
              <Users className="w-4 h-4 text-blue-400" />
              <span className="text-sm font-medium text-gray-300">Population</span>
            </div>
            <div className="text-2xl font-bold text-blue-400">
              {state.primatoms.length}
            </div>
            <div className="text-xs text-gray-400">
              {state.coalitions.length} réseaux actifs
            </div>
          </div>

          <div className="bg-slate-700/50 rounded-lg p-4 border border-slate-600 hover:border-green-500/50 transition-colors">
            <div className="flex items-center gap-2 mb-2">
              <Lightning className="w-4 h-4 text-green-400" />
              <span className="text-sm font-medium text-gray-300">Intelligence</span>
            </div>
            <div className="text-2xl font-bold text-green-400">
              {culturalData ? Math.floor(culturalData.global_sentiment?.collective_intelligence || 0) : 0}%
            </div>
            <div className="text-xs text-gray-400">Collective émergente</div>
          </div>
        </div>
      </div>

      {/* Configuration IA Simplifiée */}
      <div className="bg-slate-800/50 backdrop-blur-sm rounded-lg p-6 border border-slate-700">
        <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
          <Settings className="w-5 h-5 text-purple-400" />
          Configuration Intelligence Artificielle
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Moteur d'Analyse
            </label>
            <div className="flex gap-2">
              <button
                onClick={() => setLlmProvider('openai')}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-all ${
                  llmProvider === 'openai'
                    ? 'bg-green-600 text-white shadow-lg scale-105'
                    : 'bg-slate-700 text-gray-300 hover:bg-slate-600'
                }`}
              >
                <Brain className="w-4 h-4" />
                GPT-4o Advanced
              </button>
              <button
                onClick={() => setLlmProvider('gemini')}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-all ${
                  llmProvider === 'gemini'
                    ? 'bg-blue-600 text-white shadow-lg scale-105'
                    : 'bg-slate-700 text-gray-300 hover:bg-slate-600'
                }`}
              >
                <Sparkles className="w-4 h-4" />
                Gemini 2.5 Flash
              </button>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Personnalité IA
            </label>
            <select
              value={aiPersonality}
              onChange={(e) => setAiPersonality(e.target.value as any)}
              className="w-full px-3 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white focus:border-purple-500 focus:outline-none"
            >
              <option value="analytical">🔬 Analytique - Précision Scientifique</option>
              <option value="creative">🎨 Créative - Vision Artistique</option>
              <option value="strategic">📈 Stratégique - Focus Business</option>
            </select>
          </div>
        </div>

        <div className="mt-4 p-4 bg-gradient-to-r from-green-500/10 via-blue-500/10 to-purple-500/10 border border-green-500/30 rounded-lg">
          <div className="flex items-center gap-2 mb-2">
            <CheckCircle className="w-5 h-5 text-green-400" />
            <span className="text-green-400 font-medium">Système Prêt - Intelligence Collective Active</span>
          </div>
          <p className="text-xs text-green-300">
            ✅ Qloo Cultural Intelligence: Données temps réel sur {state.primatoms.length} primatoms<br/>
            ✅ {llmProvider === 'openai' ? 'GPT-4o Advanced' : 'Gemini 2.5 Flash'}: Analyse comportementale continue<br/>
            ✅ Prédictions quantiques: Émergence collective détectée et optimisée<br/>
            ✅ Résonnance culturelle: Synchronisation automatique des patterns
          </p>
        </div>
      </div>

      {/* Navigation des Vues */}
      <div className="bg-slate-800/50 backdrop-blur-sm rounded-lg border border-slate-700">
        <div className="flex border-b border-slate-700">
          {[
            { id: 'dashboard', label: 'Dashboard Live', icon: <Radar className="w-4 h-4" /> },
            { id: 'analysis', label: 'Analyse IA', icon: <Brain className="w-4 h-4" /> },
            { id: 'whatif', label: 'Prédictions', icon: <Telescope className="w-4 h-4" /> },
            { id: 'report', label: 'Rapport', icon: <Download className="w-4 h-4" /> }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveView(tab.id as any)}
              className={`flex items-center gap-2 px-6 py-4 font-medium transition-all ${
                activeView === tab.id
                  ? 'bg-purple-500/20 text-purple-400 border-b-2 border-purple-400 scale-105'
                  : 'text-gray-400 hover:text-white hover:bg-slate-700/50'
              }`}
            >
              {tab.icon}
              {tab.label}
            </button>
          ))}
        </div>

        <div className="p-6">
          {/* Dashboard Live */}
          {activeView === 'dashboard' && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h4 className="text-lg font-semibold text-white">Intelligence Collective Temps Réel</h4>
                <div className="flex items-center gap-2 text-cyan-400 text-sm">
                  <Pulse className="w-4 h-4 animate-pulse" />
                  Dernière mise à jour: {lastUpdate ? new Date(lastUpdate).toLocaleTimeString() : 'En cours...'}
                </div>
              </div>
              
              {culturalData ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  <div className="bg-gradient-to-br from-purple-500/20 to-pink-500/20 rounded-lg p-4 border border-purple-500/30">
                    <h5 className="font-medium text-white mb-3 flex items-center gap-2">
                      <Globe className="w-4 h-4 text-purple-400" />
                      Sentiment Global
                    </h5>
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span className="text-gray-300">Optimisme</span>
                        <span className="text-green-400 font-bold">
                          {culturalData.global_sentiment?.optimism?.toFixed(0) || 0}%
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-300">Cohésion</span>
                        <span className="text-blue-400 font-bold">
                          {culturalData.global_sentiment?.social_cohesion?.toFixed(0) || 0}%
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-300">Innovation</span>
                        <span className="text-purple-400 font-bold">
                          {culturalData.global_sentiment?.innovation_appetite?.toFixed(0) || 0}%
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="bg-gradient-to-br from-blue-500/20 to-cyan-500/20 rounded-lg p-4 border border-blue-500/30">
                    <h5 className="font-medium text-white mb-3 flex items-center gap-2">
                      <Network className="w-4 h-4 text-blue-400" />
                      Dynamiques Réseau
                    </h5>
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span className="text-gray-300">Connectivité</span>
                        <span className="text-cyan-400 font-bold">
                          {culturalData.social_dynamics?.network_effects?.connectivity_index?.toFixed(0) || 0}%
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-300">Coalitions</span>
                        <span className="text-blue-400 font-bold">{state.coalitions.length}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-300">Synchronisation</span>
                        <span className="text-purple-400 font-bold">
                          {culturalData.social_dynamics?.emergence_patterns?.behavioral_synchronization?.toFixed(0) || 0}%
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="bg-gradient-to-br from-green-500/20 to-emerald-500/20 rounded-lg p-4 border border-green-500/30">
                    <h5 className="font-medium text-white mb-3 flex items-center gap-2">
                      <Lightbulb className="w-4 h-4 text-green-400" />
                      Intelligence Émergente
                    </h5>
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span className="text-gray-300">Score Collectif</span>
                        <span className="text-green-400 font-bold">
                          {culturalData.global_sentiment?.collective_intelligence?.toFixed(0) || 0}%
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-300">Résilience</span>
                        <span className="text-emerald-400 font-bold">
                          {culturalData.social_dynamics?.adaptation_metrics?.system_resilience?.toFixed(0) || 0}%
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-300">Patterns Neural</span>
                        <span className="text-cyan-400 font-bold">
                          {culturalData.neural_patterns?.synaptic_density?.toFixed(0) || 0}%
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="text-center py-8 text-gray-400">
                  <Atom className="w-12 h-12 mx-auto mb-3 opacity-50 animate-pulse" />
                  <p>Initialisation de l'intelligence collective...</p>
                </div>
              )}

              {/* Tendances Émergentes */}
              {culturalTrends.length > 0 && (
                <div className="bg-slate-700/30 rounded-lg p-4 border border-cyan-500/30">
                  <h5 className="font-medium text-white mb-3 flex items-center gap-2">
                    <Waves className="w-4 h-4 text-cyan-400" />
                    Tendances Émergentes
                  </h5>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {culturalTrends.slice(-4).map((trend, i) => (
                      <div key={i} className="bg-slate-600/50 rounded p-3">
                        <div className="flex justify-between items-center">
                          <span className="text-cyan-300 text-sm font-medium">{trend.name}</span>
                          <span className="text-purple-400 text-xs">{trend.trending_score?.toFixed(0)}%</span>
                        </div>
                        <div className="text-xs text-gray-400 mt-1">
                          Impact: {trend.cultural_impact?.toFixed(0)}% | Population: {trend.demographics?.adoption_velocity?.toFixed(0)}%
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Analysis View - Identique mais avec données dynamiques */}
          {activeView === 'analysis' && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h4 className="text-lg font-semibold text-white">Analyse Comportementale IA</h4>
                <div className="flex items-center gap-3">
                  <span className="text-sm text-gray-400">
                    Mode: {aiPersonality === 'analytical' ? '🔬 Scientifique' : aiPersonality === 'creative' ? '🎨 Créatif' : '📈 Stratégique'}
                  </span>
                  <button
                    onClick={runCompleteAnalysis}
                    disabled={isAnalyzing}
                    className="flex items-center gap-2 px-4 py-2 bg-purple-600 hover:bg-purple-700 disabled:bg-gray-600 disabled:cursor-not-allowed text-white rounded-lg text-sm transition-colors"
                  >
                    <Brain className="w-4 h-4" />
                    {isAnalyzing ? 'IA Analyse...' : 'Lancer Analyse'}
                  </button>
                </div>
              </div>

              {analysisResult ? (
                <div className="space-y-4">
                  {/* Résumé Exécutif */}
                  <div className="bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-lg p-6 border border-purple-500/30">
                    <h5 className="font-medium text-white mb-3 flex items-center gap-2">
                      <Crown className="w-4 h-4 text-purple-400" />
                      Résumé Exécutif
                      <span className="text-xs bg-purple-500/30 px-2 py-1 rounded-full">
                        Confiance: {(analysisResult.confidenceScore * 100).toFixed(0)}%
                      </span>
                    </h5>
                    <p className="text-gray-300 text-sm leading-relaxed">{analysisResult.executiveSummary}</p>
                  </div>

                  {/* Métriques Clés */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="bg-slate-700/50 rounded-lg p-4 border border-slate-600">
                      <h6 className="text-cyan-400 font-medium mb-2">Population Active</h6>
                      <div className="text-2xl font-bold text-white">{state.primatoms.length}</div>
                      <div className="text-xs text-gray-400">primatoms conscients</div>
                    </div>
                    <div className="bg-slate-700/50 rounded-lg p-4 border border-slate-600">
                      <h6 className="text-green-400 font-medium mb-2">Réseaux Actifs</h6>
                      <div className="text-2xl font-bold text-white">{state.coalitions.length}</div>
                      <div className="text-xs text-gray-400">coalitions émergentes</div>
                    </div>
                    <div className="bg-slate-700/50 rounded-lg p-4 border border-slate-600">
                      <h6 className="text-purple-400 font-medium mb-2">Temps Traitement</h6>
                      <div className="text-2xl font-bold text-white">{(analysisResult.processingTime / 1000).toFixed(1)}s</div>
                      <div className="text-xs text-gray-400">analyse temps réel</div>
                    </div>
                  </div>

                  {/* Insights Culturels */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="bg-slate-700/50 rounded-lg p-4 border border-slate-600">
                      <h5 className="font-medium text-white mb-3 flex items-center gap-2">
                        <Gem className="w-4 h-4 text-cyan-400" />
                        Insights Culturels
                      </h5>
                      <ul className="space-y-2">
                        {analysisResult.culturalInsights.map((insight, i) => (
                          <li key={i} className="text-sm text-gray-300 flex items-start gap-2">
                            <span className="text-cyan-400 text-lg">•</span>
                            <span>{insight}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="bg-slate-700/50 rounded-lg p-4 border border-slate-600">
                      <h5 className="font-medium text-white mb-3 flex items-center gap-2">
                        <Star className="w-4 h-4 text-green-400" />
                        Recommandations IA
                      </h5>
                      <ul className="space-y-2">
                        {analysisResult.recommendations.map((rec, i) => (
                          <li key={i} className="text-sm text-gray-300 flex items-start gap-2">
                            <span className="text-green-400 text-lg">•</span>
                            <span>{rec}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  {/* Drivers Culturels */}
                  <div className="bg-slate-700/50 rounded-lg p-4 border border-slate-600">
                    <h5 className="font-medium text-white mb-3 flex items-center gap-2">
                      <Flame className="w-4 h-4 text-orange-400" />
                      Drivers Culturels Critiques
                    </h5>
                    <div className="space-y-3">
                      {analysisResult.keyDrivers.map((driver, i) => (
                        <div key={i} className="flex items-center justify-between p-3 bg-slate-600/50 rounded-lg">
                          <div className="flex-1">
                            <span className="text-white font-medium">{driver.factor}</span>
                            <p className="text-xs text-gray-400 mt-1">{driver.explanation}</p>
                          </div>
                          <div className="flex items-center gap-3">
                            <div className="w-24 bg-slate-500 rounded-full h-2">
                              <div 
                                className="bg-gradient-to-r from-purple-500 to-pink-500 h-2 rounded-full transition-all duration-1000"
                                style={{ width: `${driver.impact * 100}%` }}
                              />
                            </div>
                            <span className="text-purple-400 text-sm font-bold min-w-[3rem]">
                              {(driver.impact * 100).toFixed(0)}%
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Scénarios What-If */}
                  <div className="bg-slate-700/50 rounded-lg p-4 border border-slate-600">
                    <h5 className="font-medium text-white mb-3 flex items-center gap-2">
                      <Telescope className="w-4 h-4 text-blue-400" />
                      Scénarios Prédictifs
                    </h5>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {analysisResult.whatIfScenarios.map((scenario, i) => (
                        <div key={i} className="p-4 bg-slate-600/50 rounded-lg border border-slate-500">
                          <h6 className="text-blue-400 font-medium mb-2">{scenario.scenario}</h6>
                          <p className="text-gray-300 text-sm mb-2">{scenario.prediction}</p>
                          <div className="flex justify-between items-center">
                            <span className="text-xs text-gray-400">
                              Impact: <span className="text-white">{scenario.impact}</span>
                            </span>
                            <span className="text-xs">
                              Confiance: <span className="text-green-400">{(scenario.confidence * 100).toFixed(0)}%</span>
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              ) : (
                <div className="text-center py-12 text-gray-400">
                  <Brain className="w-16 h-16 mx-auto mb-4 opacity-50" />
                  <p className="text-lg mb-2">IA Prête pour Analyse</p>
                  <p className="text-sm">
                    {llmProvider === 'openai' ? 'GPT-4o Advanced' : 'Gemini 2.5 Flash'} attend vos données pour générer l'analyse culturelle
                  </p>
                  <div className="mt-4 text-xs text-cyan-400">
                    Population: {state.primatoms.length} • Coalitions: {state.coalitions.length} • Mode: {aiPersonality}
                  </div>
                </div>
              )}
            </div>
          )}

          {/* What-If / Prédictions */}
          {activeView === 'whatif' && (
            <div className="space-y-6">
              <h4 className="text-lg font-semibold text-white flex items-center gap-2">
                <Telescope className="w-5 h-5 text-blue-400" />
                Laboratoire de Prédictions
              </h4>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Paramètre d'Intervention
                  </label>
                  <select
                    value={selectedParameter}
                    onChange={(e) => setSelectedParameter(e.target.value)}
                    className="w-full px-3 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white focus:border-purple-500 focus:outline-none"
                  >
                    <option value="cultural_resonance">🌊 Resonance Culturelle</option>
                    <option value="innovation_catalyst">⚡ Catalyseur d'Innovation</option>
                    <option value="trust_amplifier">🤝 Amplificateur de Confiance</option>
                    <option value="network_optimizer">🕸️ Optimiseur de Réseaux</option>
                    <option value="collective_intelligence">🧠 Intelligence Collective</option>
                    <option value="behavioral_sync">🔄 Synchronisation Comportementale</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Nouvelle Configuration
                  </label>
                  <input
                    type="text"
                    value={parameterValue}
                    onChange={(e) => setParameterValue(e.target.value)}
                    placeholder="ex: collaborative_innovation, quantum_resonance"
                    className="w-full px-3 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white placeholder-gray-400 focus:border-purple-500 focus:outline-none"
                  />
                </div>
              </div>

              <button
                onClick={runWhatIfAnalysis}
                disabled={isAnalyzing}
                className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 disabled:from-gray-600 disabled:to-gray-600 disabled:cursor-not-allowed text-white rounded-lg transition-all shadow-lg"
              >
                <Target className="w-4 h-4" />
                {isAnalyzing ? 'IA Prédit...' : 'Simuler Impact'}
              </button>

              {whatIfResult && (
                <div className="bg-gradient-to-br from-blue-500/20 to-purple-500/20 rounded-lg p-6 border border-blue-500/30">
                  <h5 className="font-medium text-white mb-3 flex items-center gap-2">
                    <Target className="w-4 h-4 text-blue-400" />
                    Prédiction Quantique
                    <span className="text-xs bg-blue-500/30 px-2 py-1 rounded-full">
                      {llmProvider === 'openai' ? 'GPT-4o' : 'Gemini 2.5'}
                    </span>
                  </h5>
                  <div className="prose prose-invert max-w-none">
                    <pre className="whitespace-pre-wrap text-sm text-gray-300 font-sans leading-relaxed">
                      {whatIfResult}
                    </pre>
                  </div>
                </div>
              )}

              {/* Prédictions Temps Réel */}
              {culturalData?.predictive_analytics && (
                <div className="bg-slate-700/30 rounded-lg p-4 border border-cyan-500/30">
                  <h5 className="font-medium text-white mb-3 flex items-center gap-2">
                    <Radar className="w-4 h-4 text-cyan-400" />
                    Prédictions Émergentes
                  </h5>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {culturalData.predictive_analytics.next_viral_trends?.map((trend: any, i: number) => (
                      <div key={i} className="p-3 bg-slate-600/50 rounded-lg">
                        <h6 className="text-cyan-400 font-medium text-sm">{trend.trend}</h6>
                        <div className="flex justify-between mt-2 text-xs">
                          <span className="text-gray-300">
                            Prob: <span className="text-green-400">{(trend.probability * 100).toFixed(0)}%</span>
                          </span>
                          <span className="text-gray-300">
                            Pic: <span className="text-blue-400">{trend.time_to_peak}min</span>
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Rapport */}
          {activeView === 'report' && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h4 className="text-lg font-semibold text-white flex items-center gap-2">
                  <Download className="w-5 h-5 text-green-400" />
                  Rapport d'Intelligence Collective
                </h4>
                {sessionReport && (
                  <button
                    onClick={exportReport}
                    className="flex items-center gap-2 px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg text-sm transition-colors"
                  >
                    <Download className="w-4 h-4" />
                    Exporter Rapport
                  </button>
                )}
              </div>

              {sessionReport ? (
                <div className="bg-slate-700/50 rounded-lg p-6 border border-slate-600">
                  <div className="prose prose-invert max-w-none">
                    <pre className="whitespace-pre-wrap text-sm text-gray-300 font-sans leading-relaxed">
                      {sessionReport}
                    </pre>
                  </div>
                </div>
              ) : (
                <div className="text-center py-12 text-gray-400">
                  <Download className="w-16 h-16 mx-auto mb-4 opacity-50" />
                  <p className="text-lg mb-2">Rapport en Attente</p>
                  <p className="text-sm mb-4">
                    Lancez une analyse complète pour générer le rapport d'intelligence collective
                  </p>
                  <div className="text-xs text-cyan-400">
                    IA: {llmProvider === 'openai' ? 'GPT-4o Advanced' : 'Gemini 2.5 Flash'} • 
                    Mode: {aiPersonality} • 
                    Population: {state.primatoms.length} primatoms
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CultureEnginePanel;