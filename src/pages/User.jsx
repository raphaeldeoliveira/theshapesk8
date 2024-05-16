import React from "react";
import { Outlet, NavLink } from "react-router-dom";
import "../styles/pages/user/user.scss";
import { useDispatch } from "react-redux";
import { logoutUser } from "../redux/login/actions";
import { useTranslation } from 'react-i18next';

export default function User() {
    
    const dispatch = useDispatch();
    const { t } = useTranslation();

    const handlelogout = () => {
        dispatch(logoutUser());
    }
    
    return (
        <div className="user-page">
            <nav>
                <ul>
                    <li>
                        <NavLink exact activeClassName="active" to="/user/pedidos">
                            {t('pedidos')}
                        </NavLink>
                    </li>
                    <li>
                        <NavLink activeClassName="active" to="/user/dados">
                            {t('dados')}
                        </NavLink>
                    </li>
                    <li>
                        <NavLink activeClassName="active" to="/user/enderecos">
                            {t('enderecos')}
                        </NavLink>
                    </li>
                    <li>
                        <NavLink activeClassName="active" to="/user/paymentMethods">
                            {t('paymentMethods')}
                        </NavLink>
                    </li>
                    <li>
                        <NavLink onClick={handlelogout} activeClassName="active" to="/">
                            {t('exit')}
                        </NavLink>
                    </li>
                </ul>
            </nav>
            <Outlet />
        </div>
    );
}
