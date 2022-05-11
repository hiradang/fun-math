export const SET_CURRENT_COURSE_NAME = 'SET_CURRENT_COURSE_NAME';
export const SET_USERNAME = 'SET_USERNAME';

export const setCurrentCourseName = (currentCourseName) => (dispatch) => {
  dispatch({
    type: SET_CURRENT_COURSE_NAME,
    payload: currentCourseName,
  });
};

export const setUsername = (username) => (dispatch) => {
  dispatch({
    type: SET_USERNAME,
    payload: username,
  });
};
