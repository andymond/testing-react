class LocalStorage {
  constructor() {
    this.store = {}
  }

  getItem(key) {
    return this.store[key]
  }

  setItem(key, item) {
    this.store[key] = item
  }

  clear() {
    this.store = {}
  }
}

global.localStorage = new LocalStorage;
