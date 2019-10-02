import React from 'react';
import './../assets/css/components/instruments.scss';
import './../assets/css/layouts/table.scss';
import Api from '../services/api';
import RecordCount from './RecordCount';

export default class Instruments extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      tenantExternalId: '13c8c297-7e47-43f7-a1c1-d9f3ab92378e',
      instruments: [{ id: 1, name: "Ben" }, { id: 2, name: "Ben" }],
    }
  }

  componentDidMount() {
    //this.fetch();
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
            <input type="text" value={tenantExternalId} onChange={handleChange} name="tenantExternalId" />
          </div>
        </div>

        <div className="submit">
          <button onClick={fetch}>Update</button>
        </div>

        {instruments && <RecordCount count={instruments.length} />}

        {
          <div className="table">
            <div className="table-head">
              <div className="table-cell"><label>Id</label></div>
              <div className="table-cell"><label>Name</label></div>
            </div>
            {instruments && instruments.map((item, key) =>
              <div className="table-row" key={key}>
                <div className="table-cell">{item.id}</div>
                <div className="table-cell">{item.name}</div>
              </div>
            )}
          </div>
        }

      </div>
    );
  }
}
