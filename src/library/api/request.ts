import { IApiRequestParam, IApiRequestParamMethod } from '@library/types/api';
import 'cross-fetch/polyfill';
import { ApiResult } from '@library/api/result';

export class ApiRequest {
  constructor(params: IApiRequestParam) {
    this.params = params;
  }

  private params: IApiRequestParam;

  private getQueryString(params: any) {
    return Object.keys(params)
      .map((k) => {
        if (Array.isArray(params[k])) {
          return params[k]
            .map((val: any) =>
              val ? `${encodeURIComponent(k)}=${encodeURIComponent(val)}` : ''
            )
            .join('&');
        }

        return params[k]
          ? `${encodeURIComponent(k)}=${encodeURIComponent(params[k])}`
          : '';
      })
      .join('&');
  }

  private getApiUrl(): string {
    let apiUrl = this.params.apiUrl;
    if (this.params.endPoint) {
      apiUrl += this.params.endPoint;
    }
    return apiUrl;
  }

  private async request<Data = any[], CustomData = null>(
    method: IApiRequestParamMethod
  ) {
    let apiResult = new ApiResult<Data, CustomData>();

    try {
      let url = this.getApiUrl();

      const init: RequestInit = {
        method: method,
        headers: { 'Content-Type': 'application/json;charset=utf-8' },
      };

      if (init.method === 'GET') {
        url +=
          (url.indexOf('?') === -1 ? '?' : '&') +
          this.getQueryString(this.params.data || {});
      } else {
        init.body = JSON.stringify(this.params.data);
      }

      const serviceResult = await new Promise((resolve) => {
        fetch(url, init)
          .then((response: any) => response.json())
          .then((response: any) => {
            resolve(response);
          });
      });

      if (serviceResult) {
        apiResult = serviceResult as ApiResult<Data, CustomData>;
      }
    } catch (e: any) {
      if (e.response) {
        apiResult = e.response;
      }
      apiResult.customData = e;
    }

    return apiResult;
  }

  async get<Data = any[], CustomData = null>() {
    return await this.request<Data, CustomData>('GET');
  }

  async post<Data = any[], CustomData = null>() {
    return await this.request<Data, CustomData>('POST');
  }

  async put<Data = any[], CustomData = null>() {
    return await this.request<Data, CustomData>('PUT');
  }

  async delete<Data = any[], CustomData = null>() {
    return await this.request<Data, CustomData>('DELETE');
  }
}
