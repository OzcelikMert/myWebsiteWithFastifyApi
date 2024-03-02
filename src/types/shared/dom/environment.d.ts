declare global {
    namespace NodeJS {
        interface ProcessEnv {
            API_PROTOCOL: string
            API_HOST: string
            API_PORT: string
        }
    }
}

export {}