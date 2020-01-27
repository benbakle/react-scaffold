import React, { useState } from "react";

const { Provider, Consumer } = React.createContext();

function ThemeContextProvider(props) {
    const [currentTheme, setTheme] = useState("light");

    const toggleTheme = () => {
        setTheme(currentTheme === "light" ? "dark" : "light");
    };

    return <Provider value={{ theme: currentTheme, toggleTheme: toggleTheme }}>{props.children}</Provider>;
}

export { ThemeContextProvider, Consumer as ThemeContextConsumer };