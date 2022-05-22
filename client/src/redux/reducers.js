import {
  SET_CURRENT_COURSE_NAME,
  SET_CURRENT_COURSE_ID,
  SET_USERNAME,
  SET_NAME,
  SET_PROFILE_PHOTO_PATH,
  SET_TOTAL_EXP,
} from './actions';

const initialState = {
  username: '',
  currentCourseName: 'Phép cộng',
};

function taskReducer(state = initialState, action) {
  switch (action.type) {
    case SET_CURRENT_COURSE_NAME:
      return { ...state, currentCourseName: action.payload };
    case SET_CURRENT_COURSE_ID:
      return { ...state, currentCourseId: action.payload };
    case SET_USERNAME:
      return { ...state, username: action.payload };
    case SET_NAME:
      return { ...state, name: action.payload };
    case SET_PROFILE_PHOTO_PATH:
      return { ...state, profilePhotoPath: action.payload };
    case SET_TOTAL_EXP:
      return { ...state, totalExp: action.payload };
    default:
      return state;
  }
}

export default taskReducer;
