import React, { useState } from "react";
import { ThemeContextConsumer } from './../contexts/themes';

export default function Button(props) {
    const [count, setCount] = useState(0);

    const checkToggle = callback => {
        if (count >= 5)
            return window.location = 'https://www.youtube.com/watch?v=oHg5SJYRHA0';

        setCount(count + 1);
        callback();
    }

    return (
        <ThemeContextConsumer>
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
        </ThemeContextConsumer>
    );
}