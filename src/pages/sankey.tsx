import SankeyDiagram from "../components/SankeyDiagram";
import Legend from "../components/Legend";
import InfoPanel from "../components/InfoPanel";
import { Network } from "lucide-react";

function SankeyPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      {/* Header */}
      <div className="text-center mb-8">
        <div className="flex items-center justify-center space-x-3 mb-4">
          <Network className="w-8 h-8 text-blue-600" />
          <h1 className="text-3xl font-bold text-gray-900">
            FHIR Terminology Relationships
          </h1>
        </div>
        <p className="text-lg text-gray-600 max-w-3xl mx-auto">
          Visualizing how FHIR CodeSystems contribute codes to ValueSets used in
          healthcare interoperability
        </p>
      </div>

      {/* Legend */}
      <div className="mb-6">
        <Legend />
      </div>

      {/* Main Sankey Diagram */}
      <div className="mb-8">
        <div className="bg-white rounded-lg shadow-lg p-6">
          <h2 className="text-xl font-semibold text-gray-800 mb-4 text-center">
            CodeSystem → ValueSet Flow Diagram
          </h2>
          <SankeyDiagram />
        </div>
      </div>

      {/* Info Panel */}
      <InfoPanel />

      {/* Footer */}
      <div className="text-center mt-8 text-sm text-gray-500">
        <p>
          Based on HL7 FHIR R4 terminology standards. Flow widths represent
          relative usage frequency in typical healthcare implementations.
        </p>
      </div>
    </div>
  );
}

export default SankeyPage;
