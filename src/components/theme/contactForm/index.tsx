import React, {Component} from "react";
import HandleForm from "library/react/handles/form";
import mailerService from "services/mailer.service";
import {PagePropCommonDocument} from "types/pageProps";
import { ComponentDocument } from "types/models/component";

type PageState = {
    component?: ComponentDocument;
    isSubmittingContactForm: boolean;
    isSuccessContactForm: boolean;
    formData: {
        contactForm: {
            name: string;
            email: string;
            phone: string;
            projectDetails: string;
        };
    };
};

type PageProps = {} & PagePropCommonDocument<{}>;

export default class ThemeContactForm extends Component<PageProps, PageState> {
    constructor(props: PageProps) {
        super(props);
        const component = this.props.pageData?.components?.findSingle("elementId", "contactForm");
        this.state = {
            component: component,
            isSubmittingContactForm: false,
            isSuccessContactForm: false,
            formData: {
                contactForm: {
                    name: "",
                    email: "",
                    phone: "",
                    projectDetails: "",
                },
            },
        };
    }

    close() {
        const envelope = document.getElementById("envelope");
        if (envelope != null) {
            envelope.classList.add("close");
            envelope.classList.remove("open");
            setTimeout(() => {
                envelope.classList.add("open");
                envelope.classList.remove("close");
            }, 2100);
        }
    }

    sleep(ms: number) {
        return new Promise((resolve) => setTimeout(resolve, ms));
    }

    async SuccessContactForm() {
        await this.sleep(2000);
        if (this.state.isSuccessContactForm == true) {
            const envelope = document.getElementById("envelope");
            const checkmark = document.getElementById("checkmark");
            this.close();
            if (envelope != null && checkmark != null) {
                setTimeout(() => {
                    envelope.classList.add("is-sent");
                }, 1000);
                setTimeout(() => {
                    envelope.classList.remove("is-sent");
                    checkmark.style.display = "block";
                }, 2000);
            }
        } else {
        }
    }

    async onSubmitContactForm(event: React.FormEvent) {
        event.preventDefault();
        let contactForm = this.props.appData.settings.contactForms?.findSingle(
            "key",
            "contact"
        );
        if (contactForm) {
            this.setState(
                {
                    isSubmittingContactForm: true,
                },
                async () => {
                    let message = `
                    <div>
                        <p>Name: <b>${this.state.formData.contactForm.name}</b></p>
                        <p>Email: <b>${this.state.formData.contactForm.email}</b></p>
                        <p>Phone: <b>${this.state.formData.contactForm.phone}</b></p>
                        <hr>
                        <p>Message: <i>${this.state.formData.contactForm.projectDetails}</i></p>
                    </div>
                `;

                    let resData = await mailerService.send({
                        email: this.state.formData.contactForm.email,
                        contactFormId: contactForm?._id || "",
                        message: message,
                    });

                    this.setState((state: PageState) => {
                        if (resData.status) {
                            state.isSuccessContactForm = true;
                        }
                        state.isSubmittingContactForm = false;
                        return state;
                    });
                }
            );
        }
    }

    render() {
        return (
            <section id="contactForm">
                <div className="col-lg-12">
                    {this.state.isSuccessContactForm == true ? (
                        <div>
                            <div className="text-center"><h1>Mesajınız Gönderildi! Teşekkür Ederiz!</h1></div>
                            <div className="envlope-wrapper">
                                <div id="envelope" className="open">
                                    <div className="front flap"></div>
                                    <div className="front pocket"></div>
                                    <div className="letter">
                                        <div className="words line1"></div>
                                        <div className="words line2"></div>
                                        <div className="words line3"></div>
                                        <div className="words line4"></div>
                                    </div>
                                    <div id="checkmark" className="checkmark draw"></div>
                                </div>
                            </div>
                        </div>
                    ) : (
                        <div className="wrapper">
                            <div className="row no-gutters">
                                <div className="col-md-12 align-items-stretch">
                                    <div className="contact-wrap w-100">
                                        <h1 className="text-center mb-4">
                                            {
                                                this.state.component?.types.findSingle(
                                                    "elementId",
                                                    "title"
                                                )?.contents?.content
                                            }
                                        </h1>
                                        <form
                                            className="contactForm"
                                            onSubmit={(event) => this.onSubmitContactForm(event)}
                                        >
                                            <div className="row">
                                                <div className="col-md-12">
                                                    <div className="form-group">
                                                        <input
                                                            name="contactForm.name"
                                                            className="form-control"
                                                            placeholder={
                                                                this.state.component?.types.findSingle(
                                                                    "elementId",
                                                                    "name"
                                                                )?.contents?.content
                                                            }
                                                            size={8}
                                                            type="text"
                                                            onChange={(event) =>
                                                                HandleForm.onChangeInput(event, this)
                                                            }
                                                        />
                                                    </div>
                                                </div>
                                                <div className="col-md-12">
                                                    <div className="form-group">
                                                        <input
                                                            name="contactForm.email"
                                                            className="form-control"
                                                            placeholder={
                                                                this.state.component?.types.findSingle(
                                                                    "elementId",
                                                                    "email"
                                                                )?.contents?.content
                                                            }
                                                            size={8}
                                                            type="email"
                                                            onChange={(event) =>
                                                                HandleForm.onChangeInput(event, this)
                                                            }
                                                        />
                                                    </div>
                                                </div>
                                                <div className="col-md-12">
                                                    <div className="form-group">
                                                        <input
                                                            name="contactForm.phone"
                                                            className="form-control"
                                                            maxLength={11}
                                                            placeholder={
                                                                this.state.component?.types.findSingle(
                                                                    "elementId",
                                                                    "phone"
                                                                )?.contents?.content
                                                            }
                                                            size={8}
                                                            type="text"
                                                            onChange={(event) =>
                                                                HandleForm.onChangeInput(event, this)
                                                            }
                                                        />
                                                    </div>
                                                </div>
                                                <div className="col-md-12">
                                                    <div className="form-group">
                            <textarea
                                name="contactForm.projectDetails"
                                className="form-control"
                                cols={30}
                                rows={6}
                                placeholder={
                                    this.state.component?.types.findSingle(
                                        "elementId",
                                        "message"
                                    )?.contents?.content
                                }
                                onChange={(event) =>
                                    HandleForm.onChangeInput(event, this)
                                }
                            />
                                                    </div>
                                                </div>
                                                <div className="col-md-12">
                                                    <div className="form-group">
                                                        <div className="alignCenter">
                                                            <button
                                                                type="submit"
                                                                className="btn btn-sendMessage"
                                                                disabled={this.state.isSubmittingContactForm}
                                                                onClick={() => this.SuccessContactForm()}
                                                            >
                                                                {
                                                                    this.state.component?.types.findSingle(
                                                                        "elementId",
                                                                        "submit"
                                                                    )?.contents?.content
                                                                }
                                                                {!this.state.isSubmittingContactForm ? (
                                                                    <span
                                                                        className="mdi mdi-arrow-right"
                                                                        aria-hidden="true"
                                                                    ></span>
                                                                ) : (
                                                                    <i className="fa fa-spinner fa-spin me-1"></i>
                                                                )}
                                                            </button>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </form>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </section>
        );
    }
}
