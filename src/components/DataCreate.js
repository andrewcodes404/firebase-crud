import React from 'react';
import { Field, reduxForm } from 'redux-form'
import { connect } from 'react-redux';
import { createDataAC } from '../actions'

class DataCreate extends React.Component {

    onFormSubmit = (values) => {
        console.log("values : ", values);
        this.props.createDataAC(values, () => {
            ///this is the callback fn from the AC
            this.props.reset()
        });
    }

    renderTextField = (field) => {
        return (
            <div className="field-cont">
                <div className="text-field">
                    <label>{field.label}</label>
                    <input {...field.input} type="text" className="" />
                </div>
                <div className="error-cont">
                    <span className="error">{field.meta.touch ? field.meta.error : ""}</span>
                </div>
            </div>
        )
    }

    render() {

        return (
            <div className="box  box-create">
                <div className="box-inner">
                    <h2>Data <span className="crud">C</span>reate</h2>

                    <form onSubmit={this.props.handleSubmit(this.onFormSubmit)}>
                        <Field name="name" component={this.renderTextField} label="name: " />
                        <Field name="likes" component={this.renderTextField} label="likes: " />
                        <div className="btn-cont">
                            <button type="submit">submit</button>
                        </div>
                    </form>
                </div>
            </div>
        );
    }
}

///decorating component with reduxForm

function validate(values) {
    //define our object 
    const errors = {}

    // ---> validate the inputs from 'values' an erros appended to the error{obj}
    if (!values.name) {
        errors.name = "enter a name!"
    }

    if (!values.likes) {
        errors.likes = "enter likes!"
    }
    if (values.likes && values.likes.length >= 18) {
        errors.likes = "too long... 18 characters max"
    }

    //if errors is empty the form is fine to submit
    //if errors has any values, redux assumes form invalid
    return errors
}

DataCreate = reduxForm({
    validate,
    form: 'dataForm'
})(DataCreate)

export default connect(null, { createDataAC })(DataCreate)