import { BrowserRouter, Routes, Route } from "react-router-dom"
import RegisterPage from "./pages/RegisterPage"
import LoginPage from "./pages/LoginPage"
import { AuthProvider } from "./context/AuthContext"
import Profile from "./pages/Profile"
import HomePage from "./pages/HomePage"
import CategoriesForm from "./pages/CategoriesForm"
import Categories from "./pages/Categories"
import Topics from "./pages/Topics"
import TopicsForm from "./pages/TopicsForm"
import ContentForm from "./pages/ContentForm"

import SafeRoutes from "./components/SafeRoutes"

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<div className="text-3xl"> <h1>Home</h1> </div>} />
          <Route path="/login" element={ <LoginPage /> } />
          <Route path="/register" element={ <RegisterPage /> } />
          <Route element={ <SafeRoutes /> }>
            <Route path="/categories" element={ <Categories />  } />
            <Route path="/add-categories" element={ <CategoriesForm /> } />
            <Route path="/categories/:id" element={ <CategoriesForm /> } />
            <Route path="/topics" element={ <Topics /> } />
            <Route path="/add-topics" element={ <TopicsForm /> } />
            <Route path="/topics/:id" element={ <TopicsForm />  } />
            <Route path="/home" element={ <HomePage /> } /> { /* AQUI ESTARA EL CONTENIDO */ }
            <Route path="/add-content/" element={ <ContentForm /> } />
            <Route path="/content/:id" element={ <ContentForm /> } />
            <Route path="/profile" element={ <Profile /> } />
          </Route>
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  )
}

export default App
