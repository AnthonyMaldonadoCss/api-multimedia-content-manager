import { useState, useEffect } from 'react';
import { getTopics } from '../api/topics';

const FormularioDinamico = () => {
  const [tipoContenido, setTipoContenido] = useState('');
  const [campos, setCampos] = useState([]);

  useEffect(() => {
    // Lógica para cargar el tipo de contenido y sus reglas desde el endpoint
    const obtenerTipoContenido = async () => {
      try {
        const response = await getTopics();
        const data = response.data;
        // Aquí configurar el estado con el tipo de contenido y sus reglas
        setTipoContenido(data.map(c => c.name));
        setCampos(data.map(c => c.rules));
      } catch (error) {
        console.error('Error al obtener el tipo de contenido:', error);
      }
    };

    obtenerTipoContenido();
  }, []);

  const handleTipoContenidoChange = (e) => {
    setTipoContenido(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    console.log('Datos del formulario:', formData);
  };


  return (
    <div>
      <h2>Formulario Dinámico</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Tipo de Contenido:</label>
          <select value={tipoContenido} onChange={handleTipoContenidoChange}>
            <option value="">Selecciona un tipo de contenido</option>
            {/* Aquí puedes mapear los tipos de contenido disponibles */}
            <option value="texto">Texto</option>
            <option value="video">Video</option>
            <option value="imagen">Imagen</option>
          </select>
        </div>
        <div>
          {/* Aquí renderizar los campos dinámicamente según el tipo de contenido */}
          {campos.map((campo, index) => (
            <div key={index}>
              {campo.tipo === 'texto' && (
                <input type="text" name={`campo-${index}`} placeholder={campo.label} />
              )}
              {campo.tipo === 'video' && (
                <input type="url" name={`campo-${index}`} placeholder={campo.label} />
              )}
              {campo.tipo === 'imagen' && (
                <input type="file" name={`campo-${index}`} accept="image/*" placeholder={campo.label} />
              )}
            </div>
          ))}
        </div>
        <button type="submit">Enviar</button>
      </form>
    </div>
  );
};

export default FormularioDinamico;
