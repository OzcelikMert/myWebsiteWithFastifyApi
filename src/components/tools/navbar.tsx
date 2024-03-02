import React, {Component} from "react";
import {PagePropCommonDocument} from "types/pageProps";
import Image from "next/image";
import LinkUtil from "utils/link.util";
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import imageSourceUtil from "utils/imageSource.util";
import {LanguageGetResultDocument} from "types/services/language";
import {NavigationGetResultDocument} from "types/services/navigation";

type PageState = {
    isNavbarSticky: boolean;
    navbarLinks: React.ReactNode
    languages: React.ReactNode
};

type PageProps = {} & PagePropCommonDocument<{}>;

export default class ComponentNavbar extends Component<PageProps, PageState> {
    constructor(props: PageProps) {
        super(props);
        this.state = {
            isNavbarSticky: false,
            navbarLinks: this.props.themeData.navigations.map((navigation) =>
                <this.NavLink nav={navigation}/>),
            languages: (<this.Languages/>)
        };
    }

    componentDidMount() {
        this.setEvents();
    }

    componentWillUnmount() {
        this.clearEvents();
    }

    setEvents() {
        window.addEventListener("scroll", () => this.handleScroll());
    }

    clearEvents() {
        window.removeEventListener("scroll", () => this.handleScroll());
    }

    handleScroll() {
        if (window.scrollY > 300) {
            if (!this.state.isNavbarSticky) {
                this.setState({
                    isNavbarSticky: true,
                });
            }
        } else {
            if (this.state.isNavbarSticky) {
                this.setState({
                    isNavbarSticky: false,
                });
            }
        }
    }

    NavLink = (props: { nav: NavigationGetResultDocument, mainId?: string }) => {
        let self = this;
        if (props.nav.mainId?._id != props.mainId) return null;
        let subNavs = this.props.themeData.navigations.findMulti("mainId._id", props.nav._id);

        function DropDown() {
            function Item(dropDownItemProps: NavigationGetResultDocument) {
                let dropDownSubNavs = self.props.themeData.navigations.findMulti("mainId._id", dropDownItemProps._id);
                return dropDownSubNavs.length > 0
                    ? <self.NavLink nav={dropDownItemProps} mainId={props.nav._id}/>
                    :
                    <NavDropdown.Item href={LinkUtil.target(self.props.appData, dropDownItemProps.contents?.url || "")}>
                        {dropDownItemProps.contents?.title}
                    </NavDropdown.Item>

            }

            return (
                <NavDropdown title={props.nav.contents?.title} id={props.nav._id} drop={props.mainId ? "end" : "down"}>
                    {
                        subNavs.map(subNav => <Item {...subNav} />)
                    }
                </NavDropdown>
            );
        }

        function Link() {
            return (<Nav.Link
                href={LinkUtil.target(self.props.appData, props.nav.contents?.url || "")}>{props.nav.contents?.title}</Nav.Link>)
        }

        return subNavs.length > 0
            ? <DropDown/>
            : <Link/>;
    };

    Languages = () => {
        let self = this;
        let current = this.props.appData.languages.findSingle("_id", this.props.appData.languageId);

        function Item(props: LanguageGetResultDocument) {
            return (
                <div>
                    <div className="d-inline-block">
                        <Image
                            className="img-fluid flag-size"
                            src={self.props.appData.apiPath.uploads.flags + props.image}
                            alt={props.title}
                            width={35}
                            height={35}
                        />
                    </div>
                    <div className="d-inline-block ms-1">
                        <span>{props.title}</span>
                    </div>
                </div>
            );
        }


        return current ? (
            <NavDropdown title={<Item {...current} />} id="languages">
                {
                    this.props.appData.languages.map((lang) =>
                        this.props.appData.languageId != lang._id
                            ? (<NavDropdown.Item href={LinkUtil.changeLanguage(this.props.appData, lang)}>
                                {
                                    <Item {...lang}/>
                                }
                            </NavDropdown.Item>) : null
                    )
                }
            </NavDropdown>
        ) : null;
    };

    render() {
        return (
            <Navbar expand="lg" id="header"
                    className={`${this.state.isNavbarSticky ? "fixed-top header-scrolled" : ""}`}>
                <Container>
                    <Navbar.Brand href={LinkUtil.home(this.props.appData)} className="logo wabbysoft_logo">
                        {
                            this.state.isNavbarSticky
                                ? <Image
                                    style={{filter: "drop-shadow(1px 0.5px 0.5px #fff)"}}
                                    src={imageSourceUtil.getUploadedImageSrc(this.props.appData.settings.logo)}
                                    alt={this.props.appData.settings.seoContents?.title || ""}
                                    height={75}
                                    width={150}
                                /> : <Image
                                    style={{filter: "drop-shadow(1px 0.5px 0.5px #fff)"}}
                                    src={imageSourceUtil.getUploadedImageSrc(this.props.appData.settings.logoTwo)}
                                    alt={this.props.appData.settings.seoContents?.title || ""}
                                    height={75}
                                    width={150}
                                />
                        }
                    </Navbar.Brand>
                    <Navbar.Toggle aria-controls="#navbar">
                        <span className="icon-bar top-bar"></span>
                        <span className="icon-bar middle-bar"></span>
                        <span className="icon-bar bottom-bar"></span>
                    </Navbar.Toggle>
                    <Navbar.Collapse id="navbar" className="pt-1">
                        <Nav className="me-auto"></Nav>
                        <Nav className="main-nav">
                            {
                                this.state.navbarLinks
                            }
                            {
                                this.state.languages
                            }
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        );
    }
}