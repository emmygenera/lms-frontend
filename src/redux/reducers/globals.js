import { SET_PATH } from '../types';

const initialState = {
    paths: []
};

export default function (state = initialState, action) {
    switch (action.type) {
        case SET_PATH: {
            return { ...state, paths: action.payload }
        }
        default: return state;
    }

}