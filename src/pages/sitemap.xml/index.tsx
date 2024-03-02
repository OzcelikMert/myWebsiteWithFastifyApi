import {GetServerSidePropsContext} from 'next'
import Parser from "xml2js";
import "styles/pages/home.module.scss";
import sitemapService from "services/sitemap.service";
import React from "react";
import {SitemapFileIndexDocument} from "types/pages/sitemap.xml";
import postLib from "lib/post.lib";
import pageLib from "lib/page.lib";
import sitemapLib from "lib/sitemap.lib";

export default function PageSitemapXML() { return null; }

export async function getServerSideProps(context: GetServerSidePropsContext) {
    let res = context.res;
    let req = context.req;

    let resData = await sitemapService.getMaps({});

    if(resData.status){
        let sitemapData: SitemapFileIndexDocument = {
            sitemapindex: {
                sitemap: [],
                $: {
                    "xmlns": "http://www.sitemaps.org/schemas/sitemap/0.9",
                    "xmlns:xsd": "http://www.w3.org/2001/XMLSchema",
                    "xmlns:xsi": "http://www.w3.org/2001/XMLSchema-instance",
                }
            }
        }

        for(const post of resData.data.post){
            let pages = Math.ceil(post.total / 500);
            let typeName = postLib.getTypeName(post.typeId);
            for (let i = 0; i < pages; i++) {
                sitemapData.sitemapindex.sitemap.push({
                    loc: sitemapLib.getLoc(req.appData.apiPath.website.base, "sitemaps", "post", typeName, (i + 1).toString())
                })
            }
        }

        let xml = (new Parser.Builder()).buildObject(sitemapData);
        res.setHeader('Content-Type', 'text/xml');
        res.write(xml);
        res.end();
    }

    return {
        props: pageLib.getReturnData(req)
    };
}