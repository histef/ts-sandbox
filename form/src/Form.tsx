import React, { Component, FormEvent } from 'react';
import { IFieldProps } from './Field';

/***** create interface for Context API*******/
export interface IFormContext extends IFormState {
  // function that allows values in the values state to be set ??
  // arrow function that returns void
  setValues: (values: IValues) => void;
}

/***** Context API*******/
/* 
 * have to create a new context (allows state and functions to be shared with Field)
 * We need to pass createContext a default value 'undefined' and therefore 'any' is unioned in the type
 */
export const FormContext = React.createContext<IFormContext | any>(undefined);

export interface IFields {
  [key: string]: IFieldProps;
}

interface IFormProps {
  //careful with semicolon -> 'action: string;' caused error, needed to change to 'action: sring,'
  //the http path(post?) the form will be posted to
  action: string,
  fields: IFields,
  // A prop which allows content to be injected ???
  render: () => React.ReactNode
}

// why is this one exported??
export interface IValues {
 /* Key value pairs for all the field values with key being the field name */
 [key: string] : any;
}

export interface IErrors {
  /* The validation error messages for each field (key is the field name */
  [key: string]: string;
}

export interface IFormState {
  /* The field values */
  values: IValues;
 
  /* The field validation error messages */
  errors: IErrors;
 
  /* Whether the form has been successfully submitted */
  submitSuccess?: boolean;
}

/**
 * Validates whether a field has a value
 * @param {IValues} values - All the field values in the form
 * @param {string} fieldName - The field to validate
 * @returns {string} - The error message
 */
export const required = (values: IValues, fieldName: string): string =>
  values[fieldName] === undefined ||
  values[fieldName] === null ||
  values[fieldName] === ""
    ? "This must be populated"
    : "";

/**
 * Validates whether a field is a valid email
 * @param {IValues} values - All the field values in the form
 * @param {string} fieldName - The field to validate
 * @returns {string} - The error message
 */
export const isEmail = (values: IValues, fieldName: string): string =>
  values[fieldName] &&
  values[fieldName].search(
    /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/
  )
    ? "This must be in a valid email format"
    : "";

/**
 * Validates whether a field is within a certain amount of characters
 * @param {IValues} values - All the field values in the form
 * @param {string} fieldName - The field to validate
 * @param {number} length - The maximum number of characters
 * @returns {string} - The error message
 */
export const maxLength = (
  values: IValues,
  fieldName: string,
  length: number
): string =>
  values[fieldName] && values[fieldName].length > length
    ? `This can not exceed ${length} characters`
    : "";
  

export class Form extends Component<IFormProps, IFormState> {
  // had to use constructor and super, state only didn't work for me with ts
  constructor(props: IFormProps){
    super(props);
    
    // have to declare variable with type for state object... 
    const errors: IErrors = {};
    const values: IValues = {};
    
    this.state = {
      errors: errors,
      values: values
    };
  }

  /**CONTEXT API
   * Stores new field values in state
   * @param {IValues} values - The new field values
   */
  private setValues = (values: IValues) => {
    this.setState({ values: { ...this.state.values, ...values} });
  }


  /**
   * Returns whether there are any errors in the errors object that is passed in
   * @param {IErrors} errors - The field errors
   */
  private haveErrors(errors: IErrors) {
    let haveError: boolean = false;
    Object.keys(errors).map((key: string) => {
      if (errors[key].length > 0) {
        haveError = true;
      }
    });
    return haveError;
  }

  /**
   * Executes the validation rules for all the fields on the form and sets the error state
   * @returns {boolean} - Whether the form is valid or not
   */
  private validateForm(): boolean {
    // TODO: validation conditions
    // why return true?? because it accepts type boolean. note: isn't state
    return true;
  }

  // arrow function
  // had to add "lib": ["es5", "dom", "es2015"] to tsconfig.js in order for Promise to work. Got error that said promise needed a contructor (??)
  private handleSubmit = async (e: FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault();

    console.log(this.state.values)
 
    if (this.validateForm()) {
      const submitSuccess: boolean = await this.submitForm();
      this.setState({ submitSuccess });
    }
  };

  private async submitForm(): Promise<boolean> {
    // TODO - submit the form
    return true;
  }

  // this.props.render just renders the injected content
  public render() {
    const { errors, submitSuccess } = this.state;
    const context: IFormContext = {
      ...this.state,
      setValues: this.setValues
    }

    //FormContxt.Provider goes at the top level component to pass state down. Where the data lives. Needs to have a 'value' prop
    return (
      <FormContext.Provider value={context}>
        <form onSubmit={this.handleSubmit} noValidate>
        {this.props.render()}
          <div className="form-group">
            <button
              type="submit"
              className="btn btn-primary"
              disabled={this.haveErrors(errors)}
            >
              Submit
            </button>
          </div>
          {submitSuccess && (
              <div className="alert alert-info" role="alert">
                The form was successfully submitted!
              </div>
            )}
            {submitSuccess === false &&
              !this.haveErrors(errors) && (
                <div className="alert alert-danger" role="alert">
                  Sorry, an unexpected error has occurred
                </div>
              )
            }
            {submitSuccess === false &&
              this.haveErrors(errors) && (
                <div className="alert alert-danger" role="alert">
                  Sorry, the form is invalid. Please review, adjust and try again
                </div>
              )
            }
        </form>
      </FormContext.Provider>
    )
  }
}