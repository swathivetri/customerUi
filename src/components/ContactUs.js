import React, { useState, useEffect } from 'react'
import { FaEnvelope, FaFacebook, FaTwitter, FaInstagram } from 'react-icons/fa' 
import RingLoader from 'react-spinners/RingLoader'
import '../components/IT.css'

function ContactUs () {
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchData = async () => {
      await new Promise(resolve => setTimeout(resolve, 2000))
      setLoading(false)
    }

    fetchData()
  }, [])

  const handleEmailClick = () => {
    window.location.href = 'mailto:swathivetri1992@.com'
  }

  const handleFacebookClick = () => {
    window.open('https://www.facebook.com/example', '_blank')
  }

  const handleTwitterClick = () => {
    window.open('https://twitter.com/example', '_blank')
  }

  const handleInstagramClick = () => {
    window.open('https://www.instagram.com/example/', '_blank')
  }

  return (
    <div className='backgroundimage'>
      <h1 className='head'>ContactUs</h1>
      <div className='sweet-loading'>
        {loading ? (
          <div className='loading-spinner'>
            <RingLoader
              size={90}
              aria-label='Loading Spinner'
              data-testid='loader'
              color={'blue'}
            />
          </div>
        ) : (
          <div>
            <div className='contact-icons'>
              <div className='icon-container' onClick={handleEmailClick}>
                <FaEnvelope size={70} className='icos' />
                <span className='icon-text'>OneAppPlus@codiis.com</span>
              </div>
              <div className='icon-container' onClick={handleFacebookClick}>
                <FaFacebook size={70} className='icos' />
                <span className='icon-text'>OneAppPlus@gmail.com</span>
              </div>
              <div className='icon-container' onClick={handleTwitterClick}>
                <FaTwitter size={70} className='icos' />
                <span className='icon-text'>Twitter</span>
              </div>
              <div className='icon-container' onClick={handleInstagramClick}>
                <FaInstagram size={70} className='icos' />
                <span className='icon-text'>OneAppPlus</span>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default ContactUs
