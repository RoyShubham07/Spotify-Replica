import React from 'react'
import Navbar from './navbar'
import { albumsData, songsData } from '../assets/assets'
import AlbumItem from './albumItem'
import SongItem from './songItem'
import Songs from '../songs'

const Displayhome = () => {
  return (
    <>
      <Navbar />

      {/* Featured Charts */}
      <div className='mb-8'>
        <h1 className='my-5 font-bold text-2xl'>Featured Charts</h1>
        <div className='flex overflow-auto gap-4'>
          {albumsData.map((item, index) => (
            <AlbumItem
              key={index}
              name={item.name}
              desc={item.desc}
              id={item.id}
              image={item.image}
            />
          ))}
        </div>
      </div>

      {/* Today's Big Hit */}
      <div className='mb-8'>
        <h1 className='my-5 font-bold text-2xl'>Today's Big Hit</h1>
        <div className='flex overflow-auto gap-4'>
          {songsData.map((item, index) => (
            <SongItem
              key={index}
              name={item.name}
              desc={item.desc}
              id={item.id}
              image={item.image}
            />
          ))}
        </div>
      </div>

      {/* 🔥 API Songs Section */}
      <div className='mb-8'>
        <h1 className='my-5 font-bold text-2xl'>API Songs</h1>
        <div className='mt-4'>
          <Songs />
        </div>
      </div>
    </>
  )
}

export default Displayhome
