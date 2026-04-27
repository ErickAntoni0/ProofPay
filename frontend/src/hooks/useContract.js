/**
 * useContract.js — MOCK HOOK FOR HACKATHON DEMO
 * Simulates blockchain interactions so the frontend works perfectly for the video pitch.
 */
import { useState, useCallback, useEffect } from 'react';

// Estado global simulado (persiste mientras no recargues la página)
let mockRecords = [];
let mockStats = {
  totalInteractions: 0,
  contractBalance: '0.0',
};

export function useContract(signer, provider, address) {
  const [loading, setLoading] = useState(false);
  const [error,   setError]   = useState(null);
  const [records, setRecords] = useState([]);
  const [stats,   setStats]   = useState(null);
  const [txHash,  setTxHash]  = useState(null);

  // ── Cargar registros del usuario ───────────────
  const fetchRecords = useCallback(async () => {
    if (!address) return;
    // Simulamos un pequeño delay de red
    setTimeout(() => {
      setRecords([...mockRecords].reverse());
    }, 500);
  }, [address]);

  // ── Cargar estadísticas globales ───────────────
  const fetchStats = useCallback(async () => {
    setTimeout(() => {
      setStats({ ...mockStats });
    }, 500);
  }, []);

  // Carga inicial
  useEffect(() => {
    if (address) {
      fetchRecords();
      fetchStats();
    }
  }, [address, fetchRecords, fetchStats]);

  // ── Enviar mensaje al contrato ─────────────────
  const storeMessage = useCallback(async (message, valueEth = '0') => {
    setLoading(true);
    setError(null);
    setTxHash(null);
    
    return new Promise((resolve) => {
      // Simulamos el tiempo de confirmación de bloque (2 segundos)
      setTimeout(() => {
        const fakeHash = '0x' + Array.from({length: 64}, () => Math.floor(Math.random()*16).toString(16)).join('');
        
        // Actualizamos estado simulado
        const newRecord = {
          message: message,
          timestamp: Math.floor(Date.now() / 1000),
          value: valueEth,
          sender: address || '0xDemoWalletAddress'
        };
        
        mockRecords.push(newRecord);
        mockStats.totalInteractions += 1;
        mockStats.contractBalance = (parseFloat(mockStats.contractBalance) + parseFloat(valueEth || 0)).toFixed(4);

        setTxHash(fakeHash);
        fetchRecords();
        fetchStats();
        setLoading(false);
        resolve(fakeHash);
      }, 2000);
    });
  }, [address, fetchRecords, fetchStats]);

  return {
    loading,
    error,
    records,
    stats,
    txHash,
    fetchRecords,
    fetchStats,
    storeMessage,
  };
}
