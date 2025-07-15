import { Primatom, Coalition, SimulationState } from '../types';

export interface QlooEntity {
  id: string;
  name: string;
  type: 'music' | 'tv' | 'film' | 'fashion' | 'dining' | 'travel' | 'brands' | 'books' | 'podcasts';
  popularity: number;
  sentiment: number;
  cultural_impact: number;
  demographics: {
    age_groups: Record<string, number>;
    regions: Record<string, number>;
    interests: string[];
  };
  affinities: string[];
  trending_score: number;
}

export interface QlooConsumerProfile {
  id: string;
  affinities: QlooEntity[];
  behavior_patterns: {
    discovery_tendency: number;
    social_influence: number;
    brand_loyalty: number;
    cultural_openness: number;
  };
  sentiment_analysis: {
    overall_mood: number;
    cultural_engagement: number;
    social_connectivity: number;
  };
  ai_predictions: {
    coalition_formation_probability: number;
    leadership_potential: number;
    disruption_resilience: number;
    viral_influence_score: number;
  };
  behavioral_insights: {
    decision_making_style: 'analytical' | 'intuitive' | 'collaborative' | 'impulsive';
    stress_response_pattern: 'fight' | 'flight' | 'freeze' | 'adapt';
    innovation_catalyst_type: 'pioneer' | 'early_adopter' | 'follower' | 'skeptic';
    social_clustering_tendency: number;
  };
}

export interface QlooTrendingData {
  timestamp: number;
  trending_entities: QlooEntity[];
  cultural_shifts: {
    emerging_trends: string[];
    declining_trends: string[];
    stable_preferences: string[];
  };
  global_sentiment: {
    optimism: number;
    social_cohesion: number;
    innovation_appetite: number;
  };
  predictive_analytics: {
    next_viral_trends: Array<{
      trend: string;
      probability: number;
      time_to_peak: number;
      affected_demographics: string[];
    }>;
    social_tension_index: number;
    collective_intelligence_score: number;
    cultural_disruption_likelihood: number;
  };
  market_implications: {
    consumer_behavior_shifts: string[];
    investment_opportunities: string[];
    risk_factors: string[];
  };
}

export interface QlooRecommendation {
  entity: QlooEntity;
  confidence: number;
  reasoning: string;
  cultural_context: string;
  predicted_adoption: number;
  strategic_value: {
    coalition_strengthening_factor: number;
    network_effect_multiplier: number;
    competitive_advantage_score: number;
    market_timing_index: number;
  };
  behavioral_triggers: {
    primary_motivator: string;
    resistance_factors: string[];
    optimal_introduction_strategy: string;
  };
}

class QlooAPIService {
  private apiKey: string;
  private baseUrl: string = 'https://api.qloo.com';
  private hackathonUrl: string = 'https://hackathon.api.qloo.com';
  private cache: Map<string, any> = new Map();
  private cacheTimeout: number = 300000; // 5 minutes
  private connectionTested: boolean = false;
  private isConnected: boolean = false;
  
  constructor() {
    this.apiKey = import.meta.env.VITE_QLOO_API_KEY || '';
    
    if (!this.apiKey) {
      console.warn('⚠️ Qloo API key not found. Using advanced simulation mode.');
      this.isConnected = false;
    }
  }

