const web3 = require("../config/web3");
const Identity = require("./identity");
const KeyConfig = require("../config/key");
const fs = require('fs');
const {
  ITERATION
} = require("./param");
const {
  performance
} = require('perf_hooks');

const runSigningBenchmark = async () => {
  console.log("Benchmarking Sign Case...");

  const threshold = KeyConfig.getThreshold();
  const keys = await KeyConfig.getKeys();

  for (let i = 0; i < ITERATION; i++) {
    const start = performance.now();

    const msg = "fresh otp from dapp";
    const hash = web3.utils.sha3(msg);
    const sigBytes = [];

    for (let j = 0; j < threshold; j++) {
      sigBytes.push(await web3.eth.sign(hash, keys[j]));
    }

    const end = performance.now();
    const elapsed = end - start;
    fs.appendFileSync(`./sign.csv`, elapsed.toString() + "\r\n");
  }

  console.log("Done");
}

const runVerifyingBenchmark = async () => {
  console.log("Benchmarking Verify Case...");

  await Identity.createIdentityContract();

  const threshold = KeyConfig.getThreshold();
  const keys = await KeyConfig.getKeys();

  const msg = "fresh otp from dapp";
  const hash = web3.utils.sha3(msg);
  const sigBytes = [];

  for (let j = 0; j < threshold; j++) {
    sigBytes.push(await web3.eth.sign(hash, keys[j]));
  }

  for (let i = 0; i < ITERATION; i++) {
    const start = performance.now();

    const result = await Identity.verify(hash, sigBytes);
    if (!result) {
      throw Error("invalid signature");
    }

    const end = performance.now();
    const elapsed = end - start;
    fs.appendFileSync(`./verify.csv`, elapsed.toString() + "\r\n");
  }

  console.log("Done");
}

const run = async () => {
  await runSigningBenchmark();
  await runVerifyingBenchmark();
  process.exit(0);
}

run();