import React from 'react';
import { connect } from 'react-redux';
import Todos from './Todos';
import Goals from './Goals';
import { handleReceiveData } from '../actions/shared';

class App extends React.Component {
  componentDidMount() {
    this.props.dispatch(handleReceiveData());
  }

  render() {
    const { loading } = this.props;

    if (loading === true) {
      return <h3>Loading</h3>;
    }

    return (
      <div>
        <Todos />
        <Goals />
      </div>
    )
  }
}

export default connect((state) => ({
  loading: state.loading
}))(App);
