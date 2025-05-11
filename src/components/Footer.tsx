import React from 'react';
import { Link } from 'react-router-dom';
import { Github, Twitter, Linkedin, ChefHat } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-slate-900 text-white py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <Link to="/" className="flex items-center mb-4">
              <ChefHat className="h-6 w-6 text-blue-400" />
              <span className="ml-2 text-lg font-bold text-white">Smart Kitchen</span>
            </Link>
            <p className="text-slate-300 text-sm">
              A cutting-edge IoT platform for modern kitchens. Connecting devices for a smarter cooking experience.
            </p>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li><Link to="/" className="text-slate-300 hover:text-white transition-colors">Home</Link></li>
              <li><Link to="/devices" className="text-slate-300 hover:text-white transition-colors">Devices</Link></li>
              <li><Link to="/documentation" className="text-slate-300 hover:text-white transition-colors">Documentation</Link></li>
              <li><Link to="/simulation" className="text-slate-300 hover:text-white transition-colors">Simulation</Link></li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4">Resources</h3>
            <ul className="space-y-2">
              <li><a href="https://thingsboard.io/docs/" target="_blank" rel="noopener noreferrer" className="text-slate-300 hover:text-white transition-colors">Thingsboard Docs</a></li>
              <li><a href="https://mqtt.org/" target="_blank" rel="noopener noreferrer" className="text-slate-300 hover:text-white transition-colors">MQTT Protocol</a></li>
              <li><a href="https://www.postman.com/" target="_blank" rel="noopener noreferrer" className="text-slate-300 hover:text-white transition-colors">Postman</a></li>
              <li><a href="https://github.com/eclipse/paho.mqtt.python" target="_blank" rel="noopener noreferrer" className="text-slate-300 hover:text-white transition-colors">Paho MQTT</a></li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4">Connect</h3>
            <div className="flex space-x-4">
              <a href="#" className="text-slate-300 hover:text-white transition-colors">
                <Github className="h-6 w-6" />
              </a>
              <a href="#" className="text-slate-300 hover:text-white transition-colors">
                <Twitter className="h-6 w-6" />
              </a>
              <a href="#" className="text-slate-300 hover:text-white transition-colors">
                <Linkedin className="h-6 w-6" />
              </a>
            </div>
          </div>
        </div>
        
        <div className="mt-8 pt-8 border-t border-slate-700 text-center">
          <p className="text-slate-400 text-sm">
            &copy; {new Date().getFullYear()} Smart Kitchen IoT Platform. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;