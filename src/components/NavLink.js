import React from 'react';
import { NavLink as ReactNavLink } from 'react-router-dom';

export default class NavLink extends React.Component {
    render() {
        const{to, text} = this.props;
        return (
            <li>
                <ReactNavLink to={to} activeClassName="active">
                    {text}
                </ReactNavLink>
            </li>
        );
    }
}
