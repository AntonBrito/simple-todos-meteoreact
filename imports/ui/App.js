// Crate App Component
import React, { Component } from 'react';
// Modify App components to get tasks from collection
import ReactDOM from 'react-dom';

import { withTracker } from 'meteor/react-meteor-data';

import { Tasks } from '../api/tasks.js';

import Task from './Task.js';
import AccountsUIWrapper from './AccountsUIWrapper.js';

// App component - represent the whole app
class App extends Component {
    constructor(props) {
        super(props);

        this.state = {
          hideCompleted: false,
        };
    }

  handleSubmit(event) {
    event.preventDefault();
    
    // Find the text field via the React ref
    const text = ReactDOM.findDOMNode(this.refs.textInput).value.trim();

    Meteor.call('tasks.insert', text);
    // Tasks.insert({
    //     text,
    //     createdAt: new Date(), // current time
    // });

    // clear form
    ReactDOM.findDOMNode(this.refs.textInput).value = '';
  }
  // Add toggleHideComplete handler to App
  toggleHideCompleted() {
      this.setState({
        hideCompleted: !this.state.hideCompleted,
      });
  }

  renderTasks() {
    let filteredTasks = this.props.tasks;
    if (this.state.hideCompleted) {
      filteredTasks = filteredTasks.filter(task => !task.checked);
    }
    return filterdTasks.map((task) => (
      <Task key={task._id} task={task} />
    ));
   } 

    render() {
        return (
            <div className="container">
                <header>
                    <h1>Todo List ({this.props.incompleteCount})</h1>

                    <label className="hide-completed">
                      <input
                        type="checkbox"
                        readOnly
                        checked={this.state.hideCompleted}
                        onClick={this.toggleHideCompleted.bind(this)}
                      />
                      Hide Completed Tasks
                    </label>

                    <AccountsUIWrapper />
                    <form className="new-task" onSubmit={this.handleSubmit.bind(this)} >
                        <input
                          type="text"
                          ref="textInput"
                          placeholder="Type to add new tasks"
                         />
                    </form>
                </header>

                <ul>
                  {this.renderTasks()}
                </ul>
            </div>
        );
      }
    }
    export default withTracker(() => {
      return {
        tasks: Tasks.find({}, { sort: { createdAt: -1 } }).fetch(),
        imcompleteCouunt: Tasks.find({ checked: { $ne: true } }).count(),
      };
    })(App);