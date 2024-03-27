import React from "react";
import "../../styles/pages/user/user__data.scss";
import { FaRegEdit } from "react-icons/fa";

export default function UserData() {
    return (
        <div className="user__data">
            <div className="data__hald--left">
                <div className="data__title__container">
                    <h1 className="h1--pessoal">Pessoais</h1>
                    <FaRegEdit />
                </div>
                
            </div>
            <div className="data__hald--right">
                <div className="data__title__container">
                    <h1 className="h1--envio">De Envio</h1>
                    <FaRegEdit />
                </div>
            </div>
        </div>
    )
}