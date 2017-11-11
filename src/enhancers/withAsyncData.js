import { connect } from 'react-redux';
import { compose, defaultProps, lifecycle } from 'recompose';
import omitProps from './omitProps';
import {
  addDataConsumerAction,
  removeDataConsumerAction,
} from '../actions';
import {
  makeSelectLoading,
  makeSelectFetched,
  makeSelectData,
} from '../selectors';


const withAsyncData = ({ name: defaultName }) => compose(
  defaultProps({
    name: defaultName,
  }),
  connect((_, { name }) => createPropsSelector({
    loading: makeSelectLoading(name),
    error: makeSelectError(name),
    data: makeSelectData(name),
    fetched: makeSelectFetched(name),
  }), {
    addDataConsumer: addDataConsumerAction,
    removeDataConsumer: removeDataConsumerAction,
  }),
  lifecycle({
    componentWillMount() {
      this.props.addDataConsumer(this.props.name);
    },
    componentWillUnmount() {
      this.props.removeDataConsumer(this.props.name);
    }
  }),
  omitProps('addDataConsumer', 'removeDataConsumer')
);

export default withAsyncData;