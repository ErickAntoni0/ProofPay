/**
 * App.jsx — AI Web3 Dashboard
 */
import { useState } from 'react';
import { Brain, Layers, Zap, ArrowLeft } from 'lucide-react';
import Landing   from './components/Landing';
import Wallet    from './components/Wallet';
import Dashboard from './components/Dashboard';
import AIInsights from './components/AIInsights';
import { useContract } from './hooks/useContract';

/* ── Estilos de layout ─────────────────────────── */
const styles = {
  app: {
    minHeight: '100vh',
    display: 'flex',
    flexDirection: 'column',
  },
  navbar: {
    position: 'sticky',
    top: 0,
    zIndex: 100,
    backdropFilter: 'blur(20px)',
    WebkitBackdropFilter: 'blur(20px)',
    background: 'rgba(5,8,18,.85)',
    borderBottom: '1px solid rgba(99,120,180,.12)',
    padding: '.85rem 1.5rem',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: '1rem',
  },
  logo: {
    display: 'flex',
    alignItems: 'center',
    gap: '.65rem',
    textDecoration: 'none',
  },
  main: {
    flex: 1,
    maxWidth: 1100,
    width: '100%',
    margin: '0 auto',
    padding: '2rem 1.25rem 4rem',
  },
  hero: {
    textAlign: 'center',
    padding: '3rem 1rem 2.5rem',
    marginBottom: '2rem',
  },
  heroChip: {
    display: 'inline-flex',
    alignItems: 'center',
    gap: '6px',
    padding: '4px 12px',
    background: 'var(--bg-800)',
    border: '1px solid var(--border)',
    borderRadius: '100px',
    fontSize: '12px',
    color: 'var(--text-200)',
    fontWeight: 500,
    marginBottom: '16px',
  },
  grid: {
    display: 'grid',
    gridTemplateColumns: 'minmax(0,1fr)',
    gap: '1.25rem',
  },
  footer: {
    borderTop: '1px solid var(--border)',
    padding: '1.25rem 1.5rem',
    textAlign: 'center',
    fontSize: '.78rem',
    color: 'var(--text-300)',
  },
};

/* ── Componente de tech-stack ─────────────────── */
const STACK = [
  { label: 'React + Vite' },
  { label: 'Solidity' },
  { label: 'Hardhat' },
  { label: 'OpenAI' },
  { label: 'ethers.js' },
  { label: 'Sepolia' },
];

/* ═══════════════════════════════════════════════ */
export default function App() {
  const [walletData, setWalletData] = useState(null);
  const [showApp, setShowApp] = useState(false);

  // Acceso a datos del contrato para pasarlos a AIInsights
  const { records, stats, fetchRecords, fetchStats } = useContract(
    walletData?.signer,
    walletData?.provider,
    walletData?.address,
  );

  function handleConnect(data) {
    setWalletData(data);
  }

  function handleDisconnect() {
    setWalletData(null);
  }

  const connected = !!walletData?.address;

  if (!showApp) {
    return <Landing onEnterApp={() => setShowApp(true)} />;
  }

  return (
    <div style={styles.app}>
      {/* ── Navbar ─────────────────────────────── */}
      <nav style={styles.navbar}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <button
            onClick={() => setShowApp(false)}
            className="btn btn-secondary btn-sm"
            style={{ padding: '6px 10px' }}
            title="Back to Landing"
          >
            <ArrowLeft size={16} />
          </button>
          <a style={styles.logo} href="/" aria-label="AI Web3 Dashboard">
            <div style={{
              width: 32, height: 32, borderRadius: 16,
              background: 'var(--bg-700)', border: '1px solid var(--border)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
            }}>
            <Brain size={16} color="var(--text-100)" />
          </div>
          <span style={{ fontWeight: 600, fontSize: '14px', color: 'var(--text-100)' }}>
            AI Web3 Dashboard
          </span>
          </a>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '.5rem' }}>
          <span className="badge badge-purple">
            <Layers size={11} />
            Demo
          </span>
          <a
            href="https://github.com"
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-secondary btn-sm"
            id="link-github"
          >
            GitHub
          </a>
        </div>
      </nav>

      {/* ── Main ───────────────────────────────── */}
      <main style={styles.main}>

        {/* Hero */}
        <header style={styles.hero}>
          <div style={styles.heroChip}>
            <Zap size={11} />
            Web3 + Smart Contracts + IA
          </div>
          <h1 style={{ fontWeight: 600, fontSize: '32px' }}>
            AI-Powered Web3 Dashboard
          </h1>
          <p style={{ maxWidth: 520, margin: '.75rem auto 1.5rem', fontSize: '1rem' }}>
            Conecta tu wallet, interactúa con un smart contract en Sepolia
            y obtén insights inteligentes sobre tu actividad on-chain.
          </p>
          {/* Stack chips */}
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '.5rem', justifyContent: 'center' }}>
            {STACK.map(({ label }) => (
              <span key={label} style={{
                padding: '4px 10px', borderRadius: 100,
                background: 'transparent', border: `1px solid var(--border)`,
                fontSize: '12px', color: 'var(--text-200)', fontWeight: 500,
              }}>
                {label}
              </span>
            ))}
          </div>
        </header>

        {/* Content grid */}
        <div style={{ ...styles.grid }}>

          {/* Wallet — siempre visible */}
          <Wallet
            walletData={walletData}
            onConnect={handleConnect}
            onDisconnect={handleDisconnect}
          />

          {/* Dashboard y AI — solo si está conectado */}
          {connected && (
            <>
              <Dashboard
                walletData={walletData}
              />

              <AIInsights
                walletData={walletData}
                records={records}
                stats={stats}
              />
            </>
          )}

          {/* Placeholder si no conectado */}
          {!connected && (
            <div className="card fade-in" style={{
              display: 'flex', flexDirection: 'column', alignItems: 'center',
              justifyContent: 'center', padding: '3rem 2rem', textAlign: 'center',
              opacity: .6, gap: '1rem',
            }}>
              <div style={{ display: 'flex', gap: '1.5rem', fontSize: '2rem' }}>
                📊 🤖 ⛓️
              </div>
              <p>Conecta tu wallet para ver el Dashboard y los Insights de IA</p>
            </div>
          )}
        </div>
      </main>

      {/* ── Footer ─────────────────────────────── */}
      <footer style={styles.footer}>
        <span>AI Web3 Dashboard · Demo · Solo para Sepolia Testnet · No uses fondos reales</span>
      </footer>
    </div>
  );
}
