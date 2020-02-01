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
                    <AuthenticationContext.Consumer>
                        {({ user }) => (
                            <>
                                {
                                    user && user.isConnected() &&
                                    <>
                                        <img src={user.details().picture.data.url} />
                                        <br />
                                        {user.details().name} 
                                        <br />
                                        connected
                                        <br />
                                        <button onClick={() => { history.push('/logout') }}>Logout</button>
                                    </>
                                }
                                {
                                    user && !user.isConnected() &&
                                    <button onClick={() => { history.push('/login') }}>Login</button>
                                }
                                <hr />
                            </>
                        )

                        }
                    </AuthenticationContext.Consumer>

                    <Button />
                    <div className="heading">
                        Currently using the <span className="uppercase">{theme}</span> theme
                    </div>
                </>
            )
            }
        </ThemeContext.Consumer >
    )
}