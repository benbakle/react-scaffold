import React from 'react';
import './../assets/css/components/candidates.scss';
import Api from '../services/api';

export default class Candidates extends React.Component {
  constructor(props) {
    super(props);
    this.state = { candidates: null }
  }

  componentDidMount() {
    this.populateCandidates();
  }

  populateCandidates=() =>{
    Api.fetch('https://jsonplaceholder.typicode.com/todos/1', { method: 'GET' })
      .then(res => res.json())
      .then(this.loadCandidates)
  }

  loadCandidates=() =>{
    this.setState({ candidates: this.fakeResponse() })
  }

  fakeResponse=() =>{
    return [
      { firstName: "Richard" },
      { firstName: "Ben" },
      { firstName: "Alexa" },
      { firstName: "Luke" },
      { firstName: "Nelson" },
    ]
  }

  render() {
    const { candidates } = this.state;
    return (
      <div className="candidates">
        <div className="heading">Candidates</div>
        {
          candidates && candidates.length > 1 && candidates.map((item, key) =>
            <div key={key}>{`${key + 1}. `}{item.firstName}</div>
          )
        }
      </div>
    );
  }
}
