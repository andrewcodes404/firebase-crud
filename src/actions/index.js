import firebase from "firebase/app";
import 'firebase/database'
import uuidv1 from "uuid/v1"

export const FETCH_DATA = 'FETCH_DATA'
export const CREATE_ITEM = 'CREATE_ITEM'
export const FETCH_ITEM = 'FETCH_ITEM'
export const RESET_INITIAL_STATE = 'RESET_INITIAL_STATE'
// export const DELETE_ITEM = 'DELETE_ITEM'

var config = {
    apiKey: process.env.REACT_APP_API_KEY,
    authDomain: process.env.REACT_APP_AUTHDOMIAN,
    databaseURL: process.env.REACT_APP_DB_URL,
    projectId: process.env.REACT_APP_PROJECT,
    storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
    messagingSenderId: process.env.REACT_APP_MESSY_ID
};
firebase.initializeApp(config);
var database = firebase.database();

export function fetchDataAC() {
    return dispatch => {
        database.ref().once('value')
            .then(snapshot => {
                dispatch({
                    type: 'FETCH_DATA',
                    payload: snapshot.val()
                })
            })
    }
}

export function createDataAC(values, callback) {
    const userId = uuidv1()
    ////is this running before before the dispatch is sent?
    //OR????//should i just use fetchDataAC in the callback
    values.id = userId;
    firebase.database().ref(userId).set(values)

    return dispatch => {
        database.ref().once('value')
            .then(snapshot => {
                dispatch({
                    type: 'FETCH_DATA',
                    payload: snapshot.val()
                })
            })
            .then(() => callback())
    }
}


export function fetchItemAC(id) {
    return dispatch => {
        database.ref(id).once('value')
            .then(snapshot => {
                console.log("snapshot.val() : ", snapshot.val());
                dispatch({
                    type: 'FETCH_ITEM',
                    payload: snapshot.val()
                })
            })
    }
}


export function updateItemAC(values, id, callback){
    firebase.database().ref(id).set(values)
    return dispatch => {
        database.ref().once('value')
            .then(snapshot => {
                dispatch({
                    type: 'FETCH_DATA',
                    payload: snapshot.val()
                })
            })
            .then(
                dispatch({
                    type: 'RESET_INITIAL_STATE'
                })
            )
            .then(() => callback())
    }
}

export function deleteItemAC(id) {
    firebase.database().ref(id).remove()
    return dispatch => {
        database.ref().once('value')
            .then(snapshot => {
                dispatch({
                    type: 'FETCH_DATA',
                    payload: snapshot.val()
                })
            })
            .then(
                dispatch({
                    type: 'RESET_INITIAL_STATE'
                })
            )            
    }
}