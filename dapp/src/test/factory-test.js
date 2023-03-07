const Factory = artifacts.require("Factory");

const truffleAssert = require("truffle-assertions");

contract("Factory", (accounts) => {
  describe("About identities", async () => {

    it("should reject adding-identity request because caller is not contract", async () => {
      var instance = await Factory.deployed();

      await truffleAssert.reverts(
        instance.addIdentityContract({
          from: accounts[0]
        }), "only for contract"
      );
    });

    it("should reject deleting-identity request because caller is not contract", async () => {
      var instance = await Factory.deployed();

      await truffleAssert.reverts(
        instance.removeIdentityContract({
          from: accounts[0]
        }), "only for contract"
      );
    });
  });

  describe("About signatures", async () => {
    var signer = accounts[0];

    it("should be able to obtain correct signer from bytes", async () => {
      const instance = await Factory.deployed();
      const msg = "fresh otp from dapp";
      const hash = web3.utils.sha3(msg);
      const signature = (await web3.eth.sign(hash, signer));

      const obtainedSigner = await instance.recoverAddressFromBytes(hash, signature);
      assert.equal(signer, obtainedSigner);
    });

    it("should be able to obtain correct signer from vrs", async () => {
      const instance = await Factory.deployed();
      const msg = "fresh otp from dapp";
      const hash = web3.utils.sha3(msg);
      const sig = (await web3.eth.sign(hash, signer)).slice(2);

      const v = web3.utils.toDecimal(sig.slice(128, 130)) + 27;
      const r = `0x${sig.slice(0, 64)}`;
      const s = `0x${sig.slice(64, 128)}`;

      var obtainedSigner = await instance.recoverAddressFromVRS(hash, v, r, s);
      assert.equal(signer, obtainedSigner);
    });
  });
});