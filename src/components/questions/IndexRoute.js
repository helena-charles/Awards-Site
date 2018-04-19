import React from 'react';
import axios from 'axios';
import { Redirect } from 'react-router-dom';
import User from '../../lib/User';
import Auth from '../../lib/Auth';


class IndexRoute extends React.Component {

  state = {
    questions: [],
    moderated: true,
    votes: {},
    votingOpen: null
  }

  intervalInstance = null;

  getQuestions = () => {
    axios.get('/api/questions')
      .then(res => this.setState({ questions: res.data }));
  }

  checkVotingStatus() {
    axios.get('/voting/voting-status')
      .then(response => response.data)
      .then(({votingOpen}) => {
        if(votingOpen === false) {
          this.setState({
            votingOpen: false
          });
        }
      });
  }

  componentDidMount() {
    this.getQuestions();

    if (Auth.getPayload()) this.setState({ admin: User.getUser().admin });

    this.intervalInstance = setInterval(() => {
      this.checkVotingStatus();
    }, 2000);

  }

  componentWillUnmount() {
    clearInterval(this.intervalInstance);
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

  handleCloseVote = () => {
    axios.post('/voting',{
      votingOpen: false
    });
  }


  render() {
    const moderated = this.state.questions.filter(question => question.moderated);
    const unmoderated = this.state.questions.filter(question => !question.moderated);
    if (this.state.votingOpen === false) {
      return (<Redirect to="/results"/>);
    }
    return (
      <section>

        <div className="background">
        </div>
        <h1>GA Awards</h1>
        <p className="subtext">Submit your nominees below
        <br />
        All votes are anonymous, not even the admin can see who you voted for!
        </p>


        <ul className="columns is-multiline">
          {moderated.map((question, i) =>
            <li key={i} className="column is-one-third">
              <div>
                <div className="card">
                  <div className="card-content">
                    <h1 className="title is-4">{question.question}</h1>
                    {Auth.isAuthenticated() && !question.alreadyVoted.includes(Auth.getPayload().sub) && <form onSubmit={(e) => this.handleSubmit(e, question)}>
                      <select name={question._id} onChange={this.handleVote}>
                        <option value=""></option>
                        <option value="Helena">Helena</option>
                        <option value="Katie">Katie</option>
                        <option value="Jess">Jess</option>
                        <option value="Abi">Abi</option>
                      </select>
                      {this.state.questions.map(question => question.votingOpen === true) ?
                        <button>Submit</button>
                        :
                        <p>Voting is now closed.</p>
                      }
                    </form>
                    }
                    {question.alreadyVoted.includes(Auth.getPayload().sub) && <p>Thanks for voting!</p> }
                  </div>
                </div>
              </div>
            </li>
          )}
        </ul>
        {this.state.admin && Auth.isAuthenticated() &&
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
          <button onClick={this.handleCloseVote}>Close voting</button>
        </div>
        }
      </section>
    );
  }
}

export default IndexRoute;
