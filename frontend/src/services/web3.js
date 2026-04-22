/**
 * web3.js — Utilidades para interactuar con MetaMask y ethers.js
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
 * Conecta MetaMask y devuelve { provider, signer, address }
 */
export async function connectWallet() {
  if (!window.ethereum) {
    throw new Error('MetaMask no detectado. Instala la extensión.');
  }

  // Verificar red (Sepolia = 0xaa36a7) ANTES de crear el provider
  const currentChainId = await window.ethereum.request({ method: 'eth_chainId' });
  if (currentChainId !== '0xaa36a7') {
    try {
      await window.ethereum.request({
        method: 'wallet_switchEthereumChain',
        params: [{ chainId: '0xaa36a7' }],
      });
      // Darle un instante a MetaMask para asentar el cambio
      await new Promise(resolve => setTimeout(resolve, 500));
    } catch (error) {
      throw new Error('Red incorrecta. Por favor cambia a Sepolia en tu wallet.');
    }
  }

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
