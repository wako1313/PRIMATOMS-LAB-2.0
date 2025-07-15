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
    setTestResults(['🔍 Testing Qloo API v2 connection...']);
    
    try {
      const connected = await qlooService.testConnection();
      setIsConnected(connected);
      
      if (connected) {
        setTestResults(prev => [...prev, '✅ Qloo API v2 connected successfully!']);
        
        // Test de l'endpoint Insights API v2
        try {
          setTestResults(prev => [...prev, '📊 Testing Insights API v2...']);
          const trends = await qlooService.getGlobalTrends();
          setTestResults(prev => [...prev, `✅ Insights API v2: ${trends.trending_entities.length} entities loaded`]);
        } catch (error) {
          setTestResults(prev => [...prev, '⚠️ Insights API using simulation mode']);
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
            <span className="font-medium text-white">API Configuration</span>
          </div>
          <div className="text-xs text-gray-300 space-y-1">
            <div>Key: {apiKey ? `${apiKey.substring(0, 8)}...${apiKey.substring(apiKey.length - 4)}` : 'Not configured'}</div>
            <div>Endpoint: https://api.qloo.com/v2/insights/</div>
            <div>Method: GET with X-Api-Key header</div>
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
            ⚠️ Qloo API v2 not connected. Using advanced simulation mode with realistic data patterns.
            Configure your API key in .env file: VITE_QLOO_API_KEY=your_key_here
          </p>
        </div>
      )}

      {isConnected && (
        <div className="mt-4 p-3 bg-green-500/10 border border-green-500/30 rounded-lg">
          <p className="text-xs text-green-400">
            ✅ Qloo API v2 connected! Real-time cultural insights from Insights API are now available.
            Using official endpoints with proper authentication and data transformation.
          </p>
        </div>
      )}
    </div>
  );
};

export default QlooConnectionTester;