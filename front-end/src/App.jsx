import { Route, Routes } from 'react-router-dom'
import FirstPage from './pages/FirstPage/FirstPage'
import './main.css'
import MainPage from './pages/MainPage/MainPage'


function App() {  

  return (
    <Routes>   
      <Route path='/' element={<FirstPage/>}/>
      <Route path='/bfs' element={<MainPage/>}/>
    </Routes>
  )
}

export default App
