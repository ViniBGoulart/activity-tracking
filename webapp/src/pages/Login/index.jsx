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
            localStorage.setItem('token', response.data.token);
        } catch (err) {
            alert('Falha no login, tente novamente.')
        }
    }
}