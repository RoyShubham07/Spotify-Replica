import React, { useEffect } from 'react'
import { Route, Routes, useLocation } from 'react-router-dom'
import Displayhome from './displayhome'
import Displayalbum from './displayalbum'
import { useRef } from 'react'
import { albumsData } from '../assets/assets'

const display = () => {

  const displayRef=useRef();
  const location=useLocation();
  const isAlbum=location.pathname.includes("album");
  const albumId=isAlbum ? location.search.slice(-1):" ";
  const bgcolor=albumsData[Number(albumId)].bgColor;

  useEffect(()=>
  {
    if(isAlbum)
    {
      displayRef.current.style.background=`linear-gradient(${bgcolor},#121212)`
    }
    else{
      displayRef.current.style.background=`#121212`
    }
  })
  return (
    <div ref={displayRef} className='w-[100%] m-2 px-6 pt-4 rounded bg-[#121212] text-white overflow-auto lg-w-[75%] lg:ml-0'>
        <Routes>
            <Route path='/' element={<Displayhome/>} />
            <Route path='/album/:id' element={<Displayalbum/>} />
        </Routes>
    </div>
  )
}

export default display 