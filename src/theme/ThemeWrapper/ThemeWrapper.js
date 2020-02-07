import React from 'react';
import { useTheme } from "../theme-context";

export default function ThemeWrapper(props) {
    const { theme } = useTheme();
    
    return (
        <div className={`app theme-${theme}`}>
            {props.children}
        </div>
    )
}