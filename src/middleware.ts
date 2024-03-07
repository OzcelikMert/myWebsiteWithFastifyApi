import {NextResponse, type NextRequest, NextFetchEvent} from "next/server";
import {URLUtil} from "utils/url.util";

export async function middleware(req: NextRequest, event: NextFetchEvent) {
    let res = NextResponse.next();

    res.headers.set(
        'Cache-Control',
        'public, s-maxage=10, stale-while-revalidate=59'
    );

    let langCode = URLUtil.getLanguageCode(req.nextUrl.pathname);
    if (langCode) {
        req.nextUrl.pathname = req.nextUrl.pathname.replace(`/${langCode}`, "");

        req.cookies.set({
            name: 'langCode',
            value: langCode,
        })
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