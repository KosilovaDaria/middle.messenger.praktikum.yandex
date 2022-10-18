export enum METHOD {
  GET = 'GET',
  POST = 'POST',
  PUT = 'PUT',
  PATCH = 'PATCH',
  DELETE = 'DELETE',
}

type Options = {
  method: METHOD;
  data?: any;
  headers?: any,
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
  public get<TResponse>(path = '/'): Promise<TResponse> {
    return this.request(this.endpoint + path);
  }

  public post<TResponse = void>(path: string, data?: unknown): Promise<TResponse> {
    return this.request(this.endpoint + path, {
      method: METHOD.POST,
      data,
    });
  }

  public put<TResponse = void>(path: string, data: unknown): Promise<TResponse> {
    return this.request(this.endpoint + path, {
      method: METHOD.PUT,
      data,
    });
  }

  public delete<TResponse>(path: string, data: unknown): Promise<TResponse> {
    return this.request(this.endpoint + path, {
      method: METHOD.DELETE,
      data,
    });
  }

  private request<TResponse>(url: string, options: Options = { method: METHOD.GET }): Promise<TResponse> {
    const { headers, data, method } = options;

    return new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();

      // xhr.open(method, url);
      if (method === METHOD.GET && data) {
        xhr.open(method, url + queryStringify(data));
      } else {
        xhr.open(method, url);
      }

      xhr.onload = function () {
        resolve(xhr.response);
      };
      xhr.ontimeout = function () {
        reject(xhr.response);
      }

      const handleError = (err: any) => {
        console.log('handleError')
        reject(err);
      };

      xhr.onabort = handleError;
      xhr.onerror = handleError;
      if (!headers) {
        if (url.includes('avatar') === false) {
          xhr.setRequestHeader('Content-Type', 'application/json');
        }
      } else {
        Object.keys(headers).forEach(key => {
          xhr.setRequestHeader(key, headers[key]);
        });
      }

      xhr.withCredentials = true;
      xhr.responseType = 'json';

      if (method === METHOD.GET || !data) {
        xhr.send();
      } else if (data instanceof FormData) {
        console.log(data)
        xhr.send(data);
      } else {
        console.log(data)
        xhr.send(JSON.stringify(data));
      }
    });
  }
}
