import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { FiLogIn } from 'react-icons/fi';

import api from '../../services/api';

import './styles.css';

export default function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const history = useHistory('')

    async function handleLogin(e) {
        e.preventDefault();

        try {
            const res = await api.post('api/login', { email, password });
            localStorage.setItem('token', res.data.token);

            history.push('/home')
        } catch (err) {
            alert('Falha no login, tente novamente.')
        }
    }

    return (
        <div className="logon-container">
            <section className="form">
                <form onSubmit={handleLogin}>
                    <input type="text" placeholder='E-mail' value={email} onChange={e => setEmail(e.target.value)} />
                    <input type="password" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} />

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