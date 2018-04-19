import React from 'react';
import axios from 'axios';
import User from '../../lib/User';
import Flash from '../../lib/Flash';
import Auth from '../../lib/Auth';

class Login extends React.Component {

  state = {}

  handleChange = (e) => {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  }
  handleSubmit = (e) => {
    e.preventDefault();
    axios.post('/api/login', this.state)
      .then(res => {
        Auth.setToken(res.data.token);
        User.setUser(res.data.user);
      })
      .then(() => Flash.setMessage('success', 'Welcome!'))
      .then(() => this.props.history.push('/'));
  }

  render() {
    return (
      <section className="login">
        <div className="background">
        </div>
        <h1>Login</h1>
        <form className="form" onSubmit={this.handleSubmit}>
          <div className="field">

            <input className="login-input"
              placeholder="Email"
              name="email"
              onChange={this.handleChange}
            />
          </div>
          <div className="field">
            <input
              className="login-input"
              placeholder="Password"
              name="password"
              type="password"
              onChange={this.handleChange}
            />
          </div>
          <button className="login-button">Login</button>
        </form>
      </section>
    );
  }
}
export default Login;
