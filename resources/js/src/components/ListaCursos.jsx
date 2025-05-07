import React, { useEffect, useState } from 'react';
import './ListaCursos.css';
import HeaderPl from './HeaderPl';
import Footer from './Footer';

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
                console.log('Response:', res);
                if (!res.ok) throw new Error('Error al obtener cursos');
                return res.json();
            })
            .then(data => {
                console.log('Cursos:', data);
                setCursos(data);
            })
            .catch(err => console.error('Error de fetch:', err));
    }, []);

    return (
        <div className="container">
            <HeaderPl />
            <div className="course-page">
                <h1 className="title">Mis Cursos</h1>
                <div className="course-list">
                    {cursos.map(course => (
                        <div key={course.id} className="course-card">
                            {course.imagen ? (
                                <img src={course.imagen} alt={course.titulo} />
                            ) : null}
                            <h3 className="course-title">{course.titulo}</h3>
                            <p className="course-theme">{course.tema}</p>
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