  // Test de connexion avec les vrais endpoints Qloo
  async testConnection(): Promise<boolean> {
    if (!this.apiKey) {
      console.log('🔧 No API key - Using simulation mode');
      this.isConnected = false;
      return false;
    }

    const endpoints = [
      `${this.hackathonUrl}/v1/cultural/insights`,
      `${this.hackathonUrl}/cultural/insights`,
      `${this.baseUrl}/v1/cultural/insights`,
      `${this.baseUrl}/cultural/insights`,
      `${this.hackathonUrl}/insights`,
      `${this.baseUrl}/insights`
    ];

    for (const endpoint of endpoints) {
      try {
        console.log(`🔍 Testing endpoint: ${endpoint}`);
        
        const response = await fetch(endpoint, {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${this.apiKey}`,
            'X-API-Key': this.apiKey,
            'Content-Type': 'application/json',
            'Accept': 'application/json'
          },
          timeout: 5000
        });

        console.log(`📡 Response status: ${response.status}`);
        
        if (response.ok) {
          const data = await response.json();
          console.log('✅ Qloo API connected successfully!', { endpoint, data: data });
          this.isConnected = true;
          this.connectionTested = true;
          return true;
        } else {
          const errorText = await response.text();
          console.log(`❌ Endpoint failed: ${endpoint} - ${response.status} - ${errorText}`);
        }
      } catch (error) {
        console.log(`❌ Connection error for ${endpoint}:`, error);
      }
    }

    console.log('🔧 All endpoints failed - Using simulation mode');
    this.isConnected = false;
    this.connectionTested = true;
    return false;
  }

  private async makeRequest(endpoint: string, params: Record<string, any> = {}): Promise<any> {
    if (!this.isConnected) {
      throw new Error('Qloo API not connected - using simulation mode');
    }

    const cacheKey = `${endpoint}-${JSON.stringify(params)}`;
    const cached = this.cache.get(cacheKey);
    
    if (cached && Date.now() - cached.timestamp < this.cacheTimeout) {
      console.log('📦 Using cached data for:', endpoint);
      return cached.data;
    }

    const urls = [
      `${this.hackathonUrl}${endpoint}`,
      `${this.baseUrl}${endpoint}`
    ];

    for (const url of urls) {
      try {
        const queryParams = new URLSearchParams(params).toString();
        const fullUrl = `${url}${queryParams ? `?${queryParams}` : ''}`;
        
        console.log(`🚀 Making request to: ${fullUrl}`);
        
        const response = await fetch(fullUrl, {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${this.apiKey}`,
            'X-API-Key': this.apiKey,
            'Content-Type': 'application/json',
            'Accept': 'application/json'
          },
          timeout: 10000
        });

        if (response.ok) {
          const data = await response.json();
          console.log('✅ Request successful:', { url, data });
          
          // Cache the response
          this.cache.set(cacheKey, {
            data,
            timestamp: Date.now()
          });

          return data;
        } else {
          const errorText = await response.text();
          console.log(`❌ Request failed: ${url} - ${response.status} - ${errorText}`);
        }
      } catch (error) {
        console.log(`❌ Request error for ${url}:`, error);
      }
    }

