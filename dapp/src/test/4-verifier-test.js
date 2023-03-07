const Verifier = artifacts.require("Verifier");

contract("Verifier Contract", (accounts) => {
  var signer = accounts[0];

  it("should be able to verify signature from bytes", async function () {
    var instance = await Verifier.deployed();
    var msg = "Hello World";
    var hash = web3.utils.sha3(msg);

    var signature = (await web3.eth.sign(hash, signer));

    var result = await instance.verifySignatureFromBytes(hash, signature, signer);
    assert.equal(result, true);
  });

  it("should be able to verify signature from VRS", async function () {
    var instance = await Verifier.deployed();
    var msg = "Hello World";
    var hash = web3.utils.sha3(msg);

    var sig = (await web3.eth.sign(hash, signer)).slice(2);

    var v = web3.utils.toDecimal(sig.slice(128, 130)) + 27;
    var r = `0x${sig.slice(0, 64)}`;
    var s = `0x${sig.slice(64, 128)}`;

    var result = await instance.verifySignatureFromVRS(hash, v, r, s, signer);
    assert.equal(result, true);
  });
});