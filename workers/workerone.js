const { workerData, parentPort, threadId } = require('worker_threads');

console.log('Hello from worker: ', threadId, workerData);
parentPort.on('message', (data) => {
  // Start a new ehavy task
  console.log(`Start a new task = [${JSON.stringify(data)}]`);
  const now = Date.now();
  const taskResult = { ...{}, ...data };

  // Do some heavy task
  taskResult.data = now - taskResult.data;
  console.log('sending task result from worker: ', threadId);
  parentPort.postMessage(taskResult);
});
