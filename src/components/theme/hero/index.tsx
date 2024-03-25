import React from "react";
import Image from "next/image";
import {IComponentModel} from "types/models/component.model";
import {IPagePropCommon} from "types/pageProps";
import {ImageSourceUtil} from "utils/imageSource.util";
import {ComponentHelperClass} from "classes/componentHelper.class";
import Thread from "library/thread";

type IPageState = {
    carouselTitleList: string[]
    carouselTitle: string
    isTyping: boolean
};

type IPageProps = {
    component: IComponentModel;
} & IPagePropCommon;

export default class ComponentThemeHero extends ComponentHelperClass<IPageProps, IPageState> {
    constructor(props: IPageProps) {
        super(props);
        this.state = {
            carouselTitleList: [
                this.getComponentElementContents("title1")?.content ?? "",
                this.getComponentElementContents("title2")?.content ?? "",
                this.getComponentElementContents("title3")?.content ?? "",
                this.getComponentElementContents("title4")?.content ?? ""
            ],
            carouselTitle: this.getComponentElementContents("title1")?.content ?? "",
            isTyping: false
        }
    }

    async componentDidMount() {
        this.initCarouselTitle();
    }

    async initCarouselTitle() {
        let i = 1;
        while (i < this.state.carouselTitleList.length) {
            await Thread.sleep(1500);
            await this.onTypeSentence(this.state.carouselTitleList[i]);
            await Thread.sleep(1500);
            await this.onDeleteSentence();

            i++;
            if (i == this.state.carouselTitleList.length) {
                i = 0;
            }
        }
    }

    async onTypeSentence(sentence: string) {
        await new Promise(resolve => {
            this.setState({
                isTyping: true,
                carouselTitle: ""
            }, () => resolve(1))
        });

        const letters = sentence.split("");
        let i = 0;
        while (i < letters.length) {
            await Thread.sleep(100);
            await new Promise(resolve => {
                this.setState({
                    carouselTitle: this.state.carouselTitle + letters[i]
                }, () => resolve(1))
            })
            i++;
        }

        await new Promise(resolve => {
            this.setState({
                isTyping: false
            }, () => resolve(1))
        });
    }

    async onDeleteSentence() {
        await new Promise(resolve => {
            this.setState({
                isTyping: true
            }, () => resolve(1))
        });

        const letters = this.state.carouselTitle.split("");
        while (letters.length > 0) {
            await Thread.sleep(100);
            letters.pop();
            await new Promise(resolve => {
                this.setState({
                    carouselTitle: letters.join("")
                }, () => resolve(1))
            })
        }

        await new Promise(resolve => {
            this.setState({
                isTyping: false
            }, () => resolve(1))
        });
    }

    render() {
        return (
            <section className="hero-section" id="hero-section">
                <div className="container">
                    <div className="row d-flex">
                        <div className="col-lg-8 order-lg-2">
                            <div className="position-relative img-container">
                                <Image
                                    src={ImageSourceUtil.getUploadedImageSrc(this.getComponentElementContents("image")?.content)}
                                    alt={this.getComponentElementContents("title1")?.content ?? ""}
                                    className="img-fluid"
                                    height={500}
                                    width={500}
                                />
                            </div>
                        </div>
                        <div className="col-lg-4 pe-lg-5 m-auto">
                            <div className="type">
                                <h1 className={`font ${this.state.isTyping ? "typing" : ""}`} id="feature-text">
                                    {this.state.carouselTitle}
                                </h1>
                            </div>
                            <p className="lead">{this.getComponentElementContents("describe")?.content}</p>
                            <a href="#blogs" className="btn btn-primary btn-lg w-100 mt-3">
                                <span>{this.getComponentElementContents("buttonText")?.content}</span>
                            </a>
                        </div>
                    </div>
                </div>
            </section>
        );
    }
}
