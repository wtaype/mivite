import React, { useState, useEffect } from 'react';

const Footer = () => {
  const [currentYear, setCurrentYear] = useState(new Date().getFullYear());
  const [currentTime, setCurrentTime] = useState(new Date().toLocaleString());
  const [showAbout, setShowAbout] = useState(false);

  return (
    <>
      <footer className='foo wb txc psa'>
        <span>Creado con<span className='wicon wi-corazon'></span>by @wilder.taype 2024 -</span>
        <span className='wty'>{currentYear}</span>
        <span className='abw' onClick={() => setShowAbout(!showAbout)}>| Acerca del app |</span>
        <span>actualizado:</span>
        <span className='wtu'>{currentTime}</span>
      </footer>
      
      {showAbout && (
        <div className='abwc'>
          <p>Esta es una aplicación para dibujar formas rectangulares con esquinas redondeadas.</p>
          <p>Puedes ajustar el ancho del borde, el radio de las esquinas y el color.</p>
          <p>Para deshacer, presiona Ctrl+Z.</p>
          <button className='abwok' onClick={() => setShowAbout(false)}>Cerrar</button>
        </div>
      )}
    </>
  );
};

export default Footer;