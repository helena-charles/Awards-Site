import React from 'react';
import axios from 'axios';
// import User from '../../lib/User';


class Results extends React.Component {

  state = {
    questions: [],
    winner: ''
  }

  componentDidMount() {
    axios.get('/api/questions')
      .then(res => this.setState({ questions: res.data }));
  }

  handleQuestion = (e) => {
    console.log(e.target.value);
  }


  handleWin = (question) => {
    const counts = {};
    let mostFrequent = '';
    for (let i = 0, length = question.votes.length; i < length; i++){
      for (let j = 0, length = question.votes[i].length; j < length; j++){
        const name = question.votes[j];
        if(!counts[name]){
          counts[name] = 1;    //set count[name] value to 1
        } else{                  //if exists
          counts[name] = counts[name] + 1; //increment existing value
        }
        mostFrequent = Object.keys(counts).reduce((a, b) => counts[a] > counts[b] ? a : b);
      }
    }
    axios.post(`/api/questions/${question._id}/winner`, { winner: mostFrequent })
      .then(() => {
        axios.get('/api/questions')
          .then(res => this.setState({ questions: res.data }, () => console.log(this.state)));
      });
  }




  render() {
    const mates = {
      'Reena': '/assets/images/Reena.jpg',
      'Tom': '/assets/images/Thomas.jpg',
      'George': '/assets/images/George.png',
      'Jess': '/assets/images/jess.png',
      'Katie': '/assets/images/Katie.jpg',
      'Aimee': '/assets/images/Aimee.jpg',
      'Fabian': '/assets/images/Fabian.jpg',
      'Abi': '/assets/images/Abi.jpg',
      'Sui': '/assets/images/Sui.png',
      'Nick': '/assets/images/.jpg',
      'Mark': '/assets/images/.jpg',
      'Mike': '/assets/images/Mike.png',
      'Helena': '/assets/images/Helena.png',
      'Fabienne': '/assets/images/Fab.png',
      'Paula': '/assets/images/Paula.jpg',
      'Amir': '/assets/images/Amir.png'
    };
    return (
      <section>
        <h1 className="title">And the winner is...</h1>

        <ul className="columns is-multiline">
          {this.state.questions.map((question, i) =>
            <li key={i} className="column is-one-third">
              <div>
                <div className="card">
                  <div className="card-content">
                    <h1 className="title is-4">Title: {question.question}</h1>
                    <h1 className="title is-4">Winner: </h1>
                    <img src={mates[question.winner]} />
                    <button onClick={() => this.handleWin(question)}> {question.winner} </button>
                  </div>
                </div>
              </div>
            </li>
          )}
        </ul>
      </section>
    );
  }
}

export default Results;
