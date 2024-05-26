import './App.css'
import DropdownMenu from './components/DropDownMenu/DropDownMenu'
import Login from './components/Login/Login'
import { Route,Routes } from 'react-router-dom'
import Signin from './components/Signin/Signin'
import Main from './components/Main/Main'
import PasswordGenerator from './components/PasswordGenerator/PasswordGenerator'
import Grupos from './components/Grupos/Grupos'
import ContrasenasGrupos from './components/ContrasenasGrupos/ContrasenasGrupos'
import PasswordCheck from './components/PasswordCheck/PasswordCheck'
function App() {

  return (
    <>
      <Routes>
      < Route path='/' element={<Login/>}/>
      < Route path='/SignIn' element={<Signin/>}/>
      < Route path='/Main' element={<Main/>}/>
      < Route path='/Generator' element={<PasswordGenerator/>}/>
      < Route path='/Grupos' element={<Grupos/>}/>
      < Route path='/GrupPass' element={<ContrasenasGrupos/>}/>
      < Route path='/CheckPass' element={<PasswordCheck/>}/>
      </Routes>
    </>
  )
}

export default App
