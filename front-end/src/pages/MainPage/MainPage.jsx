import React from 'react'
import Header from '../../components/Header/Header'
import Body from '../../components/Body/Body'
import Footer from '../../components/Footer/Footer'

console.log('MainPage.jsx loading...'); // Debug log

const MainPage = () => {
  console.log('MainPage component rendering...'); // Debug log
  
  return (
    <>
      <Header />
      <Body />
      <Footer />
    </>
  )
}

export default MainPage