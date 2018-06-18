import React, { Component } from 'react';
import { connect } from 'react-redux';
import { handleInitialData } from '../actions/shared';
import Dashboard from './Dashboard';
import LoadingBar from 'react-redux-loading';

class App extends Component {
    componentDidMount() {
        this.props.dispatch(handleInitialData());
    }

    render() {
        return (
            <div>
                <LoadingBar />
                {this.props.loading ? 'Loading' : <Dashboard />}
            </div>
        );
    }
}

const mapStateToProps = ({ authedUser }) => {
    return {
        loading: authedUser === null
    };
}

// We don't need anything from the state
export default connect(mapStateToProps)(App);