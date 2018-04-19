import React from 'react';
import axios from 'axios';
// import User from '../../lib/User';


class Results extends React.Component {

  state = {
    questions: [],
    winner: '',
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
        this.setState({ questions: res.data });
      });

    this.checkVotingStatus();
  }

  handleWin = (currentQuestion) => {
    const counts = {};
    let mostFrequent = '';
    for (let i = 0, length = currentQuestion.votes.length; i < length; i++){
      for (let j = 0, length = currentQuestion.votes[i].length; j < length; j++){
        const name = currentQuestion.votes[j];
        if(!counts[name]){
          counts[name] = 1;    //set count[name] value to 1
        } else{                  //if exists
          counts[name] = counts[name] + 1; //increment existing value
        }
        mostFrequent = Object.keys(counts).reduce((a, b) => counts[a] > counts[b] ? a : b);
      }
    }
    axios.post(`/api/questions/${currentQuestion._id}/winner`, { winner: mostFrequent })
      .then(() => {
        axios.get('/api/questions')
          .then(res => this.setState({ questions: res.data }))
          .then(() => {
            const updatedQuestion = { ...currentQuestion, flipped: true };
            const index = this.state.questions.findIndex(question => question._id === currentQuestion._id);

            const updatedQuestions = [ ...this.state.questions.slice(0, index), updatedQuestion, ...this.state.questions.slice(index + 1)];
            this.setState({ questions: updatedQuestions });
          });
      });
  }




  render() {
    const mates = {
      'Reena': '/assets/images/reena.jpg',
      'Tom': '/assets/images/thomas.jpg',
      'George': '/assets/images/george.png',
      'Jess': '/assets/images/jess.png',
      'Katie': '/assets/images/katie.jpg',
      'Aimee': '/assets/images/aimee.jpg',
      'Fabian': '/assets/images/fabian.jpg',
      'Abi': '/assets/images/abi.jpg',
      'Sui': '/assets/images/sui.png',
      'Nick': '/assets/images/nick.jpg',
      'Mark': '/assets/images/mark.jpg',
      'Mike': '/assets/images/mike.png',
      'Helena': '/assets/images/helena.png',
      'Fabienne': '/assets/images/fabienne.png',
      'Paula': '/assets/images/paula.jpg',
      'Amir': '/assets/images/amir.png'
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
          <p>This page is not open yet</p>
        }

      </section>
    );
  }
}

export default Results;
