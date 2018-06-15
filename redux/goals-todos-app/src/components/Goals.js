import React from 'react';
import { connect } from 'react-redux';
import List from './List';
import {
    handleAddGoal,
    handleRemoveGoal,
} from '../actions/goals';

class Goals extends React.Component {
    addItem = (e) => {
        e.preventDefault();
        const name = this.input.value;

        this.props.dispatch(handleAddGoal(name, () => this.input.value = ''));
    }

    removeItem = (item) => {
        this.props.dispatch(handleRemoveGoal(item));
    }

    render() {
        return (
            <div>
                <h1>G</h1>
                <form onSubmit={this.addItem}>
                    <input type='text' placeholder='Enter an item' ref={(input) => this.input = input} />
                    <button>Add</button>
                </form>
                <List content={this.props.goals} removeItem={this.removeItem} />
            </div>
        )
    }
}

export default connect((state) => ({
    goals: state.goals
}))(Goals);