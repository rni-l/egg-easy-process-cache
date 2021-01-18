'use strict';

class Cache {
  constructor({ primaryKey, cacheField }) {
    this.primaryKey = primaryKey;
    this.cacheField = cacheField;
    this.store = [];
  }

  getValBayCacheField(data) {
    return Object.entries(data).reduce((acc, [ key, value ]) => {
      if (this.cacheField.includes(key)) {
        acc[key] = value;
      }
      return acc;
    }, {});
  }

  cover(data) {
    this.store = data.map(v => this.getValBayCacheField(v));
  }

  push(data) {
    this.store.push(this.getValBayCacheField(data));
  }

  removeByKey(key) {
    this.store = this.store.filter(v => v[this.primaryKey] !== key);
  }

  updateByKey(data) {
    const { primaryKey } = this;
    this.store = this.store.map(v => (v[primaryKey] === data[primaryKey] ? {
      ...v,
      ...this.getValBayCacheField(data),
    } : v));
  }

  clear() {
    this.store = [];
  }

  find(key, val) {
    return this.store.find(v => v[key] === val);
  }
}

module.exports = Cache;
