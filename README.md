# How to implement Worker Threads In Node.js

In this repository, we will see how we can use the worker threads.
After the release of Node.js v10.5.0, worker threads are avaible in the Node.js module.

What are the worker threads? Why we need it in Node.js ? 

## Under the hood of Node.js

Before understand the worker threads are working, it's necessary to understand how Node.js work 
under the hood.
Node.js is an open-source and cross-platform JavaScript runtime environment. 
Node.js runs the V8 JavaScript engine, the core of Google Chrome, outside of the browser. 
This allows Node.js to be very performant.
When a Node.js process is executed, it runs: 

* One process:  a process is a global object that can be accessed anywhere and has information 
               about what’s being executed at a time.
* One Thread:   being single-threaded means that only one set of instructions is executed at a time in 
                a given process.
* One event loop:   this is one of the most important aspects to understand about Node. 
                    It’s what allows Node to be asynchronous and have non-blocking I/O, — despite the fact that J
                    avaScript is single-threaded — by offloading operations to the system kernel whenever possible 
                    through callbacks, promises and async/await.
* One JS Engine Instance:   this is a computer program that executes JavaScript code.
* One Node.js Instance: the computer program that executes Node.js code.



In other words, Node runs on a single thread, and there is just one process happening at a time in 
the event loop. One code, one execution, (the code is not executed in parallel). 
This is very useful because it simplifies how you use JavaScript without worrying about concurrency
issues.

The reason it was built with that approach is that JavaScript was initially created for client-side
interactions (like web page interactions, or form validation) ( nothing that required the complexity
 of multithreading ).

But, as with all things, there is a downside: if you have CPU-intensive code, like complex 
calculations in a large dataset taking place in-memory, it can block other processes from being 
executed. 
Similarly, If you are making a request to a server that has CPU-intensive code, that code can block
 the event loop and prevent other requests of being handled.

A function is considered “blocking” if the main event loop must wait until it has finished executing
 the next command. A “Non-blocking” function will allow the main event loop to continue as soon as 
 it begins and typically alerts the main loop once it has finished by calling a “callback”.

> The golden rule:
> 
> don’t block the event loop, try to keep it running it and pay attention and avoid
> anything that could block the thread like synchronous network calls or infinite loops.

It’s important to differentiate between CPU operations and I/O (input/output) operations. 
As mentioned earlier, the code of Node.js is NOT executed in parallel. Only I/O operations are run 
in parallel, because they are executed asynchronously.

But, you can ask me, Node.js already handles everything with a single thread. 
then, why do we need Worker Threads in Node.js?

Actually, there are some situations where Node.js Single Thread doesn’t perform well. 
One of them is CPU Intensive Task.

CPU Intensive tasks are the one that blocks the main thread. when it happens, we can’t perform
anything else in the application.


## Possible Solutions

### Child Process

To solve the problem of blocking the main thread in Node.js, we can use the concept of child process
 in Node.js

### Worker Threads
Worker Threads can solve the problem of running CPU Intensive Tasks.

Worker Threads run in the same process. So, it will not lose the context of the process and No need to share Memory.
there are already solutions for CPU intensive operations: multiple processes (like cluster API) that
 make sure that the CPU is optimally used.

This approach is advantageous because it allows isolation of processes, so if something goes
wrong in one process, it doesn’t affect the others. They also have stability and identical APIs.
However, this means sacrificing shared memory, and the communication of data must be via JSON.

So Worker Threads will not help much with I/O-intensive work because asynchronous I/O operations 
are more efficient than Workers can be. The main goal of Workers is to improve the performance on 
CPU-intensive operations not I/O operations.

## Child process vs Worker Threads

Child process: for each instance of a child_process we have 1 event loop 1 thread and 1 process
worker_thread:  1 Process ( overall ) and for each istance of a worker thread we have 
                1 thread
                1 Event Loop per thread
                
Since worker_threads makes new threads inside the same process it requires less resources. Also we are able to pass data between these threads because they have the shared memory space.
As of January 2020 worker_threads are fully supported in the Node LST version 12. I highly recommend reading up on node.js multi threading in the official page.
