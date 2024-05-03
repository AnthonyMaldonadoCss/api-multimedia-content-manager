import { useState } from 'react';
import { addTopic } from '../api/topics';

const Formulario = () => {
  // Estado para almacenar el valor seleccionado del select y los permisos
  const [tematicaSeleccionada, setTematicaSeleccionada] = useState('');
  const [permisos, setPermisos] = useState({
    videos: false,
    texto: false,
    imagenes: false
  });

  const handleCategoriaChange = (e) => {
    setTematicaSeleccionada(e.target.value);
  };

  const handleCheckboxChange = (e) => {
    const { name, checked } = e.target;
    setPermisos(prevState => ({
      ...prevState,
      [name]: checked
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = {
      name: tematicaSeleccionada,
      rules: [
        { videos: permisos.videos },
        { texto: permisos.texto },
        { imagenes: permisos.imagenes }
      ]
    };

    try {
      const rest = await addTopic(formData);
      console.log(rest);
      alert('Tematica agregada con exito');
    }
    catch (error) {
      console.log(error);
      if ( error.response.status === 400 ){
        alert(`Error al agregar la tematica: ${error.response.data.message}` );
      }
    }

  };

  return (

    <div className="flex h-[calc(100vh-100px)] justify-center itesms-center">
      <div className="bg-zinc-800 max-w-md w-full p-10 rounded-md">

        <h3 className="text-3xl font-bold text-white">Agrega una temática</h3>

        <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="categoria">Selecciona una temática:</label>
        <select id="categoria" value={tematicaSeleccionada} onChange={handleCategoriaChange}  
          className="w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-2"
          required
        >
          <option value="">Selecciona una temática</option>
          <option value="ciencias">Ciencias</option>
          <option value="matematicas">Matemáticas</option>
          <option value="deporte">Deporte</option>
        </select>
      </div>
      {tematicaSeleccionada && (
        <div>
          <h4>Permisos:</h4>
          <label>
            <input type="checkbox" name="videos" checked={permisos.videos} onChange={handleCheckboxChange}/>
            Videos
          </label>
          <label>
            <input type="checkbox" name="texto" checked={permisos.texto} onChange={handleCheckboxChange} />
            Texto
          </label>
          <label>
            <input type="checkbox" name="imagenes" checked={permisos.imagenes} onChange={handleCheckboxChange} />
            Imágenes
          </label>
        </div>
      )}
      <button type="submit">Enviar</button>
    </form>

      </div>
    </div>
  );
};

export default Formulario;
