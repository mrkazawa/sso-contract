const SafeMath = artifacts.require("SafeMath");
const Factory = artifacts.require("Factory");
const Identity = artifacts.require("Identity");
const Verifier = artifacts.require("Verifier");

const KeyConfig = require("../config/key");

module.exports = async function (deployer, network, accounts) {
  const admin = accounts[0];
  const threshold = KeyConfig.getThreshold();
  const keys = await KeyConfig.getKeys(threshold);

  if (network == "development") {
    await deployer.deploy(SafeMath);

    await deployer.deploy(Factory);
    const factory = await Factory.deployed();

    await deployer.deploy(Identity, factory.address, threshold, keys, {
      from: admin
    });
    const identity = await Identity.deployed();

    await deployer.deploy(Verifier);
  }
};