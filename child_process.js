const { spawn } = require('child_process');

const child = spawn('pwd');

child.on('exit', (code, signal) => {
  console.log(`child process exited with code ${code} and signal ${signal}`);
});
