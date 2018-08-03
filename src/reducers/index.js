import { combineReducers } from 'redux';
import DataReducer from './reducerData';
import SingleReducer from "./reducerSingle";
import { reducer as formReducer } from 'redux-form';

const rootReducer = combineReducers({
    data: DataReducer,
    single: SingleReducer,
    form: formReducer
});

export default rootReducer;