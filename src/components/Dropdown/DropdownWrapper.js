import React, { useState } from 'react';
import Dropdown from './Dropdown';

export default function DropdownWrapper() {
    const [display, setDisplay] = useState("la");

    const displayDropdown = (value) => {
        setDisplay(value);
    }

    const dropdowns = {
        la: ["la1", "la2"],
        ti: ["ti1", "li2"],
        da: ["da1", "da2"],
    }

    const displayChosenDropDown = () => {
        return (
            <Dropdown items={dropdowns[display]} defaultValue={dropdowns[display][0]} />
        )
    }

    return (
        <>
            <Dropdown displayDropdown={displayDropdown} items={["la", "ti", "da"]} defaultValue="la" />
            {displayChosenDropDown()}
        </>
    )
}