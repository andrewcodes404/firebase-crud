import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import thunk from 'redux-thunk';
// import { } from 'dotenv/config'

import registerServiceWorker from './registerServiceWorker';

import './style/style.css';
import reducers from './reducers'
import App from './components/App'
import NotFound from "./components/NotFound"

const createStoreWithMiddleware = applyMiddleware(thunk)(createStore);

const Routes = (
    <Provider store={createStoreWithMiddleware(reducers)}>
        <BrowserRouter>
            <div className="">
                <Switch>
                    <Route path="/" component={App} />
                    <Route component={NotFound} />
                </Switch>
            </div>
        </BrowserRouter>
    </Provider>
)

ReactDOM.render(Routes, document.querySelector('#root'));
registerServiceWorker();