import React from 'react';
import './../assets/css/components/record-count.scss';

export default class RecordCount extends React.Component {

    render() {
        const { count } = this.props;
        return (
            <div className="record-count">
                <label>record count: </label>
                <span>{count}</span>
            </div>
        );
    }
}
