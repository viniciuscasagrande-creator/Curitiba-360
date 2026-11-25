import { useState, useEffect, useCallback } from "react";
import { identityService } from "../services/identityService";

export function useDigitalIdentity() {
  const [identity, setIdentity] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchIdentity = useCallback(async () => {
    setLoading(true);
    const res = await identityService.getProfile();
    if (res.success) setIdentity(res.data);
    setLoading(false);
  }, []);

  const updateProfile = async (profileData) => {
    const res = await identityService.updateProfile(profileData);
    if (res.success) setIdentity(res.data);
    return res;
  };

  const verifyIdentity = async () => {
    const res = await identityService.verifyIdentity();
    if (res.success) setIdentity(res.data);
    return res;
  };

  useEffect(() => {
    fetchIdentity();
  }, [fetchIdentity]);

  return { identity, loading, updateProfile, verifyIdentity, reload: fetchIdentity };
}
