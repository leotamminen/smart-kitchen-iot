import React, { useState, useEffect } from 'react';
import { Play, Pause, Clock, RefreshCw, Terminal, Clipboard, Check } from 'lucide-react';

interface SimulationStatus {
  deviceType: 'camera' | 'fridge';
  status: 'idle' | 'running' | 'paused';
  lastUpdate: string;
  dataCount: number;
}

const SimulationPage: React.FC = () => {
  const [cameraSimulation, setCameraSimulation] = useState<SimulationStatus>({
    deviceType: 'camera',
    status: 'idle',
    lastUpdate: '-',
    dataCount: 0
  });

  const [fridgeSimulation, setFridgeSimulation] = useState<SimulationStatus>({
    deviceType: 'fridge',
    status: 'idle',
    lastUpdate: '-',
    dataCount: 0
  });

  const [activeTab, setActiveTab] = useState<'camera' | 'fridge'>('camera');
  const [configVisible, setConfigVisible] = useState(false);
  const [copied, setCopied] = useState(false);

  // Sample configuration for Camera
  const cameraConfig = `# Smart Shopping Camera Configuration
THINGSBOARD_HOST = "localhost"
THINGSBOARD_PORT = 9090
DEVICE_ACCESS_TOKEN = "YOUR_DEVICE_ACCESS_TOKEN"

# Simulation settings
INTERVAL_SECONDS = 600  # 10 minutes
CAMERA_ENABLED = True`;

  // Sample configuration for Fridge
  const fridgeConfig = `# Smart Fridge Configuration
THINGSBOARD_HOST = "localhost"
MQTT_PORT = 1883
DEVICE_ACCESS_TOKEN = "YOUR_DEVICE_ACCESS_TOKEN"

# MQTT Settings
TOPIC = "v1/devices/me/telemetry"

# Simulation settings
INTERVAL_SECONDS = 600  # 10 minutes
FRIDGE_ENABLED = True`;

  // Function to toggle simulation status
  const toggleSimulation = (deviceType: 'camera' | 'fridge') => {
    if (deviceType === 'camera') {
      const newStatus = cameraSimulation.status === 'running' ? 'paused' : 'running';
      setCameraSimulation({
        ...cameraSimulation,
        status: newStatus,
        lastUpdate: newStatus === 'running' ? new Date().toLocaleTimeString() : cameraSimulation.lastUpdate
      });
    } else {
      const newStatus = fridgeSimulation.status === 'running' ? 'paused' : 'running';
      setFridgeSimulation({
        ...fridgeSimulation,
        status: newStatus,
        lastUpdate: newStatus === 'running' ? new Date().toLocaleTimeString() : fridgeSimulation.lastUpdate
      });
    }
  };

  // Simulated data updates
  useEffect(() => {
    let cameraInterval: number | undefined;
    let fridgeInterval: number | undefined;

    if (cameraSimulation.status === 'running') {
      cameraInterval = window.setInterval(() => {
        setCameraSimulation(prev => ({
          ...prev,
          dataCount: prev.dataCount + 1,
          lastUpdate: new Date().toLocaleTimeString()
        }));
      }, 10000); // Update every 10 seconds for demo purposes
    }

    if (fridgeSimulation.status === 'running') {
      fridgeInterval = window.setInterval(() => {
        setFridgeSimulation(prev => ({
          ...prev,
          dataCount: prev.dataCount + 1,
          lastUpdate: new Date().toLocaleTimeString()
        }));
      }, 10000); // Update every 10 seconds for demo purposes
    }

    return () => {
      if (cameraInterval) clearInterval(cameraInterval);
      if (fridgeInterval) clearInterval(fridgeInterval);
    };
  }, [cameraSimulation.status, fridgeSimulation.status]);

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  return (
    <div className="bg-slate-50 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="mb-12">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Device Simulation
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl">
            Run simulated IoT devices that send data to Thingsboard. Monitor real-time data transmission and configure device settings.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl shadow-sm overflow-hidden sticky top-24">
              <div className="p-4 bg-blue-600 text-white">
                <h2 className="text-xl font-semibold">Devices</h2>
              </div>
              <nav className="p-4">
                <ul className="space-y-2">
                  <li>
                    <button
                      onClick={() => setActiveTab('camera')}
                      className={`w-full flex items-center px-4 py-3 text-left rounded-lg transition-colors ${
                        activeTab === 'camera'
                          ? 'bg-blue-50 text-blue-700 border border-blue-100'
                          : 'text-gray-700 hover:bg-gray-100'
                      }`}
                    >
                      <div className={`p-2 rounded-md mr-3 ${
                        cameraSimulation.status === 'running' 
                          ? 'bg-green-100 text-green-600' 
                          : 'bg-gray-100 text-gray-600'
                      }`}>
                        <RefreshCw className={`h-5 w-5 ${
                          cameraSimulation.status === 'running' ? 'animate-spin' : ''
                        }`} />
                      </div>
                      <div>
                        <p className="font-medium">Smart Shopping Camera</p>
                        <p className="text-sm text-gray-500">
                          Status: {cameraSimulation.status.charAt(0).toUpperCase() + cameraSimulation.status.slice(1)}
                        </p>
                      </div>
                    </button>
                  </li>
                  <li>
                    <button
                      onClick={() => setActiveTab('fridge')}
                      className={`w-full flex items-center px-4 py-3 text-left rounded-lg transition-colors ${
                        activeTab === 'fridge'
                          ? 'bg-blue-50 text-blue-700 border border-blue-100'
                          : 'text-gray-700 hover:bg-gray-100'
                      }`}
                    >
                      <div className={`p-2 rounded-md mr-3 ${
                        fridgeSimulation.status === 'running' 
                          ? 'bg-green-100 text-green-600' 
                          : 'bg-gray-100 text-gray-600'
                      }`}>
                        <RefreshCw className={`h-5 w-5 ${
                          fridgeSimulation.status === 'running' ? 'animate-spin' : ''
                        }`} />
                      </div>
                      <div>
                        <p className="font-medium">Smart Fridge Inventory</p>
                        <p className="text-sm text-gray-500">
                          Status: {fridgeSimulation.status.charAt(0).toUpperCase() + fridgeSimulation.status.slice(1)}
                        </p>
                      </div>
                    </button>
                  </li>
                </ul>
              </nav>
              <div className="px-4 py-4 border-t border-gray-200">
                <div className="flex justify-between items-center text-sm text-gray-600">
                  <div className="flex items-center">
                    <Clock className="h-4 w-4 mr-1" />
                    <span>Last Update:</span>
                  </div>
                  <span className="font-medium">
                    {activeTab === 'camera' ? cameraSimulation.lastUpdate : fridgeSimulation.lastUpdate}
                  </span>
                </div>
                <div className="flex justify-between items-center mt-2 text-sm text-gray-600">
                  <div className="flex items-center">
                    <Terminal className="h-4 w-4 mr-1" />
                    <span>Data Sent:</span>
                  </div>
                  <span className="font-medium">
                    {activeTab === 'camera' ? cameraSimulation.dataCount : fridgeSimulation.dataCount} payloads
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Main content */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-xl shadow-sm overflow-hidden">
              <div className="p-6 border-b border-gray-200">
                <div className="flex justify-between items-center">
                  <h2 className="text-2xl font-bold text-gray-900">
                    {activeTab === 'camera' ? 'Smart Shopping Camera' : 'Smart Fridge Inventory'}
                  </h2>
                  <button
                    onClick={() => toggleSimulation(activeTab)}
                    className={`px-4 py-2 rounded-md font-medium flex items-center ${
                      (activeTab === 'camera' ? cameraSimulation.status : fridgeSimulation.status) === 'running'
                        ? 'bg-amber-500 hover:bg-amber-600 text-white'
                        : 'bg-green-500 hover:bg-green-600 text-white'
                    }`}
                  >
                    {(activeTab === 'camera' ? cameraSimulation.status : fridgeSimulation.status) === 'running' ? (
                      <>
                        <Pause className="h-5 w-5 mr-2" />
                        Pause
                      </>
                    ) : (
                      <>
                        <Play className="h-5 w-5 mr-2" />
                        Start
                      </>
                    )}
                  </button>
                </div>
              </div>

              <div className="p-6">
                <div className="mb-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">Description</h3>
                  <p className="text-gray-600">
                    {activeTab === 'camera' ? (
                      'The Smart Shopping Camera simulates reading shopping lists from a kitchen whiteboard and sending the recognized text to Thingsboard via HTTP protocol every 10 minutes.'
                    ) : (
                      'The Smart Fridge Inventory simulates tracking what items are currently inside a refrigerator and sends this data to Thingsboard via MQTT protocol every 10 minutes.'
                    )}
                  </p>
                </div>

                <div className="mb-6">
                  <div className="flex justify-between items-center mb-2">
                    <h3 className="text-lg font-semibold text-gray-900">Sample Data</h3>
                    <span className="text-sm text-gray-500">
                      {activeTab === 'camera' ? 'HTTP' : 'MQTT'} Protocol
                    </span>
                  </div>
                  <div className="bg-slate-800 text-blue-100 p-4 rounded-lg">
                    <pre className="text-sm overflow-x-auto">
                      {activeTab === 'camera' 
                        ? JSON.stringify({ shopping_note: "osta 2 tomaattia, osta maito, munat, leipä" }, null, 2) 
                        : JSON.stringify({ 
                            items: ["maito", "juusto", "tomaatti", "kurkku", "voi"], 
                            item_count: 5,
                            timestamp: "2025-05-07T14:10:00" 
                          }, null, 2)
                      }
                    </pre>
                  </div>
                </div>

                <div>
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="text-lg font-semibold text-gray-900">Configuration</h3>
                    <button
                      onClick={() => setConfigVisible(!configVisible)}
                      className="text-blue-600 hover:text-blue-700 text-sm font-medium"
                    >
                      {configVisible ? 'Hide Config' : 'Show Config'}
                    </button>
                  </div>
                  
                  {configVisible && (
                    <div className="relative bg-slate-100 p-4 rounded-lg">
                      <pre className="text-sm text-slate-700 overflow-x-auto">
                        {activeTab === 'camera' ? cameraConfig : fridgeConfig}
                      </pre>
                      <button
                        onClick={() => copyToClipboard(activeTab === 'camera' ? cameraConfig : fridgeConfig)}
                        className="absolute top-2 right-2 p-2 bg-white rounded-md hover:bg-gray-100 transition-colors"
                        title="Copy to clipboard"
                      >
                        {copied ? <Check className="h-5 w-5 text-green-600" /> : <Clipboard className="h-5 w-5 text-gray-600" />}
                      </button>
                    </div>
                  )}
                </div>
              </div>

              <div className="p-6 bg-gray-50 border-t border-gray-200">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">How to Use</h3>
                <ol className="list-decimal list-inside space-y-2 text-gray-600">
                  <li>Create the device in Thingsboard and get the access token</li>
                  <li>Update the configuration with your Thingsboard host and token</li>
                  <li>Run the Python script based on the example in the Documentation</li>
                  <li>Press Start above to see a simulation of how the data would appear</li>
                </ol>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SimulationPage;