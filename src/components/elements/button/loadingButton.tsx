import React, {Component} from 'react'

type IPageState = {
    isLoading: boolean
};

type IPageProps = {
    text?: string
    onClick?: () => void
    className?: string
    type?: "button" | "submit"
};

export default class ComponentLoadingButton extends Component<IPageProps, IPageState> {
    constructor(props: IPageProps) {
        super(props);
        this.state = {
            isLoading: false
        }
    }

    async onClick() {
        if(this.state.isLoading) return false;
        this.setState({
            isLoading: true
        }, async () => {
            if(this.props.onClick){
                await this.props.onClick();
            }
            this.setState({
                isLoading: false
            })
        })
    }

    render () {
        return (
            <button
                type={this.props.type ?? "button"}
                className={`${this.props.className ?? "btn btn-outline-primary btn-lg"}`}
                onClick={event => this.onClick()}
                disabled={this.state.isLoading}
            >
                <span>{this.props.text}</span>
                {
                    this.state.isLoading
                        ? (<i className="fa fa-spinner fa-spin ms-1"></i>)
                        : null
                }
            </button>
        )
    }
}
