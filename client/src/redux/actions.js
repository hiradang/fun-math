export const SET_CURRENT_COURSE_NAME = 'SET_CURRENT_COURSE_NAME';
export const SET_CURRENT_COURSE_ID = 'SET_CURRENT_COURSE_ID';
export const SET_USERNAME = 'SET_USERNAME';
export const SET_NAME = 'SET_NAME';
export const SET_PROFILE_PHOTO_PATH = 'SET_PROFILE_PHOTO_PATH';
export const SET_TOTAL_EXP = 'SET_TOTAL_EXP';

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

export const setUsername = (username) => (dispatch) => {
  dispatch({
    type: SET_USERNAME,
    payload: username,
  });
};

export const setName = (name) => (dispatch) => {
  dispatch({
    type: SET_NAME,
    payload: name,
  });
};

export const setProfilePhotoPath = (profilePhotoPath) => (dispatch) => {
  dispatch({
    type: SET_PROFILE_PHOTO_PATH,
    payload: profilePhotoPath,
  });
};

export const setTotalExp = (totalExp) => (dispatch) => {
  dispatch({
    type: SET_TOTAL_EXP,
    payload: totalExp,
  });
};
