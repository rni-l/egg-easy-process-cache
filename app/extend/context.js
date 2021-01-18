'use strict';
const {
  CACHE_COVER, CACHE_UPDATE, CACHE_PUSH, CACHE_CLEAR, CACHE_UPDATE_BY_KEY, WORKER_READY, ALL_WORKER_READY,
} = require('../constant');
const Cache = require('../utils');
let cache;

exports.getProcessCache = function() {
  if (!cache) {
    cache = new Cache(this.app.config.easyProcessCache);
  }
  return cache;
};

exports.getProcessCacheEvent = {
  CACHE_COVER,
  CACHE_UPDATE,
  CACHE_PUSH,
  CACHE_CLEAR,
  CACHE_UPDATE_BY_KEY,
  WORKER_READY,
  ALL_WORKER_READY,
};
