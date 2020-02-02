import React from 'react';
import ThemeContext from '../../contexts/themes';
import { Button } from '../Button/Button';

export function ThemeToggle() {

    return (
        <ThemeContext.Consumer>
            {({ theme }) => (
                <>
                    <Button />
                    <div className="heading">
                        Currently using the <span className="uppercase">{theme}</span> theme
                    </div>
                </>
            )
            }
        </ThemeContext.Consumer >
    )
}