interface ApiRequestParamDocument {
    url: (string | undefined)[],
    method?: ApiRequestParamMethodDocument,
    data?: object,
    processData?: boolean,
    contentType?: string | false
}

type ApiRequestParamMethodDocument = "GET" | "POST" | "PUT" | "DELETE";

export {
    ApiRequestParamDocument,
    ApiRequestParamMethodDocument
}