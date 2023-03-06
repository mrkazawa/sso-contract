const SafeMath = artifacts.require("SafeMath");
const Factory = artifacts.require("Factory");
const Identity = artifacts.require("Identity");

module.exports = async function (deployer, network, accounts) {
  const admin = accounts[0];

  if (network == "development") {
    await deployer.deploy(SafeMath);

    await deployer.deploy(Factory, {
      from: admin
    });
    const factory = await Factory.deployed();

    await deployer.deploy(Identity, {
      from: admin
    });
    const identity = await Identity.deployed();
  }
};