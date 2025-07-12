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
  private baseUrl: string = 'https://api.qloo.com/v1';
  private cache: Map<string, any> = new Map();
  private cacheTimeout: number = 300000; // 5 minutes

  constructor() {
    this.apiKey = import.meta.env.VITE_QLOO_API_L8q5OjsxUNnY7_NFTuQmKXKYHtKshbhf8-P1zOurvY8 || '';
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
          'Authorization': `Bearer ${this.apiKey}`,
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
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
      const response = await this.makeRequest('/trends/global', {
        limit: 50,
        include_sentiment: true,
        include_demographics: true
      });

      return {
        timestamp: Date.now(),
        trending_entities: response.trending || [],
        cultural_shifts: {
          emerging_trends: response.emerging || [],
          declining_trends: response.declining || [],
          stable_preferences: response.stable || []
        },
        global_sentiment: {
          optimism: response.sentiment?.optimism || 50,
          social_cohesion: response.sentiment?.cohesion || 50,
          innovation_appetite: response.sentiment?.innovation || 50
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
      const behaviorVector = {
        innovation: primatom.innovation,
        cooperation: primatom.cooperation,
        trust: primatom.trust,
        energy: primatom.energy,
        behavior_type: primatom.behaviorType
      };

      const response = await this.makeRequest('/profiles/generate', {
        behavior_vector: JSON.stringify(behaviorVector),
        include_affinities: true,
        include_sentiment: true
      });

      return {
        id: primatom.id,
        affinities: response.affinities || [],
        behavior_patterns: {
          discovery_tendency: response.patterns?.discovery || primatom.innovation,
          social_influence: response.patterns?.influence || primatom.influence || 50,
          brand_loyalty: response.patterns?.loyalty || primatom.trust,
          cultural_openness: response.patterns?.openness || primatom.cooperation
        },
        sentiment_analysis: {
          overall_mood: response.sentiment?.mood || (100 - (primatom.stressLevel || 0)),
          cultural_engagement: response.sentiment?.engagement || primatom.energy,
          social_connectivity: response.sentiment?.connectivity || primatom.cooperation
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
      const avgBehavior = {
        innovation: coalitionMembers.reduce((sum, p) => sum + p.innovation, 0) / coalitionMembers.length,
        cooperation: coalitionMembers.reduce((sum, p) => sum + p.cooperation, 0) / coalitionMembers.length,
        trust: coalitionMembers.reduce((sum, p) => sum + p.trust, 0) / coalitionMembers.length,
        energy: coalitionMembers.reduce((sum, p) => sum + p.energy, 0) / coalitionMembers.length
      };

      const response = await this.makeRequest('/recommendations/group', {
        group_profile: JSON.stringify(avgBehavior),
        group_size: coalitionMembers.length,
        cohesion: coalition.cohesion,
        limit: 10
      });

      return response.recommendations || [];
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
      const response = await this.makeRequest('/analysis/cultural-impact', {
        disruption_type: disruptionType,
        intensity: intensity,
        include_predictions: true
      });

      return {
        cultural_shift_prediction: response.shift_prediction || intensity * 10,
        affected_demographics: response.demographics || [],
        sentiment_impact: response.sentiment_impact || -intensity * 5,
        trend_acceleration: response.accelerated_trends || []
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
      const response = await this.makeRequest('/analysis/affinity', {
        profile1: JSON.stringify({
          behavior_type: primatom1.behaviorType,
          innovation: primatom1.innovation,
          cooperation: primatom1.cooperation
        }),
        profile2: JSON.stringify({
          behavior_type: primatom2.behaviorType,
          innovation: primatom2.innovation,
          cooperation: primatom2.cooperation
        })
      });

      return {
        affinity_score: response.affinity_score || this.calculateBasicAffinity(primatom1, primatom2),
        shared_interests: response.shared_interests || [],
        cultural_compatibility: response.compatibility || 50,
        recommendation_overlap: response.overlap || 30
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
          type: 'lifestyle',
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
          type: 'concept',
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
      await this.makeRequest('/health');
      return true;
    } catch (error) {
      console.error('Qloo API connection test failed:', error);
      return false;
    }
  }
}

export const qlooService = new QlooAPIService();