import React, { useState, useEffect } from 'react'
import RingLoader from 'react-spinners/RingLoader'
import '../components/IT.css'

function AboutUs () {
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchData = async () => {
      await new Promise(resolve => setTimeout(resolve, 2000))
      setLoading(false)
    }

    fetchData()
  }, [])

  return (
    <div className='about-us-background'>
      <div className='about-us-content'>
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
          <div className='about-us-container'>
            <h2>About OneAppPlus</h2>
            <p>
              OneAppPlus is more than just a software solution; it's a
              revolutionary platform designed to streamline workflows, enhance
              productivity, and elevate user experiences across industries. With
              a commitment to innovation and user-centric design, OneAppPlus
              empowers businesses to thrive in today's fast-paced digital
              landscape.
            </p>
            <p>
              <div className='topic'>Mission</div>
              Our mission at OneAppPlus is simple: to provide cutting-edge tools
              and technologies that simplify complex processes and drive growth.
              Whether you're a startup looking to scale or an established
              enterprise seeking efficiency gains, OneAppPlus offers
              customizable solutions tailored to your specific needs.
            </p>
            <p>
              <div className='topic'>Focus</div>
              With a focus on scalability, security, and seamless integration,
              OneAppPlus sets the standard for modern software solutions. Our
              team of experts is dedicated to delivering exceptional results,
              guiding you through every step of the implementation process and
              beyond.
            </p>
            <p>
              <div className='topic'>Goal</div>
              Discover the power of OneAppPlus and unlock the full potential of
              your business today.
            </p>
          </div>
        )}
      </div>
    </div>
  )
}

export default AboutUs
