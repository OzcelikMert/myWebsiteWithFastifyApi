import React from "react";
import {IPagePropCommon} from "types/pageProps";
import {ComponentHelperClass} from "classes/componentHelper.class";
import {IComponentGetResultService} from "types/services/component.service";
import {NavigationService} from "services/navigation.service";
import {StatusId} from "constants/status";
import {INavigationGetResultService} from "types/services/navigation.service";
import {Nav, Navbar, NavDropdown} from "react-bootstrap";
import {URLUtil} from "utils/url.util";

type IPageState = {
    navbar: React.ReactNode
};

type IPageProps = {
    component: IComponentGetResultService<{
        navigations?: INavigationGetResultService[]
    }>;
} & IPagePropCommon;

class ComponentToolNavbar extends ComponentHelperClass<IPageProps, IPageState> {
    constructor(props: IPageProps) {
        super(props);
        this.state = {
            navbar: this.props.component.customData?.navigations?.map((navigation, index) => {
                let children = this.props.component.customData?.navigations?.findMulti("mainId._id", navigation._id) ?? [];
                return children.length > 0
                    ? this.Dropdown(navigation, index)
                    : navigation.mainId
                        ? null
                        : this.NavItem(navigation, index)
            })
        }
    }

    DropdownItem = (props: INavigationGetResultService, index: number) => {
        let children = this.props.component.customData?.navigations?.findMulti("mainId._id", props._id) ?? [];

        return children.length > 0
            ? this.Dropdown(props, index)
            : (
                <NavDropdown.Item key={props._id} href={URLUtil.createHref({url: this.props.getURL, targetPath: props.contents?.url})}>
                    {props.contents?.title}
                </NavDropdown.Item>
            )
    }

    Dropdown = (props: INavigationGetResultService, index: number) => {
        let children = this.props.component.customData?.navigations?.findMulti("mainId._id", props._id) ?? [];

        return (
            <NavDropdown key={props._id} title={props.contents?.title} drop={props.mainId ? "end" : "down"}>
                {
                    children.map((child, childIndex) => this.DropdownItem(child, childIndex))
                }
            </NavDropdown>
        )
    }

    NavItem = (props: INavigationGetResultService, index: number) => {
        if (props.mainId) return null;
        let children = this.props.component.customData?.navigations?.findMulti("mainId._id", props._id) ?? [];

        return children.length > 0
            ? this.Dropdown(props, index)
            : (
                <Nav.Link key={props._id} href={URLUtil.createHref({url: this.props.getURL, targetPath: props.contents?.url})}>
                    {props.contents?.title}
                </Nav.Link>
            )
    }

    render() {
        return (
            <div className="navbar-section start-style" id="navbar-section">
                <div className="container">
                    <Navbar expand="md" className="navbar-light">
                        <Navbar.Brand href={URLUtil.createHref({url: this.props.getURL, targetPath: ""})}>
                            <h2>{this.props.appData.settings.seoContents?.title}</h2>
                        </Navbar.Brand>
                        <Navbar.Toggle aria-controls="#nav">
                            <span className="navbar-toggler-icon"></span>
                        </Navbar.Toggle>
                        <Navbar.Collapse id="nav">
                            <Nav>
                                {
                                    this.props.component.customData?.navigations?.map((navigation, index) => this.NavItem(navigation, index))
                                }
                            </Nav>
                            <a className="btn btn-warning login-btn"
                               href="http://localhost:3001/login">{this.getComponentElementContents("buttonText")?.content}</a>
                        </Navbar.Collapse>
                    </Navbar>
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