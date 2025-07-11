import React from 'react';
import { SocialMetric, SimulationState } from '../types';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { TrendingUp, Users, Brain, Shield, Target, Network } from 'lucide-react';

interface MetricsDashboardProps {
  state: SimulationState;
}

const MetricsDashboard: React.FC<MetricsDashboardProps> = ({ state }) => {
  const latestMetrics = state.metrics[state.metrics.length - 1];
  const behaviorDistribution = state.primatoms.reduce((acc, p) => {
    acc[p.behaviorType] = (acc[p.behaviorType] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  const coalitionStats = state.coalitions.map(c => ({
    name: c.name,
    members: c.members.length,
    cohesion: c.cohesion
  }));

  const chartData = state.metrics.slice(-20).map((metric, index) => ({
    time: index,
    Confiance: metric.trustNetwork,
    Coopération: metric.cooperation,
    Innovation: metric.innovation,
    Gouvernance: metric.governance,
    Résilience: metric.resilience
  }));

  const pieData = Object.entries(behaviorDistribution).map(([type, count]) => ({
    name: type,
    value: count,
    color: {
      leader: '#EF4444',
      follower: '#06B6D4',
      innovator: '#8B5CF6',
      mediator: '#10B981',
      explorer: '#F59E0B'
    }[type as keyof typeof behaviorDistribution]
  }));

  const MetricCard: React.FC<{
    title: string;
    value: number;
    icon: React.ReactNode;
    color: string;
  }> = ({ title, value, icon, color }) => (
    <div className="bg-slate-800/50 backdrop-blur-sm rounded-lg p-4 border border-slate-700">
      <div className="flex items-center justify-between mb-2">
        <h3 className="text-sm font-medium text-gray-300">{title}</h3>
        <div className={`p-2 rounded-lg ${color}`}>
          {icon}
        </div>
      </div>
      <div className="flex items-center gap-2">
        <span className="text-2xl font-bold text-white">{value?.toFixed(1) || '0.0'}</span>
        <span className="text-sm text-gray-400">%</span>
      </div>
    </div>
  );

  return (
    <div className="space-y-6">
      {/* Métriques principales */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
        <MetricCard
          title="Réseau de Confiance"
          value={latestMetrics?.trustNetwork || 0}
          icon={<Network className="w-4 h-4" />}
          color="bg-cyan-500/20"
        />
        <MetricCard
          title="Coopération"
          value={latestMetrics?.cooperation || 0}
          icon={<Users className="w-4 h-4" />}
          color="bg-blue-500/20"
        />
        <MetricCard
          title="Innovation"
          value={latestMetrics?.innovation || 0}
          icon={<Brain className="w-4 h-4" />}
          color="bg-purple-500/20"
        />
        <MetricCard
          title="Gouvernance"
          value={latestMetrics?.governance || 0}
          icon={<Target className="w-4 h-4" />}
          color="bg-green-500/20"
        />
        <MetricCard
          title="Résilience"
          value={latestMetrics?.resilience || 0}
          icon={<Shield className="w-4 h-4" />}
          color="bg-orange-500/20"
        />
        <MetricCard
          title="Stabilité Culturelle"
          value={latestMetrics?.culturalStability || 0}
          icon={<TrendingUp className="w-4 h-4" />}
          color="bg-red-500/20"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Graphique temporel */}
        <div className="bg-slate-800/50 backdrop-blur-sm rounded-lg p-6 border border-slate-700">
          <h3 className="text-lg font-semibold text-white mb-4">Évolution Temporelle</h3>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={chartData}>
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

        {/* Distribution des comportements */}
        <div className="bg-slate-800/50 backdrop-blur-sm rounded-lg p-6 border border-slate-700">
          <h3 className="text-lg font-semibold text-white mb-4">Distribution Comportementale</h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={pieData}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
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
      </div>

      {/* Coalitions */}
      <div className="bg-slate-800/50 backdrop-blur-sm rounded-lg p-6 border border-slate-700">
        <h3 className="text-lg font-semibold text-white mb-4">Coalitions Actives</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {coalitionStats.map((coalition, index) => (
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

      {/* Connaissances globales */}
      <div className="bg-slate-800/50 backdrop-blur-sm rounded-lg p-6 border border-slate-700">
        <h3 className="text-lg font-semibold text-white mb-4">Mémoire Collective</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
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
        </div>
      </div>
    </div>
  );
};

export default MetricsDashboard;