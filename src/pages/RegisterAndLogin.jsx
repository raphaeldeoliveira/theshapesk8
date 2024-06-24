import React, { useState, useEffect } from "react";
import "../styles/pages/registerandlogin/registerandlogin.scss";
import { useDispatch, useSelector } from "react-redux";
import { checkUserId } from "../redux/login/actions";
import LoadingSpinner from "../components/global/LoadingSpinner";
import LoginForm from "./LoginForm";
import RegisterForm from "./RegisterForm";
import { useTranslation } from 'react-i18next';

export default function Register() {
    const dispatch = useDispatch();
    const [loading, setLoading] = useState(false)
    const { t } = useTranslation();

    const userId = useSelector(state => state.userReducer.userId);
    const loggedIn = useSelector(state => state.userReducer.loggedIn);

    useEffect(() => {
        dispatch(checkUserId());
        console.log(userId);
    }, [dispatch, userId]);

    useEffect(() => {
        console.log(loggedIn);
    }, [loggedIn]);

    return (
        loading ? (
            <LoadingSpinner verticalsize="500" horizontalsize="800" />
        ) : (
            <div className="login_and_register">
                <div className="login_and_register__login">
                    <h2>{t('alreadyCustumer')}</h2>
                    <LoginForm />
                </div>
                <div className="login_and_register__register">
                    <h2>{t('noRegistered')}</h2>
                    <RegisterForm setLoading={setLoading} />
                </div>
            </div>
        )
    );
}
