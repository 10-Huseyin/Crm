import React from 'react'
import { useDispatch } from "react-redux";
import { useHistory } from 'react-router-dom'

import { logout } from "../actions/auth.action"


const parseJwt = (token) => {
  try {
    return JSON.parse(atob(token.split('.')[1]));
  } catch (e) {
    return null;
  }
};

function AutVerify() {
    const dispatch = useDispatch()
    const history = useHistory()

    history.listen(() => {
        const user = JSON.parse(localStorage.getItem("user"));
        
        if (user) {
          const {exp} = parseJwt(user.token);
          //console.log(new Date(exp*1000))  //expire time
          if ((exp*1000) < Date.now()) {
            //console.log("logout action")
            dispatch(logout());
          }
        }
    });

    return (
        <div>
            
        </div>
    )
}

export default AutVerify
