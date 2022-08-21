import * as types from "./actionTypes";

const initialState = {
    users: [],
    user: {},
    message: ""
};

const userReducer = (state = initialState, action) => {
    switch (action.type) {
        case types.GET_USERS:
            return {
                ...state,
                users: action.payload,
            };
        case types.ADD_USER:
        case types.UPDATE_USER:
        case types.DELETE_USER:
            return {
                ...state,
                message: action.payload,
            };
        default:
            return state;
    }
};

export default userReducer;