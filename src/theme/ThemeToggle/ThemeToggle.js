import React from 'react';
import { useTheme } from '../theme-context';
import ThemeToggleButton from '../ThemeButtonToggle/ThemeButtonToggle';

export function ThemeToggle() {
    const theme = useTheme();

    return (
        <>
            <ThemeToggleButton />
            <div className="heading">
                Currently using the <span className="uppercase">{theme.theme}</span> theme
                    </div>
        </>
    )
}