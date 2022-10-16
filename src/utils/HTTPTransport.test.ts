import { expect } from 'chai';
import HTTPTransport from './HTTPTransport';

const sinon = require('sinon');

describe('HTTPTransport', () => {
  let xhr: sinon.SinonFakeXMLHttpRequestStatic;
  let instance: HTTPTransport;
  const requests: sinon.SinonFakeXMLHttpRequest[] = [];

  beforeEach(() => {
    xhr = sinon.useFakeXMLHttpRequest();

    // @ts-ignore
    global.XMLHttpRequest = xhr;

    xhr.onCreate = ((request: sinon.SinonFakeXMLHttpRequest) => {
      requests.push(request);
    });

    instance = new HTTPTransport('/auth');
  });

  afterEach(() => {
    requests.length = 0;
  })

  it('.get() should send GET request', () => {
    instance.get('/user');

    const [request] = requests;

    expect(request.method).to.eq('GET');
  });
});
