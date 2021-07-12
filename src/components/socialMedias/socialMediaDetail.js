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

import { useDispatch, useSelector } from "react-redux";
import { addNewSocialMedia, editSocialMediaData, deleteSocialMedia } from "../../actions/socialMedia.action";


const initialState = {
  title: "",
  link: "",
  isActive: true,
  isDeleted: false,
};

const SocialMediaDetail = (props) => {
  const [modal, setModal] = useState(true)
  const dispatch = useDispatch();
  const message = useSelector(state => state.message)
  const error = useSelector(state => state.error)
  const socialMediasData = useSelector(state => state.socialMedias.socialMediasList)
  
  const socialMedia = socialMediasData && props.match.params.id ? socialMediasData.find(socialMedia => socialMedia._id.toString() === props.match.params.id) : initialState;
  const [state, setState] = useState(socialMedia)

  
  const handleInput = (e) => {
    setState({ ...state, [e.target.name]: e.target.value })
  }
  const handleSwitch = (e) => {
    setState({...state, [e.target.name] : e.target.checked})
  }

  const resetForm = () => {
    setState(socialMedia)
  }


  const handleOne = () => {
 
      dispatch(handleOne())
    }
  




  const handleSubmit = (event) => {
    event.preventDefault();
    const fd = new FormData();
    
    fd.set("link", state.link);
    fd.set("title", state.title);
    fd.set("isActive", state.isActive);
    fd.set("isDeleted", state.isDeleted);
    
    props.match.params.id ? 
    dispatch(editSocialMediaData(fd, props.match.params.id ))
    .then(res=>{
      if (res === 200) {
        getDefaults()
      } 
      })
    :
    dispatch(addNewSocialMedia(fd))
    .then(res=>{
      if (res === 200) {
        getDefaults()
      } 
      })
  };

  const deleteSocialMediaData = (event) => {
    event.preventDefault();
    dispatch(deleteSocialMedia(state._id))
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
      props.history.push("/socialMedias");
    }, 2000);
  }
  //console.log(socialMediasData)
  //console.log(state, message, error);
  return (
    <CRow>
      <CCol xs="12" md="12">
        <CCard>
          <CCardHeader>
            {props.match.params.id ? "SOCIAL MEDIA DETAIL FORM" : "ADD NEW SOCIAL MEDIA"}
          </CCardHeader>
          <CCardBody>
            {
              state &&
            <CForm onSubmit={handleSubmit} encType="multipart/form-data" className="form-horizontal">
              <CFormGroup row>
                <CCol md="2">
                  <CLabel htmlFor="socialMediatitle">SocialMedia Title</CLabel>
                </CCol>
                <CCol xs="12" md="9">
                  <CInput onChange={handleInput}  defaultValue={state.title} id="socialMediatitle" name="title" placeholder="SocialMedia Title" />
                </CCol>
              </CFormGroup>
              <CFormGroup row>
                <CCol md="2">
                  <CLabel htmlFor="socialMedialink">SocialMedia Link</CLabel>
                </CCol>
                <CCol xs="12" md="9">
                  <CInput onChange={handleInput}  defaultValue={state.link} id="socialMedialink" name="link" placeholder="SocialMedia Link"  />
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
                  <CCardFooter>
                <CRow>
                <CCol>
                  <CButton type="submit" size="sm" color="primary"><CIcon name="cil-scrubber" /> Submit</CButton>
                  <CButton onClick={resetForm} type="reset" size="sm" color="danger"><CIcon name="cil-ban" /> Reset</CButton>
                </CCol>
                {props.match.params.id &&
                <CCol >
                      <CButton onClick={deleteSocialMediaData} type="button" block color="danger">Delete SocialMedia</CButton>
                    </CCol>
}
                      <CButton onClick={handleOne} type="button" block color="danger">Add SocialMedias</CButton>
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
                <CModalTitle>Add SocialMedia</CModalTitle>
              </CModalHeader>
              <CModalBody>
              <CAlert color={error?"danger":"success"}>
                    {error?error:message}
                  </CAlert>
                  {message? "Redirecting socialMedias page!" : ""}
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

export default SocialMediaDetail
