import {GetServerSidePropsContext} from 'next'
import Parser from "xml2js";
import React from "react";
import {SitemapService} from "services/sitemap.service";
import {ISitemapFileIndex} from "types/pages/sitemap.xml";
import {PostUtil} from "utils/post.util";
import {SitemapUtil} from "utils/sitemap.util";
import {PageUtil} from "utils/page.util";

export default function PageSitemapXML() { return null; }

export async function getServerSideProps(context: GetServerSidePropsContext) {
    let res = context.res;
    let req = context.req;

    let serviceResult = await SitemapService.getMaps();

    if(serviceResult.status && serviceResult.data){
        let sitemapData: ISitemapFileIndex = {
            sitemapindex: {
                sitemap: [],
                $: {
                    "xmlns": "http://www.sitemaps.org/schemas/sitemap/0.9",
                    "xmlns:xsd": "http://www.w3.org/2001/XMLSchema",
                    "xmlns:xsi": "http://www.w3.org/2001/XMLSchema-instance",
                }
            }
        }

        for(const post of serviceResult.data.post){
            let pages = Math.ceil(post.total / 500);
            let typeName = PostUtil.getTypeName(post.typeId);
            for (let i = 0; i < pages; i++) {
                sitemapData.sitemapindex.sitemap.push({
                    loc: SitemapUtil.getLoc(req.getURL.base, "sitemaps", "post", typeName, (i + 1).toString())
                })
            }
        }

        let xml = (new Parser.Builder()).buildObject(sitemapData);
        res.setHeader('Content-Type', 'text/xml');
        res.write(xml);
        res.end();
    }

    return {
        props: PageUtil.getCommonProps(req)
    };
}