import React, { useState } from "react";
import { useTheme } from "../theme-context";

export default function ThemeButtonToggle(props) {
    const [count, setCount] = useState(0);
    const { theme, toggleTheme } = useTheme();


    const checkToggle = () => {
        if (count >= 5)
            return window.location = 'https://www.youtube.com/watch?v=oHg5SJYRHA0';

        setCount(count + 1);
        toggleTheme();
    }

    return (
        <button onClick={checkToggle}>
            <span>Toggle to </span>
            {
                theme === "light" ?
                    <span role="img" aria-label="moon">🌚</span> :
                    <span role="img" aria-label="sun">🌞</span>
            }
        </button>
    );
}