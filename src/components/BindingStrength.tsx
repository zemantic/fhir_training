import React, { useState, useEffect } from 'react';
import { Play, Pause, RotateCcw, CheckCircle, XCircle, AlertCircle, Info } from 'lucide-react';

interface BindingLevel {
  id: string;
  name: string;
  color: string;
  bgColor: string;
  borderColor: string;
  flexibility: number;
  description: string;
  validation: string;
  example: string;
  codeExample: {
    allowed: string[];
    rejected: string[];
  };
}

const bindingLevels: BindingLevel[] = [
  {
    id: 'required',
    name: 'Required',
    color: 'text-red-700',
    bgColor: 'bg-red-50',
    borderColor: 'border-red-200',
    flexibility: 10,
    description: 'Only codes from the specified ValueSet are allowed. No extensions permitted.',
    validation: 'Strict validation - codes must exist in the ValueSet',
    example: 'Administrative gender codes (male, female, other, unknown)',
    codeExample: {
      allowed: ['male', 'female', 'other', 'unknown'],
      rejected: ['M', 'F', 'custom-gender']
    }
  },
  {
    id: 'extensible',
    name: 'Extensible',
    color: 'text-orange-700',
    bgColor: 'bg-orange-50',
    borderColor: 'border-orange-200',
    flexibility: 40,
    description: 'Codes from the ValueSet are preferred, but additional codes may be used if needed.',
    validation: 'Flexible validation - ValueSet codes preferred, extensions allowed',
    example: 'Condition severity codes (mild, moderate, severe + custom severity)',
    codeExample: {
      allowed: ['mild', 'moderate', 'severe', 'custom-critical'],
      rejected: []
    }
  },
  {
    id: 'preferred',
    name: 'Preferred',
    color: 'text-yellow-700',
    bgColor: 'bg-yellow-50',
    borderColor: 'border-yellow-200',
    flexibility: 70,
    description: 'Codes from the ValueSet are recommended but not required. Alternative codes are acceptable.',
    validation: 'Lenient validation - ValueSet codes recommended, alternatives accepted',
    example: 'Body site codes (SNOMED preferred, but ICD-10 or local codes allowed)',
    codeExample: {
      allowed: ['snomed:123456', 'icd10:K35.9', 'local:appendix'],
      rejected: []
    }
  },
  {
    id: 'example',
    name: 'Example',
    color: 'text-green-700',
    bgColor: 'bg-green-50',
    borderColor: 'border-green-200',
    flexibility: 100,
    description: 'Codes are provided as examples only. Any appropriate code may be used.',
    validation: 'No validation - any semantically appropriate code accepted',
    example: 'Observation categories (survey, exam, therapy, or any relevant code)',
    codeExample: {
      allowed: ['survey', 'exam', 'therapy', 'custom-category', 'any-code'],
      rejected: []
    }
  }
];

