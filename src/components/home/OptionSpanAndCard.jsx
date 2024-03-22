import React from "react";
import { Link } from "react-router-dom";

export default function OptionSpanAndCard(props) {

    return (
        <li>
            <span
                className="option__span"
                onMouseEnter={() => props.toogleWindow(`window${props.id}`)}
                onMouseLeave={() => props.toogleWindow(`window${props.id}`)}
            >{props.text}</span>
            {props.showWindows[`window${props.id}`] && (
                <div className="option__card">{props.cardContent.map((item) => {
                    return <Link to={`/search/${item}`}>{item}</Link>
                })}</div>
            )}
        </li>
    )
}