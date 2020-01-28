import React from 'react';
import { mount } from 'enzyme';
import ThemeContext from '../../contexts/themes';
import { Button } from './Button';

describe("The Button component", () => {
    let _component, _toggleThemeHasBeenCalled;

    beforeEach(() => {
        jest.resetModules();
        setComponentWithContext("light");
    });

    it('should match the light theme snapshot', () => {
        expect(_component.html()).toMatchSnapshot();
    });

    it('has a toggle button', () => {
        expect(_component.find("button").text()).toContain("Toggle to");
    });

    describe('when the context theme is light', () => {
        it("the toggle button shows the moon icon", () => {
            expect(_component.find('button [aria-label="moon"]').length).toBe(1);
        });
    });

    describe('when the toggle button is clicked', () => {
        it('calls to toggle theme', () => {
            _component.find("button").simulate("click");
            expect(_toggleThemeHasBeenCalled).toBeTruthy();
        });
    });

    describe('when the context theme is dark', () => {
        it('should match the dark theme snapshot', () => {
            expect(_component.html()).toMatchSnapshot();
        });

        it("the toggle button shows the sun icon", () => {
            setComponentWithContext("dark");
            expect(_component.find('button [aria-label="sun"]').length).toBe(1);
        });
    });

    function setComponentWithContext(theme) {
        _component = mount(
            <ThemeContext.Provider value={{ theme, toggleTheme: () => { _toggleThemeHasBeenCalled = true } }}>
                <Button />
            </ThemeContext.Provider>
        );
    }
});