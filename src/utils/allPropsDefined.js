

const allPropsDefined = (props, requiredPropNames) => {
  for (let propName of requiredPropNames) {
    if (!props[propName]) {
      return false;
    }
  }
  return true;
};

export default allPropsDefined;