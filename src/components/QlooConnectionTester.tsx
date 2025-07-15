import React, { useState, useEffect } from 'react';
import { qlooService } from '../services/QlooAPIService';
import { Wifi, WifiOff, RefreshCw, CheckCircle, AlertTriangle, Info } from 'lucide-react';

const QlooConnectionTester: React.FC = () => {
  const [isConnected, setIsConnected] = useState<boolean | null>(null);
  const [isTesting, setIsTesting] = useState(false);
  const [testResults, setTestResults] = useState<string[]>([]);
  const [apiKey, setApiKey] = useState('');

  useEffect(() => {
    setApiKey(import.meta.env.VITE_QLOO_API_KEY || '');
    testConnection();
  }, []);

  const testConnection = async () => {
    setIsTesting(true);
    setTestResults(['🔍 Testing Qloo API connection...']);
    
    try {
      const connected = await qlooService.testConnection();
      setIsConnected(connected);
      
      if (connected) {
        setTestResults(prev => [...prev, '✅ Qloo API connected successfully!']);
        
        // Test des endpoints principaux
        try {
          setTestResults(prev => [...prev, '📊 Testing global trends...']);
          const trends = await qlooService.getGlobalTrends();
          setTestResults(prev => [...prev, `✅ Global trends: ${trends.trending_entities.length} entities loaded`]);
        } catch (error) {
          setTestResults(prev => [...prev, '⚠️ Global trends using simulation mode']);
        }
        
      } else {
        setTestResults(prev => [...prev, '🔧 Using advanced simulation mode']);
      }
    } catch (error) {
      setIsConnected(false);
      setTestResults(prev => [...prev, `❌ Connection failed: ${error}`]);
    } finally {
      setIsTesting(false);
    }
  };

  const getStatusColor = () => {
    if (isConnected === null) return 'text-gray-400';
    return isConnected ? 'text-green-400' : 'text-yellow-400';
  };

  const getStatusIcon = () => {
    if (isTesting) return <RefreshCw className="w-5 h-5 animate-spin" />;
    if (isConnected === null) return <Info className="w-5 h-5" />;
    if (isConnected) return <CheckCircle className="w-5 h-5" />;
    return <AlertTriangle className="w-5 h-5" />;
  };

  const getStatusText = () => {
    if (isTesting) return 'Testing...';
    if (isConnected === null) return 'Not tested';
    if (isConnected) return 'Connected';
    return 'Simulation Mode';
  };

  return (
    <div className="bg-slate-800/50 backdrop-blur-sm rounded-lg p-6 border border-slate-700">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-white flex items-center gap-2">
          {isConnected ? <Wifi className="w-5 h-5 text-green-400" /> : <WifiOff className="w-5 h-5 text-yellow-400" />}
          Qloo API Connection Status
        </h3>
        <button
          onClick={testConnection}
          disabled={isTesting}
          className="flex items-center gap-2 px-4 py-2 bg-cyan-600 hover:bg-cyan-700 disabled:bg-gray-600 disabled:cursor-not-allowed text-white rounded-lg text-sm transition-colors"
        >
          <RefreshCw className={`w-4 h-4 ${isTesting ? 'animate-spin' : ''}`} />
          Test Connection
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
        <div className="bg-slate-700/50 rounded-lg p-4">
          <div className="flex items-center gap-2 mb-2">
            {getStatusIcon()}
            <span className="font-medium text-white">Status</span>
          </div>
          <div className={`text-lg font-bold ${getStatusColor()}`}>
            {getStatusText()}
          </div>
        </div>

        <div className="bg-slate-700/50 rounded-lg p-4">
          <div className="flex items-center gap-2 mb-2">
            <Info className="w-5 h-5 text-blue-400" />
            <span className="font-medium text-white">API Key</span>
          </div>
          <div className="text-sm text-gray-300">
            {apiKey ? `${apiKey.substring(0, 8)}...${apiKey.substring(apiKey.length - 4)}` : 'Not configured'}
          </div>
        </div>
      </div>

      <div className="bg-slate-700/50 rounded-lg p-4">
        <h4 className="font-medium text-white mb-2">Test Results</h4>
        <div className="space-y-1 max-h-32 overflow-y-auto">
          {testResults.map((result, index) => (
            <div key={index} className="text-sm text-gray-300 font-mono">
              {result}
            </div>
          ))}
        </div>
      </div>

      {!isConnected && (
        <div className="mt-4 p-3 bg-yellow-500/10 border border-yellow-500/30 rounded-lg">
          <p className="text-xs text-yellow-400">
            ⚠️ Qloo API not connected. The system is using advanced simulation mode with realistic data patterns.
            All analyses and insights are generated using sophisticated behavioral models.
          </p>
        </div>
      )}

      {isConnected && (
        <div className="mt-4 p-3 bg-green-500/10 border border-green-500/30 rounded-lg">
          <p className="text-xs text-green-400">
            ✅ Qloo API connected! Real-time cultural data and insights are now available.
            The system will use live data from 500M+ consumer profiles for maximum accuracy.
          </p>
        </div>
      )}
    </div>
  );
};

export default QlooConnectionTester;