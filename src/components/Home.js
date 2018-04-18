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

        <div className="homepage-background">
        </div>

        <div className="homepage-wrapper">
          <h1>Welcome to..</h1>
          <img className="logo" src="../assets/images/ga-logo_gas.png" />
          <p className="prounced">(prounced GA-ees, you know, like the ESPYs)</p>
          <img className="award" src="../assets/images/awards-ga.gif" />
          <div className="homepage-copy">

            <p>Ever had a yearbook with a superlatives section or seen any American high school movie? That&apos;s kind of what we&apos;re going for here.
            <br /><br/>
            You can submit your questions anonymously below and they will be moderated by us (you know who). On Friday 20th voting will open and we will reveal the results at the end of the day!
            <br /><br/>
            All questions must be in the form of a superlative e.g:
            </p>
            <ul>
              <li className="examples">&apos;Most likely to win the lottery&apos;</li>
              <li className="examples">&apos;Best style&apos;</li>
            </ul>
            <p className="lastp">
            Have at it and don&apos;t be dicks!
            </p>
          </div>
          <form onSubmit={this.handleSubmit}>
            <div className="field">
              <input value={this.state.question} onChange={this.handleChange} type="text" placeholder="Enter your quesiton here..." />

              {this.state.submitted ?
                <button className="submittedconfirmation"> Thanks!</button>
                :
                <button> Submit Question</button>
              }

            </div>
          </form>
        </div>
      </section>
    );
  }
}

export default Home;
