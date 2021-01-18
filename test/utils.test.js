'use strict';

const Cache = require('../app/utils');
const assert = require('assert');

const mockObj = {
  id: '1',
  link: '2',
  keyParameter: '3',
};

const mockObj2 = {
  id: '12',
  link: '22',
  keyParameter: '32',
};

describe('service/qrcode/cache', () => {
  let cache;
  beforeEach(() => {
    cache = new Cache({
      primaryKey: 'id',
      cacheField: [
        'id',
        'link',
        'keyParameter',
      ],
    });
  });

  it('触发 cover 方法，重设 store 字段', () => {
    assert(cache.store.length === 0);
    cache.cover([ mockObj ]);
    assert(cache.store[0].id === mockObj.id);
    assert(cache.store[0].link === mockObj.link);
    assert(cache.store[0].keyParameter === mockObj.keyParameter);
  });

  it('触发 push 方法，添加数据到 store', () => {
    cache.push(mockObj);
    cache.push(mockObj);
    assert(cache.store[0].id === mockObj.id);
    assert(cache.store[0].link === mockObj.link);
    assert(cache.store[0].keyParameter === mockObj.keyParameter);
    assert(cache.store[1].id === mockObj.id);
    assert(cache.store[1].link === mockObj.link);
    assert(cache.store[1].keyParameter === mockObj.keyParameter);
  });

  it('触发 removeByKey 方法，移除匹配到 id 的那条记录', () => {
    cache.cover([ mockObj, mockObj2 ]);
    cache.removeByKey(mockObj.id);
    assert(cache.store.length === 1);
    assert(cache.store[0].id === mockObj2.id);
    assert(cache.store[0].link === mockObj2.link);
    assert(cache.store[0].keyParameter === mockObj2.keyParameter);
  });

  it('触发 updateByKey 方法，更新匹配到 id 的那条记录的 link 字段，keyParameter 不变', () => {
    cache.cover([ mockObj, mockObj2 ]);
    cache.updateByKey({
      id: mockObj.id,
      link: mockObj2.link,
    });
    assert(cache.store.length === 2);
    assert(cache.store[0].id === mockObj.id);
    assert(cache.store[0].link === mockObj2.link);
    assert(cache.store[0].keyParameter === mockObj.keyParameter);
  });

  it('触发 clear 方法，清空 store 数据', () => {
    cache.cover([ mockObj, mockObj2 ]);
    cache.clear();
    assert(cache.store.length === 0);
  });

  it('触发 find 方法，传入空字符串，返回 undefined', () => {
    assert(cache.find('keyParameter', '') === undefined);
  });

  it('触发 find 方法，传入不匹配的字符串，返回 undefined', () => {
    cache.cover([ mockObj, mockObj2 ]);
    assert(cache.find('keyParameter', 'xcvcxv') === undefined);
  });

  it('触发 find 方法，传入匹配的字符串，返回对应的对象', () => {
    cache.cover([ mockObj, mockObj2 ]);
    const obj = cache.find('keyParameter', mockObj2.keyParameter);
    assert(obj && obj.link === mockObj2.link);
  });
});
