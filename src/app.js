import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import Home from './components/Home';
import IndexRoute from './components/questions/IndexRoute';
import Admin from './components/questions/Admin';
import Navbar from './components/common/Navbar';

import Register from './components/auth/Register';
import Login from './components/auth/Login';

import './assets/scss/style.scss';


import 'bulma';

class App extends React.Component {
  render() {
    return (
      <BrowserRouter>
        <main className="container">
          <Navbar />
          <section>
            <Switch>
              <Route path="/questions/admin" component={Admin} />
              <Route path="/questions" component={IndexRoute} />
              <Route path="/register" component={Register} />
              <Route path="/login" component={Login} />
              <Route path="/" component={Home} />
            </Switch>
          </section>
        </main>
      </BrowserRouter>
    );
  }
}

ReactDOM.render(
  <App />,
  document.getElementById('root')
);
