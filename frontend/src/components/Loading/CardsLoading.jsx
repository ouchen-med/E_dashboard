import React from "react";
import "./Loading.css";

export default function CardsLoading() {
    return (
        <div className="cards_loading_wrapper">
            {[...Array(6)].map((_, index) => (
                <div className="card_loading" key={index}>
                    <div className="card_loading_image"></div>
                    <div className="card_loading_line"></div>
                    <div className="card_loading_line small"></div>
                </div>
            ))}
        </div>
    );
}
