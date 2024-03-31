import React, { useState, useEffect } from "react";
import LoadingSpinner from "../../components/global/LoadingSpinner";
import { FaTrashAlt } from "react-icons/fa";

export default function ListUsers() {

    const [users, setUsers] = useState()
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch('https://e-commerce-prod.onrender.com/api/clientes');
                if (!response.ok) {
                    throw new Error('Failed to fetch data');
                }
                
                const data = await response.json();
                console.log(data)
                setUsers(data);
            } catch (error) {
                console.error('Error fetching data:', error);
            } finally {
                setLoading(false)
            }
        };
        fetchData();
    }, []);

    const deleteProduct = async (id) => {
        console.log(id)
        try {
            const response = await fetch(`https://e-commerce-prod.onrender.com/api/clientes/${id}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json'
                }
            });
    
            if (!response.ok) {
                throw new Error('Falha ao excluir produto');
            }
    
            alert('Usuario excluído com sucesso!');
    
            setUsers(prevUsers => {
                return {
                    ...prevUsers,
                    dados: prevUsers && prevUsers.dados ? prevUsers.dados.filter(item => item.id !== id) : []
                };
            });
            
        } catch (error) {
            console.error('Erro ao excluir produto:', error);
            alert('Erro ao excluir produto. Tente novamente mais tarde.');
        }
    };

    return (
        loading ? (
            <LoadingSpinner/>
        ) : (
            <div className="user__list">
                <h1>List of Users</h1>
                <div>
                    {users.dados.map(user => (
                        <div key={user.id}>
                            <h4>{user.nome}</h4>
                            <FaTrashAlt className="sgv--trash" onClick={() => deleteProduct(user.id)} />
                        </div>
                    ))}
                </div>
            </div>
        )
    )
}