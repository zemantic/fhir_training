import React from 'react';

const Legend: React.FC = () => {
  const codeSystemColors = [
    { name: 'SNOMED CT', color: '#E11D48' },
    { name: 'LOINC', color: '#7C3AED' },
    { name: 'ICD-10-CM', color: '#DC2626' },
    { name: 'RxNorm', color: '#059669' },
    { name: 'CPT', color: '#2563EB' },
    { name: 'UCUM', color: '#EA580C' },
    { name: 'HL7 v3', color: '#7C2D12' }
  ];

  return (
    <div className="bg-gray-50 rounded-lg p-6">
      <h3 className="text-sm font-semibold text-gray-800 mb-4 text-center">Legend</h3>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* CodeSystems */}
        <div>
          <h4 className="text-xs font-medium text-gray-600 mb-3 uppercase tracking-wide">CodeSystems</h4>
          <div className="grid grid-cols-2 gap-2">
            {codeSystemColors.map((cs) => (
              <div key={cs.name} className="flex items-center space-x-2">
                <div
                  className="w-3 h-3 rounded-sm"
                  style={{ backgroundColor: cs.color }}
                ></div>
                <span className="text-xs text-gray-700">{cs.name}</span>
              </div>
            ))}
          </div>
        </div>

        {/* ValueSets and Connections */}
        <div>
          <h4 className="text-xs font-medium text-gray-600 mb-3 uppercase tracking-wide">ValueSets & Connections</h4>
          <div className="space-y-2">
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-green-500 rounded-sm"></div>
              <span className="text-xs text-gray-700">FHIR ValueSets</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-6 h-0.5 bg-gradient-to-r from-rose-500 to-green-500 rounded opacity-60"></div>
              <span className="text-xs text-gray-700">Code Flow (colored by source)</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Legend