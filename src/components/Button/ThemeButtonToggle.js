import React, { useState } from "react";
import ThemeContext from '../../contexts/themes';

export default function ThemeButtonToggle(props) {
    const [count, setCount] = useState(0);

    const checkToggle = callback => {
        if (count >= 5)
            return window.location = 'https://www.youtube.com/watch?v=oHg5SJYRHA0';

        setCount(count + 1);
        callback();
    }

    return (
        <ThemeContext.Consumer>
            {({ theme, toggleTheme }) => (
                <button onClick={() => { checkToggle(toggleTheme) }}>
                    <span>Toggle to </span>
                    {
                        theme === "light" ?
                            <span role="img" aria-label="moon">🌚</span> :
                            <span role="img" aria-label="sun">🌞</span>
                    }
                </button>
            )}
        </ThemeContext.Consumer>
    );
}