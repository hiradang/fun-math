export const SET_CURRENT_COURSE_NAME = 'SET_CURRENT_COURSE_NAME';
export const SET_CURRENT_COURSE_ID = 'SET_CURRENT_COURSE_ID';

export const setCurrentCourseName = (currentCourseName) => (dispatch) => {
  dispatch({
    type: SET_CURRENT_COURSE_NAME,
    payload: currentCourseName,
  });
};

export const setCurrentCourseId = (currentCourseId) => (dispatch) => {
  dispatch({
    type: SET_CURRENT_COURSE_ID,
    payload: currentCourseId,
  });
};
