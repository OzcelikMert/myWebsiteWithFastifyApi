import {ApiRequestParamDocument} from "types/services/api";
import ServiceResultDocument from "types/services/api/result";
import pathUtil from "utils/path.util";
//const fetch = require("cross-fetch");
import 'cross-fetch/polyfill'
import {ErrorCodes} from "library/api";

function getQueryString(params: any) {
    return Object
        .keys(params)
        .map(k => {
            if (Array.isArray(params[k])) {
                return params[k]
                    .map((val: any) => val ? `${encodeURIComponent(k)}[]=${encodeURIComponent(val)}` : "")
                    .join('&')
            }

            return params[k] ? `${encodeURIComponent(k)}=${encodeURIComponent(params[k])}` : "";
        })
        .join('&')
}

class ApiRequest {
    constructor(params: ApiRequestParamDocument) {
        this.params = params;
        this.result = {
            data: [],
            customData: null,
            status: true,
            message: "",
            errorCode: ErrorCodes.success,
            statusCode: 200,
            source: ""
        };
    }

    private params: ApiRequestParamDocument;
    private result: ServiceResultDocument;

    private getApiUrl() {
        let apiUrl = pathUtil.api;
        this.params.url.forEach(url => {
            if(url) {
                apiUrl += url + "/";
            }
        })
        console.log(this.params.method, apiUrl.removeLastChar())
        return apiUrl.removeLastChar();
    }

    private request(resolve: (value: any) => void) {
        let config: RequestInit = {
            method: this.params.method,
            body: JSON.stringify(this.params.data),
            headers: { 'Content-Type': 'application/json;charset=utf-8' }
        }
        let url = this.getApiUrl();

        if(config.method === "GET"){
            delete config.body;
            url += (url.indexOf('?') === -1 ? '?' : '&') + getQueryString(this.params.data || {});
        }

        try {
            fetch(url, config)
                .then((response: any) => response.json())
                .then((response: any) => {
                    resolve(response);
                });
        }catch (e) {
            console.log(e);
            this.result.status = false;
            this.result.customData = e;
            resolve(this.result);
        }

    }

    init() : Promise<ServiceResultDocument<any>> {
        return new Promise( async resolve => {
            await this.request(resolve);
        })
    }
}

export default ApiRequest;