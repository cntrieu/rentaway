
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import { Home } from "./pages/home"
import { Auth } from "./pages/auth"
import { About } from "./pages/about"
import { Clothing } from "./pages/clothing"
import { Services } from "./pages/services"
import { Navbar } from "./components/navbar"
import { AddClothes } from './pages/addClothes'
import { SavedClothingList } from './pages/saved-clothing'
import { Layout } from "./components/layout"
import { Login } from "./pages/login"
import { Register } from "./pages/register"


function App() {
  return (
      <div className="App">
        <Router>
          <Routes>
            <Route path="/" element={<Layout />}>
              <Route path="/auth" element={<Auth />}/>
              <Route path="/auth/login" element={<Login />}/>
              <Route path="/auth/register" element={<Register />}/>
              <Route path="/about" element={<About />}/>
              <Route path="/clothing" element={<Clothing />}/>
              <Route path="/services" element={<Services />}/>
              <Route path="/addClothes" element={<AddClothes />}/>
              <Route path="/saved" element={<SavedClothingList />}/>
            </Route>
          </Routes>
        </Router>
      </div>
  )
}

export default App
