import React from 'react';
import NavLink from './NavLink';
import './../assets/css/components/navigation.scss';

export default class Navigation extends React.Component {
  render() {

    return (
      <div className="navigation-trigger">
        <div className="navigation">
          <ul>
            <NavLink to="/instrument" text="Instruments" />
            <NavLink to="/candidate" text="Candidates" />
          </ul>
        </div>
      </div>
    );
  }
}
