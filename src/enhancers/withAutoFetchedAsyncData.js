import { compose } from 'recompose';
import withAsyncData from './withAsyncData';
import withAsyncFetch from './withAsyncFetch';
import autoFetchOnChange from './autoFetchOnChange';

const withAutoFetchedAsyncData = ({ name, fetch, requiredProps, allFetchProps }) => compose(
  withAsyncFetch({ name, fetch, requiredProps }),
  withAsyncData({ name }),
  autoFetchOnChange(allFetchProps)
);