import React from "react"
import "../../styles/pages/global/loadingspinner.scss"
import { FaShuttleSpace } from "react-icons/fa6";
import { RiAliensFill } from "react-icons/ri";

export default function LoadingSpinner() {

    /*
    old version spinner
    return (
        <div className="loading__background">
            <div className="loading__spinner">
                <div className="eyes"></div>
                <div className="eyes"></div>
            </div>
        </div>
    )*/

    return (
        <div className="loading__background">
            <RiAliensFill className="loading__alien" />
            <div className="loading__spinner">
                <FaShuttleSpace className="loading__spinner__space-ship" />
            </div>
        </div>
    )
}