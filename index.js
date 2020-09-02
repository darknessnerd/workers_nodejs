const { Worker, isMainThread } = require('worker_threads');
const { v4: uuidv4 } = require('uuid');

if (isMainThread) {
  console.log('this is the main thread');

  const workerone = new Worker('./workers/workerone.js', { workerData: { ping: Date.now() } });

  const stop = () => {
    console.log('Main process: stop()');
    // if the worker was terminated with worker.terminate(), the code would be 1.
    workerone.terminate();
    process.exit(0);
  };

  workerone.on('error', (err) => {
    console.log(err);
  });
  workerone.on('exit', (code) => {
    console.error(`Worker stopped with exit code ${code}`);
  });
  workerone.on('message', (data) => {
    console.log('recived result', JSON.stringify(data));
  });

  setInterval(() => workerone.postMessage({ type: 'task', uuid: uuidv4(), data: Date.now() }), 2000);

  process.on('SIGTERM', stop);
  process.on('SIGINT', stop);
}
