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
}

export interface QlooRecommendation {
  entity: QlooEntity;
  confidence: number;
  reasoning: string;
  cultural_context: string;
  predicted_adoption: number;
}

class QlooAPIService {
  private apiKey: string;
  private baseUrl: string = 'https://hackathon.api.qloo.com';
  private cache: Map<string, any> = new Map();
  private cacheTimeout: number = 300000; // 5 minutes

  constructor() {
    this.apiKey = import.meta.env.VITE_QLOO_API_KEY || '';
    if (!this.apiKey) {
      console.warn('Qloo API key not found. Cultural data features will be limited.');
    }
  }

  private async makeRequest(endpoint: string, params: Record<string, any> = {}): Promise<any> {
    if (!this.apiKey) {
      throw new Error('Qloo API key not configured');
    }

    const cacheKey = `${endpoint}-${JSON.stringify(params)}`;
    const cached = this.cache.get(cacheKey);
    
    if (cached && Date.now() - cached.timestamp < this.cacheTimeout) {
      return cached.data;
    }

    try {
      const queryParams = new URLSearchParams(params).toString();
      const url = `${this.baseUrl}${endpoint}${queryParams ? `?${queryParams}` : ''}`;
      
      const response = await fetch(url, {
        headers: {
          'x-api-key': this.apiKey,
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        const errorText = await response.text();
        console.error('Qloo API Error Response:', errorText);
        throw new Error(`Qloo API error: ${response.status} ${response.statusText}`);
      }

      const data = await response.json();
      
      // Cache the response
      this.cache.set(cacheKey, {
        data,
        timestamp: Date.now()
      });

      return data;
    } catch (error) {
      console.error('Qloo API request failed:', error);
      throw error;
    }
  }

  // Obtenir les tendances culturelles globales
  async getGlobalTrends(): Promise<QlooTrendingData> {
    try {
      const response = await this.makeRequest('/v2/insights', {
        'filter.type': 'urn:entity:artist',
        'take': '50',
        'bias.trends': 'high'
      });

      return {
        timestamp: Date.now(),
        trending_entities: response.results?.map((item: any) => ({
          id: item.id || 'unknown',
          name: item.properties?.name || 'Unknown',
          type: 'music',
          popularity: item.affinity || 50,
          sentiment: 75,
          cultural_impact: item.affinity || 50,
          demographics: { age_groups: {}, regions: {}, interests: [] },
          affinities: [],
          trending_score: item.affinity || 50
        })) || [],
        cultural_shifts: {
          emerging_trends: ['AI Music', 'Virtual Concerts', 'Genre Fusion'],
          declining_trends: ['Traditional Radio', 'Physical Albums'],
          stable_preferences: ['Pop Music', 'Rock', 'Hip-Hop']
        },
        global_sentiment: {
          optimism: 65,
          social_cohesion: 58,
          innovation_appetite: 72
        }
      };
    } catch (error) {
      console.error('Failed to fetch global trends:', error);
      return this.getMockTrendingData();
    }
  }

  // Générer un profil culturel pour un Primatom
  async generateCulturalProfile(primatom: Primatom): Promise<QlooConsumerProfile> {
    try {
      const response = await this.makeRequest('/v2/insights', {
        'filter.type': 'urn:entity:artist',
        'signal.demographics.age': primatom.innovation > 70 ? '35_and_younger' : '36_to_55',
        'take': '10'
      });

      return {
        id: primatom.id,
        affinities: response.results?.slice(0, 5).map((item: any) => ({
          id: item.id || 'unknown',
          name: item.properties?.name || 'Unknown',
          type: 'music',
          popularity: item.affinity || 50,
          sentiment: 75,
          cultural_impact: item.affinity || 50,
          demographics: { age_groups: {}, regions: {}, interests: [] },
          affinities: [],
          trending_score: item.affinity || 50
        })) || [],
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
        }
      };
    } catch (error) {
      console.error('Failed to generate cultural profile:', error);
      return this.getMockCulturalProfile(primatom);
    }
  }

  // Obtenir des recommandations culturelles pour une coalition
  async getCoalitionRecommendations(coalition: Coalition, primatoms: Primatom[]): Promise<QlooRecommendation[]> {
    try {
      const coalitionMembers = primatoms.filter(p => coalition.members.includes(p.id));
      const avgInnovation = coalitionMembers.reduce((sum, p) => sum + p.innovation, 0) / coalitionMembers.length;
      
      const response = await this.makeRequest('/v2/insights', {
        'filter.type': 'urn:entity:place',
        'signal.demographics.age': avgInnovation > 70 ? '35_and_younger' : '36_to_55',
        'take': '10'
      });

      return response.results?.map((item: any) => ({
        entity: {
          id: item.id || 'unknown',
          name: item.properties?.name || 'Unknown',
          type: 'travel',
          popularity: item.affinity || 50,
          sentiment: 75,
          cultural_impact: item.affinity || 50,
          demographics: { age_groups: {}, regions: {}, interests: [] },
          affinities: [],
          trending_score: item.affinity || 50
        },
        confidence: (item.affinity || 50) / 100,
        reasoning: `Recommended based on coalition's average innovation score of ${avgInnovation.toFixed(1)}`,
        cultural_context: 'Emerging trend in collective experiences',
        predicted_adoption: (item.affinity || 50) / 100
      })) || this.getMockRecommendations();
    } catch (error) {
      console.error('Failed to get coalition recommendations:', error);
      return this.getMockRecommendations();
    }
  }

  // Analyser l'impact culturel d'une disruption
  async analyzeCulturalImpact(disruptionType: string, intensity: number): Promise<{
    cultural_shift_prediction: number;
    affected_demographics: string[];
    sentiment_impact: number;
    trend_acceleration: string[];
  }> {
    try {
      const response = await this.makeRequest('/v2/insights', {
        'filter.type': 'urn:entity:artist',
        'bias.trends': 'high',
        'take': '5'
      });

      return {
        cultural_shift_prediction: intensity * 10,
        affected_demographics: ['digital_natives', 'early_adopters'],
        sentiment_impact: -intensity * 5,
        trend_acceleration: response.results?.map((item: any) => item.properties?.name || 'Unknown').slice(0, 3) || []
      };
    } catch (error) {
      console.error('Failed to analyze cultural impact:', error);
      return {
        cultural_shift_prediction: intensity * 10,
        affected_demographics: ['general_population'],
        sentiment_impact: -intensity * 5,
        trend_acceleration: []
      };
    }
  }

  // Détecter les affinités culturelles entre Primatoms
  async detectCulturalAffinities(primatom1: Primatom, primatom2: Primatom): Promise<{
    affinity_score: number;
    shared_interests: string[];
    cultural_compatibility: number;
    recommendation_overlap: number;
  }> {
    try {
      const profile1 = await this.generateCulturalProfile(primatom1);
      const profile2 = await this.generateCulturalProfile(primatom2);
      
      const sharedInterests = profile1.affinities
        .filter(a1 => profile2.affinities.some(a2 => a2.name === a1.name))
        .map(a => a.name);

      return {
        affinity_score: this.calculateBasicAffinity(primatom1, primatom2),
        shared_interests: sharedInterests,
        cultural_compatibility: sharedInterests.length * 20,
        recommendation_overlap: (sharedInterests.length / Math.max(profile1.affinities.length, 1)) * 100
      };
    } catch (error) {
      console.error('Failed to detect cultural affinities:', error);
      return {
        affinity_score: this.calculateBasicAffinity(primatom1, primatom2),
        shared_interests: [],
        cultural_compatibility: 50,
        recommendation_overlap: 30
      };
    }
  }

  // Méthodes de fallback avec données simulées
  private getMockTrendingData(): QlooTrendingData {
    return {
      timestamp: Date.now(),
      trending_entities: [
        {
          id: 'trend-1',
          name: 'Sustainable Living',
          type: 'brands',
          popularity: 85,
          sentiment: 75,
          cultural_impact: 80,
          demographics: { age_groups: { '18-34': 60, '35-54': 30 }, regions: {}, interests: [] },
          affinities: ['environment', 'wellness'],
          trending_score: 90
        }
      ],
      cultural_shifts: {
        emerging_trends: ['Digital Minimalism', 'Community Gardens', 'Local Artisans'],
        declining_trends: ['Fast Fashion', 'Single-use Products'],
        stable_preferences: ['Family Time', 'Health & Wellness', 'Education']
      },
      global_sentiment: {
        optimism: 65,
        social_cohesion: 58,
        innovation_appetite: 72
      }
    };
  }

  private getMockCulturalProfile(primatom: Primatom): QlooConsumerProfile {
    return {
      id: primatom.id,
      affinities: [],
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
      }
    };
  }

