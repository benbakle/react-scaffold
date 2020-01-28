import React, { useState } from "react";

const { Provider, Consumer } = React.createContext();

function ThemeContextProvider(props) {
    const [theme, setTheme] = useState("light");

    const toggleTheme = () => {
        setTheme(theme === "light" ? "dark" : "light");
    };

    const _value = {
        theme: !!props.value && props.value.theme || theme,
        toggleTheme
    };

    return (
        <Provider value={_value}>
            {props.children}
        </Provider>
    )
}

const ThemeContext = { Provider: ThemeContextProvider, Consumer };

export default ThemeContext;