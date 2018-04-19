import React from 'react';
import axios from 'axios';
// import User from '../../lib/User';
import _ from 'lodash';


class Results extends React.Component {

  state = {
    questions: [],
    votingOpen: false
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

  componentDidMount() {
    axios.get('/api/questions')
      .then(res => {
        res.data = res.data.filter(question => question.moderated);
        res.data = _.orderBy(res.data, [question => question.question.toLowerCase()], ['asc']);
        this.setState({ questions: res.data });
      });

    this.checkVotingStatus();
  }

  handleWin = (currentQuestion) => {
    const counts = {};
    let mostFrequent = '';
    currentQuestion.votes.forEach(name => {
      if(!counts[name]){
        counts[name] = 1;    //set count[name] value to 1
      } else {                  //if exists
        counts[name] = counts[name] + 1; //increment existing value
      }
    });
    mostFrequent = Object.keys(counts).reduce((a, b) => counts[a] > counts[b] ? a : b);

    axios.post(`/api/questions/${currentQuestion._id}/winner`, { winner: mostFrequent })
      .then(() => {
        axios.get(`/api/questions/${currentQuestion._id}`)
          .then(res => {
            const updatedQuestion = { ...res.data, flipped: true };
            const index = this.state.questions.findIndex(question => question._id === res.data._id);

            let updatedQuestions = [ ...this.state.questions.slice(0, index), updatedQuestion, ...this.state.questions.slice(index + 1)];
            updatedQuestions = updatedQuestions.filter(question => question.moderated);
            updatedQuestions = _.orderBy(updatedQuestions, [question => question.question.toLowerCase()], ['asc']);
            this.setState({ questions: updatedQuestions }, () => {
            });
          });
      });
  }




  render() {
    const mates = {
      'Reena': '../assets/images/Reena.jpg',
      'Tom': '../assets/images/thomas.jpg',
      'George': '../assets/images/george.jpg',
      'Jess': '../assets/images/Jessica.jpg',
      'Katie': '../assets/images/Katie.jpg',
      'Aimee': '../assets/images/Aimee.jpg',
      'Fabian': '../assets/images/Fabian.jpg',
      'Abi': '../assets/images/Abi.jpg',
      'Sui': '../assets/images/sui.jpg',
      'Nick': '../assets/images/nick.jpg',
      'Mark': '../assets/images/mark.jpg',
      'Mike': '../assets/images/mike.jpg',
      'Helena': '../assets/images/helena.jpg',
      'Fabienne': '../assets/images/fabienne.jpg',
      'Paula': '../assets/images/paula.jpg',
      'Amir': '../assets/images/amir.jpg'
    };
    return (
      <section>
        {!this.state.votingOpen ?
          <div>
            <div className="background"></div>

            <h1>And the winner is...</h1>

            <ul className="columns is-multiline">
              {this.state.questions.map((question, i) =>
                <li key={i} className="column is-one-third">
                  <div>
                    <div id="f1_container"  className={question.flipped ? 'flipped shadow': 'shadow'}>
                      <div id="f1_card"  className={question.flipped ? 'flipped shadow': 'shadow'}>
                        <div className="front face">
                          <div className="card winner-card">
                            <div className="card-content">
                              <h1 className="title is-4"> {question.question}</h1>
                              <img className="award" src="../assets/images/awards-ga.gif" />
                              <button onClick={() => this.handleWin(question)}>Reveal Winner!</button>
                            </div>
                          </div>
                        </div>
                        <div className="back face center">
                          <img className="winnner-image" src={mates[question.winner]} />
                        </div>
                      </div>
                    </div>
                  </div>
                </li>
              )}
            </ul>
          </div>
          :
          <div>
            <div className="background"></div>
            <h1>This page is not open yet!</h1>
          </div>
        }

      </section>
    );
  }
}

export default Results;
