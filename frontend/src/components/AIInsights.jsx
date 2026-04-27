/**
 * AIInsights.jsx — Análisis de wallet con IA
 */
import { useState } from 'react';
import { Brain, Sparkles, RefreshCw, AlertTriangle, Info } from 'lucide-react';
import { analyzeWallet } from '../services/openai';

export default function AIInsights({ walletData, records, stats }) {
  const [insight,   setInsight]   = useState(null);
  const [loading,   setLoading]   = useState(false);
  const [error,     setError]     = useState(null);
  const [generated, setGenerated] = useState(false);

  const { address, balance } = walletData || {};
  const hasApiKey = !!import.meta.env.VITE_OPENAI_API_KEY;

  async function handleAnalyze() {
    setLoading(true);
    setError(null);
    try {
      const result = await analyzeWallet({
        address,
        balance,
        interactions: stats?.totalInteractions ?? 0,
        records: records ?? [],
        networkName: 'Portaldot Chain',
      });
      setInsight(result);
      setGenerated(true);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  // ──────────────────────────────────────────────
  // Render
  // ──────────────────────────────────────────────
  return (
    <div className="card fade-in" style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: '1rem' }}>
        <div>
          <h2 style={{ display: 'flex', alignItems: 'center', gap: '.5rem', marginBottom: '.35rem' }}>
            <Brain size={18} color="var(--accent-purple)" />
            IA Insights
          </h2>
          <p style={{ fontSize: '.83rem' }}>
            Análisis inteligente de tu actividad on-chain
          </p>
        </div>
        {generated && (
          <button
            id="btn-regenerate-insights"
            className="btn btn-secondary btn-sm"
            onClick={handleAnalyze}
            disabled={loading}
          >
            <RefreshCw size={13} style={{ animation: loading ? 'spin .7s linear infinite' : 'none' }} />
            Regenerar
          </button>
        )}
      </div>

      {/* Badge de modo */}
      {!hasApiKey && (
        <div style={{
          display: 'flex', alignItems: 'flex-start', gap: '.6rem',
          background: 'rgba(245,158,11,.07)', border: '1px solid rgba(245,158,11,.2)',
          borderRadius: 'var(--radius-sm)', padding: '.75rem 1rem',
          fontSize: '.8rem', color: 'var(--accent-amber)',
        }}>
          <Info size={15} style={{ flexShrink: 0, marginTop: 1 }} />
          <span>
            Modo <strong>demo</strong> — agrega <code>VITE_OPENAI_API_KEY</code> en <code>.env</code> para análisis real con GPT-4o-mini.
          </span>
        </div>
      )}

      {/* Botón principal */}
      {!generated && !loading && (
        <button
          id="btn-analyze-wallet"
          className="btn btn-primary"
          onClick={handleAnalyze}
          style={{ alignSelf: 'flex-start' }}
        >
          <Sparkles size={16} />
          Analizar mi wallet con IA
        </button>
      )}

      {/* Spinner */}
      {loading && (
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', padding: '1.5rem', justifyContent: 'center' }}>
          <span className="spinner" style={{ width: 24, height: 24, borderWidth: 3 }} />
          <span style={{ color: 'var(--text-200)', fontSize: '.9rem' }}>
            {hasApiKey ? 'Consultando GPT-4o-mini…' : 'Generando análisis demo…'}
          </span>
        </div>
      )}

      {/* Error */}
      {error && (
        <div style={{
          display: 'flex', alignItems: 'flex-start', gap: '.6rem',
          background: 'rgba(239,68,68,.1)', border: '1px solid rgba(239,68,68,.3)',
          borderRadius: 'var(--radius-sm)', padding: '.75rem 1rem',
          color: '#f87171', fontSize: '.83rem',
        }}>
          <AlertTriangle size={15} style={{ flexShrink: 0, marginTop: 1 }} />
          {error}
        </div>
      )}

      {/* Resultado */}
      {insight && !loading && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '.75rem' }}>
          <hr className="divider" />
          <div
            id="ai-insights-result"
            style={{
              background: 'rgba(124,58,237,.06)',
              border: '1px solid rgba(124,58,237,.2)',
              borderRadius: 'var(--radius-md)',
              padding: '1.25rem',
              lineHeight: 1.75,
              fontSize: '.88rem',
              color: 'var(--text-100)',
              whiteSpace: 'pre-wrap',
            }}
          >
            <InsightRenderer text={insight} />
          </div>
          <div style={{ fontSize: '.72rem', color: 'var(--text-300)', display: 'flex', alignItems: 'center', gap: .35 }}>
            <Brain size={11} />
            {hasApiKey ? ' Generado con OpenAI GPT-4o-mini' : ' Generado en modo demo'}
          </div>
        </div>
      )}
    </div>
  );
}

/**
 * Render básico de markdown (negrita y saltos de línea)
 */
function InsightRenderer({ text }) {
  // Convierte **texto** → <strong> y saltos de línea → <br>
  const parts = text.split(/(\*\*[^*]+\*\*|\n)/g);
  return (
    <>
      {parts.map((part, i) => {
        if (part.startsWith('**') && part.endsWith('**')) {
          return <strong key={i} style={{ color: 'var(--accent-cyan)' }}>{part.slice(2, -2)}</strong>;
        }
        if (part === '\n') return <br key={i} />;
        return <span key={i}>{part}</span>;
      })}
    </>
  );
}
