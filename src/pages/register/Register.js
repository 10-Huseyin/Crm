import React, { useState, useRef } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { register } from "../../actions/auth.action";
import {
  CButton,
  CCard,
  CCardBody,
  CCardFooter,
  CCol,
  CContainer,
  CForm,
  CInput,
  CInputGroup,
  CInputGroupPrepend,
  CInputGroupText,
  CRow,
  CImg,
  CInputFile,
  CLabel,
  CModal,
  CModalHeader,
  CModalTitle,
  CModalBody,
  CAlert,
  CModalFooter
} from "@coreui/react";
import CIcon from "@coreui/icons-react";
import { freeSet } from '@coreui/icons'


const initialState = {
  firstname: "",
  lastname: "",
  email: "",
  password: "",
  mediaId: "",
  alt:""
}

const Register = (props) => {
  const [state, setstate] = useState(initialState)
  const [successful, setSuccessful] = useState(false);
  const [modal, setModal] = useState(true)

  const store = useSelector(store => store);
  const dispatch = useDispatch();

  const onChangeInput = (e) => {
    setstate({...state, [e.target.name] : e.target.value});
  };


  const onChangePhoto = (e) => {
    //console.log(e.target.files);
    setstate({...state, mediaId : e.target.files[0]});
  };
  
  
  

  const handleRegister = (e) => {
    e.preventDefault();
    setSuccessful(false);
    const fd = new FormData();
    if(state.mediaId.name){
      fd.set("mediaId", state.mediaId, state.mediaId.name);
    }
    fd.set("firstname", state.firstname);
    fd.set("lastname", state.lastname);
    fd.set("email", state.email);
    fd.set("password", state.password);
    fd.set("alt", state.alt);
    fd.set("roleId", "60e460071a737800158336f5");
    
    //console.log(fd.getAll('mediaId'))
      dispatch(register(fd))
        .then((res) => {
          if(res === 200) { 
          setSuccessful(true);
          setTimeout(() => {
            setModal(false)
            props.history.push("/login");
          }, 2000)
        } else {
          setSuccessful(false);
        }
        });
    setstate(initialState)
  };

//console.log(successful)
console.log(store)

  return (
      <div className="c-app c-default-layout flex-row align-items-center">
      <CContainer>
        <CRow className="justify-content-center">
          <CCol md="9" lg="7" xl="6">
            <CCard className="mx-4">
              <CCardBody className="p-4">
                <CForm name="form" onSubmit={handleRegister} >
                  <h1>Register</h1>
                  <p className="text-muted">Create your account</p>
                  <div className="c-avatar-register">
                    <CImg
                        src={state.mediaId.name ? URL.createObjectURL(state.mediaId) :'avatars/avatar.png'}
                        className="c-avatar-img profile-img-card"
                        alt="profile-img"
                        />
                      <span className="c-avatar-add">
                        <CInputFile onChange={onChangePhoto} id="file-input" name="file-input" className="c-avatar-input"/>
                        <CLabel htmlFor="file-input" className="c-avatar-label"><CIcon  content={freeSet.cilCamera} /></CLabel>
                      </span>
                    </div>
                  <CInputGroup className={"mb-3" + (successful && !state.firstname ? " has-error" : "")}>
                    <CInputGroupPrepend>
                      <CInputGroupText>
                        <CIcon name="cil-user" />
                      </CInputGroupText>
                    </CInputGroupPrepend>
                    <CInput type="text" placeholder="First Name" autoComplete="firstname" name="firstname"
              value={state.firstname}
              onChange={onChangeInput}
              //required
              />
              {successful && !state.firstname && (
              <div className="help-block">First Name is required</div>
            )}
                  </CInputGroup>
                  <CInputGroup className={"mb-3" + (successful && !state.lastname ? " has-error" : "")}>
                    <CInputGroupPrepend>
                      <CInputGroupText>
                        <CIcon name="cil-user" />
                      </CInputGroupText>
                    </CInputGroupPrepend>
                    <CInput type="text" placeholder="Last Name" autoComplete="lastname" name="lastname"
              value={state.lastname}
              onChange={onChangeInput}/>
              {successful && !state.lastname && (
              <div className="help-block">Last Name is required</div>
            )}
                  </CInputGroup>
                  <CInputGroup className="mb-3">
                    <CInputGroupPrepend>
                      <CInputGroupText>@</CInputGroupText>
                    </CInputGroupPrepend>
                    <CInput type="text" placeholder="Email" autoComplete="email" name="email"
              value={state.email}
              onChange={onChangeInput}
              //required
              />
              {successful && !state.email && (
              <div className="help-block">Email is required</div>
            )}
                  </CInputGroup>
                  <CInputGroup className="mb-3">
                    <CInputGroupPrepend>
                      <CInputGroupText>
                        <CIcon name="cil-lock-locked" />
                      </CInputGroupText>
                    </CInputGroupPrepend>
                    <CInput type="password" placeholder="Password" autoComplete="new-password" name="password"
              value={state.password}
              onChange={onChangeInput}
              //required
              />
              {successful && !state.password && (
              <div className="help-block">Password is required</div>
            )}
                  </CInputGroup>
                  <CInputGroup className="mb-4">
                    <CInputGroupPrepend>
                      <CInputGroupText>
                        <CIcon name="cil-lock-locked" />
                      </CInputGroupText>
                    </CInputGroupPrepend>
                    <CInput type="password" placeholder="Repeat password" autoComplete="new-password" />
                  </CInputGroup>
                  <CButton type="submit" color="success" block>Create Account</CButton>
                    <span>You have an account already? Go to <Link to="/login" >
                       Login Page
                      </Link>
                    </span>
                </CForm>
              </CCardBody>
              <CCardFooter className="p-4">
                <CRow>
                  <CCol xs="12" sm="6">
                    <CButton className="btn-facebook mb-1" block><span>facebook</span></CButton>
                  </CCol>
                  <CCol xs="12" sm="6">
                    <CButton className="btn-twitter mb-1" block><span>twitter</span></CButton>
                  </CCol>
                </CRow>
              </CCardFooter>
            </CCard>
          </CCol>
        </CRow>
        {
              (store.error || store.message) && typeof store.message === "string" &&
              <CModal
                show={modal} 
                alignment="center"
                onClose={setModal}
              >
                <CModalHeader closeButton>
                  <CModalTitle>Register</CModalTitle>
                </CModalHeader>
                <CModalBody>
                  <CAlert color={store.error?"danger":"success"}>
                    {store.error?store.error:store.message}
                  </CAlert>
                  {store.message? "Redirecting main page!" : ""}
                </CModalBody>
                <CModalFooter>
                  <CButton
                    color="secondary"
                    onClick={() => setModal(false)}
                  >Cancel</CButton>
                </CModalFooter>
              </CModal>
            }
      </CContainer>
    </div>
    );
  }
  export default Register;