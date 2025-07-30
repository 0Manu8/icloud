import React, { useState } from 'react';

const ICloudComponent = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [scale, setScale] = useState(.5);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [lastTouch, setLastTouch] = useState({ x: 0, y: 0 });
  const [lastMouse, setLastMouse] = useState({ x: 0, y: 0 }); // Nuevo estado para mouse

  const openModal = () => {
    setIsModalOpen(true);
    setScale(0.5); // Asegurar que siempre inicie en 50%
    document.body.style.overflow = 'hidden';
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setScale(0.5); // Resetear a 50% en lugar de 1
    setPosition({ x: 0, y: 0 });
    document.body.style.overflow = 'auto';
  };

  const handleWheel = (e) => {
    e.preventDefault();
    const delta = e.deltaY > 0 ? -0.1 : 0.1;
    const newScale = Math.max(0.5, Math.min(3, scale + delta));
    setScale(newScale);
  };

  const handleTouchStart = (e) => {
    if (e.touches.length === 1) {
      setIsDragging(true);
      setLastTouch({ x: e.touches[0].clientX, y: e.touches[0].clientY });
    } else if (e.touches.length === 2) {
      // Preparar para zoom con pinch
      const touch1 = e.touches[0];
      const touch2 = e.touches[1];
      const distance = Math.sqrt(
        Math.pow(touch2.clientX - touch1.clientX, 2) +
        Math.pow(touch2.clientY - touch1.clientY, 2)
      );
      setLastTouch({ distance });
    }
  };

  const handleTouchMove = (e) => {
    e.preventDefault();
    
    if (e.touches.length === 1 && isDragging) {
      // Arrastrar imagen
      const deltaX = e.touches[0].clientX - lastTouch.x;
      const deltaY = e.touches[0].clientY - lastTouch.y;
      
      setPosition(prev => ({
        x: prev.x + deltaX,
        y: prev.y + deltaY
      }));
      
      setLastTouch({ x: e.touches[0].clientX, y: e.touches[0].clientY });
    } else if (e.touches.length === 2) {
      // Zoom con pinch
      const touch1 = e.touches[0];
      const touch2 = e.touches[1];
      const distance = Math.sqrt(
        Math.pow(touch2.clientX - touch1.clientX, 2) +
        Math.pow(touch2.clientY - touch1.clientY, 2)
      );
      
      if (lastTouch.distance) {
        const scaleChange = distance / lastTouch.distance;
        const newScale = Math.max(0.5, Math.min(3, scale * scaleChange));
        setScale(newScale);
      }
      
      setLastTouch({ distance });
    }
  };

  const handleTouchEnd = () => {
    setIsDragging(false);
  };

  const resetZoom = () => {
    setScale(0.5); // Resetear a 50% en lugar de 1
    setPosition({ x: 0, y: 0 });
  };

  // Nuevas funciones para mouse
  const handleMouseDown = (e) => {
    setIsDragging(true);
    setLastMouse({ x: e.clientX, y: e.clientY });
    e.preventDefault();
  };

  const handleMouseMove = (e) => {
    if (!isDragging) return;
    
    e.preventDefault();
    const deltaX = e.clientX - lastMouse.x;
    const deltaY = e.clientY - lastMouse.y;
    
    setPosition(prev => ({
      x: prev.x + deltaX,
      y: prev.y + deltaY
    }));
    
    setLastMouse({ x: e.clientX, y: e.clientY });
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  return (
    <>
      <div className='w-full max-w-xs sm:max-w-sm md:max-w-md lg:max-w-2xl xl:max-w-4xl 2xl:max-w-6xl mx-auto px-2 sm:px-4'>
        <img 
          src="/Infografia_FInal_2.png" 
          alt="Infografía iCloud" 
          className="w-full h-auto object-contain rounded-lg shadow-lg cursor-pointer hover:shadow-xl transition-shadow duration-300"
          onClick={openModal}
        />
        <p className="text-center text-sm text-gray-600 mt-2">
          Toca para ampliar
        </p>
      </div>

      {/* Modal con zoom */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-90 z-50 flex items-center justify-center">
          {/* Botones de control */}
          <div className="absolute top-4 right-4 z-60 flex gap-2">
            <button
              onClick={resetZoom}
              className="bg-white bg-opacity-20 p-2 rounded-full hover:bg-opacity-30 transition-all "
            >
              R
            </button>
            <button
              onClick={closeModal}
              className="bg-white text-black bg-opacity-20 p-2 rounded-full hover:bg-opacity-30 transition-all text-xl font-bold"
            >
              ✕
            </button>
          </div>

          {/* Indicador de zoom */}
          <div className="absolute top-4 left-4 z-60 bg-white bg-opacity-20 px-3 py-1 rounded-full text-sm">
            {Math.round(scale * 100)}%
          </div>

          {/* Imagen con zoom */}
          <div 
            className="w-full h-full flex items-center justify-center overflow-hidden cursor-grab active:cursor-grabbing"
            onWheel={handleWheel}
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
            onMouseLeave={handleMouseUp} // Para cuando el mouse sale del área
          >
            <img
              src="/Infografia_FInal_2.png"
              alt="Infografía iCloud"
              className="max-w-none select-none"
              style={{
                transform: `scale(${scale}) translate(${position.x / scale}px, ${position.y / scale}px)`,
                transition: isDragging ? 'none' : 'transform 0.1s ease-out',
                touchAction: 'none',
                userSelect: 'none' // Prevenir selección de texto
              }}
              draggable={false}
            />
          </div>

          {/* Instrucciones actualizadas */}
          <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 z-60 bg-white bg-opacity-60 text-black px-4 py-2 rounded-full text-sm text-center font-medium">
            Zoom y mover
          </div>
        </div>
      )}
    </>
  );
};

export default ICloudComponent;