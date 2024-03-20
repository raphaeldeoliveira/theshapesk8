import React, { useState } from "react";
import "../../styles/pages/global/header.scss";
import { MdShoppingCart } from "react-icons/md";
import { FaUserCircle } from "react-icons/fa";
import { IoSearchSharp } from "react-icons/io5";
import banner from "../../assets/images/banner.png";
import { Link } from "react-router-dom";
import { escrever } from "../../redux/search/actions";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

export default function Header() {
    const dispatch = useDispatch();
    const navigate = useNavigate()
    const [searchTerm, setSearchTerm] = useState('');

    const handleChange = (event) => {
        setSearchTerm(event.target.value);
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        dispatch(escrever(searchTerm));
        navigate(`/search/${searchTerm}`)
    };

    return (
        <header>
            <Link to="/">
                <img src={banner} alt=""/>
            </Link>
            <form className="searchBar" onSubmit={handleSubmit}>
                <input type="text" placeholder="Search the Shop" onChange={handleChange}></input>
                <button>{<IoSearchSharp className="sgv--search"/>}</button>
            </form>
            <div>
                <MdShoppingCart className="sgv--cart" />
                <FaUserCircle className="sgv--user" />
            </div>
        </header>
    )
}