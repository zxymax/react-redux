import { CHANGE_MESSAGE } from './actionTypes';

const defaultState = {
  inputMessage: '请输入你的行程',
  list: [
    { id: 1, title: '早晨 6 点起床' },
    { id: 2, title: '早晨 7 吃完早饭' },
    { id: 3, title: '早晨 8 点学习' },
    { id: 4, title: '早晨 11 点做午饭' },
    { id: 5, title: '早晨 13 点午休' }
  ]
}

export default (state = defaultState, action) => {
  if (action.type === CHANGE_MESSAGE) {
    let newState = JSON.parse(JSON.stringify(state));
    newState.inputMessage = action.value;
    console.log(action.value)
    return newState;
  }
  return state;
}
