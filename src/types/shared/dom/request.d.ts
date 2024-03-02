import {AppDataDocument} from "types/pageProps";

declare global {
    interface Request {
        appData: AppDataDocument
    }
}