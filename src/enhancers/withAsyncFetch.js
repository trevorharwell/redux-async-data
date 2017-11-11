import { compose, withHandler, defaultProps, withProps } from 'recompose';
import {
  fetchRequestStartAction,
  fetchRequestSuccessAction,
  fetchRequestFailureAction,
} from '../actions';
import allPropsDefined from '../utils';
import omitProps from './omitProps';

export const fetchFactory = ({ name, onFetchStart, onFetchSuccess, onFetchFailure, requiredProps }) => async (fetchProps) => {
  if (!allPropsDefined(fetchProps, requiredProps)) {
    return;
  }
  onFetchStart(name);
  try {
    const data = await fetch(fetchProps);
    onFetchSuccess(name, data);
  } catch (e) {
    onFetchFailure(name, e);
  }
};

const withAsyncFetch = ({ name: defaultName, fetch, requiredProps }) => compose(
  defaultProps({
    name: defaultName,
  }),
  withProps({
    requiredProps,
  }),
  connect(null, {
    onFetchStart: fetchRequestStartAction,
    onFetchSuccess: fetchRequestSuccessAction,
    onFetchFailure: fetchRequestFailureAction,
  }),
  withHandler({
    fetch: fetchFactory,
  }),
  omitProps('onFetchStart', 'onFetchSuccess', 'onFetchFailure', 'requiredProps'),
);

export default withAsyncFetch;