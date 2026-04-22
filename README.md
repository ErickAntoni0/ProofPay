# 🧠 AI Web3 Dashboard (Wallet)

A complete demonstration of integrating **Web3 + Smart Contracts + Artificial Intelligence** using React, Hardhat, Solidity, and OpenAI.

This project features a clean, GitHub Dark Mode inspired UI and includes a custom Landing Page.

---

## 📌 Features

- **Wallet Connection**: Seamless integration with MetaMask using `ethers.js`.
- **Smart Contract Interaction**: Deploy and interact with a custom Solidity contract on the Sepolia Testnet.
- **AI Insights**: Generate contextual AI analysis based on the user's on-chain activity using the OpenAI API.
- **GitHub Dark Mode Aesthetic**: A sleek, monochrome, premium UI.

---

## 🧱 Tech Stack

### Blockchain
- **Solidity**: Smart contract development.
- **Hardhat**: Ethereum development environment and deployment.
- **Network**: Sepolia Testnet.

### Frontend
- **React + Vite**: Fast and modern frontend framework.
- **ethers.js**: Web3 library for interacting with the Ethereum blockchain.
- **lucide-react**: Clean, consistent icon set.

### AI
- **OpenAI API**: For generating AI-driven user insights (includes a mock fallback for testing without an API key).

---

## 🛠️ Prerequisites

Before you begin, ensure you have the following installed:
- [Node.js](https://nodejs.org/en/) (v16 or higher)
- [MetaMask](https://metamask.io/) extension installed in your browser.
- Some **Sepolia ETH** in your wallet for paying transaction gas fees.
- (Optional) An [OpenAI API Key](https://platform.openai.com/).

---

## 🚀 Installation & Setup

### 1. Clone the repository
```bash
git clone https://github.com/ErickAntoni0/AI-WEB3-WALLET.git
cd AI-WEB3-WALLET
```

### 2. Smart Contract Setup (Root Directory)

Install Hardhat and dependencies:
```bash
npm install
```

Set up your environment variables:
```bash
cp .env.example .env
```
Edit the `.env` file in the root directory and add your credentials:
- `SEPOLIA_RPC_URL`: Your Alchemy or Infura RPC URL for Sepolia.
- `PRIVATE_KEY`: Your MetaMask wallet private key (used for deploying the contract).

Compile and deploy the contract:
```bash
npx hardhat compile
npx hardhat run scripts/deploy.js --network sepolia
```
*Note: Copy the deployed contract address output by this command, you will need it for the frontend.*

### 3. Frontend Setup

Navigate to the frontend directory:
```bash
cd frontend
npm install
```

Set up the frontend environment variables:
Create a `.env` file inside the `frontend` folder (`frontend/.env`) and add:
```env
# The address of the contract you just deployed
VITE_CONTRACT_ADDRESS="0xYourDeployedContractAddress"

# Optional: Your OpenAI API key (if left empty, a mock AI response will be used)
VITE_OPENAI_API_KEY="sk-..."
```

Run the development server:
```bash
npm run dev
```

### 4. Open the App
Visit [http://localhost:5173](http://localhost:5173) in your browser.
- You will see the main Landing Page.
- Click **Launch App** or **Get Started** to access the Dashboard.
- Connect your MetaMask wallet (ensure you are on the Sepolia network) to interact with the contract.

---

## 📝 License
This project is for educational and demonstration purposes.
