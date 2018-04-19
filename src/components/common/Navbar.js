import React from 'react';
import { Link, withRouter } from 'react-router-dom';

import Auth from '../../lib/Auth';
import axios from 'axios';

class Navbar extends React.Component {

  state = {
    navIsOpen: false,
    votingOpen: null
  }

  checkVotingStatus() {
    axios.get('/voting/voting-status')
      .then(response => response.data)
      .then(({votingOpen}) => {
        this.setState({
          votingOpen
        });
      });
  }

  handleToggle = () => {
    this.setState({ navIsOpen: !this.state.navIsOpen });
  }

  handleLogout = () => {
    Auth.logout();
    this.props.history.push('/');
  }

  componentWillUpdate() {
    this.state.navIsOpen && this.setState({ navIsOpen: false });
    this.checkVotingStatus();
  }

  render() {
    return (
      <nav className="navbar">
        <div className="navbar-brand">
          <Link className="navbar-item" to="/">
            <img src="../assets/images/ga-logo_gas.png" />
          </Link>
          <div
            className={`navbar-burger
              ${this.state.navIsOpen ? 'is-active' : ''}`}
            onClick={this.handleToggle}
          >
            <span></span>
            <span></span>
            <span></span>
          </div>
        </div>
        <div className={`navbar-menu ${this.state.navIsOpen ? 'is-active' : ''}`}>
          <div className="navbar-end">
            {this.state.votingOpen ? <Link className="navbar-item"
              to="/questions">Questions</Link>
              : <Link className="navbar-item"
                to="/results">Results</Link>}
            {Auth.isAuthenticated() && <a className="navbar-item" onClick={this.handleLogout}>Logout</a>}
            {!Auth.isAuthenticated() && <Link className="navbar-item" to="/login">Login</Link>}
            {!Auth.isAuthenticated() &&  <Link className="navbar-item" to="/register">Register</Link>}
          </div>
        </div>
      </nav>
    );
  }
}

export default withRouter(Navbar);//whats with router
