import React from 'react'
import Hero from '../Components/Home_Page_Components/Hero'
import Popular from '../Components/Home_Page_Components/Popular'
import TopReviewers from '../Components/Home_Page_Components/TopReviewers'


const Home = () => {
  return (
    <div className='max-w-7xl mx-auto '>
        <Hero />
        <Popular />
        <TopReviewers />
    </div>
  )
}

export default Home