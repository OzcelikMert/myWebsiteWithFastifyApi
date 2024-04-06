import {NextFetchEvent, type NextRequest, NextResponse} from "next/server";
import {URLUtil} from "@utils/url.util";
import {LanguageService} from "@services/language.service";
import {LanguageUtil} from "@utils/language.util";
import {StatusId} from "@constants/status";

export async function middleware(req: NextRequest, event: NextFetchEvent) {
    let res = NextResponse.next();

    res.headers.set(
        'Cache-Control',
        'public, s-maxage=10, stale-while-revalidate=59'
    );

    let langId = "";

    let langCode = URLUtil.getLanguageCode(req.nextUrl.pathname);
    if (langCode) {
        req.nextUrl.pathname = req.nextUrl.pathname.replace(`/${langCode}`, "");

        req.cookies.set({
            name: 'langCode',
            value: langCode,
        })

        /*let splitLangCode = LanguageUtil.splitLangCode(langCode);
        let languageServiceResult = await LanguageService.getMany({locale: splitLangCode.locale, shortKey: splitLangCode.shortKey, statusId: StatusId.Active});
        if(languageServiceResult.status && languageServiceResult.data && languageServiceResult.data.length > 0) {
            langId = languageServiceResult.data[0]._id;
        }*/
    }

    return NextResponse.rewrite(req.nextUrl, {headers: res.headers, request: req});
}

export const config = {
    matcher: [
        "/",
        /*
         * Match all request paths except for the ones starting with:
         * - api (API routes)
         * - _next/static (static files)
         * - favicon.ico (favicon file)
         */
        "/((?!api|_next|favicon.ico).*)",
    ]
}