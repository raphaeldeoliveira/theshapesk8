import React from "react";
import { useNavigate } from "react-router-dom";
import "../../styles/pages/home/itemOptions.scss"

export default function OptionSpanAndCard(props) {

    const navigate = useNavigate()

    const typeMargin = props.id === 1 ? "left" : props.id === 5 ? "right" : ""

    return (
        <li 
            className="nav-options__item__container"
            style={{
                marginLeft: typeMargin === "left" ? "90px" : "0px",
                marginRight: typeMargin === "right" ? "90px" : "0px"
            }}
        >
            <span className="option__span">{props.text}</span>
            {props.showMenu && (
                <div className="nav-options__item__menu">
                    <ul>
                        {props.cardContent.map((item) => {
                            return <li
                                onClick={() => navigate(`/search/${item}`)}
                                className="item__menu__li"
                            >{item}</li>
                        })}
                    </ul>
                </div>
            )}
        </li>
    )
}