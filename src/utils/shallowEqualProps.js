import { isEmpty } from 'lodash';

const shallowEqualProps = (currentProps, nextProps, propNames) => {
  if (isEmpty(propNames)) {
    propNames =  keys(nextProps);
  }
  for (let propName of propNames) {
    if (currentProps[propName] !== nextProps[propName]) {
      return false;
    }
  }
  return true;
};

export default shallowEqualProps;