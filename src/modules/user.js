import { replace } from 'react-router-redux';
import { setUserChecked } from './app';

// Actions
const GET_USER = 'user/GET_USER';
const SET_LOGIN_MODAL = 'user/SET_LOGIN_MODAL';
const SET_LOGIN_STATUS = 'user/SET_LOGIN_STATUS';
const CHECK_USER_LOGGED = 'user/CHECK_USER_LOGGED';
export const LOGOUT = 'user/LOGOUT';

// Reducer
const initialState = {
  data: {},
  loggedIn: false,
  token: null
};

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case CHECK_USER_LOGGED:
      return Object.assign({}, state, { ...action.payload });
    case GET_USER: {
      if (action.payload.data) {
        const user = action.payload.data.attributes;
        user.id = action.payload.data.id;
        return Object.assign({}, state, { data: user });
      }
      return state;
    }
    case SET_LOGIN_STATUS: {
      return Object.assign({}, state, {
        loggedIn: action.payload.loggedIn,
        token: action.payload.token
      });
    }
    case LOGOUT:
      return initialState;
    default:
      return state;
  }
}

// Action Creators
export function checkLogged(tokenParam) {
  const url = `${process.env.REACT_APP_API_AUTH}/auth/check-logged`;
  return (dispatch, state) => {
    const user = state().user;
    const token = tokenParam || user.token;
    const auth = `Bearer ${token}`;
    const route = state().routing.locationBeforeTransitions.pathname || '/';
    fetch(url, {
      headers: {
        Authorization: auth
      }
    })
      .then(response => {
        if (response.ok) return response.json();
        throw Error(response.statusText);
      })
      .then((data) => {
        dispatch({
          type: CHECK_USER_LOGGED,
          payload: { data, token, loggedIn: true }
        });

        if (tokenParam) {
          const params = state().routing.locationBeforeTransitions.query;
          const query = { ...params, token: undefined };
          dispatch(replace({ pathname: route, query }));
        } else if (route === '/') {
          dispatch(replace('/dashboard'));
        }
        dispatch(setUserChecked());
      })
      .catch((error) => {
        if (user.loggedIn) {
          dispatch({
            type: LOGOUT
          });
        }
        dispatch(replace('/'));
        dispatch(setUserChecked());
      });
  };
}

export function getUser() {
  const url = `${process.env.REACT_APP_API_AUTH}/user`;
  return (dispatch, state) => {
    fetch(url, {
      headers: {
        Authorization: `Bearer ${state().user.token}`
      }
    })
      .then(response => {
        if (response.ok) return response.json();
        throw Error(response.statusText);
      })
      .then((data) => {
        dispatch({
          type: GET_USER,
          payload: data
        });
      })
      .catch((error) => {
        console.info(error);
        // To-do
      });
  };
}

export function setLoginStatus(status) {
  return {
    type: SET_LOGIN_STATUS,
    payload: status
  };
}

export function logout() {
  return (dispatch) => {
    dispatch({
      type: LOGOUT
    });
    dispatch(replace('/'));
  };
}
