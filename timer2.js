const Timer = require('./util/Timer');

// stdin adapted from
// https://stackoverflow.com/questions/5006821/nodejs-how-to-read-keystrokes-from-stdin

const waitForInput = (handleKey) => {
  if (!(handleKey instanceof Function)) throw new Error('handleKey must be a function');
  const stdin = process.stdin;

  // without this, we would only get streams once enter is pressed
  stdin.setRawMode(true);

  // resume stdin in the parent process (node app won't quit all by itself
  // unless an error or process.exit() happens)
  stdin.resume();

  // i don't want binary, do you?
  stdin.setEncoding('utf8');

  // on any data into stdin
  stdin.on('data', function(key) {
    // call the handler
    const action = handleKey(key);
    if (!action) {
      process.exit();
    }
  });
};

console.log("Tiny Tim's Timer");
console.log("⏲️".repeat(25));
console.log("\tb: beep");
console.log("\t0-9: set a timer");
console.log("\tctrl+c or q to quit");
console.log("⏲️".repeat(25));
// start waiting for input
waitForInput((key) => {

  if (key === '\u0003' || key === 'q') { // ctrl+c or q
    process.stdout.write('Thanks for using me, ciao!\n');
    return false;
  }

  if (key === 'b') {
    process.stdout.write('\x07'); // play "beep"
    console.log('BEEP'); // show "BEEP" in console
  } else {
    // check if numeric
    const numKey = +key;
    if (!isNaN(numKey)) {
      console.log(`setting timer for ${key} seconds...`);
      // create a timer for the number of seconds
      new Timer(key, `${numKey}s timer`, (timer) =>{
        process.stdout.write('\x07'); // play "beep"
        console.log(`${timer.description}: BEEP!`);
      } ,true);

    }
  }

  return true;

});