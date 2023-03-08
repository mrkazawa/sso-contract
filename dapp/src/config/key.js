const web3 = require("./web3");

const getThreshold = () => {
  return 1;
}

const getKeys = async () => {
  const accounts = await web3.eth.getAccounts();
  return [
    accounts[0],
    accounts[1],
    accounts[2],
    accounts[4],
    accounts[5],
    accounts[6],
    accounts[7],
    accounts[8],
    accounts[9]
  ];
}

module.exports = {
  getThreshold,
  getKeys
}