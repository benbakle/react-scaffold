import React from 'react';
import './../assets/css/components/instruments.scss';
import Api from '../services/api';

export default class Instruments extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      tenantExternalId: '13c8c297-7e47-43f7-a1c1-d9f3ab92378e',
      instruments: null,
    }
  }

  componentDidMount() {
    this.populateInstruments();
  }

  handleChange = (e) => {
    this.setState({ [e.target.name]: e.target.value })
  }

  update = () => {
    this.populateInstruments();
  }

  populateInstruments = () => {
    Api.fetch(`${this.state.tenantExternalId}/instrument`)
      .then(this.loadCandidates)
  }

  loadCandidates = (res) => {
    this.setState({ candidates: res })
  }

  render() {
    const { instruments, tenantExternalId } = this.state;
    const { handleChange, update } = this;

    return (
      <div className="instruments">

        <div className="heading">Instruments</div>
        <div className="entry">
          <div className="control-wrapper">
            <label>Tenant ID: </label>
            <input type="text" value={tenantExternalId} onChange={handleChange} name="tenantExternalId"></input>
          </div>
        </div>

        <div className="submit">
          <button onClick={update}>Update</button>
        </div>

        {
          instruments &&
          <div className="record-count">
            <label>record count:</label>
            {instruments.length}
          </div>
        }

        {
          instruments && instruments.map((item, key) =>
            <div key={key}>{item.id}</div>
          )
        }

      </div>
    );
  }
}
