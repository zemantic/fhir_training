import React from 'react';
import { Network, Zap } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';

const Navigation: React.FC = () => {
  const location = useLocation();
  const currentPage = location.pathname.replace('/', '') || 'sankey';

  return (
    <nav className="bg-white shadow-sm border-b border-gray-200 mb-8">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center space-x-3">
            <Network className="w-6 h-6 text-blue-600" />
            <span className="text-xl font-bold text-gray-900">FHIR Terminology</span>
          </div>

          <div className="flex space-x-1">
            <Link
              to="/sankey"
              className={`px-4 py-2 rounded-lg font-medium transition-all duration-200 flex items-center space-x-2 ${
                currentPage === 'sankey'
                  ? 'bg-blue-100 text-blue-700 shadow-sm'
                  : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
              }`}
            >
              <Network className="w-4 h-4" />
              <span>Sankey Diagram</span>
            </Link>

            <Link
              to="/binding"
              className={`px-4 py-2 rounded-lg font-medium transition-all duration-200 flex items-center space-x-2 ${
                currentPage === 'binding'
                  ? 'bg-blue-100 text-blue-700 shadow-sm'
                  : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
              }`}
            >
              <Zap className="w-4 h-4" />
              <span>Binding Strength</span>
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;