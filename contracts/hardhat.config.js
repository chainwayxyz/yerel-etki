require('@openzeppelin/hardhat-upgrades');
require("@nomicfoundation/hardhat-toolbox");

// The next line is part of the sample project, you don't need it in your
// project. It imports a Hardhat task definition, that can be used for
// testing the frontend.
// require("./tasks/faucet");

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: "0.8.7",
  networks: {
    subnet: {
      chainId: 90,
      url: "http://127.0.0.1:9650/ext/bc/nrdK64Xks6hrDHpahY4sHEy6TaBRuhpYecURTbeuvoBmkybkd/rpc",
      accounts: [
        process.env.PRIVATE_KEY
      ]
    },
    hardhat: {
      chainId: 1337 // We set 1337 to make interacting with MetaMask simpler
    }
  }
};
