import React, { useState, useEffect } from "react";
import "../styles/pages/registerandlogin/registerandlogin.scss";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { storeUserId, checkUserId } from "../redux/login/actions"
import LoadingSpinner from "../components/global/LoadingSpinner";

export default function Register() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false)

    const userId = useSelector(state => state.userReducer.userId);
    useEffect(() => {
        dispatch(checkUserId());
        console.log(userId);
    }, [dispatch, userId]);
    

    const [loginData, setLoginData] = useState({
        email: '',
        senha: ''
    });

    const [registerData, setRegisterData] = useState({
        nome: '',
        cpf: '',
        email: '',
        telefone: '',
        senha: '',
        dataNascimento: ''
    });

    // esse mock é só pra deixar possivel acessar a pagina de administrador
    const mockLogAsAdmin = () => {
        if (loginData.email === "admin" && loginData.senha === "admin") {
            navigate("/admin/addProduct")
        } else {
            userId ? navigate("/user/pedidos") : alert("Criei uma conta para estar logado")
        }
    }

    // não implementado
    const handleLoginSubmit = async (event) => {
        event.preventDefault();
        /*try {
            const response = await fetch('URL_DA_API/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(loginData),
            });
            if (!response.ok) {
                throw new Error('Erro ao fazer login');
            }
            // redireciona pra Home com useHistory (react router)
            const data = await response.json();
            console.log(data); // Tratar os dados recebidos conforme necessário
        } catch (error) {
            console.error('Erro:', error);
        }
        console.log(loginData)*/
    };

    const loggedIn = useSelector(state => state.userReducer.loggedIn);

    useEffect(() => {
        console.log(loggedIn);
    }, [loggedIn]);

    const handleRegisterSubmit = async (event) => {
        event.preventDefault();
        console.log(registerData);
        try {
            setLoading(true)
            const response = await fetch('https://e-commerce-prod.onrender.com/api/clientes', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(registerData),
            });
            if (!response.ok) {
                alert("Falha ao registrar!")
                throw new Error('Erro ao fazer login');
            }
            setLoading(false)
            // redireciona pra Home com useHistory (react router)
            const data = await response.json();
            dispatch(storeUserId(data.dados.id))
            navigate("/user/pedidos")
        } catch (error) {
            console.error('Erro:', error);
            alert('Erro:', error)
            setLoading(false)
        }
    };

    const handleLoginInputChange = (event) => {
        const { name, value } = event.target;
        setLoginData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleRegisterInputChange = (event) => {
        const { name, value } = event.target;
        setRegisterData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    return (
        loading ? (
            <LoadingSpinner verticalsize="500" horizontalsize="800" />
        ) : (
            <div className="login_and_register">
                <div className="login_and_register__login">
                    <h2>Já sou cliente</h2>
                    <form onSubmit={handleLoginSubmit}>
                        <input type="text" name="email" placeholder="E-mail" value={loginData.email} onChange={handleLoginInputChange}></input>
                        <input type="password" name="senha" placeholder="Senha" value={loginData.senha} onChange={handleLoginInputChange}></input>
                        <Link onClick={() => alert("Função não implementada")}>Esqueci minha senha</Link>
                        <button onClick={() => {
                            mockLogAsAdmin()
                        }}>ENTRAR</button>
                    </form>
                </div>
                <div className="login_and_register__register">
                    <h2>Ainda não tenho cadastro</h2>
                    <form onSubmit={handleRegisterSubmit}>
                        <input type="text" name="nome" placeholder="Nome" value={registerData.nome} onChange={handleRegisterInputChange}></input>
                        <input type="text" name="cpf" placeholder="CPF" value={registerData.cpf} onChange={handleRegisterInputChange}></input>
                        <input type="text" name="email" placeholder="E-mail" value={registerData.email} onChange={handleRegisterInputChange}></input>
                        <input type="text" name="telefone" placeholder="Telefone" value={registerData.telefone} onChange={handleRegisterInputChange}></input>
                        <input type="text" name="dataNascimento" placeholder="Data de Nascimento" value={registerData.dataNascimento} onChange={handleRegisterInputChange}></input>
                        <input type="password" name="senha" placeholder="Senha" value={registerData.senha} onChange={handleRegisterInputChange}></input>
                        <input type="password" name="confirmarSenha" placeholder="Confirmar Senha" value={registerData.confirmarSenha}></input>
                        <button type="submit">REGISTRAR</button>
                    </form>
                </div>
            </div>
        )
        
    );
}
