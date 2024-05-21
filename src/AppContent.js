import React, { useState, useEffect } from 'react'
import { Switch, Route, useLocation } from 'react-router-dom'
import { MdOutlineRefresh } from 'react-icons/md'
import Sidebar from './components/Sidebar'
import BookNow from './components/BookNow'
import GetStarted from './components/GetStarted'
import TechSupport from './Pages/TechSupportPage'
import { CgMenuGridO } from 'react-icons/cg'
import SubFacility from './Pages/SubFacility'
import SubFacilityLevel2 from './Pages/SubFacilityLevel2'
import FacilityServices from './Pages/FacilityServices'
import ITSupportBusiness from './Pages/IT SupportBusiness'

/*
import WindowsComputerLaptop from './Pages/WindowsComputerLaptop';
import MobilesTablets from './Pages/MobilesTablets';
import PrintersScanners from './Pages/PrintersScanners';
import WifiSupport from './Pages/WifiSupport';
import CCTVSecurity from './Pages/CCTVSecurity';
import Antivirus from './Pages/Antivirus';
import DataBackupRecovery from './Pages/DataBackupRecovery';
import ImacsBook from './Pages/ImacsBook';
*/
// import SoftwareSetupSupport from './LoadingWindows/SoftwareSetupSupport';
import ProgressSlide from './components/ProgressSlide'
// import HardwareSupport from './LoadingWindows/HardwareSupport';
import ContactUs from './components/ContactUs'
import Blog from './components/Blog'
import AboutUs from './components/AboutUs'
import BecomeOneappplus from './components/BecomeOneappplus'
import UserDetails from './Pages/UserDetails'
// import ImacSoftwareSupport from './LoadingWindows/ImacSoftwareSupport';
// import ImacHardwareSupport from './LoadingWindows/ImacHardwareSupport';

const AppContent = () => {
  const [openSidebar, setOpenSidebar] = React.useState(false)
  const [progressItems, setProgressItems] = useState([])

  const location = useLocation()

  useEffect(() => {
    const pathname = location.pathname
    let progress = 0

    if (pathname.startsWith('/SubFacility2')) {
      progress = 60
    } else if (pathname.startsWith('/SubFacility')) {
      progress = 40
    } else if (pathname.startsWith('/Services')) {
      progress = 80
    } else if (pathname.startsWith('/tech-support')) {
      progress = 20
    } else if (pathname.startsWith('/UserDetails')) {
      progress = 100
    } else if (pathname.startsWith('/it-support')) {
      progress = 20
    }
    setProgressItems([{ label: 'Progress', progress }])
  }, [location])

  return (
    <div>
      <ProgressSlide items={progressItems} />
      <>
        {openSidebar && (
          <Sidebar openSidebar={openSidebar} setOpenSidebar={setOpenSidebar} />
        )}
        <span
          style={{ position: 'relative', top: '15px', left: '15px' }}
          onClick={() => setOpenSidebar(true)}
        >
          <CgMenuGridO size={50} />
        </span>
        <MdOutlineRefresh
          onClick={() => window.location.reload()}
          style={{
            position: 'absolute',
            top: '10px',
            right: '10px',
            zIndex: 9999,
            cursor: 'pointer'
          }}
          size={50}
        />
        <Switch>
          <Route path='/booknow' exact component={BookNow} />
          <Route path='/' exact component={GetStarted} />
          <Route path='/it-support' exact component={ITSupportBusiness} />
          <Route path='/SubFacility/:code' exact component={SubFacility} />
          <Route path='/Services/:code' exact component={FacilityServices} />
          <Route
            path='/SubFacility2/:code'
            exact
            component={SubFacilityLevel2}
          />
          <Route path='/tech-support' exact component={TechSupport} />
          {/* <Route path="/softwaresetup" exact component={SoftwareSetupSupport} />
        <Route path="/hardwaresetup" exact component={HardwareSupport} /> */}
          <Route path='/contactUs' exact component={ContactUs} />
          <Route path='/blogs' exact component={Blog} />
          <Route path='/about' exact component={AboutUs} />
          <Route path='/oneappplus' exact component={BecomeOneappplus} />
          <Route
            path='/UserDetails/:serviceCodes'
            exact
            component={UserDetails}
          />
          {/* <Route path="/iMacsoftwaresetup" exact component={ImacSoftwareSupport} />
        <Route path="/imachardwaresupport" exact component={ImacHardwareSupport} /> */}
        </Switch>
      </>
    </div>
  )
}

export default AppContent
