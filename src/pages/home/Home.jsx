import React from 'react'
import "./style.scss"
import HeroBanner from './heroBanner/HeroBanner'
import Trending from './trending/Trending'
import Popular from './popular/Popular'
import TopRated from './topRated/TopRated'
import Latest from './latest/Latest'
import UPComing from './upcoming/UpComing'


const Home = () => {
  return (
    <div className='homePage'>
      <HeroBanner/>
      <Trending/>
      <Popular/> 
      <TopRated/> 
      <UPComing />
      {/* <Latest />  */}
    </div>
  )
}

export default Home