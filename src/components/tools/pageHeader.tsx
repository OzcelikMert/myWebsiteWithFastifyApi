import React, {Component} from 'react'

type PageState = {};

type PageProps = {
    title: string
};

export default class ComponentPageHeader extends Component<PageProps, PageState>  {
    constructor(props: PageProps) {
        super(props);
        this.state = {};
    }

    render() {
        return (
            <div
                className="container-fluid page-header background py-1 mb-5 wow fadeIn"
                data-wow-delay="0.1s"
            >
                <div className="container text-center py-5">
                    <h1 className="display-3 mb-4 brand animated slideInDown">{this.props.title.toUpperCase()}</h1>
                </div>
            </div>
        )
    }
}
