import React, { useEffect,useState } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useLocation } from 'react-router-dom'
import { getOneUser } from 'src/actions/user.action'


import {
  CBadge,
  CDropdown,
  CDropdownItem,
  CDropdownMenu,
  CDropdownToggle,
  CImg
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { logout } from 'src/actions/auth.action';

const TheHeaderDropdown = () => {
  const history = useHistory()
  const userInfoLocal = JSON.parse(localStorage.getItem("user"));
 console.log(userInfoLocal);
 const dispatch = useDispatch();
  const userData = useSelector(state => state.users.user)
  const [state, setState] = useState(userData)
 //console.log(state && state.mediaId.url);

  useEffect(() => {
    dispatch(getOneUser(userInfoLocal.id))
      .then(res => {
        console.log(res);
      })
  },[])
 
 

  const handleLogout = () => {
      dispatch(logout())
      history.push("")
  };
const {user} = useSelector(state => state.auth)

  return (
    <CDropdown
      inNav
      className="c-header-nav-items mx-2"
      direction="down"
    >
      <CDropdownToggle className="c-header-nav-link" caret={false}>
        <div className="c-avatar">
          <CImg
            //src={`${state.mediaId.url}`}
          
            className="c-avatar-img"
            alt="admin@bootstrapmaster.com"
          />
        </div>
      </CDropdownToggle>
      <CDropdownMenu className="pt-0" placement="bottom-end">
        <CDropdownItem
          header
          tag="div"
          color="light"
          className="text-center"
        >
          <strong>{user.firstname} Account</strong>
        </CDropdownItem>
        <CDropdownItem>
          <CIcon name="cil-bell" className="mfe-2" />
          Notifications
          <CBadge color="info" className="mfs-auto">42</CBadge>
        </CDropdownItem>
        <CDropdownItem>
          <CIcon name="cil-envelope-open" className="mfe-2" />
          Messages
          <CBadge color="success" className="mfs-auto">42</CBadge>
        </CDropdownItem>
        <CDropdownItem>
          <CIcon name="cil-task" className="mfe-2" />
          Tasks
          <CBadge color="danger" className="mfs-auto">42</CBadge>
        </CDropdownItem>
        <CDropdownItem
          header
          tag="div"
          color="light"
          className="text-center"
        >
          <strong>Settings</strong>
        </CDropdownItem>
        <CDropdownItem>
          <CIcon name="cil-user" className="mfe-2" />Profile
        </CDropdownItem>
        <CDropdownItem>
          <CIcon name="cil-settings" className="mfe-2" />
          Settings
        </CDropdownItem>
        <CDropdownItem divider />
        <CDropdownItem onClick={handleLogout}>
          <CIcon name="cil-lock-locked" className="mfe-2" />
          Log Out
        </CDropdownItem>
      </CDropdownMenu>
    </CDropdown>
  )
}
 
export default TheHeaderDropdown
