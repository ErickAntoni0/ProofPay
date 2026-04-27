/**
 * Wallet.jsx — Componente de conexión de wallet
 */
import { useState } from 'react';
import { Wallet as WalletIcon, LogOut, ExternalLink, Copy, CheckCheck, RefreshCw } from 'lucide-react';
import { connectWallet, getBalance } from '../services/web3';

export default function Wallet({ walletData, onConnect, onDisconnect }) {
  const [loading,  setLoading]  = useState(false);
  const [error,    setError]    = useState(null);
  const [copied,   setCopied]   = useState(false);
  const [refreshing, setRefreshing] = useState(false);

  const { address, balance, provider } = walletData || {};
  const connected = !!address;

  // ── Conectar ───────────────────────────────────
  async function handleConnect() {
    setLoading(true);
    setError(null);
    try {
      const data = await connectWallet();
      const bal  = await getBalance(data.provider, data.address);
      onConnect({ ...data, balance: bal });
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  // ── Refrescar balance ──────────────────────────
  async function handleRefreshBalance() {
    if (!provider || !address) return;
    setRefreshing(true);
    try {
      const bal = await getBalance(provider, address);
      onConnect({ ...walletData, balance: bal });
    } finally {
      setRefreshing(false);
    }
  }

  // ── Copiar dirección ───────────────────────────
  async function handleCopy() {
    await navigator.clipboard.writeText(address);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  const shortAddr = address
    ? `${address.slice(0, 6)}...${address.slice(-4)}`
    : '';

  // ──────────────────────────────────────────────
  // Render — no conectado
  // ──────────────────────────────────────────────
  if (!connected) {
    return (
      <div className="card fade-in" style={{ textAlign: 'center', padding: '24px', maxWidth: '400px', margin: '0 auto' }}>
        <div style={{
          width: 48, height: 48, borderRadius: '50%',
          background: 'var(--bg-700)',
          border: '1px solid var(--border)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          margin: '0 auto 16px',
        }}>
          <WalletIcon size={24} color="var(--text-100)" />
        </div>

        <h2 style={{ marginBottom: '8px', fontSize: '24px', fontWeight: '300' }}>Conecta tu Wallet</h2>
        <p style={{ marginBottom: '24px', fontSize: '14px', color: 'var(--text-200)' }}>
          Conecta tu Wallet de Portaldot para interactuar con el ecosistema y obtener análisis de IA.
        </p>

        {error && (
          <div style={{
            background: 'rgba(239,68,68,.1)', border: '1px solid rgba(239,68,68,.3)',
            borderRadius: 'var(--radius-sm)', padding: '.75rem 1rem',
            color: '#f87171', fontSize: '.85rem', marginBottom: '1.25rem',
          }}>
            ⚠️ {error}
          </div>
        )}

        <button
          id="btn-connect-wallet"
          className="btn btn-primary"
          onClick={handleConnect}
          disabled={loading}
          style={{ width: '100%', padding: '10px' }}
        >
          {loading
            ? <><span className="spinner" /> Conectando...</>
            : <><WalletIcon size={16} /> Conectar Wallet</>}
        </button>
      </div>
    );
  }

  // ──────────────────────────────────────────────
  // Render — conectado
  // ──────────────────────────────────────────────
  return (
    <div className="card fade-in">
      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.25rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '.75rem' }}>
          <span className="badge badge-green">
            <span className="dot dot-green" />
            Conectado · Portaldot
          </span>
        </div>
        <button
          id="btn-disconnect-wallet"
          className="btn btn-danger btn-sm"
          onClick={onDisconnect}
        >
          <LogOut size={14} /> Desconectar
        </button>
      </div>

      {/* Dirección */}
      <div style={{
        background: 'rgba(10,15,30,.8)',
        border: '1px solid var(--border)',
        borderRadius: 'var(--radius-sm)',
        padding: '.85rem 1rem',
        marginBottom: '1rem',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        gap: '.5rem',
      }}>
        <div>
          <div style={{ fontSize: '.72rem', color: 'var(--text-300)', marginBottom: '.2rem', textTransform: 'uppercase', letterSpacing: '.05em' }}>
            Dirección
          </div>
          <code style={{ fontSize: '.88rem', color: 'var(--accent-cyan)' }}>{shortAddr}</code>
        </div>
        <div style={{ display: 'flex', gap: '.4rem' }}>
          <button
            id="btn-copy-address"
            className="btn btn-secondary btn-sm"
            onClick={handleCopy}
            title="Copiar dirección"
          >
            {copied ? <CheckCheck size={14} color="var(--accent-green)" /> : <Copy size={14} />}
          </button>
          <a
            href={`https://polkadot.js.org/apps/?rpc=wss%3A%2F%2Frpc.polkadot.io#/explorer/query/${address}`}
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-secondary btn-sm"
            title="Ver en Explorer"
          >
            <ExternalLink size={14} />
          </a>
        </div>
      </div>

      {/* Balance */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <div style={{ fontSize: '.72rem', color: 'var(--text-300)', textTransform: 'uppercase', letterSpacing: '.05em', marginBottom: '.2rem' }}>
            Balance
          </div>
          <div style={{ display: 'flex', alignItems: 'baseline', gap: '.4rem' }}>
            <span style={{ fontSize: '1.6rem', fontWeight: 700, color: 'var(--text-100)' }}>{balance}</span>
            <span style={{ fontSize: '.85rem', color: 'var(--text-300)' }}>POT</span>
          </div>
        </div>
        <button
          id="btn-refresh-balance"
          className="btn btn-secondary btn-sm"
          onClick={handleRefreshBalance}
          disabled={refreshing}
          title="Actualizar balance"
        >
          <RefreshCw size={14} style={{ animation: refreshing ? 'spin .7s linear infinite' : 'none' }} />
        </button>
      </div>
    </div>
  );
}
