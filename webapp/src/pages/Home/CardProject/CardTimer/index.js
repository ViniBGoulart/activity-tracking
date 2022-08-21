import React from "react";

import Button from "../../../../components/Button";

export default function CardTimer(props) {
    const onEndTimer = async (data) => {
        await data.handleEndTimer({
            id: data.id,
        });
    };

    return (
        <>
            <div className="mt-5">
                <div>{props.name}</div>
                <small>{props.description}</small>
            </div>
            {props.started_at}
            <br />
            {props.stopped_at}
            <Button type="submit" onClick={() => onEndTimer(props)}>
                Stop
            </Button>
        </>
    );
}
