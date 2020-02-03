import React from 'react';
import ThemeContext from '../../contexts/themes';
import ThemeToggleButton  from '../Button/ThemeButtonToggle';

export function ThemeToggle() {

    return (
        <ThemeContext.Consumer>
            {({ theme }) => (
                <>
                    <ThemeToggleButton />
                    <div className="heading">
                        Currently using the <span className="uppercase">{theme}</span> theme
                    </div>
                </>
            )
            }
        </ThemeContext.Consumer >
    )
}