/**
 * Dashboard.jsx — Panel de interacción con el smart contract
 */
import { useState, useEffect } from 'react';
import {
  Send, RefreshCw, MessageSquare, Activity,
  Database, ExternalLink, Zap, Clock, FileDown,
} from 'lucide-react';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
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

  // ── Exportar a PDF ─────────────────────────────
  function handleExportPDF() {
    if (records.length === 0) return;

    const doc = new jsPDF();
    
    // Título y Cabecera
    doc.setFontSize(22);
    doc.setTextColor(23, 23, 23); // #171717
    doc.text('ProofPay Verifiable Report', 14, 22);
    
    doc.setFontSize(11);
    doc.setTextColor(100);
    doc.text(`Generated on: ${new Date().toLocaleString()}`, 14, 30);
    doc.text(`Wallet Address: ${address}`, 14, 36);
    doc.text(`Contract Hash: ${CONTRACT_ADDRESS || 'Not deployed'}`, 14, 42);

    // Preparar datos para la tabla
    const tableColumn = ["Date", "Client/Address", "Concept", "Amount (POT)", "Status"];
    const tableRows = [];

    records.forEach(record => {
      const date = new Date(record.timestamp * 1000).toLocaleString();
      const addr = record.sender.slice(0, 6) + '...' + record.sender.slice(-4);
      const amount = record.value;
      const concept = record.message || 'N/A';
      
      tableRows.push([
        date,
        addr,
        concept,
        amount,
        "Verified On-Chain"
      ]);
    });

    // Generar tabla
    doc.autoTable({
      startY: 50,
      head: [tableColumn],
      body: tableRows,
      theme: 'grid',
      headStyles: { fillColor: [163, 230, 53], textColor: [9, 9, 12] }, // Portaldot Lime
      styles: { fontSize: 10, cellPadding: 4 },
      alternateRowStyles: { fillColor: [245, 245, 245] }
    });

    // Footer con nota de confianza
    const finalY = doc.lastAutoTable.finalY || 50;
    doc.setFontSize(10);
    doc.setTextColor(150);
    doc.text('This document acts as an immutable proof of payment recorded on the Portaldot blockchain.', 14, finalY + 15);
    doc.text('To verify authenticity, cross-reference the Contract Hash on the Portaldot Block Explorer.', 14, finalY + 21);

    // Guardar el PDF
    doc.save(`ProofPay_Report_${address.slice(0, 6)}.pdf`);
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
            Métricas de Pagos
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
            <span className="stat-label">Volumen Total</span>
            <span className="stat-value" style={{ color: 'var(--accent-green)' }}>
              {stats ? stats.contractBalance : '—'}
            </span>
            <span className="stat-unit">POT</span>
          </div>
          <div className="stat-card">
            <span className="stat-label">Tus Recibos</span>
            <span className="stat-value" style={{ color: 'var(--accent-purple)' }}>
              {records.length}
            </span>
          </div>
          <div className="stat-card">
            <span className="stat-label">Red</span>
            <span className="stat-value" style={{ fontSize: '1rem', color: 'var(--accent-amber)' }}>
              Portaldot
            </span>
          </div>
        </div>

        {/* Dirección del contrato */}
        <div style={{ marginTop: '1rem', paddingTop: '1rem', borderTop: '1px solid var(--border)' }}>
          <div style={{ fontSize: '.72rem', color: 'var(--text-300)', marginBottom: '.35rem', textTransform: 'uppercase', letterSpacing: '.05em' }}>
            <Database size={11} style={{ verticalAlign: 'middle', marginRight: 4 }} />
            ProofPay Engine
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '.5rem' }}>
            <code style={{ fontSize: '.82rem', color: 'var(--text-200)', wordBreak: 'break-all' }}>
              {CONTRACT_ADDRESS || '5GrwvaEF5zXb26Fz9rcQpDWS57CtERHpNehXCPcNoHGKutQY'}
            </code>
            <a
              href={`https://polkadot.js.org/apps/?rpc=wss%3A%2F%2Frpc.polkadot.io#/explorer`}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-secondary btn-sm"
              style={{ flexShrink: 0 }}
            >
              <ExternalLink size={13} />
            </a>
          </div>
        </div>
      </div>

      {/* Formulario — enviar mensaje */}
      <div className="card fade-in">
        <h2 style={{ display: 'flex', alignItems: 'center', gap: '.5rem', marginBottom: '1rem' }}>
          <Send size={18} color="var(--accent-purple)" />
          Registrar Nuevo Pago
        </h2>

        <form onSubmit={handleSend} style={{ display: 'flex', flexDirection: 'column', gap: '.85rem' }}>
          <div>
            <label htmlFor="input-message" style={{ display: 'block', fontSize: '.8rem', color: 'var(--text-300)', marginBottom: '.4rem' }}>
              Concepto del Pago (ej. Desarrollo Web MVP)
            </label>
            <input
              id="input-message"
              className="input"
              type="text"
              placeholder="Concepto del cobro..."
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
            <label htmlFor="input-value" style={{ block: 'block', fontSize: '.8rem', color: 'var(--text-300)', marginBottom: '.4rem' }}>
              Monto en POT (Recibido)
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
                href={`https://polkadot.js.org/apps/?rpc=wss%3A%2F%2Frpc.polkadot.io#/explorer`}
                target="_blank"
                rel="noopener noreferrer"
                style={{ color: 'inherit', fontWeight: 600 }}
              >
                Ver en Polkadot Explorer →
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
                href={`https://polkadot.js.org/apps/?rpc=wss%3A%2F%2Frpc.polkadot.io#/explorer`}
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
            disabled={loading || !message.trim()}
          >
            {loading
              ? <><span className="spinner" /> Registrando...</>
              : <><Zap size={15} /> Generar Recibo On-Chain</>}
          </button>
        </form>
      </div>

      {/* Historial de mensajes */}
      <div className="card fade-in">
        <h2 style={{ display: 'flex', alignItems: 'center', gap: '.5rem', marginBottom: '1rem' }}>
          <MessageSquare size={18} color="var(--accent-cyan)" />
          Historial de Pagos Verificables
          <div style={{ marginLeft: 'auto', display: 'flex', alignItems: 'center', gap: '10px' }}>
            <span className="badge badge-cyan">{records.length}</span>
            <button 
              onClick={handleExportPDF} 
              disabled={records.length === 0}
              className="btn btn-secondary btn-sm"
              style={{ display: 'flex', alignItems: 'center', gap: '5px', borderColor: 'var(--accent-cyan)' }}
            >
              <FileDown size={14} /> PDF
            </button>
          </div>
        </h2>

        {records.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '2rem', color: 'var(--text-300)' }}>
            <MessageSquare size={32} style={{ opacity: .3, marginBottom: '.5rem' }} />
            <p>Aún no has registrado pagos. ¡Empieza ahora!</p>
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
                      💰 {r.value} POT
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
