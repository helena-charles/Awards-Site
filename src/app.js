import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import Home from './components/Home';

import 'bulma';

class App extends React.Component {
  render() {
    return (
      <BrowserRouter>
        <main className="container">
          <Switch>
            <Route path="/" component={Home} />
          </Switch>
        </main>
      </BrowserRouter>
    );
  }
}

ReactDOM.render(
  <App />,
  document.getElementById('root')
);
