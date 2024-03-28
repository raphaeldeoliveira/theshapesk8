import React from "react";
import "../styles/pages/admin/admin.scss";
import { Outlet, NavLink } from "react-router-dom";

export default function Admin() {


    return (
        <div className="admin__container">
            <h1>Admin</h1>
            <nav>
                <NavLink exact activeClassName="active" to="/admin/addProduct">
                    ADICIONAR PROTUDO
                </NavLink>
                <NavLink activeClassName="active" to="/admin/listProduct">
                    LISTAR PROTUDOS
                </NavLink>
                <NavLink activeClassName="active" to="/admin/addUser">
                    ADICIONAR USUARIO
                </NavLink>
                <NavLink activeClassName="active" to="/admin/listUser">
                    LISTAR USUARIOS
                </NavLink>
            </nav>
            <Outlet />
        </div>
    )
}