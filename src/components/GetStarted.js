import React from 'react'
import { Link } from 'react-router-dom'
import './IT.css'

const GetStarted = () => {
  return (
    <div className='homeCon'>
      <div className='left'>
        <div className='container'>
          <p style={{ fontSize: '25px', fontWeight: '600' }}>
            {' '}
            IT Support for Business{' '}
          </p>
          <Link to='/it-support'>
            <button className='buttons_two'>Get Started</button>
          </Link>
        </div>
      </div>
      <div className='right'>
        <div className='container'>
          <p style={{ fontSize: '25px', fontWeight: '600' }}>
            {' '}
            Computer Support & Repair
          </p>
          <Link to='/tech-support'>
            <button className='buttons_one'>Book Now</button>
          </Link>
        </div>
      </div>
    </div>
  )
}

export default GetStarted
