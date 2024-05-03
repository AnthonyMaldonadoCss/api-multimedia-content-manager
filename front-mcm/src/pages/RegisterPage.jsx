import { useForm } from "react-hook-form";
import { useAuth } from "../context/AuthContext";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

function RegisterPage() {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const { signup, isAuthenticated, error } = useAuth();
  const navigate = useNavigate();

  const onSubmit = handleSubmit( async (data) => {
    await signup(data);
  });

  useEffect(() => {
    if (isAuthenticated) navigate("/");
  }, [isAuthenticated, navigate])


  return (
    <div className="w-full bg-zinc-800 max-w-md p-10 rounded-sm">

    {
      error && <div className="bg-red-100 border border-red-400 text-red-700 px-5 py-3 rounded relative">
        <p className="text-red-500">{error}</p>
      </div>
    }

      <form onSubmit={onSubmit} >

        <label htmlFor="username">Username or Alias</label>
        <input type="text" name="username" id="username" 
          {...register("username", { required: true })}
          placeholder="Username"
          className="w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-2"
        />
        {errors.username && <p className="text-red-500">This field is required</p>}
        
        <label htmlFor="email">Email</label>
        <input type="email" name="email" id="email" 
          {...register("email", { required: true })}
          placeholder="Email"
          className="w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-2"
        />
        {errors.email && <p className="text-red-500">This field is required</p>}
        
        <label htmlFor="password">Password</label>
        <input type="password" name="password" id="password" 
          {...register("password", { required: true })}
          placeholder="Password"
          className="w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-2"
        />
        {errors.password && <p className="text-red-500">This field is required</p>}
        
        <label htmlFor="option">Rol</label>
        <select { ...register("role", { required: true }) } 
          name="option" id="option" className="w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-2">
          <option value="reader">Lector</option>
          <option value="creator">Creador</option>
        </select>
        {errors.role && <p className="text-red-500">This field is required</p>}
      
      <button type="submit">Register</button>
      </form>
    </div>
  )
}

export default RegisterPage
