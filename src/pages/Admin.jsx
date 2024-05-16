import React from "react";
import "../styles/pages/admin/admin.scss";
import { Outlet, NavLink } from "react-router-dom";
import { useTranslation } from 'react-i18next';

export default function Admin() {

    const { t } = useTranslation();

    return (
        <div className="admin__container">
            <h1>Admin</h1>
            <nav>
                <NavLink exact activeClassName="active" to="/admin/addProduct">
                    {t('addProduct')}
                </NavLink>
                <NavLink activeClassName="active" to="/admin/listProduct">
                    {t('listProduct')}
                </NavLink>
                <NavLink activeClassName="active" to="/admin/editProduct">
                    {t('editProduct')}
                </NavLink>
                <NavLink activeClassName="active" to="/admin/listUser">
                    {t('listUser')}
                </NavLink>
            </nav>
            <Outlet />
        </div>
    )
}