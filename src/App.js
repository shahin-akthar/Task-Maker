import React, { Component } from 'react';
import TasksList from './components/TasksList';
import TaskForm from './components/TaskForm';
import './App.css'

class App extends Component {
  state = { tasks: [] };

  componentDidMount() {
    const savedTasks = JSON.parse(localStorage.getItem('tasks')) || [];
    this.setState({ tasks: savedTasks });
  }

  updateTodo = updatedTask => {
    const { tasks } = this.state;
    const updatedTasks = tasks.map(task =>
      task.id === updatedTask.id ? updatedTask : task
    );
    this.setState({ tasks: updatedTasks }, this.saveTasksToLocalStorage);
  };

  addTask = newTask => {
    const { tasks } = this.state;
    newTask.id = Date.now(); 
    const updatedTasks = [...tasks, newTask];
    this.setState({ tasks: updatedTasks }, this.saveTasksToLocalStorage);
  };

  deleteTask = taskId => {
    const updatedTasks = this.state.tasks.filter(task => task.id !== taskId);
    this.setState({ tasks: updatedTasks }, this.saveTasksToLocalStorage);
  };

  saveTasksToLocalStorage = () => {
    const { tasks } = this.state;
    localStorage.setItem('tasks', JSON.stringify(tasks));
  };

  render() {
    const {tasks} = this.state
    return (
      <div className="bg-container">
        <h1 className='heading'>Tasks Maker</h1>
        <p className='text'>Get Things Done, One Todo at a Time!</p>
        <TaskForm addTask={this.addTask} />
        <h1 className='to-do'>Your tasks to do!</h1>
        <ul className="todos-ul">
        {tasks.length === 0 ? (
            <p className='no-tasks'>Your task list is empty! Time to plan something amazing.</p>
          ) : (
            tasks.map((each) => (
              <TasksList
                key={each.id} 
                todo={each} 
                updateTodo={this.updateTodo} 
                onDelete={this.handleDelete} 
              />
            ))
          )}
         
        </ul>
      </div>
    );
  }
}

export default App;
