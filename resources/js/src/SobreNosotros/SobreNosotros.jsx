import React from 'react';
import Header from '../components/Headers/jsx/HeaderIn.jsx';
import { FaUsers } from 'react-icons/fa';
import Footer from '../components/Footer/Footer.jsx';
import img from '../assets/img/98.png';
import './SobreNosotros.css';

function SobreNosotros() {
    return (
        <div className="desktop-container">
            <Header />

            <main className="main-content">
                {/* Equipo */}
                <section className="equipo-section">
                    <div className="equipo-icon">
                        <FaUsers className="icon-user" />
                    </div>
                    <div className="equipo-content">
                    <p>Conoce nuestra misión y al equipo que hace esto posible</p>
                    </div>
                </section>

                {/* Quiénes somos */}
                <section className="section-box">
                    <h2>Quiénes somos</h2>
                    <div className="text-placeholder long">Lorem ipsum dolor sit amet consectetur adipisicing elit. Quasi est porro sapiente consequuntur minima ut optio quo, eius quia. Quis quam, eveniet numquam ipsam ex fugiat nihil enim consequuntur facilis?.
                        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Magnam adipisci pariatur natus saepe hic placeat suscipit vero necessitatibus quae quos, incidunt eaque? Obcaecati possimus, ex modi doloribus quia quis nesciunt!
                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Exercitationem eum unde blanditiis dolores autem? Aliquam voluptates nostrum rem ratione quod, totam porro maiores assumenda a ipsa nam optio unde error.
                        </div>
                </section>

                {/* Equipo educativo */}
                <section className="section-box1">
                    <h2>Equipo Educativo</h2>
                    <div className="equipo-container">
                    <div className="equipo-img">
                        <img
                        src={img}
                        alt="Imagen equipo 1"
                        className="equipo-image"
                    />
                    </div>
                     <div className="equipo-personas">
                    <div className="persona">
                        <h3>Ana Martínez</h3>
                    <div className="text-placeholder short">
                        Lorem, ipsum dolor sit amet consectetur adipisicing elit.
                    </div>
                    </div>
                    <div className="persona">
                        <h3>Ana Martínez</h3>
                    <div className="text-placeholder short">
                        Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    </div>
                    </div>
                    </div>
                    </div>
                </section>

            </main>
            <Footer />
        </div>
    );
}

export default SobreNosotros;
