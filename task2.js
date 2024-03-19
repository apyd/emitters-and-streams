import { EventEmitter } from './task1.js'

class WithTime extends EventEmitter {
  execute(asyncFunc, ...args) {
    const start = Date.now()
    this.emit('begin')
    asyncFunc(...args, (data) => {
      this.emit('data', data)
      const end = Date.now()
      this.emit('end')
      console.log(`Execution time: ${end - start}ms`)
    })
  }
}

const fetchFromUrl = async (url, cb) => {
  const response = await fetch(url);
  const data = await response.json();
  return cb(JSON.stringify(data))
}

const withTime = new WithTime();

withTime.on('begin', () => console.log('About to execute'));
withTime.on('end', () => console.log('Done with execute'));
withTime.on('data', (data) => console.log('Data received:', data))

withTime.execute(fetchFromUrl, 'https://jsonplaceholder.typicode.com/posts/1');

console.log(withTime.rawListeners("end"));