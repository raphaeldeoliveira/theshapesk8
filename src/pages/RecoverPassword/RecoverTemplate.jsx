import React, { useState } from "react";
import "../../styles/pages/recoverPassword/recoverpassword__code.scss";
import { useNavigate } from "react-router";
import LoadingSpinner from "../../components/global/LoadingSpinner";

export default function RecoverTemplate(props) {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [bodyRequest, setBodyRequest] = useState({
        input1: '',
        input2: '',
    });

    const handleSubmit = async (event) => {
        event.preventDefault();
        if (props.secondInput && bodyRequest.input1 !== bodyRequest.input2) {
            alert("As senhas não coincidem");
            return;
        }
        const payload = {
            [props.primaryKey]: bodyRequest.input1,
            [props.secondKey]: props.valueToSecondKey,
        };
        try {
            setLoading(true);
            props.obscureEmail ? props.obscureEmail(bodyRequest.input1) : console.log(payload);
            console.log(`fetchType: ${props.fetchType}`);
            const response = await fetch(`http://localhost:8080/recoverPassword/${props.fetchType}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(payload),
            });
            if (response.ok) {
                alert(props.fetchOkResponse);
                if (props.id === "3") {
                    navigate("/user/pedidos");
                } else {
                    props.goNext();
                }
                setLoading(false);
            } else {
                alert("Error submitting the form");
                setLoading(false);
            }
        } catch (error) {
            console.error('Error:', error);
            alert("An error occurred");
            setLoading(false);
        }
    };

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setBodyRequest(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    function link1() {
        props.goPrevious ? props.goPrevious() : navigate(`/${props.pathLink1}`)
    }

    function link2() {
        props.goPrevious ? props.goPrevious() : navigate(`/${props.pathLink2}`)
    }

    return (
        loading ? (
            <LoadingSpinner />
        ) : (
            <div className="recover-password__background" style={{ display: String(props.currentRecoverPage) === props.id ? "" : "none" }}>
                <div className="recover-password__container">
                    <h1>{props.title}</h1>
                    <p>{props.paragraph1} {props.obscuredEmail} {props.paragraph2}</p>
                    <form onSubmit={handleSubmit}>
                        <input type="text" name="input1" placeholder={props.inputPlaceholder} value={bodyRequest.input1} onChange={handleInputChange}></input>
                        {props.secondInput && (
                            <input type="password" name="input2" placeholder="Confirm your new password" value={bodyRequest.input2} onChange={handleInputChange}></input>
                        )}
                        <button type="submit">{props.button1}</button>
                    </form>
                    <div>
                        <button className="recover-password__link" onClick={() => link1()}>{props.link1}</button>
                        <button style={{ display: props.link2 ? "" : "none" }} className="recover-password__link--second" onClick={() => link2()}>{props.link2}</button>
                    </div>
                </div>
            </div>
        )
    );
}
