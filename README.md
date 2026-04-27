# 🧾 ProofPay

> **Verifiable payment history for freelancers and small businesses — powered by Portaldot and AI.**

---

## 📌 Project Name
**ProofPay** — *Your payments, proven on-chain.*

---

## 🧠 Overview

**ProofPay** is a financial transparency platform built on **Portaldot** for the Portaldot Mini Hackathon.

Freelancers and small businesses in LATAM face a common, painful problem: **they can't reliably prove their payment history**. Banks don't trust informal income, clients dispute invoices, and a PDF "payment record" is trivially falsifiable.

ProofPay solves this by recording every payment as an **immutable on-chain proof** on Portaldot. An AI assistant then lets you query your history in plain language and generate verifiable reports — for clients, accountants, or banks — with no intermediaries.

> 🎯 **Goal:** Give every freelancer and small business a trustless, verifiable financial identity on Web3.

---

## 💡 Problem

A freelancer in Mexico, Argentina, or Colombia cannot easily demonstrate their income history to:
- A bank evaluating a loan
- A new client validating their reliability
- An accountant preparing a tax report
- A platform verifying their professional track record

Traditional records (PayPal screenshots, bank transfers, invoices) are editable, platform-dependent, and unverifiable. There is no neutral, tamper-proof source of truth.

## ✅ Solution

ProofPay provides three layers of trust:

1. **On-Chain Record** — Every payment is stored as a structured, immutable entry on Portaldot via an ink! smart contract. Publicly verifiable, forever.
2. **AI Assistant** — A conversational AI that understands your on-chain history. Ask in plain language: *"How much did I earn this quarter?"*, *"Which client pays late?"*, *"Summarize my income for a bank application."*
3. **Verifiable Reports** — Export a PDF report with your payment history + the on-chain contract hash. Anyone can verify authenticity directly on the Portaldot explorer.

---

## 🏗️ Tech Stack

| Layer | Technology |
|---|---|
| Frontend | React + Vite + Vanilla CSS |
| Blockchain | Portaldot (Polkadot Substrate) |
| Smart Contracts | ink! (Rust) — Native WASM |
| Wallet | Polkadot.js / Portaldot-compatible wallets |
| AI Engine | OpenAI GPT-4 API |
| PDF Export | jsPDF |

---

## 🔗 Why Portaldot

ProofPay is specifically designed for Portaldot because:

- **Low fees** make it economically viable to record every payment on-chain. On Ethereum mainnet, gas costs would exceed the value of the record for small transactions.
- **ink!/WASM contracts** are more efficient for high-frequency, structured data writes (payment records) than EVM alternatives.
- **Substrate architecture** enables future expansion across parachains — one identity, multiple chains, multiple countries.
- **POT token** is used for all gas fees, keeping the entire flow native to the Portaldot ecosystem.

---

## 📜 Smart Contract

The core contract is open source, written in **Rust using ink!**, located at `/contracts/proofpay/lib.rs`.

### Contract Functions

| Function | Description |
|---|---|
| `record_payment(client, amount, concept)` | Stores a structured, immutable payment entry with timestamp |
| `get_payments(user)` | Returns the full verified payment history for an address |
| `get_stats()` | Returns global contract metrics (total records, total volume) |
| `withdraw()` | Secure fund management for the contract owner |

> **License:** MIT — fully open source and deployable on any Portaldot-compatible chain.

---

## ⚙️ Features

### 🔐 On-Chain (Smart Contract)
- Structured payment records: `{ client_address, amount_POT, concept, timestamp, status }`
- Immutable — once recorded, entries cannot be modified or deleted
- Publicly verifiable on the Portaldot block explorer

### 🤖 AI Chat Assistant
- Conversational interface powered by GPT-4
- Receives your full on-chain history as context
- Answers questions like:
  - *"What's my total income from [client]?"*
  - *"Show me my busiest month this year"*
  - *"Write a professional income summary for a bank"*
  - *"Which payments are still pending?"*

### 📊 Dashboard
- Real-time POT balance and transaction status
- Payment history feed with client names, amounts, and dates
- Status indicators: Paid / Pending / Disputed

### 📄 Verifiable PDF Report
- One-click export of full payment history
- Includes: contract address, record hashes, date range, total volume
- Recipients can verify authenticity on-chain without trusting the PDF alone

---

## 🛠️ Installation & Setup

### Prerequisites
- Node.js 18+
- A Portaldot-compatible wallet (Polkadot.js extension)
- OpenAI API key

### Steps

1. **Clone the repo**
   ```bash
   git clone https://github.com/ErickAntoni0/ProofPay.git
   cd ProofPay
   ```

2. **Install frontend dependencies**
   ```bash
   cd frontend && npm install
   ```

3. **Configure environment**

   Create a `.env` file in `/frontend`:
   ```env
   VITE_OPENAI_API_KEY=your_key_here
   VITE_CONTRACT_ADDRESS=your_deployed_contract_address
   VITE_PORTALDOT_RPC=wss://your-portaldot-node
   ```

   > ⚠️ **Security note:** `VITE_` variables are bundled into the client and are publicly visible. For production, proxy all OpenAI calls through a backend server to protect your API key.

4. **Deploy the smart contract** *(optional — a testnet deployment is available)*
   ```bash
   cd contracts/proofpay
   cargo contract build
   cargo contract instantiate --constructor new --suri //Alice
   ```

5. **Run the app**
   ```bash
   cd frontend && npm run dev
   ```

---

## 🗺️ Roadmap

### MVP (Hackathon Scope)
- [x] ink! contract: `record_payment`, `get_payments`, `get_stats`
- [x] Wallet connection (Polkadot.js)
- [x] Payment recording form
- [x] Payment history dashboard
- [x] AI chat assistant with on-chain context
- [ ] PDF report export *(in progress)*

### Post-Hackathon
- [ ] Client-side portal (clients receive a link to verify a specific payment)
- [ ] Multi-currency support (USD-pegged stablecoin on Portaldot)
- [ ] Dispute resolution flow (on-chain flag + AI mediation summary)
- [ ] Credit score prototype based on payment history

---

## 🎯 Hackathon Compliance

| Requirement | Status |
|---|---|
| Built on Portaldot | ✅ |
| Uses POT as gas | ✅ |
| Runnable MVP | ✅ |
| Open Source Smart Contracts | ✅ |
| AI-Enhanced UX | ✅ |
| Solves a real problem | ✅ |

---

## 👨💻 Team

- **ErickAntoni0** — Full Stack Developer + Smart Contract Engineer

---

## 📄 License

MIT — see [LICENSE](./LICENSE) for details.
