import { mapProps } from 'recompose';

export const omitProps = (...args) => mapProps((props) => omit());

export default omitProps;