import React, { Component } from 'react';
import { IPagePropCommon } from 'types/pageProps';
import { ComponentHelperClass } from '@classes/componentHelper.class';
import { IComponentGetResultService } from 'types/services/component.service';

type IPageState = {};

type IPageProps = {} & IPagePropCommon;

export default class ComponentThemeSelectedComponents extends Component<
  IPageProps,
  IPageState
> {
  constructor(props: IPageProps) {
    super(props);
  }

  getElement = (component: IComponentGetResultService) => {
    let element = <div></div>;

    try {
      const ComponentClass = require(`components/theme/${component.key}`)
        .default as typeof ComponentHelperClass;
      element = <ComponentClass component={component} {...this.props} />;
    } catch (e) {}

    return element;
  };

  render() {
    return this.props.pageData?.privateComponents?.map((component) =>
      this.getElement(component)
    );
  }
}
