import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Navigation from './components/Navigation';
import SankeyPage from './pages/sankey';
import BindingPage from './components/BindingStrength';
import CardinalityPage from './components/Cardinality';

function App() {
  return (
    <Router basename="/fhir_training">
      <div className="min-h-screen bg-gray-50">
        <Navigation />
        <Routes>
          <Route path="/sankey" element={<SankeyPage />} />
          <Route path="/binding" element={<BindingPage />} />
          <Route path="/cardinality" element={<CardinalityPage />}></Route>
          <Route path="/" element={<Navigate to="/sankey" replace />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
