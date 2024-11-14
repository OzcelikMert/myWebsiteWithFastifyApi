import React from 'react';
import { IPagePropCommon } from 'types/pageProps';
import { ComponentHelperClass } from '@classes/componentHelper.class';
import { IComponentGetResultService } from 'types/services/component.service';
import { NavigationService } from '@services/navigation.service';
import { StatusId } from '@constants/status';
import { INavigationGetResultService } from 'types/services/navigation.service';
import { Nav, Navbar, NavDropdown } from 'react-bootstrap';
import { UrlUtil } from '@utils/url.util';

type IPageState = {
  isNavbarSticky: boolean;
} & { [key: string]: any };

type IPageProps = {
  component: IComponentGetResultService<{
    navigations?: INavigationGetResultService[];
  }>;
} & IPagePropCommon;

class ComponentThemeNavbar extends ComponentHelperClass<
  IPageProps,
  IPageState
> {
  constructor(props: IPageProps) {
    super(props);
    this.state = {
      isNavbarSticky: false,
    };
  }

  componentDidMount() {
    this.setEvents();
  }

  setEvents() {
    window.addEventListener('scroll', () => this.onScrolling());
  }

  onScrolling() {
    if (window.scrollY > window.frames.innerHeight) {
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

  onShowDropdown = (navigationId: string, isShow: boolean) => {
    this.setState({
      [navigationId]: isShow,
    });
  };

  DropdownItem = (props: INavigationGetResultService, index: number) => {
    const children =
      this.props.component.customData?.navigations?.findMulti(
        'parentId._id',
        props._id
      ) ?? [];

    return children.length > 0 ? (
      this.Dropdown(props, index)
    ) : (
      <NavDropdown.Item
        key={props._id}
        href={UrlUtil.createHref({
          url: this.props.getURL,
          targetPath: props.contents?.url,
        })}
      >
        {props.contents?.title}
      </NavDropdown.Item>
    );
  };

  Dropdown = (props: INavigationGetResultService, index: number) => {
    const children =
      this.props.component.customData?.navigations?.findMulti(
        'parentId._id',
        props._id
      ) ?? [];

    return (
      <NavDropdown
        renderMenuOnMount={true}
        show={this.state[props._id]}
        key={props._id}
        title={props.contents?.title}
        drop={props.parentId ? 'end' : 'down'}
        onMouseEnter={(event) => this.onShowDropdown(props._id, true)}
        onMouseLeave={(event) => this.onShowDropdown(props._id, false)}
        onClick={(event) =>
          this.onShowDropdown(props._id, !this.state[props._id])
        }
      >
        {children.map((child, childIndex) =>
          this.DropdownItem(child, childIndex)
        )}
      </NavDropdown>
    );
  };

  NavItem = (props: INavigationGetResultService, index: number) => {
    if (props.parentId) return null;
    const children =
      this.props.component.customData?.navigations?.findMulti(
        'parentId._id',
        props._id
      ) ?? [];

    return children.length > 0 ? (
      this.Dropdown(props, index)
    ) : (
      <Nav.Item key={props._id}>
        <Nav.Link
          href={UrlUtil.createHref({
            url: this.props.getURL,
            targetPath: props.contents?.url,
          })}
        >
          {props.contents?.title}
        </Nav.Link>
      </Nav.Item>
    );
  };

  render() {
    return (
      <div
        className={`navbar-section ${this.state.isNavbarSticky ? 'scroll-on' : 'start-style'}`}
        id="navbar-section"
      >
        <div className="container">
          <Navbar expand="md" className="navbar-light">
            <Navbar.Brand
              href={UrlUtil.createHref({
                url: this.props.getURL,
                targetPath: '',
              })}
            >
              <h2>{this.props.appData.settings.seoContents?.title}</h2>
            </Navbar.Brand>
            <Navbar.Toggle aria-controls="#nav">
              <span className="navbar-toggler-icon"></span>
            </Navbar.Toggle>
            <Navbar.Collapse id="nav">
              <Nav>
                {this.props.component.customData?.navigations?.map(
                  (navigation, index) => this.NavItem(navigation, index)
                )}
              </Nav>
              <a
                className="btn btn-warning login-btn"
                href="http://localhost:3001/login"
              >
                {this.getComponentElementContents('buttonText')?.content}
              </a>
            </Navbar.Collapse>
          </Navbar>
        </div>
      </div>
    );
  }
}

ComponentThemeNavbar.initComponentServerSideProps = async (req, component) => {
  component.customData = {};

  component.customData.navigations =
    (
      await NavigationService.getMany({
        langId: req.appData.selectedLangId,
        statusId: StatusId.Active,
        isPrimary: true,
      })
    ).data ?? [];
};

export default ComponentThemeNavbar;
