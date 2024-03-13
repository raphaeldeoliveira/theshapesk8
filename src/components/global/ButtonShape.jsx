import React from "react";
import "../../styles/pages/global/buttonTs.scss"

export default function ButtonShape(props) {

return <button className={`buttonTS--${props.color}`}>{props.title}</button>
}