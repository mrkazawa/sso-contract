const web3 = require("../config/web3");
const factoryJson = require("../build/contracts/Factory.json");

let _factory, _factoryAddress;

const createFactoryContract = async () => {
  const networkId = await web3.eth.net.getId();
  _factoryAddress = factoryJson.networks[networkId].address;
  _factory = new web3.eth.Contract(factoryJson.abi, _factoryAddress);
}

const getFactoryContract = () => {
  return _factory;
}

const getFactoryContractAddress = () => {
  return _factoryAddress;
}

module.exports = {
  createFactoryContract,
  getFactoryContract,
  getFactoryContractAddress
}