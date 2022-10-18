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

  it('.get() should send Get request', () => {
    instance.get('/user');

    const [request] = requests;

    expect(request.method).to.eq('GET');
  });

  it('.post() should send Post request', async () => {
    const promise = instance.post('/signin');

    const [request] = requests;
    request.respond(200, {}, '[{ "id": 123, "username": "Petya" }]');

    const result = await promise;
    expect(result).to.deep.eq([{ id: 123, username: 'Petya' }]);
  });
});
