import React from 'react'
import "./style.scss"
import pageNotFoundImg from "../../assets/page-not-found.svg"
const PageNotFound = () => {
  return (
    <div className='outer-div'>
      <img src={pageNotFoundImg} alt="vector" />
      <div className="wrapper">
        <h1>Page Not Found</h1>
        <p className="message">Sorry! The page you are looking for doesn't exits, please try to hit right url.</p>
        <a href="/" className="btn">Learn More About Us</a>
      </div>
    </div>
  )
}

export default PageNotFound