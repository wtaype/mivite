import { useEffect, useState } from 'react';
import Header from './Header';
import Canvas from './Canvas';
import ControlPanel from './ControlPanel';
import Footer from './Footer';
import './App.css';


function App() {
  const [drawingSettings, setDrawingSettings] = useState({
    borderWidth: 2,
    borderRadius: 5,
    borderColor: '#000000'
  });

  // Actualizar el tema cuando el componente se monta
  useEffect(() => {
    const applyTheme = () => {
      const savedTheme = localStorage.getItem('mtheme');
      if (savedTheme) {
        const [theme, color] = savedTheme.split('|');
        document.documentElement.dataset.theme = theme;
        
        // Actualizar el color del tema en el meta tag
        const metaThemeColor = document.querySelector('meta[name="theme-color"]');
        if (metaThemeColor) {
          metaThemeColor.content = color;
        } else {
          const meta = document.createElement('meta');
          meta.name = 'theme-color';
          meta.content = color;
          document.head.appendChild(meta);
        }
      }
    };

    applyTheme();
    
    // Cargar la fuente Poppins desde Google Fonts
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = 'https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,500;0,600;0,700;0,800;0,900;1,500;1,600;1,700&display=swap';
    document.head.appendChild(link);
  }, []);

  const handleSettingsChange = (newSettings) => {
    setDrawingSettings({
      ...drawingSettings,
      ...newSettings
    });
  };

  return (
    <div className="miwb hmz">
      <main className="hmp">
        <Canvas settings={drawingSettings} />
      </main>
      <div className="hmx psr">
        <Header />
        <ControlPanel 
          settings={drawingSettings} 
          onSettingsChange={handleSettingsChange} 
        />
        <Footer />
      </div>
      <ThemeSelector />
    </div>
  );
}

// Componente para la selección de temas
const ThemeSelector = () => {
  const themes = [
    {tnm: "Cielo", co: "#0EBEFF"},
    {tnm: "Dulce", co: "#FF5C69"},
    {tnm: "Paz", co: "#29C72E"},
    {tnm: "Mora", co: "#7000FF"},
    {tnm: "Futuro", co: "#21273B"}
  ];

  const setTheme = (theme, color) => {
    document.documentElement.dataset.theme = theme;
    
    const metaThemeColor = document.querySelector('meta[name="theme-color"]');
    if (metaThemeColor) {
      metaThemeColor.content = color;
    } else {
      const meta = document.createElement('meta');
      meta.name = 'theme-color';
      meta.content = color;
      document.head.appendChild(meta);
    }
    
    localStorage.setItem('mtheme', `${theme}|${color}`);
    
    // Remover la clase 'mtha' de todos los temas
    document.querySelectorAll('.tema').forEach(el => {
      el.classList.remove('mtha');
    });
    
    // Añadir la clase 'mtha' al tema seleccionado
    event.currentTarget.classList.add('mtha');
  };

  useEffect(() => {
    // Aplicar el tema guardado cuando el componente se monta
    const savedTheme = localStorage.getItem('mtheme');
    if (savedTheme) {
      const [theme, color] = savedTheme.split('|');
      const themeElement = document.querySelector(`[data-tema="${savedTheme}"]`);
      if (themeElement) {
        themeElement.classList.add('mtha');
      }
    } else if (themes.length > 0) {
      // Aplicar el primer tema por defecto
      const firstTheme = document.querySelector('.tema');
      if (firstTheme) {
        firstTheme.classList.add('mtha');
      }
    }
  }, []);

  return (
    <div className="mthemes">
      {themes.map((theme, index) => (
        <div
          key={index}
          className="tema"
          data-tema={`${theme.tnm}|${theme.co}`}
          style={{ background: theme.co }}
          onClick={() => setTheme(theme.tnm, theme.co)}
        ></div>
      ))}
    </div>
  );
};

export default App;