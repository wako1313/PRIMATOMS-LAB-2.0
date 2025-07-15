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
    setTestResults([
      '🔍 Starting comprehensive Qloo Hackathon API diagnostics...',
      `🔑 API Key: ${apiKey.substring(0, 8)}...${apiKey.substring(apiKey.length - 4)}`,
      '🏆 Hackathon Server: https://hackathon.api.qloo.com',
      '📋 Testing multiple endpoints and auth methods...',
      '💡 Open DevTools → Console for detailed logs'
    ]);
    
    try {
      const connected = await qlooService.testConnection();
      setIsConnected(connected);
      
      if (connected) {
        setTestResults(prev => [...prev, 
          '✅ Qloo Hackathon API connection successful!',
          '🎯 Real-time cultural data now available'
        ]);
        
        // Test des fonctionnalités principales
        try {
          setTestResults(prev => [...prev, '📊 Testing cultural insights...']);
          const trends = await qlooService.getGlobalTrends();
          setTestResults(prev => [...prev, `✅ Cultural trends: ${trends.trending_entities.length} entities loaded`]);
        } catch (error) {
          setTestResults(prev => [...prev, '⚠️ Cultural insights using simulation mode']);
        }
        
      } else {
        setTestResults(prev => [...prev, 
          '❌ All Hackathon API endpoints failed',
          '🔧 Using advanced simulation mode',
          '📋 Check console for detailed error analysis',
          '💡 Simulation provides realistic cultural data patterns'
        ]);
      }
    } catch (error) {
      setIsConnected(false);
      setTestResults(prev => [...prev, 
        `❌ Hackathon API connection failed: ${error}`,
        '📋 See browser console for detailed diagnostics',
        '🔧 Advanced simulation mode activated'
      ]);
    } finally {
      setIsTesting(false);
    }
  };

  const testDirectly = async () => {
    setTestResults(prev => [...prev, '🧪 Testing direct endpoint manually...']);
    try {
      await qlooService.testDirectEndpoint();
      setTestResults(prev => [...prev, '📊 Check console for direct test results']);
    } catch (error) {
      setTestResults(prev => [...prev, `❌ Direct test failed: ${error}`]);
    }
  };

  const runSystematicDebugging = async () => {
    setTestResults(prev => [...prev, '🔬 Lancement du debugging systématique...']);
    setTestResults(prev => [...prev, '📋 Ouvrez la Console (F12) pour voir l\'analyse complète']);
    try {
      await qlooService.systematicDebugging();
      setTestResults(prev => [...prev, '✅ Debugging systématique terminé - Voir console pour détails']);
    } catch (error) {
      setTestResults(prev => [...prev, `❌ Erreur debugging: ${error}`]);
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
        <button
          onClick={runSystematicDebugging}
          className="flex items-center gap-2 px-4 py-2 bg-orange-600 hover:bg-orange-700 text-white rounded-lg text-sm transition-colors"
        >
          🔬 Debug Systématique
        </button>
        <button
          onClick={testDirectly}
          className="flex items-center gap-2 px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-lg text-sm transition-colors"
        >
          🧪 Direct Test
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
            <div>Endpoint: https://hackathon.api.qloo.com/v2/insights/</div>
            <div>Method: GET with X-Api-Key header</div>
          </div>
        </div>
      </div>

      <div className="bg-slate-700/50 rounded-lg p-4 mb-4">
        <h4 className="font-medium text-white mb-2">Diagnostic Information</h4>
        <div className="text-xs text-gray-300 space-y-1">
          <div>🔍 Testing Qloo Hackathon API endpoints</div>
          <div>⏱️ 10-second timeout per endpoint</div>
          <div>📋 Detailed logs available in browser console</div>
          <div>🏆 Hackathon server: https://hackathon.api.qloo.com</div>
          <div>💡 Open browser DevTools → Console for full diagnostics</div>
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
            ⚠️ Qloo API not accessible. Possible causes:<br/>
            • API key invalid or expired<br/>
            • Network/CORS restrictions<br/>
            • Endpoint changes<br/>
            • Rate limiting<br/>
            <strong>→ Using advanced simulation mode with realistic data patterns</strong>
          </p>
        </div>
      )}

      {isConnected && (
        <div className="mt-4 p-3 bg-green-500/10 border border-green-500/30 rounded-lg">
          <p className="text-xs text-green-400">
            ✅ Qloo Hackathon API connected! Real-time cultural insights from Hackathon server are now available.
            Using hackathon.api.qloo.com with your competition API key.
          </p>
        </div>
      )}
    </div>
  );
};

export default QlooConnectionTester;