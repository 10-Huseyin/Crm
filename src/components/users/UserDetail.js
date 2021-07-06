import React, { useState } from 'react'
import {
  CButton,
  CCard,
  CCardBody,
  CCardFooter,
  CCardHeader,
  CCol,
  CForm,
  CFormGroup,
  CSelect,
  CInput,
  CInputFile,
  CSwitch,
  CLabel,
  CModal,
  CModalHeader,
  CModalTitle,
  CModalBody,
  CModalFooter,
  CAlert,
  CRow,
  CImg
} from '@coreui/react'
import CIcon from '@coreui/icons-react';
import '@coreui/icons/css/all.css';

import { useDispatch, useSelector } from "react-redux";
import { addNewUser, editUserData, deleteUser } from "../../actions/user.action";


const initialState = {
  firstname: "",
  lastname: "",
  email: "",
  isActive: true,
  isDeleted: false,
  mediaId: {},
  alt:"",
  roleId: ""
};

const UserDetail = (props) => {
  const [modal, setModal] = useState(true)
  const dispatch = useDispatch();
  const message = useSelector(state => state.message)
  const error = useSelector(state => state.error)
  const roles = useSelector(state => state.roles)
  const usersData = useSelector(state => state.users.userList)
  
  const user = usersData && props.match.params.id ? usersData.find(user => user._id.toString() === props.match.params.id) : initialState;
  const [state, setState] = useState(user)

  const [uploadMessage, setUploadMessage] = useState("");
  

  const onChangePhoto = (e) => {
    console.log(e.target.files);
    setState({...state, alt : e.target.files[0].name, mediaId : e.target.files[0]});
    setUploadMessage("Media selected succesfully!")
  };
  
  const handleInput = (e) => {
    setState({ ...state, [e.target.name]: e.target.value })
  }
  const handleSwitch = (e) => {
    setState({...state, [e.target.name] : e.target.checked})
  }

  const resetForm = () => {
    setState(user)
  }


  const handleSubmit = (event) => {
    event.preventDefault();
    const fd = new FormData();
    if(state.mediaId.name){
      fd.set("mediaId", state.mediaId, state.mediaId.name);
    }
    fd.set("firstname", state.firstname);
    fd.set("lastname", state.lastname);
    fd.set("email", state.email);
    fd.set("isActive", state.isActive);
    fd.set("isDeleted", state.isDeleted);
    fd.set("alt", state.alt);
    fd.set("roleId", state.roleId)
    console.log(fd.getAll("mediaId"))
    //console.log(fd.getAll('roleId'))
    
    props.match.params.id ? 
    dispatch(editUserData(fd, props.match.params.id ))
    .then(res=>{
      if (res === 200) {
        getDefaults()
      } 
      })
    :
    dispatch(addNewUser(fd))
    .then(res=>{
      if (res === 200) {
        getDefaults()
      } 
      })
  };

  const deleteUserData = (event) => {
    event.preventDefault();
    dispatch(deleteUser(state._id))
    .then(res=>{
      if (res === 200) {
        getDefaults()
      } 
      })
  };
  const getDefaults = () => {
    resetForm();
    setTimeout(() => {
      setModal(false)
      props.history.push("/users");
    }, 2000);
  }
//console.log(props.match.params.id)
  console.log(state, message, error, roles);
  return (
    <CRow>
      <CCol xs="12" md="12">
        <CCard>
          <CCardHeader>
            {props.match.params.id ? "USER DETAIL FORM" : "ADD NEW USER"}
          </CCardHeader>
          <CCardBody>
            {
              state &&
            <CForm onSubmit={handleSubmit} encType="multipart/form-data" className="form-horizontal">
              <CFormGroup row>
                <CCol md="2">
                  <CLabel htmlFor="userfirstname">First Name</CLabel>
                </CCol>
                <CCol xs="12" md="9">
                  <CInput onChange={handleInput} defaultValue={state.firstname} id="userfirstname" name="firstname" placeholder="User First Name" required />
                </CCol>
              </CFormGroup>
              <CFormGroup row>
                <CCol md="2">
                  <CLabel htmlFor="subtitle">Last Name </CLabel>
                </CCol>
                <CCol xs="12" md="9">
                  <CInput onChange={handleInput} defaultValue={state.lastname} id="userlastname" name="lastname" placeholder="User Last Name" required />
                </CCol>
              </CFormGroup>
              <CFormGroup row>
                <CCol md="2">
                  <CLabel htmlFor="email">Email </CLabel>
                </CCol>
                <CCol xs="12" md="9">
                  <CInput onChange={handleInput} defaultValue={state.email} id="email" name="email" placeholder="Email" type="email" required />
                </CCol>
              </CFormGroup>
              <CFormGroup row>
                <CCol md="2">
                  <CLabel>Status</CLabel>
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
              <CFormGroup row>
                <CCol md="2">
                  <CLabel>Add New Photo</CLabel>
                </CCol>
                <CCol xs="12" md="9">
                  <CInputFile onChange={onChangePhoto} custom id="custom-file-input" required={props.match.params.id? false : true}/>
                  <CLabel htmlFor="custom-file-input" variant="custom-file">
                    {state.alt ? state.alt : "Choose file..."}
                  </CLabel>
                  <span className="ml-2">{uploadMessage}</span>
                </CCol>
              </CFormGroup>
              <CFormGroup row>
                <CCol md="2">
                  <CLabel>Selected Photo</CLabel>
                </CCol>
                <CCol xs="12" md="9">
                <CImg
                        src={state.mediaId.name ? URL.createObjectURL(state.mediaId) :state.mediaId.url}
                        className="c-avatar-img profile-img-card"
                        alt="user-img"
                        />
                </CCol>
              </CFormGroup>
              <CFormGroup row >
                <CCol md="2">
                  <CLabel >Select Role</CLabel>
                </CCol>
                    
                <CCol xs="12" md="9">
                  <CSelect custom name="roleId" id="select" onChange={handleInput}>
                      <option value={state.roleId? state.roleId.name : ""}>{state.roleId? state.roleId.name : "Please select"}</option>
                      {roles.rolesList.map(item=><option key={item._id} value={item._id}>{item.name}</option>)}
                    </CSelect>
                </CCol>
                    
              </CFormGroup>
                  <CCardFooter>
                <CRow>
                <CCol>
                  <CButton type="submit" size="sm" color="primary"><CIcon name="cil-scrubber" /> Submit</CButton>
                  <CButton onClick={resetForm} type="reset" size="sm" color="danger"><CIcon name="cil-ban" /> Reset</CButton>
                </CCol>
                {props.match.params.id &&
                <CCol >
                      <CButton onClick={deleteUserData} type="button" block color="danger">Delete User</CButton>
                    </CCol>
}
                </CRow>
              </CCardFooter>
            </CForm>
            }
          {
            (error || message) &&
            <CModal 
            show={modal} 
            alignment="center"
            onClose={setModal}
            >
              <CModalHeader closeButton>
                <CModalTitle>Add User</CModalTitle>
              </CModalHeader>
              <CModalBody>
              <CAlert color={error?"danger":"success"}>
                    {error?error:message}
                  </CAlert>
                  {message? "Redirecting users page!" : ""}
              </CModalBody>
              <CModalFooter>
                <CButton 
                  color="secondary" 
                  onClick={() => setModal(false)}
                >Cancel</CButton>
              </CModalFooter>
            </CModal>
                }


          </CCardBody>
        </CCard>
      </CCol>
    </CRow>
  )
}

export default UserDetail
