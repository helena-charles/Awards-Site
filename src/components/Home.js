import React from 'react';
import axios from 'axios';

class Home extends React.Component {
  state = {};

  handleChange = (e) => {
    this.setState({ question: e.target.value }, () => console.log(this.state));
  }

  handleSubmit = (e) => {
    e.preventDefault();

    axios.post('/api/questions', this.state)
      .then(res => console.log(res));
  }

  render(){
    return(
      <form onSubmit={this.handleSubmit}>
        <input onChange={this.handleChange} type="text" />
        <button>Submit Question</button>
      </form>
    );
  }
}

export default Home;
