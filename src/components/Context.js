import React from 'react';
import { ThemeContextConsumer } from '../app-context/themeContext';
import Button from './Button';

export default function Context() {

    const themeElement = theme => {
        return (
            <span className="uppercase">{theme}</span>
        )
    }

    return (
        <ThemeContextConsumer>
            {({ theme }) => (
                <>
                    <Button />
                    <div className="heading">
                        Currently using the {themeElement(theme)} theme
                    </div>
                </>
            )}
        </ThemeContextConsumer>
    )
}