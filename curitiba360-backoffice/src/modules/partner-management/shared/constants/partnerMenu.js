import {
  Building2,
  Users,
} from 'lucide-react';

export const partnerManagementMenu = {
  id: 'partner-management',

  label: 'Parceiros Comerciais',

  icon: Building2,

  children: [
    {
      id: 'agency-management',

      label: 'Gestão de Agências',

      icon: Building2,

      path: '/admin/parceiros/agencias',
    },

    {
      id: 'agent-management',

      label: 'Gestão de Agentes',

      icon: Users,

      path: '/admin/parceiros/agentes',
    },
  ],
};
