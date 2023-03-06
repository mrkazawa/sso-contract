const timeMachine = require("./time-machine");

describe("Time machine helper test", () => {
  beforeEach(async () => {
    snapshot = await timeMachine.takeSnapshot();
    snapshotId = snapshot['result'];
  });

  afterEach(async () => {
    await timeMachine.revertToSnapShot(snapshotId);
  });

  it("should advance the blockchain forward a block", async () => {
    const originalBlock = await web3.eth.getBlock('latest');
    const newBlock = await timeMachine.advanceBlock();

    assert.notEqual(originalBlock.hash, newBlock.hash);
  });

  it("should be able to advance time and block together", async () => {
    const advancement = 600;
    const originalBlock = await web3.eth.getBlock('latest');
    const newBlock = await timeMachine.advanceTimeAndBlock(advancement);
    const timeDiff = newBlock.timestamp - originalBlock.timestamp;

    assert.isTrue(timeDiff >= advancement);
  });
});