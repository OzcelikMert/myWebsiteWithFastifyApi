import {IncomingMessage} from "http";
import postService from "services/post.service";
import {PostTypeId, StatusId} from "constants/index";
import componentService from "services/component.service";
import navigationService from "services/navigation.service";

export default {
    async getTools(req: IncomingMessage) {
        req.themeData.navigations = (await navigationService.getMany({
            statusId: StatusId.Active,
            langId: req.appData.languageId
        })).data

        const footer = (await componentService.getOne({
            langId: req.appData.languageId,
            elementId: "footer",
        })).data

        req.themeData.footer = footer ?? undefined;
    },
    async getThemeDataForComponents(req: IncomingMessage) {
        if(req.pageData){
            let components = req.pageData.components;
            if(components){
                for (const component of components) {
                    switch (component.elementId) {
                        case "services":
                            req.themeData.services = (await postService.getMany({
                                langId: req.appData.languageId,
                                typeId: [PostTypeId.Service],
                                statusId: StatusId.Active
                            })).data;
                            break;
                        case "testimonials":
                            req.themeData.testimonials = (await postService.getMany({
                                langId: req.appData.languageId,
                                typeId: [PostTypeId.Testimonial],
                                statusId: StatusId.Active,
                                count: 5
                            })).data;
                            break;
                        case "portfolios":
                            req.themeData.portfolios = (await postService.getMany({
                                langId: req.appData.languageId,
                                typeId: [PostTypeId.Portfolio],
                                statusId: StatusId.Active
                            })).data;
                            break;
                        case "clients":
                            req.themeData.clients = (await postService.getMany({
                                langId: req.appData.languageId,
                                typeId: [PostTypeId.Reference],
                                statusId: StatusId.Active
                            })).data;
                            break;
                        case "team":
                            req.themeData.team = (await postService.getMany({
                                langId: req.appData.languageId,
                                typeId: [PostTypeId.Reference],
                                statusId: StatusId.Active
                            })).data;
                            break;
                        case "blogs":
                            req.themeData.blogs = (await postService.getMany({
                                langId: req.appData.languageId,
                                typeId: [PostTypeId.Blog],
                                statusId: StatusId.Active,
                                count: 3
                            })).data;
                            break;
                        case "products":
                            req.themeData.products = (await postService.getMany({
                                langId: req.appData.languageId,
                                typeId: [PostTypeId.Product],
                                statusId: StatusId.Active,
                                count: 9
                            })).data;
                            break;
                        case "beforeAndAfters":
                            req.themeData.beforeAndAfters = (await postService.getMany({
                                langId: req.appData.languageId,
                                typeId: [PostTypeId.BeforeAndAfter],
                                statusId: StatusId.Active,
                                count: 9
                            })).data;
                            break;
                    }
                }
            }
        }
    }
};