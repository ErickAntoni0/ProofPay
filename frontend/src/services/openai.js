/**
 * openai.js — Servicio de integración con OpenAI
 * 
 * ⚠️  NOTA DE SEGURIDAD:
 * En producción NUNCA expongas tu API key en el frontend.
 * Usa un backend (Node/Express/Edge Function) como proxy.
 * Esta implementación es solo para demostración local.
 */

const OPENAI_API_KEY = import.meta.env.VITE_OPENAI_API_KEY || '';
const API_URL = 'https://api.openai.com/v1/chat/completions';

/**
 * Analiza la actividad de una wallet y genera insights
 * @param {object} walletData - { address, balance, interactions, records, networkName }
 * @returns {Promise<string>} Markdown con el análisis
 */
export async function analyzeWallet(walletData) {
  if (!OPENAI_API_KEY) {
    // Modo demo sin API key real
    return generateMockInsights(walletData);
  }

  const { address, balance, interactions, records, networkName } = walletData;

  const prompt = `Eres un analista experto en blockchain y DeFi. Analiza la siguiente wallet de Ethereum y proporciona insights concisos y útiles en español.

DATOS DE LA WALLET:
- Dirección: ${address}
- Balance: ${balance} ETH
- Red: ${networkName || 'Sepolia (Testnet)'}
- Total de interacciones con el contrato: ${interactions}
- Últimos mensajes almacenados: ${records.slice(-3).map(r => `"${r.message}"`).join(', ') || 'Ninguno'}

Por favor proporciona:
1. 🔍 **Resumen de actividad** (2-3 oraciones)
2. 💡 **3 insights clave** sobre el uso de la wallet
3. ⚠️ **1 recomendación de seguridad** relevante
4. 🚀 **Próximo paso sugerido** para el usuario

Responde de forma directa, usa emojis, sé conciso y amigable.`;

  try {
    const response = await fetch(API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${OPENAI_API_KEY}`,
      },
      body: JSON.stringify({
        model: 'gpt-4o-mini',
        messages: [{ role: 'user', content: prompt }],
        max_tokens: 400,
        temperature: 0.7,
      }),
    });

    if (!response.ok) {
      const err = await response.json();
      throw new Error(err.error?.message || `OpenAI error ${response.status}`);
    }

    const data = await response.json();
    return data.choices[0].message.content;
  } catch (error) {
    console.error('OpenAI error:', error);
    // Fallback a mock si hay error
    return generateMockInsights(walletData);
  }
}

/**
 * Genera insights simulados (sin API key)
 */
function generateMockInsights({ address, balance, interactions }) {
  const shortAddr = `${address.slice(0, 6)}...${address.slice(-4)}`;
  const activityLevel = interactions === 0 ? 'nueva' : interactions < 5 ? 'moderada' : 'alta';

  return `## 🤖 Análisis de Wallet (Demo)

> **Nota:** Este es un análisis simulado. Agrega tu \`VITE_OPENAI_API_KEY\` para análisis real con IA.

### 🔍 Resumen de actividad
La wallet \`${shortAddr}\` tiene un balance de **${balance} ETH** en Sepolia testnet con actividad ${activityLevel}. Ha realizado **${interactions}** interacciones con el contrato Demo.

### 💡 Insights clave
- **Balance testnet:** ${balance} ETH en Sepolia — ideal para pruebas sin riesgo real
- **Actividad del contrato:** ${interactions} interacción(es) registrada(s) — ${interactions === 0 ? 'comienza enviando tu primer mensaje' : 'buen progreso en la exploración'}
- **Perfil de usuario:** Usuario ${activityLevel === 'alta' ? 'avanzado y activo' : 'en fase exploratoria'} de tecnología Web3

### ⚠️ Recomendación de seguridad
Nunca uses la misma wallet de testnet con fondos reales. Mantén claves privadas separadas para mainnet y testnets.

### 🚀 Próximo paso
${interactions === 0
    ? 'Envía tu primer mensaje al contrato usando el panel Dashboard para ver la integración completa.'
    : 'Explora el historial de transacciones en Etherscan y considera deployar tu propio contrato personalizado.'}`;
}
