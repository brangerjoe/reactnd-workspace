import React, { Fragment } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { connect } from 'react-redux';
import { handleInitialData } from '../actions/shared';
import Dashboard from './Dashboard';
import LoadingBar from 'react-redux-loading';
import TweetPage from './TweetPage';
import NewTweet from './NewTweet';
import Nav from './Nav';

class App extends React.Component {
    componentDidMount() {
        this.props.dispatch(handleInitialData());
    }

    render() {
        return (
            <Router>
                {/* Alternative to div, doesn't add element to the DOM */}
                <Fragment>
                <LoadingBar />
                <div className='container'>
                    <Nav />
                    {this.props.loading
                        ? 'Loading'
                        :
                        <div>
                            <Route path='/' exact component={Dashboard} />
                            <Route path='/tweet/:id' component={TweetPage} />
                            <Route path='/new' component={NewTweet} />
                        </div>}
                </div>
                </Fragment>
            </Router>
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