import React from "react";

import CardContainer from "../../../components/CardContainer";

export default function CardProject(props) {
    return (
        <CardContainer>
            <div className="flex-col justify-around">
                <div>
                    <strong>{props.name}</strong>
                </div>
                <div>
                    <small>{props.description}</small>
                </div>
            </div>
            <div>

            </div>
        </CardContainer>
    )
}