import React, { useState } from "react";
import RecoverTemplate from "./RecoverTemplate";
import { useTranslation } from 'react-i18next';

export default function RecoverPassword() {
    const [email, setEmail] = useState("");
    const [obscuredEmail, setObscuredEmail] = useState("");
    const { t } = useTranslation();
    const [currentRecoverPage, setCurrentRecoverPage] = useState(1);

    function goNext() {
        setCurrentRecoverPage((prev) => prev + 1);
    }

    function goPrevious() {
        setCurrentRecoverPage((prev) => prev - 1);
    }

    function obscureEmail(userEmail) {
        console.log("entrou no obscureEmail");
        setEmail(userEmail);
        const [localPart, domain] = userEmail.split("@");
        let obscuredLocalPart = "";
        for (let i = 0; i < localPart.length; i++) {
            if (i >= 3) {
                obscuredLocalPart += "*";
            } else {
                obscuredLocalPart += localPart[i];
            }
        }
        let obscuredDomain = "";
        for (let i = 0; i < domain.length; i++) {
            if (i === 0 || domain[i - 1] === ".") {
                obscuredDomain += domain[i];
            } else {
                obscuredDomain += "*";
            }
        }
        setObscuredEmail(`${obscuredLocalPart}@${obscuredDomain}`);
    }

    return (
        <div className="recover-carrousel__template">
            <RecoverTemplate
                id="1"
                title="Informe seu email"
                paragraph1="Enter the email address associated with your account and we'll send you a link to reset your password."
                inputPlaceholder="Email"
                button1="Continue"
                link1="Don't have an account? Sign up"
                pathLink1="register"
                obscureEmail={obscureEmail}
                fetchType="requestToken"
                primaryKey="to"
                fetchOkResponse="Codigo enviado ao email com sucesso"
                currentRecoverPage={currentRecoverPage}
                goNext={goNext}
            />
            <RecoverTemplate
                id="2"
                title={t('recoverPasswordTitle')}
                paragraph1={t('recoverPasswordParagraph1')}
                paragraph2={t('recoverPasswordParagraph2')}
                obscuredEmail={obscuredEmail}
                inputPlaceholder={t('recoverPasswordInputPlaceholder')}
                button1={t('recoverPasswordSubmit')}
                link1="Não recebeu? Enviar o codigo novamente"
                pathLink1="recoverPassword"
                link2="Coloquei o email errado"
                pathLink2="recoverPassword"
                fetchType="verifyToken"
                primaryKey="token"
                fetchOkResponse="Token validado!"
                currentRecoverPage={currentRecoverPage}
                goNext={goNext}
                goPrevious={goPrevious}
            />
            <RecoverTemplate
                id="3"
                title="Create new Password"
                secondInput={true}
                paragraph1="Crie uma nova senha de 8 a 64 caracteres com pelo menos uma letra maiúscula e um número."
                inputPlaceholder="Create your new password"
                button1="Confirmar nova senha"
                fetchType="alterPassword"
                primaryKey="newpassword"
                fetchOkResponse="Sua senha foi alterada!"
                secondKey="to"
                valueToSecondKey={email}
                currentRecoverPage={currentRecoverPage}
                goNext={goNext}
            />
        </div>
    );
}
