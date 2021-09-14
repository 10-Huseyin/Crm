import React, { useState, useRef } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Redirect } from 'react-router-dom';
import { login } from "../../actions/auth.action";
 
import {
  CButton,
  CCard,
  CCardBody,
  CCardGroup,
  CCol,
  CContainer,
  CForm,
  CInput,
  CInputGroup,
  CInputGroupPrepend,
  CInputGroupText,
  CRow,
  CModal,
  CModalHeader,
  CModalTitle,
  CModalBody,
  CAlert,
  CModalFooter
} from "@coreui/react";
import CIcon from "@coreui/icons-react";
 
const required = (value) => {
  if (!value) {
    return (
      <div className="alert alert-danger" role="alert">
        This field is required!
      </div>
    );
  }
};

const initialState = {
  email:"",
  password:""
}

const Login = (props) => {
  // const form = useRef();
  // const checkBtn = useRef();
  const [modal, setModal] = useState(true)

const [loginForm, setloginForm] = useState(initialState)
  const [loading, setLoading] = useState(false);

  //const { isLoggedIn } = useSelector(state => state.auth);
  const store = useSelector(store => store);
  //const { message } = useSelector(state => state.message);

  const dispatch = useDispatch();

  const onChangeInput = (e) => {
    setloginForm({...loginForm, [e.target.name] : e.target.value});

  };

  

  const handleLogin = (e) => {
    e.preventDefault();
    setLoading(true);
    const fd = new FormData();
    fd.set("email", loginForm.email);
    fd.set("password", loginForm.password);

    //const fdata = {email:loginForm.email , password:loginForm.password} 
    dispatch(login(fd))
      .then((res) => {
        if(res === 200) {
          props.history.push("/");
        }
        //window.location.reload();
      })
      .catch(() => {
        setLoading(false);
      });

  };

  // if (isLoggedIn) {
  //   return <Redirect to="/profile" />;
  // }
  console.log(store)
  //console.log(isLoggedIn)
  console.log(loginForm)
  return (
    <div className="c-app c-default-layout flex-row align-items-center">
      <CContainer>
        <CRow className="justify-content-center">
          <CCol md="8">
            <CCardGroup>
              <CCard className="p-4">
                <CCardBody>
                  <CForm name="form" onSubmit={handleLogin} >
                    <h1>Login</h1>
                    <p className="text-muted">Sign In to your account</p>
                    <CInputGroup
                      className={
                        "mb-3" + (loading && !loginForm.email ? " has-error" : "")
                      }
                    >
                      <CInputGroupPrepend>
                        <CInputGroupText>
                          <CIcon name="cil-user" />
                        </CInputGroupText>
                      </CInputGroupPrepend>
                      <CInput
                        type="text"
                        placeholder="Username"
                        autoComplete="email"
                        name="email"
                        value={loginForm.email}
                        onChange={onChangeInput}
                        validations={[required]}
                      />
                      {loading && !loginForm.email && (
                        <div className="help-block">Username is required</div>
                      )}
                    </CInputGroup>
                    <CInputGroup
                      className={
                        "mb-4" + (loading && !loginForm.password ? " has-error" : "")
                      }
                    >
                      <CInputGroupPrepend>
                        <CInputGroupText>
                          <CIcon name="cil-lock-locked" />
                        </CInputGroupText>
                      </CInputGroupPrepend>
                      <CInput
                        type="password"
                        placeholder="Password"
                        autoComplete="current-password"
                        name="password"
                        value={loginForm.password}
                        onChange={onChangeInput}
                      />
                      {loading && !loginForm.password && (
                        <div className="help-block">Password is required</div>
                      )}
                    </CInputGroup>
                    <CRow>
                      <CCol xs="6">
                        <CButton type="submit" color="primary" className="px-4">
                          Login
                        </CButton>
                      </CCol>
                      <CCol xs="6" className="text-right">
                        <CButton color="link" className="px-0">
                          Forgot password?
                        </CButton>
                      </CCol>
                    </CRow>
                  </CForm>
                </CCardBody>
              </CCard>
              <CCard
                className="text-white bg-primary py-5 d-md-down-none"
                style={{ width: "44%" }}
              >
                <CCardBody className="text-center">
                  <div>
                    <h2>Sign up</h2>
                    <p>
                      Lorem ipsum dolor sit amet, consectetur adipisicing
                      elit, sed do eiusmod tempor incididunt ut labore et
                      dolore magna aliqua.
                    </p>
                    <Link to="/register">
                      <CButton
                        color="primary"
                        className="mt-3"
                        active
                        tabIndex={-1}
                      >
                        Register Now!
                      </CButton>
                    </Link>
                  </div>
                </CCardBody>
              </CCard>
            </CCardGroup>
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
                  <CModalTitle>Login</CModalTitle>
                </CModalHeader>
                <CModalBody>
                  <CAlert color={store.error?"danger":"success"}>
                    {store.error?store.error:store.message}
                  </CAlert>
                  {store.message? "Redirecting page!" : ""}
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

export default Login;


