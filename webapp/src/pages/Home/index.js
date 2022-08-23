import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import api from "../../services/api";

import NavBar from "../../components/Navbar";
import CardCreateProject from "./CardCreateProject";
import CardProject from "./CardProject";

export default function Home() {
    const navigate = useNavigate();

    const [projects, setProject] = useState([]);
    const [token] = useState(localStorage.getItem("token"));

    const handleInsertProject = (data) => {
        api.post("/api/auth/projects", data, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        })
            .then((res) => {
                if (res.data.status === true) {
                    setProject((prevState) => [...prevState, res.data.data]);
                }
            })
            .catch((err) => {
                console.log(err);
            });
    };

    const handleDeleteProject = (data) => {
        api.delete(`/api/auth/projects/${data.id}`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        })
            .then((res) => {
                if (res.data.status === true) {
                    setProject((prevState) =>
                        prevState.filter((obj) => {
                            return obj.id !== data.id;
                        })
                    );
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

    useEffect(() => {
        if (![token]) {
            localStorage.clear();
            navigate("/login");
        }

        async function fetchData() {
            api.get("/api/auth/projects", {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            })
                .then((res) => {
                    if (res.data.status === true) {
                        setProject(res.data.data);
                    }
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
        <React.Fragment>
            <NavBar />
            <CardCreateProject handleInsertProject={handleInsertProject} />

            {projects.map((project) => (
                <CardProject
                    id={project.id}
                    key={project.id}
                    name={project.name}
                    description={project.description}
                    handleDeleteProject={handleDeleteProject}
                />
            ))}
        </React.Fragment>
    );
}
