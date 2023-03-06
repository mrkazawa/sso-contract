const Web3 = require("web3");
const {
  ETH_PROVIDER_URL
} = require("./provider");

const web3 = new Web3(new Web3.providers.WebsocketProvider(ETH_PROVIDER_URL));

module.exports = web3;