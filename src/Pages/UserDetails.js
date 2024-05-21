import React, { useState, useEffect } from 'react'
import '../components/IT.css'
import { fetchData } from '../services/utils/FetchData'
import { useLocation } from 'react-router-dom'
// import countryCodes from '../services/countryCodes.json'
import stateData from '../services/stateCodes.json'

function UserDetails () {
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [query, setQuery] = useState('')
  const [phoneNumber, setPhoneNumber] = useState('')
  const [email, setEmail] = useState('')
  const [address, setAddress] = useState('')
  const [country, setCountry] = useState('')
  // const [postcode, setPostcode] = useState('');
  // const [city, setCity] = useState('');
  const [state, setState] = useState('')
  const [districtName, setDistrict] = useState('');
  const [pincode, setPincode] = useState('');
  const [inquirySent, setInquirySent] = useState(false);
  const [errors, setErrors] = useState({});

  const location = useLocation()
  const selectedServiceCode = location.state
    ? location.state.selectedServiceCode
    : ''
  console.log('Selected Service Code:', selectedServiceCode)

  // const { serviceCodes } = useParams();

  // useEffect(() => {
  //   const fetchServiceDetails = async () => {
  //     try {
  //       const response = await fetchData(`facility-services/${serviceCodes}`);
  //       console.log(response);
  //     } catch (error) {
  //       console.error('Error fetching service details:', error);
  //     }
  //   };
  //   fetchServiceDetails();
  // }, [serviceCodes]);

  
  const [countries, setCountries] = useState([]);
  const [ dial_code, setDialCode] = useState([])
  useEffect(() => {
    const uniqueCountries = [...new Set(stateData.map(item => item.Country && item.Country.trim()))];
    setCountries(uniqueCountries.filter(country => country));
  }, []);

  const [states, setStates] = useState([])

  useEffect(() => {
    if (country) {
      const countryStates = stateData.filter(item => item.Country === country);
      const uniqueStates = [...new Set(countryStates.map(item => item.stateName && item.stateName.trim()))];
      setStates(uniqueStates.filter(state => state));
    } else {
      setStates([]);
    }
  }, [country]);


  // useEffect(() => {
  //   const uniqueStates = [...new Set(stateData.map(item => item.stateName))]
  //   setStates(uniqueStates)
  // }, [])

  const [districts, setDistricts] = useState([])

  useEffect(() => {
    const filteredDistricts = stateData.filter(item => item.stateName === state)
    const uniqueDistricts = [
      ...new Set(filteredDistricts.map(item => item.districtName && item.districtName.trim()))
    ]
    setDistricts(uniqueDistricts.filter(district => district))
  }, [state])

  const [pincodes, setPincodes] = useState([])

  useEffect(() => {
    const filteredPincodes = stateData.filter(
      item => item.districtName === districtName
    )
    const uniquePincodes = [
      ...new Set(filteredPincodes.map(item => item.pincode))
    ]
    setPincodes(uniquePincodes)
  }, [districtName])

  useEffect(() => {
    const countryData = stateData.find(item => item.Country === country);
    if (countryData) {
      setDialCode(countryData.dial_code);
    } else {
      setDialCode('');
    }
  }, [country]);

  const validateForm = () => {
    const errors = {};
    if (!firstName || firstName.trim().length < 3) {
      errors.firstName = 'First name should be at least 3 characters';
    }
    if (!lastName || lastName.trim().length < 0) {
      errors.lastName = 'Last name should be at least 1 characters';
    }
    if (!email || !/^\S+@\S+\.\S+$/.test(email)) {
      errors.email = 'Please enter a valid email address';
    }
    if (!address || address.trim().length < 0) {
      errors.address = 'Address should be mandatory'
    }
    if (!phoneNumber || !/^[0-9]{10,}$/.test(phoneNumber)) {
      errors.phoneNumber = 'Please enter a valid phone number';
    }
    setErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleFormSubmit = async e => {
    e.preventDefault()

    if (!validateForm()) {
      return;
    }

    const requestData = {
      service_code: selectedServiceCode,
      first_name: firstName,
      last_name: lastName,
      query: query,
      phone: phoneNumber,
      email: email,
      state: state,
      postcode: pincode,
      suburb: districtName,
      complete_address: address,
      country: country
    }

    try {
      const responseData = await fetchData('add-request', requestData)
      console.log(responseData)
      setInquirySent(true)
      clearFormFields()
    } catch (error) {
      console.error('Error:', error)
    }
  }

  const clearFormFields = () => {
    setFirstName('')
    setLastName('')
    setPhoneNumber('')
    setEmail('')
    setState('')
    setPincode('')
    setDistrict('')
    setAddress('')
    setQuery('')
    setCountry('')
  }


  
  // const validatePhoneNumber = (input) => {
  //   const phoneRegex = /^[0-9]{10,}$/
  //   return phoneRegex.test(input)
  // }

  const handleReset = () => {
    clearFormFields();
    setErrors({});
  };

  const handleFirstNameChange = (e) => {
    setFirstName(e.target.value);
    if (errors.firstName) {
      setErrors({ ...errors, firstName: '' });
    }
  };

  const handleLastNameChange = (e) => {
    setLastName(e.target.value);
    if (errors.lastName) {
      setErrors({ ...errors, lastName: '' });
    }
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
    if (errors.email) {
      setErrors({ ...errors, email: '' });
    }
  };

  const handleAddressChange = (e) => {
    setAddress(e.target.value);
    if (errors.address) {
      setErrors({ ...errors, address: '' });
    }
  };

  const handlePhoneNumberChange = (e) => {
    const value = e.target.value.replace(/\D/g, '');
    setPhoneNumber(value);
    if (errors.phoneNumber) {
      setErrors({ ...errors, phoneNumber: '' });
    }
  };

  return (
    <div className='border'>
      <div className='heads'>
        <h1>We got your back</h1>
        <h2>Just need a few details of yours</h2>
        <p>Selected Service Code: {selectedServiceCode}</p>
        <form onSubmit={handleFormSubmit}>
          <div className='user_details'>
            <div className='usersizes'>
              <input
                type='text'
                style={{ height: '50px', width: '300px' }}
                placeholder='First Name'
                value={firstName}
                onChange={handleFirstNameChange}
              />
               {errors.firstName && <p className="error">{errors.firstName}</p>}
              <br />
            </div>
            <div className='usersizes'>
              <input
                type='text'
                style={{ height: '50px', width: '300px' }}
                placeholder='Last Name'
                value={lastName}
                onChange={handleLastNameChange}
              />
               {errors.lastName && <p className="error">{errors.lastName}</p>}
              <br />
            </div>
            <div className='usersizes'>
              <input
                type='email'
                style={{ height: '50px', width: '300px' }}
                placeholder='Email'
                value={email}
                onChange={handleEmailChange}
              />
               {errors.email && <p className="error">{errors.email}</p>}
              <br />
            </div>
            <div className='usersizes'>
              <input
                type='text'
                style={{ height: '50px', width: '300px' }}
                placeholder='Address'
                value={address}
                onChange={handleAddressChange}
              />
                {errors.address && <p className="error">{errors.address}</p>}
              <br />
            </div>
            <div className='usersizes'>
              <select
                value={country}
                onChange={e => setCountry(e.target.value)}
                style={{ height: '50px', width: '300px' }}
              >
                <option value=''>Select Country</option>
                {countries.map(country => (
                  <option key={country} value={country}>
                    {country.toUpperCase()}
                  </option>
                ))}
              </select>
              <br />
            </div>
            <div className='usersizes'>
              <select
                value={state}
                onChange={e => setState(e.target.value)}
                style={{ height: '50px', width: '300px' }}
              >
                <option value=''>Select State</option>
                {states.map(state => (
                  <option key={state} value={state}>
                    {state.toUpperCase()}
                  </option>
                ))}
              </select>
              <br />
            </div>
            <div className='usersizes'>
              <select
                value={districtName}
                onChange={e => setDistrict(e.target.value)}
                style={{ height: '50px', width: '300px' }}
              >
                <option value=''>Select District</option>
                {districts.map(district => (
                  <option key={district} value={district}>
                    {district.toUpperCase()}
                  </option>
                ))}
              </select>
              <br />
            </div>
            <div className='usersizes'>
              <select
                value={pincode}
                onChange={e => setPincode(e.target.value)}
                style={{ height: '50px', width: '300px' }}
              >
                <option value=''>Select Pincode</option>
                {pincodes.map(pincode => (
                  <option key={pincode} value={pincode}>
                    {pincode}
                  </option>
                ))}
              </select>
              <br />
            </div>
            <div className='usersizes'>
            <select
                value={dial_code}
                onChange={e => setCountry(e.target.value)}
                style={{ height: '55px', width: '70px', marginRight: '1px' }}
              >
                <option value=''>Select dial Code</option>
                {countries.map(country => (
                  <option key={country.dial_code} value={dial_code}>
                 +{dial_code.replace('+', '')}
                  </option>
                ))}
              </select>
              <input
                type='tel'
                style={{ height: '50px', width: '280px' }}
                placeholder='Phone Number'
                value={phoneNumber}
                onChange={handlePhoneNumberChange}
              />
               {errors.phoneNumber && <p className="error">{errors.phoneNumber}</p>}
              <br />
              </div>
            <div className='usersizes'>
              <textarea
                placeholder='Query'
                style={{ height: '50px', width: '300px' }}
                value={query}
                onChange={e => setQuery(e.target.value)}
              ></textarea>
              <br />
            </div>
          </div>
          <div className='submits'>
            <button type='submit'>Send Inquiry</button>
            <button type='button' onClick={handleReset}>Reset</button>
          </div>
        </form>
        {inquirySent && (
          <div className='alert' role='alert'>
            Details sent successfully!
          </div>
        )}
      </div>
    </div>
  )
}

export default UserDetails
