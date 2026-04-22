/**
 * useContract.js — Hook para interactuar con el contrato Demo
 */
import { useState, useCallback } from 'react';
import { ethers } from 'ethers';
import { getDemoContract } from '../services/web3';

export function useContract(signer, provider, address) {
  const [loading, setLoading] = useState(false);
  const [error,   setError]   = useState(null);
  const [records, setRecords] = useState([]);
  const [stats,   setStats]   = useState(null);
  const [txHash,  setTxHash]  = useState(null);

  // ── Cargar registros del usuario ───────────────
  const fetchRecords = useCallback(async () => {
    if (!provider || !address) return;
    try {
      const contract = getDemoContract(provider);
      const raw = await contract.getRecords(address);
      const parsed = raw.map((r) => ({
        message:   r.message,
        timestamp: Number(r.timestamp),
        value:     ethers.formatEther(r.value),
      }));
      setRecords(parsed.reverse()); // más recientes primero
    } catch (err) {
      console.error('fetchRecords:', err);
    }
  }, [provider, address]);

  // ── Cargar estadísticas globales ───────────────
  const fetchStats = useCallback(async () => {
    if (!provider) return;
    try {
      const contract = getDemoContract(provider);
      const [total, balance, owner] = await contract.getStats();
      setStats({
        totalInteractions: Number(total),
        contractBalance:   ethers.formatEther(balance),
        owner,
      });
    } catch (err) {
      console.error('fetchStats:', err);
    }
  }, [provider]);

  // ── Enviar mensaje al contrato ─────────────────
  const storeMessage = useCallback(async (message, valueEth = '0') => {
    if (!signer) throw new Error('Wallet no conectada');
    setLoading(true);
    setError(null);
    setTxHash(null);
    try {
      const contract = getDemoContract(signer);
      const value = ethers.parseEther(valueEth || '0');
      const tx = await contract.storeMessage(message, { value });
      setTxHash(tx.hash);
      await tx.wait();
      // Refrescar datos
      await Promise.all([fetchRecords(), fetchStats()]);
      return tx.hash;
    } catch (err) {
      const msg = err?.reason || err?.message || 'Transacción fallida';
      setError(msg);
      throw err;
    } finally {
      setLoading(false);
    }
  }, [signer, fetchRecords, fetchStats]);

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
