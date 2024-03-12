class EventEmitter {
  constructor() {
    this.events = new Map()
  }

  #checkEventExists(eventName) {
    if (!this.events.has(eventName)) {
      return false
    }
    return true
  }

  #addListenerToEvent(eventName, fn) {
    if (!this.events.has(eventName)) {
      this.events.set(eventName, [])
    }
    this.events.get(eventName).push(fn)
  }

  addListener(eventName, fn) {
    this.#addListenerToEvent(eventName, fn)
    return this
  }
  on(eventName, fn) {
    return this.addListener(eventName, fn)
  }
  removeListener(eventName, fn) {
    if(this.#checkEventExists(eventName)) {
      const callbacks = this.events.get(eventName).filter(callback => callback !== fn)
      this.events.set(eventName, callbacks)
    } 
    return this
  }
  off(eventName, fn) {
    this.removeListener(eventName, fn)
    return this
  }
  once(eventName, fn) {
    const fnWrapper = () => {
      fn();
      this.removeListener(eventName, fnWrapper)
    }
    this.addListener(eventName, fnWrapper)
    return this
  }
  emit(eventName, ...args) {
    if(this.#checkEventExists(eventName)) {
      this.events.get(eventName).forEach(fn => fn(...args))
    }
    return this
  }
  listenerCount(eventName) {
    if(this.#checkEventExists(eventName)) {
      return this.events.get(eventName).length
    }
    return 0
  }
  rawListeners(eventName) {
    if(this.#checkEventExists(eventName)) {
      return this.events.get(eventName)
    }
    return []
  }
}

// ----------------- Provided code to check task 1 -----------------

const myEmitter = new EventEmitter();

function c1() {
  console.log('an event occurred!');
}

function c2() {
  console.log('yet another event occurred!');
}

myEmitter.on('eventOne', c1); // Register for eventOne
myEmitter.on('eventOne', c2); // Register for eventOne

// Register eventOnce for one time execution
myEmitter.once('eventOnce', () => console.log('eventOnce once fired'));
myEmitter.once('init', () => console.log('init once fired'));

// Register for 'status' event with parameters
myEmitter.on('status', (code, msg)=> console.log(`Got ${code} and ${msg}`));


myEmitter.emit('eventOne');

// Emit 'eventOnce' -> After this the eventOnce will be
// removed/unregistered automatically
myEmitter.emit('eventOnce');


myEmitter.emit('eventOne');
myEmitter.emit('init');
myEmitter.emit('init'); // Will not be fired
myEmitter.emit('eventOne');
myEmitter.emit('status', 200, 'ok');

// Get listener's count
console.log(myEmitter.listenerCount('eventOne'));

// Get array of rawListeners//
// Event registered with 'once()' will not be available here after the
// emit has been called
console.log(myEmitter.rawListeners('eventOne'));

// Get listener's count after remove one or all listeners of 'eventOne'
myEmitter.off('eventOne', c1);
console.log(myEmitter.listenerCount('eventOne'));
myEmitter.off('eventOne', c2);
console.log(myEmitter.listenerCount('eventOne'));