import React, { useEffect, useRef } from 'react';
import $ from 'jquery';
import html2canvas from 'html2canvas';

const Canvas = ({ settings }) => {
  const canvasRef = useRef(null);
  
  useEffect(() => {
    if (!canvasRef.current) return;
    
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    let inicio = {}, dibujando = false;
    let historial = [];

    // Ajustar el tamaño del canvas
    const resizeCanvas = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
      
      // Restaurar el historial después de redimensionar
      if (historial.length > 0) {
        ctx.putImageData(historial[historial.length - 1], 0, 0);
      }
    };

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    // Evento de mousedown
    const handleMouseDown = (e) => {
      dibujando = true;
      inicio = { x: e.offsetX, y: e.offsetY };
    };

    // Evento de mousemove
    const handleMouseMove = (e) => {
      if (dibujando) {
        const borderWidth = settings.borderWidth;
        const borderRadius = settings.borderRadius;
        const micolor = settings.borderColor;
        
        let width = e.offsetX - inicio.x;
        let height = e.offsetY - inicio.y;

        ctx.clearRect(0, 0, canvas.width, canvas.height);
        if (historial.length > 0) {
          ctx.putImageData(historial[historial.length - 1], 0, 0);
        }

        ctx.beginPath();
        ctx.lineWidth = borderWidth;
        ctx.strokeStyle = micolor;
        
        // Verificar si roundRect está disponible, de lo contrario usar rect
        if (ctx.roundRect) {
          ctx.roundRect(inicio.x, inicio.y, width, height, borderRadius);
        } else {
          ctx.rect(inicio.x, inicio.y, width, height);
        }
        
        ctx.stroke();
      }
    };

    // Evento de mouseup
    const handleMouseUp = () => {
      if (dibujando) {
        dibujando = false;
        historial.push(ctx.getImageData(0, 0, canvas.width, canvas.height));
      }
    };

    // Manejar Ctrl+Z para deshacer
    const handleKeyDown = (e) => {
      if (e.ctrlKey && e.key === 'z' && historial.length > 0) {
        historial.pop();
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        if (historial.length > 0) {
          ctx.putImageData(historial[historial.length - 1], 0, 0);
        }
      }
    };

    // Agregar event listeners
    canvas.addEventListener('mousedown', handleMouseDown);
    canvas.addEventListener('mousemove', handleMouseMove);
    canvas.addEventListener('mouseup', handleMouseUp);
    document.addEventListener('keydown', handleKeyDown);

    // Limpiar event listeners al desmontar
    return () => {
      canvas.removeEventListener('mousedown', handleMouseDown);
      canvas.removeEventListener('mousemove', handleMouseMove);
      canvas.removeEventListener('mouseup', handleMouseUp);
      document.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('resize', resizeCanvas);
    };
  }, [settings]); // Re-ejecutar efecto cuando cambien las configuraciones

  return <canvas ref={canvasRef} className="micanva"></canvas>;
};

export default Canvas;