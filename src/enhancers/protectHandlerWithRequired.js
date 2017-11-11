import { invoke } from 'lodash';
import { compose, withHandlers } from 'recompose';

const protectHandlerWithRequired = (requiredPropNames, protectPropName) => compose(
  withHandlers({
    [protectPropName]: (props) => (...args) => {
      let allPropsDefined = true;
      for (let propName of requiredPropNames) {
        if (!props[propName]) {
          allPropsDefined = false;
          break;
        }
      }
      if (allPropsDefined) {
        invoke(props, protectPropName, ...args);
      }
    }
  })
);

export default protectHandlerWithRequired;