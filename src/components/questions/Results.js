import React from 'react';
import axios from 'axios';
// import User from '../../lib/User';


class Results extends React.Component {

  state = {
    questions: []
  }

  componentDidMount() {
    axios.get('/api/questions')
      .then(res => this.setState({ questions: res.data }), console.log('hel', this.state));
  }

  handleQuestion = (e) => {
    console.log(e.target.value);
  }


  render() {
    const members = {
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
                    <h1 className="title is-4">Winner: {question.votes[0]}</h1>
                    <img src={members[question.votes[0]]} />
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
