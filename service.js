const { workerData, parentPort } = require('worker_threads');

console.log(workerData);

parentPort.postMessage({ hello: workerData });
