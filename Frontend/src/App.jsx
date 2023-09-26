import React from 'react'
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from './Pages/Home.jsx'
import CreateBook from './Pages/CreateBook.jsx'
import DeleteBook from './Pages/DeleteBook.jsx'
import EditBook from './Pages/EditBook.jsx'
import ShowBooks from './Pages/ShowBooks.jsx'
const App = () => {
  return (
    <Routes>
      <Route path='/' element={<Home/>} />
      <Route path='/books/create' element={<CreateBook/>} />
      <Route path='/books/delete/:id' element={<DeleteBook/>} />
      <Route path='/books/edit/:id' element={<EditBook/>} />
      <Route path='/books/details/:id' element={<ShowBooks/>} />
    </Routes>
  )
}

export default App