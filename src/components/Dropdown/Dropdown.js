import React, { useState } from 'react';
import DisplayDropdownValue from './DisplayDropdownValue';

export default function Dropdown(props) {
    const { items, defaultValue , displayDropdown} = props;

    const [dropdownValue, setDropdownValue] = useState(defaultValue);
    const [anotherValue, setanotherValue] = useState("another value default");

    const handleChange = (event) => {
        const { value } = event.target;
        setDropdownValue(value)
        displayDropdown && displayDropdown(value);
    }

    const callback = (value) => {
        setanotherValue(`${anotherValue}=> ${value}`);
    }

    return (
        <>
            <select onChange={handleChange} value={dropdownValue}>
                {
                    items && items.map((item, key) => (
                        <option key={key} value={item}>{item}</option>
                    ))
                }

            </select>

            <DisplayDropdownValue value={dropdownValue} callback={callback} />
            <br />
            {anotherValue}
            <p><br /></p>
        </>
    )
}