import { handleActions } from 'redux-actions';
import { actionTypes } from './CommonActions';
import { SIDE_KEY } from '~~features/consts';

const initialState = {
  sideKey: SIDE_KEY[0],
  adminInfo: {},
  memberInfo: {},
};

export default handleActions({

  [actionTypes.COMMON___SWITCH_SIDE]: (state, payload) => {
    const { key } = payload;
    return {
      ...state,
      sideKey: key
    };
  },

}, initialState);
