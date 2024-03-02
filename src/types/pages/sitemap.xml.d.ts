export interface SitemapFileIndexAttrDocument {
    "xmlns:xsi"?: string
    "xmlns:xsd"?: string
    "xmlns"?: string
}

export interface SitemapFileIndexChildrenDocument {
    loc: string
}

export interface SitemapFileIndexDocument {
    sitemapindex: {
        $: SitemapFileIndexAttrDocument
        sitemap: SitemapFileIndexChildrenDocument[]
    }
}
