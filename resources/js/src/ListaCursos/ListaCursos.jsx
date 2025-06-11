import React, { useEffect, useState } from 'react';
import './ListaCursos.css';
import HeaderPl from '../components/Headers/jsx/HeaderPl.jsx';
import Footer from '../components/Footer/Footer.jsx';
import img from '../assets/img/98.png';

const ListaCursos = () => {
    const [cursos, setCursos] = useState([]);

    useEffect(() => {
        fetch('http://127.0.0.1:8000/api/cursos', {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
            },
            credentials: 'include',
        })
            .then(res => {
                if (!res.ok) throw new Error('Error al obtener cursos');
                return res.json();
            })
            .then(data => {
                setCursos(data);
            })
            .catch(err => console.error('Error de fetch:', err));
    }, []);

    return (
        <div className="cursos-container">
            <HeaderPl />
            <div className="course-page">
                <h1 className="title">Mis Cursos</h1>
                <div className="course-list">
                    {cursos.map(course => (
                        <div key={course.id} className="course-card">
                            <img
                                src={course.imagen || img}
                                alt={course.titulo}
                                className="course-img"
                            />
                            <h3 className="course-title">{course.titulo}</h3>
                            <p className="course-developer">{course.desarrollador}</p>
                            <div className="button-group">
                                <button className="course-button">Detalles</button>
                                <button className="course-button">Acceder</button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
            <Footer />
        </div>
    );
};

export default ListaCursos;

