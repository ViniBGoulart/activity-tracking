import React from 'react'

export default function Button(props) {
    return (
        <button 
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-3 rounded focus:outline-none focus:shadow-outline"
            type={props.type ?? 'button'}
        >
            {props.name}
        </button>
    )
}