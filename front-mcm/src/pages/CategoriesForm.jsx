import { useState } from 'react';
import { useForm } from "react-hook-form";
import { addCategory } from '../api/categories';

const FormularioCategoria = () => {
  const [imagen, setImagen] = useState(null);
  const { handleSubmit, register, formState: { errors }} = useForm();

  // Manejador de cambio para el input de la imagen
  const handleImagenChange = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.onload = () => {
      setImagen( (reader.result).split(',')[0] );
      console.log(reader.result);
    };
    reader.readAsDataURL(file);
  };
  const onSubmit = handleSubmit( async (data) => {
    console.log(data);
    data.imagen = imagen;
    try{
      const rest = await addCategory(data);
      console.log(rest);
      alert('Categoría agregada con exito');
    }
    catch (error) {
      console.log(error);
      if ( error.response.status === 400 ){
        alert(`Error al agregar la categoría: ${error.response.data.message}` );
      }
    }
  });

  return (

    <div className="flex h-[calc(100vh-100px)] justify-center itesms-center">
      <div className="bg-zinc-800 max-w-md w-full p-10 rounded-md">
        <h3 className="text-3xl font-bold text-white">Agrega una categoría</h3>

        <form onSubmit={onSubmit}>
    
        
          <label htmlFor="name">Categoría:</label>
          <input 
            type="text" 
            name="name" 
            id="name" 
            className="w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-2"
            {...register("name", { required: true })}
          />
          {errors.name && <p className="text-red-500">This field is required</p>}
        
          <label htmlFor="imagen">Imagen:</label>
          <input type="file" id="imagen" accept='png, jpg, jpeg' 
            onChangeCapture={ handleImagenChange }
          {...register("imagen", { required: true })}
          />
          {errors.imagen && <p className="text-red-500">This field is required</p>}
      
        <button type="submit">Enviar</button>
      </form>
      </div>
    </div>
  );
};

export default FormularioCategoria;
