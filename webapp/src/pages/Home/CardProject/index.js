import React from "react";

import api from '../../../services/api'

import Button from '../../../components/Button';
import CardContainer from "../../../components/CardContainer";

export default function CardProject(props) {
    const handleSubmit = async (props) => {
        await props.onDeleteProject({
            "id": props.id
        })
    }

    return (
        <CardContainer>
            <div className="flex-col justify-around">
                <div id="cardHeader" className="flex justify-between items-center">
                    <div>
                        <strong>{props.name}</strong>
                    </div>
                    <Button
                        onClick={() => handleSubmit(props)}
                    >X</Button>
                </div>
                <div id="cardBody" className="my-2">
                    <small>{props.description}</small>
                </div>
            </div>
        </CardContainer>
    )
}