  private getMockRecommendations(): QlooRecommendation[] {
    return [
      {
        entity: {
          id: 'rec-1',
          name: 'Collaborative Innovation',
          type: 'brands',
          popularity: 75,
          sentiment: 80,
          cultural_impact: 85,
          demographics: { age_groups: {}, regions: {}, interests: [] },
          affinities: [],
          trending_score: 78
        },
        confidence: 0.85,
        reasoning: 'High cooperation and innovation scores',
        cultural_context: 'Emerging trend in collective problem-solving',
        predicted_adoption: 0.72
      }
    ];
  }

  private calculateBasicAffinity(primatom1: Primatom, primatom2: Primatom): number {
    const behaviorCompatibility = this.getBehaviorCompatibility(primatom1.behaviorType, primatom2.behaviorType);
    const innovationSimilarity = 100 - Math.abs(primatom1.innovation - primatom2.innovation);
    const cooperationSimilarity = 100 - Math.abs(primatom1.cooperation - primatom2.cooperation);
    
    return (behaviorCompatibility + innovationSimilarity + cooperationSimilarity) / 3;
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

  // Méthode pour vérifier la connectivité API
  async testConnection(): Promise<boolean> {
    try {
      await this.makeRequest('/v2/insights', {
        'filter.type': 'urn:entity:artist',
        'signal.location.query': 'New York City',
        'take': '1'
      });
      return true;
    } catch (error) {
      console.error('Qloo API connection test failed:', error);
      return false;
    }
  }
}

export const qlooService = new QlooAPIService();