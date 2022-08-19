import React, { useState } from "react";

import Button from '../../../components/Button'

export default function CardProject({ onInsertProject }) {
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');

    const handleSubmit = async () => {
        await onInsertProject({
            "name": name,
            "description": description
        })

        document.getElementById('projectNameField').value = ''
        setName('')
        document.getElementById('projectDescriptionField').value = ''
        setDescription('')
    }

    return (
        <div className="flex items-center justify-center items-center">
            <div className="w-full max-w-lg">
                <div className="bg-white shadow-md w-full rounded px-8 pt-6 pb-8 mb-4">
                    <div className="mb-4">
                        <input
                            id="projectNameField"
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            placeholder="Name"
                            type="text"
                            onChange={e => setName(e.target.value)}
                        />
                    </div>
                    <div className="mb-4">
                        <textarea
                            id="projectDescriptionField"
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            placeholder="Description"
                            type="text"
                            rows="4"
                            onChange={e => setDescription(e.target.value)}
                        />
                    </div>
                    <div className="flex items-center justify-between">
                        <Button 
                            name="Send"
                            onClick={handleSubmit}
                        />
                    </div>
                </div>
            </div>
        </div>
    )
}
