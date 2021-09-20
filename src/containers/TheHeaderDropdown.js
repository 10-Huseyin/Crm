import React, { useEffect,useState } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useLocation } from 'react-router-dom'
import {
  CBadge,
  CDropdown,
  CDropdownItem,
  CDropdownMenu,
  CDropdownToggle,
  CImg
} from '@coreui/react'
import CIcon from '@coreui/icons-react'

import { getOneUser } from 'src/actions/user.action'
import { logout } from '../actions/auth.action';
import {getUnreadMessages} from "../actions/messages.action"

const TheHeaderDropdown = () => {
  const history = useHistory()
  const userInfoLocal = JSON.parse(localStorage.getItem("user"));
  const dispatch = useDispatch();
  const userData = useSelector(state => state.users.user)
  const [state, setState] = useState(userData)
  const [unRead, setunRead] = useState(0)
  
  console.log(userInfoLocal);
  console.log(state && state.mediaId && state.mediaId.url);

  useEffect(() => {
    dispatch(getOneUser(userInfoLocal.id))
      .then(res => {
        console.log(res);
      })
  },[])
  useEffect(() => {
    dispatch(getUnreadMessages())
      .then(res => {
        setunRead(res);
      })
  },[])
 
  const handleUser = () => {
    if (state && state._id){
      dispatch(getOneUser(state._id))
      .then(res => {
        if (res === 200) {
          history.push(`/users/${state._id}`)
        }
      })
    }
  }

  const handleLogout = () => {
      dispatch(logout())
      history.push("")
  };
const {user} = useSelector(state => state.auth)

console.log(unRead)
  return (
    <CDropdown
      inNav
      className="c-header-nav-items mx-2"
      direction="down"
    >
      <CDropdownToggle className="c-header-nav-link" caret={false}>
        <div className="c-avatar">
          <CImg
            src={`${state && state.mediaId && state.mediaId.url}`}
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
          <CBadge color="info" className="mfs-2">42</CBadge>
        </CDropdownItem>
        <CDropdownItem onClick={() => history.push(`/messages`)}>
          <CIcon name="cil-envelope-open" className="mfe-2" />
          Messages
          <CBadge color="success" className="mfs-2">{unRead !== 0 ? unRead : "" }</CBadge>
        </CDropdownItem>
        <CDropdownItem
          header
          tag="div"
          color="light"
          className="text-center"
        >
          <strong>Settings</strong>
        </CDropdownItem>
        <CDropdownItem onClick={handleUser}>
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
