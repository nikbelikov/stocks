export default {
  getKey() {
    return new Date().getMilliseconds() * Math.random();
  },
}
