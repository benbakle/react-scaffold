import React from 'react';
import NavLink from './NavLink';
import './../assets/css/components/navigation.scss';

export default class Navigation extends React.Component {
    render() {
     
        return (
            <div className="navigation">
            <ul>
              <NavLink to="/" text="Home" />
              <NavLink to="/candidate" text="Candidate" />
            </ul>
          </div>
        );
    }
}
