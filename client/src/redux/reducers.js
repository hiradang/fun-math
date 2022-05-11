import { SET_CURRENT_COURSE_NAME } from './actions';
import { SET_USERNAME } from './actions';

const initialState = {
  username: '',
  currentCourseName: 'Phép cộng',
};

function taskReducer(state = initialState, action) {
  switch (action.type) {
    case SET_CURRENT_COURSE_NAME:
      return { ...state, currentCourseName: action.payload };
    case SET_USERNAME:
      return { ...state, username: action.payload };
    default:
      return state;
  }
}

export default taskReducer;
