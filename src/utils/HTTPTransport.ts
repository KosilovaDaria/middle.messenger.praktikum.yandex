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
  static API_URL = 'https://ya-praktikum.tech/api/v2';
  protected endpoint: string;
  constructor(endpoint: string) {
    this.endpoint = `${HTTPTransport.API_URL}${endpoint}`
  }
  public get<TResponse>(path: '/'): Promise<TResponse> {
    return this.request(this.endpoint + path);
  }

  public post<TResponse>(path: string, data?: unknown): Promise<TResponse> {
    return this.request(this.endpoint + path, {
      method: METHOD.POST,
      data,
    });
  }

  public put<TResponse>(path: string, data: unknown): Promise<TResponse> {
    return this.request(this.endpoint + path, {
      method: METHOD.PUT,
      data,
    });
  }

  public delete<TResponse>(path: string): Promise<TResponse> {
    return this.request(this.endpoint + path, {
      method: METHOD.DELETE,
    });
  }
  // get = (url: string, options: OptionsWithoutMethod = {}) => this.request(url, { ...options, method: METHOD.GET }, options.timeout);

  // post = (url: string, options: OptionsWithoutMethod = {}) => this.request(url, { ...options, method: METHOD.POST }, options.timeout);

  // put = (url: string, options: OptionsWithoutMethod = {}) => this.request(url, { ...options, method: METHOD.PUT }, options.timeout);

  // delete = (url: string, options: OptionsWithoutMethod = {}) => this.request(url, { ...options, method: METHOD.DELETE }, options.timeout);

  private request<TResponse>(url: string, options: Options = { method: METHOD.GET }): Promise<TResponse> {
    const { headers = {}, data = {}, method } = options;

    return new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();
      xhr.ontimeout = function () {
        reject(xhr);
      }

      // xhr.open(method, url);
      if (method === METHOD.GET && data) {
        xhr.open(method, url + queryStringify(data));
      } else {
        xhr.open(method, url);
      }

      xhr.setRequestHeader('Content-Type', 'application/json')
      // Object.keys(headers).forEach((key) => {
      //   xhr.setRequestHeader(key, headers[key]);
      // });

      xhr.onload = function () {
        resolve(xhr);
      };

      const handleError = (err: any) => {
        console.log('handleError')
        reject(err);
      };

      xhr.onabort = handleError;
      xhr.onerror = handleError;

      xhr.withCredentials = true;
      xhr.responseType = 'json';

      if (method === METHOD.GET || !data) {
        xhr.send();
      } else {
        xhr.send(JSON.stringify(data));
      }
    });
  }
}
