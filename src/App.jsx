import { BrowserRouter, Link, Route, Routes } from "react-router"
import Dashboard from "./pages/Dashboard/dashboard"
// import Todo from "./pages/Todo/Todo"
import Todo from "./pages/todo/todo"

import './index.css'
import 'non.geist'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            <div className="min-h-screen  flex flex-col items-center justify-center">
              <h1 className="text-4xl font-medium mb-3">Welcome to Task Managment App</h1>
              <div className="flex items-center justify-center gap-4">
                <Link to='/todo' className="px-4 py-1 bg-blue-500 rounded-full">Simpel Todo</Link>
                <Link to='/dashboard' className="px-4  py-1 bg-blue-500 rounded-full">Kanban</Link>
              </div>
            </div>
          }
        />
        <Route path='/dashboard' element={<Dashboard />} />
        <Route path='/todo' element={<Todo />} />
      </Routes>
    </BrowserRouter >
  )
}

export default App
