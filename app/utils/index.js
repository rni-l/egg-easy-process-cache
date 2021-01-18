'use strict';

class Cache {
  constructor({ primaryKey, cacheField }) {
    this.primaryKey = primaryKey;
    this.cacheField = cacheField;
    this.store = [];
  }

  getValBayCacheField(data) {
    return Object.entries(data).reduce((acc, { key, value }) => {
      if (this.cacheField.includes(key)) {
        acc[key] = value;
      }
      return acc;
    }, {});
  }

  cover(data) {
    this.store = data.map(v => this.getValBayCacheField(v));
    this.log();
  }

  push(data) {
    this.store.push(this.getValBayCacheField(data));
    this.log();
  }

  removeByKey(key) {
    this.store = this.store.filter(v => v[this.primaryKey] !== key);
    this.log();
  }

  updateById(data) {
    const { primaryKey } = this;
    this.store = this.store.map(v => (v[primaryKey] === data[primaryKey] ? this.getValBayCacheField(v) : v));
    this.log();
  }

  clear() {
    this.store = [];
    this.log();
  }

  findByKeyParamter(keyParameter) {
    this.log();
    return this.store.find(v => v.keyParameter === keyParameter);
  }
}

module.exports = Cache;
