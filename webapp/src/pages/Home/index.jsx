import React from "react";
import { useNavigate } from "react-router-dom";

import api from "../../services/api";

import "../../styles/globals.css";

import NavBar from "../../components/navbar"

export default function Home() {
    const navigate = useNavigate();

    return (
        <header>
            <NavBar />
        </header>
    )
}