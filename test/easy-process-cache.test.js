'use strict';

const mock = require('egg-mock');

describe('test/easy-process-cache.test.js', () => {
  let app;
  before(() => {
    app = mock.app({
      baseDir: 'apps/easy-process-cache-test',
    });
    return app.ready();
  });

  after(() => app.close());
  afterEach(mock.restore);

  it('should GET /', () => {
    return app.httpRequest()
      .get('/')
      .expect('hi, easyProcessCache')
      .expect(200);
  });
});
