const Factory = artifacts.require("Factory");
const Identity = artifacts.require("Identity");
const KeyConfig = require("../../config/key");

const truffleAssert = require("truffle-assertions");

contract("Identity (Gas Test)", (accounts) => {
  describe("About deployment", async () => {
    it("should deploy correctly", async () => {
      const factory = await Factory.deployed();

      const threshold = KeyConfig.getThreshold();
      const keys = await KeyConfig.getKeys(threshold);

      await truffleAssert.passes(Identity.new(factory.address, threshold, keys));
    });
  });

  describe("About registering identity", async () => {
    let threshold, keys, factory, instance;

    beforeEach(async () => {
      threshold = KeyConfig.getThreshold();
      keys = await KeyConfig.getKeys(threshold);

      factory = await Factory.deployed();
      instance = await Identity.new(factory.address, threshold, keys);
    });

    it("should register correctly", async () => {
      const msg = "fresh otp from dapp";
      const hash = web3.utils.sha3(msg);
      const sigBytes = [];
      for (let i = 0; i < threshold; i++) {
        sigBytes.push(await web3.eth.sign(hash, keys[i]));
      }

      assert.equal(await factory.isIdentityContract(instance.address), false);

      await truffleAssert.passes(instance.registerToFactory(hash, sigBytes));

      assert.equal(await factory.isIdentityContract(instance.address), true);      
    });
  });

  describe("About deregistering identity", async () => {
    let threshold, keys, factory, instance;

    beforeEach(async () => {
      threshold = KeyConfig.getThreshold();
      keys = await KeyConfig.getKeys(threshold);

      factory = await Factory.deployed();
      instance = await Identity.new(factory.address, threshold, keys);

      const msg = "fresh otp from dapp";
      const hash = web3.utils.sha3(msg);
      const sigBytes = [];
      for (let i = 0; i < threshold; i++) {
        sigBytes.push(await web3.eth.sign(hash, keys[i]));
      }

      await instance.registerToFactory(hash, sigBytes);
    });

    it("should deregister correctly", async () => {
      const msg = "another fresh otp from dapp";
      const hash = web3.utils.sha3(msg);
      const sigBytes = [];
      for (let i = 0; i < threshold; i++) {
        sigBytes.push(await web3.eth.sign(hash, keys[i]));
      }

      assert.equal(await factory.isIdentityContract(instance.address), true);

      await truffleAssert.passes(instance.deregisterFromFactory(hash, sigBytes));

      assert.equal(await factory.isIdentityContract(instance.address), false);      
    });
  });

  describe("About adding key", async () => {
    it("should add key correctly", async () => {
      const instance = await Identity.deployed();

      const threshold = KeyConfig.getThreshold();
      const keys = await KeyConfig.getKeys(threshold);

      const msg = "fresh otp from dapp";
      const hash = web3.utils.sha3(msg);
      const sigBytes = [];
      for (let i = 0; i < threshold; i++) {
        sigBytes.push(await web3.eth.sign(hash, keys[i]));
      }

      const newKey = accounts[threshold];
      assert.equal(await instance.isKey(newKey), false);

      const tx = await instance.addKey(newKey, hash, sigBytes);
      truffleAssert.eventEmitted(tx, "KeyAdded");

      assert.equal(await instance.isKey(newKey), true);
    });
  });

  describe("About deleting key", async () => {
    it("should delete key correctly", async () => {
      const instance = await Identity.deployed();

      const threshold = KeyConfig.getThreshold();
      const keys = await KeyConfig.getKeys(threshold);
      
      const msg = "fresh otp from dapp";
      const hash = web3.utils.sha3(msg);
      const sigBytes = [];
      for (let i = 0; i < threshold; i++) {
        sigBytes.push(await web3.eth.sign(hash, keys[i]));
      }

      assert.equal(await instance.isKey(keys[0]), true);

      const tx = await instance.deleteKey(keys[0], hash, sigBytes);
      truffleAssert.eventEmitted(tx, "KeyDeleted");

      assert.equal(await instance.isKey(keys[0]), false);
    });
  });
});