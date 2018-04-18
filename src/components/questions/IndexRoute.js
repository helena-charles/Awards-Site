import React from 'react';
import axios from 'axios';
import User from '../../lib/User';
import Auth from '../../lib/Auth';


class IndexRoute extends React.Component {

  state = {
    questions: [],
    moderated: true,
    votes: {}
  }

  getQuestions = () => {
    axios.get('/api/questions')
      .then(res => this.setState({ questions: res.data }));
  }

  componentDidMount() {
    this.getQuestions();

    if (Auth.getPayload()) this.setState({ loggedIn: true, admin: User.getUser().admin });
    else this.setState({ loggedIn: false });
  }

  handleVote = (e) => {
    const { name, value } = e.target;
    const updatedVotes = {...this.state.votes};
    updatedVotes[name] = value;
    this.setState({ votes: updatedVotes });
  }

  handleSubmit = (e, question) => {
    e.preventDefault();

    axios.post(`/api/questions/${question._id}/votes`, this.state, {
      headers: { Authorization: `Bearer ${Auth.getToken()}`}
    })
      .then(() => this.getQuestions());
  }

  handleApprove = (question) => {
    axios.put(`/api/questions/${question._id}`, {...question, moderated: true})
      .then(() => this.getQuestions());
  }

  handleReject = (question) => {
    axios.delete(`/api/questions/${question._id}`)
      .then(() => this.getQuestions());
  }


  render() {
    const moderated = this.state.questions.filter(question => question.moderated);
    const unmoderated = this.state.questions.filter(question => !question.moderated);
    return (
      <section>

        <div className="background">
        </div>
        <h1>GA Awards</h1>
        <p className="subtext">Submit your nominees below</p>

        <ul className="columns is-multiline">
          {moderated.map((question, i) =>
            <li key={i} className="column is-one-third">
              <div>
                <div className="card">
                  <div className="card-content">
                    <h1 className="title is-4">{question.question}</h1>
                    {this.state.loggedIn && !question.alreadyVoted.includes(Auth.getPayload().sub) && <form onSubmit={(e) => this.handleSubmit(e, question)}>
                      <select name={question._id} onChange={this.handleVote}>
                        <option value=""></option>
                        <option value="Helena">Helena</option>
                        <option value="Katie">Katie</option>
                        <option value="Jess">Jess</option>
                        <option value="Abi">Abi</option>
                      </select>
                      <button>Submit</button>
                    </form>
                    }
                    {question.alreadyVoted.includes(Auth.getPayload().sub) && <p>Thanks for voting!</p> }
                  </div>
                </div>
              </div>
            </li>
          )}
        </ul>
        {this.state.admin && this.state.loggedIn &&
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
