import React from 'react';
import './../assets/css/components/candidates.scss';
import Api from '../services/api';
import RecordCount from './RecordCount';
import moment from 'moment';

export default class Candidates extends React.Component {
  constructor(props) {
    super(props);
    this.state = { candidates: null }
  }

  componentDidMount() {
    this.fetch();
  }

  fetch = () => {
    Api.fetch(`candidate`).then(this.load)
  }

  load = (data) => {
    this.setState({ candidates: data })
  }

  formatDate(date) {
    return moment(date).format("MMM DD, YYYY");
  }

  render() {
    const { candidates } = this.state;
    const { formatDate } = this;

    return (
      <div className="candidates">
        <div className="heading">Candidates</div>

        {candidates && <RecordCount count={candidates.length} />}

        {
          <div className="table">
            <div className="table-head">
              <div className="table-cell"><label>Login Id</label></div>
              <div className="table-cell"><label>Name</label></div>
              <div className="table-cell"><label>Email</label></div>
              <div className="table-cell"><label>Created</label></div>
              <div className="table-cell"><label>Modified</label></div>
              <div className="table-cell"><label></label></div>
            </div>
            {candidates && candidates.map((item, key) =>
              <div className="table-row" key={key}>

                <div className="table-cell" title={item.loginId}>{item.loginId}</div>
                <div className="table-cell" title={`${item.firstName} ${item.lastName}`}>
                  {`${item.firstName} ${item.lastName}`}
                </div>
                <div className="table-cell" title={item.emailAddress}>{item.emailAddress}</div>
                <div className="table-cell" title={formatDate(item.dateCreated)}>{formatDate(item.dateCreated)}</div>
                <div className="table-cell" title={formatDate(item.dateModified)}>{formatDate(item.dateModified)}</div>
                <div className="table-cell">
                  <button className="small">edit</button>
                </div>
              </div>
            )}
          </div>
        }

      </div>
    );
  }
}
