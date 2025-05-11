import React, { useState } from 'react';
import { Camera, Refrigerator, GripHorizontal, WifiIcon, Clock, Link as LinkIcon } from 'lucide-react';

// Define types for device data
interface DeviceData {
  id: string;
  name: string;
  type: string;
  icon: React.ReactNode;
  protocol: string;
  lastActive: string;
  status: 'online' | 'offline';
  data: any;
}

const DevicesPage: React.FC = () => {
  // Simulated device data
  const [devices] = useState<DeviceData[]>([
    {
      id: 'device-001',
      name: 'Smart Shopping Camera',
      type: 'camera',
      icon: <Camera className="h-8 w-8" />,
      protocol: 'HTTP',
      lastActive: '2025-05-07 15:23:45',
      status: 'online',
      data: {
        shopping_note: "osta 2 tomaattia, osta maito, munat, leipä"
      }
    },
    {
      id: 'device-002',
      name: 'Smart Fridge Inventory',
      type: 'refrigerator',
      icon: <Refrigerator className="h-8 w-8" />,
      protocol: 'MQTT',
      lastActive: '2025-05-07 15:20:12',
      status: 'online',
      data: {
        items: ["maito", "juusto", "tomaatti", "kurkku", "voi"],
        timestamp: "2025-05-07T15:20:12"
      }
    }
  ]);

  // State for active tab
  const [activeTab, setActiveTab] = useState<string>('all');

  // Filtered devices based on active tab
  const filteredDevices = activeTab === 'all' 
    ? devices 
    : devices.filter(device => device.type === activeTab);

  return (
    <div className="bg-slate-50 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Header section */}
        <div className="mb-12">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Kitchen IoT Devices
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl">
            Monitor and manage your connected kitchen devices. View real-time data from your Smart Shopping Camera and Smart Fridge Inventory.
          </p>
        </div>

        {/* Device type tabs */}
        <div className="flex overflow-x-auto mb-8 border-b border-gray-200 pb-1">
          <button 
            className={`px-4 py-2 font-medium text-sm rounded-t-lg mr-2 whitespace-nowrap ${
              activeTab === 'all' 
                ? 'bg-blue-600 text-white' 
                : 'bg-white text-gray-600 hover:bg-gray-100'
            }`}
            onClick={() => setActiveTab('all')}
          >
            <GripHorizontal className="inline-block h-4 w-4 mr-1" />
            All Devices
          </button>
          <button 
            className={`px-4 py-2 font-medium text-sm rounded-t-lg mr-2 whitespace-nowrap ${
              activeTab === 'camera' 
                ? 'bg-blue-600 text-white' 
                : 'bg-white text-gray-600 hover:bg-gray-100'
            }`}
            onClick={() => setActiveTab('camera')}
          >
            <Camera className="inline-block h-4 w-4 mr-1" />
            Cameras
          </button>
          <button 
            className={`px-4 py-2 font-medium text-sm rounded-t-lg mr-2 whitespace-nowrap ${
              activeTab === 'refrigerator' 
                ? 'bg-blue-600 text-white' 
                : 'bg-white text-gray-600 hover:bg-gray-100'
            }`}
            onClick={() => setActiveTab('refrigerator')}
          >
            <Refrigerator className="inline-block h-4 w-4 mr-1" />
            Refrigerators
          </button>
        </div>

        {/* Devices grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {filteredDevices.map(device => (
            <div key={device.id} className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
              <div className="p-6">
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center">
                    <div className={`p-3 rounded-lg ${
                      device.status === 'online' ? 'bg-blue-100 text-blue-600' : 'bg-gray-100 text-gray-600'
                    }`}>
                      {device.icon}
                    </div>
                    <div className="ml-4">
                      <h2 className="text-xl font-semibold text-gray-900">{device.name}</h2>
                      <p className="text-sm text-gray-500">ID: {device.id}</p>
                    </div>
                  </div>
                  <div className={`px-3 py-1 rounded-full text-xs font-medium ${
                    device.status === 'online' 
                      ? 'bg-green-100 text-green-800' 
                      : 'bg-red-100 text-red-800'
                  }`}>
                    {device.status.toUpperCase()}
                  </div>
                </div>
                
                <div className="grid grid-cols-2 gap-4 mb-6">
                  <div className="flex items-center">
                    <WifiIcon className="h-5 w-5 text-gray-400 mr-2" />
                    <span className="text-sm text-gray-600">Protocol: <span className="font-medium">{device.protocol}</span></span>
                  </div>
                  <div className="flex items-center">
                    <Clock className="h-5 w-5 text-gray-400 mr-2" />
                    <span className="text-sm text-gray-600">Last Active: <span className="font-medium">{device.lastActive}</span></span>
                  </div>
                </div>
                
                <div className="mb-4">
                  <h3 className="text-sm font-medium text-gray-700 mb-2">Latest Data</h3>
                  <div className="bg-slate-50 rounded-md p-4">
                    <pre className="text-xs text-slate-700 overflow-x-auto">
                      {JSON.stringify(device.data, null, 2)}
                    </pre>
                  </div>
                </div>
                
                <div className="mt-4 flex justify-end">
                  <button className="flex items-center text-sm font-medium text-blue-600 hover:text-blue-800">
                    <LinkIcon className="h-4 w-4 mr-1" />
                    View in Thingsboard
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        {filteredDevices.length === 0 && (
          <div className="text-center py-12 bg-white rounded-xl shadow-sm">
            <p className="text-gray-600">No devices found in this category.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default DevicesPage;