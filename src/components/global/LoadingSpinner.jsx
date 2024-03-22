import React from "react"
import "../../styles/pages/global/loadingspinner.scss"
import { FaShuttleSpace } from "react-icons/fa6";
import { RiAliensFill } from "react-icons/ri";

export default function LoadingSpinner(props) {

    return (
        <div style={{ height: `${props.verticalsize}px`, width: `${props.horizontalsize}px` }} className="loading__background">
            <RiAliensFill className="loading__alien" />
            <div className="loading__spinner">
                <FaShuttleSpace className="loading__spinner__space-ship" />
            </div>
        </div>
    )
}