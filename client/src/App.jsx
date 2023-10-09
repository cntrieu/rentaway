
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
import { Messenger } from "./pages/messenger"
import { QueryClient, QueryClientProvider } from 'react-query'


function App() {
  const client = new QueryClient({
    defaultOptions: {
      queries: {
        refetchOnWindowFocus: true,
      }
    }
  });

  return (
      <div className="App">
        <QueryClientProvider client={client}>
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
                <Route path="/messenger" element={<Messenger/>}/>
              </Route>

                <Route path="/auth/login" element={<AuthLogin />}/>
                <Route path="/auth/register" element={<AuthRegister />}/>
            </Routes>
          </Router>
        </QueryClientProvider>
      </div>
  )
}

export default App
