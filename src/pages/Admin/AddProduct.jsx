import React, { useState } from "react";
import { useTranslation } from 'react-i18next';

export default function AddProduct() {

    const { t } = useTranslation();

    // não consegui passar os dados corretamente pro endpoint
    const [formData, setFormData] = useState({
        nome: "",
        descricao: "",
        imagem: "",
        valor: 55.32,
        tamanho: ""
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        const newValue = name === 'valor' ? parseFloat(value) : value; // Converter para número se o campo for 'valor'
        setFormData({
            ...formData,
            [name]: newValue
        });
    };
    
    const handleSubmit = async (e) => {
        e.preventDefault();
        
        try {
            const formDataWithNumber = {
                ...formData,
                valor: parseFloat(formData.valor)
            };
            const response = await fetch('https://e-commerce-prod.onrender.com/api/produtos', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formDataWithNumber)
            });
    
            if (!response.ok) {
                throw new Error('Falha ao cadastrar produto');
            }
    
            // Se chegou aqui, o produto foi cadastrado com sucesso
            alert(t('registeredProductSucefully'));
            // Limpar o formulário após o envio bem-sucedido
            setFormData({
                nome: "",
                descricao: "",
                imagem: "",
                valor: 0,
                tamanho: ""
            });
        } catch (error) {
            alert(t('registerError'));
        }
    };
    

    return (
        <div className="add__product">
            <h1>{'addProduct2'}</h1>
            <form onSubmit={handleSubmit}>
                <div>
                    <div>
                        <label>{t('name')}: </label>
                        <input 
                            type="text" 
                            placeholder={t('namePlaceholder')}
                            name="nome" 
                            value={formData.nome} 
                            onChange={handleChange} 
                            required 
                        />
                    </div>
                    <div>
                        <label>{t('description')}: </label>
                        <input 
                            type="text" 
                            placeholder={t('descriptionPlaceholder')} 
                            name="descricao" 
                            value={formData.descricao} 
                            onChange={handleChange} 
                            required 
                        />
                    </div>
                    <div>
                        <label>{t('imagem')}</label>
                        <input 
                            type="text" 
                            placeholder="https://i.ytimg.com/vi/K36J9aNDnoM/maxresdefault.jpg" 
                            name="imagem" 
                            value={formData.imagem} 
                            onChange={handleChange} 
                            required 
                        />
                    </div>
                </div>
                <div>
                    <div>
                        <label>{t('valor')}:</label>
                        <input 
                            type="number" 
                            name="valor" 
                            value={formData.valor} 
                            onChange={handleChange} 
                            required 
                        />
                    </div>
                    <div>
                        <label>{t('tamanho')}: </label>
                        <input 
                            type="text" 
                            placeholder={`${t('tamanhoP')}, ${t('tamanhoM')}, ${t('tamanhoG')}`}
                            name="tamanho" 
                            value={formData.tamanho} 
                            onChange={handleChange} 
                            required 
                        />
                    </div>
                    
                    <button type="submit">{t('adicionar')}</button>
                </div>
            </form>
        </div>
    );
}