import React, { useState, useContext } from "react";

const ThemeContext = React.createContext();

const ThemeContextProvider = props => {
    const [theme, setTheme] = useState("dark");

    const toggleTheme = () => {
        setTheme(theme === "light" ? "dark" : "light");
    };

    // const _value = {
    //     theme: (props.value && props.value.theme) || theme,
    //     toggleTheme: (props.value && props.value.toggleTheme) || toggleTheme,
    // };

    return (<ThemeContext.Provider value={{ theme, toggleTheme }}>
        {props.children}
    </ThemeContext.Provider>)
}

const useTheme = () => {
    const _context = useContext(ThemeContext);
    return _context;
}

export { ThemeContextProvider, useTheme };