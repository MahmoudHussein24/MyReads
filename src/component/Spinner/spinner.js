import React from "react";
import "./../../App.css";

export default function Spinner({isLoading}) {
    return (
        <div className="overlay">
        <div  className="spinner-container" >
            <div className="loading-spinner">
            </div>
        </div>
        </div>
    );
}