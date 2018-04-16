import React from 'react';
import axios from 'axios';

class Home extends React.Component {
  state = {
    question: '',
    submitted: false
  };

  handleChange = (e) => {
    this.setState({ question: e.target.value });
  }

  handleSubmit = (e) => {
    e.preventDefault();

    axios.post('/api/questions', this.state)
      .then(() => {
        this.setState({ question: '', submitted: true });
        setTimeout(() => this.setState({ submitted: false }), 3000);
      });
  }


  render(){
    return(
      <section>
        <h1 className="title">Welcome to the GAys!</h1>
        <p><small>(prounced GA-ees, you know, like the ESPYs)</small></p>
        <p>Ever had a yearbook with a superlatives section or seen any American high school movie? That&apos;s kind of what we&apos;re going for here.
        <br />
        You can submit your questions anonymously below and they will be moderated by us (you know who). On Friday 20th voting will open and we will reveal the results at the end of the day!
        <br />
        All questions must be in the form of a superlative e.g:
        </p>
        <ul>
          <li>Most likely to win the lottery</li>
          <li>Best style</li>
        </ul>
        <p>
        Have at it and don&apos;t be dicks!
        </p>
        <form onSubmit={this.handleSubmit}>
          <div className="field">
            <input className="input" value={this.state.question} onChange={this.handleChange} type="text" />
            <button className="button">Submit Question</button>
            {this.state.submitted && <p> Thanks for your submission!</p>}
          </div>
        </form>
      </section>
    );
  }
}

export default Home;
