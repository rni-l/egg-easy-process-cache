'use strict';

const Cache = require('./app/utils');
const {
  CACHE_COVER, CACHE_UPDATE, CACHE_PUSH, CACHE_CLEAR, CACHE_UPDATE_BY_KEY, WORKER_READY, ALL_WORKER_READY, CACHE_REMOVE_BY_KEY,
} = require('./app/constant');

module.exports = agent => {
  const cache = new Cache(agent.config.easyProcessCache);
  const workers = agent.options.workers;
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

  agent.messenger.on(CACHE_UPDATE_BY_KEY, data => {
    cache.updateByKey(data);
    agent.messenger.sendToApp(CACHE_UPDATE, cache.store);
  });

  agent.messenger.on(CACHE_REMOVE_BY_KEY, data => {
    cache.removeByKey(data);
    agent.messenger.sendToApp(CACHE_UPDATE, cache.store);
  });

  agent.messenger.on(CACHE_CLEAR, () => {
    cache.clear();
  });
};

