import React from 'react';
import { mount } from 'enzyme';
import ThemeContext from '../../contexts/themes';
import { ThemeToggle } from './ThemeToggle';

beforeEach(() => {
    jest.resetModules();
});

const _component = mount(
    <ThemeContext.Provider value={{ theme: "duh" }}>
        <ThemeToggle />
    </ThemeContext.Provider>
);

describe("The Theme Toggle component", () => {
    // it('should match the snapshot', () => {
    //     expect(_component.html()).toMatchSnapshot();
    // });

    it('has a toggle button', () => {
        expect(_component.find("Button").length).toEqual(1)
    });

    it("has a heading with the selected context", () => {
        expect(_component.find(".heading").text()).toEqual("Currently using the duh theme")
    });
});