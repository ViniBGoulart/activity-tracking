import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { FiLogIn } from 'react-icons/fi';
import { useForm } from "react-hook-form";

import api from '../../services/api';

import './styles.css';

export default function Login() {
    const { register, handleSubmit, formState: { errors }, formState } = useForm();
    const history = useHistory('')

    const onLogin = async data => {
        try {
            const res = await api.post('api/login', data.email, data.password);
            localStorage.setItem('token', res.data.token);
            console.log(res)

            history.push('/home')
        } catch (err) {
            alert('Falha no login, tente novamente.')
        }
    }

    return (
        <div className="logon-container">
            <section className="form">
                <form onSubmit={handleSubmit(onLogin)}>
                    <label htmlFor="email">E-mail</label>
                    <input type="text" {...register("email")} />
                    <label htmlFor="password">Password</label>
                    <input type="password" {...register("password")} />

                    <button className="button" type='submit'>Login</button>
                </form>

                <Link className="back-link" to="/register">
                    <FiLogIn size={16} color="#3498db" />
                    Register
                </Link>
            </section>
        </div>
    )
}