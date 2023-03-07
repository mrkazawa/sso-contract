const SafeMath = artifacts.require("SafeMath");
const Factory = artifacts.require("Factory");
const Identity = artifacts.require("Identity");
const Verifier = artifacts.require("Verifier");

module.exports = async function (deployer, network, accounts) {
  const admin = accounts[0];
  const threshold = 2;
  const keys = [];
  keys.push(accounts[1], accounts[2], accounts[3]);

  if (network == "development") {
    await deployer.deploy(SafeMath);

    await deployer.deploy(Factory, {
      from: admin
    });
    const factory = await Factory.deployed();

    await deployer.deploy(Identity, threshold, keys, {
      from: admin
    });
    const identity = await Identity.deployed();

    await deployer.deploy(Verifier);
  }
};