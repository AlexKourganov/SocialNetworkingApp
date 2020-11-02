import {
  SET_ERRORS,
  CLEAR_ERRORS,
  SETSIGNUP_ERRORS,
  SETLOGIN_ERRORS,
  LOADING_UI,
  STOP_LOADING_UI,
} from "../types";

const initialState = {
  loading: false,
  errors: null,
  serrors:null,
  lerrors:null
};

export default function (state = initialState, action) {
  switch (action.type) {
    case SET_ERRORS:
      return {
        ...state,
        loading: false,
        errors: action.payload,
      };
    case SETSIGNUP_ERRORS:
      return {
        ...state,
        loading: false,
        serrors: action.payload,
      };
    case SETLOGIN_ERRORS:
      return {
        ...state,
        loading: false,
        lerrors: action.payload,
      };
    case CLEAR_ERRORS:
      return {
        ...state,
        loading: false,
        errors: null,
        lerrors:null,
        serrors:null,
      };

    case LOADING_UI:
      return {
        ...state,
        loading: true,
      };
    case STOP_LOADING_UI:
      return {
        ...state,
        loading: false,
      };

    default:
      return state;
  }
}
