import {
  FETCH_REQUEST_START,
  FETCH_REQUEST_SUCCESS,
  FETCH_REQUEST_FAILURE,
  ADD_DATA_CONSUMER,
  REMOVE_DATA_CONSUMER,
} from './constants';

export const fetchRequestStartAction = (name) => ({
  type: FETCH_REQUEST_START,
  name,
});

export const fetchRequestSuccessAction = (name, data) => ({
  type: FETCH_REQUEST_SUCCESS,
  name,
  data,
});

export const fetchRequestFailureAction = (name, error) => ({
  type: FETCH_REQUEST_FAILURE,
  name,
  error,
});

export const addDataConsumerAction = (name) => ({
  type: ADD_DATA_CONSUMER,
  name,
});

export const removeDataConsumerAction = (name) => ({
  type: REMOVE_DATA_CONSUMER,
  name
});