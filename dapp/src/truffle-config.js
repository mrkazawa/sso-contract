const {
  ETH_HOSTNAME,
  ETH_PORT
} = require('./config/provider');

module.exports = {
  networks: {
    development: {
      host: ETH_HOSTNAME,
      port: ETH_PORT,
      network_id: '*',
    },
  },
  mocha: {
    timeout: 10000,
    slow: 1000,
    reporter: 'eth-gas-reporter',
    reporterOptions : {
      showTimeSpent: true,
      excludeContracts : ['Migrations', 'MockContract', 'Imports']
    }
  },
  compilers: {
    solc: {
      version: '0.6.12',
    }
  },
  plugins: [
    'truffle-contract-size'
  ]
}