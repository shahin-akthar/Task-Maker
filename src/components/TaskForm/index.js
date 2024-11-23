import React, { Component } from 'react';
import Popup from 'reactjs-popup';
import { FaPlus } from 'react-icons/fa';
import { ImCross } from 'react-icons/im';
import './index.css'

class TaskForm extends Component {
  state = { task: '', description: '', dueDate: '', status: '', setErrorMsg: '' };

  changeTask = (event) => {
    this.setState({ task: event.target.value, setErrorMsg: '' });
  };

  changeDescription = (event) => {
    this.setState({ description: event.target.value });
  };

  changeDate = (event) => {
    this.setState({ dueDate: event.target.value });
  };

  changeStatus = (event) => {
    this.setState({ status: event.target.value, setErrorMsg: '' });
  };

  addTask = (close) => {
    const { task, status, description, dueDate } = this.state;
    const { addTask } = this.props;

    if (task === '' || status === '') {
      this.setState({ setErrorMsg: '*Task and Status are required' });
      return;
    }

    const newTask = {
      task,
      description,
      dueDate,
      status,
    };

    addTask(newTask);
    this.setState({ task: '', description: '', dueDate: '', status: '', setErrorMsg: '' });
    close();
  };

  render() {
    return (
      <Popup modal trigger={<div className="btn-container"><button className="add-todo-btn">Add Todo <FaPlus className="plus-icon" /></button></div>}>
        {(close) => (
          <div className="add-todo-container">
            <ImCross className="cross-icon" onClick={close} />
            <h1 className="add">Add a Task</h1>
            <label className="label">*Task:</label>
            <input
              placeholder="Enter your task..."
              onChange={this.changeTask}
              type="text"
              className="input"
              value={this.state.task}
            />
            <label className="label">Description:</label>
            <textarea
              value={this.state.description}
              onChange={this.changeDescription}
              placeholder="Enter your description..."
              className="textarea"
            />
            <label className="label">Due Date:</label>
            <input
              onChange={this.changeDate}
              value={this.state.dueDate}
              placeholder="YYYY-MM-DD"
              type="text"
              className="input"
            />
            <label htmlFor="status" className="label">*Status:</label>
            <select
              onChange={this.changeStatus}
              value={this.state.status}
              className="input"
              id="status"
              name="status"
            >
              <option value="">Select Status</option>
              <option value="Completed">Completed</option>
              <option value="In Progress">In Progress</option>
              <option value="Pending">Pending</option>
            </select>
            <p className="error">{this.state.setErrorMsg}</p>
            <button onClick={() => this.addTask(close)} className="done-btn">Add</button>
          </div>
        )}
      </Popup>
    );
  }
}

export default TaskForm;
