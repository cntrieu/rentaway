
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import { About } from "./pages/about"
import { Clothing } from "./pages/clothing"

import { AddClothes } from './pages/addClothes'
import { SavedClothingList } from './pages/saved-clothing'
import { Layout } from "./components/layout"
import { ViewClothingItem } from "./pages/view-item"
import { AuthLogin } from "./components/authLogin"
import { AuthRegister } from "./components/authRegister"
import { Home } from "./pages/home"
import { Dashboard } from "./pages/dashboard"

function App() {
  return (
      <div className="App">
        <Router>
          <Routes>
            <Route path="/" element={<Layout />}>
              <Route index element={<Home/>}/>
              <Route path="/about" element={<About />}/>
              <Route path="/clothing" element={<Clothing />}/>
              <Route path="/dashboard" element={<Dashboard />}/>
              <Route path="/addClothes" element={<AddClothes />}/>
              <Route path="/saved" element={<SavedClothingList />}/>
              <Route path="/clothing/:clothesId" element={<ViewClothingItem />}/>
            </Route>

              <Route path="/auth/login" element={<AuthLogin />}/>
              <Route path="/auth/register" element={<AuthRegister />}/>
     
          </Routes>
        </Router>
      </div>
  )
}

export default App
