import React from 'react';
import ThemeContext from '../../contexts/themes';
import { Button } from '../Button/Button';
import history from '../../services/history';
import AuthenticationContext from '../../authentication/authentication-context';

export function ThemeToggle() {
    return (
        <ThemeContext.Consumer>
            {({ theme }) => (
                <>
                    <Button />
                    <div className="heading">
                        Currently using the <span className="uppercase">{theme}</span> theme
                    </div>
                    <AuthenticationContext.Consumer>
                        {({ user }) => (
                            <>
                                {
                                    user && user.isConnected() &&
                                    <>
                                        {user.details().name}(connected)
                                    </>
                                }
                                <button onClick={() => { history.push('/login') }}>Login</button>
                                <button onClick={() => { history.push('/logout') }}>Logout</button>

                            </>
                        )

                        }
                    </AuthenticationContext.Consumer>
                </>
            )}
        </ThemeContext.Consumer>
    )
}