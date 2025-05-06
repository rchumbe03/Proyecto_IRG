import React from 'react';
import './ListaCursos.css';
import HeaderPl from './HeaderPl';
import Footer from './Footer';

const courses = [
    {
        id: 1,
        title: 'Curso Online',
        description: 'Pasa al siguiente nivel!',
        image: 'https://via.placeholder.com/329x329',
    },
    {
        id: 2,
        title: 'Curso Online',
        description: 'Aprende a tu ritmo!',
        image: 'https://via.placeholder.com/329x329',
    },
    // Puedes añadir más cursos
];

const ListaCursos = () => {
    return (
        <div className="container">
            <HeaderPl />
            <div className="course-page">
                <h1 className="title">Mis Cursos</h1>
                <div className="course-list">
                    {courses.map((course) => (
                        <div key={course.id} className="course-card">
                            <img src={course.image} alt={course.title} className="course-img" />
                            <h3 className="course-title">{course.title}</h3>
                            <p className="course-desc">{course.description}</p>
                            <div className="button-group">
                                <button className="course-button">Acceder</button>
                                <button className="course-button">Detalles</button>
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
