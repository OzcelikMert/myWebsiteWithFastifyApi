import {GetServerSidePropsContext} from "next";
import PageBlogs, {getServerSideProps as getSSP} from "pages/blogs";

export default PageBlogs;

export async function getServerSideProps(context: GetServerSidePropsContext) {
    let req = context.req;
    context.params = {};

    let splitURL = req.url?.split("/");
    if(splitURL && splitURL.length > 0){
        let categoryIndex = splitURL.indexOf("category");
        if(categoryIndex > -1 && categoryIndex < (splitURL.length - 1)) {
            context.params.category = splitURL[categoryIndex + 1];
        }

        let searchIndex = splitURL.indexOf("search");
        if(searchIndex > -1 && searchIndex < (splitURL.length - 1)) {
            context.params.search = splitURL[searchIndex + 1];
        }

        let pageIndex = splitURL.indexOf("page");
        if(pageIndex > -1 && pageIndex < (splitURL.length - 1)) {
            context.params.page = splitURL[pageIndex + 1];
        }
    }
    
    return {
        props: (await getSSP(context)).props
    };
}