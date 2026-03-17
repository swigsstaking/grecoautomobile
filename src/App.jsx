import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import Layout from './components/Layout';
import Home from './pages/v3/HomeV3';
import NotreHistoire from './pages/v3/NotreHistoireV3';
import Vehicules from './pages/v3/VehiculesV3';
import VehiculeDetail from './pages/VehiculeDetail';
import Services from './pages/v3/ServicesV3';
import Contact from './pages/v3/ContactV3';

function App() {
  return (
    <HelmetProvider>
      <BrowserRouter>
        <Layout>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/notre-histoire" element={<NotreHistoire />} />
            <Route path="/vehicules" element={<Vehicules />} />
            <Route path="/vehicules/:id" element={<VehiculeDetail />} />
            <Route path="/services" element={<Services />} />
            <Route path="/contact" element={<Contact />} />
          </Routes>
        </Layout>
      </BrowserRouter>
    </HelmetProvider>
  );
}

export default App;
