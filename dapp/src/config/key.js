const web3 = require("./web3");

const getThreshold = () => {
  return 2;
}

const getKeys = async (threshold) => {
  const accounts = await web3.eth.getAccounts();
  const keys = [];
  for (let i = 0; i < threshold; i++) {
    keys.push(accounts[i]);
  }
  return keys;
}

module.exports = {
  getThreshold,
  getKeys
}