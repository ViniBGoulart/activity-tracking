import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import api from "../../services/api";

import "../../styles/globals.css";

import NavBar from "../../components/Navbar";
import CardCreateProject from "./CardCreateProject"
import CardProject from "./CardProject";

export default function Home() {
    const navigate = useNavigate();

    const [projects, setProject] = useState([]);
    const [token] = useState(localStorage.getItem("token"));

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
                    setProject(res.data);
                })
                .catch((err) => {
                    if (
                        err.request.status &&
                        err.request.status === (401 || 498)
                    ) {
                        localStorage.clear();
                        navigate("/login");
                    } else {
                        alert("Error");
                    }
                });
        }

        fetchData();
    }, [token]);

    const onInsertProject = (data) => {
        api.post("/api/auth/projects", data, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        })
            .then((res) => {
                setProject((prevState) => [...prevState, res.data]);
            })
            .catch((err) => {
                if (err.status && err.status === (401 || 498)) {
                    localStorage.clear();
                    navigate("/login");
                } else {
                    console.log(err)
                }
            });
    };

    return (
        <React.Fragment>
            <NavBar />
            <CardCreateProject onInsertProject={onInsertProject} />

            {projects.map(project => (
                <CardProject
                    id={project.id}
                    key={project.id}
                    name={project.name}
                    description={project.description}
                />
            ))}
        </React.Fragment>
    );
}
