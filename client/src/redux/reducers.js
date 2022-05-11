import { SET_CURRENT_COURSE_NAME, SET_CURRENT_COURSE_ID } from './actions';

const initialState = {
  currentCourseName: 'Phép cộng',
  currentCourseId: 1,
};

function taskReducer(state = initialState, action) {
  switch (action.type) {
    case SET_CURRENT_COURSE_NAME:
      return { ...state, currentCourseName: action.payload };
    case SET_CURRENT_COURSE_ID:
      return { ...state, currentCourseId: action.payload };
    default:
      return state;
  }
}

export default taskReducer;
