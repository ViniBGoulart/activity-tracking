import React from 'react'
import { useNavigate } from "react-router-dom";

export default function Button(props) {
    const navigate = useNavigate();

    const handleOnClick = () => {
        if (props.navigate) {
            return navigate(props.navigate)
        }
        if (props.onClick) {
            return props.onClick()
        }
    }

    return (
        <>
            <button
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-3 rounded focus:outline-none focus:shadow-outline"
                type={props.type ?? 'button'}
                onClick={handleOnClick}
            >
                {props.children}
            </button>
        </>
    )
}