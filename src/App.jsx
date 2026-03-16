import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import Layout from './components/Layout';
import Home from './pages/Home';
import NotreHistoire from './pages/NotreHistoire';
import Vehicules from './pages/Vehicules';
import VehiculeDetail from './pages/VehiculeDetail';
import Services from './pages/Services';
import Contact from './pages/Contact';
import HomeV2 from './pages/v2/HomeV2';
import NotreHistoireV2 from './pages/v2/NotreHistoireV2';
import VehiculesV2 from './pages/v2/VehiculesV2';
import ServicesV2 from './pages/v2/ServicesV2';
import ContactV2 from './pages/v2/ContactV2';
import HomeV3 from './pages/v3/HomeV3';
import NotreHistoireV3 from './pages/v3/NotreHistoireV3';
import VehiculesV3 from './pages/v3/VehiculesV3';
import ServicesV3 from './pages/v3/ServicesV3';
import ContactV3 from './pages/v3/ContactV3';
import HomeV4 from './pages/v4/HomeV4';
import NotreHistoireV4 from './pages/v4/NotreHistoireV4';
import VehiculesV4 from './pages/v4/VehiculesV4';
import ServicesV4 from './pages/v4/ServicesV4';
import ContactV4 from './pages/v4/ContactV4';
import HomeV5 from './pages/v5/HomeV5';
import HomeV6 from './pages/v6/HomeV6';
import HomeV8 from './pages/v8/HomeV8';

function App() {
  return (
    <HelmetProvider>
      <BrowserRouter>
        <Layout>
          <Routes>
            {/* V1 Routes */}
            <Route path="/" element={<Home />} />
            <Route path="/notre-histoire" element={<NotreHistoire />} />
            <Route path="/vehicules" element={<Vehicules />} />
            <Route path="/vehicules/:id" element={<VehiculeDetail />} />
            <Route path="/services" element={<Services />} />
            <Route path="/contact" element={<Contact />} />

            {/* V2 Routes */}
            <Route path="/v2" element={<HomeV2 />} />
            <Route path="/v2/notre-histoire" element={<NotreHistoireV2 />} />
            <Route path="/v2/vehicules" element={<VehiculesV2 />} />
            <Route path="/v2/services" element={<ServicesV2 />} />
            <Route path="/v2/contact" element={<ContactV2 />} />

            {/* V3 Routes */}
            <Route path="/v3" element={<HomeV3 />} />
            <Route path="/v3/notre-histoire" element={<NotreHistoireV3 />} />
            <Route path="/v3/vehicules" element={<VehiculesV3 />} />
            <Route path="/v3/services" element={<ServicesV3 />} />
            <Route path="/v3/contact" element={<ContactV3 />} />

            {/* V4 Routes */}
            <Route path="/v4" element={<HomeV4 />} />
            <Route path="/v4/notre-histoire" element={<NotreHistoireV4 />} />
            <Route path="/v4/vehicules" element={<VehiculesV4 />} />
            <Route path="/v4/services" element={<ServicesV4 />} />
            <Route path="/v4/contact" element={<ContactV4 />} />

            {/* V5 Routes */}
            <Route path="/v5" element={<HomeV5 />} />

            {/* V6 Routes */}
            <Route path="/v6" element={<HomeV6 />} />

            {/* V8 Routes */}
            <Route path="/v8" element={<HomeV8 />} />
          </Routes>
        </Layout>
      </BrowserRouter>
    </HelmetProvider>
  );
}

export default App;
