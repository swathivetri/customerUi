// import React, { useState } from 'react'
import './IT.css'
import { Link } from 'react-router-dom'
import { CgMenuGridO } from 'react-icons/cg'
import { GrTechnology } from 'react-icons/gr'
import { GiArchiveRegister } from 'react-icons/gi'
import { MdContacts } from 'react-icons/md'
import { BiSupport } from 'react-icons/bi'
// import { IoMdAnalytics } from "react-icons/io";
import { SiBloglovin } from 'react-icons/si'
// import { FcAbout } from "react-icons/fc";
import { TbListDetails } from 'react-icons/tb'

const SideBar = ({ openSidebar, setOpenSidebar }) => {
  // const [show, setShow] = useState(false)
  // const styleProp = {
  //   position: 'relative',
  //   right: '300px'
  // }

  const HandleClick = () => {
    setOpenSidebar(!openSidebar)
  }
  return (
    <div className='sidebarCon'>
      <div className='sidebarWra'>
        <div className='side_bar_data'>
          <div className='side_bar_heading'>
            OneAppplus
            <span className='ico' onClick={HandleClick}>
              <CgMenuGridO size={50} />
            </span>
          </div>
          <hr />

          {/* <div className='main_menu'>Main Menu</div> */}

          <div className='side_bar_content'>
            <div className='iconsssss'>
              <Link to='/tech-support'>
                <span>Technical Support</span>
              </Link>
              <div>
                <GrTechnology size={30} />
              </div>
            </div>

            <div className='iconsssss'>
              <Link to='/it-support'>
                <div>ITSupportBusiness</div>
              </Link>
              <div>
                <GiArchiveRegister size={30} />
              </div>
            </div>
            <div className='iconsssss'>
              <Link to='/contactUs'>
                <div>Contact Us</div>
              </Link>
              <div>
                <MdContacts size={30} />
              </div>
            </div>
            <div className='iconsssss'>
              <Link to='/oneappplus'>
                <div>Become a OneAppPlus</div>
              </Link>
              <div>
                <BiSupport size={30} />
              </div>
            </div>
            {/* <div className='iconss'>
              <div>Analytics</div>
              <div>
              <IoMdAnalytics size={30} />
              </div>
            </div> */}

            <div className='iconsssss'>
              <Link to='/blogs'>
                <div>Blog</div>
              </Link>
              <div>
                <SiBloglovin size={30} />
              </div>
            </div>
            <div className='iconsssss'>
              <Link to='/about'>
                <div>About</div>
              </Link>
              <div>
                <TbListDetails size={30} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default SideBar
