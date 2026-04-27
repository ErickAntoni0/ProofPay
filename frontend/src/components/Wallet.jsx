/**
 * Wallet.jsx — Componente de conexión de wallet
 */
import { useState } from 'react';
import { Wallet as WalletIcon, LogOut, ExternalLink, Copy, CheckCheck, RefreshCw } from 'lucide-react';
import { connectWallet, getBalance } from '../services/web3';

export default function Wallet({ walletData, onConnect, onDisconnect }) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [copied, setCopied] = useState(false);
  const [refreshing, setRefreshing] = useState(false);

  const { address, balance, provider } = walletData || {};
  const connected = !!address;

  // ── Conectar ───────────────────────────────────
  async function handleConnect() {
    setLoading(true);
    setError(null);
    try {
      const data = await connectWallet();
      const bal = await getBalance(data.provider, data.address);
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
      <div className="fade-in" style={{
        textAlign: 'center',
        padding: '40px 24px',
        maxWidth: '400px',
        margin: '0 auto',
        fontFamily: "'Kanit', sans-serif",
        background: 'rgba(23, 23, 23, 0.6)',
        backdropFilter: 'blur(12px)',
        borderRadius: '30px',
        border: '1px solid rgba(255, 255, 255, 0.05)',
      }}>
        <div style={{
          width: 48, height: 48, borderRadius: '50%',
          background: 'var(--bg-700)',
          border: '1px solid var(--border)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          margin: '0 auto 16px',
        }}>
          <WalletIcon size={24} color="var(--text-100)" />
        </div>

        <h2 style={{ marginBottom: '8px', fontSize: '26px', fontWeight: '600', color: '#fff', textTransform: 'uppercase' }}>
          Conecta tu Wallet
        </h2>
        <p style={{ marginBottom: '32px', fontSize: '15px', color: '#aaa' }}>
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
          onClick={handleConnect}
          disabled={loading}
          style={{
            width: '100%',
            padding: '12px',
            background: 'linear-gradient(135deg, #a3e635, #22c55e)',
            color: '#09090c',
            border: 'none',
            borderRadius: '50px',
            fontFamily: "'Kanit', sans-serif",
            fontWeight: 600,
            fontSize: '16px',
            cursor: loading ? 'not-allowed' : 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '8px',
            transition: 'transform 0.2s, box-shadow 0.2s'
          }}
          onMouseEnter={e => { if (!loading) { e.currentTarget.style.transform = 'scale(1.02)'; e.currentTarget.style.boxShadow = '0 0 16px rgba(163,230,53,.4)'; } }}
          onMouseLeave={e => { if (!loading) { e.currentTarget.style.transform = 'scale(1)'; e.currentTarget.style.boxShadow = 'none'; } }}
        >
          {loading
            ? <><span className="spinner" /> Conectando...</>
            : <><WalletIcon size={18} /> Conectar Wallet</>}
        </button>
      </div>
    );
  }

  // ──────────────────────────────────────────────
  // Render — conectado
  // ──────────────────────────────────────────────
  return (
    <div className="fade-in" style={{
      fontFamily: "'Kanit', sans-serif",
      background: 'rgba(23, 23, 23, 0.6)',
      backdropFilter: 'blur(12px)',
      borderRadius: '30px',
      border: '1px solid rgba(255, 255, 255, 0.05)',
      padding: '24px'
    }}>
      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '.75rem' }}>
          <span style={{
            background: 'rgba(163, 230, 53, 0.1)',
            color: '#a3e635',
            border: '1px solid rgba(163, 230, 53, 0.3)',
            padding: '4px 12px',
            borderRadius: '50px',
            fontSize: '12px',
            textTransform: 'uppercase',
            fontWeight: 500,
            display: 'flex',
            alignItems: 'center',
            gap: '6px'
          }}>
            <span style={{ width: 6, height: 6, background: '#a3e635', borderRadius: '50%', boxShadow: '0 0 6px #a3e635' }} />
            Connected · Portaldot
          </span>
        </div>
        <button
          id="btn-disconnect-wallet"
          onClick={onDisconnect}
          style={{
            background: 'transparent',
            color: '#ef4444',
            border: '1px solid rgba(239, 68, 68, 0.3)',
            borderRadius: '50px',
            padding: '4px 12px',
            fontSize: '12px',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: '4px',
            transition: 'all 0.2s'
          }}
          onMouseEnter={e => { e.currentTarget.style.background = 'rgba(239, 68, 68, 0.1)'; }}
          onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; }}
        >
          <LogOut size={14} /> Desconectar
        </button>
      </div>

      <div style={{
        background: 'rgba(0, 0, 0, 0.3)',
        border: '1px solid rgba(255, 255, 255, 0.05)',
        borderRadius: '20px',
        padding: '16px',
        marginBottom: '20px',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        gap: '.5rem',
      }}>
        <div>
          <div style={{ fontSize: '11px', color: '#888', marginBottom: '4px', textTransform: 'uppercase', letterSpacing: '1px' }}>
            Direction
          </div>
          <code style={{ fontSize: '15px', color: '#a3e635', fontFamily: 'monospace' }}>{shortAddr}</code>
        </div>
        <div style={{ display: 'flex', gap: '8px' }}>
          <button
            id="btn-copy-address"
            onClick={handleCopy}
            title="Copiar dirección"
            style={{
              background: 'rgba(255, 255, 255, 0.05)', border: 'none', color: '#fff',
              padding: '6px 10px', borderRadius: '8px', cursor: 'pointer', transition: 'background 0.2s'
            }}
            onMouseEnter={e => e.currentTarget.style.background = 'rgba(255, 255, 255, 0.1)'}
            onMouseLeave={e => e.currentTarget.style.background = 'rgba(255, 255, 255, 0.05)'}
          >
            {copied ? <CheckCheck size={16} color="#a3e635" /> : <Copy size={16} />}
          </button>
          <a
            href={`https://polkadot.js.org/apps/?rpc=wss%3A%2F%2Frpc.polkadot.io#/explorer`}
            target="_blank"
            rel="noopener noreferrer"
            title="Ver en Explorer"
            style={{
              background: 'rgba(255, 255, 255, 0.05)', border: 'none', color: '#fff',
              padding: '6px 10px', borderRadius: '8px', cursor: 'pointer', transition: 'background 0.2s',
              display: 'inline-flex', alignItems: 'center', justifyContent: 'center'
            }}
            onMouseEnter={e => e.currentTarget.style.background = 'rgba(255, 255, 255, 0.1)'}
            onMouseLeave={e => e.currentTarget.style.background = 'rgba(255, 255, 255, 0.05)'}
          >
            <ExternalLink size={16} />
          </a>
        </div>
      </div>

      {/* Balance */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '0 8px' }}>
        <div>
          <div style={{ fontSize: '11px', color: '#888', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '4px' }}>
            Balance
          </div>
          <div style={{ display: 'flex', alignItems: 'baseline', gap: '6px' }}>
            <span style={{ fontSize: '28px', fontWeight: 600, color: '#fff' }}>{balance}</span>
            <span style={{ fontSize: '14px', color: '#a3e635' }}>POT</span>
          </div>
        </div>
        <button
          id="btn-refresh-balance"
          onClick={handleRefreshBalance}
          disabled={refreshing}
          title="Actualizar balance"
          style={{
            background: 'transparent', border: '1px solid rgba(255, 255, 255, 0.1)', color: '#fff',
            padding: '8px', borderRadius: '50%', cursor: 'pointer', transition: 'all 0.2s',
            display: 'flex', alignItems: 'center', justifyContent: 'center'
          }}
          onMouseEnter={e => { e.currentTarget.style.background = 'rgba(255, 255, 255, 0.05)'; }}
          onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; }}
        >
          <RefreshCw size={16} style={{ animation: refreshing ? 'spin .7s linear infinite' : 'none' }} />
        </button>
      </div>
    </div>
  );
}
