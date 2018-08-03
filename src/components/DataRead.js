import React from 'react';
import { connect } from 'react-redux'
import { fetchDataAC, fetchItemAC } from '../actions'

class DataRead extends React.Component {

    componentDidMount() {
        this.props.fetchDataAC()
    }

    onClickFindItem = (key) => {
        this.props.fetchItemAC(key)
    }

    renderObject() {
        const data = this.props.data
        const theRender = []
        for (const key in data) {
            const name = data[key].name
            const likes = data[key].likes
            theRender.push(
                <div key={key} className="flex-row justify-between">
                    <p className="trans05 mr05">
                        {name} likes {likes}
                    </p>
                    <div>
                    <button onClick={()=>this.onClickFindItem(key)}> edit </button>
                    </div>
                </div>
            )
        }
        return (
            theRender
        )
    }

    render() {
        return (
            <div className="box box-read">
                <h2>Data <span className="crud">R</span>ead</h2>
                {this.renderObject()}
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        data: state.data,
        single: state.single
        
    }
}

export default connect(mapStateToProps, { fetchDataAC, fetchItemAC })(DataRead)