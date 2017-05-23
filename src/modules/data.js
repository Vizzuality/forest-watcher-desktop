import FileSaver from 'file-saver';
import { API_BASE_URL } from '../constants';

// Actions
const GET_USER_AREAS = 'areas/GET_AREAS';
const GET_USER_REPORTS = 'areas/GET_REPORTS';
const GET_USER_ANSWERS = 'areas/GET_USER_ANSWERS';

// Reducer
const initialState = {
  areas: [],
  reports: [],
  answers: []
};

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case GET_USER_AREAS:
      if (action.payload) {
        return Object.assign({}, state, { areas: action.payload });
      }
      return state;
    case GET_USER_REPORTS:
      if (action.payload.data) {
        return Object.assign({}, state, { reports: action.payload.data });
      }
      return state;
    case GET_USER_ANSWERS: {
      if (action.payload.id) {
        const answers = { ...state.answers };
        answers[action.payload.id] = action.payload.data;
        return Object.assign({}, state, { answers });
      }
      return state;
    }
    default:
      return state;
  }
}

export function getUserAreas() {
  const url = `${API_BASE_URL}/area`;
  return (dispatch, state) => {
    fetch(url, {
      headers: {
        Authorization: `Bearer ${state().user.token}`
      }
    })
      .then((response) => {
        if (response.ok) return response.json();
        throw Error(response.statusText);
      })
      .then((data) => {
        dispatch({
          type: GET_USER_AREAS,
          payload: data.data
        });
      })
      .catch((error) => {
        console.info(error);
        // To-do
      });
  };
}

export function getUserReports() {
  const url = `${API_BASE_URL}/questionnaire`;
  return (dispatch, state) => {
    fetch(url, {
      headers: {
        Authorization: `Bearer ${state().user.token}`
      }
    })
      .then((response) => {
        if (response.ok) return response.json();
        throw Error(response.statusText);
      })
      .then((data) => {
        dispatch({
          type: GET_USER_REPORTS,
          payload: data
        });
      })
      .catch((error) => {
        console.info(error);
        // To-do
      });
  };
}

export function getReportAnswers(reportId) {
  const url = `${API_BASE_URL}/questionnaire/${reportId}/answer`;
  return (dispatch, state) => {
    fetch(url, {
      headers: {
        Authorization: `Bearer ${state().user.token}`
      }
    })
      .then((response) => {
        if (response.ok) return response.json();
        throw Error(response.statusText);
      })
      .then((data) => {
        dispatch({
          type: GET_USER_ANSWERS,
          payload: {
            id: reportId,
            data: data.data
          }
        });
      })
      .catch((error) => {
        console.info(error);
        // To-do
      });
  };
}

export function downloadAnswers(reportId) {
  const url = `${API_BASE_URL}/questionnaire/${reportId}/download-answers`;
  try {
    const isFileSaverSupported = !!new Blob();
    if (isFileSaverSupported) {
      return (dispatch, state) => {
        fetch(url, {
          headers: {
            Authorization: `Bearer ${state().user.token}`
          }
        })
          .then((response) => {
            if (response.ok) return response.blob();
            throw Error(response.statusText);
          })
          .then((data) => {
            FileSaver.saveAs(data, `${reportId}-answers.csv`);
          })
          .catch((error) => {
            console.info(error);
            // To-do
          });
      };
    }
    return null;
  } catch (e) {
    console.warn('File download not supported');
    return null;
  }
}
