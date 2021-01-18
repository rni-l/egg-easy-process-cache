'use strict';

const Cache = require('./app/utils');
const {
  CACHE_COVER, CACHE_UPDATE, CACHE_PUSH, CACHE_CLEAR, CACHE_UPDATE_BY_ID, WORKER_READY, ALL_WORKER_READY,
} = require('./app/constant');

module.exports = agent => {
  const { primaryKey, cacheField } = agent.config.easyProcessCache;
  const cache = new Cache(primaryKey, cacheField);
  const workers = agent.options.workers;
  console.log('workers:', workers);
  let readyWorkers = 0;
  agent.messenger.on(WORKER_READY, () => {
    readyWorkers++;
    if (readyWorkers === workers) {
      agent.logger.info('============ all worker ready ===============');
      agent.messenger.sendRandom(ALL_WORKER_READY, {});
    }
  });

  agent.messenger.on(CACHE_COVER, data => {
    cache.cover(data);
    agent.messenger.sendToApp(CACHE_UPDATE, cache.store);
  });

  agent.messenger.on(CACHE_PUSH, data => {
    cache.push(data);
    agent.messenger.sendToApp(CACHE_UPDATE, cache.store);
  });

  agent.messenger.on(CACHE_UPDATE_BY_ID, data => {
    cache.updateById(data);
    agent.messenger.sendToApp(CACHE_UPDATE, cache.store);
  });

  agent.messenger.on(CACHE_CLEAR, () => {
    cache.clear();
  });
};

