import { fromJS } from 'immutable';

export const makeSelectApiDomain = () => createGetSelector(
  identity,
  'api',
  fromJS({})
);

export const makeSelectNameApiDomain = (name) => createGetSelector(
  makeSelectApiDomain(),
  name,
  fromJS({})
);

export const makeSelectLoading = (name) => createGetSelector(
  makeSelectNameApiDomain(name),
  'loading',
  false
);

export const makeSelectFetched = (name) => createGetSelector(
  makeSelectNameApiDomain(name),
  'fetched',
  false
);

export const makeSelectData = (name) => createGetSelector(
  makeSelectNameApiDomain(name),
  'data'
);

export const makeSelectError = (name) => createGetSelector(
  makeSelectNameApiDomain(name),
  'error'
);