import pagePathLib from "lib/pagePath.lib";

const PagePaths = {
    index() {
        return pagePathLib.setPath("/");
    },
    blogs(withMainPath: boolean = true) {
        let pathBlogs = withMainPath ? pagePathLib.setPath("blogs") : "";

        return {
            self() {
                return pagePathLib.setPath(pathBlogs);
            },
            page(page: string | number | undefined = ":page") {
                return pagePathLib.setPath(pathBlogs, "page", page);
            },
            category(url: string  | undefined = ":category"){
                let pathCategory = pagePathLib.setPath(pathBlogs, "category", url);

                return {
                    self() {
                        return pagePathLib.setPath(pathCategory);
                    },
                    page(page: string | number | undefined = ":page") {
                        return pagePathLib.setPath(pathCategory, "page", page);
                    },
                }
            },
            search(url: string  | undefined = ":search"){
                let pathSearch = pagePathLib.setPath(pathBlogs, "search", url);

                return {
                    self() {
                        return pagePathLib.setPath(pathSearch);
                    },
                    page(page: string | number | undefined = ":page") {
                        return pagePathLib.setPath(pathSearch, "page", page);
                    },
                }
            }
        }
    },
    blog(url: string  | undefined = ":url") {
        return pagePathLib.setPath("blog", url);
    },
    page(withMainPath: boolean = true) {
        let pathPage = withMainPath ? pagePathLib.setPath("/") : "";

        return {
            self() {
                return pagePathLib.setPath(pathPage);
            },
            withUrl(url: string  | undefined = ":url") {
                return pagePathLib.setPath(pathPage, url);
            },
        }
    },
    sitemap(withMainPath: boolean = true) {
        let pathSitemap = withMainPath ? pagePathLib.setPath("sitemap") : "";

        return {
            self() {
                return pagePathLib.setPath(pathSitemap);
            },
            withUrl(url: string  | undefined = ":url") {
                return pagePathLib.setPath(pathSitemap, url);
            },
        }
    },
    sitemapXML() {
        return pagePathLib.setPath("sitemap.xml");
    },
}

export default PagePaths;