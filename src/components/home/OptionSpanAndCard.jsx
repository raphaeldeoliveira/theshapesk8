import React from "react";
import { Link } from "react-router-dom";

export default function OptionSpanAndCard(props) {

    return (
        <li>
            <span
                className="option__span"
            >{props.text}</span>
        </li>
    )
}