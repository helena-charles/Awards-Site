import React from 'react';
import axios from 'axios';

class IndexRoute extends React.Component {

  state = {
    questions: []
  }

  componentDidMount() {
    axios.get('/api/questions')
      .then(res => this.setState({ questions: res.data }));
  }

  render() {
    return (
      <ul className="columns is-multiline">
        {this.state.questions.map((question, i) =>
          <li key={i} className="column is-one-third">
            <div className="card">
              <div className="card-content">
                <h1 className="title is-4">{question.question}</h1>
              </div>
            </div>
          </li>
        )}
      </ul>
    );
  }
}

export default IndexRoute;
