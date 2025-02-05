export default class Stopwatch {
  constructor() {
    this.startTime = null;
    this.isRunning = false;
  }

  start() {
    if (this.isRunning) {
      throw new Error("Stopwatch is already running");
    }
    this.startTime = Date.now();
    this.isRunning = true;
  }

  getElapsedTime() {
    if (!this.isRunning) {
      throw new Error("Stopwatch is not running");
    }
    return Date.now() - this.startTime;
  }

  restart() {
    this.stop();
    this.start();
  }

  stop() {
    // if (!this.isRunning) {
    //   throw new Error("Stopwatch is not running");
    // }
    this.isRunning = false;
  }

  formatTime(ms) {
    const seconds = ms / 1000;
    return seconds.toFixed(1);
  }
}
