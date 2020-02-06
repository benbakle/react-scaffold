import React, { useState } from 'react';

export default function DisplayDropdownValue(props) {

    const {value, callback} = props;

    const handleClick=()=>{
        const extendedAnotherValue = " more stuff at the end of this";
        callback && callback(value + extendedAnotherValue);
    }

    return (
        <>
            <button className="small" onClick={handleClick}>Call callback</button>
            <br />
            {value}
        </>
    )
}