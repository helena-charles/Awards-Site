import React from 'react';
import axios from 'axios';

class Admin extends React.Component {

  state = {
    moderated: false,
    questions: []
  }

  componentDidMount() {
    axios.get('/api/questions')
      .then(res => this.setState({ questions: res.data }), console.log(this.state.questions));
  }

  toggleMod = () => {
    this.setState({ moderated: !this.state.moderated});
  }
  render(){
    return(
      <section>
        <h1>Hello</h1>
        <button onClick={this.toggleMod}>Moderated</button>
      </section>
    );
  }
}

export default Admin;
