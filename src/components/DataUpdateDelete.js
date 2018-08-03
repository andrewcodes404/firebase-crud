import React from 'react';
import { connect } from 'react-redux'
import { Field, reduxForm } from 'redux-form'
import { updateItemAC, deleteItemAC } from '../actions'

class DataUpdate extends React.Component {

    onUpdateFormSubmit = (values) => {
        this.props.updateItemAC(values, values.id, () => {
            this.props.reset();
        })
    }

    onDeleteBtnClick = () => {
        const id = this.props.single.id
        this.props.deleteItemAC(id)
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
        const { handleSubmit } = this.props
        const single = this.props.single
        return (
            <div className="box  box-update">
                <h2>Data <span className="crud">U</span>pdate</h2>
                <form onSubmit={handleSubmit(this.onUpdateFormSubmit)}>
                    <Field name="name" component={this.renderTextField} label="name: " />
                    <Field name="likes" component={this.renderTextField} label="likes: " />
                    <div className="btn-cont">
                        <button type="submit">submit</button>
                    </div>
                </form>
                <br />
                <h2>Data <span className="crud">D</span>elete</h2>
                <p className="">
                    {single.name} {single.likes ? "likes " + single.likes : ""}
                </p>
                <div className="text-center mt05">
                    {single.likes ? <button onClick={this.onDeleteBtnClick}>delete</button> : ""}
                </div>

            </div>
        );
    }
}

function validate(values) {
    //define our object 
    const errors = {}
    // ---> validate the inputs from 'values', erros appended to the error{obj}
    if (!values.name) {
        errors.name = "enter a name! "
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





// https://redux-form.com/7.4.2/examples/initializefromstate/

function mapStateToProps(state) {
    return {
        single: state.single,
        //redux-form will auto fill the form values from whaterver is in the state 'initialValues'
        initialValues: state.single
    }
}

// decorate our comp in the HOC Form
// as we do so we config enableReinitialize to 'true' this will aloow the form values to change
DataUpdate = reduxForm({
    validate,
    form: 'updateForm',
    enableReinitialize: true
})(DataUpdate)

export default connect(mapStateToProps, { updateItemAC, deleteItemAC })(DataUpdate)