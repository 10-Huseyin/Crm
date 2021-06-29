import React, {useState, useEffect} from 'react'
import { CCard, CCardBody, CCardHeader, CCol, CRow, CForm, CFormGroup, CLabel, CInput, CSelect, CSwitch, CCardFooter, CButton } from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { useDispatch, useSelector } from "react-redux";
import { editUserData, deleteUser, getUsers } from "../../actions/userAction";


const User = (props) => {

  const dispatch = useDispatch()
  
  const message = useSelector(state => state.message)
//console.log(message)
  const usersData = useSelector(state => state.users.userList)
  const user = usersData.find( user => user._id.toString() === props.match.params.id)
  const [state, setState] = useState(user)

  const handleInput = (e) => {
    setState({...state, [e.target.name] : e.target.value})
  }

  const handleSwitch = (e) => {
    setState({...state, [e.target.name] : e.target.checked})
  }

const resetForm = () => {
  setState(user)
}

  const handleSubmit = (event) => {
    console.log("handlesubmit")
    event.preventDefault();
    dispatch(editUserData(state, state._id))
      resetForm();
      dispatch(getUsers())
      setTimeout(() => {
        props.history.push("/users");
      }, 3000);
  };

  const deleteUserData = (event) => {
    event.preventDefault();
    dispatch(deleteUser(state._id))
    
      resetForm();
      dispatch(getUsers())
      setTimeout(() => {
        props.history.push("/users");
      }, 3000);
    
  };


  console.log(state)
  
  return (
      <CRow>
        <CCol lg={9}>
          <CCard>
            <CCardHeader>
              User Details
            </CCardHeader>
            <CCardBody>
            {state ? 
              <CForm onSubmit={handleSubmit} encType="multipart/form-data" className="form-horizontal">
                <CFormGroup row>
                  <CCol md="3">
                    <CLabel htmlFor="userfirstname-input">First Name</CLabel>
                  </CCol>
                  <CCol xs="12" md="9">
                    <CInput onChange={handleInput} value={state.firstname} id="userfirstname-input" name="firstname" placeholder="First Name" />
                  </CCol>
                </CFormGroup>
                <CFormGroup row>
                  <CCol md="3">
                    <CLabel htmlFor="userlastname-input">Last Name</CLabel>
                  </CCol>
                  <CCol xs="12" md="9">
                    <CInput onChange={handleInput} value={state.lastname} id="userlastname-input" name="lastname" placeholder="Last Name" />
                  </CCol>
                </CFormGroup>
                <CFormGroup row>
                  <CCol md="3">
                    <CLabel htmlFor="useremail-input">Email </CLabel>
                  </CCol>
                  <CCol xs="12" md="9">
                    <CInput onChange={handleInput} value={state.email} type="email" id="useremail-input" name="email" placeholder="Enter Email" />
                  </CCol>
                </CFormGroup>
                
                <CFormGroup row>
                  <CCol md="3">
                    <CLabel htmlFor="role-select">User Role</CLabel>
                  </CCol>
                  <CCol xs="12" md="9">
                    <CSelect onChange={handleInput} custom name="role" id="role-select">
                      <option value={state.role}>{state.role}</option>
                      <option value="user">user</option>
                      <option value="staff">staff</option>
                      <option value="admin">admin</option>
                    </CSelect>
                  </CCol>
                </CFormGroup>
                
                <CFormGroup row>
                  <CCol tag="label" sm="3" className="col-form-label">
                    User is Active
                  </CCol>
                  <CCol sm="9">
                    <CSwitch
                    onClick={handleSwitch}
                    name="isActive"
                      className="mr-1"
                      color="success"
                      variant="opposite"
                      defaultChecked = {state.isActive}
                    />
                  </CCol>
                </CFormGroup>
            <CCardFooter>
              <CRow>

            <CCol >
              <CButton type="submit" size="md" color="primary"><CIcon name="cil-scrubber" /> Update User </CButton>
              <CButton onClick={resetForm} type="reset" color="info"><CIcon name="cil-ban" /> Reset Form </CButton>
            </CCol>
            <CCol >
              <CButton onClick={deleteUserData} type="button" block color="danger">Delete User</CButton>
            </CCol>
              </CRow>
            </CCardFooter>
              </CForm>
              :
              <span><CIcon className="text-muted" name="cil-ban" /> Not found</span>
            }
            </CCardBody>
            {message ? <span>{message.message}</span> : ""}
          </CCard>
        </CCol>
      </CRow>
      
  )
}

export default User
