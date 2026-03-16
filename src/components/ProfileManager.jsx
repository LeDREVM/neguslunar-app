import React, { useState, useEffect } from 'react';
import { useProfile } from '../hooks/useProfile';
import { User, Mail, Image, Save, Trash2 } from 'lucide-react';

const ProfileManager = () => {
  const { profile, loading, error, save, clear } = useProfile();
  const [form, setForm] = useState({ name: '', email: '', avatar: '' });
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    if (profile) setForm({ name: profile.name || '', email: profile.email || '', avatar: profile.avatar || '' });
  }, [profile]);

  const onChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const onSave = async (e) => {
    e.preventDefault();
    await save(form);
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  const onClear = async () => {
    if (confirm('Supprimer le profil local ?')) {
      await clear();
      setForm({ name: '', email: '', avatar: '' });
    }
  };

  if (loading) return (
    <div className="flex items-center gap-3 text-purple-300/70">
      <div className="w-4 h-4 rounded-full border-2 border-purple-400 border-t-transparent animate-spin" />
      Chargement...
    </div>
  );

  return (
    <div className="glass-card-strong rounded-2xl p-6 max-w-lg">
      <h3 className="text-xl font-bold mb-5 flex items-center gap-3" style={{background:'linear-gradient(90deg,#c084fc,#818cf8)',WebkitBackgroundClip:'text',WebkitTextFillColor:'transparent'}}>
        <User size={22} className="text-purple-400" />
        Profil utilisateur
      </h3>

      {error && (
        <div className="mb-4 px-4 py-2 rounded-xl bg-red-500/15 border border-red-500/30 text-red-300 text-sm">
          Erreur : {String(error)}
        </div>
      )}

      <form onSubmit={onSave} className="space-y-4">
        {[
          { name: 'name', label: 'Nom', icon: User, placeholder: 'Votre prénom...' },
          { name: 'email', label: 'Email', icon: Mail, placeholder: 'votre@email.com' },
          { name: 'avatar', label: 'Avatar (URL)', icon: Image, placeholder: 'https://...' },
        ].map(({ name, label, icon: Icon, placeholder }) => (
          <div key={name}>
            <label className="block text-xs font-medium text-purple-300/80 mb-1.5 tracking-wide uppercase">{label}</label>
            <div className="relative">
              <Icon size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-purple-400/60" />
              <input
                name={name}
                value={form[name]}
                onChange={onChange}
                placeholder={placeholder}
                className="w-full pl-10 pr-4 py-2.5 rounded-xl text-white text-sm outline-none transition-all duration-200 focus:ring-2 focus:ring-purple-500/50"
                style={{background:'rgba(255,255,255,0.06)', border:'1px solid rgba(255,255,255,0.12)'}}
              />
            </div>
          </div>
        ))}

        <div className="flex gap-3 pt-2">
          <button
            type="submit"
            className="flex items-center gap-2 px-5 py-2.5 rounded-xl font-semibold text-sm transition-all hover:scale-[1.03] active:scale-[0.97]"
            style={{background:'linear-gradient(135deg,#7c3aed,#6366f1)', boxShadow:'0 4px 15px rgba(124,58,237,0.35)'}}
          >
            <Save size={16} />
            {saved ? 'Enregistré ✓' : 'Enregistrer'}
          </button>
          <button
            type="button"
            onClick={onClear}
            className="flex items-center gap-2 px-5 py-2.5 rounded-xl font-medium text-sm transition-all btn-glass text-red-300 hover:text-red-200 hover:border-red-500/40"
          >
            <Trash2 size={16} />
            Supprimer
          </button>
        </div>
      </form>
    </div>
  );
};

export default ProfileManager;
