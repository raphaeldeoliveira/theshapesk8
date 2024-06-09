import React from "react";
import { useState, useEffect, useCallback } from "react";
import "../../styles/pages/home/bannersCarrousel.scss";
import { useNavigate } from "react-router-dom";
import { FaArrowAltCircleLeft, FaArrowAltCircleRight } from "react-icons/fa";

// import dos banners
import banner1 from "../../assets/images/home/banners/Antihero_Thrasher_Apparel_Slider.jpg"
import banner2 from "../../assets/images/home/banners/BlackLabel_John_Jeff_HallOfFame_Slider.jpg"
import banner3 from "../../assets/images/home/banners/Bowman_RobtWilliams_Slider.jpg"
import banner4 from "../../assets/images/home/banners/Jacuzzi_Slider.jpg"
import banner5 from "../../assets/images/home/banners/Slappy_Slider.jpg"
import banner6 from "../../assets/images/home/banners/main_banner.jpg"

export default function BannerCarrousel() {

    const bannersName = ["Anti Hero", "Black Label", "Bowman", "Jacuzzi Slider", "Slappy Slider", "Spitfire"]
    const banners = [banner1, banner2, banner3, banner4, banner5, banner6]

    const navigate = useNavigate()

    const [carrouselPosition, setCarrouselPosition] = useState(0)

    const convertScrollX = useCallback(() => {
        return carrouselPosition * 80 // aqui tem que descobrir a medida certa em view width (vw)
    }, [carrouselPosition])

    useEffect(() => {
        convertScrollX()
    }, [convertScrollX, carrouselPosition])

    useEffect(() => {
        const interval = setInterval(() => {
            setCarrouselPosition(prevPosition => (prevPosition === 5 ? 0 : prevPosition + 1));
        }, 4500);

        return () => clearInterval(interval);
    }, []);

    function moveRight() {
        setCarrouselPosition(prevPosition => prevPosition === 5 ? 0 : prevPosition + 1);
    }

    function moveLeft() {
        setCarrouselPosition(prevPosition => prevPosition === 0 ? 5 : prevPosition - 1);
    }

    return (
        <div className="banners__container">
            <div className="banner__carrousel">
                <div className="banner__arrow__container">
                    <FaArrowAltCircleLeft 
                        onClick={moveLeft}
                        className="banner__arrow--left"
                    />
                </div>
                <div 
                    className="banner__carrousel__internal"
                    style={{
                        transform: `translateX(-${convertScrollX()}vw)`
                    }}
                >
                    {banners.map((banner, index) => {
                        return <img 
                            src={banner}
                            className="banner__carrousel__item"
                            onClick={() => navigate(`/search/${bannersName[index]}`)}
                            alt=""
                        />
                    })}
                </div>
                <div className="banner__arrow__container">
                    <FaArrowAltCircleRight 
                        onClick={moveRight}
                        className="banner__arrow--right"
                    />
                </div>
                
            </div>
        </div>
    )
}