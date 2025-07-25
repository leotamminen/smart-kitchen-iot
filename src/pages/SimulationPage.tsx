import React, { useState, useEffect, useCallback } from 'react';
import mqtt from 'mqtt';
import { useInterval } from 'react-use';
import { Play, Pause, Clock, RefreshCw, Terminal, Send, Radio, AlertCircle } from 'lucide-react';

interface Message {
  timestamp: string;
  payload: string;
}

interface SimulationConfig {
  interval: number;
  isRunning: boolean;
  messages: Message[];
}

const INTERVALS = {
  OFF: 0,
  TEN_SECONDS: 10000,
  TEN_MINUTES: 600000,
  ONE_HOUR: 3600000,
  FIVE_HOURS: 18000000,
  TWENTY_FOUR_HOURS: 86400000,
};

const SimulationPage: React.FC = () => {
  // HTTP Device State
  const [httpMethod, setHttpMethod] = useState('POST');
  const [httpEndpoint, setHttpEndpoint] = useState('http://localhost:8080/api/data');
  const [httpPayload, setHttpPayload] = useState('{\n  "item": "maito"\n}');
  const [httpConfig, setHttpConfig] = useState<SimulationConfig>({
    interval: 0,
    isRunning: false,
    messages: [],
  });

  // MQTT Device State
  const [mqttClient, setMqttClient] = useState<mqtt.MqttClient | null>(null);
  const [mqttBroker, setMqttBroker] = useState('mqtt://127.0.0.1:1883');
  const [mqttTopic, setMqttTopic] = useState('v1/devices/me/telemetry');
  const [mqttUsername, setMqttUsername] = useState('');
  const [mqttPayload, setMqttPayload] = useState(
    '{\n  "items": ["maito", "tomaatti", "juusto"]\n}'
  );
  const [mqttConfig, setMqttConfig] = useState<SimulationConfig>({
    interval: 0,
    isRunning: false,
    messages: [],
  });

  const addMessage = useCallback((messages: Message[], payload: string) => {
    const newMessage = {
      timestamp: new Date().toLocaleString(),
      payload,
    };
    return [...messages.slice(-4), newMessage];
  }, []);

  const simulateHttpRequest = useCallback(() => {
    let parsedPayload;
    try {
      parsedPayload = JSON.parse(httpPayload);
    } catch (err) {
      console.error("❌ Invalid JSON in payload:", err);
      alert("Payload is not valid JSON");
      return;
    }

    console.log("📤 Sending HTTP request", {
      method: httpMethod,
      endpoint: httpEndpoint,
      payload: parsedPayload,
    });

    fetch(httpEndpoint, {
      method: httpMethod,
      headers: {
        "Content-Type": "application/json",
      },
      body:
        httpMethod === "GET" || httpMethod === "DELETE"
          ? undefined
          : JSON.stringify(parsedPayload),
    })
      .then((res) => {
        if (!res.ok) {
          console.error(`❌ HTTP ${httpMethod} request failed`, res.status, res.statusText);
        } else {
          console.log("✅ HTTP request successful");
          setHttpConfig((prev) => ({
            ...prev,
            messages: addMessage(prev.messages, httpPayload),
          }));
        }
      })
      .catch((err) => {
        console.error("❌ HTTP request error:", err);
      });
  }, [httpPayload, httpEndpoint, httpMethod, addMessage]);

  useEffect(() => {
    if (mqttConfig.isRunning && !mqttClient && mqttUsername) {
      const client = mqtt.connect(mqttBroker, {
        username: mqttUsername,
        protocolVersion: 4,
        protocolId: 'MQTT',
        clientId: 'web_' + Math.random().toString(16).substr(2, 8),
        clean: true,
        reconnectPeriod: 5000,
        connectTimeout: 3000,
      });

      client.on('connect', () => {
        console.log('✅ Connected to MQTT broker');
        client.publish(mqttTopic, JSON.stringify({ connected: true }));
      });

      client.on('error', (err) => {
        console.error('❌ Connection error:', err.message);
      });

      setMqttClient(client);
    }

    if (!mqttConfig.isRunning && mqttClient) {
      console.log('🛑 Stopping MQTT client...');
      mqttClient.end(true, {}, () => {
        console.log('✅ MQTT client disconnected');
        setMqttClient(null);
      });
    }

    return () => {
      if (mqttClient) {
        mqttClient.end(true);
        setMqttClient(null);
      }
    };
  }, [mqttConfig.isRunning, mqttClient, mqttBroker, mqttUsername, mqttTopic]);

  const simulateMqttPublish = useCallback(() => {
    if (mqttClient && mqttClient.connected) {
      try {
        const parsed = JSON.parse(mqttPayload);
        mqttClient.publish(mqttTopic, JSON.stringify(parsed), {}, (err) => {
          if (err) {
            console.error('❌ Failed to publish:', err);
          } else {
            console.log('📡 Data sent:', parsed);
            setMqttConfig(prev => ({
              ...prev,
              messages: addMessage(prev.messages, mqttPayload),
            }));
          }
        });
      } catch (err) {
        console.error("❌ Invalid MQTT JSON payload:", err);
      }
    }
  }, [mqttClient, mqttPayload, mqttTopic, addMessage]);

  useInterval(simulateHttpRequest, httpConfig.interval || null);
  useInterval(simulateMqttPublish, mqttConfig.interval || null);

  const toggleSimulation = (type: 'http' | 'mqtt') => {
    if (type === 'mqtt' && !mqttUsername) {
      alert('Please enter MQTT username (access token) before starting');
      return;
    }

    if (type === 'http') {
      setHttpConfig(prev => {
        const updated = { ...prev, isRunning: !prev.isRunning };
        if (!prev.isRunning) {
          setTimeout(() => simulateHttpRequest(), 0);
        }
        return updated;
      });
    } else {
      setMqttConfig(prev => {
        const updated = { ...prev, isRunning: !prev.isRunning };
        if (!prev.isRunning) {
          setTimeout(() => simulateMqttPublish(), 0);
        }
        return updated;
      });
    }
  };

  return (
    <div className="bg-slate-50 min-h-screen py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Device Simulation</h1>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* HTTP Device Panel */}
          <div className="bg-white rounded-xl shadow-sm overflow-hidden">
            <div className="p-6 border-b border-gray-200">
              <div className="flex justify-between items-center">
                <div className="flex items-center">
                  <Send className="h-6 w-6 text-blue-600 mr-2" />
                  <h2 className="text-xl font-semibold">Smart Shopping Camera (HTTP)</h2>
                </div>
                <button
                  onClick={() => toggleSimulation('http')}
                  className={`px-4 py-2 rounded-md font-medium flex items-center ${
                    httpConfig.isRunning
                      ? 'bg-red-500 hover:bg-red-600 text-white'
                      : 'bg-green-500 hover:bg-green-600 text-white'
                  }`}
                >
                  {httpConfig.isRunning ? (
                    <>
                      <Pause className="h-5 w-5 mr-2" />
                      Stop
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

            <div className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">HTTP Method</label>
                <select
                  value={httpMethod}
                  onChange={(e) => setHttpMethod(e.target.value)}
                  className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                >
                  {['GET', 'POST', 'PUT', 'DELETE'].map(method => (
                    <option key={method} value={method}>{method}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Endpoint URL</label>
                <input
                  type="text"
                  value={httpEndpoint}
                  onChange={(e) => setHttpEndpoint(e.target.value)}
                  placeholder="http://localhost:8080/api/v1/DEVICE_TOKEN/telemetry"
                  className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Message Body (JSON)</label>
                <textarea
                  value={httpPayload}
                  onChange={(e) => setHttpPayload(e.target.value)}
                  rows={4}
                  className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 font-mono text-sm"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Send Interval</label>
                <select
                  value={httpConfig.interval}
                  onChange={(e) => setHttpConfig(prev => ({ ...prev, interval: Number(e.target.value) }))}
                  className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                >
                  <option value={INTERVALS.OFF}>Off</option>
                  <option value={INTERVALS.TEN_SECONDS}>Every 10 seconds</option>
                  <option value={INTERVALS.TEN_MINUTES}>Every 10 minutes</option>
                  <option value={INTERVALS.ONE_HOUR}>Every hour</option>
                  <option value={INTERVALS.FIVE_HOURS}>Every 5 hours</option>
                  <option value={INTERVALS.TWENTY_FOUR_HOURS}>Every 24 hours</option>
                </select>
              </div>

              {httpConfig.messages.length > 0 && (
                <div>
                  <h3 className="text-sm font-medium text-gray-700 mb-2">Last Messages</h3>
                  <div className="space-y-2">
                    {httpConfig.messages.map((msg, idx) => (
                      <div key={idx} className="bg-gray-50 p-3 rounded-md">
                        <p className="text-xs text-gray-500 mb-1">{msg.timestamp}</p>
                        <pre className="text-xs text-gray-700 overflow-x-auto">{msg.payload}</pre>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* MQTT Device Panel */}
          <div className="bg-white rounded-xl shadow-sm overflow-hidden">
            <div className="p-6 border-b border-gray-200">
              <div className="flex justify-between items-center">
                <div className="flex items-center">
                  <Radio className="h-6 w-6 text-purple-600 mr-2" />
                  <h2 className="text-xl font-semibold">Smart Fridge Inventory (MQTT)</h2>
                </div>
                <button
                  onClick={() => toggleSimulation('mqtt')}
                  className={`px-4 py-2 rounded-md font-medium flex items-center ${
                    mqttConfig.isRunning
                      ? 'bg-red-500 hover:bg-red-600 text-white'
                      : 'bg-green-500 hover:bg-green-600 text-white'
                  }`}
                >
                  {mqttConfig.isRunning ? (
                    <>
                      <Pause className="h-5 w-5 mr-2" />
                      Stop
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

            <div className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">MQTT Broker</label>
                <input
                  type="text"
                  value={mqttBroker}
                  onChange={(e) => setMqttBroker(e.target.value)}
                  placeholder="mqtt://127.0.0.1:1883"
                  className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Username (Access Token)</label>
                <input
                  type="text"
                  value={mqttUsername}
                  onChange={(e) => setMqttUsername(e.target.value)}
                  placeholder="Enter your device access token"
                  className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Topic</label>
                <input
                  type="text"
                  value={mqttTopic}
                  onChange={(e) => setMqttTopic(e.target.value)}
                  placeholder="v1/devices/me/telemetry"
                  className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Message Payload (JSON)</label>
                <textarea
                  value={mqttPayload}
                  onChange={(e) => setMqttPayload(e.target.value)}
                  rows={4}
                  className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 font-mono text-sm"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Publish Interval</label>
                <select
                  value={mqttConfig.interval}
                  onChange={(e) => setMqttConfig(prev => ({ ...prev, interval: Number(e.target.value) }))}
                  className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                >
                  <option value={INTERVALS.OFF}>Off</option>
                  <option value={INTERVALS.TEN_SECONDS}>Every 10 seconds</option>
                  <option value={INTERVALS.TEN_MINUTES}>Every 10 minutes</option>
                  <option value={INTERVALS.ONE_HOUR}>Every hour</option>
                  <option value={INTERVALS.FIVE_HOURS}>Every 5 hours</option>
                  <option value={INTERVALS.TWENTY_FOUR_HOURS}>Every 24 hours</option>
                </select>
              </div>

              {mqttConfig.messages.length > 0 && (
                <div>
                  <h3 className="text-sm font-medium text-gray-700 mb-2">Last Messages</h3>
                  <div className="space-y-2">
                    {mqttConfig.messages.map((msg, idx) => (
                      <div key={idx} className="bg-gray-50 p-3 rounded-md">
                        <p className="text-xs text-gray-500 mb-1">{msg.timestamp}</p>
                        <pre className="text-xs text-gray-700 overflow-x-auto">{msg.payload}</pre>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SimulationPage;
