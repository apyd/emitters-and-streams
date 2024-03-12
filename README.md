# Node mentoring program - module 3

## Task 1
Write your own EventEmitter class. It must contain on / addEventListener method, off / removeEventListener method, once method, emit method, rawListeners method, listenerCount method. Theses basic features are sufficient to implement a full system using the eventing model. Then test it with provided example of code.

## Task 2
Write a class WithTime which should extend EventEmitter implemented in the first task. WithTime should contain execute() method that will call async function with arguments specified and compute the time it takes to execute this async function. execute() function should emit event start, event end and event for the data received.

Async function should data from https://jsonplaceholder.typicode.com/posts/1 and transform it to JSON format.

## Task 3
Write a program which should do the following:

Read the content of CSV file from ./csv directory (example of data)
Use the csvtojson package to convert the data from CSV file to JSON format
Write the content of CSV file to a new TXT file in the following format
Do not load all the content of the CSV file into RAM via stream, read/write file content line by line
In case of read/write errors, log them in the console.
The program should be started via npm script using nodemon(i.e. npm run task3).

