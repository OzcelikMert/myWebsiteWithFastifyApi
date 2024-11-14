import { GetServerSidePropsContext } from 'next';
import Parser from 'xml2js';
import { SitemapFileDocument } from 'types/pages/sitemaps';
import { PostUtil } from '@utils/post.util';
import { SitemapService } from '@services/sitemap.service';
import { SitemapUtil } from '@utils/sitemap.util';
import { PageSSRUtil } from '@utils/page.ssr.util';
import { LanguageUtil } from '@utils/language.util';

export default function PageSitemapsXML() {
  return null;
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const res = context.res;
  const req = context.req;

  const typeName = (context.params?.typeName as string) ?? '';
  const typeId = PostUtil.getTypeId(typeName.toCapitalizeCase());
  const page = Number(context.params?.page ?? 1);

  const serviceResult = await SitemapService.getPost({
    typeId: typeId,
    page: page,
  });

  if (serviceResult.status && serviceResult.data) {
    const sitemapData: SitemapFileDocument = {
      urlset: {
        url: [],
        $: {
          xmlns: 'http://www.sitemaps.org/schemas/sitemap/0.9',
          'xmlns:xsi': 'http://www.w3.org/2001/XMLSchema-instance',
          'xmlns:xhtml': 'http://www.w3.org/TR/xhtml11/xhtml11_schema.html',
          'xsi:schemaLocation':
            'http://www.sitemaps.org/schemas/sitemap/0.9 http://www.sitemaps.org/schemas/sitemap/0.9/sitemap.xsd http://www.w3.org/TR/xhtml11/xhtml11_schema.html http://www.w3.org/2002/08/xhtml/xhtml1-strict.xsd',
        },
      },
    };

    for (const post of serviceResult.data) {
      const defaultContent = post.contents.findSingle(
        'langId',
        req.appData.defaultLangId
      );
      if (defaultContent) {
        sitemapData.urlset.url.push({
          'xhtml:link': post.contents.map((content) => {
            const language = req.appData.languages!.findSingle(
              '_id',
              content.langId
            );
            const hrefLang = language
              ? LanguageUtil.getCode(language)
              : 'tr-tr';
            return {
              $: {
                rel: 'alternate',
                href: SitemapUtil.getLoc(
                  req.getURL.base,
                  hrefLang,
                  SitemapUtil.getSitemapPostLoc(
                    post.typeId,
                    content.url,
                    post.pageTypeId
                  )
                ),
                hreflang: hrefLang,
              },
            };
          }),
          priority: SitemapUtil.getSitemapPostPriority(
            post.typeId,
            post.pageTypeId
          ),
          loc: SitemapUtil.getLoc(
            req.getURL.base,
            SitemapUtil.getSitemapPostLoc(
              post.typeId,
              defaultContent.url,
              post.pageTypeId
            )
          ),
          changefreq: 'weekly',
          lastmod: new Date(post.updatedAt).toISOString(),
        });
      }
    }

    sitemapData.urlset.url = sitemapData.urlset.url.orderBy('priority', 'desc');

    const xml = new Parser.Builder().buildObject(sitemapData);
    res.setHeader('Content-Type', 'text/xml');
    res.write(xml);
    res.end();
  }

  return {
    props: PageSSRUtil.getProps(req),
  };
}
