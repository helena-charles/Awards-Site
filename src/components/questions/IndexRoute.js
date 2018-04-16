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

  handleVote = (e) => {
    console.log(e.target.value);
  }

  render() {
    return (
      <section>
        <ul className="columns is-multiline">
          {this.state.questions.map((question, i) =>
            <li key={i} className="column is-one-third">
              {question.moderated &&
                <div>
                  <div className="card">
                    <div className="card-content">
                      <h1 className="title is-4">{question.question}</h1>
                    </div>
                  </div>
                  <div>
                    <select onChange={this.handleVote}>
                      <option value="Helena">Helena</option>
                      <option value="Katie">Katie</option>
                      <option value="Jess">Jess</option>
                      <option value="Abi">Abi</option>
                    </select>
                    <button>Vote</button>
                  </div>
                </div>
              }
            </li>
          )}
        </ul>
      </section>
    );
  }
}

export default IndexRoute;
