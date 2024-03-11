import { useState, React } from "react";
import "../styles/pages/registerandlogin/registerandlogin.scss"
import { Link } from "react-router-dom";

export default function Register() {

    const [loginData, setLoginData] = useState({
        email: '',
        senha: ''
    });

    const [registerData, setRegisterData] = useState({
        nome: '',
        sobrenome: '',
        email: '',
        senha: '',
        confirmarSenha: '',
        aceitarPromocoes: false
    });

    const handleLoginSubmit = (event) => {
        event.preventDefault();
        //console.log(loginData);
        fetch('URL_DA_API/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(loginData),
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Erro ao fazer login');
            }
            // redireciona pra Home com useHistory (react router)
            return response.json();
        })
        .catch(error => {
            console.error('Erro:', error);
        });
    };

    const handleRegisterSubmit = (event) => {
        event.preventDefault();
        //console.log(registerData);
        fetch('URL_DA_API/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(loginData),
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Erro ao fazer login');
            }
            // redireciona pra Home com useHistory (react router)
            return response.json();
        })
        .catch(error => {
            console.error('Erro:', error);
        });
    };

    const handleLoginInputChange = (event) => {
        const { name, value } = event.target;
        setLoginData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleRegisterInputChange = (event) => {
        const { name, value, type, checked } = event.target;
        const newValue = type === 'checkbox' ? checked : value;
        setRegisterData(prevState => ({
            ...prevState,
            [name]: newValue
        }));
    };

    return (
        <div className="login_and_register">
            <div className="login_and_register__login">
                <h2>Já sou cliente</h2>
                <form onSubmit={handleLoginSubmit}>
                    <input type="text" name="email" placeholder="E-mail" value={loginData.email} onChange={handleLoginInputChange}></input>
                    <input type="password" name="senha" placeholder="Senha" value={loginData.senha} onChange={handleLoginInputChange}></input>
                    <Link>Esqueci minha senha</Link>
                    <button type="submit">ENTRAR</button>
                </form>
            </div>
            <div className="login_and_register__register">
                <h2>Ainda não tenho cadastro</h2>
                <form onSubmit={handleRegisterSubmit}>
                    <input type="text" placeholder="Nome" value={registerData.nome} onChange={handleRegisterInputChange}></input>
                    <input type="text" placeholder="Sobrenome" value={registerData.sobrenome} onChange={handleRegisterInputChange}></input>
                    <input type="text" placeholder="E-mail" value={registerData.email} onChange={handleRegisterInputChange}></input>
                    <input type="password" name="senha" placeholder="Senha" value={registerData.senha} onChange={handleRegisterInputChange}></input>
                    <input type="password" name="confirmarSenha" placeholder="Confirmar Senha" value={registerData.confirmarSenha} onChange={handleRegisterInputChange}></input>
                    <div className="checkbox__container">
                        <input className="input--checkbox" type="checkbox"></input>
                        <label>Aceito receber promoções</label>
                    </div>
                    <button type="submit">REGISTRAR</button>
                </form>
            </div>
        </div>
    )
}