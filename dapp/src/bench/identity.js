const web3 = require("../config/web3");
const identityJson = require("../build/contracts/Identity.json");

let _identity, _identityAddress;

const createIdentityContract = async () => {
  const networkId = await web3.eth.net.getId();
  _identityAddress = identityJson.networks[networkId].address;
  _identity = new web3.eth.Contract(identityJson.abi, _identityAddress);
}

const getIdentityContract = () => {
  return _identity;
}

const getIdentityContractAddress = () => {
  return _identityAddress;
}

const verify = async (hashedMessage, signatures) => {
  return await _identity.methods.verify(hashedMessage, signatures).call();
}

module.exports = {
  createIdentityContract,
  getIdentityContract,
  getIdentityContractAddress,
  verify
}