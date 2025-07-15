import React, { useState, useEffect } from 'react';
import { SocialMetric, SimulationState } from '../types';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell, AreaChart, Area, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar } from 'recharts';
import { TrendingUp, Users, Brain, Shield, Target, Network, Zap, Activity, Eye, Gauge, Layers, Globe, Cpu, Database, BarChart3, PieChart as PieChartIcon, TrendingDown, AlertTriangle, CheckCircle, Star, Crown, Gem } from 'lucide-react';

interface MetricsDashboardProps {
  state: SimulationState;
  isLive?: boolean;
}

const MetricsDashboard: React.FC<MetricsDashboardProps> = ({ state, isLive = false }) => {
  const [animationKey, setAnimationKey] = useState(0);
  const [selectedMetric, setSelectedMetric] = useState<string | null>(null);
  
  useEffect(() => {
    if (isLive) {
      const interval = setInterval(() => {
        setAnimationKey(prev => prev + 1);
      }, 2000);
      return () => clearInterval(interval);
    }
  }, [isLive]);

  const latestMetrics = state.metrics[state.metrics.length - 1];
  
  const behaviorDistribution = state.primatoms.reduce((acc, p) => {
    acc[p.behaviorType] = (acc[p.behaviorType] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  const coalitionStats = state.coalitions.map(c => ({
    name: c.name,
    members: c.members.length,
    cohesion: c.cohesion,
    age: Date.now() - c.created,
    influence: c.members.length * c.cohesion / 100
  })).sort((a, b) => b.influence - a.influence);

  const chartData = state.metrics.slice(-30).map((metric, index) => ({
    time: index,
    Confiance: metric.trustNetwork,
    Coopération: metric.cooperation,
    Innovation: metric.innovation,
    Gouvernance: metric.governance,
    Résilience: metric.resilience,
    'Stabilité Culturelle': metric.culturalStability,
    'Niveau Disruption': metric.disruptionLevel || 0,
    'Behaviors Émergents': metric.emergentBehaviors || 0
  }));

  const radarData = [
    { metric: 'Confiance', value: latestMetrics?.trustNetwork || 0, fullMark: 100 },
    { metric: 'Coopération', value: latestMetrics?.cooperation || 0, fullMark: 100 },
    { metric: 'Innovation', value: latestMetrics?.innovation || 0, fullMark: 100 },
    { metric: 'Gouvernance', value: latestMetrics?.governance || 0, fullMark: 100 },
    { metric: 'Résilience', value: latestMetrics?.resilience || 0, fullMark: 100 },
    { metric: 'Stabilité', value: latestMetrics?.culturalStability || 0, fullMark: 100 }
  ];

  const pieData = Object.entries(behaviorDistribution).map(([type, count]) => ({
    name: type.charAt(0).toUpperCase() + type.slice(1),
    value: count,
    percentage: (count / state.primatoms.length * 100).toFixed(1),
    color: {
      leader: '#EF4444',
      follower: '#06B6D4',
      innovator: '#8B5CF6',
      mediator: '#10B981',
      explorer: '#F59E0B'
    }[type as keyof typeof behaviorDistribution]
  }));

  const advancedMetrics = {
    systemHealth: latestMetrics ? (latestMetrics.trustNetwork + latestMetrics.cooperation + latestMetrics.resilience) / 3 : 0,
    innovationVelocity: state.metrics.length > 1 ? 
      Math.abs((latestMetrics?.innovation || 0) - (state.metrics[state.metrics.length - 2]?.innovation || 0)) : 0,
    socialCoherence: latestMetrics ? (latestMetrics.cooperation + latestMetrics.governance) / 2 : 0,
    adaptabilityIndex: state.primatoms.reduce((sum, p) => sum + (p.adaptabilityScore || 50), 0) / state.primatoms.length,
    leadershipDensity: (behaviorDistribution.leader || 0) / state.primatoms.length * 100,
    networkComplexity: state.coalitions.length > 0 ? state.coalitions.reduce((sum, c) => sum + c.members.length, 0) / state.coalitions.length : 0
  };

  const getTrendColor = (value: number): string => {
    if (value >= 80) return 'text-green-400';
    if (value >= 60) return 'text-blue-400';
    if (value >= 40) return 'text-yellow-400';
    if (value >= 20) return 'text-orange-400';
    return 'text-red-400';
  };

  const getTrendIcon = (value: number): React.ReactNode => {
    if (value >= 80) return <TrendingUp className="w-4 h-4 text-green-400" />;
    if (value >= 60) return <TrendingUp className="w-4 h-4 text-blue-400" />;
    if (value >= 40) return <Activity className="w-4 h-4 text-yellow-400" />;
    if (value >= 20) return <TrendingDown className="w-4 h-4 text-orange-400" />;
    return <AlertTriangle className="w-4 h-4 text-red-400" />;
  };

  const MetricCard: React.FC<{
    title: string;
    value: number;
    icon: React.ReactNode;
    color: string;
    trend?: number;
    subtitle?: string;
    isHighlighted?: boolean;
  }> = ({ title, value, icon, color, trend, subtitle, isHighlighted = false }) => (
    <div 
      className={`backdrop-blur-sm rounded-xl p-5 border transition-all duration-300 hover:scale-105 cursor-pointer ${
        isHighlighted 
          ? 'bg-gradient-to-br from-purple-500/20 to-cyan-500/20 border-purple-500/50 shadow-lg shadow-purple-500/25' 
          : 'bg-slate-800/50 border-slate-700 hover:border-slate-600'
      } ${isLive ? 'animate-pulse' : ''}`}
      onClick={() => setSelectedMetric(selectedMetric === title ? null : title)}
    >
      <div className="flex items-center justify-between mb-3">
        <h3 className="text-sm font-medium text-gray-300">{title}</h3>
        <div className={`p-2 rounded-lg ${color} transition-all duration-300`}>
          {icon}
        </div>
      </div>
      <div className="flex items-baseline gap-2 mb-2">
        <span className={`text-3xl font-bold transition-colors duration-300 ${getTrendColor(value)}`}>
          {value?.toFixed(1) || '0.0'}
        </span>
        <span className="text-sm text-gray-400">%</span>
        {trend !== undefined && (
          <div className="flex items-center gap-1">
            {getTrendIcon(trend)}
            <span className={`text-xs font-medium ${getTrendColor(trend)}`}>
              {trend > 0 ? '+' : ''}{trend.toFixed(1)}
            </span>
          </div>
        )}
      </div>
      {subtitle && (
        <p className="text-xs text-gray-500">{subtitle}</p>
      )}
      <div className="w-full bg-slate-700 rounded-full h-1.5 mt-3">
        <div 
          className={`h-1.5 rounded-full transition-all duration-1000 ${
            value >= 80 ? 'bg-gradient-to-r from-green-500 to-emerald-400' :
            value >= 60 ? 'bg-gradient-to-r from-blue-500 to-cyan-400' :
            value >= 40 ? 'bg-gradient-to-r from-yellow-500 to-orange-400' :
            'bg-gradient-to-r from-red-500 to-pink-400'
          }`}
          style={{ width: `${Math.min(100, value)}%` }}
        />
      </div>
    </div>
  );

  const SystemHealthIndicator: React.FC = () => {
    const health = advancedMetrics.systemHealth;
    const getHealthStatus = () => {
      if (health >= 80) return { label: 'OPTIMAL', color: 'text-green-400', icon: <CheckCircle className="w-5 h-5" /> };
      if (health >= 60) return { label: 'STABLE', color: 'text-blue-400', icon: <Target className="w-5 h-5" /> };
      if (health >= 40) return { label: 'ATTENTION', color: 'text-yellow-400', icon: <Eye className="w-5 h-5" /> };
      if (health >= 20) return { label: 'CRITIQUE', color: 'text-orange-400', icon: <AlertTriangle className="w-5 h-5" /> };
      return { label: 'URGENCE', color: 'text-red-400', icon: <AlertTriangle className="w-5 h-5" /> };
    };
    
    const status = getHealthStatus();
    
    return (
      <div className="bg-gradient-to-r from-slate-800/80 to-slate-900/80 backdrop-blur-sm rounded-xl p-6 border border-slate-700">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-bold text-white">État du Système</h3>
          <div className={`flex items-center gap-2 px-3 py-1 rounded-full bg-slate-700/50 ${status.color}`}>
            {status.icon}
            <span className="font-bold text-sm">{status.label}</span>
          </div>
        </div>
        
        <div className="grid grid-cols-3 gap-4 mb-6">
          <div className="text-center">
            <div className={`text-2xl font-bold ${status.color}`}>{health.toFixed(1)}%</div>
            <div className="text-sm text-gray-400">Santé Globale</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-purple-400">{advancedMetrics.innovationVelocity.toFixed(1)}</div>
            <div className="text-sm text-gray-400">Vélocité Innovation</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-cyan-400">{advancedMetrics.socialCoherence.toFixed(1)}%</div>
            <div className="text-sm text-gray-400">Cohérence Sociale</div>
          </div>
        </div>
        
        <div className="w-full bg-slate-700 rounded-full h-3">
          <div 
            className={`h-3 rounded-full transition-all duration-1000 ${
              health >= 80 ? 'bg-gradient-to-r from-green-500 via-emerald-400 to-teal-400' :
              health >= 60 ? 'bg-gradient-to-r from-blue-500 via-cyan-400 to-sky-400' :
              health >= 40 ? 'bg-gradient-to-r from-yellow-500 via-orange-400 to-amber-400' :
              'bg-gradient-to-r from-red-500 via-pink-400 to-rose-400'
            }`}
            style={{ width: `${Math.min(100, health)}%` }}
          />
        </div>
      </div>
    );
  };

  return (
    <div className="space-y-6">
      {/* Header avec indicateur de santé système */}
      <SystemHealthIndicator />

      {/* Métriques principales */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
        <MetricCard
          title="Réseau de Confiance"
          value={latestMetrics?.trustNetwork || 0}
          icon={<Network className="w-5 h-5 text-cyan-400" />}
          color="bg-cyan-500/20"
          trend={state.metrics.length > 1 ? (latestMetrics?.trustNetwork || 0) - (state.metrics[state.metrics.length - 2]?.trustNetwork || 0) : 0}
          subtitle="Interconnexions sociales"
        />
        <MetricCard
          title="Coopération"
          value={latestMetrics?.cooperation || 0}
          icon={<Users className="w-5 h-5 text-blue-400" />}
          color="bg-blue-500/20"
          trend={state.metrics.length > 1 ? (latestMetrics?.cooperation || 0) - (state.metrics[state.metrics.length - 2]?.cooperation || 0) : 0}
          subtitle="Collaboration active"
        />
        <MetricCard
          title="Innovation"
          value={latestMetrics?.innovation || 0}
          icon={<Brain className="w-5 h-5 text-purple-400" />}
          color="bg-purple-500/20"
          trend={advancedMetrics.innovationVelocity}
          subtitle="Créativité collective"
        />
        <MetricCard
          title="Gouvernance"
          value={latestMetrics?.governance || 0}
          icon={<Target className="w-5 h-5 text-green-400" />}
          color="bg-green-500/20"
          trend={state.metrics.length > 1 ? (latestMetrics?.governance || 0) - (state.metrics[state.metrics.length - 2]?.governance || 0) : 0}
          subtitle="Leadership efficace"
        />
        <MetricCard
          title="Résilience"
          value={latestMetrics?.resilience || 0}
          icon={<Shield className="w-5 h-5 text-orange-400" />}
          color="bg-orange-500/20"
          trend={state.metrics.length > 1 ? (latestMetrics?.resilience || 0) - (state.metrics[state.metrics.length - 2]?.resilience || 0) : 0}
          subtitle="Capacité d'adaptation"
        />
        <MetricCard
          title="Stabilité Culturelle"
          value={latestMetrics?.culturalStability || 0}
          icon={<Globe className="w-5 h-5 text-red-400" />}
          color="bg-red-500/20"
          trend={state.metrics.length > 1 ? (latestMetrics?.culturalStability || 0) - (state.metrics[state.metrics.length - 2]?.culturalStability || 0) : 0}
          subtitle="Cohésion normative"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Graphique temporel */}
        <div className="lg:col-span-2 bg-slate-800/50 backdrop-blur-sm rounded-xl p-6 border border-slate-700">
          <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
            <BarChart3 className="w-5 h-5 text-cyan-400" />
            Évolution Temporelle
          </h3>
          <ResponsiveContainer width="100%" height={350}>
            <LineChart data={chartData} key={animationKey}>
              <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
              <XAxis dataKey="time" stroke="#64748B" />
              <YAxis stroke="#64748B" />
              <Tooltip 
                contentStyle={{
                  backgroundColor: '#1E293B',
                  border: '1px solid #334155',
                  borderRadius: '8px',
                  color: '#F8FAFC'
                }}
              />
              <Legend />
              <Line type="monotone" dataKey="Confiance" stroke="#06B6D4" strokeWidth={2} />
              <Line type="monotone" dataKey="Coopération" stroke="#3B82F6" strokeWidth={2} />
              <Line type="monotone" dataKey="Innovation" stroke="#8B5CF6" strokeWidth={2} />
              <Line type="monotone" dataKey="Gouvernance" stroke="#10B981" strokeWidth={2} />
              <Line type="monotone" dataKey="Résilience" stroke="#F59E0B" strokeWidth={2} />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Vue radar */}
        <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl p-6 border border-slate-700">
          <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
            <Gauge className="w-5 h-5 text-purple-400" />
            Profil Système
          </h3>
          <ResponsiveContainer width="100%" height={300}>
            <RadarChart data={radarData}>
              <PolarGrid stroke="#334155" />
              <PolarAngleAxis dataKey="metric" tick={{ fill: '#94A3B8', fontSize: 12 }} />
              <PolarRadiusAxis 
                angle={90} 
                domain={[0, 100]} 
                tick={{ fill: '#64748B', fontSize: 10 }}
              />
              <Radar 
                name="Métriques" 
                dataKey="value" 
                stroke="#8B5CF6" 
                fill="#8B5CF6" 
                fillOpacity={0.2}
                strokeWidth={2}
              />
            </RadarChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Distribution des comportements */}
        <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl p-6 border border-slate-700">
          <h3 className="text-lg font-semibold text-white mb-4">Distribution Comportementale</h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={pieData}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, percentage }) => `${name} ${percentage}%`}
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
              >
                {pieData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip 
                contentStyle={{
                  backgroundColor: '#1E293B',
                  border: '1px solid #334155',
                  borderRadius: '8px',
                  color: '#F8FAFC'
                }}
              />
            </PieChart>
          </ResponsiveContainer>
        </div>

        {/* Coalitions */}
        <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl p-6 border border-slate-700">
          <h3 className="text-lg font-semibold text-white mb-4">Coalitions Actives</h3>
          <div className="space-y-4 max-h-72 overflow-y-auto">
            {coalitionStats.slice(0, 6).map((coalition, index) => (
              <div key={index} className="bg-slate-700/50 rounded-lg p-4 border border-slate-600">
                <div className="flex items-center justify-between mb-2">
                  <h4 className="font-medium text-white">{coalition.name}</h4>
                  <span className="text-sm text-gray-400">{coalition.members} membres</span>
                </div>
                <div className="w-full bg-slate-600 rounded-full h-2">
                  <div 
                    className="bg-cyan-500 h-2 rounded-full transition-all duration-300"
                    style={{ width: `${coalition.cohesion}%` }}
                  />
                </div>
                <span className="text-xs text-gray-400 mt-1">
                  Cohésion: {coalition.cohesion.toFixed(1)}%
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Mémoire collective */}
      <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl p-6 border border-slate-700">
        <h3 className="text-lg font-semibold text-white mb-4">Mémoire Collective</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-slate-700/50 rounded-lg p-4 border border-slate-600">
            <h4 className="font-medium text-white mb-2">Génération</h4>
            <span className="text-2xl font-bold text-cyan-400">{state.generation}</span>
          </div>
          <div className="bg-slate-700/50 rounded-lg p-4 border border-slate-600">
            <h4 className="font-medium text-white mb-2">Connaissances</h4>
            <span className="text-2xl font-bold text-cyan-400">{state.globalKnowledge.length}</span>
          </div>
          <div className="bg-slate-700/50 rounded-lg p-4 border border-slate-600">
            <h4 className="font-medium text-white mb-2">Primatoms</h4>
            <span className="text-2xl font-bold text-cyan-400">{state.primatoms.length}</span>
          </div>
          <div className="bg-slate-700/50 rounded-lg p-4 border border-slate-600">
            <h4 className="font-medium text-white mb-2">Coalitions</h4>
            <span className="text-2xl font-bold text-cyan-400">{state.coalitions.length}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MetricsDashboard;