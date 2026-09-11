import { BrowserRouter, Route, Routes } from "react-router-dom"
import Layout from "./components/Layout"
import Markets from "./pages/Markets"
import Portfolio from "./pages/Portfolio"
import Login from "./pages/auth/Login"

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<Markets />} />
          <Route path="/portfolio" element={<Portfolio />} />
        </Route>
        <Route path="/login" element={<Login />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
