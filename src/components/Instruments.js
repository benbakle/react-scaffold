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
    this.fetch();
  }

  handleChange = (e) => {
    this.setState({ [e.target.name]: e.target.value })
  }

  fetch = () => {
    Api.fetch(`${this.state.tenantExternalId}/instrument`)
      .then(this.load)
  }

  load = (data) => {
    this.setState({ instruments: data })
  }

  render() {
    const { instruments, tenantExternalId } = this.state;
    const { handleChange, fetch } = this;

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
          <button onClick={fetch}>Update</button>
        </div>

        {
          instruments &&
          <div className="record-count">
            <label>record count:</label>
            {instruments.length}
          </div>
        }

        {
          <ul>
            {instruments && instruments.map((item, key) =>
              <li key={key}>{item.id}</li>
            )}
          </ul>
        }

      </div>
    );
  }
}
