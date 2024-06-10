import React, { useState, useEffect } from "react";
import "../../styles/pages/user/user__data.scss";
import { FaRegEdit } from "react-icons/fa";
import LoadingSpinner from "../../components/global/LoadingSpinner"
import { useSelector } from "react-redux";
import { useTranslation } from 'react-i18next';

export default function UserData() {
    const [loading, setLoading] = useState(true)
    const [editPessoalData, setEditPessoalData] = useState(false);
    const [pessoalData, setPessoalData] = useState({
        dados: {
            nome: "",
            cpf: "",
            email: "",
            telefone: "",
            dataNascimento: "",
            senha: "",
        }
    });
    const { t } = useTranslation();

    const userId = useSelector(state => state.userReducer.userId);
    console.log(userId)

    useEffect(() => {
        const loadProducts = async () => {
            setLoading(true);
            try {
                const response = await fetch(`https://e-commerce-prod.onrender.com/api/clientes/${userId}`);
                
                if (!response.ok) {
                    alert(t('failedRegister'))
                    throw new Error('Erro ao fazer login');
                }
                const data = await response.json();
                console.log(data)
                setPessoalData(data);
            } catch(error) {
                console.error('Erro:', error);
                alert('Erro:', error);
            } finally {
                // Define o estado loading como false após a conclusão da solicitação
                setLoading(false);
            }
        }
        loadProducts();
    }, [userId, t]);

    // Função para alternar entre modo de edição e modo de visualização
    const toggleEditMode = () => {
        setEditPessoalData(!editPessoalData);
    };

    // Função para atualizar os dados do usuário
    const handleUpdateUserData = async () => {
        setLoading(true);
        try {
            // Lógica para enviar os dados atualizados para a API
            console.log("Dados atualizados:", pessoalData.dados);
            const response = await fetch(`https://e-commerce-prod.onrender.com/api/clientes/${userId}`, {
                method: 'PUT',
                body: JSON.stringify(pessoalData.dados),
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            if (!response.ok) {
                throw new Error('Falha ao atualizar os dados');
            }
            const data = await response.json();
            console.log(t('dadosAtualizados'), data);
            alert(t('dadosAtualizados'))
        } catch (error) {
            console.error(t('erroAoAtualizar'), error);
            alert(t('erroAoAtualizar'), error)
            // Trate o erro conforme necessário (por exemplo, exibindo uma mensagem de erro ao usuário)
        } finally {
            setLoading(false);
        }
    };

    // Função para lidar com a mudança de dados de usuário
    const handleChangeUserData = (event) => {
        const { name, value } = event.target;
        setPessoalData(prevPessoalData => ({
            dados: {
                ...prevPessoalData.dados,
                [name]: value
            }
        }));
    };

    return !loading ? (
        <div className="user__data">
            <div className="data__half--left">
                <div className="data__title__container">
                    <h1 className="h1--pessoal">{t('pessoalData')}</h1>
                    <FaRegEdit onClick={toggleEditMode} className="edit__icon" />
                </div>
                <form className="data__half__form" onSubmit={handleUpdateUserData}>
                    <div>
                        <label>name: </label><input type="text" name="nome" placeholder={t('name')} value={pessoalData.dados.nome || ""} onChange={handleChangeUserData} disabled={!editPessoalData}></input>
                        <label>cpf: </label><input type="text" name="cpf" placeholder="CPF" value={pessoalData.dados.cpf || ""} onChange={handleChangeUserData} disabled={!editPessoalData}></input>
                        <label>email: </label><input type="email" name="email" placeholder="E-mail" value={pessoalData.dados.email || ""} onChange={handleChangeUserData} disabled={!editPessoalData}></input>
                    </div>
                    <div>
                        <label>telefone: </label><input type="text" name="telefone" placeholder={t('telephone')} value={pessoalData.dados.telefone || ""} onChange={handleChangeUserData} disabled={!editPessoalData}></input>
                        <label>data nasc: </label><input type="text" name="dataNascimento" placeholder={t('dataNascimento')} value={pessoalData.dados.dataNascimento || ""} onChange={handleChangeUserData} disabled={!editPessoalData}></input>
                        <label>senha: </label><input type="password" name="senha" placeholder={t('password')} value={pessoalData.dados.senha || ""} onChange={handleChangeUserData} disabled={!editPessoalData}></input>
                    </div>
                    {/* Adicione outros campos de dados conforme necessário */}
                    {editPessoalData && <button type="submit">{t('saveChanges')}</button>}
                </form>
            </div>
            <div 
                className="data__half--right"
                style={{ display: "none" }}
            >
                <div className="data__title__container">
                    <h1 className="h1--envio">{t('shippingDetails')}</h1>
                    <FaRegEdit onClick={toggleEditMode} className="edit__icon" />
                </div>
            </div>
        </div>
    ) : (
        <LoadingSpinner />
    )
}
