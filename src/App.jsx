import { useState } from 'react'
import './App.css'
import {BrowserRouter, Route, Routes} from 'react-router-dom'
import GatewaysList from './components/GatewaysList'
import CreateGateway from './components/CreateGateway'
import DetailsGateway from './components/DetailsGateway'
import CreateDevice from './components/CreateDevice'

function App() {
  return (
      <div className='App'>
        <h1>React Gateway API</h1>
        <BrowserRouter>
          <Routes>
            <Route path='/' element={<GatewaysList/>}/>
            <Route path='/gateway/create' element={<CreateGateway/>} />
            <Route path='/gateway/details/:gatewayid' element={<DetailsGateway/>}/>
            <Route path='/device/create/:gatewayid' element={<CreateDevice/>}/>
          </Routes>
        </BrowserRouter>
      </div>
  )
}

export default App
