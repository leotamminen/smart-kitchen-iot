import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Camera, Refrigerator, Server, BarChart2 } from 'lucide-react';

const HomePage: React.FC = () => {
  // Animate elements on scroll
  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animate-fade-in');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1 });

    document.querySelectorAll('.animate-on-scroll').forEach(element => {
      observer.observe(element);
    });

    return () => {
      document.querySelectorAll('.animate-on-scroll').forEach(element => {
        observer.unobserve(element);
      });
    };
  }, []);

  return (
    <div>
      {/* Hero section */}
      <section className="relative bg-gradient-to-r from-blue-900 to-cyan-800 text-white overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <div className="absolute inset-0 bg-[url('https://images.pexels.com/photos/3183197/pexels-photo-3183197.jpeg')] bg-cover bg-center"></div>
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 md:py-32 relative z-10">
          <div className="text-center md:text-left md:w-2/3">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
              Smart Kitchen IoT Platform
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-blue-100">
              Connect your kitchen devices, monitor real-time data, and unlock a smarter cooking experience.
            </p>
            <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4 justify-center md:justify-start">
              <Link to="/devices" className="px-6 py-3 bg-blue-600 hover:bg-blue-700 rounded-lg font-medium transition-colors duration-300 shadow-lg hover:shadow-xl text-center">
                Explore Devices
              </Link>
              <Link to="/documentation" className="px-6 py-3 bg-white text-blue-900 hover:bg-gray-100 rounded-lg font-medium transition-colors duration-300 shadow-lg hover:shadow-xl text-center">
                Read Documentation
              </Link>
            </div>
          </div>
        </div>
        <div className="absolute bottom-0 w-full h-16 bg-gradient-to-t from-slate-50 to-transparent"></div>
      </section>

      {/* Features section */}
      <section className="py-16 md:py-24 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Simulated IoT Devices</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Our platform demonstrates how real-world kitchen devices communicate using industry-standard IoT protocols.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 mb-16">
            <div className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 animate-on-scroll opacity-0 translate-y-4">
              <div className="flex items-center mb-4">
                <div className="p-3 bg-blue-100 text-blue-600 rounded-lg">
                  <Camera className="h-8 w-8" />
                </div>
                <h3 className="text-2xl font-semibold text-gray-900 ml-4">Smart Shopping Camera</h3>
              </div>
              <p className="text-gray-600 mb-6">
                A camera system that reads shopping lists from your kitchen whiteboard and sends the recognized text to the IoT platform using HTTP protocol.
              </p>
              <div className="bg-slate-50 p-4 rounded-md">
                <p className="text-sm font-mono text-slate-700 mb-2">Example HTTP payload:</p>
                <pre className="bg-slate-800 text-blue-100 p-3 rounded text-sm overflow-x-auto">
                  {JSON.stringify({ shopping_note: "osta 2 tomaattia, osta maito" }, null, 2)}
                </pre>
              </div>
            </div>

            <div className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 animate-on-scroll opacity-0 translate-y-4">
              <div className="flex items-center mb-4">
                <div className="p-3 bg-blue-100 text-blue-600 rounded-lg">
                  <Refrigerator className="h-8 w-8" />
                </div>
                <h3 className="text-2xl font-semibold text-gray-900 ml-4">Smart Fridge Inventory</h3>
              </div>
              <p className="text-gray-600 mb-6">
                A refrigerator that tracks what's currently inside and transmits inventory data to the IoT platform using MQTT protocol.
              </p>
              <div className="bg-slate-50 p-4 rounded-md">
                <p className="text-sm font-mono text-slate-700 mb-2">Example MQTT payload:</p>
                <pre className="bg-slate-800 text-blue-100 p-3 rounded text-sm overflow-x-auto">
                  {JSON.stringify({ items: ["maito", "juusto", "tomaatti"], timestamp: "2025-05-07T14:10:00" }, null, 2)}
                </pre>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Architecture section */}
      <section className="py-16 md:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">System Architecture</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Our IoT platform uses Thingsboard to collect, process, and visualize data from kitchen devices.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 md:gap-12 mb-16">
            <div className="bg-slate-50 p-8 rounded-xl shadow-sm hover:shadow-md transition-shadow duration-300 animate-on-scroll opacity-0 translate-y-4">
              <div className="flex items-center mb-4">
                <div className="p-3 bg-indigo-100 text-indigo-600 rounded-lg">
                  <Camera className="h-8 w-8" />
                  <Refrigerator className="h-8 w-8 mt-2" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 ml-4">Simulated Devices</h3>
              </div>
              <p className="text-gray-600">
                Python scripts that simulate real device behavior, sending data via HTTP and MQTT protocols.
              </p>
            </div>

            <div className="bg-slate-50 p-8 rounded-xl shadow-sm hover:shadow-md transition-shadow duration-300 animate-on-scroll opacity-0 translate-y-4">
              <div className="flex items-center mb-4">
                <div className="p-3 bg-indigo-100 text-indigo-600 rounded-lg">
                  <Server className="h-8 w-8" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 ml-4">Thingsboard Platform</h3>
              </div>
              <p className="text-gray-600">
                Open-source IoT platform that handles device connectivity, data storage, and processing rules.
              </p>
            </div>

            <div className="bg-slate-50 p-8 rounded-xl shadow-sm hover:shadow-md transition-shadow duration-300 animate-on-scroll opacity-0 translate-y-4">
              <div className="flex items-center mb-4">
                <div className="p-3 bg-indigo-100 text-indigo-600 rounded-lg">
                  <BarChart2 className="h-8 w-8" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 ml-4">Dashboard & API</h3>
              </div>
              <p className="text-gray-600">
                Visualize device data through customizable dashboards and access data through REST APIs.
              </p>
            </div>
          </div>

          <div className="bg-white border border-gray-200 p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow duration-300 mt-8">
            <h3 className="text-xl font-semibold text-gray-900 mb-4 text-center">Data Flow Diagram</h3>
            <div className="flex justify-center">
              <img 
                src="https://images.pexels.com/photos/1181671/pexels-photo-1181671.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" 
                alt="IoT Architecture Diagram"
                className="max-w-full h-auto rounded-lg shadow-lg"
                style={{ maxHeight: '400px', objectFit: 'cover' }}
              />
            </div>
          </div>
        </div>
      </section>

      {/* CTA section */}
      <section className="py-16 md:py-20 bg-gradient-to-r from-blue-600 to-blue-800 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to Try It Yourself?</h2>
          <p className="text-xl mb-8 text-blue-100 max-w-3xl mx-auto">
            Explore our documentation to learn how to set up your own Smart Kitchen IoT platform.
          </p>
          <Link 
            to="/simulation" 
            className="inline-flex items-center px-6 py-3 text-lg font-medium bg-white text-blue-600 hover:bg-blue-50 rounded-lg transition-colors duration-300"
          >
            Get Started
            <ArrowRight className="ml-2 h-5 w-5" />
          </Link>
        </div>
      </section>
    </div>
  );
};

export default HomePage;