import React, { useState, useMemo } from 'react';
import CardMenu from '../../components/cards/CardMenu';
import "../../styles/view/MainMenuStyle.css"; // Asegúrate de tener el CSS adecuado
import { ReceiptText, IceCream} from 'lucide-react';
import { TbIceCream2 } from "react-icons/tb";
import { GiStrawberry } from "react-icons/gi";
import { getMenu } from '../../js/menu/menu';
import { VscDebugBreakpointLog } from "react-icons/vsc";
import { LuCakeSlice } from "react-icons/lu";
import { MdLocalDrink } from "react-icons/md";
import { FaMugHot } from "react-icons/fa";

// Define tus productos aquí para mantener las rutas y clases existentes
const PRODUCTS = getMenu();

const CATEGORIES = [
  { key: 'todos', label: 'Todos', icon: <ReceiptText /> },
  { key: 'crepas', label: 'Crepas', icon: <LuCakeSlice /> },
  { key: 'bebidas frías', label: 'Bebidas Frías', icon: <MdLocalDrink /> },
  { key: 'bebidas calientes', label: 'Bebidas Calientes', icon: <FaMugHot /> },
  { key: 'helados', label: 'Helados', icon: <IceCream />},
  { key: 'granizados', label: 'Granizados', icon: <TbIceCream2 />},
  { key: 'fresas', label: 'Fresas', icon: <GiStrawberry />},
  { key: 'extras', label: 'Extras', icon: <VscDebugBreakpointLog />},
];

export default function MainMenu() {
  const [selectedCategory, setSelectedCategory] = useState('todos');

  // Filtrar productos basado en la categoría seleccionada
  const filteredProducts = useMemo(() => {
    if (selectedCategory === 'todos') {
      return PRODUCTS;
    }
    return PRODUCTS.filter(
      (p) => p.categoria.toLowerCase() === selectedCategory.toLowerCase()
    );
  }, [selectedCategory]);

  const handleCategoryClick = (categoryKey) => {
    setSelectedCategory(categoryKey);
  };

  return (
    <>
      <div className="main-menu-header">
        <div className="title-container">
          <h1 className="main-title">
            <span className="title-accent">Nuestro</span>
            <span className="title-main">Menú</span>
          </h1>
          <div className="title-decoration">
            <div className="decoration-line"></div>
            <div className="decoration-dot"></div>
            <div className="decoration-line"></div>
          </div>
          <p className="title-subtitle">Descubre sabores únicos creados con pasión</p>
        </div>
      </div>

      <section className="category-filter-section py-4">
        <div className="container">
          <div className="filter-container">
            <div className="filter-header text-center mb-4">
              <h3 className="filter-title">
                <i className="fas fa-utensils me-2"></i>
                ¿Qué tipo de crepe te apetece?
              </h3>
              <p className="filter-subtitle">
                Selecciona una categoría para ver nuestras deliciosas opciones
              </p>
            </div>

            <div className="category-buttons-container">
              <div className="row g-3 justify-content-center">
                {CATEGORIES.map(({ key, label, icon }) => {
                  const isActive = key === selectedCategory;
                  // Cuenta dinámicamente productos por categoría
                  const count =
                    key === 'todos'
                      ? PRODUCTS.length
                      : PRODUCTS.filter(
                          (p) => p.categoria.toLowerCase() === key
                        ).length;

                        
                  return (
                    <div key={key} className="col-lg-2 col-md-3 col-sm-4 col-6">
                      <button
                        className={`category-btn ${isActive ? 'active' : ''}`}
                        onClick={() => handleCategoryClick(key)}
                        type="button"
                      >
                        <div className="btn-icon">
                          {icon}
                        </div>
                        <p className="btn-text">{label}</p>
                        <div className="btn-count">{count}</div>
                      </button>
                    </div>
                  );
                })}
              </div>
            </div>

            <div className="current-selection text-center mt-4">
              <div className="selection-indicator">
                <i className="fas fa-filter me-2"></i>
                Mostrando: <p className="current-category">
                  {selectedCategory === 'todos'
                    ? 'Todos los crepes'
                    : CATEGORIES.find(c => c.key === selectedCategory)?.label}
                </p>
                <p className="current-count">({filteredProducts.length} productos)</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="row container-fluid justify-content-center mt-5">
        {filteredProducts.map((item) => (
          <div key={item.id} className="col-12 col-md-3 mt-3" data-aos="fade-up">
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

      
    </>
  );
}
