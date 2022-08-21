import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import api from "../../../services/api";

import Button from "../../../components/Button";
import CardContainer from "../../../components/CardContainer";
import CardCreateTimer from "./CardCreateTimer";
import CardTimer from "./CardTimer";

export default function CardProject(props) {
    const navigate = useNavigate();

    const [token] = useState(localStorage.getItem("token"));
    const [timers, setTimer] = useState([]);

    const handleInsertTimer = (data) => {
        api.post(`/api/auth/projects/${props.id}/timers`, data, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        })
            .then((res) => {
                if (res.data.status === false) {
                    alert(res.data.message);
                } else {
                    setTimer((prevState) => [...prevState, res.data]);
                }
            })
            .catch((err) => {
                if (err.status && err.status === (401 || 498)) {
                    localStorage.clear();
                    navigate("/login");
                } else {
                    console.log(err);
                }
            });
    };

    const handleEndTimer = (data) => {
        api.post(
            `/api/auth/projects/${props.id}/timers/${data.id}/stop`,
            data,
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            }
        )
            .then((res) => {
                setTimer((prevState) => [
                    ...prevState.filter((obj) => {
                        return obj.id !== data.id;
                    }),
                    res.data,
                ]);
            })
            .catch((err) => {
                if (err.status && err.status === (401 || 498)) {
                    localStorage.clear();
                    navigate("/login");
                } else {
                    console.log(err);
                }
            });
    };

    const onDeleteProject = async (data) => {
        await data.handleDeleteProject({
            id: data.id,
        });
    };

    useEffect(() => {
        if (![token]) {
            localStorage.clear();
            navigate("/login");
        }

        async function fetchData() {
            api.get(`/api/auth/project/${props.id}/timers/active`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            })
                .then((res) => {
                    setTimer(res.data);
                })
                .catch((err) => {
                    if (
                        err.request.status &&
                        err.request.status === (401 || 498)
                    ) {
                        localStorage.clear();
                        navigate("/login");
                    } else {
                        console.log(err);
                    }
                });
        }

        fetchData();
    }, [token]);

    return (
        <CardContainer>
            <div className="flex-col justify-around">
                <div
                    id="cardHeader"
                    className="flex justify-between items-center"
                >
                    <div>
                        <strong className="text-xl">{props.name}</strong>
                    </div>
                    <Button onClick={() => onDeleteProject(props)}>X</Button>
                </div>

                <div id="cardBody">
                    <div className="mb-4">
                        <small>{props.description}</small>
                    </div>
                    {timers.map((timer) => (
                        <CardTimer
                            id={timer.id}
                            key={timer.id}
                            name={timer.name}
                            description={timer.description}
                            started_at={timer.started_at}
                            stopped_at={timer.stopped_at}
                            handleEndTimer={handleEndTimer}
                        />
                    ))}

                    <CardCreateTimer handleInsertTimer={handleInsertTimer} />
                </div>
            </div>
        </CardContainer>
    );
}
