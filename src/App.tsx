import { useEffect, useState } from 'react'
import logo from './logo.svg'
import './App.css'
import {Posts} from './Post'
import { Navigate, Route, Routes } from 'react-router-dom'
import { OnePost } from './OnePost'
import { Nav } from './Nav'
import { Right } from './RightSide'

type Post = {
    id: number,
    content: string,
    title: string,
    like: boolean,
    comments:[]
}



function App() {
  

  return (
    <div className="App">
      <Nav/>
      <Routes>
        <Route index element={<Navigate to={'/posts'}/>}/>
        <Route path='posts' element={<Posts />} />
        <Route path='posts/:id' element={<OnePost/>}/>
      </Routes>
      <Right/>
    </div>
  );
}

export default App
