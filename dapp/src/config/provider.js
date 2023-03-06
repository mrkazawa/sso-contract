/**
 * information about where the ethereum network
 * is located.
 */
const ETH_HOSTNAME = "ganache";
const ETH_PORT = 8545;
const ETH_PROVIDER_URL = "ws://" + ETH_HOSTNAME + ":" + ETH_PORT;

module.exports = {
  ETH_HOSTNAME,
  ETH_PORT,
  ETH_PROVIDER_URL
}