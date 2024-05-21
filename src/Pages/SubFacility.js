import React, { useState, useEffect } from 'react'
// import { Link } from 'react-router-dom';
import { useHistory } from 'react-router-dom'
import { fetchData } from '../services/utils/FetchData'
// import { fetchData } from '../api';
import API_BASE_URL from '../api'
import '../components/IT.css'

function SubFacility (props) {
  const [selectedIcon, setSelectedIcon] = useState(null)
  const [services, setServices] = useState([])
  const history = useHistory()

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const response = await fetchData(
          `sub-facilities/${props.match.params.code}`
        )
        setServices(response)
      } catch (error) {
        console.error('Error fetching data:', error)
      }
    }
    fetchServices()
  }, [props.match.params.code])

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
        history.push(`/SubFacility2/${serviceCode}`)
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
                    {/* <Link to={`/services/${service.code}`}>
                    <span className='buttons'>Select</span>
                  </Link> */}
                  </div>
                )}
              </div>
            ))}
        </div>
      </div>
    </div>
  )
}

export default SubFacility
