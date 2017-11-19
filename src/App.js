import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

import db from './database/fakedatabase'

class App extends Component {
  render() {
    let users = db.users
    return (
      <div>
        <div className="App">
          <header className="App-header">
            <img src={logo} className="App-logo" alt="logo" />
            <h1 className="App-title">Welcome to React</h1>
          </header>
        </div>
        <div className="container">
          <div className="panel panel-default">
            <div className="panel-heading">
              <h4 className="panel-title">
                User List::
              </h4>
            </div>
            <table className="table table-striped table-bordered">
              <thead>
                <tr>
                  <th>#</th>
                  <th>name</th>
                  <th>age</th>
                  <th>email</th>
                </tr>
              </thead>
              <tbody>
                {users.map((user, index) =>
                  <tr key={user.id}>
                    <td>{index + 1}</td>
                    <td>{user.name}</td>
                    <td>{user.age}</td>
                    <td>{user.email}</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
