import React from 'react'
import { Route, Routes } from 'react-router-dom'
import {HomePage} from "./pages/HomePage"
import { LoginPage } from './pages/LoginPage'
import { SignupPage } from './pages/SignupPage'
import {ProfilePage} from "./pages/ProfilePage"
import { EmailVerifyPage } from './pages/EmailVerifyPage'
 const App = () => {
  return (
    <div className="bg-[url('./src/assets/bgImage.svg')] bg-cover bg-center w-full h-screen ">
      <Routes>
        <Route path='/' element={<HomePage/>}/>
        <Route path='/login' element={<LoginPage/>}/>
        <Route path='/signup' element={<SignupPage></SignupPage>}/>
        <Route path='/profile' element={<ProfilePage />}/>
        <Route path='/email-verify' element={<EmailVerifyPage/>}></Route>
      </Routes>
    </div>
  )
}

export default App
