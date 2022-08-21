import React, { useState } from "react";

import Button from '../../../components/Button'
import CardContainer from "../../../components/CardContainer";

export default function CardCreateProject({ handleInsertProject }) {
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');

    const onInsertProject = async () => {
        await handleInsertProject({
            "name": name,
            "description": description
        })

        document.getElementById('projectNameField').value = ''
        setName('')
        document.getElementById('projectDescriptionField').value = ''
        setDescription('')
    }

    return (
        <React.Fragment>
            <CardContainer>
                <h1 className="text-2xl pb-2 font-semibold">Create Project</h1>
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
                        onClick={onInsertProject}
                    >Send</Button>
                </div>
            </CardContainer>
        </React.Fragment>
    )
}
