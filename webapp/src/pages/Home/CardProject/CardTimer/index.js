import React from "react";
import Button from "../../../../components/Button";

export default function CardTimer(props) {
    const onEndTimer = async (data) => {
        await data.handleEndTimer({
            id: data.id,
        });
    };

    return (
        <div className="flex my-5 shadow-md w-full rounded px-3 py-3">
            <div className="flex-1">
                <div className="text-base font-medium">{props.name}</div>
                <small>{props.description}</small>
            </div>
            <div className="flex-2 flex-col">
                {props.stopped_at ?
                    <div className="text-base font-medium">{props.stopped_at}</div> :
                    <div className="flex justify-end">
                        <Button type="submit" onClick={() => onEndTimer(props)}>
                            Stop
                        </Button>
                    </div>
                }
                <div className="text-base font-medium">{props.started_at}</div>
            </div>
        </div>
    );
}
