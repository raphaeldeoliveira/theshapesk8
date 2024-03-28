import React from "react";
import { Outlet, NavLink } from "react-router-dom";
import "../styles/pages/user/user.scss";
import { useDispatch, UseDispatch } from "react-redux";
import { logoutUser } from "../redux/login/actions"

export default function User() {
    
    const dispatch = useDispatch()

    const handlelogout = () => {
        dispatch(logoutUser())
    }
    
    return (
        <div className="user-page">
            <nav>
                <ul>
                    <li>
                    <NavLink exact activeClassName="active" to="/user/pedidos">
                        PEDIDOS
                    </NavLink>
                    </li>
                    <li>
                        <NavLink activeClassName="active" to="/user/dados">
                            DADOS
                        </NavLink>
                    </li>
                    <li>
                        <NavLink activeClassName="active" to="/user/enderecos">
                            ENDEREÇOS
                        </NavLink>
                    </li>
                    <li>
                        <NavLink activeClassName="active" to="/user/paymentMethods">
                            MÉTODOS DE PAGAMENTO
                        </NavLink>
                    </li>
                    <li>
                        <NavLink onClick={handlelogout} activeClassName="active" to="/">
                            SAIR
                        </NavLink>
                    </li>
                </ul>
            </nav>
            <Outlet />
        </div>
    );
}
