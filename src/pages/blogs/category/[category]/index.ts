import {GetServerSidePropsContext} from "next";
import PageBlogs, {getServerSideProps as getSSP} from "pages/blogs";

export default PageBlogs;

export async function getServerSideProps(context: GetServerSidePropsContext) {
    let req = context.req;
    return {
        props: (await getSSP(context)).props
    };
}