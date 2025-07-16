import React from 'react';
import { Primatom } from '../types';
import { User, Heart, Zap, Users, Brain, Trophy, Clock, BookOpen } from 'lucide-react';

interface PrimatomDetailsProps {
  primatom: Primatom;
}

const PrimatomDetails: React.FC<PrimatomDetailsProps> = ({ primatom }) => {
  const getBehaviorDescription = (type: Primatom['behaviorType']) => {
    switch (type) {
      case 'leader': return 'Tend à diriger les groupes et prendre des initiatives';
      case 'follower': return 'Préfère suivre et soutenir les autres';
      case 'innovator': return 'Recherche constamment de nouvelles solutions';
      case 'mediator': return 'Facilite les relations et résout les conflits';
      case 'explorer': return 'Explore de nouveaux territoires et possibilités';
      default: return 'Comportement mixte';
    }
  };

  const getBehaviorColor = (type: Primatom['behaviorType']) => {
    switch (type) {
      case 'leader': return 'text-red-400';
      case 'follower': return 'text-cyan-400';
      case 'innovator': return 'text-purple-400';
      case 'mediator': return 'text-green-400';
      case 'explorer': return 'text-yellow-400';
      default: return 'text-gray-400';
    }
  };

  const StatBar: React.FC<{ label: string; value: number; icon: React.ReactNode; color: string }> = 
    ({ label, value, icon, color }) => (
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            {icon}
            <span className="text-sm font-medium text-gray-300">{label}</span>
          </div>
          <span className="text-sm font-bold text-white">{value.toFixed(1)}</span>
        </div>
        <div className="w-full bg-slate-700 rounded-full h-2">
          <div 
            className={`h-2 rounded-full transition-all duration-300 ${color}`}
            style={{ width: `${Math.min(100, Math.max(0, value))}%` }}
          />
        </div>
      </div>
    );

  return (
    <div className="bg-slate-800/50 backdrop-blur-sm rounded-lg p-6 border border-slate-700">
      <div className="flex items-center gap-4 mb-6">
        <div className="w-12 h-12 bg-gradient-to-r from-cyan-500 to-purple-500 rounded-full flex items-center justify-center">
          <User className="w-6 h-6 text-white" />
        </div>
        <div>
          <h2 className="text-xl font-bold text-white">{primatom.name || 'Primatom Inconnu'}</h2>
          <p className={`text-sm font-medium ${getBehaviorColor(primatom.behaviorType || 'default')}`}>
            {(primatom.behaviorType || 'inconnu').charAt(0).toUpperCase() + (primatom.behaviorType || 'inconnu').slice(1)}
          </p>
        </div>
      </div>

      <div className="space-y-4 mb-6">
        <StatBar 
          label="Confiance" 
          value={primatom.trust || 0} 
          icon={<Heart className="w-4 h-4 text-red-400" />}
          color="bg-red-500"
        />
        <StatBar 
          label="Énergie" 
          value={primatom.energy || 0} 
          icon={<Zap className="w-4 h-4 text-yellow-400" />}
          color="bg-yellow-500"
        />
        <StatBar 
          label="Coopération" 
          value={primatom.cooperation || 0} 
          icon={<Users className="w-4 h-4 text-blue-400" />}
          color="bg-blue-500"
        />
        <StatBar 
          label="Innovation" 
          value={primatom.innovation || 0} 
          icon={<Brain className="w-4 h-4 text-purple-400" />}
          color="bg-purple-500"
        />
      </div>

      <div className="grid grid-cols-2 gap-4 mb-6">
        <div className="bg-slate-700/50 rounded-lg p-3 border border-slate-600">
          <div className="flex items-center gap-2 mb-1">
            <Clock className="w-4 h-4 text-gray-400" />
            <span className="text-sm text-gray-300">Âge</span>
          </div>
          <span className="text-lg font-bold text-white">{(primatom.age || 0).toFixed(1)}</span>
        </div>
        <div className="bg-slate-700/50 rounded-lg p-3 border border-slate-600">
          <div className="flex items-center gap-2 mb-1">
            <BookOpen className="w-4 h-4 text-gray-400" />
            <span className="text-sm text-gray-300">Mémoires</span>
          </div>
          <span className="text-lg font-bold text-white">{primatom.memories?.length || 0}</span>
        </div>
      </div>

      <div className="space-y-4">
        <div>
          <h3 className="text-sm font-medium text-gray-300 mb-2">Comportement</h3>
          <p className="text-sm text-gray-400">{getBehaviorDescription(primatom.behaviorType || 'default')}</p>
        </div>

        {primatom.coalition ? (
          <div>
            <h3 className="text-sm font-medium text-gray-300 mb-2">Coalition</h3>
            <div className="bg-slate-700/50 rounded-lg p-3 border border-slate-600">
              <span className="text-sm text-cyan-400">Membre actif d'une coalition</span>
            </div>
          </div>
        ) : (
          <div>
            <h3 className="text-sm font-medium text-gray-300 mb-2">Coalition</h3>
            <div className="bg-slate-700/50 rounded-lg p-3 border border-slate-600">
              <span className="text-sm text-gray-400">Aucune coalition active</span>
            </div>
          </div>
        )}

        <div>
          <h3 className="text-sm font-medium text-gray-300 mb-2">Relations</h3>
          <div className="space-y-2">
            {Object.entries(primatom.relationships || {})
              .filter(([_, strength]) => strength > 30)
              .slice(0, 3)
              .map(([id, strength]) => (
                <div key={id} className="flex items-center justify-between">
                  <span className="text-sm text-gray-400">{id.split('-')[1] || id}</span>
                  <div className="flex items-center gap-2">
                    <div className="w-20 bg-slate-700 rounded-full h-1">
                      <div 
                        className="bg-cyan-500 h-1 rounded-full"
                        style={{ width: `${Math.min(100, Math.max(0, strength))}%` }}
                      />
                    </div>
                    <span className="text-xs text-gray-500">{strength.toFixed(0)}%</span>
                  </div>
                </div>
              )) || <p className="text-sm text-gray-400">Aucune relation significative</p>}
          </div>
        </div>

        {primatom.culturalNorms && primatom.culturalNorms.length > 0 ? (
          <div>
            <h3 className="text-sm font-medium text-gray-300 mb-2">Normes Culturelles</h3>
            <div className="space-y-1">
              {primatom.culturalNorms.slice(0, 3).map((norm, index) => (
                <div key={index} className="text-xs text-gray-400 bg-slate-700/50 rounded px-2 py-1">
                  {norm}
                </div>
              ))}
            </div>
          </div>
        ) : (
          <div>
            <h3 className="text-sm font-medium text-gray-300 mb-2">Normes Culturelles</h3>
            <div className="space-y-1">
              <div className="text-xs text-gray-400 bg-slate-700/50 rounded px-2 py-1">
                Aucune norme culturelle définie
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default PrimatomDetails;