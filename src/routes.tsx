import { Route, Routes } from "react-router-dom";
import Home from './pages/Home';
import Call from './pages/Call';
import Campaign from './pages/Campaign';
import Contact from './pages/Contact';

const AppRoutes = () => {
  return (
    <Routes>
      <Route index element={<Home />} />
      <Route element={<Call />} path="/llamada" />
      <Route element={<Call />} path="/llamada/:campaign_id/:id" />
      <Route element={<Campaign />} path="/campana" />
      <Route element={<Campaign />} path="/campana/:id" />
      <Route element={<Contact />} path="/contacto" />
      <Route element={<Contact />} path="/contacto/:id" />
    </Routes>
  );
};

export default AppRoutes;