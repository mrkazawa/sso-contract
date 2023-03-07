const Identity = artifacts.require("Identity");

const truffleAssert = require("truffle-assertions");

contract("Identity Contract", (accounts) => {
  //let registry, erc20, region;

  it("should deploy identity contract correctly", async () => {
    const threshold = 2;
    const keys = [];
    keys.push(accounts[1], accounts[2], accounts[3]);

    const identity = await Identity.new(threshold, keys);

    assert.equal(await identity.isKey(accounts[0]), false);
    assert.equal(await identity.isKey(accounts[1]), true);
    assert.equal(await identity.isKey(accounts[2]), true);
    assert.equal(await identity.isKey(accounts[3]), true);
    assert.equal(await identity.isKey(accounts[4]), false);
  });
});