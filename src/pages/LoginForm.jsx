import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useTranslation } from 'react-i18next';
import { useNavigate } from "react-router-dom";

export default function LoginForm() {
    const { t } = useTranslation();
    const navigate = useNavigate();
    const [loginData, setLoginData] = useState({
        cpforemail: '',
        senha: ''
    });

    const handleLoginSubmit = async (event) => {
        event.preventDefault();
        let payload = {};

        if (loginData.cpforemail.includes('@')) {
            payload = {
                email: loginData.cpforemail,
                senha: loginData.senha
            };
        } else {
            payload = {
                cpf: loginData.cpforemail,
                senha: loginData.senha
            };
        }

        if (loginData.cpforemail === "admin" && loginData.senha === "admin") {
            navigate("/admin/addProduct");
        } else {
            try {
                const response = await fetch('http://localhost:8080/client/login', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(payload),
                });
                if (response.ok) {
                    navigate("/user/pedidos");
                } else {
                    alert("CPF ou senha inválido");
                    throw new Error('Erro ao fazer login');
                }
            } catch (error) {
                console.error('Erro:', error);
            }
        }
    };

    const handleLoginInputChange = (event) => {
        const { name, value } = event.target;
        setLoginData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    return (
        <form onSubmit={handleLoginSubmit}>
            <input type="text" name="cpforemail" placeholder="CPF ou Email" value={loginData.cpforemail} onChange={handleLoginInputChange}></input>
            <input type="password" name="senha" placeholder={t('password')} value={loginData.senha} onChange={handleLoginInputChange}></input>
            <Link onClick={() => alert("Função não implementada")}>{t('forgotPassword')}</Link>
            <button type="submit">{t('enter')}</button>
        </form>
    );
}
