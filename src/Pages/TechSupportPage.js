import React, { useState, useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import { fetchData } from '../services/utils/FetchData'
import API_BASE_URL from '../api'
import '../components/IT.css'

const TechSupportPage = () => {
  const [selectedIcon, setSelectedIcon] = useState(null)
  const [services, setServices] = useState([])
  const history = useHistory()

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const data = await fetchData('parent-facilities')
        console.log('Data fetched:', data)
        setServices(data)
      } catch (error) {
        console.error('Error fetching services:', error)
      }
    }
    fetchServices()
  }, [])

  const handleMouseEnter = iconName => {
    setSelectedIcon(iconName)
  }

  const handleMouseLeave = () => {
    setSelectedIcon(null)
  }

  const handleClick = async serviceCode => {
    try {
      const response = await fetchData(`sub-facilities/${serviceCode}`)

      if (response.length > 0) {
        history.push(`/SubFacility/${serviceCode}`)
      } else {
        console.log('No sub-facilities found for the selected service.')
      }
    } catch (error) {
      console.error('Error fetching sub-facilities:', error)
    }
  }

  return (
    <div className='border'>
     <h2 className='head'> What types of service is it?</h2>
      <div className='barContent'>
        <div className='iconsss'>
          {Array.isArray(services) &&
            services.map(service => (
              <div
                key={service.id}
                className={`icon ${
                  selectedIcon === service.name ? 'hovered' : ''
                }`}
                onMouseEnter={() => handleMouseEnter(service.name)}
                onMouseLeave={handleMouseLeave}
                onClick={() => handleClick(service.code)}
              >
                <img
                  src={`${API_BASE_URL}${service.icon}`}
                  alt={service.name}
                  style={{ width: '100px', height: '100px' }}
                />
                <div>{service.description}</div>
                {selectedIcon === service.name && (
                  <div className='selectText'>
                    {/* <span className='buttons'>Select</span> */}
                  </div>
                )}
              </div>
            ))}
        </div>
      </div>
    </div>
  )
}

export default TechSupportPage
