import { Route, Routes } from 'react-router-dom';
import AgenciesPage from '../agencies/pages/AgenciesPage';
import AgencyCreatePage from '../agencies/pages/AgencyCreatePage';
import AgentsPage from '../agents/pages/AgentsPage';

export default function PartnerManagementRoutes() {
  return (
    <Routes>
      <Route path="agencias" element={<AgenciesPage />} />
      <Route path="agencias/novo" element={<AgencyCreatePage />} />
      <Route path="agentes" element={<AgentsPage />} />
    </Routes>
  );
}
