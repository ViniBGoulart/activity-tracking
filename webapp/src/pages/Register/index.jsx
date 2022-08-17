import React from "react";
import { Link, useHistory } from "react-router-dom";
import { useForm } from "react-hook-form";

import api from "../../services/api";

import "../../styles/globals.css";
import { data } from "autoprefixer";

export default function Register() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    formState,
  } = useForm();

  const history = useHistory();

  const onRegistry = async (data) => {
    try {
        const res = await api.post('api/register', {
            name: data.name,
            email: data.email,
            password: data.password,
            "password_confirmation": data.confirmPassword
        })
    } catch (err) {
        
    }
  }
}
