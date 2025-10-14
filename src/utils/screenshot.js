import { domToPng } from 'modern-screenshot';

export const captureScreenshot = async (elementId) => {
  const element = document.getElementById(elementId);
  
  if (!element) {
    throw new Error('Elemento no encontrado');
  }

  try {
    const dataUrl = await domToPng(element, {
      quality: 1.0,
      scale: 3, // Alta resolución para móviles
      backgroundColor: '#1a1a2e',
      style: {
        padding: '20px',
      }
    });

    // Crear un enlace temporal para descargar la imagen
    const link = document.createElement('a');
    const timestamp = new Date().toISOString().slice(0, 10);
    link.download = `push-your-luck-${timestamp}.png`;
    link.href = dataUrl;
    link.click();
    
    return dataUrl;
  } catch (error) {
    console.error('Error al capturar screenshot:', error);
    throw error;
  }
};
