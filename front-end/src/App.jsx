import { Route, Routes } from 'react-router-dom'
import FirstPage from './pages/FirstPage/FirstPage'
import './Main.css'
import MainPage from './pages/MainPage/MainPage'

console.log('App.jsx loading...'); // Debug log

function App() {  
  console.log('App component rendering...'); // Debug log

  return (
    <Routes>   
      <Route path='/' element={<FirstPage/>}/>
      <Route path='/bfs' element={<MainPage/>}/>
    </Routes>
  )
}

export default App
