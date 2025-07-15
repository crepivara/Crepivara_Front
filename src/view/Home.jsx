import React, { useState, useRef, useEffect } from "react";
import "../styles/view/HomeStyle.css";
import { Link } from "react-router-dom";
import { useInView } from "react-intersection-observer";
import { getRecommended } from "../js/menu/menu";
import CardMenu from "../components/cards/CardMenu";
import { FaRegHeart } from "react-icons/fa";
import { BsStars } from "react-icons/bs";
import { IoShieldCheckmark } from "react-icons/io5";
import { IoIosRocket } from "react-icons/io";

export default function Home() {
  // Asegúrate de que apunten a rutas válidas en tu carpeta "public/images"
  const images = [
    "/images/LogoFondo.webp",
    "/images/home/foto1.webp",
    "/images/home/foto2.webp",
  ];

  const CREPAS = getRecommended();

  const [current, setCurrent] = useState(0);
  const [loaded, setLoaded] = useState(false);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const timeoutRef = useRef(null);
  // Intervalo en milisegundos
  const intervalMs = 5000;

  const { ref: inViewRef, inView } = useInView({ triggerOnce: true });

  useEffect(() => {
    if (!inView) return;

    timeoutRef.current = setTimeout(() => {
      setIsTransitioning(true);
      setLoaded(false);

      // Pequeño delay para la transición
      setTimeout(() => {
        setCurrent((i) => (i + 1) % images.length);
        setIsTransitioning(false);
      }, 300);
    }, intervalMs);

    return () => clearTimeout(timeoutRef.current);
  }, [current, inView, intervalMs, images.length]);

  return (
    <>
      <section
        id="home"
        className="hero container-fluid d-flex align-items-center"
      >
        <div className="container">
          <div className="row justify-content-center align-items-center g-4">
            {/* Texto y botones */}
            <div className="col-12 col-lg-6 d-flex flex-column align-items-center mb-4 mb-lg-0">
              <div className="hero-content text-center">
                <h1 className="hero-title display-3 fw-bold mb-3">CrepiVara</h1>
                <p className="hero-subtitle lead mb-4">
                  Deliciosas crepas artesanales hechas con amor…
                </p>
                <div className="cta-buttons d-flex flex-column flex-sm-row gap-3 justify-content-center">
                  <Link to="/menu" className="btn btn-primary btn-lg px-4 py-3">
                    <i className="fas fa-utensils me-2"></i>
                    Ver Menú
                  </Link>
                </div>
              </div>
            </div>

            {/* Slider Mejorado */}
            <div className="col-12 col-lg-6 d-flex justify-content-center align-items-center">
              <div
                ref={inViewRef}
                className="image-slider-container position-relative"
              >
                {inView && (
                  <div className="slider-wrapper d-flex justify-content-center align-items-center">
                    {/* Imagen principal */}
                    <div className="main-image-container position-relative overflow-hidden d-flex justify-content-center align-items-center">
                      <img
                        key={current}
                        src={images[current]}
                        alt={`Slide ${current + 1}`}
                        className={`main-slide-img img-fluid ${
                          loaded ? "visible" : ""
                        } ${isTransitioning ? "transitioning" : ""}`}
                        onLoad={() => setLoaded(true)}
                      />
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Elementos decorativos de fondo */}
        <div className="floating-shapes">
          <div className="shape shape-1"></div>
          <div className="shape shape-2"></div>
          <div className="shape shape-3"></div>
        </div>
      </section>

      <div className="container-fluid wave1">
        {/* Elimina xmlns y xmlns:xlink */}
        <svg viewBox="0 0 1910 211">
          <path
            fill="var(--background-color-1)"
            d="M 0 0 C 64 0 64 119 128 119 L 128 119 L 128 0 L 0 0 Z"
            strokeWidth="0"
          ></path>
          <path
            fill="var(--background-color-1)"
            d="M 127 119 C 200.5 119 200.5 86 274 86 L 274 86 L 274 0 L 127 0 Z"
            strokeWidth="0"
          ></path>
          <path
            fill="var(--background-color-1)"
            d="M 273 86 C 375.5 86 375.5 168 478 168 L 478 168 L 478 0 L 273 0 Z"
            strokeWidth="0"
          ></path>
          <path
            fill="var(--background-color-1)"
            d="M 477 168 C 551.5 168 551.5 29 626 29 L 626 29 L 626 0 L 477 0 Z"
            strokeWidth="0"
          ></path>
          <path
            fill="var(--background-color-1)"
            d="M 625 29 C 684.5 29 684.5 111 744 111 L 744 111 L 744 0 L 625 0 Z"
            strokeWidth="0"
          ></path>
          <path
            fill="var(--background-color-1)"
            d="M 743 111 C 797.5 111 797.5 17 852 17 L 852 17 L 852 0 L 743 0 Z"
            strokeWidth="0"
          ></path>
          <path
            fill="var(--background-color-1)"
            d="M 851 17 C 916.5 17 916.5 197 982 197 L 982 197 L 982 0 L 851 0 Z"
            strokeWidth="0"
          ></path>
          <path
            fill="var(--background-color-1)"
            d="M 981 197 C 1033 197 1033 86 1085 86 L 1085 86 L 1085 0 L 981 0 Z"
            strokeWidth="0"
          ></path>
          <path
            fill="var(--background-color-1)"
            d="M 1084 86 C 1138.5 86 1138.5 145 1193 145 L 1193 145 L 1193 0 L 1084 0 Z"
            strokeWidth="0"
          ></path>
          <path
            fill="var(--background-color-1)"
            d="M 1192 145 C 1216.5 145 1216.5 110 1241 110 L 1241 110 L 1241 0 L 1192 0 Z"
            strokeWidth="0"
          ></path>
          <path
            fill="var(--background-color-1)"
            d="M 1240 110 C 1315 110 1315 32 1390 32 L 1390 32 L 1390 0 L 1240 0 Z"
            strokeWidth="0"
          ></path>
          <path
            fill="var(--background-color-1)"
            d="M 1389 32 C 1456 32 1456 109 1523 109 L 1523 109 L 1523 0 L 1389 0 Z"
            strokeWidth="0"
          ></path>
          <path
            fill="var(--background-color-1)"
            d="M 1522 109 C 1630 109 1630 187 1738 187 L 1738 187 L 1738 0 L 1522 0 Z"
            strokeWidth="0"
          ></path>
          <path
            fill="var(--background-color-1)"
            d="M 1737 187 C 1823.5 187 1823.5 0 1910 0 L 1910 0 L 1910 0 L 1737 0 Z"
            strokeWidth="0"
          ></path>
        </svg>
      </div>

      <section
        className="container-fluid py-5 destacados-section"
        id="recommendations"
      >
        <div className="container">
          <div className="row mb-5">
            <div className="col-12">
              <h2 className="destacados-title display-4">
                Productos Recomendados
              </h2>
              <p className="destacados-subtitle lead">
                Las crepas más populares de nuestra crepería, preparadas con
                ingredientes frescos y mucho amor
              </p>
            </div>
          </div>

          <div className="row g-4 justify-content-center">
            {CREPAS.map((item, index) => (
              <div key={item.id} className="col-12 col-md-3 mt-3" data-aos="flip-left">
                <CardMenu
                  nombre={item.nombre}
                  descripcion={item.descripcion}
                  precio={item.precio}
                  imagenes={item.imagenes}
                  ingredientes={item.ingredientes}
                  disponible={item.disponible}
                  categoria={item.categoria}
                  id={item.id}
                  className="mt-3 mb-3"
                />
              </div>
            ))}
          </div>

          <div className="row mt-5">
            <div className="col-12 text-center">
              <Link
                to="/menu"
                className="btn btn-lg px-5 py-3 btn-menu-completo"
              >
                <i className="fas fa-utensils me-2"></i>
                Ver Menú Completo
              </Link>
            </div>
          </div>
        </div>
      </section>

      <div className="container-fluid wave2">
        <svg viewBox="0 0 1536 200">
          <path
            fill="var(--background-color-2"
            d="M 0 0 C 99.5 0 99.5 28 199 28 L 199 28 L 199 0 L 0 0 Z"
            strokeWidth="0"
          ></path>
          <path
            fill="var(--background-color-2"
            d="M 198 28 C 300 28 300 120 402 120 L 402 120 L 402 0 L 198 0 Z"
            strokeWidth="0"
          ></path>
          <path
            fill="var(--background-color-2"
            d="M 401 120 C 509 120 509 202 617 202 L 617 202 L 617 0 L 401 0 Z"
            strokeWidth="0"
          ></path>
          <path
            fill="var(--background-color-2"
            d="M 616 202 C 672.5 202 672.5 94 729 94 L 729 94 L 729 0 L 616 0 Z"
            strokeWidth="0"
          ></path>
          <path
            fill="var(--background-color-2"
            d="M 728 94 C 781 94 781 174 834 174 L 834 174 L 834 0 L 728 0 Z"
            strokeWidth="0"
          ></path>
          <path
            fill="var(--background-color-2"
            d="M 833 174 C 881 174 881 110 929 110 L 929 110 L 929 0 L 833 0 Z"
            strokeWidth="0"
          ></path>
          <path
            fill="var(--background-color-2"
            d="M 928 110 C 963 110 963 149 998 149 L 998 149 L 998 0 L 928 0 Z"
            strokeWidth="0"
          ></path>
          <path
            fill="var(--background-color-2"
            d="M 997 149 C 1073 149 1073 203 1149 203 L 1149 203 L 1149 0 L 997 0 Z"
            strokeWidth="0"
          ></path>
          <path
            fill="var(--background-color-2"
            d="M 1148 203 C 1218.5 203 1218.5 110 1289 110 L 1289 110 L 1289 0 L 1148 0 Z"
            strokeWidth="0"
          ></path>
          <path
            fill="var(--background-color-2"
            d="M 1288 110 C 1342 110 1342 167 1396 167 L 1396 167 L 1396 0 L 1288 0 Z"
            strokeWidth="0"
          ></path>
          <path
            fill="var(--background-color-2"
            d="M 1395 167 C 1460.5 167 1460.5 0 1526 0 L 1526 0 L 1526 0 L 1395 0 Z"
            strokeWidth="0"
          ></path>
        </svg>
      </div>

      <section className="mt-5">
        <div className="container-fluid">
          <div className="row justify-content-center">
            <div className="col-12">
              <div className="feedback-section">
                <div className="floating-elements">
                  <div className="floating-element"></div>
                  <div className="floating-element"></div>
                  <div className="floating-element"></div>
                  <div className="floating-element"></div>
                </div>

                <div className="feedback-header">
                  <div className="icon">
                    <FaRegHeart/>
                  </div>
                  <h2 className="feedback-title">Ayúdanos a Mejorar</h2>
                  <p className="feedback-subtitle">
                    Tu opinión es valiosa para nosotros
                  </p>
                </div>

                <div className="feedback-content">
                  <p className="feedback-description">
                    Queremos ofrecerte la mejor experiencia posible. Comparte tu
                    opinión y ayúdanos a crear algo increíble juntos.
                  </p>

                  <div className="feedback-features" data-aos="flip-right">
                    <div className="feature-card">
                      <div className="feature-icon">
                        <BsStars />
                      </div>
                      <h4 className="feature-title">Solo 3 minutos</h4>
                      <p className="feature-text">
                        Una encuesta rápida y sencilla que no te quitará mucho
                        tiempo
                      </p>
                    </div>

                    <div className="feature-card" data-aos="flip-right">
                      <div className="feature-icon">
                        <IoShieldCheckmark />
                      </div>
                      <h4 className="feature-title">100% Anónimo</h4>
                      <p className="feature-text">
                        Tus respuestas son completamente privadas y
                        confidenciales
                      </p>
                    </div>

                    <div className="feature-card" data-aos="flip-right">
                      <div className="feature-icon">
                        <IoIosRocket />
                      </div>
                      <h4 className="feature-title">Impulsa mejoras</h4>
                      <p className="feature-text">
                        Tu feedback nos ayuda a implementar funciones que
                        realmente necesitas
                      </p>
                    </div>
                  </div>

                  <div className="cta-container">
                    <a
                      href="https://forms.office.com/pages/responsepage.aspx?id=DQSIkWdsW0yxEjajBLZtrQAAAAAAAAAAAAO__plRoXFUQ0tUN1pWMEhWR0lWUTU0R1BSUlNVMzBVUC4u&origin=QRCode&route=shorturl"
                      className="cta-button"
                    >
                      <i className="fas fa-comment-dots"></i>
                      Participar en la Encuesta
                    </a>
                  </div>

                  <div className="feedback-note">
                    <p className="feedback-note-text">
                      <i className="fas fa-info-circle"></i>
                      Cada respuesta cuenta y nos ayuda a mejorar continuamente
                      nuestro servicio para ti.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="container-fluid wave3">
        <svg viewBox="0 0 1920 200" xmlns="http://www.w3.org/2000/svg">
          <path
            fill="var(--background-color-1)"
            d="M 0 0 C 65 0 65 168 130 168 L 130 168 L 130 0 L 0 0 Z"
            strokeWidth="0"
          ></path>
          <path
            fill="var(--background-color-1)"
            d="M 129 168 C 195.5 168 195.5 29 262 29 L 262 29 L 262 0 L 129 0 Z"
            strokeWidth="0"
          ></path>
          <path
            fill="var(--background-color-1)"
            d="M 261 29 C 380.5 29 380.5 135 500 135 L 500 135 L 500 0 L 261 0 Z"
            strokeWidth="0"
          ></path>
          <path
            fill="var(--background-color-1)"
            d="M 499 135 C 583 135 583 81 667 81 L 667 81 L 667 0 L 499 0 Z"
            strokeWidth="0"
          ></path>
          <path
            fill="var(--background-color-1)"
            d="M 666 81 C 734.5 81 734.5 22 803 22 L 803 22 L 803 0 L 666 0 Z"
            strokeWidth="0"
          ></path>
          <path
            fill="var(--background-color-1)"
            d="M 802 22 C 927 22 927 140 1052 140 L 1052 140 L 1052 0 L 802 0 Z"
            strokeWidth="0"
          ></path>
          <path
            fill="var(--background-color-1)"
            d="M 1051 140 C 1101 140 1101 110 1151 110 L 1151 110 L 1151 0 L 1051 0 Z"
            strokeWidth="0"
          ></path>
          <path
            fill="var(--background-color-1)"
            d="M 1150 110 C 1204.5 110 1204.5 149 1259 149 L 1259 149 L 1259 0 L 1150 0 Z"
            strokeWidth="0"
          ></path>
          <path
            fill="var(--background-color-1)"
            d="M 1258 149 C 1312 149 1312 129 1366 129 L 1366 129 L 1366 0 L 1258 0 Z"
            strokeWidth="0"
          ></path>
          <path
            fill="var(--background-color-1)"
            d="M 1365 129 C 1394.5 129 1394.5 110 1424 110 L 1424 110 L 1424 0 L 1365 0 Z"
            strokeWidth="0"
          ></path>
          <path
            fill="var(--background-color-1)"
            d="M 1423 110 C 1464 110 1464 71 1505 71 L 1505 71 L 1505 0 L 1423 0 Z"
            strokeWidth="0"
          ></path>
          <path
            fill="var(--background-color-1)"
            d="M 1504 71 C 1617.5 71 1617.5 113 1731 113 L 1731 113 L 1731 0 L 1504 0 Z"
            strokeWidth="0"
          ></path>
          <path
            fill="var(--background-color-1)"
            d="M 1730 113 C 1820 113 1820 0 1910 0 L 1910 0 L 1910 0 L 1730 0 Z"
            strokeWidth="0"
          ></path>
        </svg>
      </div>
    </>
  );
}