    throw new Error('All Qloo API endpoints failed');
  }

  async getGlobalTrends(): Promise<QlooTrendingData> {
    try {
      // Test connection first
      if (!this.connectionTested) {
        await this.testConnection();
      }

      if (!this.isConnected) {
        console.log('🔧 Using advanced simulation for global trends');
        return this.getAdvancedMockTrendingData();
      }

      // Try different endpoints for cultural insights
      const endpoints = [
        '/v1/cultural/insights',
        '/cultural/insights',
        '/insights',
        '/v1/insights'
      ];

      for (const endpoint of endpoints) {
        try {
          const response = await this.makeRequest(endpoint, {
            'limit': '50',
            'type': 'trending',
            'category': 'all'
          });

          console.log('📊 Processing Qloo trends data:', response);
          return this.transformQlooToTrendingData(response);
        } catch (error) {
          console.log(`❌ Endpoint ${endpoint} failed:`, error);
          continue;
        }
      }

      throw new Error('All trending endpoints failed');
    } catch (error) {
      console.error('❌ Failed to fetch global trends:', error);
      console.log('🔧 Falling back to advanced simulation');
      return this.getAdvancedMockTrendingData();
    }
  }

  async generateCulturalProfile(primatom: Primatom): Promise<QlooConsumerProfile> {
    try {
      if (!this.isConnected) {
        return this.getAdvancedMockCulturalProfile(primatom);
      }

      // Try to get personalized recommendations
      const endpoints = [
        '/v1/recommendations',
        '/recommendations',
        '/v1/cultural/profile',
        '/cultural/profile'
      ];

      for (const endpoint of endpoints) {
        try {
          const response = await this.makeRequest(endpoint, {
            'user_id': primatom.id,
            'behavior_type': primatom.behaviorType,
            'innovation_score': Math.round(primatom.innovation),
            'cooperation_score': Math.round(primatom.cooperation),
            'trust_score': Math.round(primatom.trust),
            'limit': '10'
          });

          console.log('👤 Processing cultural profile:', response);
          return this.transformQlooToCulturalProfile(response, primatom);
        } catch (error) {
          console.log(`❌ Profile endpoint ${endpoint} failed:`, error);
          continue;
        }
      }

      throw new Error('All profile endpoints failed');
    } catch (error) {
      console.error('❌ Failed to generate cultural profile:', error);
      return this.getAdvancedMockCulturalProfile(primatom);
    }
  }

  async getCoalitionRecommendations(coalition: Coalition, primatoms: Primatom[]): Promise<QlooRecommendation[]> {
    try {
      if (!this.isConnected) {
        return this.getAdvancedMockRecommendations(coalition);
      }

      const coalitionMembers = primatoms.filter(p => coalition.members.includes(p.id));
      const avgInnovation = coalitionMembers.reduce((sum, p) => sum + p.innovation, 0) / coalitionMembers.length;
      const avgCooperation = coalitionMembers.reduce((sum, p) => sum + p.cooperation, 0) / coalitionMembers.length;

      const endpoints = [
        '/v1/group/recommendations',
        '/group/recommendations',
        '/v1/recommendations',
        '/recommendations'
      ];

      for (const endpoint of endpoints) {
        try {
          const response = await this.makeRequest(endpoint, {
            'group_id': coalition.id,
            'group_size': coalition.members.length,
            'cohesion_score': Math.round(coalition.cohesion),
            'innovation_avg': Math.round(avgInnovation),
            'cooperation_avg': Math.round(avgCooperation),
            'limit': '5'
          });

          console.log('🤝 Processing coalition recommendations:', response);
          return this.transformQlooToRecommendations(response, coalition);
        } catch (error) {
          console.log(`❌ Coalition endpoint ${endpoint} failed:`, error);
          continue;
        }
      }

      throw new Error('All coalition endpoints failed');
    } catch (error) {
      console.error('❌ Failed to get coalition recommendations:', error);
      return this.getAdvancedMockRecommendations(coalition);
    }
  }

  // Transformation des données Qloo réelles
  private transformQlooToTrendingData(qlooData: any): QlooTrendingData {
    console.log('🔄 Transforming Qloo data to trending format');
    
    // Adapter selon la structure réelle des données Qloo
    const entities = (qlooData.results || qlooData.data || qlooData.trends || []).slice(0, 10).map((item: any) => ({
      id: item.id || `entity-${Math.random()}`,
      name: item.name || item.title || item.label || 'Cultural Trend',
      type: this.mapQlooTypeToEntityType(item.type || item.category),
      popularity: item.popularity || item.score || item.affinity || Math.random() * 100,
      sentiment: item.sentiment || item.mood || 75 + Math.random() * 25,
      cultural_impact: item.cultural_impact || item.influence || item.popularity || Math.random() * 100,
      demographics: item.demographics || { age_groups: {}, regions: {}, interests: [] },
      affinities: item.affinities || item.related || [],
      trending_score: item.trending_score || item.velocity || Math.random() * 100
    }));

    return {
      timestamp: Date.now(),
      trending_entities: entities,
      cultural_shifts: {
        emerging_trends: this.extractEmergingTrends(qlooData),
        declining_trends: ['Traditional Media Consumption', 'Rigid Brand Loyalty'],
        stable_preferences: ['Authentic Experiences', 'Social Connection', 'Personal Growth']
      },
      global_sentiment: {
        optimism: this.calculateSentimentScore(qlooData, 'optimism'),
        social_cohesion: this.calculateSentimentScore(qlooData, 'cohesion'),
        innovation_appetite: this.calculateSentimentScore(qlooData, 'innovation')
      },
      predictive_analytics: {
        next_viral_trends: this.generateViralTrendPredictions(entities),
        social_tension_index: Math.random() * 40 + 10,
        collective_intelligence_score: Math.random() * 30 + 70,
        cultural_disruption_likelihood: Math.random() * 40 + 30
      },
      market_implications: {
        consumer_behavior_shifts: this.extractBehaviorShifts(qlooData),
        investment_opportunities: this.extractInvestmentOpportunities(entities),
        risk_factors: ['Cultural Fragmentation', 'Trend Volatility', 'Generational Gaps']
      }
    };
  }

  private transformQlooToCulturalProfile(qlooData: any, primatom: Primatom): QlooConsumerProfile {
    const recommendations = qlooData.recommendations || qlooData.results || qlooData.data || [];
    
    return {
      id: primatom.id,
      affinities: recommendations.slice(0, 5).map((item: any) => ({
        id: item.id || `affinity-${Math.random()}`,
        name: item.name || item.title || 'Cultural Affinity',
        type: this.mapQlooTypeToEntityType(item.type),
        popularity: item.popularity || item.score || Math.random() * 100,
        sentiment: item.sentiment || 75,
        cultural_impact: item.cultural_impact || Math.random() * 100,
        demographics: { age_groups: {}, regions: {}, interests: [] },
        affinities: [],
        trending_score: item.trending_score || Math.random() * 100
      })),
      behavior_patterns: {
        discovery_tendency: primatom.innovation,
        social_influence: primatom.influence || 50,
        brand_loyalty: primatom.trust,
        cultural_openness: primatom.cooperation
      },
      sentiment_analysis: {
        overall_mood: 100 - (primatom.stressLevel || 0),
        cultural_engagement: primatom.energy,
        social_connectivity: primatom.cooperation
      },
      ai_predictions: {
        coalition_formation_probability: this.calculateCoalitionProbability(primatom),
        leadership_potential: this.calculateLeadershipPotential(primatom),
        disruption_resilience: this.calculateResilienceIndex(primatom),
        viral_influence_score: this.calculateViralPotential(primatom)
      },
      behavioral_insights: {
        decision_making_style: this.determineDecisionStyle(primatom),
        stress_response_pattern: this.determineStressResponse(primatom),
        innovation_catalyst_type: this.determineInnovationType(primatom),
        social_clustering_tendency: this.calculateClusteringTendency(primatom)
      }
    };
  }

  private transformQlooToRecommendations(qlooData: any, coalition: Coalition): QlooRecommendation[] {
    const recommendations = qlooData.recommendations || qlooData.results || qlooData.data || [];
    
    return recommendations.slice(0, 3).map((item: any) => ({
      entity: {
        id: item.id || `rec-${Math.random()}`,
        name: item.name || item.title || 'Strategic Recommendation',
        type: this.mapQlooTypeToEntityType(item.type),
        popularity: item.popularity || Math.random() * 100,
        sentiment: item.sentiment || 80,
        cultural_impact: item.cultural_impact || Math.random() * 100,
        demographics: { age_groups: {}, regions: {}, interests: [] },
        affinities: [],
        trending_score: item.trending_score || Math.random() * 100
      },
      confidence: item.confidence || Math.random() * 0.3 + 0.7,
      reasoning: item.reasoning || `Optimized for coalition's behavioral dynamics and cultural preferences`,
      cultural_context: item.cultural_context || 'Next-generation collaborative framework',
      predicted_adoption: item.predicted_adoption || Math.random() * 0.3 + 0.6,
      strategic_value: {
        coalition_strengthening_factor: Math.random() * 20 + 80,
        network_effect_multiplier: Math.random() * 1.5 + 1.5,
        competitive_advantage_score: Math.random() * 20 + 70,
        market_timing_index: Math.random() * 20 + 75
      },
      behavioral_triggers: {
        primary_motivator: 'Collective achievement amplification',
        resistance_factors: ['Change adaptation complexity', 'Individual autonomy concerns'],
        optimal_introduction_strategy: 'Gradual integration with success milestones'
      }
    }));
  }

  // Méthodes utilitaires pour transformation des données
  private mapQlooTypeToEntityType(qlooType: string): QlooEntity['type'] {
    const typeMap: Record<string, QlooEntity['type']> = {
      'music': 'music',
      'artist': 'music',
      'song': 'music',
      'tv': 'tv',
      'show': 'tv',
      'movie': 'film',
      'film': 'film',
      'fashion': 'fashion',
      'style': 'fashion',
      'food': 'dining',
      'restaurant': 'dining',
      'dining': 'dining',
      'travel': 'travel',
      'destination': 'travel',
      'brand': 'brands',
      'product': 'brands',
      'book': 'books',
      'podcast': 'podcasts'
    };
    
    return typeMap[qlooType?.toLowerCase()] || 'brands';
  }

  private extractEmergingTrends(qlooData: any): string[] {
    const trends = qlooData.emerging_trends || qlooData.trends || [];
    if (trends.length > 0) {
      return trends.slice(0, 5).map((trend: any) => trend.name || trend.title || trend);
    }
    
    return [
      'AI-Augmented Creative Collaboration',
      'Sustainable Cultural Consumption',
      'Cross-Cultural Digital Communities',
      'Personalized Cultural Curation',
      'Immersive Social Experiences'
    ];
  }

  private calculateSentimentScore(qlooData: any, type: string): number {
    const sentiment = qlooData.sentiment || qlooData.global_sentiment || {};
    return sentiment[type] || (Math.random() * 30 + 60);
  }

  private generateViralTrendPredictions(entities: QlooEntity[]): Array<{trend: string, probability: number, time_to_peak: number, affected_demographics: string[]}> {
    return entities.slice(0, 3).map(entity => ({
      trend: `${entity.name} Cultural Movement`,
      probability: Math.random() * 0.4 + 0.6,
      time_to_peak: Math.floor(Math.random() * 90 + 30),
      affected_demographics: ['digital_natives', 'early_adopters', 'cultural_leaders']
    }));
  }

  private extractBehaviorShifts(qlooData: any): string[] {
    return [
      'Increased demand for authentic cultural experiences',
      'Shift towards collaborative consumption models',
      'Growing preference for personalized content curation',
      'Rise of cross-cultural appreciation and fusion'
    ];
  }

  private extractInvestmentOpportunities(entities: QlooEntity[]): string[] {
    return [
      'Cultural prediction and analytics platforms',
      'Cross-cultural collaboration tools',
      'Personalized cultural experience services',
      'Social dynamics optimization systems'
    ];
  }

  // Méthodes de calcul pour profils comportementaux
  private calculateCoalitionProbability(primatom: Primatom): number {
    const baseScore = (primatom.cooperation * 0.4 + primatom.trust * 0.3 + (100 - (primatom.stressLevel || 0)) * 0.3);
    const behaviorModifier = primatom.behaviorType === 'leader' ? 1.2 : 
                           primatom.behaviorType === 'mediator' ? 1.15 : 1.0;
    return Math.min(98, baseScore * behaviorModifier);
  }

  private calculateLeadershipPotential(primatom: Primatom): number {
    const charisma = primatom.influence || 50;
    const innovation = primatom.innovation;
    const stability = 100 - (primatom.stressLevel || 0);
    return (charisma * 0.4 + innovation * 0.35 + stability * 0.25);
  }

  private calculateResilienceIndex(primatom: Primatom): number {
    const adaptability = primatom.cooperation;
    const stability = 100 - (primatom.stressLevel || 0);
    const innovation = primatom.innovation;
    const trust = primatom.trust;
    return (adaptability * 0.3 + stability * 0.25 + innovation * 0.25 + trust * 0.2);
  }

  private calculateViralPotential(primatom: Primatom): number {
    const influence = primatom.influence || 50;
    const energy = primatom.energy;
    const innovation = primatom.innovation;
    const cooperation = primatom.cooperation;
    return (influence * 0.35 + energy * 0.25 + innovation * 0.25 + cooperation * 0.15);
  }

  private determineDecisionStyle(primatom: Primatom): 'analytical' | 'intuitive' | 'collaborative' | 'impulsive' {
    const innovation = primatom.innovation;
    const cooperation = primatom.cooperation;
    const stress = primatom.stressLevel || 0;
    
    if (cooperation > 75 && innovation > 60) return 'collaborative';
    if (innovation > 80 && stress < 30) return 'analytical';
    if (stress > 60 || primatom.energy > 85) return 'impulsive';
    return 'intuitive';
  }

  private determineStressResponse(primatom: Primatom): 'fight' | 'flight' | 'freeze' | 'adapt' {
    const stress = primatom.stressLevel || 0;
    const cooperation = primatom.cooperation;
    const innovation = primatom.innovation;
    
    if (cooperation > 70 && innovation > 60) return 'adapt';
    if (primatom.behaviorType === 'leader' && stress < 50) return 'fight';
    if (stress > 70 && primatom.energy < 40) return 'freeze';
    return 'flight';
  }

  private determineInnovationType(primatom: Primatom): 'pioneer' | 'early_adopter' | 'follower' | 'skeptic' {
    const innovation = primatom.innovation;
    const trust = primatom.trust;
    
    if (innovation > 80 && primatom.behaviorType === 'innovator') return 'pioneer';
    if (innovation > 65 && trust > 60) return 'early_adopter';
    if (primatom.cooperation > 70 && trust > 50) return 'follower';
    return 'skeptic';
  }

  private calculateClusteringTendency(primatom: Primatom): number {
    const cooperation = primatom.cooperation;
    const trust = primatom.trust;
    const influence = primatom.influence || 50;
    const stress = primatom.stressLevel || 0;
    
    return (cooperation * 0.4 + trust * 0.3 + influence * 0.2 + (100 - stress) * 0.1);
  }

  // Données de simulation avancées (fallback)
  private getAdvancedMockTrendingData(): QlooTrendingData {
    return {
      timestamp: Date.now(),
      trending_entities: [
        {
          id: 'trend-ai-collab',
          name: 'AI-Human Creative Collaboration',
          type: 'brands',
          popularity: 89,
          sentiment: 82,
          cultural_impact: 94,
          demographics: { age_groups: { '18-34': 65, '35-54': 25 }, regions: {}, interests: [] },
          affinities: ['innovation', 'creativity', 'technology'],
          trending_score: 95
        },
        {
          id: 'trend-sustainable',
          name: 'Sustainable Cultural Experiences',
          type: 'travel',
          popularity: 76,
          sentiment: 88,
          cultural_impact: 81,
          demographics: { age_groups: { '25-44': 55, '18-34': 35 }, regions: {}, interests: [] },
          affinities: ['sustainability', 'authenticity', 'community'],
          trending_score: 87
        }
      ],
      cultural_shifts: {
        emerging_trends: [
          'AI-Augmented Collective Decision Making',
          'Hybrid Digital-Physical Social Spaces',
          'Cross-Cultural Collaboration Platforms',
          'Personalized Cultural Curation',
          'Sustainable Experience Economy'
        ],
        declining_trends: ['Passive Content Consumption', 'Rigid Cultural Boundaries', 'One-Size-Fits-All Experiences'],
        stable_preferences: ['Authentic Connections', 'Personal Growth', 'Community Belonging', 'Creative Expression']
      },
      global_sentiment: {
        optimism: 78,
        social_cohesion: 72,
        innovation_appetite: 87
      },
      predictive_analytics: {
        next_viral_trends: [
          { trend: "Collective Intelligence Platforms", probability: 0.91, time_to_peak: 30, affected_demographics: ['tech_leaders', 'innovators'] },
          { trend: "Cultural Fusion Experiences", probability: 0.84, time_to_peak: 60, affected_demographics: ['millennials', 'gen_z'] },
          { trend: "AI-Curated Personal Growth", probability: 0.76, time_to_peak: 90, affected_demographics: ['professionals', 'lifelong_learners'] }
        ],
        social_tension_index: 23,
        collective_intelligence_score: 84,
        cultural_disruption_likelihood: 67
      },
      market_implications: {
        consumer_behavior_shifts: [
          'Demand for transparent and ethical AI systems',
          'Preference for collaborative over competitive experiences',
          'Increased value placed on cultural authenticity',
          'Growing expectation for personalized cultural journeys'
        ],
        investment_opportunities: [
          'Cultural prediction and analytics platforms',
          'AI-powered collaborative creativity tools',
          'Cross-cultural experience platforms',
          'Sustainable cultural tourism technologies'
        ],
        risk_factors: [
          'Cultural homogenization through AI algorithms',
          'Privacy concerns in cultural profiling',
          'Digital divide in cultural access',
          'Authenticity vs. commercialization tensions'
        ]
      }
    };
  }

  private getAdvancedMockCulturalProfile(primatom: Primatom): QlooConsumerProfile {
    return {
      id: primatom.id,
      affinities: [
        {
          id: 'affinity-creative',
          name: 'Creative Collaboration Tools',
          type: 'brands',
          popularity: 85,
          sentiment: 80,
          cultural_impact: 90,
          demographics: { age_groups: {}, regions: {}, interests: [] },
          affinities: [],
          trending_score: 88
        }
      ],
      behavior_patterns: {
        discovery_tendency: primatom.innovation,
        social_influence: primatom.influence || 50,
        brand_loyalty: primatom.trust,
        cultural_openness: primatom.cooperation
      },
      sentiment_analysis: {
        overall_mood: 100 - (primatom.stressLevel || 0),
        cultural_engagement: primatom.energy,
        social_connectivity: primatom.cooperation
      },
      ai_predictions: {
        coalition_formation_probability: this.calculateCoalitionProbability(primatom),
        leadership_potential: this.calculateLeadershipPotential(primatom),
        disruption_resilience: this.calculateResilienceIndex(primatom),
        viral_influence_score: this.calculateViralPotential(primatom)
      },
      behavioral_insights: {
        decision_making_style: this.determineDecisionStyle(primatom),
        stress_response_pattern: this.determineStressResponse(primatom),
        innovation_catalyst_type: this.determineInnovationType(primatom),
        social_clustering_tendency: this.calculateClusteringTendency(primatom)
      }
    };
  }

  private getAdvancedMockRecommendations(coalition: Coalition): QlooRecommendation[] {
    return [{
      entity: {
        id: 'rec-adaptive-framework',
        name: 'Adaptive Collaboration Framework',
        type: 'brands',
        popularity: 91,
        sentiment: 88,
        cultural_impact: 95,
        demographics: { age_groups: {}, regions: {}, interests: [] },
        affinities: [],
        trending_score: 93
      },
      confidence: 0.94,
      reasoning: `AI-optimized for coalition size ${coalition.members.length} with cultural dynamics analysis`,
      cultural_context: 'Next-generation collaborative intelligence paradigm',
      predicted_adoption: 0.89,
      strategic_value: {
        coalition_strengthening_factor: 96,
        network_effect_multiplier: 2.7,
        competitive_advantage_score: 92,
        market_timing_index: 94
      },
      behavioral_triggers: {
        primary_motivator: 'Exponential collective growth through cultural alignment',
        resistance_factors: ['Integration complexity', 'Cultural adaptation challenges'],
        optimal_introduction_strategy: 'Pilot program with cultural validation and measurable impact demonstrations'
      }
    }];
  }

  // Méthodes d'analyse culturelle existantes (conservées)
  async analyzeCulturalImpact(disruptionType: string, intensity: number): Promise<{
    cultural_shift_prediction: number;
    affected_demographics: string[];
    sentiment_impact: number;
    trend_acceleration: string[];
  }> {
    try {
      if (this.isConnected) {
        const response = await this.makeRequest('/v1/cultural/impact', {
          'disruption_type': disruptionType,
          'intensity': intensity,
          'analysis_depth': 'comprehensive'
        });
        
        return {
          cultural_shift_prediction: response.shift_prediction || intensity * 12,
          affected_demographics: response.demographics || ['digital_natives', 'early_adopters'],
          sentiment_impact: response.sentiment_impact || -intensity * 3,
          trend_acceleration: response.accelerated_trends || ['Adaptive Leadership', 'Resilient Communities']
        };
      }
    } catch (error) {
      console.log('❌ Cultural impact analysis failed, using simulation');
    }
    
    return {
      cultural_shift_prediction: intensity * 12 + Math.random() * 15,
      affected_demographics: ['digital_natives', 'early_adopters', 'cultural_leaders'],
      sentiment_impact: -intensity * 3 + Math.random() * 10,
      trend_acceleration: ['Adaptive Leadership', 'Resilient Communities', 'Innovation Networks']
    };
  }

  async detectCulturalAffinities(primatom1: Primatom, primatom2: Primatom): Promise<{
    affinity_score: number;
    shared_interests: string[];
    cultural_compatibility: number;
    recommendation_overlap: number;
  }> {
    try {
      if (this.isConnected) {
        const response = await this.makeRequest('/v1/cultural/affinities', {
          'user1_profile': {
            'behavior_type': primatom1.behaviorType,
            'innovation': primatom1.innovation,
            'cooperation': primatom1.cooperation,
            'trust': primatom1.trust
          },
          'user2_profile': {
            'behavior_type': primatom2.behaviorType,
            'innovation': primatom2.innovation,
            'cooperation': primatom2.cooperation,
            'trust': primatom2.trust
          }
        });
        
        return {
          affinity_score: response.affinity_score || this.calculateBasicAffinity(primatom1, primatom2),
          shared_interests: response.shared_interests || ['Collaborative Innovation'],
          cultural_compatibility: response.compatibility || this.calculateBasicAffinity(primatom1, primatom2),
          recommendation_overlap: response.overlap || 0.75
        };
      }
    } catch (error) {
      console.log('❌ Cultural affinities detection failed, using simulation');
    }
    
    const affinity = this.calculateBasicAffinity(primatom1, primatom2);
    const sharedPatterns = this.identifySharedPatterns(primatom1, primatom2);
    
    return {
      affinity_score: affinity + (sharedPatterns.length * 5),
      shared_interests: sharedPatterns,
      cultural_compatibility: affinity + (sharedPatterns.length * 8),
      recommendation_overlap: (sharedPatterns.length / 3) * 100
    };
  }

  private calculateBasicAffinity(primatom1: Primatom, primatom2: Primatom): number {
    const behaviorCompatibility = this.getBehaviorCompatibility(primatom1.behaviorType, primatom2.behaviorType);
    const innovationSimilarity = 100 - Math.abs(primatom1.innovation - primatom2.innovation);
    const cooperationSimilarity = 100 - Math.abs(primatom1.cooperation - primatom2.cooperation);
    return (behaviorCompatibility + innovationSimilarity + cooperationSimilarity) / 3;
  }

  private identifySharedPatterns(primatom1: Primatom, primatom2: Primatom): string[] {
    const patterns: string[] = [];
    
    if (Math.abs(primatom1.innovation - primatom2.innovation) < 20) {
      patterns.push('Innovation Synchrony');
    }
    if (Math.abs(primatom1.cooperation - primatom2.cooperation) < 15) {
      patterns.push('Collaboration Alignment');
    }
    if (primatom1.behaviorType === primatom2.behaviorType) {
      patterns.push('Behavioral Resonance');
    }
    
    return patterns;
  }

  private getBehaviorCompatibility(type1: string, type2: string): number {
    const compatibilityMatrix: Record<string, Record<string, number>> = {
      leader: { leader: 25, follower: 85, innovator: 65, mediator: 75, explorer: 55 },
      follower: { leader: 85, follower: 70, innovator: 50, mediator: 80, explorer: 60 },
      innovator: { leader: 65, follower: 50, innovator: 80, mediator: 70, explorer: 90 },
      mediator: { leader: 75, follower: 80, innovator: 70, mediator: 85, explorer: 65 },
      explorer: { leader: 55, follower: 60, innovator: 90, mediator: 65, explorer: 75 }
    };
    return compatibilityMatrix[type1]?.[type2] || 50;
  }
}

export const qlooService = new QlooAPIService();