import React from 'react';
import { connect } from 'react-redux';
import List from './List';
import { 
  handleAddTodo, 
  handleRemoveTodo, 
  handleToggleTodo } from '../actions/todos';

class Todos extends React.Component {
  addItem = (e) => {
    e.preventDefault();
    const name = this.input.value;

    this.props.dispatch(handleAddTodo(name, () => this.input.value = ''));
  }

  removeItem = (item) => {
    this.props.dispatch(handleRemoveTodo(item));
  }

  toggleItem = (item) => {
    this.props.dispatch(handleToggleTodo(item));
  }

  render() {
    return (
      <div>
        <h1>T</h1>
        <form onSubmit={this.addItem}>
          {/* Ref stores input in a variable */}
          <input type='text' placeholder='Enter an item' ref={(input) => this.input = input} />
          <button>Add</button>
        </form>
        <List content={this.props.todos} removeItem={this.removeItem} toggleItem={this.toggleItem} />
      </div>
    )
  }
}

// When this is imported it will be already be connected
// import Todos from '..'
export default connect((state) => ({
  todos: state.todos
}))(Todos);
