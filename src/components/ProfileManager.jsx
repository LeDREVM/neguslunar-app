import React, { useState, useEffect } from 'react';
import { useProfile } from '../hooks/useProfile';

const ProfileManager = () => {
  const { profile, loading, error, save, clear } = useProfile();
  const [form, setForm] = useState({ name: '', email: '', avatar: '' });

  useEffect(() => {
    if (profile) setForm({ name: profile.name || '', email: profile.email || '', avatar: profile.avatar || '' });
  }, [profile]);

  const onChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const onSave = async (e) => {
    e.preventDefault();
    await save(form);
    alert('Profil enregistré');
  };

  const onClear = async () => {
    if (confirm('Supprimer le profil local ?')) {
      await clear();
      setForm({ name: '', email: '', avatar: '' });
    }
  };

  if (loading) return <div>Chargement...</div>;

  return (
    <div className="profile-manager">
      <h3>Profil utilisateur</h3>
      {error && <div className="error">Erreur: {String(error)}</div>}
      <form onSubmit={onSave}>
        <div>
          <label>Nom</label>
          <input name="name" value={form.name} onChange={onChange} />
        </div>
        <div>
          <label>Email</label>
          <input name="email" value={form.email} onChange={onChange} />
        </div>
        <div>
          <label>Avatar (URL)</label>
          <input name="avatar" value={form.avatar} onChange={onChange} />
        </div>
        <div style={{ marginTop: 8 }}>
          <button type="submit">Enregistrer</button>
          <button type="button" onClick={onClear} style={{ marginLeft: 8 }}>Supprimer</button>
        </div>
      </form>
    </div>
  );
};

export default ProfileManager;
