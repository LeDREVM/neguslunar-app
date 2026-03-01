import { useState, useEffect, useCallback } from 'react';
import { getProfile, setProfile, deleteProfile } from '../utils/database';

export const useProfile = () => {
  const [profile, setProfileState] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const load = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const p = await getProfile();
      setProfileState(p || null);
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    load();
  }, [load]);

  const save = async (data) => {
    try {
      await setProfile(data);
      await load();
      return true;
    } catch (err) {
      setError(err);
      return false;
    }
  };

  const clear = async () => {
    try {
      await deleteProfile();
      setProfileState(null);
      return true;
    } catch (err) {
      setError(err);
      return false;
    }
  };

  return {
    profile,
    loading,
    error,
    save,
    clear,
    reload: load
  };
};
