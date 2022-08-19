import React from "react";

import '../../styles/globals.css'

export default function CardContainer(props) {
    return (
        <>
            <div className="flex items-center justify-center items-center">
                <div className="w-full max-w-lg mx-4">
                    <div className="bg-white shadow-md w-full rounded px-8 pt-6 pb-8 mb-4">
                        {props.children}
                    </div>
                </div>
            </div>
        </>
    )
}