import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AdmissionDashboard } from './components/AdmissionDashboard';
import { ApplicantsPage } from './components/ApplicantsPage';
import { NotFound } from './components/NotFound';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<AdmissionDashboard />} />
        <Route path="/applicants" element={<ApplicantsPage />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
}

export default App;
