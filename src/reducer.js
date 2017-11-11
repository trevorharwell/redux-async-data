import { fromJS } from 'immutable';
import {
  FETCH_REQUEST_START,
  FETCH_REQUEST_SUCCESS,
  FETCH_REQUEST_FAILURE,
  ADD_DATA_CONSUMER,
  REMOVE_DATA_CONSUMER
} from './constants';

export const createNamedApiReducer = () => {
  const initialState = fromJS({
    loading: false,
    fetched: false,
    consumerCount: 0,
  });

  return (state = initialState, action) => {
    switch (action.type) {
      case FETCH_REQUEST_START:
        return state
            .set('loading', true);
      case FETCH_REQUEST_SUCCESS:
        return state
            .set('data', action.data)
            .delete('error')
            .set('fetched', true)
            .set('loading', false);
      case FETCH_REQUEST_FAILURE:
        return state
            .set('error', action.error)
            .delete('data')
            .set('loading', false);
      case ADD_DATA_CONSUMER:
        return state
            .update('consumerCount', (consumerCount) => consumerCount + 1);
      case REMOVE_DATA_CONSUMER:
        return state
            .update('consumerCount', (consumerCount) => consumerCount - 1);
      default:
        return state;
    }
  };
}

export const createGlobalApiReducer = ({ namedReducerFactory = createNamedApiReducer } = {}) => {
  const initialState = fromJS({});
  const namedApiReducer = namedReducerFactory();

  return (state = initialState, action) => {
    switch (action.type) {
      case FETCH_REQUEST_START:
      case FETCH_REQUEST_SUCCESS:
      case FETCH_REQUEST_FAILURE:
      case ADD_DATA_CONSUMER:
      case REMOVE_DATA_CONSUMER:
        const substate = state.getIn(['named', action.name]);
        let nextState = state.setIn(['named', action.name], namedApiReducer(substate, action));

        if (action.type === REMOVE_DATA_CONSUMER && nextState.getIn(['named', action.name, 'consumerCount']) === 0) {
          nextState = state.deleteIn(['named', action.name]);
        }

        return nextState;
      default:
        return state;
    }
  };
}

export default createGlobalApiReducer;