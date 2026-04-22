const hre = require("hardhat");

async function main() {
  console.log("🚀 Desplegando contrato Demo en:", hre.network.name);

  const [deployer] = await hre.ethers.getSigners();
  console.log("👛 Deployer:", deployer.address);

  const balance = await hre.ethers.provider.getBalance(deployer.address);
  console.log("💰 Balance:", hre.ethers.formatEther(balance), "ETH");

  // Deploy
  const Demo = await hre.ethers.getContractFactory("Demo");
  const demo = await Demo.deploy();
  await demo.waitForDeployment();

  const address = await demo.getAddress();
  console.log("\n✅ Demo desplegado en:", address);
  console.log("\n📋 Agrega esto a tu .env del frontend:");
  console.log(`   VITE_CONTRACT_ADDRESS=${address}`);
  console.log("\n🔍 Verifica en Etherscan:");
  console.log(`   https://sepolia.etherscan.io/address/${address}`);
}

main().catch((error) => {
  console.error("❌ Error:", error);
  process.exitCode = 1;
});
