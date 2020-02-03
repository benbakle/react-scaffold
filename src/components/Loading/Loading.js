import React from 'react';

export default function Loading(props) {
    return (

        <div className="flex align-center center" style={{ minHeight: "100vh", width: "100%", position: "fixed", left: 0, top: 0 }}>
            <i style={{ fontSize: "20rem" }} className="fa fa-compact-disc fa-spin"></i>
        </div>
    )
}