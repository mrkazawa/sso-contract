const Factory = artifacts.require("Factory");
const Identity = artifacts.require("Identity");

const truffleAssert = require("truffle-assertions");

contract("Identity", (accounts) => {
  describe("About deployment", async () => {

    it("should deploy with correct params", async () => {
      const threshold = 2;
      const keys = [];
      keys.push(accounts[1], accounts[2], accounts[3]);
      const factory = await Factory.deployed();

      await truffleAssert.passes(Identity.new(factory.address, threshold, keys));
    });

    it("should reject deployment due to invalid zero keys", async () => {
      const threshold = 0;
      const keys = [];
      const factory = await Factory.deployed();

      await truffleAssert.reverts(
        Identity.new(factory.address, threshold, keys), "invalid number of keys"
      );
    });

    it("should reject deployment due to invalid zero threshold value", async () => {
      const threshold = 0;
      const keys = [];
      keys.push(accounts[1], accounts[2], accounts[3]);
      const factory = await Factory.deployed();

      await truffleAssert.reverts(
        Identity.new(factory.address, threshold, keys), "invalid threshold value"
      );
    });

    it("should reject deployment due to threshold value is more than number of keys", async () => {
      const threshold = 10;
      const keys = [];
      keys.push(accounts[1], accounts[2], accounts[3]);
      const factory = await Factory.deployed();

      await truffleAssert.reverts(
        Identity.new(factory.address, threshold, keys), "invalid threshold value"
      );
    });
  });

  describe("About registration to factory", async () => {
    const threshold = 2;
    const keys = [];
    keys.push(accounts[1], accounts[2], accounts[3], accounts[4]);

    let factory, instance;

    beforeEach(async () => {
      factory = await Factory.new();
      instance = await Identity.new(factory.address, threshold, keys);
    });

    it("should be able to register/deregister to/from factory contract", async () => {
      // register to factory
      const msg = "fresh self-generated otp from dapp";
      const hash = web3.utils.sha3(msg);

      const sigBytes = [];
      sigBytes.push(
        await web3.eth.sign(hash, keys[0]),
        await web3.eth.sign(hash, keys[1])
      );

      await truffleAssert.passes(instance.registerToFactory(hash, sigBytes));
      assert.equal(await factory.isIdentityContract(instance.address), true);

      // deregister from factory
      const msg2 = "another fresh self-generated otp from dapp";
      const hash2 = web3.utils.sha3(msg2);

      const sigBytes2 = [];
      sigBytes2.push(
        await web3.eth.sign(hash2, keys[2]),
        await web3.eth.sign(hash2, keys[3])
      );

      await truffleAssert.passes(instance.deregisterFromFactory(hash, sigBytes));
      assert.equal(await factory.isIdentityContract(instance.address), false);
    });
  });

  describe("About updating keys", async () => {
    const threshold = 2;
    const keys = [];
    keys.push(accounts[1], accounts[2], accounts[3], accounts[4]);

    let factory, instance;

    beforeEach(async () => {
      factory = await Factory.new();
      instance = await Identity.new(factory.address, threshold, keys);
    });

    it("should be able to add a mew key to the pool", async () => {
      const msg = "fresh self-generated otp from dapp";
      const hash = web3.utils.sha3(msg);

      const sigBytes = [];
      sigBytes.push(
        await web3.eth.sign(hash, keys[0]),
        await web3.eth.sign(hash, keys[1])
      );

      assert.equal(await instance.isKey(accounts[5]), false);

      const tx = await instance.addKey(accounts[5], hash, sigBytes);
      truffleAssert.eventEmitted(tx, "KeyAdded");

      assert.equal(await instance.isKey(accounts[5]), true);
    });

    it("should be able to delete a key from the pool", async () => {
      const msg = "fresh self-generated otp from dapp";
      const hash = web3.utils.sha3(msg);

      const sigBytes = [];
      sigBytes.push(
        await web3.eth.sign(hash, keys[0]),
        await web3.eth.sign(hash, keys[1])
      );

      assert.equal(await instance.isKey(keys[0]), true);

      const tx = await instance.deleteKey(keys[0], hash, sigBytes);
      truffleAssert.eventEmitted(tx, "KeyDeleted");

      assert.equal(await instance.isKey(keys[0]), false);
    });
  });
});