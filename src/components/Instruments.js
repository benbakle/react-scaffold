import React from 'react';
import './../assets/css/components/instruments.scss';
import Api from '../services/api';
import RecordCount from './RecordCount';

export default class Instruments extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
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
    Api.fetch(`instrument`).then(this.load)
  }

  load = (data) => {
    this.setState({ instruments: data })
  }

  render() {
    const { instruments } = this.state;
    // const { fetch } = this;

    return (
      <div className="instruments">

        <div className="heading">Instruments</div>
        {/* <div className="submit">
          <button onClick={fetch}>Update</button>
        </div> */}

        {instruments && <RecordCount count={instruments.length} />}

        {
          <div className="table">
            <div className="table-head">
              <div className="table-cell"><label>Title</label></div>
              <div className="table-cell"><label>Description</label></div>
            </div>
            {instruments && instruments.map((item, key) =>
              <div className="table-row" key={key}>
                <div className="table-cell">{item.productTitle}</div>
                <div className="table-cell">{item.shortDescription}</div>
              </div>
            )}
          </div>
        }

      </div>
    );
  }
}
