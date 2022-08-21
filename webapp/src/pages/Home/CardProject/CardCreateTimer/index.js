import React, { useState } from "react";

import Button from "../../../../components/Button";

export default function CardCreateTimer({ onInsertTimer }) {
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");

    const handleSubmit = async () => {
        await onInsertTimer({
            name: name,
            description: description,
        });
    };

    return (
        <>
            <p className="text-base pb-2 font-semibold">Create Timer</p>
            <div className="mb-3">
                <input
                    id="projectNameField"
                    className="text-sm shadow appearance-none border rounded w-full py-1 px-2 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    placeholder="Name"
                    type="text"
                    onChange={(e) => setName(e.target.value)}
                />
            </div>
            <div className="mb-3">
                <textarea
                    id="projectDescriptionField"
                    className="text-sm shadow appearance-none border rounded w-full py-1 px-2 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    placeholder="Description"
                    type="text"
                    rows="3"
                    onChange={(e) => setDescription(e.target.value)}
                />
            </div>
            <div className="flex items-center justify-between">
                <Button onClick={handleSubmit}>Send</Button>
            </div>
        </>
    );
}
