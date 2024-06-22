import React, { useState, useEffect, useCallback } from "react";
import "../../styles/pages/product/productImagesCarrousel.scss";
import { FaArrowAltCircleLeft, FaArrowAltCircleRight } from "react-icons/fa";

export default function ProductImagesCarrousel(props) {

    const [carrouselPosition, setCarrouselPosition] = useState(0)

    const convertScrollX = useCallback(() => {
        return carrouselPosition * 27
    }, [carrouselPosition])

    useEffect(() => {
        convertScrollX()
    }, [convertScrollX, carrouselPosition])

    function moveRight() {
        setCarrouselPosition(prevPosition => prevPosition === 3 ? 0 : prevPosition + 1);
    }

    function moveLeft() {
        setCarrouselPosition(prevPosition => prevPosition === 0 ? 3 : prevPosition - 1);
    }

    return (
        <div className="product-images-carrousel__container">
            <div className="images-carrousel__select-division">
                {props.images.map((item, index) => (
                    <img 
                        style={{
                            border: carrouselPosition === index ? "2px solid blue" : "",
                            padding: carrouselPosition === index ? "3px" : "",
                        }}
                        key={index} 
                        src={item.imagem} 
                        alt={`Imagem ${index}`} 
                        onClick={() => setCarrouselPosition(index)}
                    />
                ))}
            </div>
            <div className="images-carrousel__main-image__container">
                <div className="images-carrousel__main-image__carrousel">
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
                        {props.images.map((item) => {
                            return <img 
                                src={item.imagem}
                                className="images-carrousel__main-image"
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
        </div>
    )

}