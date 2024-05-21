import React, { useState, useEffect } from 'react'
// import axios from 'axios';
import { useHistory } from 'react-router-dom'
import RiseLoader from 'react-spinners/RiseLoader'
import { fetchData } from '../services/utils/FetchData'
import API_BASE_URL from '../api'
import '../components/IT.css'

function FacilityServices (props) {
  // const [selectedIcon, setSelectedIcon] = useState(null)
  const [services, setServices] = useState([])
  const [loading, setLoading] = useState(true)
  const [selectedIcons, setSelectedIcons] = useState([])
  const [additionalInfo, setAdditionalInfo] = useState('')
  const [showErrorMessage, setShowErrorMessage] = useState(false)
  const history = useHistory()

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false)
    }, 2000)
    return () => clearTimeout(timer)
  }, [])

  useEffect(() => {
    const fetchServicesData = async () => {
      try {
        const response = await fetchData(
          `facility-services/${props.match.params.code}`
        )
        setServices(response)
        setLoading(false)
      } catch (error) {
        console.error('Error fetching data:', error)
      }
    }
    fetchServicesData()
  }, [props.match.params.code])

  // const handleMouseEnter = iconName => {
  //   setSelectedIcons(iconName)
  // }

  // const handleMouseLeave = () => {
  //   setSelectedIcons(null)
  // }

  const handleClick = service => {
    if (selectedIcons.includes(service)) {
      setSelectedIcons(
        selectedIcons.filter(selectedIcon => selectedIcon !== service)
      )
    } else {
      setSelectedIcons([...selectedIcons, service])
    }
  }

  const handleAdditionalInfoChange = event => {
    setAdditionalInfo(event.target.value)
  }

  const handleNextButtonClick = async () => {
    if (selectedIcons.length === 0) {
      setShowErrorMessage(true)
    } else {
      const serviceCodes = selectedIcons.map(service => service.code).join('-')
      history.push(`/UserDetails/${serviceCodes}`, {
        selectedServiceCode: serviceCodes
      })
    }
  }

  return (
    <div className='border'>
     <h2 className='head'> What types of service is it?</h2>
      {loading ? (
        <div className='sweet-loading'>
          <RiseLoader
            size={80}
            aria-label='Loading Spinner'
            data-testid='loader'
            color={'blue'}
          />
        </div>
      ) : (
        <div className='barContent'>
          <div className='iconsss'>
            {Array.isArray(services) &&
              services.map(service => (
                <div
                  key={service.id}
                  className={`icon ${
                    selectedIcons.includes(service) ? 'selected' : ''
                  }`}
                  // onMouseEnter={() => handleMouseEnter(service.name)}
                  // onMouseLeave={handleMouseLeave}
                  onClick={() => handleClick(service)}
                >
                  <img
                    src={`${API_BASE_URL}${service.icon}`}
                    alt={service.name}
                    style={{ width: '100px', height: '100px' }}
                  />
                  <div>{service.description}</div>
                </div>
              ))}
          </div>
          <div className='Addition'>
            <h>Would you like to add anything?</h>
            <div className='placeholders'>
              <input
                className='input'
                value={additionalInfo}
                onChange={handleAdditionalInfoChange}
                placeholder='Enter any additional information'
              ></input>
            </div>
            {showErrorMessage && <p>Please select at least one image icon.</p>}
            <button className='nextButton' onClick={handleNextButtonClick}>
              Next
            </button>
          </div>
        </div>
      )}
    </div>
  )
}

export default FacilityServices
