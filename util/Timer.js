class Timer {
  #timeRemaining;
  #onFinished;
  #description;
  constructor(time,description = "timer", onFinished = null, start = false) {
    this.#timeRemaining = time;
    this.#onFinished = onFinished;
    this.#description = description;
    if (start) this.startTimer();
  }

  #tick() {
    this.#timeRemaining--;
    if (this.#timeRemaining === 0) {
      if (this.#onFinished instanceof Function) {
        this.#onFinished(this);
      } else {
        process.stdout.write('\x07'); // play sound, doesn't work on my machine
      }
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

  get description() {
    return this.#description;
  }
}

module.exports = Timer;