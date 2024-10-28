import { Route, Routes } from "react-router-dom"
import Sign from "./pages/sign"
import Home from "./pages/home"

function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Sign />} />
        <Route path="/home" element={<Home />} />
      </Routes>
    </div>
  )
}

export default App
