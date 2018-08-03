import React from 'react';
import DataCreate from "./DataCreate";
import DataRead from "./DataRead";
import DataUpdateDelete from "./DataUpdateDelete";

class App extends React.Component {

    render() {
        return (
            <div className="container">
            
                <DataCreate />
                <DataRead />
                <DataUpdateDelete />
            </div>
        );
    }
}

export default App