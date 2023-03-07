const Identity = artifacts.require("Identity");

const truffleAssert = require("truffle-assertions");

contract("Identity Contract", (accounts) => {
  const threshold = 1;
  const keys = [];
  keys.push(accounts[1], accounts[2], accounts[3]);

  let identity;

  beforeEach(async () => {
    identity = await Identity.new(threshold, keys);
  });

  it("should verify 1 signature correctly", async () => {
    

    /*assert.notEqual(web3.version, null);
    console.log(accounts[1]);

    const data = "testing";
    const sig = await web3.eth.sign(data, accounts[1])
    console.log(sig);
    const r = sig.slice(0, 66);
    const s = "0x" + sig.slice(66, 130);
    const v = parseInt(sig.slice(130, 132), 16);
    hashedData = await web3.utils.sha3(data);

    // r, s, v should be in array
    const rArr = [], sArr = [], vArr = [];
    rArr.push(r);
    sArr.push(s);
    vArr.push(v);
    // try simple method without array first

    const success = await identity.verifySignature(vArr, rArr, sArr, hashedData);
    assert.equal(success, true);*/
  });

  it("should verify 2 signatures correctly", async () => {

  });

  it("should verify 3 signatures correctly", async () => {
    
  });
});