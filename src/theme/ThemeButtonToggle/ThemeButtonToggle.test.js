import React from 'react';
import { mount } from 'enzyme';
import { ThemeContextProvider } from '../theme-context';
import ThemeButtonToggle from './ThemeButtonToggle';

describe("The Button component", () => {
    let _component;

    arrangeButtonWithContext();

    it('has a toggle button', () => {
        expect(_component.find("button").text()).toContain("Toggle to");
    });

    describe('given the theme is dark', () => {
        it("the toggle button shows the sun icon", () => {
            expect(_component.find('button [aria-label="sun"]').length).toBe(1);
        });

        describe('and the toggle button is clicked', () => {
            it('the toggle button shows the moon icon', () => {
                _component.find("button").simulate("click");
                expect(_component.find('button [aria-label="moon"]').length).toBe(1);
            });
        });

    });

    describe('given the theme is light', () => {
        describe('and the toggle button is clicked', () => {
            it("the toggle button shows the sun icon", () => {
                _component.find("button").simulate("click");
                expect(_component.find('button [aria-label="sun"]').length).toBe(1);
            });
        });
    });


    function arrangeButtonWithContext() {
        _component = mount(
            <ThemeContextProvider >
                <ThemeButtonToggle />
            </ThemeContextProvider>
        );
    }
});