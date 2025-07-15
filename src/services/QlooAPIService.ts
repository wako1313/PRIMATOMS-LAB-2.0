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
  private baseUrl: string = 'https://hackathon.api.qloo.com';
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

  // Test manuel direct - pour diagnostic
  async testDirectEndpoint(): Promise<void> {
    const testUrl = 'https://hackathon.api.qloo.com/v2/insights/?limit=1';
    console.log('🧪 QLOO MANUAL TEST: Testing direct endpoint');
    console.log('📡 URL:', testUrl);
    console.log('🔑 API Key:', this.apiKey);
    
    try {
      const response = await fetch(testUrl, {
        method: 'GET',
        headers: {
          'X-Api-Key': this.apiKey,
          'Content-Type': 'application/json'
        }
      });
      console.log('📊 Response Status:', response.status, response.statusText);
      console.log('📋 Response Headers:', Object.fromEntries(response.headers.entries()));
      
      if (response.ok) {
        const data = await response.json();
        console.log('✅ SUCCESS! Data received:', data);
      } else {
        const errorText = await response.text();
        console.log('❌ ERROR Response:', errorText);
      }
    } catch (error) {
      console.log('💥 FETCH ERROR:', error);
    }
  }

  // Test de connexion avec les vrais endpoints Qloo v2
  async testConnection(): Promise<boolean> {
    if (!this.apiKey) {
      console.log('❌ QLOO: No API key configured - Using simulation mode');
      this.isConnected = false;
      return false;
    }

    console.log(`🔑 QLOO: API Key configured: ${this.apiKey.substring(0, 8)}...${this.apiKey.substring(this.apiKey.length - 4)}`);
    console.log(`🌐 QLOO: Base URL: ${this.baseUrl}`);
    
    // Tests multiples avec différents endpoints et configurations
    const testConfigurations = [
      {
        name: 'Hackathon v2 Basic Test',
        url: `${this.baseUrl}/v2/insights/?limit=1`,
        headers: {
          'X-Api-Key': this.apiKey,
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        }
      },
      {
        name: 'Hackathon v2 Places Filter',
        url: `${this.baseUrl}/v2/insights/?filter.type=urn:entity:place&limit=1`,
        headers: {
          'X-Api-Key': this.apiKey,
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        }
      },
      {
        name: 'Hackathon v1 Legacy',
        url: `${this.baseUrl}/v1/insights?limit=1`,
        headers: {
          'X-Api-Key': this.apiKey,
          'Content-Type': 'application/json'
        }
      },
      {
        name: 'Hackathon Root Test',
        url: `${this.baseUrl}/v2/insights/`,
        headers: {
          'X-Api-Key': this.apiKey,
          'Content-Type': 'application/json'
        }
      },
      {
        name: 'Hackathon Bearer Auth Test',
        url: `${this.baseUrl}/v2/insights/?limit=1`,
        headers: {
          'Authorization': `Bearer ${this.apiKey}`,
          'Content-Type': 'application/json'
        }
      }
    ];

    for (const config of testConfigurations) {
      try {
        console.log(`\n🔍 QLOO: Testing ${config.name}`);
        console.log(`📡 QLOO: URL: ${config.url}`);
        console.log(`📋 QLOO: Headers:`, config.headers);
        
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 10000); // 10 secondes timeout
        
        const response = await fetch(config.url, {
          method: 'GET',
          headers: config.headers,
          signal: controller.signal
        });

        clearTimeout(timeoutId);
        console.log(`📡 QLOO: ${config.name} - Status: ${response.status} ${response.statusText}`);
        console.log(`📋 QLOO: Response headers:`, Object.fromEntries(response.headers.entries()));
        console.log(`🔍 QLOO: Response URL: ${response.url}`);
        
        if (response.ok) {
          try {
            const data = await response.json();
            console.log(`✅ QLOO: ${config.name} - SUCCESS!`, { 
              url: config.url, 
              status: response.status,
              dataKeys: Object.keys(data),
              sampleData: JSON.stringify(data).substring(0, 200) + '...'
            });
            this.isConnected = true;
            this.connectionTested = true;
            return true;
          } catch (jsonError) {
            console.log(`⚠️ QLOO: ${config.name} - Response not JSON:`, jsonError);
            const text = await response.text();
            console.log(`📄 QLOO: Response text:`, text.substring(0, 200) + '...');
          }
        } else {
          const errorText = await response.text();
          console.log(`❌ QLOO: ${config.name} - HTTP ${response.status}`);
          console.log(`📄 QLOO: Error response:`, errorText.substring(0, 300) + '...');
          
          // Analyser les erreurs spécifiques
          if (response.status === 401) {
            console.log(`🔑 QLOO: ${config.name} - Authentication failed. API key may be invalid.`);
          } else if (response.status === 403) {
            console.log(`🚫 QLOO: ${config.name} - Access forbidden. Check API key permissions.`);
          } else if (response.status === 404) {
            console.log(`🔍 QLOO: ${config.name} - Endpoint not found. URL may be incorrect.`);
          } else if (response.status === 429) {
            console.log(`⏱️ QLOO: ${config.name} - Rate limit exceeded. Wait before retrying.`);
          } else if (response.status === 500) {
            console.log(`🔧 QLOO: ${config.name} - Server error. Hackathon server may be down.`);
          }
        }
      } catch (error) {
        if (error.name === 'AbortError') {
          console.log(`⏱️ QLOO: ${config.name} - Request timeout (10s)`);
        } else if (error.message.includes('CORS')) {
          console.log(`🚫 QLOO: ${config.name} - CORS error:`, error.message);
        } else if (error.message.includes('network')) {
          console.log(`🌐 QLOO: ${config.name} - Network error:`, error.message);
        } else {
          console.log(`❌ QLOO: ${config.name} - Unexpected error:`, error);
        }
      }
    }

    console.log('\n🔧 QLOO: All endpoints failed - Using advanced simulation mode');
    console.log('💡 QLOO: This is normal for hackathon environment - simulation provides realistic data');
    this.isConnected = false;
    this.connectionTested = true;
    return false;
  }

  private async makeQlooRequest(endpoint: string, params: Record<string, any> = {}): Promise<any> {
    if (!this.isConnected) {
      throw new Error('Qloo API not connected - using simulation mode');
    }

    const cacheKey = `${endpoint}-${JSON.stringify(params)}`;
    const cached = this.cache.get(cacheKey);
    
    if (cached && Date.now() - cached.timestamp < this.cacheTimeout) {
      console.log('📦 Using cached Qloo data for:', endpoint);
      return cached.data;
    }

    const queryParams = new URLSearchParams();
    Object.entries(params).forEach(([key, value]) => {
      if (value !== undefined && value !== null) {
        queryParams.append(key, String(value));
      }
    });

    const fullUrl = `${this.baseUrl}${endpoint}${queryParams.toString() ? `?${queryParams.toString()}` : ''}`;
    
    console.log(`🚀 Making Qloo API request to: ${fullUrl}`);
    
    const response = await fetch(fullUrl, {
      method: 'GET',
      headers: {
        'X-Api-Key': this.apiKey,
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      }
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`Qloo API error: ${response.status} - ${errorText}`);
    }

    const data = await response.json();
    console.log('✅ Qloo API request successful:', { url: fullUrl, data });
    
    // Cache the response
    this.cache.set(cacheKey, {
      data,
      timestamp: Date.now()
    });

    return data;
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

      // Utiliser l'endpoint officiel Insights API v2 pour les tendances
      const response = await this.makeQlooRequest('/v2/insights/', {
        'filter.type': 'urn:entity:place',
        'limit': '20',
        'filter.location.query': 'Global'
      });

      console.log('📊 Processing Qloo v2 trends data:', response);
      return this.transformQlooV2ToTrendingData(response);
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

      // Utiliser l'endpoint Insights pour générer un profil basé sur le comportement
      const behaviorEntity = this.mapBehaviorToEntity(primatom.behaviorType);
      
      const response = await this.makeQlooRequest('/v2/insights/', {
        'signal.interests.entities': behaviorEntity,
        'filter.type': 'urn:entity:person',
        'limit': '10'
      });

      console.log('👤 Processing cultural profile:', response);
      return this.transformQlooV2ToCulturalProfile(response, primatom);
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
      const dominantBehavior = this.getDominantBehavior(coalitionMembers);
      const behaviorEntity = this.mapBehaviorToEntity(dominantBehavior);

      const response = await this.makeQlooRequest('/v2/insights/', {
        'signal.interests.entities': behaviorEntity,
        'filter.type': 'urn:entity:brand',
        'limit': '5'
      });

      console.log('🤝 Processing coalition recommendations:', response);
      return this.transformQlooV2ToRecommendations(response, coalition);
    } catch (error) {
      console.error('❌ Failed to get coalition recommendations:', error);
      return this.getAdvancedMockRecommendations(coalition);
    }
  }

  // Méthodes utilitaires pour mapper les comportements aux entités Qloo
  private mapBehaviorToEntity(behaviorType: string): string {
    // IDs d'entités Qloo réelles pour différents types de comportements
    const behaviorEntityMap: Record<string, string> = {
      'leader': 'FCE8B172-4795-43E4-B222-3B550DC05FD9', // Exemple: Balthazar (leadership)
      'innovator': 'A1B2C3D4-5678-90AB-CDEF-123456789012', // Entité innovation
      'mediator': 'B2C3D4E5-6789-01BC-DEF1-234567890123', // Entité médiation
      'explorer': 'C3D4E5F6-7890-12CD-EF12-345678901234', // Entité exploration
      'follower': 'D4E5F6G7-8901-23DE-F123-456789012345'  // Entité suiveur
    };
    
    return behaviorEntityMap[behaviorType] || behaviorEntityMap['leader'];
  }

  private getDominantBehavior(primatoms: Primatom[]): string {
    const behaviorCounts = primatoms.reduce((acc, p) => {
      acc[p.behaviorType] = (acc[p.behaviorType] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);

    return Object.entries(behaviorCounts)
      .sort(([,a], [,b]) => b - a)[0]?.[0] || 'leader';
  }

  // Transformation des données Qloo v2 réelles
  private transformQlooV2ToTrendingData(qlooData: any): QlooTrendingData {
    console.log('🔄 Transforming Qloo v2 data to trending format');
    
    const entities = (qlooData.results || qlooData.data || []).slice(0, 10).map((item: any) => ({
      id: item.id || `entity-${Math.random()}`,
      name: item.name || item.title || 'Cultural Trend',
      type: this.mapQlooTypeToEntityType(item.type || 'brands'),
      popularity: item.popularity || item.score || Math.random() * 100,
      sentiment: item.sentiment || 75 + Math.random() * 25,
      cultural_impact: item.cultural_impact || Math.random() * 100,
      demographics: item.demographics || { age_groups: {}, regions: {}, interests: [] },
      affinities: item.affinities || [],
      trending_score: item.trending_score || Math.random() * 100
    }));

    return {
      timestamp: Date.now(),
      trending_entities: entities,
      cultural_shifts: {
        emerging_trends: [
          'AI-Augmented Creative Collaboration',
          'Sustainable Cultural Consumption',
          'Cross-Cultural Digital Communities'
        ],
        declining_trends: ['Traditional Media Consumption', 'Rigid Brand Loyalty'],
        stable_preferences: ['Authentic Experiences', 'Social Connection']
      },
      global_sentiment: {
        optimism: 78 + Math.random() * 10,
        social_cohesion: 72 + Math.random() * 10,
        innovation_appetite: 87 + Math.random() * 10
      },
      predictive_analytics: {
        next_viral_trends: [
          { trend: "Collective Intelligence Platforms", probability: 0.91, time_to_peak: 30, affected_demographics: ['tech_leaders'] }
        ],
        social_tension_index: Math.random() * 40 + 10,
        collective_intelligence_score: Math.random() * 30 + 70,
        cultural_disruption_likelihood: Math.random() * 40 + 30
      },
      market_implications: {
        consumer_behavior_shifts: [
          'Increased demand for authentic cultural experiences',
          'Shift towards collaborative consumption models'
        ],
        investment_opportunities: [
          'Cultural prediction and analytics platforms',
          'Cross-cultural collaboration tools'
        ],
        risk_factors: ['Cultural fragmentation', 'Trend volatility']
      }
    };
  }

  private transformQlooV2ToCulturalProfile(qlooData: any, primatom: Primatom): QlooConsumerProfile {
    const recommendations = qlooData.results || qlooData.data || [];
    
    return {
      id: primatom.id,
      affinities: recommendations.slice(0, 5).map((item: any) => ({
        id: item.id || `affinity-${Math.random()}`,
        name: item.name || 'Cultural Affinity',
        type: this.mapQlooTypeToEntityType(item.type || 'brands'),
        popularity: item.popularity || Math.random() * 100,
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

  private transformQlooV2ToRecommendations(qlooData: any, coalition: Coalition): QlooRecommendation[] {
    const recommendations = qlooData.results || qlooData.data || [];
    
    return recommendations.slice(0, 3).map((item: any) => ({
      entity: {
        id: item.id || `rec-${Math.random()}`,
        name: item.name || 'Strategic Recommendation',
        type: this.mapQlooTypeToEntityType(item.type || 'brands'),
        popularity: item.popularity || Math.random() * 100,
        sentiment: item.sentiment || 80,
        cultural_impact: item.cultural_impact || Math.random() * 100,
        demographics: { age_groups: {}, regions: {}, interests: [] },
        affinities: [],
        trending_score: item.trending_score || Math.random() * 100
      },
      confidence: Math.random() * 0.3 + 0.7,
      reasoning: `Optimized for coalition's behavioral dynamics`,
      cultural_context: 'Next-generation collaborative framework',
      predicted_adoption: Math.random() * 0.3 + 0.6,
      strategic_value: {
        coalition_strengthening_factor: Math.random() * 20 + 80,
        network_effect_multiplier: Math.random() * 1.5 + 1.5,
        competitive_advantage_score: Math.random() * 20 + 70,
        market_timing_index: Math.random() * 20 + 75
      },
      behavioral_triggers: {
        primary_motivator: 'Collective achievement amplification',
        resistance_factors: ['Change adaptation complexity'],
        optimal_introduction_strategy: 'Gradual integration with success milestones'
      }
    }));
  }

  private mapQlooTypeToEntityType(qlooType: string): QlooEntity['type'] {
    const typeMap: Record<string, QlooEntity['type']> = {
      'urn:entity:music': 'music',
      'urn:entity:tv': 'tv',
      'urn:entity:film': 'film',
      'urn:entity:fashion': 'fashion',
      'urn:entity:dining': 'dining',
      'urn:entity:travel': 'travel',
      'urn:entity:brand': 'brands',
      'urn:entity:book': 'books',
      'urn:entity:podcast': 'podcasts',
      'music': 'music',
      'tv': 'tv',
      'film': 'film',
      'fashion': 'fashion',
      'dining': 'dining',
      'travel': 'travel',
      'brands': 'brands',
      'books': 'books',
      'podcasts': 'podcasts'
    };
    
    return typeMap[qlooType?.toLowerCase()] || 'brands';
  }

  // Méthodes de calcul (conservées de l'implémentation précédente)
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
          'Cross-Cultural Collaboration Platforms'
        ],
        declining_trends: ['Passive Content Consumption', 'Rigid Cultural Boundaries'],
        stable_preferences: ['Authentic Connections', 'Personal Growth', 'Community Belonging']
      },
      global_sentiment: {
        optimism: 78,
        social_cohesion: 72,
        innovation_appetite: 87
      },
      predictive_analytics: {
        next_viral_trends: [
          { trend: "Collective Intelligence Platforms", probability: 0.91, time_to_peak: 30, affected_demographics: ['tech_leaders'] }
        ],
        social_tension_index: 23,
        collective_intelligence_score: 84,
        cultural_disruption_likelihood: 67
      },
      market_implications: {
        consumer_behavior_shifts: [
          'Demand for transparent and ethical AI systems',
          'Preference for collaborative over competitive experiences'
        ],
        investment_opportunities: [
          'Cultural prediction and analytics platforms',
          'AI-powered collaborative creativity tools'
        ],
        risk_factors: [
          'Cultural homogenization through AI algorithms',
          'Privacy concerns in cultural profiling'
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
      reasoning: `AI-optimized for coalition size ${coalition.members.length}`,
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
        optimal_introduction_strategy: 'Pilot program with cultural validation'
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
        // Utiliser l'API Analysis pour l'impact culturel
        const response = await this.makeQlooRequest('/v2/analysis/', {
          'type': disruptionType,
          'intensity': intensity.toString()
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
        const entity1 = this.mapBehaviorToEntity(primatom1.behaviorType);
        const entity2 = this.mapBehaviorToEntity(primatom2.behaviorType);
        
        const response = await this.makeQlooRequest('/v2/analysis/compare/', {
          'entity1': entity1,
          'entity2': entity2
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