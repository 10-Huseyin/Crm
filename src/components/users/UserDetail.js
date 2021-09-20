import React, { useState, useEffect } from 'react'
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
import { freeSet } from '@coreui/icons'

import { useDispatch, useSelector } from "react-redux";
import { getRoles } from 'src/actions/role.action'
import { addNewUser, editUserData, deleteUser } from "../../actions/user.action";


const initialState = {
  firstname: "",
  lastname: "",
  email: "",
  isActive: true,
  isDeleted: false,
  mediaId: {},
  alt: "",
  roleId: {}
};

const UserDetail = (props) => {
  const [modal, setModal] = useState(true)
  const [danger, setWarning] = useState(false)
  const dispatch = useDispatch();
  const message = useSelector(state => state.message)
  const error = useSelector(state => state.error)
  const roles = useSelector(state => state.roles)
  //const usersData = useSelector(state => state.users.userList)
  const userData = useSelector(state => state.users.user)
  console.log("userdata==>>"+userData);

  const user = userData && props.match.params.id ? userData : initialState;
  const [state, setState] = useState(user)
  console.log("user==>>"+user);
  const [uploadMessage, setUploadMessage] = useState("");


  const onChangePhoto = (e) => {
    console.log(e.target.files);
    setState({ ...state, alt: e.target.files[0].name, mediaId: e.target.files[0] });
    setUploadMessage("Media selected succesfully!")
  };

  const handleInput = (e) => {
    setState({ ...state, [e.target.name]: e.target.value })
  }
  const handleSwitch = (e) => {
    setState({ ...state, [e.target.name]: e.target.checked })
  }

  const resetForm = () => {
    setState(user)
    document.getElementById("select-role").selectedIndex=0;
  }


  const handleSubmit = (event) => {
    event.preventDefault();
    const fd = new FormData();
    if (!props.match.params.id) {
      fd.set("password", state.lastname);
    }

    if (state.mediaId.name) {
      fd.set("mediaId", state.mediaId, state.mediaId.name);
    }
    fd.set("firstname", state.firstname);
    fd.set("lastname", state.lastname);
    fd.set("email", state.email);
    fd.set("isActive", state.isActive);
    fd.set("isDeleted", state.isDeleted);
    fd.set("alt", state.alt);
    fd.set("roleId", state.roleId._id ? state.roleId._id : state.roleId)
    //console.log(fd.getAll("mediaId"))
    console.log(fd.getAll('roleId'))

    props.match.params.id ?
      dispatch(editUserData(fd, props.match.params.id))
        .then(res => {
          console.log(res)
          if (res === 200) {
            getDefaults()
          }
        })
      :
      dispatch(addNewUser(fd))
        .then(res => {
          if (res === 200) {
            getDefaults()
          }
        })
  };

  const deleteUserData = (event) => {
    event.preventDefault();
    dispatch(deleteUser(state._id))
      .then(res => {
        if (res === 200) {
          setWarning(!danger)
          getDefaults()
        }
      })
  };
  const getDefaults = () => {
    console.log("get defaults")
    resetForm();
    setTimeout(() => {
      setModal(false)
      props.history.push("/users");
    }, 2000);
  }

  getRoles(() => {
    console.log("object")
    dispatch(getRoles())
  })



  //console.log(props.match.params.id)
  console.log(state, message, error, roles);
  return (
    <CRow>
      <CCol xs="12" md="12">
        {
          state &&
          <CCard>
            <CCardHeader>
              {props.match.params.id ? "USER DETAIL FORM" : "ADD NEW USER"}
            </CCardHeader>
            <CCardBody>
              <CForm onSubmit={handleSubmit} encType="multipart/form-data" className="form-horizontal">
                <CFormGroup row>
                  <CCol md="2">
                    <CLabel htmlFor="userfirstname">First Name</CLabel>
                  </CCol>
                  <CCol xs="12" md="9">
                    <CInput onChange={handleInput} value={state.firstname} id="userfirstname" name="firstname" placeholder="User First Name" required />
                  </CCol>
                </CFormGroup>
                <CFormGroup row>
                  <CCol md="2">
                    <CLabel htmlFor="subtitle">Last Name </CLabel>
                  </CCol>
                  <CCol xs="12" md="9">
                    <CInput onChange={handleInput} value={state.lastname} id="userlastname" name="lastname" placeholder="User Last Name" required />
                  </CCol>
                </CFormGroup>
                <CFormGroup row>
                  <CCol md="2">
                    <CLabel htmlFor="email">Email </CLabel>
                  </CCol>
                  <CCol xs="12" md="9">
                    <CInput onChange={handleInput} value={state.email} id="email" name="email" placeholder="Email" type="email" required />
                  </CCol>
                </CFormGroup>
                <CFormGroup row>
                  <CCol md="2">
                    <CLabel>Status</CLabel>
                  </CCol>
                  <CCol sm="9">
                    <CSwitch
                      onChange={handleSwitch}
                      name="isActive"
                      className="mr-1"
                      color="success"
                      variant="opposite"
                      checked={state.isActive}
                    />
                  </CCol>
                </CFormGroup>
                <CFormGroup row>
                  <CCol md="2">
                    <CLabel>Add New Photo</CLabel>
                  </CCol>
                  <CCol xs="12" md="9">
                    <CInputFile onChange={onChangePhoto} accept="image/*" custom id="custom-file-input" required={props.match.params.id ? false : true} />
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
                      src={state.mediaId && (state.mediaId.name ? URL.createObjectURL(state.mediaId) : state.mediaId.url)}
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
                    <CSelect custom name="roleId" id="select-role" onClick={getRoles} onChange={handleInput}>
                      <option value={state.roleId ? (state.roleId || state.roleId._id) : ""} >{state.roleId ? state.roleId.name : "Please select"}</option>
                      {roles.rolesList.map(item => <option key={item._id} value={item._id}>{item.name}</option>)}
                    </CSelect>
                  </CCol>
                </CFormGroup>
              </CForm>
            </CCardBody>
            <CCardFooter>
              <CCol>
                <CButton onClick={resetForm} type="reset" color="warning"><CIcon content={freeSet.cilReload} /> Reset Form </CButton>
                <CButton onClick={() => props.history.push(`/users`)} type="button" color="secondary"><CIcon name="cil-ban" /> Cancel / Back</CButton>
              </CCol>
              <div className="card-header-actions">
                <CButton onClick={handleSubmit} type="submit" color="primary"><CIcon name="cil-check" /> {props.match.params.id ? "Update User" : "Add User"}</CButton>
                {props.match.params.id &&
                  <CButton color="danger" onClick={() => setWarning(!danger)} className="mr-1">Delete User<CIcon content={freeSet.cilDelete} /></CButton>
                }
              </div>
              <CModal 
              show={danger} 
              onClose={() => setWarning(!danger)}
              color="danger"
            >
              <CModalHeader closeButton>
                <CModalTitle>Delete User</CModalTitle>
              </CModalHeader>
              <CModalBody>
                Are you sure deleting selected user?
              </CModalBody>
              <CModalFooter>
                <CButton color="danger" onClick={deleteUserData}>Delete User</CButton>{' '}
                <CButton color="secondary" onClick={() => setWarning(!danger)}>Cancel</CButton>
              </CModalFooter>
            </CModal>
            </CCardFooter>
          </CCard>
          
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
              <CAlert color={error ? "danger" : "success"}>
                {error ? error : message}
              </CAlert>
              {message ? "Redirecting users page!" : ""}
            </CModalBody>
            <CModalFooter>
              <CButton
                color="secondary"
                onClick={() => setModal(false)}
              >Cancel</CButton>
            </CModalFooter>
          </CModal>
        }
      </CCol>
    </CRow>
  )
}

export default UserDetail
