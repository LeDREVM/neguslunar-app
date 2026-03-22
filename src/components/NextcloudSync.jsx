import React, { useState } from 'react';
import { Cloud, Upload, Download, Wifi, WifiOff, CheckCircle, AlertCircle, Loader, LogOut, Eye, EyeOff, RefreshCw } from 'lucide-react';
import { useNextcloudSync, SYNC_STATUS } from '../hooks/useNextcloudSync';

const NextcloudSync = () => {
  const {
    config, status, message, lastSync,
    isConfigured, isBusy,
    configure, upload, download, disconnect,
  } = useNextcloudSync();

  const [form, setForm] = useState({
    serverUrl:   config?.serverUrl   || '',
    username:    config?.username    || '',
    appPassword: config?.appPassword || '',
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfig,   setShowConfig]   = useState(!isConfigured);
  const [confirmDownload, setConfirmDownload] = useState(false);

  const onChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const onConfigure = async (e) => {
    e.preventDefault();
    const ok = await configure(form.serverUrl.trim(), form.username.trim(), form.appPassword);
    if (ok) setShowConfig(false);
  };

  const onDownload = async () => {
    if (!confirmDownload) {
      setConfirmDownload(true);
      return;
    }
    setConfirmDownload(false);
    const result = await download();
    if (result?.ok) {
      setTimeout(() => window.location.reload(), 1500);
    }
  };

  // ── Icône de statut ──
  const StatusIcon = () => {
    if (status === SYNC_STATUS.TESTING || status === SYNC_STATUS.UPLOADING || status === SYNC_STATUS.DOWNLOADING) {
      return <Loader size={16} className="animate-spin text-blue-300" />;
    }
    if (status === SYNC_STATUS.SUCCESS) return <CheckCircle size={16} className="text-emerald-400" />;
    if (status === SYNC_STATUS.ERROR)   return <AlertCircle size={16} className="text-red-400" />;
    return null;
  };

  const formatDate = (iso) => {
    if (!iso) return null;
    return new Date(iso).toLocaleString('fr-FR', {
      day: '2-digit', month: '2-digit', year: 'numeric',
      hour: '2-digit', minute: '2-digit',
    });
  };

  return (
    <div className="glass-card-strong rounded-2xl p-6 max-w-lg" style={{ borderColor: 'rgba(56,189,248,0.15)' }}>
      {/* ── En-tête ── */}
      <div className="flex items-center justify-between mb-5">
        <div className="flex items-center gap-3">
          <div
            className="p-2 rounded-xl"
            style={{ background: 'linear-gradient(135deg, rgba(56,189,248,0.2), rgba(99,102,241,0.2))', border: '1px solid rgba(56,189,248,0.3)' }}
          >
            <Cloud size={20} className="text-sky-300" />
          </div>
          <div>
            <h3 className="font-bold text-white" style={{ fontFamily: "'Space Mono', monospace" }}>
              Sync Nextcloud
            </h3>
            <p className="text-xs text-purple-300/60">
              {isConfigured ? `${config.username} · ${new URL(config.serverUrl).hostname}` : 'Non configuré'}
            </p>
          </div>
        </div>

        {/* Statut connexion */}
        <div className={`flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium ${
          isConfigured
            ? 'bg-emerald-500/15 border border-emerald-500/30 text-emerald-300'
            : 'bg-slate-500/15 border border-slate-500/30 text-slate-400'
        }`}>
          {isConfigured ? <Wifi size={12} /> : <WifiOff size={12} />}
          {isConfigured ? 'Connecté' : 'Déconnecté'}
        </div>
      </div>

      {/* ── Message de statut ── */}
      {message && (
        <div className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm mb-4 ${
          status === SYNC_STATUS.ERROR
            ? 'bg-red-500/10 border border-red-500/25 text-red-300'
            : status === SYNC_STATUS.SUCCESS
            ? 'bg-emerald-500/10 border border-emerald-500/25 text-emerald-300'
            : 'bg-blue-500/10 border border-blue-500/25 text-blue-300'
        }`}>
          <StatusIcon />
          <span>{message}</span>
        </div>
      )}

      {/* ── Dernière sync ── */}
      {lastSync && (
        <p className="text-xs text-purple-300/50 mb-4 flex items-center gap-1.5">
          <RefreshCw size={11} />
          Dernière sync : {formatDate(lastSync)}
        </p>
      )}

      {/* ── Formulaire de configuration ── */}
      {showConfig ? (
        <form onSubmit={onConfigure} className="space-y-3">
          <p className="text-xs text-purple-300/60 mb-3">
            Utilisez un <strong className="text-purple-200">mot de passe d'application</strong> Nextcloud
            (Paramètres → Sécurité → Mots de passe d'application).
          </p>

          {[
            { name: 'serverUrl',   label: 'URL du serveur',         placeholder: 'https://cloud.exemple.com', type: 'url' },
            { name: 'username',    label: 'Nom d\'utilisateur',      placeholder: 'votre-identifiant',         type: 'text' },
          ].map(({ name, label, placeholder, type }) => (
            <div key={name}>
              <label className="block text-xs font-medium text-purple-300/70 mb-1 uppercase tracking-wide">
                {label}
              </label>
              <input
                name={name}
                type={type}
                value={form[name]}
                onChange={onChange}
                placeholder={placeholder}
                required
                className="w-full px-3.5 py-2.5 rounded-xl text-sm text-white outline-none transition-all focus:ring-2 focus:ring-sky-500/40"
                style={{ background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.12)' }}
              />
            </div>
          ))}

          {/* Mot de passe avec toggle visibilité */}
          <div>
            <label className="block text-xs font-medium text-purple-300/70 mb-1 uppercase tracking-wide">
              Mot de passe d'application
            </label>
            <div className="relative">
              <input
                name="appPassword"
                type={showPassword ? 'text' : 'password'}
                value={form.appPassword}
                onChange={onChange}
                placeholder="xxxx xxxx xxxx xxxx xxxx xxxx"
                required
                className="w-full pl-3.5 pr-10 py-2.5 rounded-xl text-sm text-white outline-none transition-all focus:ring-2 focus:ring-sky-500/40"
                style={{ background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.12)' }}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-purple-400/60 hover:text-purple-300 transition-colors"
              >
                {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            </div>
          </div>

          <div className="flex gap-2 pt-1">
            <button
              type="submit"
              disabled={isBusy}
              className="flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl font-semibold text-sm transition-all hover:scale-[1.02] active:scale-[0.98] disabled:opacity-50"
              style={{ background: 'linear-gradient(135deg, #0ea5e9, #6366f1)', boxShadow: '0 4px 15px rgba(14,165,233,0.3)' }}
            >
              {isBusy ? <Loader size={16} className="animate-spin" /> : <Wifi size={16} />}
              Tester & Enregistrer
            </button>
            {isConfigured && (
              <button
                type="button"
                onClick={() => setShowConfig(false)}
                className="px-4 py-2.5 rounded-xl btn-glass text-sm text-white/70"
              >
                Annuler
              </button>
            )}
          </div>
        </form>
      ) : (
        /* ── Actions de sync ── */
        <div className="space-y-3">
          {/* Envoyer vers Nextcloud */}
          <button
            onClick={upload}
            disabled={isBusy}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all hover:scale-[1.02] active:scale-[0.98] disabled:opacity-50 text-left"
            style={{ background: 'rgba(16,185,129,0.1)', border: '1px solid rgba(16,185,129,0.2)' }}
          >
            <div className="p-1.5 rounded-lg bg-emerald-500/20">
              {status === SYNC_STATUS.UPLOADING
                ? <Loader size={16} className="animate-spin text-emerald-300" />
                : <Upload size={16} className="text-emerald-300" />
              }
            </div>
            <div>
              <p className="text-sm font-semibold text-emerald-200">Envoyer vers Nextcloud</p>
              <p className="text-xs text-emerald-300/60">Sauvegarde les données locales sur le serveur</p>
            </div>
          </button>

          {/* Recevoir depuis Nextcloud */}
          <button
            onClick={onDownload}
            disabled={isBusy}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all hover:scale-[1.02] active:scale-[0.98] disabled:opacity-50 text-left ${
              confirmDownload ? 'ring-2 ring-orange-400/50' : ''
            }`}
            style={{ background: 'rgba(99,102,241,0.1)', border: `1px solid ${confirmDownload ? 'rgba(251,146,60,0.4)' : 'rgba(99,102,241,0.2)'}` }}
          >
            <div className={`p-1.5 rounded-lg ${confirmDownload ? 'bg-orange-500/20' : 'bg-indigo-500/20'}`}>
              {status === SYNC_STATUS.DOWNLOADING
                ? <Loader size={16} className="animate-spin text-indigo-300" />
                : <Download size={16} className={confirmDownload ? 'text-orange-300' : 'text-indigo-300'} />
              }
            </div>
            <div>
              <p className={`text-sm font-semibold ${confirmDownload ? 'text-orange-200' : 'text-indigo-200'}`}>
                {confirmDownload ? '⚠️ Confirmer ? Les données locales seront remplacées' : 'Recevoir depuis Nextcloud'}
              </p>
              <p className="text-xs text-indigo-300/60">
                {confirmDownload ? 'Cliquez à nouveau pour confirmer' : 'Remplace les données locales par celles du serveur'}
              </p>
            </div>
          </button>

          {confirmDownload && (
            <button
              onClick={() => setConfirmDownload(false)}
              className="w-full py-2 text-xs text-purple-300/60 hover:text-purple-200 transition-colors"
            >
              Annuler
            </button>
          )}

          {/* Actions secondaires */}
          <div className="flex gap-2 pt-1">
            <button
              onClick={() => {
                setForm({ serverUrl: config.serverUrl, username: config.username, appPassword: config.appPassword });
                setShowConfig(true);
              }}
              className="flex-1 flex items-center justify-center gap-1.5 py-2 rounded-xl btn-glass text-xs text-white/60 hover:text-white/80"
            >
              <RefreshCw size={12} />
              Modifier
            </button>
            <button
              onClick={disconnect}
              className="flex-1 flex items-center justify-center gap-1.5 py-2 rounded-xl btn-glass text-xs text-red-400/70 hover:text-red-300"
            >
              <LogOut size={12} />
              Déconnecter
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default NextcloudSync;
