'use strict';

/**
 * egg-easy-process-cache default config
 * @member Config#easyProcessCache
 * @property {String} SOME_KEY - some description
 */
exports.easyProcessCache = {
  primaryKey: 'id',
  cacheField: [], // 缓存的字段，不传就缓存全部
};
