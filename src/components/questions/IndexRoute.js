import React from 'react';
import axios from 'axios';
import User from '../../lib/User';


class IndexRoute extends React.Component {

  state = {
    questions: [],
    moderated: true,
    admin: User.getUser().admin
  }

  componentDidMount() {
    axios.get('/api/questions')
      .then(res => this.setState({ questions: res.data }), console.log('hel', this.state));
  }

  handleVote = (e) => {
    console.log(e.target.value);
  }

  toggleMod = () => {
    this.setState({ moderated: !this.state.moderated});
    console.log(this.state);
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

                      {/* {this.state.admin && */}
                      { this.state.moderated ? (
                        <button onClick={this.toggleMod}>Approve</button>
                      ) : (
                        <button onClick={this.toggleMod}>Reject</button>
                      )
                      }
                      {/* } */}
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
