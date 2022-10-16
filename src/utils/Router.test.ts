import { expect } from 'chai';
import Router from './Router';

const sinon = require('sinon');

// import sinon from 'sinon';

const router = new Router('.app')
describe('Router', () => {
  global.window.history.back = () => {
    if (typeof window.onpopstate === 'function') {
      window.onpopstate({ currentTarget: window } as unknown as PopStateEvent);
    }
  };
  global.window.history.forward = () => {
    if (typeof window.onpopstate === 'function') {
      window.onpopstate({ currentTarget: window } as unknown as PopStateEvent);
    }
  }
  const getContentFake = sinon.fake.returns(document.createElement('div'));

  class BlockMock {
    getContent = getContentFake;
  }
  describe('use()', () => {
    it('use() should return Router instance', () => {
      // @ts-ignore
      const result = router.use('/', BlockMock);
      expect(result).to.eq(router)
    });
  });
  describe('.back()', () => {
    it('should render a page on history back action', () => {
      router
      // @ts-ignore
        .use('/', BlockMock)
        .start();

      router.back();

      expect(getContentFake.callCount).to.eq(1);
    });
  });

  it('should render a page on start', () => {
    router
    // @ts-ignore
      .use('/', BlockMock)
      .start();

    expect(getContentFake.callCount).to.eq(1);
  });
})
