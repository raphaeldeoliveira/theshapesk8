import React, { useState } from "react";

export default function AddProduct() {

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
            alert('Produto cadastrado com sucesso!');
            // Limpar o formulário após o envio bem-sucedido
            setFormData({
                nome: "",
                descricao: "",
                imagem: "",
                valor: 0,
                tamanho: ""
            });
        } catch (error) {
            console.error('Erro ao cadastrar produto:', error);
            alert('Erro ao cadastrar produto. Verifique os campos e tente novamente.');
        }
    };
    

    return (
        <div className="add__product">
            <h1>Add Product</h1>
            <form onSubmit={handleSubmit}>
                <div>
                    <div>
                        <label>Nome: </label>
                        <input 
                            type="text" 
                            placeholder="A crazy shape..." 
                            name="nome" 
                            value={formData.nome} 
                            onChange={handleChange} 
                            required 
                        />
                    </div>
                    <div>
                        <label>Descrição: </label>
                        <input 
                            type="text" 
                            placeholder="Feito de madeira" 
                            name="descricao" 
                            value={formData.descricao} 
                            onChange={handleChange} 
                            required 
                        />
                    </div>
                    <div>
                        <label>Imagem</label>
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
                        <label>Valor:</label>
                        <input 
                            type="number" 
                            name="valor" 
                            value={formData.valor} 
                            onChange={handleChange} 
                            required 
                        />
                    </div>
                    <div>
                        <label>Tamanho: </label>
                        <input 
                            type="text" 
                            placeholder="P M G" 
                            name="tamanho" 
                            value={formData.tamanho} 
                            onChange={handleChange} 
                            required 
                        />
                    </div>
                    
                    <button type="submit">Adicionar</button>
                </div>
            </form>
        </div>
    );
}