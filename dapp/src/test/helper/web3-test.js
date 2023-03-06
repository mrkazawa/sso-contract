describe('Web3 integration test', function () {
  it('Should able to check web3 version', async () => {
    assert.notEqual(web3.version, null);
  });
});