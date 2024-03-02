export interface SitemapFileAttrDocument {
    "xmlns:xsi"?: string
    "xmlns:xsd"?: string
    "xmlns"?: string
    "xmlns:xhtml"?: string
    "xsi:schemaLocation": string
}

export interface SitemapFileChildrenDocument {
    loc: string,
    lastmod: string,
    changefreq: "always" | "hourly" | "daily" | "weekly" | "monthly" | "yearly" | "never",
    priority: string
    "xhtml:link": {
        $: {
            rel: "alternate",
            hreflang: string,
            href: string
        }
    }[]
}

export interface SitemapFileDocument {
    urlset: {
        $: SitemapFileAttrDocument
        url: SitemapFileChildrenDocument[]
    }
}
