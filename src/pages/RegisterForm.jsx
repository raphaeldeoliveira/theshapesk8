import React, { useState } from "react";
import InputMask from 'react-input-mask';
import { storeUserId } from "../redux/login/actions";
import { useTranslation } from 'react-i18next';
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";

export default function RegisterForm({ setLoading }) {
    const dispatch = useDispatch();
    const { t } = useTranslation();
    const navigate = useNavigate();    
    const [registerData, setRegisterData] = useState({
        nome: '',
        cpf: '',
        email: '',
        telefone: '',
        senha: '',
        dataNascimento: ''
    });

    const handleRegisterSubmit = async (event) => {
        event.preventDefault();
        console.log(registerData);
        try {
            setLoading(true);
            const response = await fetch('https://e-commerce-prod.onrender.com/api/clientes', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(registerData),
            });
            if (!response.ok) {
                //alert("Falha ao registrar!")
                alert("queeeeeeeeeryyyyy")
                throw new Error('Erro ao registrar');
            }
            const data = await response.json();
            dispatch(storeUserId(data.dados.id))
            navigate("/user/pedidos")
        } catch (error) {
            console.error('Erro:', error);
            alert('Erro:', error)
            alert("queeeeerryyyy222")
        } finally {
            setLoading(false);
        }
    };

    const handleRegisterInputChange = (event) => {
        const { name, value } = event.target;
        setRegisterData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };
    
    return (
        <form onSubmit={handleRegisterSubmit}>
            <input type="text" name="nome" placeholder={t('name')} value={registerData.nome} onChange={handleRegisterInputChange}></input>
            <InputMask mask="999.999.999-99" maskChar={null} type="text" name="cpf" placeholder="CPF" value={registerData.cpf} onChange={handleRegisterInputChange}></InputMask>
            <input type="text" name="email" placeholder="E-mail" value={registerData.email} onChange={handleRegisterInputChange}></input>
            <InputMask mask="(99)99999-9999" maskChar={null} type="text" name="telefone" placeholder={t('telephone')} value={registerData.telefone} onChange={handleRegisterInputChange}></InputMask>
            <InputMask mask="9999-99-99" maskChar={null} type="text" name="dataNascimento" placeholder={t('dataNascimento')} value={registerData.dataNascimento} onChange={handleRegisterInputChange}></InputMask>
            <input type="password" name="senha" placeholder={t('password')} value={registerData.senha} onChange={handleRegisterInputChange}></input>
            <input type="password" name="confirmarSenha" placeholder={t('confirmPassword')} value={registerData.confirmarSenha}></input>
            <button type="submit">{t('register')}</button>
        </form>
    );
}
