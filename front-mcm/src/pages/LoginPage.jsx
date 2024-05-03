import { useForm } from "react-hook-form";
import { useAuth } from "../context/AuthContext";
// import { useEffect } from "react";
import {  Link } from "react-router-dom";
function LoginPage() {
  
  const { register, handleSubmit, formState: { errors } } = useForm();
  const { signin, error } = useAuth();
  // const navigate = useNavigate();

  const onSubmit = handleSubmit( async (data) => {
    signin(data);
  });

  // useEffect(() => {
  //   if (isAuthenticated) navigate("/home");
  // }, [isAuthenticated, navigate])

  return (
    <div className="flex h-[calc(100vh-100px)] justify-center itesms-center">
      <div className="bg-zinc-800 max-w-md w-full p-10 rounded-md">
      <h1 className="text-3xl font-bold text-white">Login</h1>

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

        <label htmlFor="password">Password</label>
        <input type="password" name="password" id="password" 
          {...register("password", { required: true })}
          placeholder="Password"
          className="w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-2"
        />
        {errors.password && <p className="text-red-500">This field is required</p>}

        <button type="submit">Login</button>
      </form>

      <p className="flex gap-x-2 justify-between">
        Don't have an account? 
        <Link to="/register" className="text-blue-500"> Register </Link>
      </p>

      </div>
    </div>
  )
}

export default LoginPage
