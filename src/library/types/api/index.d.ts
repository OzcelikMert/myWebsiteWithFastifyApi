export interface ApiRequestParamDocument {
    endPoint?: string,
    apiUrl: string
    data?: object,
    processData?: boolean,
    contentType?: string | false
    onUploadProgress?: (e: any, percent: number) => void
}

export type ApiRequestParamMethodDocument = "GET" | "POST" | "PUT" | "DELETE";