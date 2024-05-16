import React, { useState, useEffect } from "react";
import "../../styles/pages/global/header.scss";
import { MdShoppingCart } from "react-icons/md";
import { FaUserCircle } from "react-icons/fa";
import { FaLanguage } from "react-icons/fa6";
import { IoSearchSharp } from "react-icons/io5";
import banner from "../../assets/images/banner.png";
import { Link } from "react-router-dom";
import { escrever } from "../../redux/search/actions";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import LilCart from "./LilCart";
import { checkUserId } from "../../redux/login/actions";
import LangOptionsMenu from "./LangOptionsMenu";

export default function Header() {
    const cartItems = useSelector(state => state.cartReducer.cartItems);
    const loggedIn = useSelector(state => state.userReducer.userId);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [searchTerm, setSearchTerm] = useState('');
    const [showCart, setShowCart] = useState(false);
    const [cartQuantity, setCartQuantity] = useState(0);

    const [showLangOptionsMenu, setShowLangOptionsMenu] = useState(false)

    useEffect(() => {
        dispatch(checkUserId());
    }, [dispatch]);

    // Atualizar a quantidade total de itens no carrinho usando useEffect
    useEffect(() => {
        const totalQuantity = cartItems.reduce((total, item) => total + item.quantity, 0);
        setCartQuantity(totalQuantity);
    }, [cartItems]);

    const handleChange = (event) => {
        setSearchTerm(event.target.value);
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        dispatch(escrever(searchTerm));
        navigate(`/search/${searchTerm}`);
    };

    const handleRedirect = () => {
        loggedIn ? navigate("/user/pedidos") : navigate("/register")
    }

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
                <FaLanguage 
                    className="sgv-lang" 
                    onClick={() => {setShowLangOptionsMenu((prevState) => !prevState)}}
                />
                {showLangOptionsMenu ? (
                    <LangOptionsMenu />
                ) : null}
                {(cartQuantity !== 0) && <div className="cart__quantity">{cartQuantity}</div>}
                <MdShoppingCart 
                    onClick={() => setShowCart((prev) => !prev)} 
                    className="sgv--cart" 
                />
                <FaUserCircle 
                    onClick={handleRedirect}
                    className="sgv--user" 
                />
            </div>
            <LilCart 
                showCart={showCart} 
                setShowCart={setShowCart}
            />
        </header>
    );
}