const BindingStrengthAnimation: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [animationKey, setAnimationKey] = useState(0);

  useEffect(() => {
    if (!isPlaying) return;

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % bindingLevels.length);
      setAnimationKey(prev => prev + 1);
    }, 3000);

    return () => clearInterval(interval);
  }, [isPlaying]);

  const currentBinding = bindingLevels[currentIndex];

  const handleBindingSelect = (index: number) => {
    setCurrentIndex(index);
    setAnimationKey(prev => prev + 1);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">
            FHIR ValueSet Binding Strength
          </h1>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Understanding how binding strength affects code validation and flexibility in FHIR implementations
          </p>
        </div>

        {/* Binding Level Selector */}
        <div className="flex justify-center space-x-2 mb-8">
          {bindingLevels.map((binding, index) => (
            <button
              key={binding.id}
              onClick={() => handleBindingSelect(index)}
              className={`px-4 py-2 rounded-lg font-medium transition-all duration-300 ${
                index === currentIndex
                  ? `${binding.bgColor} ${binding.color} ${binding.borderColor} border-2 shadow-md scale-105`
                  : 'bg-white text-gray-600 border border-gray-200 hover:bg-gray-50'
              }`}
            >
              {binding.name}
            </button>
          ))}
        </div>

        {/* Main Animation Area */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          {/* Current Binding Display */}
          <div className={`${currentBinding.bgColor} ${currentBinding.borderColor} border-2 rounded-xl p-8 transition-all duration-500 transform hover:scale-105`}>
            <div className="text-center mb-6">
              <h2 className={`text-3xl font-bold ${currentBinding.color} mb-2 animate-pulse-slow`}>
                {currentBinding.name}
              </h2>
              <p className="text-gray-700 text-lg">
                {currentBinding.description}
              </p>
            </div>

            {/* Flexibility Meter */}
            <div className="mb-6">
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm font-medium text-gray-700">Flexibility Level</span>
                <span className={`text-sm font-bold ${currentBinding.color}`}>
                  {currentBinding.flexibility}%
                </span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-3">
                <div
                  key={animationKey}
                  className={`h-3 rounded-full transition-all duration-1000 ease-out animate-width-expand`}
                  style={{
                    width: `${currentBinding.flexibility}%`,
                    backgroundColor: currentBinding.color.includes('red') ? '#DC2626' :
                                   currentBinding.color.includes('orange') ? '#EA580C' :
                                   currentBinding.color.includes('yellow') ? '#D97706' : '#059669'
                  }}
                ></div>
              </div>
            </div>

            {/* Example */}
            <div className={`bg-white rounded-lg p-4 ${currentBinding.borderColor} border`}>
              <h4 className="font-semibold text-gray-800 mb-2">Example Use Case:</h4>
              <p className="text-gray-700 text-sm">
                {currentBinding.example}
              </p>
            </div>
          </div>

          {/* Code Validation Simulation */}
          <div className="bg-white rounded-xl shadow-lg p-8">
            <h3 className="text-xl font-semibold text-gray-800 mb-4 flex items-center">
              <AlertCircle className="w-5 h-5 mr-2 text-blue-500" />
              Code Validation Behavior
            </h3>

            <div className="mb-4">
              <p className={`text-sm ${currentBinding.color} font-medium mb-3`}>
                {currentBinding.validation}
              </p>
            </div>

            {/* Allowed Codes */}
            <div className="mb-6">
              <h4 className="font-medium text-gray-700 mb-3 flex items-center">
                <CheckCircle className="w-4 h-4 mr-2 text-green-500" />
                Allowed Codes
              </h4>
              <div className="space-y-2">
                {currentBinding.codeExample.allowed.map((code, index) => (
                  <div
                    key={`${animationKey}-allowed-${index}`}
                    className="flex items-center space-x-2 p-2 bg-green-50 border border-green-200 rounded-lg animate-fade-in"
                    style={{ animationDelay: `${index * 100}ms` }}
                  >
                    <CheckCircle className="w-4 h-4 text-green-500" />
                    <code className="text-sm font-mono text-green-700">{code}</code>
                  </div>
                ))}
              </div>
            </div>

            {/* Rejected Codes */}
            {currentBinding.codeExample.rejected.length > 0 && (
              <div>
                <h4 className="font-medium text-gray-700 mb-3 flex items-center">
                  <XCircle className="w-4 h-4 mr-2 text-red-500" />
                  Rejected Codes
                </h4>
                <div className="space-y-2">
                  {currentBinding.codeExample.rejected.map((code, index) => (
                    <div
                      key={`${animationKey}-rejected-${index}`}
                      className="flex items-center space-x-2 p-2 bg-red-50 border border-red-200 rounded-lg animate-fade-in"
                      style={{ animationDelay: `${index * 100}ms` }}
                    >
                      <XCircle className="w-4 h-4 text-red-500" />
                      <code className="text-sm font-mono text-red-700">{code}</code>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Summary Table */}
        <div className="bg-white rounded-xl shadow-lg p-8">
          <h3 className="text-xl font-semibold text-gray-800 mb-6 flex items-center">
            <Info className="w-5 h-5 mr-2 text-blue-500" />
            Binding Strength Comparison
          </h3>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="text-left py-3 px-4 font-semibold text-gray-700">Binding Strength</th>
                  <th className="text-left py-3 px-4 font-semibold text-gray-700">Flexibility</th>
                  <th className="text-left py-3 px-4 font-semibold text-gray-700">Validation</th>
                  <th className="text-left py-3 px-4 font-semibold text-gray-700">Use Case</th>
                </tr>
              </thead>
              <tbody>
                {bindingLevels.map((binding, index) => (
                  <tr
                    key={binding.id}
                    className={`border-b border-gray-100 transition-all duration-300 ${
                      index === currentIndex ? `${binding.bgColor} scale-102` : 'hover:bg-gray-50'
                    }`}
                  >
                    <td className="py-4 px-4">
                      <span className={`font-semibold ${binding.color}`}>
                        {binding.name}
                      </span>
                    </td>
                    <td className="py-4 px-4">
                      <div className="flex items-center space-x-2">
                        <div className="w-16 bg-gray-200 rounded-full h-2">
                          <div
                            className="h-2 rounded-full"
                            style={{
                              width: `${binding.flexibility}%`,
                              backgroundColor: binding.color.includes('red') ? '#DC2626' :
                                             binding.color.includes('orange') ? '#EA580C' :
                                             binding.color.includes('yellow') ? '#D97706' : '#059669'
                            }}
                          ></div>
                        </div>
                        <span className="text-sm text-gray-600">{binding.flexibility}%</span>
                      </div>
                    </td>
                    <td className="py-4 px-4 text-sm text-gray-600">
                      {binding.validation}
                    </td>
                    <td className="py-4 px-4 text-sm text-gray-600">
                      {binding.example}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Footer */}
        <div className="text-center mt-8 text-sm text-gray-500">
          <p>
            Understanding FHIR binding strength helps developers implement proper validation and extensibility.
            Animation cycles every 3 seconds - use controls to pause or navigate manually.
          </p>
        </div>
      </div>
    </div>
  );
};

export default BindingStrengthAnimation;