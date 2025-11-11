import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import RoutesPage from "./pages/RoutesPage";
import ComparisonPage from "./pages/ComparisonPage";
import BankingPage from "./pages/BankingPage";
import PoolingPage from "./pages/PoolingPage";
import CompliancePage from "./pages/CompliancePage";

const App: React.FC = () => {
  return (
    <Router>
      <div className="min-h-screen bg-gray-50">
        <nav className="bg-blue-600 text-white p-4 flex gap-6">
          <Link to="/" className="hover:underline">Routes</Link>
          <Link to="/compare" className="hover:underline">Compare</Link>
          <Link to="/banking" className="hover:underline">Banking</Link>
          <Link to="/pooling" className="hover:underline">Pooling</Link>
          <Link to="/compliance" className="hover:underline">Compliance</Link>
        </nav>

        <div className="p-8">
          <Routes>
            <Route path="/" element={<RoutesPage />} />
            <Route path="/compare" element={<ComparisonPage />} />
            <Route path="/banking" element={<BankingPage />} />
            <Route path="/pooling" element={<PoolingPage />} />
            <Route path="/compliance" element={<CompliancePage />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
};

export default App;
