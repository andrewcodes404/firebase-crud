import React from 'react';
import {connect } from 'react-redux'
import { deleteItemAC } from '../actions'

class DataDelete extends React.Component {

    onDeleteBtnClick=()=>{
        const id = this.props.single.id
        this.props.deleteItemAC(id)
    }

    render() {
        return (
            <div className="box box-delete">
                <h2>DataDelete</h2>
                <p className="">
                    {this.props.single.name} {this.props.single.likes ? "likes " + this.props.single.likes : ""}
                </p>
                <div className="text-center mt05">
                {this.props.single.likes ? <button onClick={this.onDeleteBtnClick}>delete</button> : ""}
                </div>
            </div>
        );
    }
}


function mapStateToProps(state) {
    return {
        single: state.single
    }
}

export default connect (mapStateToProps, {deleteItemAC})(DataDelete)