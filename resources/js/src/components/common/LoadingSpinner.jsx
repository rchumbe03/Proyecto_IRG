import React from 'react';
import './LoadingSpinner.css';

const LoadingSpinner = () => {
    return (
        <div className="spinner-overlay">
            <div className="spinner-wrapper">
                <div className="spinner">
                    <div className="double-bounce1"></div>
                    <div className="double-bounce2"></div>
                </div>
                <p className="spinner-text">Cargando...</p>
            </div>
        </div>
    );
};

export default LoadingSpinner;
