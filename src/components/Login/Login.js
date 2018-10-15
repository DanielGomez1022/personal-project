import React, { Component } from 'react';
import axios from 'axios';

class Login extends Component {
  state = {
    user: '',
    showRegister: false,
    message: null,
  };

  componentDidMount(){
    axios.get('/api/get_logged_in_user').then(res => {
      this.setState({user: res.data})
    })
  }
  getMessage = error => error.response
    ? error.response.data
      ? error.response.data.message
      : JSON.stringify(error.response.data, null, 2)
    : error.message;

  register = () => {
    this.setState({ message: null });
    const username = this.refs.username.value;
    const password = this.refs.password.value;
    const email = this.refs.email.value;
    const image = this.refs.image.value;
    axios.post('/register', {
      username,
      password,
      email,
      image,
    }).then(response => {
      this.setState({ user: response.data }, this.props.history.push('/profile'));
    }).catch(error => {
      this.setState({ message: 'Something went wrong: ' + this.getMessage(error) });
    });
  };
  
  
  login = () => {
    this.setState({ message: null });
    const username = this.refs.username.value;
    const password = this.refs.password.value;
    axios.post('/login', {
      username,
      password
    }).then(response => {
      this.setState({ user: response.data }, this.props.history.push('/profile'));
    }).catch(error => {
      this.setState({ message: 'Something went wrong: ' + this.getMessage(error) });
    });
  };

  logout = () => {
    axios.post('/logout').then(response => {
      this.setState({ user: null });
    }).catch(error => {
      this.setState({ message: 'Something went wrong: ' + this.getMessage(error) });
    });
  };


  render() {
    const { user, showRegister, message} = this.state;
    const userData = JSON.stringify(user, null, 2);
    const inputFields = <div>
      Username: <input ref="username" />
      {' '}
      Password: <input type="password" ref="password" />
      {' '}
    </div>
    console.log(this.state.user)
    return (
      <div className="App">
        <div className="App-intro">
          {!user && <div>
            <a href="javascript:void(0)" onClick={() => this.setState({ showRegister: false })}>Login</a>
            {' '}
            <a href="javascript:void(0)" onClick={() => this.setState({ showRegister: true })}>Register</a>
            <div className="login-or-register">
              {showRegister && <div>
                <h2>Register</h2>
                Username: <input ref = "username" />
                {' '}
                Password: <input ref = "password" type = "password"/>
                {' '}
                Picture: <input ref = "image"/>
                {' '}
                Email: <input ref = "email"/>
                {' '}
                <button onClick={this.register}>Register</button>
              </div>}
              {!showRegister && <div>
                <h2>Login</h2>
                {inputFields}
                <button  onClick={this.login}>Login</button>
              </div>}
              {message}
            </div>
          </div>}
          {user && <div className="user-info">
            <button onClick={this.logout}>Logout</button>
          </div>}
          </div>
        </div>
    );
  }
}

export default Login;
