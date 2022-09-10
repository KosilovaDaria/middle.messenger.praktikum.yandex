const enum METHOD {
  GET = 'GET',
  POST = 'POST',
  PUT = 'PUT',
  PATCH = 'PATCH',
  DELETE = 'DELETE',
}

type Options = {
  method: METHOD;
  data?: any;
  headers?: Record<string, string>;
  timeout?: number;
};

type OptionsWithoutMethod = Omit<Options, 'method'>;

function queryStringify(data: Record<string, string | number>) {
  let string = '?';
  const keys = Object.keys(data);
  const values = Object.values(data);
  keys.forEach((key, i) => {
    string += `${key}=${values[i].toString()}`;
    if (i + 1 !== values.length) string += '&'
  })
  return string;
}

export default class HTTPTransport {
  get = (url: string, options: OptionsWithoutMethod = {}) => this.request(url, { ...options, method: METHOD.GET }, options.timeout);

  post = (url: string, options: OptionsWithoutMethod = {}) => this.request(url, { ...options, method: METHOD.POST }, options.timeout);

  put = (url: string, options: OptionsWithoutMethod = {}) => this.request(url, { ...options, method: METHOD.PUT }, options.timeout);

  delete = (url: string, options: OptionsWithoutMethod = {}) => this.request(url, { ...options, method: METHOD.DELETE }, options.timeout);

  request = (url: string, options: Options, timeout: number = 5000): Promise<XMLHttpRequest> => {
    const { headers = {}, data = {}, method } = options;

    return new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();

      xhr.ontimeout = function () {
        reject(xhr);
      }

      if (method === METHOD.GET && data) {
        xhr.open(method, url + queryStringify(data));
      } else {
        xhr.open(method, url);
      }

      Object.keys(headers).forEach((key) => {
        xhr.setRequestHeader(key, headers[key]);
      });

      xhr.timeout = timeout;

      xhr.onload = function () {
        resolve(xhr);
      };

      const handleError = (err: any) => {
        console.log('handleError')
        reject(err);
      };

      xhr.onabort = handleError;
      xhr.onerror = handleError;

      if (method === METHOD.GET || !data) {
        xhr.send();
      } else {
        console.log('else')
        xhr.send(JSON.stringify(data));
      }
    });
  };
}
