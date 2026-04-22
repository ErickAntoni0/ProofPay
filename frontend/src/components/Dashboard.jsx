/**
 * Dashboard.jsx — Panel de interacción con el smart contract
 */
import { useState, useEffect } from 'react';
import {
  Send, RefreshCw, MessageSquare, Activity,
  Database, ExternalLink, Zap, Clock,
} from 'lucide-react';
import { useContract } from '../hooks/useContract';

const CONTRACT_ADDRESS = import.meta.env.VITE_CONTRACT_ADDRESS || '';

export default function Dashboard({ walletData }) {
  const { signer, provider, address } = walletData || {};
  const {
    loading, error, records, stats, txHash,
    fetchRecords, fetchStats, storeMessage,
  } = useContract(signer, provider, address);

  const [message,  setMessage]  = useState('');
  const [valueEth, setValueEth] = useState('');
  const [success,  setSuccess]  = useState(null);
  const [refreshing, setRefreshing] = useState(false);

  // Carga inicial
  useEffect(() => {
    if (address) {
      fetchRecords();
      fetchStats();
    }
  }, [address, fetchRecords, fetchStats]);

  // ── Enviar mensaje ─────────────────────────────
  async function handleSend(e) {
    e.preventDefault();
    if (!message.trim()) return;
    setSuccess(null);
    try {
      const hash = await storeMessage(message.trim(), valueEth || '0');
      setSuccess(hash);
      setMessage('');
      setValueEth('');
    } catch {
      /* error ya en hook */
    }
  }

  // ── Refrescar datos ────────────────────────────
  async function handleRefresh() {
    setRefreshing(true);
    try {
      await Promise.all([fetchRecords(), fetchStats()]);
    } finally {
      setRefreshing(false);
    }
  }

  // ──────────────────────────────────────────────
  // Render
  // ──────────────────────────────────────────────
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>

      {/* Stats globales */}
      <div className="card fade-in">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
          <h2 style={{ display: 'flex', alignItems: 'center', gap: '.5rem' }}>
            <Activity size={18} color="var(--accent-cyan)" />
            Estadísticas del Contrato
          </h2>
          <button
            id="btn-refresh-stats"
            className="btn btn-secondary btn-sm"
            onClick={handleRefresh}
            disabled={refreshing}
          >
            <RefreshCw size={14} style={{ animation: refreshing ? 'spin .7s linear infinite' : 'none' }} />
            Actualizar
          </button>
        </div>

        <div className="stat-grid">
          <div className="stat-card">
            <span className="stat-label">Total interacciones</span>
            <span className="stat-value gradient-text">{stats?.totalInteractions ?? '—'}</span>
          </div>
          <div className="stat-card">
            <span className="stat-label">Balance contrato</span>
            <span className="stat-value" style={{ color: 'var(--accent-green)' }}>
              {stats ? stats.contractBalance : '—'}
            </span>
            <span className="stat-unit">ETH</span>
          </div>
          <div className="stat-card">
            <span className="stat-label">Tus mensajes</span>
            <span className="stat-value" style={{ color: 'var(--accent-purple)' }}>
              {records.length}
            </span>
          </div>
          <div className="stat-card">
            <span className="stat-label">Red</span>
            <span className="stat-value" style={{ fontSize: '1rem', color: 'var(--accent-amber)' }}>
              Sepolia
            </span>
          </div>
        </div>

        {/* Dirección del contrato */}
        {CONTRACT_ADDRESS ? (
          <div style={{ marginTop: '1rem', paddingTop: '1rem', borderTop: '1px solid var(--border)' }}>
            <div style={{ fontSize: '.72rem', color: 'var(--text-300)', marginBottom: '.35rem', textTransform: 'uppercase', letterSpacing: '.05em' }}>
              <Database size={11} style={{ verticalAlign: 'middle', marginRight: 4 }} />
              Contrato Demo
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '.5rem' }}>
              <code style={{ fontSize: '.82rem', color: 'var(--text-200)', wordBreak: 'break-all' }}>
                {CONTRACT_ADDRESS}
              </code>
              <a
                href={`https://sepolia.etherscan.io/address/${CONTRACT_ADDRESS}`}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-secondary btn-sm"
                style={{ flexShrink: 0 }}
              >
                <ExternalLink size={13} />
              </a>
            </div>
          </div>
        ) : (
          <div style={{
            marginTop: '1rem', padding: '.75rem 1rem',
            background: 'rgba(245,158,11,.08)', border: '1px solid rgba(245,158,11,.2)',
            borderRadius: 'var(--radius-sm)', fontSize: '.83rem', color: 'var(--accent-amber)',
          }}>
            ⚠️ <code>VITE_CONTRACT_ADDRESS</code> no configurado en <code>.env</code>
          </div>
        )}
      </div>

      {/* Formulario — enviar mensaje */}
      <div className="card fade-in">
        <h2 style={{ display: 'flex', alignItems: 'center', gap: '.5rem', marginBottom: '1rem' }}>
          <Send size={18} color="var(--accent-purple)" />
          Enviar Mensaje al Contrato
        </h2>

        <form onSubmit={handleSend} style={{ display: 'flex', flexDirection: 'column', gap: '.85rem' }}>
          <div>
            <label htmlFor="input-message" style={{ display: 'block', fontSize: '.8rem', color: 'var(--text-300)', marginBottom: '.4rem' }}>
              Mensaje (máx. 280 caracteres)
            </label>
            <input
              id="input-message"
              className="input"
              type="text"
              placeholder="Escribe tu mensaje..."
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              maxLength={280}
              required
              disabled={loading}
            />
            <div style={{ fontSize: '.72rem', color: 'var(--text-300)', textAlign: 'right', marginTop: '.25rem' }}>
              {message.length}/280
            </div>
          </div>

          <div>
            <label htmlFor="input-value" style={{ display: 'block', fontSize: '.8rem', color: 'var(--text-300)', marginBottom: '.4rem' }}>
              Valor ETH (opcional — se envía junto al mensaje)
            </label>
            <input
              id="input-value"
              className="input"
              type="number"
              step="0.0001"
              min="0"
              placeholder="0.001"
              value={valueEth}
              onChange={(e) => setValueEth(e.target.value)}
              disabled={loading}
            />
          </div>

          {/* Feedback */}
          {error && (
            <div style={{
              background: 'rgba(239,68,68,.1)', border: '1px solid rgba(239,68,68,.3)',
              borderRadius: 'var(--radius-sm)', padding: '.75rem 1rem',
              color: '#f87171', fontSize: '.83rem',
            }}>
              ❌ {error}
            </div>
          )}

          {success && (
            <div style={{
              background: 'rgba(16,185,129,.1)', border: '1px solid rgba(16,185,129,.3)',
              borderRadius: 'var(--radius-sm)', padding: '.75rem 1rem',
              color: 'var(--accent-green)', fontSize: '.83rem',
            }}>
              ✅ Transacción confirmada.{' '}
              <a
                href={`https://sepolia.etherscan.io/tx/${success}`}
                target="_blank"
                rel="noopener noreferrer"
                style={{ color: 'inherit', fontWeight: 600 }}
              >
                Ver en Etherscan →
              </a>
            </div>
          )}

          {txHash && loading && (
            <div style={{
              background: 'rgba(0,212,255,.08)', border: '1px solid rgba(0,212,255,.2)',
              borderRadius: 'var(--radius-sm)', padding: '.75rem 1rem',
              color: 'var(--accent-cyan)', fontSize: '.83rem',
            }}>
              ⏳ Tx enviada, esperando confirmación…{' '}
              <a
                href={`https://sepolia.etherscan.io/tx/${txHash}`}
                target="_blank"
                rel="noopener noreferrer"
                style={{ color: 'inherit' }}
              >
                <ExternalLink size={12} style={{ verticalAlign: 'middle' }} />
              </a>
            </div>
          )}

          <button
            id="btn-send-message"
            type="submit"
            className="btn btn-primary"
            disabled={loading || !message.trim() || !CONTRACT_ADDRESS}
          >
            {loading
              ? <><span className="spinner" /> Enviando...</>
              : <><Zap size={15} /> Enviar transacción</>}
          </button>
        </form>
      </div>

      {/* Historial de mensajes */}
      <div className="card fade-in">
        <h2 style={{ display: 'flex', alignItems: 'center', gap: '.5rem', marginBottom: '1rem' }}>
          <MessageSquare size={18} color="var(--accent-cyan)" />
          Historial de mensajes
          <span className="badge badge-cyan" style={{ marginLeft: 'auto' }}>{records.length}</span>
        </h2>

        {records.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '2rem', color: 'var(--text-300)' }}>
            <MessageSquare size={32} style={{ opacity: .3, marginBottom: '.5rem' }} />
            <p>No hay mensajes. ¡Envía el primero!</p>
          </div>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '.75rem' }}>
            {records.map((r, i) => (
              <div
                key={i}
                style={{
                  background: 'rgba(10,15,30,.6)',
                  border: '1px solid var(--border)',
                  borderRadius: 'var(--radius-sm)',
                  padding: '.85rem 1rem',
                }}
              >
                <p style={{ color: 'var(--text-100)', marginBottom: '.45rem', fontSize: '.9rem' }}>
                  "{r.message}"
                </p>
                <div style={{ display: 'flex', gap: '1rem', fontSize: '.75rem', color: 'var(--text-300)' }}>
                  <span style={{ display: 'flex', alignItems: 'center', gap: '.3rem' }}>
                    <Clock size={11} />
                    {new Date(r.timestamp * 1000).toLocaleString('es-MX')}
                  </span>
                  {parseFloat(r.value) > 0 && (
                    <span style={{ color: 'var(--accent-green)' }}>
                      💰 {r.value} ETH
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
