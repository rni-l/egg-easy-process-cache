'use strict';

const { CACHE_UPDATE, CACHE_CLEAR, WORKER_READY } = require('./app/constant');

module.exports = class App {
  constructor(app) {
    this.app = app;
    this.initProcessCache();
  }

  async initProcessCache() {
    const app = this.app;
    const ctx = await app.createAnonymousContext();
    app.messenger.once('egg-ready', () => {
      app.messenger.sendToAgent(WORKER_READY, {});
    });
    app.messenger.on(CACHE_UPDATE, async data => {
      ctx.getProcessCache().cover(data);
    });
    app.messenger.on(CACHE_CLEAR, async () => {
      ctx.getProcessCache().clear();
    });
  }
};
