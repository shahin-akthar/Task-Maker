import React, { Component } from 'react';
import Popup from 'reactjs-popup';
import { FaEdit } from 'react-icons/fa';
import { ImCross } from 'react-icons/im';

class Edit extends Component {
  state = {
    task: this.props.todo.task || '',
    description: this.props.todo.description || '',
    dueDate: this.props.todo.dueDate || '',
    status: this.props.todo.status || '',
    setErrorMsg: '',
  };

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

  editTodo = (onClose) => {
    const { task, description, dueDate, status } = this.state;
    const { id } = this.props.todo;
    const { updateTodo } = this.props;

    if (task === '' || status === '') {
      this.setState({ setErrorMsg: '*Task and Status are required' });
      return;
    }

    const updatedTodo = { id, task, description, dueDate, status };
    updateTodo(updatedTodo);

    // Reset state and close popup
    this.setState({ task: '', description: '', dueDate: '', status: '', setErrorMsg: '' });
    onClose();
  };

  render() {
    return (
      <Popup modal trigger={<FaEdit />}>
        {(onClose) => (
          <div className="add-todo-container">
            <ImCross className="cross-icon" onClick={onClose} />
            <h1 className="add">Edit Your Task</h1>
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
            <button onClick={() => this.editTodo(onClose)} className="done-btn">
              Save
            </button>
          </div>
        )}
      </Popup>
    );
  }
}

export default Edit;
