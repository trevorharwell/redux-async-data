import { pick, invoke } from 'lodash';
import { compose, lifecycle, withState } from 'recompose';
import shallowEqualProps from '../utils/shallowEqualProps';

const invokeGuardedFactory = (propNames, autoFetchPropName) => {
  let propMemory = null;

  return (props) => {
    let shouldInvoke = false;
    const isFirstInvoke = !propMemory;

    if (isFirstInvoke) {
      shouldInvoke = true;
    } else {
      shouldInvoke = shallowEqualProps(propMemory, props, propNames);
    }
    propMemory = props;

    if (shouldInvoke) {
      invoke(props, autoFetchPropName, pick(props, propNames));
    }
  };
};

const autoFetchOnChange = (propNames, autoFetchPropName = 'fetch') => {
  const invokeGuarded = invokeGuardedFactory(propNames, autoFetchPropName);

  return lifecycle({
    componentDidMount() {
      invokeGuarded(this.props);
    },
    componentWillReceiveProps(nextProps) {
      invokeGuarded(nextProps);
    },
  });
};

export default autoFetchOnChange;