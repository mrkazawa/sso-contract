const getProfile = () => {
  return {
    "Off": 0,
    "Moderate": 1,
    "Aggresive": 2
  };
}

const getDensity = () => {
  return {
    "OffPeak": 0,
    "Normal": 1,
    "Peak": 2
  };
}

const EMPTY_BYTES32 = "0x0000000000000000000000000000000000000000000000000000000000000000";
const EMPTY_INT256 = 0

module.exports = {
  EMPTY_BYTES32,
  EMPTY_INT256,
  getProfile,
  getDensity
}