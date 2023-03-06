const Factory = artifacts.require("Factory");
const Identity = artifacts.require("Identity");

const truffleAssert = require("truffle-assertions");

contract("Setup Contract Test", (accounts) => {
  //let registry, erc20, region;

  it("deploy factory contract", async () => {
    await truffleAssert.passes(await Factory.new());
  });

  it("deploy identity contract", async () => {
    await truffleAssert.passes(await Identity.new());
  });
});