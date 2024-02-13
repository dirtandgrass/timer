const Timer = require('./timer.js');


const startTimers = function(args) {
  const timers = []; // hold the timer obj
  for (let time of args) { // loop through each arg
    time = +time; // converrt to number
    if (isNaN(time) || time < 0) {
      // show error message, but continue to next iteration
      console.log(`Could not set timer for ${time} seconds`);
      continue;
    }
    const t = new Timer(time); // create a new timer object
    timers.push(t);
    t.startTimer(); // start the timer

  }
  return timers;
};

const args = process.argv.slice(2); // get the command line arguments
const timers = startTimers(args);


// function to update console display, to show timer status
const updateDisplay = () => {
  let anyAlive = false;
  process.stdout.write(`\rTimers: `); // cr to beginning of line
  for (const timer of timers) {
    process.stdout.write(`${timer.timeRemaining}   `); // print time remaining
    if (timer.timeRemaining > 0) { // determine if any timer is still running
      anyAlive = true;
    }
  }

  // all timers are done, stop
  if (!anyAlive) {
    console.log('\nAll timers done');
    clearInterval(intervalId);
  }
};

if (timers.length === 0) { // no timers, end
  return;
}
// start display update
const intervalId = setInterval(updateDisplay,1000);
// show initial display
updateDisplay();
