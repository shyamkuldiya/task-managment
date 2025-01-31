import { BrowserRouter, Link, Route, Routes } from "react-router"
import Dashboard from "./pages/Dashboard/dashboard"
import Todo from "./pages/Todo/todo"
import './index.css'
import 'non.geist'
import HomePage from "./pages/HomePage";
import ErrorPage from "./pages/ErrorPage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path='/dashboard' element={<Dashboard />} />
        <Route path='/todo' element={<Todo />} />
        <Route path='*' element={<ErrorPage />} />
      </Routes>
    </BrowserRouter >
  )
}

export default App
