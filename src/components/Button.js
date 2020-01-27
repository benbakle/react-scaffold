import React from "react";
import { ThemeContextConsumer } from '../app-context/themeContext';

export default function Button(props) {
    return (
        <ThemeContextConsumer>
            {({ theme, toggleTheme }) => (
                <button onClick={toggleTheme}>
                    <span>Toggle to </span>
                    {
                        theme === "light" ?
                            <span role="img" aria-label="moon">🌚</span> :
                            <span role="img" aria-label="sun">🌞</span>
                    }
                </button>
            )}
        </ThemeContextConsumer>
    );
}