import React from 'react';
import { Info, Database, Tags } from 'lucide-react';

const InfoPanel: React.FC = () => {
  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
      <div className="flex items-center space-x-2 mb-4">
        <Info className="w-5 h-5 text-blue-500" />
        <h3 className="text-lg font-semibold text-gray-900">FHIR Terminology Overview</h3>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <div className="flex items-center space-x-2 mb-3">
            <Database className="w-4 h-4 text-blue-500" />
            <h4 className="font-medium text-gray-800">CodeSystems</h4>
          </div>
          <p className="text-sm text-gray-600 mb-3">
            CodeSystems define the actual codes, their meanings, and hierarchical relationships.
            They are the authoritative source of clinical terminology.
          </p>
          <div className="space-y-2 text-xs">
            <div><span className="font-medium">SNOMED CT:</span> Comprehensive clinical terminology</div>
            <div><span className="font-medium">LOINC:</span> Laboratory and clinical observations</div>
            <div><span className="font-medium">ICD-10-CM:</span> Diagnosis classification system</div>
            <div><span className="font-medium">RxNorm:</span> Normalized medication names</div>
          </div>
        </div>

        <div>
          <div className="flex items-center space-x-2 mb-3">
            <Tags className="w-4 h-4 text-green-500" />
            <h4 className="font-medium text-gray-800">ValueSets</h4>
          </div>
          <p className="text-sm text-gray-600 mb-3">
            ValueSets are curated collections of codes from one or more CodeSystems,
            designed for specific use cases in healthcare applications.
          </p>
          <div className="space-y-2 text-xs">
            <div><span className="font-medium">Clinical Findings:</span> Signs, symptoms, conditions</div>
            <div><span className="font-medium">Medications:</span> Pharmaceutical products</div>
            <div><span className="font-medium">Procedures:</span> Medical interventions</div>
            <div><span className="font-medium">Lab Tests:</span> Diagnostic test panels</div>
          </div>
        </div>
      </div>

      <div className="mt-6 p-4 bg-blue-50 rounded-lg">
        <p className="text-sm text-blue-800">
          <strong>Interactive:</strong> Hover over nodes and connections to see detailed information
          about each CodeSystem, ValueSet, and their relationships.
        </p>
        <p className="text-sm text-blue-700">Made with ❤️ by Rukshan - <a href="mailto:rukshan@ruky.me">rukshan@ruky.me</a></p>
      </div>
    </div>
  );
};

export default InfoPanel;