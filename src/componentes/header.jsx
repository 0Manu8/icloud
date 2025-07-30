import React, { useState, useEffect } from 'react';

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(null);
  const [isDropdownActive, setIsDropdownActive] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false); // Nuevo estado para menú móvil

  // Estado para controlar si el dropdown está "montado" para la animación de salida
  const [showDropdownContent, setShowDropdownContent] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Efecto para controlar el estado del overlay borroso y la animación de entrada/salida del dropdown
  useEffect(() => {
    if (activeDropdown !== null) {
      setIsDropdownActive(true); // Activa el overlay
      // Pequeño retardo para que el overlay se active antes de que el dropdown empiece a aparecer
      const timer = setTimeout(() => setShowDropdownContent(true), 80); 
      return () => clearTimeout(timer);
    } else {
      setShowDropdownContent(false); // Inicia la animación de salida del dropdown
      // Retardo para que el overlay se desactive después de que el dropdown termine de desaparecer
      const timer = setTimeout(() => setIsDropdownActive(false), 100); // Coincide con la duración de la transición del dropdown
      return () => clearTimeout(timer);
    }
  }, [activeDropdown]);

  const menuItems = [
    {
      name: 'Tienda',
      dropdown: [
        'Comprar iPhone',
        'Comprar iPad',
        'Comprar Mac',
        'Comprar Watch',
        'Comprar AirPods',
        'Accesorios'
      ]
    },
    {
      name: 'Mac',
      dropdown: [
        'MacBook Air',
        'MacBook Pro',
        'iMac',
        'Mac mini',
        'Mac Studio',
        'Mac Pro'
      ]
    },
    {
      name: 'iPad',
      dropdown: [
        'iPad Pro',
        'iPad Air',
        'iPad',
        'iPad mini',
        'Apple Pencil',
        'Teclados'
      ]
    },
    {
      name: 'iPhone',
      dropdown: [
        'iPhone 15 Pro',
        'iPhone 15',
        'iPhone 14',
        'iPhone 13',
        'iPhone SE',
        'Accesorios'
      ]
    },
    {
      name: 'Watch',
      dropdown: [
        'Apple Watch Series 9',
        'Apple Watch Ultra 2',
        'Apple Watch SE',
        'Apple Watch Nike',
        'Apple Watch Hermès',
        'Correas'
      ]
    },
    {
      name: 'AirPods',
      dropdown: [
        'AirPods Pro',
        'AirPods (3.ª generación)',
        'AirPods (2.ª generación)',
        'AirPods Max',
        'Accesorios'
      ]
    },
    {
      name: 'TV y Casa',
      dropdown: [
        'Apple TV 4K',
        'HomePod',
        'HomePod mini',
        'Apple TV+',
        'Apple Music',
        'Accesorios'
      ]
    },
    {
      name: 'Entretenimiento',
      dropdown: [
        'Apple TV+',
        'Apple Music',
        'Apple Arcade',
        'Apple Fitness+',
        'Apple News+',
        'Apple Podcasts'
      ]
    },
    {
      name: 'Accesorios',
      dropdown: [
        'Para Mac',
        'Para iPad',
        'Para iPhone',
        'Para Watch',
        'Para AirPods',
        'Beats'
      ]
    },
    {
      name: 'Soporte',
      dropdown: [
        'Soporte técnico',
        'AppleCare+',
        'Estado del sistema',
        'Contactar',
        'Comunidad',
        'Manuales'
      ]
    }
  ];

  // Función para alternar el menú móvil
  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
    setActiveDropdown(null); // Cerrar cualquier dropdown activo
  };

  // Función para manejar clicks en items del menú móvil
  const handleMobileMenuItemClick = (index) => {
    setActiveDropdown(activeDropdown === index ? null : index);
  };

  return (
    <>
      <header 
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled 
            ? 'bg-white/95 backdrop-blur-md border-b border-gray-200 shadow-sm' 
            : 'bg-white/95 backdrop-blur-sm'
        }`}
      >
        <nav className="max-w-7xl mx-auto px-4">
          <div className="flex items-center justify-between h-12">
            {/* Apple Logo */}
            <div className="flex-shrink-0">
              <svg 
                  className={`w-4 h-4 transition-colors duration-300 ${
                   isScrolled ? 'text-black' : 'text-black'
                  }`} 
                viewBox="0 0 24 24" 
                fill="currentColor"
              >
                <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z"/>
              </svg>
            </div>

            {/* Navigation Menu - Desktop */}
            <div className="hidden md:flex items-center space-x-8">
              {menuItems.map((item, index) => (
                <div 
                  key={index}
                  className="relative group"
                  onMouseEnter={() => setActiveDropdown(index)}
                  onMouseLeave={() => setActiveDropdown(null)}
                >
                  <button 
                      className={`text-sm md:text-base font-normal transition-colors duration-300 ${
                       isScrolled ? 'text-black hover:text-gray-600' : 'text-black hover:text-gray-700'
                      }`}
                    >
                    {item.name}
                  </button>
                  
                  {/* Dropdown Menu - Desktop */}
                  {(activeDropdown === index || (activeDropdown === null && showDropdownContent && index === activeDropdown)) && (
                     <div 
                       className={`fixed left-0 mt-2 w-screen bg-white rounded-lg shadow-lg border border-gray-200 py-2 z-50 
                         transition-all duration-200 ease-out text-center 
                         ${showDropdownContent && activeDropdown === index ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-2'}`
                       }
                     >
                      {item.dropdown.map((dropdownItem, dropdownIndex) => (
                        <a
                          key={dropdownIndex}
                          href="#"
                          className="block px-4 py-2 text-sm md:text-base text-gray-700 hover:bg-gray-50 hover:text-blue-600 transition-colors duration-200"
                        >
                          {dropdownItem}
                        </a>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>

            {/* Mobile Menu Button y Search/Bag Icons */}
            <div className="flex items-center space-x-4">
              {/* Hamburger Menu Button - Solo visible en móvil */}
              <button 
                className="md:hidden p-2"
                onClick={toggleMobileMenu}
                aria-label="Abrir menú"
              >
                <div className="w-6 h-6 flex flex-col justify-center space-y-1">
                  <span className={`block w-full h-[0.1rem] bg-black transition-all duration-300 ${
                    isMobileMenuOpen ? 'transform rotate-45 translate-y-.8' : ''
                  }`}></span>
                  <span className={`block w-full h-0 bg-black transition-all duration-300 ${
                    isMobileMenuOpen ? 'opacity-0' : ''
                  }`}></span>
                  <span className={`block w-full h-[0.1rem] bg-black transition-all duration-300 ${
                    isMobileMenuOpen ? 'transform -rotate-45 -translate-y-.8' : ''
                  }`}></span>
                </div>
              </button>

              {/* Search Icon */}
              <button className={`transition-colors duration-300 ${
                 isScrolled ? 'text-black hover:text-gray-600' : 'text-black hover:text-gray-700'
                }`}>
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </button>
              
              {/* Bag Icon */}
              <button className={`transition-colors duration-300 ${
                 isScrolled ? 'text-black hover:text-gray-600' : 'text-black hover:text-gray-700'
                }`}>
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                </svg>
              </button>
            </div>
          </div>
        </nav>

        {/* Mobile Menu */}
        <div className={`md:hidden bg-white border-t border-gray-200 transition-all duration-300 overflow-hidden ${
          isMobileMenuOpen ? 'max-h-screen opacity-100' : 'max-h-0 opacity-0'
        }`}>
          <div className="px-4 py-2 space-y-1">
            {menuItems.map((item, index) => (
              <div key={index} className="border-b border-gray-100 last:border-b-0">
                <button
                  className="w-full flex items-center justify-between py-3 text-left text-base sm:text-lg font-medium text-gray-900 hover:text-blue-600 transition-colors duration-200"
                  onClick={() => handleMobileMenuItemClick(index)}
                >
                  {item.name}
                  <svg 
                    className={`w-4 h-4 transition-transform duration-200 ${
                      activeDropdown === index ? 'rotate-180' : ''
                    }`} 
                    fill="none" 
                    stroke="currentColor" 
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
                
                {/* Mobile Dropdown */}
                <div className={`overflow-hidden transition-all duration-300 ${
                  activeDropdown === index ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
                }`}>
                  <div className="pb-2">
                    {item.dropdown.map((dropdownItem, dropdownIndex) => (
                      <a
                        key={dropdownIndex}
                        href="#"
                        className="block py-2 pl-4 text-sm sm:text-base text-gray-600 hover:text-blue-600 hover:bg-gray-50 transition-colors duration-200"
                      >
                        {dropdownItem}
                      </a>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </header>
      
      {/* iCloud+ Banner */}
      <div className={`fixed top-12 left-0 right-0 z-40 transition-all duration-300 ${
        isScrolled 
          ? 'bg-blue-500 text-white' 
          : 'bg-blue-600 text-white'
      }`}>
        <div className="max-w-7xl mx-auto px-4 py-2 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <span className="text-sm sm:text-base font-medium">iCloud+</span>
          </div>
          <button className="bg-blue-700 hover:bg-blue-800 text-white text-xs sm:text-sm px-3 py-1 rounded-full transition-colors duration-200">
            Actualizar
          </button>
        </div>
      </div>

      {/* Overlay borroso que abarca todo el ancho */}
      {isDropdownActive && (
        <div 
          className={`fixed top-0 left-0 w-full h-screen bg-black/30 backdrop-blur-md z-40 transition-opacity duration-300 ${
            isDropdownActive ? 'opacity-100' : 'opacity-0'
          }`}
          style={{ paddingTop: '10px' }}
          onClick={() => setActiveDropdown(null)}
        ></div>
      )}
    </>
  );
};

export default Header;
