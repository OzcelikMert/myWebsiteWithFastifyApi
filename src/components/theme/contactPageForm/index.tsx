import React, { FormEvent } from 'react';
import { IPagePropCommon } from 'types/pageProps';
import { ComponentHelperClass } from '@classes/componentHelper.class';
import { IComponentGetResultService } from 'types/services/component.service';
import { VariableLibrary } from '@library/variable';
import { Form } from 'react-bootstrap';
import ComponentLoadingButton from '@components/elements/button/loadingButton';
import { MailerService } from '@services/mailer.service';
import { HandleFormLibrary } from '@library/react/handles/form';

type IPageState = {
  isSending: boolean;
  isSuccessful: boolean;
  formData: {
    name: string;
    email: string;
    subject: string;
    message: string;
  };
};

type IPageProps = {
  component: IComponentGetResultService;
} & IPagePropCommon;

class ComponentThemeContactPageForm extends ComponentHelperClass<
  IPageProps,
  IPageState
> {
  constructor(props: IPageProps) {
    super(props);
    this.state = {
      isSuccessful: false,
      isSending: false,
      formData: {
        name: '',
        subject: '',
        email: '',
        message: '',
      },
    };
  }

  async onSubmit(event: FormEvent) {
    event.preventDefault();

    const isValidEmail = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g;

    if (
      VariableLibrary.isEmpty(
        this.state.formData.email,
        this.state.formData.subject,
        this.state.formData.name,
        this.state.formData.message
      ) ||
      !this.state.formData.email.match(isValidEmail)
    ) {
      return null;
    }

    this.setState(
      {
        isSending: true,
      },
      async () => {
        const serviceResult = await MailerService.send({
          email: this.state.formData.email,
          message: this.getMailMessage,
          key: this.props.component.key,
        });

        if (serviceResult.status) {
          this.setState({
            isSuccessful: true,
          });
        }

        this.setState({
          isSending: false,
        });
      }
    );
  }

  get getMailMessage() {
    return `
            <b>Local Time: </b> ${new Date()} </br>
            <b>Name: </b> ${this.state.formData.name} </br>
            <b>Email: </b> ${this.state.formData.email} </br>
            <b>Subject: </b> ${this.state.formData.subject} </br>
            <hr>
            <b>Message: </b> </br> </br>
            ${this.state.formData.message}
        `;
  }

  ContactFormSuccessMessage = () => {
    return (
      <div>
        <h5 className="text-success animate__animated animate__fadeInUp">
          {this.getComponentElementContents('successMessage')?.content}
        </h5>
      </div>
    );
  };

  ContactForm = () => {
    return (
      <div>
        <Form onSubmit={(event) => this.onSubmit(event)}>
          <Form.Group className="mb-3">
            <Form.Label>
              {this.getComponentElementContents('fullName')?.content}
            </Form.Label>
            <Form.Control
              type="text"
              placeholder={
                this.getComponentElementContents('fullNameInput')?.content
              }
              name="formData.name"
              value={this.state.formData.name}
              onChange={(e) => HandleFormLibrary.onChangeInput(e, this)}
              required
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>
              {this.getComponentElementContents('email')?.content}
            </Form.Label>
            <Form.Control
              type="email"
              placeholder={
                this.getComponentElementContents('emailInput')?.content
              }
              name="formData.email"
              value={this.state.formData.email}
              onChange={(e) => HandleFormLibrary.onChangeInput(e, this)}
              required
            />
            <Form.Text className="text-muted">
              {this.getComponentElementContents('emailShortContent')?.content}
            </Form.Text>
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>
              {this.getComponentElementContents('subject')?.content}
            </Form.Label>
            <Form.Control
              type="text"
              placeholder={
                this.getComponentElementContents('subjectInput')?.content
              }
              name="formData.subject"
              value={this.state.formData.subject}
              onChange={(e) => HandleFormLibrary.onChangeInput(e, this)}
              required
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>
              {this.getComponentElementContents('message')?.content}
            </Form.Label>
            <Form.Control
              as="textarea"
              rows={5}
              placeholder={
                this.getComponentElementContents('messageInput')?.content
              }
              name="formData.message"
              value={this.state.formData.message}
              onChange={(e) => HandleFormLibrary.onChangeInput(e, this)}
              required
            />
          </Form.Group>
          <ComponentLoadingButton
            text={this.getComponentElementContents('submitButtonText')?.content}
            className="btn btn-primary"
            type="submit"
            isLoading={this.state.isSending}
          />
        </Form>
      </div>
    );
  };

  render() {
    return (
      <section className="contact-form-section">
        <div className="container">
          {this.state.isSuccessful
            ? this.ContactFormSuccessMessage()
            : this.ContactForm()}
        </div>
      </section>
    );
  }
}

export default ComponentThemeContactPageForm;
