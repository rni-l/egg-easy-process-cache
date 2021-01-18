'use strict';
const {
  CACHE_COVER, CACHE_UPDATE, CACHE_PUSH, CACHE_CLEAR, CACHE_UPDATE_BY_ID,
} = require('../constant');
const Cache = require('../utils');
let cache;

exports.getProcessCache = function() {
  if (!cache) {
    const { primaryKey, cacheField } = this.ctx.app.config.easyProcessCache;
    cache = new Cache(primaryKey, cacheField);
  }
  return cache;
};

exports.getProcessCacheEvent = {
  CACHE_COVER,
  CACHE_UPDATE,
  CACHE_PUSH,
  CACHE_CLEAR,
  CACHE_UPDATE_BY_ID,
};
