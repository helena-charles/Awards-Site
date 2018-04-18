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

  handleApprove = (question) => {
    axios.put(`/api/questions/${question._id}`, {...question, moderated: true})
      .then(res => console.log(res));
  }

  handleReject = (question) => {
    axios.delete(`/api/questions/${question._id}`);
  }


  render() {
    const moderated = this.state.questions.filter(question => question.moderated);
    const unmoderated = this.state.questions.filter(question => !question.moderated);
    return (
      <section>
        <ul className="columns is-multiline">
          {moderated.map((question, i) =>
            <li key={i} className="column is-one-third">
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
            </li>
          )}
        </ul>
        {this.state.admin &&
        <div>
          <h2>unmoderated</h2>
          <ul className="columns is-multiline">
            {unmoderated.map((question, i) =>
              <li key={i} className="column is-one-third">
                <div>
                  <div className="card">
                    <div className="card-content">
                      <h1 className="title is-4">{question.question}</h1>
                      <section>
                        <button onClick={() => this.handleApprove(question)}>Approve</button>
                        <button onClick={() => this.handleReject(question)}>Reject</button>
                      </section>
                    </div>
                  </div>
                </div>
              </li>
            )}
          </ul>
        </div>
        }
      </section>
    );
  }
}

export default IndexRoute;
