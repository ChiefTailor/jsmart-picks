import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import Home from '../src/Pages/Home'
import  './App.css'

const App = () => {
  return (
    <div>
      <Router>
        <Routes>
          <Route path="/" element={<Home/>}></Route>
        </Routes>
      </Router>
    </div>
  )
}

export default App
