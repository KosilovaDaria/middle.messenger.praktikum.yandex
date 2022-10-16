// eslint-disable-next-line max-classes-per-file
import { expect } from 'chai';
import type BlockType from './Block';

const sinon = require('sinon');
const proxyquire = require('proxyquire');

// console.log(sinon)
const eventBusMock = {
  on: sinon.fake(),
  emit: sinon.fake(),
}

const { default: Block } = proxyquire('./Block', {
  './EventBus': {
    default: class {
      emit = eventBusMock.emit;
      on = eventBusMock.on;
    },
  },
}) as { default: typeof BlockType };

describe('Block', () => {
  class ComponentMock extends Block {}

  it('should fire init event on initialization', () => {
    // eslint-disable-next-line no-new
    new ComponentMock({});

    expect(eventBusMock.emit.calledWith('init')).to.eq(true);
  });
});
