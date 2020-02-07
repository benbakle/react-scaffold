import React from 'react';
import { mount } from 'enzyme';
import {ThemeContextProvider, useTheme} from '../theme-context';
import { ThemeToggle } from './ThemeToggle';

beforeEach(() => {
    jest.resetModules();
});

const _component = mount(
    <ThemeContextProvider>
        <ThemeToggle />
    </ThemeContextProvider>
);

describe("The Theme Toggle component", () => {
    it('has a toggle button', () => {
        expect(_component.find(".theme-toggle-button").length).toEqual(1)
    });

    it("has a heading with the selected context", () => {
        expect(_component.find(".heading").text()).toEqual("Currently using the dark theme")
    });
});