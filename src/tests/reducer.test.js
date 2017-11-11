import { fromJS } from 'immutable';
import { createFetchRequestAction } from '../actions';
import createApiStateReducer from '../reducer';

describe('createApiStateReducer', () => {
  let reducer;
  let state;
  beforeEach(() => {
    reducer = createApiStateReducer();
    state = fromJS({});
  });
  it('handles the initial state', () => {
    expect(reducer(undefined, {})).toEqual(state);
  });
  // it('handles createFetchRequestAction', () => {
  //   const action = createFetchRequestAction();

  // });
});