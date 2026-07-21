import React, { useState, useEffect } from 'react';
import { securityService } from '../services/securityService';
import UserProfileHeader from '../components/UserProfileHeader';
import BiometricsPinPanel from '../components/BiometricsPinPanel';
import AuthorizedDevicesList from '../components/AuthorizedDevicesList';
import AuditLogsTable from '../components/AuditLogsTable';
import SecurityPermissionsMatrix from '../components/SecurityPermissionsMatrix';
import MobileBottomNav from '../../components/MobileBottomNav';

export default function SecurityHomeScreen() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  const loadData = async () => {
    setLoading(true);
    try {
      const res = await securityService.getSecurityOverview();
      if (res.success) setData(res.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleToggleBiometrics = async (type) => {
    await securityService.toggleBiometrics(type);
    loadData();
  };

  const handleRevokeDevice = async (deviceId) => {
    const res = await securityService.revokeDevice(deviceId);
    alert(res.message);
    loadData();
  };

  if (loading || !data) {
    return (
      <div className="bg-slate-900 min-h-screen p-12 text-center text-white space-y-3 flex flex-col items-center justify-center">
        <div className="w-8 h-8 border-4 border-purple-500 border-t-transparent rounded-full animate-spin" />
        <p className="text-xs text-purple-300 font-semibold animate-pulse">Carregando segurança móvel...</p>
      </div>
    );
  }

  return (
    <div className="bg-slate-100 min-h-screen pb-24 text-slate-800 text-xs">
      <div className="max-w-md mx-auto bg-slate-100 min-h-screen shadow-2xl space-y-4 border-x border-slate-200 p-4">
        <UserProfileHeader profile={data.profile || {}} />
        <BiometricsPinPanel profile={data.profile || {}} onToggle={handleToggleBiometrics} />
        <AuthorizedDevicesList dispositivos={data.dispositivosAutorizados || []} onRevoke={handleRevokeDevice} />
        <SecurityPermissionsMatrix permissoes={data.permissoes || []} />
        <AuditLogsTable logs={data.auditoriaLogs || []} />
        <MobileBottomNav />
      </div>
    </div>
  );
}
