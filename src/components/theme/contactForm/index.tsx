import React from "react";
import {IPagePropCommon} from "types/pageProps";
import {ComponentHelperClass} from "@classes/componentHelper.class";
import {IComponentGetResultService} from "types/services/component.service";
import {AnimationOnScroll} from "react-animation-on-scroll";
import {VariableLibrary} from "@library/variable";
import {Button, Form} from "react-bootstrap";
import ComponentLoadingButton from "@components/elements/button/loadingButton";

type IPageState = {
    email: string
};

type IPageProps = {
    component: IComponentGetResultService;
} & IPagePropCommon;

class ComponentThemeContactForm extends ComponentHelperClass<IPageProps, IPageState> {
    constructor(props: IPageProps) {
        super(props);
        this.state = {
            email: ""
        }
    }

    async onClickSubscribe() {
        const isValidEmail = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g;

        if(
            VariableLibrary.isEmpty(this.state.email) ||
            !this.state.email.match(isValidEmail)
        ){
            return null;
        }

    }

    ContactFormMessage = () => {
        return (
            <div className="subscribe-success mt-3">
                <h5 className="animate__animated animate__fadeInUp">{this.getComponentElementContents("subscribeSuccessMessage")?.content?.replace("{{subscriberEmail}}", this.state.email)}</h5>
            </div>
        );
    }

    ContactForm = () => {
        return (
            <div>
                <Form>
                    <Form.Group className="mb-3">
                        <Form.Label>{this.getComponentElementContents("fullName")?.content}</Form.Label>
                        <Form.Control type="text" placeholder={this.getComponentElementContents("fullNameInput")?.content} required />
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label>{this.getComponentElementContents("email")?.content}</Form.Label>
                        <Form.Control type="email" placeholder={this.getComponentElementContents("emailInput")?.content} required />
                        <Form.Text className="text-muted">
                            {this.getComponentElementContents("emailShortContent")?.content}
                        </Form.Text>
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label>{this.getComponentElementContents("subject")?.content}</Form.Label>
                        <Form.Control type="text" placeholder={this.getComponentElementContents("subjectInput")?.content} required />
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label>{this.getComponentElementContents("message")?.content}</Form.Label>
                        <Form.Control as="textarea" rows={5} placeholder={this.getComponentElementContents("messageInput")?.content} required />
                    </Form.Group>
                    <ComponentLoadingButton
                        text={this.getComponentElementContents("submitButtonText")?.content}
                        className="btn btn-primary"
                        onClick={() => this.onClickSubscribe()}
                        type="submit"
                    />
                </Form>
            </div>
        );
    }

    render() {
        return (
            <section className="contact-form-section">
                <div className="container">
                    <this.ContactForm />
                </div>
            </section>
        );
    }
}

export default ComponentThemeContactForm;