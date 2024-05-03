import { BrowserRouter, Routes, Route } from "react-router-dom"
import RegisterPage from "./pages/RegisterPage"
import LoginPage from "./pages/LoginPage"
import { AuthProvider } from "./context/AuthContext"
function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<div className="text-3xl"> <h1>Home</h1> </div>} />
          <Route path="/login" element={ <LoginPage /> } />
          <Route path="/register" element={ <RegisterPage /> } />

          <Route path="/categories" element={<div className="text-3xl"> <h2>Categorias</h2> </div>} />
          <Route path="/add-categories" element={<div className="text-3xl"> <h2>Add Categories</h2> </div>} />
          <Route path="/categories/:id" element={<div className="text-3xl"> <h2>Update Categories</h2> </div>} />
          <Route path="/topics" element={<div className="text-3xl"> <h2>Topics</h2> </div>} />
          <Route path="/add-topics" element={<div className="text-3xl"> <h2>Add Topics</h2> </div>} />
          <Route path="/topics/:id" element={<div className="text-3xl"> <h2>Update Topics</h2> </div>} />
          <Route path="/content" element={<div className="text-3xl"> <h2>Contents</h2> </div>} />
          <Route path="/add-content/" element={<div className="text-3xl"> <h2>Add Contents</h2> </div>} />
          <Route path="/content/:id" element={<div className="text-3xl"> <h2>Update Contents</h2> </div>} />
          <Route path="/admin" element={ <div className="text-3xl"> <h2>Admin</h2> </div> } />
          <Route path="/profile" element={ <div className="text-3xl"> <h2>Profile</h2> </div> } />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  )
}

export default App
