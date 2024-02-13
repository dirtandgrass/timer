class Timer {
  #timeRemaining;
  constructor(time) {
    this.#timeRemaining = time;
  }

  #tick() {
    this.#timeRemaining--;
    if (this.#timeRemaining === 0) {
      process.stdout.write('\x07'); // play sound, doesn't work on my machine
    } else {
      setTimeout(this.#tick.bind(this), 1000);
    }
  }

  startTimer() {
    setTimeout(this.#tick.bind(this), 1000); // could probably use setInterval, but assignment said setTimeout
  }

  get timeRemaining() {
    return this.#timeRemaining;
  }
}

module.exports = Timer;