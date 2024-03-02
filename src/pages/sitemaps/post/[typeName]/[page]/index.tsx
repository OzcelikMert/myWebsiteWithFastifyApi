import {GetServerSidePropsContext} from 'next'
import Parser from "xml2js";
import "styles/pages/home.module.scss";
import sitemapService from "services/sitemap.service";
import postLib from "lib/post.lib";
import {SitemapFileDocument} from "types/pages/sitemaps";
import linkUtil from "utils/link.util";
import sitemapLib from "lib/sitemap.lib";
import pageLib from "lib/page.lib";

export default function PageSitemapsXML() {
    return null;
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
    let res = context.res;
    let req = context.req;

    let typeName = context.params?.typeName as string ?? "";
    let typeId = postLib.getTypeId(typeName.toCapitalizeCase());
    let page = Number(context.params?.page ?? 1);

    let resData = await sitemapService.getPost({
        typeId: typeId,
        page: page
    });

    if (resData.status) {
        let sitemapData: SitemapFileDocument = {
            urlset: {
                url: [],
                $: {
                    "xmlns": "http://www.sitemaps.org/schemas/sitemap/0.9",
                    "xmlns:xsi": "http://www.w3.org/2001/XMLSchema-instance",
                    "xmlns:xhtml": "http://www.w3.org/TR/xhtml11/xhtml11_schema.html",
                    "xsi:schemaLocation": "http://www.sitemaps.org/schemas/sitemap/0.9 http://www.sitemaps.org/schemas/sitemap/0.9/sitemap.xsd http://www.w3.org/TR/xhtml11/xhtml11_schema.html http://www.w3.org/2002/08/xhtml/xhtml1-strict.xsd"
                }
            }
        }

        for (const post of resData.data) {
            let defaultContent = post.contents.findSingle("langId", req.appData.settings.defaultLangId);
            if(defaultContent){
                sitemapData.urlset.url.push({
                    "xhtml:link": post.contents.map(content => {
                        let language = req.appData.languages.findSingle("_id", content.langId);
                        let hrefLang = language ? linkUtil.language(language) : "tr-tr";
                        return {
                            $: {
                                rel: "alternate",
                                href: sitemapLib.getLoc(req.appData.apiPath.website.base, hrefLang, sitemapLib.getSitemapPostLoc(post.typeId, content.url, post.pageTypeId)),
                                hreflang: hrefLang
                            }
                        }
                    }),
                    priority: sitemapLib.getSitemapPostPriority(post.typeId, post.pageTypeId),
                    loc: sitemapLib.getLoc(req.appData.apiPath.website.base, sitemapLib.getSitemapPostLoc(post.typeId, defaultContent.url, post.pageTypeId)),
                    changefreq: "weekly",
                    lastmod: new Date(post.updatedAt).toISOString()
                })
            }
        }

        sitemapData.urlset.url = sitemapData.urlset.url.orderBy("priority", "desc");

        let xml = (new Parser.Builder()).buildObject(sitemapData);
        res.setHeader('Content-Type', 'text/xml');
        res.write(xml);
        res.end();
    }

    return {
        props: pageLib.getReturnData(req)
    };
}