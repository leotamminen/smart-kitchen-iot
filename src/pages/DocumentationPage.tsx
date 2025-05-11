import React, { useState } from 'react';
import { Book, Code, Server, Settings, Hash, Globe, Database, Terminal } from 'lucide-react';

interface TabInfo {
  id: string;
  label: string;
  icon: React.ReactNode;
}

const DocumentationPage: React.FC = () => {
  const tabs: TabInfo[] = [
    { id: 'overview', label: 'Overview', icon: <Book className="h-5 w-5" /> },
    { id: 'installation', label: 'Installation', icon: <Server className="h-5 w-5" /> },
    { id: 'http', label: 'HTTP Device', icon: <Globe className="h-5 w-5" /> },
    { id: 'mqtt', label: 'MQTT Device', icon: <Hash className="h-5 w-5" /> },
    { id: 'dashboard', label: 'Dashboard', icon: <Settings className="h-5 w-5" /> },
    { id: 'api', label: 'REST API', icon: <Code className="h-5 w-5" /> },
  ];

  const [activeTab, setActiveTab] = useState('overview');

  return (
    <div className="bg-slate-50 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="mb-12">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Documentation
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl">
            Learn how to set up and use the Smart Kitchen IoT Platform with detailed step-by-step guides.
          </p>
        </div>

        <div className="flex flex-col md:flex-row gap-8">
          {/* Sidebar */}
          <div className="md:w-1/4">
            <div className="bg-white rounded-xl shadow-sm overflow-hidden sticky top-24">
              <nav className="p-4">
                <ul className="space-y-1">
                  {tabs.map((tab) => (
                    <li key={tab.id}>
                      <button
                        onClick={() => setActiveTab(tab.id)}
                        className={`w-full flex items-center px-4 py-2 text-left rounded-lg transition-colors ${
                          activeTab === tab.id
                            ? 'bg-blue-600 text-white'
                            : 'text-gray-700 hover:bg-gray-100'
                        }`}
                      >
                        {tab.icon}
                        <span className="ml-3">{tab.label}</span>
                      </button>
                    </li>
                  ))}
                </ul>
              </nav>
            </div>
          </div>

          {/* Main content */}
          <div className="md:w-3/4">
            <div className="bg-white rounded-xl shadow-sm p-6 md:p-8">
              {activeTab === 'overview' && (
                <div>
                  <h2 className="text-2xl font-bold text-gray-900 mb-4">Project Overview</h2>
                  <p className="text-gray-600 mb-6">
                    The Smart Kitchen IoT Platform is a demonstration of IoT capabilities using Thingsboard as the core platform. It simulates two kitchen-related devices and shows how data can be collected, visualized, and managed.
                  </p>
                  
                  <h3 className="text-xl font-semibold text-gray-900 mb-3">Key Components</h3>
                  <ul className="list-disc list-inside space-y-2 text-gray-600 mb-6">
                    <li>Thingsboard IoT Platform</li>
                    <li>Simulated HTTP device (Smart Shopping Camera)</li>
                    <li>Simulated MQTT device (Smart Fridge Inventory)</li>
                    <li>Data visualization dashboards</li>
                    <li>REST API access</li>
                  </ul>
                  
                  <h3 className="text-xl font-semibold text-gray-900 mb-3">Architecture</h3>
                  <p className="text-gray-600 mb-4">
                    The system architecture follows standard IoT patterns with devices connecting to a central platform using HTTP and MQTT protocols:
                  </p>
                  
                  <div className="bg-gray-100 p-4 rounded-lg mb-6">
                    <pre className="text-sm text-gray-800 whitespace-pre-wrap">
{`Simulated Devices → Thingsboard Platform → User Interfaces
   - HTTP Client      - Data Storage        - Dashboards
   - MQTT Client      - Device Management   - REST API Access`}
                    </pre>
                  </div>
                  
                  <h3 className="text-xl font-semibold text-gray-900 mb-3">Technology Stack</h3>
                  <ul className="list-disc list-inside space-y-2 text-gray-600 mb-6">
                    <li>Thingsboard Community Edition</li>
                    <li>Python (for device simulation)</li>
                    <li>HTTP/REST API</li>
                    <li>MQTT Protocol</li>
                    <li>JavaScript and React (for web interface)</li>
                  </ul>
                </div>
              )}

              {activeTab === 'installation' && (
                <div>
                  <h2 className="text-2xl font-bold text-gray-900 mb-4">Installation Guide</h2>
                  
                  <h3 className="text-xl font-semibold text-gray-900 mb-3">Prerequisites</h3>
                  <ul className="list-disc list-inside space-y-2 text-gray-600 mb-6">
                    <li>Docker and Docker Compose (for local Thingsboard installation)</li>
                    <li>Python 3.8+ (for running device simulators)</li>
                    <li>npm or yarn (for the web interface)</li>
                  </ul>
                  
                  <h3 className="text-xl font-semibold text-gray-900 mb-3">1. Setting Up Thingsboard</h3>
                  <p className="text-gray-600 mb-4">
                    You can either use a cloud-hosted Thingsboard instance or set up a local instance using Docker:
                  </p>
                  
                  <div className="bg-gray-800 text-white p-4 rounded-lg mb-6 overflow-x-auto">
                    <pre className="text-sm">
{`# Pull and start Thingsboard using Docker
docker run -it -p 9090:9090 -p 1883:1883 -p 7070:7070 \\
  -p 5683-5688:5683-5688/udp thingsboard/tb-postgres`}
                    </pre>
                  </div>
                  
                  <p className="text-gray-600 mb-6">
                    Once started, Thingsboard will be available at <code className="bg-gray-100 px-2 py-1 rounded">http://localhost:9090</code>. The default credentials are:
                  </p>
                  
                  <div className="grid grid-cols-2 gap-4 mb-6">
                    <div className="bg-gray-100 p-4 rounded-lg">
                      <p className="font-medium text-gray-800">Username</p>
                      <p className="text-gray-600">tenant@thingsboard.org</p>
                    </div>
                    <div className="bg-gray-100 p-4 rounded-lg">
                      <p className="font-medium text-gray-800">Password</p>
                      <p className="text-gray-600">tenant</p>
                    </div>
                  </div>
                  
                  <h3 className="text-xl font-semibold text-gray-900 mb-3">2. Create Devices in Thingsboard</h3>
                  <ol className="list-decimal list-inside space-y-2 text-gray-600 mb-6">
                    <li>Log in to Thingsboard</li>
                    <li>Go to "Devices" section</li>
                    <li>Create a new device named "Smart Shopping Camera"</li>
                    <li>Create a new device named "Smart Fridge Inventory"</li>
                    <li>For each device, go to device details and copy the "Access Token"</li>
                  </ol>
                  
                  <h3 className="text-xl font-semibold text-gray-900 mb-3">3. Install Python Dependencies</h3>
                  
                  <div className="bg-gray-800 text-white p-4 rounded-lg mb-6 overflow-x-auto">
                    <pre className="text-sm">
{`pip install requests paho-mqtt`}
                    </pre>
                  </div>
                  
                  <h3 className="text-xl font-semibold text-gray-900 mb-3">4. Run the Web Interface</h3>
                  
                  <div className="bg-gray-800 text-white p-4 rounded-lg mb-6 overflow-x-auto">
                    <pre className="text-sm">
{`npm install
npm run dev`}
                    </pre>
                  </div>
                </div>
              )}

              {activeTab === 'http' && (
                <div>
                  <h2 className="text-2xl font-bold text-gray-900 mb-4">HTTP Device: Smart Shopping Camera</h2>
                  
                  <p className="text-gray-600 mb-6">
                    The Smart Shopping Camera simulates reading handwritten shopping lists from a kitchen whiteboard and sending the recognized text to Thingsboard using HTTP.
                  </p>
                  
                  <h3 className="text-xl font-semibold text-gray-900 mb-3">Python Example</h3>
                  <p className="text-gray-600 mb-4">
                    Here's a Python script that simulates the Smart Shopping Camera sending data to Thingsboard:
                  </p>
                  
                  <div className="bg-gray-800 text-white p-4 rounded-lg mb-6 overflow-x-auto">
                    <pre className="text-sm">
{`import requests
import json
import time
import random
from datetime import datetime

# Thingsboard settings
THINGSBOARD_HOST = "localhost"
THINGSBOARD_PORT = 9090
DEVICE_ACCESS_TOKEN = "YOUR_DEVICE_ACCESS_TOKEN"

# Thingsboard endpoint
url = f"http://{THINGSBOARD_HOST}:{THINGSBOARD_PORT}/api/v1/{DEVICE_ACCESS_TOKEN}/telemetry"

# Sample shopping items
shopping_items = [
    "maito", "leipä", "juusto", "tomaatti", "kurkku", "omenaa", 
    "banaania", "kahvi", "sokeri", "jauhot", "öljy", "kananmunat"
]

def simulate_camera_reading():
    """Simulate reading a shopping list from a camera"""
    # Generate a random number of items (2-5)
    num_items = random.randint(2, 5)
    # Randomly select items
    items = random.sample(shopping_items, num_items)
    # Format as a shopping note
    note = "osta " + ", osta ".join(items)
    return note

def send_telemetry():
    """Send telemetry data to Thingsboard"""
    # Generate simulated data
    shopping_note = simulate_camera_reading()
    
    # Prepare payload
    payload = {
        "shopping_note": shopping_note,
        "timestamp": datetime.now().isoformat()
    }
    
    # Convert to JSON
    payload_json = json.dumps(payload)
    
    # Set headers
    headers = {'Content-Type': 'application/json'}
    
    # Send HTTP request
    response = requests.post(url, headers=headers, data=payload_json)
    
    # Check response
    if response.status_code == 200:
        print(f"Data sent successfully: {payload}")
    else:
        print(f"Failed to send data. Status code: {response.status_code}")
        print(f"Response: {response.text}")

# Main loop - send data every 10 minutes
try:
    while True:
        send_telemetry()
        # Wait 10 minutes (600 seconds)
        time.sleep(600)
except KeyboardInterrupt:
    print("Stopped by user")
except Exception as e:
    print(f"Error: {e}")
`}
                    </pre>
                  </div>
                  
                  <h3 className="text-xl font-semibold text-gray-900 mb-3">Postman Example</h3>
                  <p className="text-gray-600 mb-4">
                    You can also test the HTTP device using Postman:
                  </p>
                  
                  <div className="space-y-4 mb-6">
                    <div className="grid grid-cols-3 gap-4">
                      <div className="font-medium text-gray-800">Method</div>
                      <div className="col-span-2 text-gray-600">POST</div>
                    </div>
                    <div className="grid grid-cols-3 gap-4">
                      <div className="font-medium text-gray-800">URL</div>
                      <div className="col-span-2 text-gray-600">
                        http://localhost:9090/api/v1/YOUR_DEVICE_ACCESS_TOKEN/telemetry
                      </div>
                    </div>
                    <div className="grid grid-cols-3 gap-4">
                      <div className="font-medium text-gray-800">Headers</div>
                      <div className="col-span-2 text-gray-600">
                        Content-Type: application/json
                      </div>
                    </div>
                    <div className="grid grid-cols-3 gap-4">
                      <div className="font-medium text-gray-800">Body (raw JSON)</div>
                      <div className="col-span-2">
                        <pre className="bg-gray-100 p-3 rounded-lg text-sm text-gray-800">
{`{
  "shopping_note": "osta maito, osta leipä, osta juusto"
}`}
                        </pre>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === 'mqtt' && (
                <div>
                  <h2 className="text-2xl font-bold text-gray-900 mb-4">MQTT Device: Smart Fridge Inventory</h2>
                  
                  <p className="text-gray-600 mb-6">
                    The Smart Fridge Inventory simulates tracking what items are currently inside a refrigerator and sends this data via MQTT protocol to Thingsboard.
                  </p>
                  
                  <h3 className="text-xl font-semibold text-gray-900 mb-3">Python Example</h3>
                  <p className="text-gray-600 mb-4">
                    Here's a Python script using paho-mqtt to simulate the Smart Fridge Inventory:
                  </p>
                  
                  <div className="bg-gray-800 text-white p-4 rounded-lg mb-6 overflow-x-auto">
                    <pre className="text-sm">
{`import paho.mqtt.client as mqtt
import json
import time
import random
from datetime import datetime

# MQTT settings for Thingsboard
THINGSBOARD_HOST = "localhost"
MQTT_PORT = 1883
DEVICE_ACCESS_TOKEN = "YOUR_DEVICE_ACCESS_TOKEN"
TOPIC = "v1/devices/me/telemetry"

# Sample fridge items
all_possible_items = [
    "maito", "juusto", "voi", "jogurtti", "kinkku", "makkara", "olut",
    "tomaatti", "kurkku", "paprika", "sitruuna", "omena", "banaani",
    "kananmunat", "limonaadi", "mehu", "siideri", "kerma"
]

# Connect callback
def on_connect(client, userdata, flags, rc):
    if rc == 0:
        print("Connected to MQTT broker")
    else:
        print(f"Connection failed with code {rc}")

# Simulate fridge inventory
class SmartFridge:
    def __init__(self):
        # Start with 5-10 random items
        num_initial_items = random.randint(5, 10)
        self.current_items = random.sample(all_possible_items, num_initial_items)
        
    def update_inventory(self):
        """Simulate changes to inventory (items added or removed)"""
        # Small chance to add a new item (20%)
        if random.random() < 0.2 and len(self.current_items) < 15:
            available_to_add = [item for item in all_possible_items if item not in self.current_items]
            if available_to_add:
                new_item = random.choice(available_to_add)
                self.current_items.append(new_item)
                print(f"Added {new_item} to fridge")
                
        # Small chance to remove an item (30%)
        if random.random() < 0.3 and len(self.current_items) > 3:
            item_to_remove = random.choice(self.current_items)
            self.current_items.remove(item_to_remove)
            print(f"Removed {item_to_remove} from fridge")
        
        return self.current_items

    def get_telemetry(self):
        """Generate telemetry data"""
        return {
            "items": self.current_items,
            "item_count": len(self.current_items),
            "timestamp": datetime.now().isoformat()
        }

# Initialize MQTT client
client = mqtt.Client()
client.on_connect = on_connect
client.username_pw_set(DEVICE_ACCESS_TOKEN)

# Initialize smart fridge
fridge = SmartFridge()

# Connect to MQTT broker
try:
    client.connect(THINGSBOARD_HOST, MQTT_PORT, 60)
    client.loop_start()
    
    # Main loop - send data every 10 minutes
    while True:
        # Update inventory
        fridge.update_inventory()
        
        # Get telemetry data
        payload = fridge.get_telemetry()
        
        # Convert to JSON and send
        client.publish(TOPIC, json.dumps(payload))
        print(f"Data sent: {payload}")
        
        # Wait 10 minutes (600 seconds)
        time.sleep(600)
        
except KeyboardInterrupt:
    print("Stopped by user")
    client.loop_stop()
    client.disconnect()
except Exception as e:
    print(f"Error: {e}")
    if client:
        client.loop_stop()
        client.disconnect()
`}
                    </pre>
                  </div>
                  
                  <h3 className="text-xl font-semibold text-gray-900 mb-3">MQTT Broker Information</h3>
                  <div className="space-y-4 mb-6">
                    <div className="grid grid-cols-3 gap-4">
                      <div className="font-medium text-gray-800">Broker Address</div>
                      <div className="col-span-2 text-gray-600">localhost (or your Thingsboard host)</div>
                    </div>
                    <div className="grid grid-cols-3 gap-4">
                      <div className="font-medium text-gray-800">Port</div>
                      <div className="col-span-2 text-gray-600">1883</div>
                    </div>
                    <div className="grid grid-cols-3 gap-4">
                      <div className="font-medium text-gray-800">Username</div>
                      <div className="col-span-2 text-gray-600">YOUR_DEVICE_ACCESS_TOKEN</div>
                    </div>
                    <div className="grid grid-cols-3 gap-4">
                      <div className="font-medium text-gray-800">Topic</div>
                      <div className="col-span-2 text-gray-600">v1/devices/me/telemetry</div>
                    </div>
                    <div className="grid grid-cols-3 gap-4">
                      <div className="font-medium text-gray-800">QoS</div>
                      <div className="col-span-2 text-gray-600">0</div>
                    </div>
                  </div>
                  
                  <h3 className="text-xl font-semibold text-gray-900 mb-3">Testing with MQTTX</h3>
                  <p className="text-gray-600">
                    MQTTX is a cross-platform MQTT client that can be used to test the MQTT device. Configure it using the broker information above and use the following payload format:
                  </p>
                  
                  <div className="bg-gray-100 p-4 rounded-lg mt-4">
                    <pre className="text-sm text-gray-800">
{`{
  "items": ["maito", "juusto", "tomaatti", "kurkku", "voi"],
  "item_count": 5,
  "timestamp": "2025-05-07T14:10:00"
}`}
                    </pre>
                  </div>
                </div>
              )}

              {activeTab === 'dashboard' && (
                <div>
                  <h2 className="text-2xl font-bold text-gray-900 mb-4">Dashboard Configuration</h2>
                  
                  <p className="text-gray-600 mb-6">
                    Thingsboard provides powerful dashboard capabilities for visualizing IoT data. Here's how to set up dashboards for the Smart Kitchen devices.
                  </p>
                  
                  <h3 className="text-xl font-semibold text-gray-900 mb-3">Creating a Dashboard</h3>
                  <ol className="list-decimal list-inside space-y-2 text-gray-600 mb-6">
                    <li>Log in to Thingsboard</li>
                    <li>Navigate to "Dashboards" in the left sidebar</li>
                    <li>Click the "+" button to create a new dashboard</li>
                    <li>Name it "Smart Kitchen Dashboard"</li>
                    <li>Click "Add" to create the dashboard</li>
                  </ol>
                  
                  <h3 className="text-xl font-semibold text-gray-900 mb-3">Adding Widgets for Shopping Camera</h3>
                  <p className="text-gray-600 mb-4">
                    For the Smart Shopping Camera data:
                  </p>
                  
                  <ol className="list-decimal list-inside space-y-2 text-gray-600 mb-6">
                    <li>Click "Edit Dashboard" in the top right</li>
                    <li>Click the "Entity Alias" icon in the dashboard toolbar</li>
                    <li>Click "Add Alias" and create an alias for the Shopping Camera device</li>
                    <li>Click "Add Widget" and select "Cards" ➝ "Latest values"</li>
                    <li>Configure the widget to display "shopping_note" from the Shopping Camera device</li>
                    <li>Set a title like "Current Shopping List"</li>
                    <li>Customize the widget style and click "Add"</li>
                  </ol>
                  
                  <div className="bg-gray-100 p-4 rounded-lg mb-6">
                    <h4 className="font-medium text-gray-800 mb-2">Smart Shopping Camera Widget Configuration</h4>
                    <pre className="text-sm text-gray-800">
{`{
  "datasources": [
    {
      "entityAliasId": "your_camera_alias_id",
      "dataKeys": [
        {
          "name": "shopping_note",
          "label": "Shopping List",
          "type": "attribute"
        }
      ]
    }
  ],
  "settings": {
    "showTitle": true,
    "backgroundColor": "#fff",
    "color": "rgba(0, 0, 0, 0.87)",
    "padding": "16px",
    "titleStyle": {
      "fontSize": "16px",
      "fontWeight": 500
    }
  }
}`}
                    </pre>
                  </div>
                  
                  <h3 className="text-xl font-semibold text-gray-900 mb-3">Adding Widgets for Fridge Inventory</h3>
                  <p className="text-gray-600 mb-4">
                    For the Smart Fridge Inventory data:
                  </p>
                  
                  <ol className="list-decimal list-inside space-y-2 text-gray-600 mb-6">
                    <li>Add another alias for the Fridge device</li>
                    <li>Click "Add Widget" and select "Cards" ➝ "Latest values"</li>
                    <li>Configure the widget to display "items" from the Fridge device</li>
                    <li>Set a title like "Current Fridge Contents"</li>
                    <li>Add another widget like "Charts" ➝ "Bar Chart" to show item_count over time</li>
                  </ol>
                  
                  <div className="bg-gray-100 p-4 rounded-lg">
                    <h4 className="font-medium text-gray-800 mb-2">Smart Fridge Widget Configuration</h4>
                    <pre className="text-sm text-gray-800">
{`{
  "datasources": [
    {
      "entityAliasId": "your_fridge_alias_id",
      "dataKeys": [
        {
          "name": "items",
          "label": "Fridge Contents",
          "type": "timeseries"
        }
      ]
    }
  ],
  "settings": {
    "showTitle": true,
    "backgroundColor": "#fff",
    "color": "rgba(0, 0, 0, 0.87)",
    "padding": "16px",
    "titleStyle": {
      "fontSize": "16px",
      "fontWeight": 500
    }
  }
}`}
                    </pre>
                  </div>
                </div>
              )}

              {activeTab === 'api' && (
                <div>
                  <h2 className="text-2xl font-bold text-gray-900 mb-4">REST API Access</h2>
                  
                  <p className="text-gray-600 mb-6">
                    Thingsboard provides a comprehensive REST API to access device data and manage the platform. Here's how to use the API to retrieve data from your Smart Kitchen devices.
                  </p>
                  
                  <h3 className="text-xl font-semibold text-gray-900 mb-3">Authentication</h3>
                  <p className="text-gray-600 mb-4">
                    First, you need to authenticate to get a JWT token:
                  </p>
                  
                  <div className="bg-gray-800 text-white p-4 rounded-lg mb-6 overflow-x-auto">
                    <pre className="text-sm">
{`curl -X POST --header 'Content-Type: application/json' \\
  --header 'Accept: application/json' \\
  -d '{"username":"tenant@thingsboard.org", "password":"tenant"}' \\
  'http://localhost:9090/api/auth/login'`}
                    </pre>
                  </div>
                  
                  <p className="text-gray-600 mb-6">
                    The response will contain a JWT token which you'll use for subsequent requests:
                  </p>
                  
                  <div className="bg-gray-100 p-4 rounded-lg mb-6">
                    <pre className="text-sm text-gray-800">
{`{
  "token": "YOUR_JWT_TOKEN",
  "refreshToken": "YOUR_REFRESH_TOKEN"
}`}
                    </pre>
                  </div>
                  
                  <h3 className="text-xl font-semibold text-gray-900 mb-3">Retrieving Device Data</h3>
                  <p className="text-gray-600 mb-4">
                    To get the latest telemetry from a device, you need the device ID. You can get this from the Thingsboard UI by going to the Devices section and clicking on your device.
                  </p>
                  
                  <div className="bg-gray-800 text-white p-4 rounded-lg mb-6 overflow-x-auto">
                    <pre className="text-sm">
{`curl -X GET \\
  --header 'Accept: application/json' \\
  --header 'X-Authorization: Bearer YOUR_JWT_TOKEN' \\
  'http://localhost:9090/api/plugins/telemetry/DEVICE_ID/values/timeseries'`}
                    </pre>
                  </div>
                  
                  <p className="text-gray-600 mb-6">
                    This will return the latest telemetry values for the device:
                  </p>
                  
                  <div className="bg-gray-100 p-4 rounded-lg mb-6">
                    <pre className="text-sm text-gray-800">
{`{
  "shopping_note": [
    {
      "ts": 1588874236000,
      "value": "osta maito, osta leipä, osta juusto"
    }
  ]
}`}
                    </pre>
                  </div>
                  
                  <h3 className="text-xl font-semibold text-gray-900 mb-3">Python Example for API Access</h3>
                  
                  <div className="bg-gray-800 text-white p-4 rounded-lg overflow-x-auto">
                    <pre className="text-sm">
{`import requests
import json

# Thingsboard server settings
THINGSBOARD_URL = "http://localhost:9090"
USERNAME = "tenant@thingsboard.org"
PASSWORD = "tenant"

# Step 1: Login and get JWT token
def get_token():
    url = f"{THINGSBOARD_URL}/api/auth/login"
    headers = {'Content-Type': 'application/json', 'Accept': 'application/json'}
    data = {"username": USERNAME, "password": PASSWORD}
    
    response = requests.post(url, headers=headers, json=data)
    
    if response.status_code == 200:
        token = response.json()['token']
        return token
    else:
        raise Exception(f"Authentication failed: {response.text}")

# Step 2: Get device data
def get_device_data(token, device_id):
    url = f"{THINGSBOARD_URL}/api/plugins/telemetry/{device_id}/values/timeseries"
    headers = {
        'Accept': 'application/json',
        'X-Authorization': f'Bearer {token}'
    }
    
    response = requests.get(url, headers=headers)
    
    if response.status_code == 200:
        return response.json()
    else:
        raise Exception(f"Failed to get device data: {response.text}")

# Main function
def main():
    try:
        # Get auth token
        token = get_token()
        print("Authentication successful")
        
        # Device IDs (replace with your actual device IDs)
        camera_device_id = "YOUR_CAMERA_DEVICE_ID"
        fridge_device_id = "YOUR_FRIDGE_DEVICE_ID"
        
        # Get data from both devices
        camera_data = get_device_data(token, camera_device_id)
        print("Camera Data:")
        print(json.dumps(camera_data, indent=2))
        
        fridge_data = get_device_data(token, fridge_device_id)
        print("Fridge Data:")
        print(json.dumps(fridge_data, indent=2))
        
    except Exception as e:
        print(f"Error: {e}")

if __name__ == "__main__":
    main()
`}
                    </pre>
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

export default DocumentationPage;