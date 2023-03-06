// TODO: move this to global config folder
const window = 10 // timeslot window (in seconds)

const getCurrentTimeslot = () => {
  now = getCurrentTimestamp();
  return (now - (now % window));
}

const getCurrentTimestamp = () => {
  return Math.floor(new Date().getTime() / 1000);
}

module.exports = {
  getCurrentTimeslot,
  getCurrentTimestamp
}