import { BrowserRouter, Route } from "react-router-dom"
import Layout from "./components/Layout"
import Markets from "./pages/Markets"
import Portfolio from "./pages/Portfolio"

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<Markets />} />
          <Route path="/portfolio" element={<Portfolio />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
