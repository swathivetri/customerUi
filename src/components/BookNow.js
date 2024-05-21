// BookNow.js
import React from 'react'
import { Link } from 'react-router-dom'
import './IT.css'

const BookNow = () => {
  return (
    <div className='right'>
      <div className='container'>
        <p> Computer Support & Repair</p>
        <Link to='/tech-support'>
          <button className='buttons_one'>Book Now</button>
        </Link>
      </div>
    </div>
  )
}

export default BookNow
