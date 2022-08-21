import * as types from "./actionTypes";
import axios from "axios"

const API = "http://127.0.0.1:5000"

const getUsers = (users) => ({
    type: types.GET_USERS,
    payload: users
});

const userAdded = (message) => ({
    type: types.ADD_USER,
    payload: message
})

const userDeleted = (message) => ({
    type: types.DELETE_USER,
    payload: message
})

const userUpdated = (message) => ({
    type: types.UPDATE_USER,
    payload: message
})


export const loadUsers = () => {
    return function(dispatch) {
        axios
        .get(`${API}/users`)
        .then((resp) => dispatch(getUsers(resp.data)))
        .catch(err => console.log(err))
    }
}

export const addUser = (user) => {
    return function(dispatch) {
        axios
        .post(`${API}/users`, user)
        .then((resp) => {
            dispatch(userAdded(resp.data.message));
            dispatch(loadUsers());
        })
        .catch(err => console.log(err))
    }
}

export const deleteUser = (id) => {
    return function(dispatch) {
        axios
        .delete(`${API}/users/${id}`)
        .then((resp) => {
            dispatch(userDeleted(resp.data.message));
            dispatch(loadUsers());
        })
        .catch(err => console.log(err))
    }
}

export const updateUser = (user, id) => {
    return function(dispatch) {
        axios
        .put(`${API}/users/${id}`, user)
        .then((resp) => {
            dispatch(userUpdated(resp.data.message));
            dispatch(loadUsers());
        })
        .catch(err => console.log(err))
    }
}
