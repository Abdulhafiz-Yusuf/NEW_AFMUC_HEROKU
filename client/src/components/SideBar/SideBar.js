import { Link } from 'react-router-dom';
//import useState hook to create menu collapse state
import React, { useState } from "react";

//import react pro sidebar components
import { ProSidebar, Menu, MenuItem, SidebarHeader, SidebarFooter, SidebarContent, } from "react-pro-sidebar";

//import icons from react icons
import { FaList, FaRegHeart } from "react-icons/fa";
import {
  FiHome, FiLogOut, FiArrowLeftCircle,
  // FiArrowRightCircle
} from "react-icons/fi";
// import { RiPencilLine } from "react-icons/ri";
import { BiCog } from "react-icons/bi";

//Logo
// import Logo from './logo.jpg'

//import sidebar css from react-pro-sidebar module and our custom css 
import "react-pro-sidebar/dist/css/styles.css";
import './SideBar.css'



const SideBar = () => {

  //create initial menuCollapse state using useState hook
  const [menuCollapse, setMenuCollapse] = useState(false)

  const backHandler = () => {
    if (window.location.pathname !== '/allclassSection') {
      window.history.back()
    }

  }
  return (
    <div className='h-100'>
      {
        window.location.pathname === '/' || window.location.pathname === '/results' ?
          <div></div>
          :
          // Display &&
          <div id="header" >
            {
              window.location.pathname !== '/allclassSection' &&
              <div id='backHandler' onClick={backHandler} className='font-weight-bold  d-flex justify-content-end align-items-center pt-2 '>
                <div className='mr-2'>Back</div>
                <FiArrowLeftCircle />
              </div>
            }


            {/* collapsed props to change menu size using menucollapse state */}
            <ProSidebar collapsed={menuCollapse}>
              <SidebarHeader>
                <div className="logotext">
                  {/* small and big change using menucollapse state */}

                  {/* <p>{menuCollapse ? "Logo" : <img style={{ width: '100%' }} src={Logo} alt='Logo' />}</p> */}
                </div>

              </SidebarHeader>
              <SidebarContent>
                <Menu iconShape="square">

                  <MenuItem icon={<FiHome />} >
                    All Sections
                    <Link to='/allclassSection' />
                  </MenuItem>
                  <MenuItem icon={<FaRegHeart />}>
                    Go To Class
                       <Link className='bg-light m-2 text-success' to='/gotoClass' />
                  </MenuItem>
                  <MenuItem icon={<FaList />} >
                    Results
                    <Link className='bg-light m-2 text-success' to='/resultsgenerator' />
                  </MenuItem>



                  {/*<MenuItem icon={<RiPencilLine />}>Author</MenuItem> */}
                  <MenuItem icon={<BiCog />}>
                    Change Password
                       <Link className='bg-light m-2 text-success' to='/admin' />
                  </MenuItem>
                </Menu>
              </SidebarContent>

              <SidebarFooter>
                <Menu iconShape="square">
                  <MenuItem icon={<FiLogOut />} >
                    LogOut
                    <Link className='bg-light m-2 text-success' to='/' />
                  </MenuItem>
                </Menu>
              </SidebarFooter>
            </ProSidebar>
          </div>
      }
    </div >
  );
};

export default SideBar;


//create a custom function that will change menucollapse state from false to true and true to false
// const menuIconClick = () => {
//   //condition checking to change state from true to false and vice versa
//   menuCollapse ? setMenuCollapse(false) : setMenuCollapse(true);

// };
//   <div className="closemenu" onClick={menuIconClick}>
//     {/* changing menu collapse icon on click */}
//     {menuCollapse ? (
//       <FiArrowRightCircle />
//     ) : (
//         <FiArrowLeftCircle />
//       )}
//   </div>
