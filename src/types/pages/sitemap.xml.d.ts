export interface ISitemapFileIndexAttr {
  'xmlns:xsi'?: string;
  'xmlns:xsd'?: string;
  xmlns?: string;
}

export interface ISitemapFileIndexChildren {
  loc: string;
}

export interface ISitemapFileIndex {
  sitemapindex: {
    $: ISitemapFileIndexAttr;
    sitemap: ISitemapFileIndexChildren[];
  };
}
