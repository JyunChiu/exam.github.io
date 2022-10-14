export const actionTypes = {
  COMMON___SWITCH_SIDE: 'COMMON___SWITCH_SIDE',
};

export function switchSide(key) {
  return {
    type: actionTypes.COMMON___SWITCH_SIDE,
    key
  };
}
