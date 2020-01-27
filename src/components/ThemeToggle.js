import React from 'react';
import { ThemeContextConsumer } from '../contexts/themes';
import Button from './Button';

export default function ThemeToggle() {
    return (
        <ThemeContextConsumer>
            {({ theme }) => (
                <>
                    <Button />
                    <div className="heading">
                        Currently using the <span className="uppercase">{theme}</span> theme
                    </div>
                </>
            )}
        </ThemeContextConsumer>
    )
}