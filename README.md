# egg-easy-process-cache

[![NPM version][npm-image]][npm-url]
[![build status][travis-image]][travis-url]
[![Test coverage][codecov-image]][codecov-url]
[![David deps][david-image]][david-url]
[![Known Vulnerabilities][snyk-image]][snyk-url]
[![npm download][download-image]][download-url]

[npm-image]: https://img.shields.io/npm/v/egg-easy-process-cache.svg?style=flat-square
[npm-url]: https://npmjs.org/package/egg-easy-process-cache
[codecov-image]: https://img.shields.io/codecov/c/github/eggjs/egg-easy-process-cache.svg?style=flat-square
[codecov-url]: https://codecov.io/github/eggjs/egg-easy-process-cache?branch=master
[snyk-image]: https://snyk.io/test/npm/egg-easy-process-cache/badge.svg?style=flat-square
[snyk-url]: https://snyk.io/test/npm/egg-easy-process-cache
[download-image]: https://img.shields.io/npm/dm/egg-easy-process-cache.svg?style=flat-square
[download-url]: https://npmjs.org/package/egg-easy-process-cache

<!--
Description here.
-->

## 依赖说明

### 依赖的 egg 版本

egg-easy-process-cache 版本 | egg 2.x
--- | ---
2.x | 😁
0.x | ❌



## 开启插件

```js
// config/plugin.js
exports.easyProcessCache = {
  enable: true,
  package: 'egg-easy-process-cache',
};
```

## 使用场景

- 我在一些小型项目中，经常用到一些少量的数据，但又不想搭 redis，而且部署在生产的 Egg 项目是多进程模式的，所以缓存逻辑稍微复杂点，所以封装了该库，方便使用
- 优点
  - 不依赖其他的库，实现 Egg 的多进程缓存
- 缺点
  - 每个进程都有一份缓存，所以缓存的数据量只能少



在 `app.js` 中

```javascript
export default class App {
  constructor(app) {
    this.app = app;
    this.init();
  }

  async init() {
    const { app } = this;
    const ctx = await this.app.createAnonymousContext();
    app.messenger.on(ctx.getProcessCacheEvent.ALL_WORKER_READY, async () => {
      // 监听了 ALL_WORKER_READY 事件，当所有子进程都准备好之后，你可以在这回调进行初始化数据
      // 该回调只会随机被某个子进程触发，而不是全部子进程都触发
      await ctx.service.qrcode.index.initStoreData();
    });
  }
}

```

更新缓存数据

```javascript
function test() {
  // 当你要更新数据的时候，通知给 agent，并把数据带过去就行了
  // agent 会再通知全部子进程进行更新
  this.ctx.app.messenger.sendToAgent(this.ctx.getProcessCacheEvent.CACHE_COVER, data)
}
```





## 详细配置

config

```javascript
config.easyProcessCache = {
    primaryKey: 'id',
    cacheField: [
      'id',
      'link'
    ], // 缓存的字段，不传就缓存全部
  };
```



## Api

我在上下文添加了两个变量：

```javascript
function test() {
  this.ctx.getProcessCache() // 返回缓存对象
  this.ctx.getProcessCacheEvent = {
    CACHE_COVER,
    CACHE_UPDATE,
    CACHE_PUSH,
    CACHE_CLEAR,
    CACHE_UPDATE_BY_KEY,
    WORKER_READY,
    ALL_WORKER_READY,
  } // getProcessCacheEvent 缓存了各个触发的事件
}
```

Cache 对象方法

| 方法名      | 参数                    | 返回                | 说明                                 |
| ----------- | ----------------------- | ------------------- | ------------------------------------ |
| cover       | data: Array             | -                   | 覆盖缓存的数据                       |
| push        | data: Object            | -                   | 插入数据                             |
| removeByKey | val: any                | -                   | 根据该值和 primaryKey 移除对应的对象 |
| updateByKey | data: Object            | -                   | 根据 primaryKey 更新对象的值         |
| clear       | -                       | -                   | 清空缓存数据                         |
| find        | (key: string, val: any) | Object \| undefined | 根据 key 和值查找对象                |

不建议通过 Cache 对象去更新缓存数据。要修改 Cache 对象的值，要用事件通知 agent 进行更新

预设的 agent 事件

| 事件名              | 参数         | 说明                 |
| ------------------- | ------------ | -------------------- |
| CACHE_COVER         | data: Array  | 通知覆盖缓存数据     |
| CACHE_PUSH          | data: Object | 通知插入缓存数据     |
| CACHE_UPDATE_BY_KEY | data: Object | 通知更新某个缓存数据 |
| CACHE_REMOVE_BY_KEY | data: any    | 通知移除某个数据     |
| CACHE_CLEAR         | -            | 通知清空缓存数据     |

上面的通知，都是先更新 agent 进程的缓存数据，然后 agent 进程再通知其他子进程进行全覆盖操作



## 单元测试

<!-- 描述如何在单元测试中使用此插件，例如 schedule 如何触发。无则省略。-->

## 提问交流

请到 [egg issues](https://github.com/eggjs/egg/issues) 异步交流。

## License

[MIT](LICENSE)
