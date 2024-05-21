import React, { useEffect, useState } from 'react';
import { fetchData } from '../services/utils/FetchData';
import { useHistory } from 'react-router-dom'
import API_BASE_URL from '../api'
import '../components/IT.css'


const ITSupportBusiness = () => {
const [services, setServices] =useState([]);
const [selectedIcon, setSelectedIcon] =useState([]);
const history = useHistory();

  useEffect(() =>{
    const fetchServices = async ()=>{
      try{
      const data = await fetchData('');
      setServices(data);
      }catch(error){
       console.error('error fetching service: ',error);
      }
    }
    fetchServices()
  },[])

  const handleMouseEnter = iconName =>{
    setSelectedIcon(iconName)
  }

  const handleMouseLeave = () =>{
    setSelectedIcon(null)
  }

  const handleClick = async serviceCode =>{
    try{
      const response = await fetchData(`/${serviceCode}`)
      if(response.length > 0){
       history.push(`/${serviceCode}`)
      }else{
        console.log('No sub-facilities found for the selected service.')
      }
    }catch(error){
      console.error('Error fetching sub-facilities:', error)
    }
  }
  return (
    <div className='border'>
      <h className='head'> What types of service is it?</h>
      <div className='barContent'>
        <div className='iconss'>
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
                  src={`${API_BASE_URL}/${service.icon}`}
                  alt={service.name}
                  style={{ width: '100px', height: '100px' }}
                />
                <div>{service.description}</div>
                {selectedIcon === service.name && (
                  <div className='selectText'>
                    <span className='buttons'>Select</span>
                  </div>
                )}
              </div>
            ))}
        </div>
      </div>
    </div>
  )
}

export default ITSupportBusiness;
