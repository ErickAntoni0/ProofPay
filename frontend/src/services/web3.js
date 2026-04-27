/**
 * web3.js — Utilidades para interactuar con Portaldot (via MetaMask Mock para este MVP)
 */
import { ethers } from 'ethers';

// ABI mínimo del contrato Demo
export const DEMO_ABI = [
  "function storeMessage(string calldata _message) external payable",
  "function getRecords(address _user) external view returns (tuple(string message, uint256 timestamp, uint256 value)[])",
  "function getLastMessage(address _user) external view returns (string message, uint256 timestamp, uint256 value)",
  "function getStats() external view returns (uint256 totalInteractions, uint256 contractBalance, address owner)",
  "function totalInteractions() external view returns (uint256)",
  "function userInteractionCount(address) external view returns (uint256)",
  "event MessageStored(address indexed user, string message, uint256 value, uint256 timestamp)",
];

export const CONTRACT_ADDRESS = import.meta.env.VITE_CONTRACT_ADDRESS || '';

/**
 * Conecta Wallet y devuelve { provider, signer, address }
 */
export async function connectWallet() {
  if (!window.ethereum) {
    throw new Error('MetaMask no detectado. Instala la extensión.');
  }

  // Para el MVP de Portaldot, permitimos cualquier red o simulamos la correcta
  // Si quisiéramos forzar una red específica de Portaldot, aquí iría la lógica

  const provider = new ethers.BrowserProvider(window.ethereum);
  const accounts  = await provider.send('eth_requestAccounts', []);

  if (!accounts.length) throw new Error('No se seleccionó ninguna cuenta.');

  const signer  = await provider.getSigner();
  const address = await signer.getAddress();

  return { provider, signer, address };
}

/**
 * Devuelve balance en ETH formateado
 */
export async function getBalance(provider, address) {
  const balance = await provider.getBalance(address);
  return parseFloat(ethers.formatEther(balance)).toFixed(4);
}

/**
 * Devuelve instancia del contrato Demo
 */
export function getDemoContract(signerOrProvider) {
  if (!CONTRACT_ADDRESS) {
    throw new Error('VITE_CONTRACT_ADDRESS no configurado en .env');
  }
  return new ethers.Contract(CONTRACT_ADDRESS, DEMO_ABI, signerOrProvider);
}
