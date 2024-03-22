import React from "react";
import {IPagePropCommon} from "types/pageProps";
import {ComponentHelperClass} from "classes/componentHelper.class";
import {IComponentGetResultService} from "types/services/component.service";
import {SocialMediaKey} from "constants/socialMediaKeys";
import {NavigationService} from "services/navigation.service";
import {StatusId} from "constants/status";
import {PostService} from "services/post.service";
import {PostTypeId} from "constants/postTypes";
import {PostSortTypeId} from "constants/postSortTypes";
import {INavigationGetResultService} from "types/services/navigation.service";
import {IPostGetManyResultService} from "types/services/post.service";

type IPageState = {};

type IPageProps = {
    component: IComponentGetResultService<{
        navigations?: INavigationGetResultService[]
    }>;
} & IPagePropCommon;

class ComponentToolNavbar extends ComponentHelperClass<IPageProps, IPageState> {
    constructor(props: IPageProps) {
        super(props);
    }

    render() {
        return (
            <div className="navbar-section start-style" id="navbar-section">
                <div className="container">
                    <nav className="navbar navbar-expand-md navbar-light">

                        <a className="navbar-brand" href="/Mimi/"><h2>Mimi</h2></a>

                        <button className="navbar-toggler collapsed" type="button" data-bs-toggle="collapse"
                                data-bs-target="#nav">
                            <span className="navbar-toggler-icon"></span>
                        </button>

                        <div className="collapse navbar-collapse" id="nav">
                            <ul className="navbar-nav py-4 py-md-0">
                                <li className="nav-item">
                                    <a className="nav-link" href="/Mimi">Home</a>
                                </li>
                                <li className="nav-item">
                                    <a className="nav-link" href="categories">Categories</a>
                                </li>
                                <li className="nav-item">
                                    <a className="nav-link" href="authors">Authors</a>
                                </li>
                                <li className="nav-item">
                                    <a className="nav-link dropdown-toggle" data-bs-toggle="dropdown" href="#"
                                       role="button">Services</a>
                                    <div className="dropdown-menu">
                                        <a className="dropdown-item" href="#">Action</a>
                                        <a className="dropdown-item" href="#">Another action</a>
                                        <a className="dropdown-item" href="#">Something else here</a>
                                        <a className="dropdown-item" href="#">Another action</a>
                                    </div>
                                </li>
                                <li className="nav-item">
                                    <a className="nav-link" href="#">Contact</a>
                                </li>
                            </ul>
                            <a className="btn btn-warning login-btn" href="login.php">Log In</a>
                        </div>

                    </nav>
                </div>
            </div>
        );
    }
}

ComponentToolNavbar.initComponentServersideProps = async (req, component) => {
    component.customData = {};

    component.customData.navigations = (await NavigationService.getMany({
        langId: req.appData.selectedLangId,
        statusId: StatusId.Active,
        isPrimary: true
    })).data ?? [];
}

export default ComponentToolNavbar;