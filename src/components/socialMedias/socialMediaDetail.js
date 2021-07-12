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
  CInput,
  CSwitch,
  CLabel,
  CModal,
  CModalHeader,
  CModalTitle,
  CModalBody,
  CModalFooter,
  CAlert,
  CRow,
} from '@coreui/react'
import CIcon from '@coreui/icons-react';
import '@coreui/icons/css/all.css';
import { freeSet } from '@coreui/icons'

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
  const [danger, setWarning] = useState(false)

  const dispatch = useDispatch();
  const message = useSelector(state => state.message)
  const error = useSelector(state => state.error)
  //const socialMediasData = useSelector(state => state.socialMedias.socialMediasList)
  const socialMediaData = useSelector(state => state.socialMedias.socialMedia)
  
  const socialMedia = socialMediaData && props.match.params.id ? socialMediaData : initialState;
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
    setWarning(!danger)
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
            {
              state &&
        <CCard>
          <CCardHeader>
            {props.match.params.id ? "SOCIAL MEDIA DETAIL FORM" : "ADD NEW SOCIAL MEDIA"}
          </CCardHeader>
          <CCardBody>
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
              </CForm>
                    </CCardBody>
                  <CCardFooter>
                <CCol>
              <CButton onClick={resetForm} type="reset" color="warning"><CIcon  content={freeSet.cilReload} /> Reset Form </CButton>
                <CButton onClick={() => props.history.push(`/socialMedias`)} type="button" color="secondary"><CIcon name="cil-ban" /> Cancel / Back</CButton>
              </CCol>
              <div className="card-header-actions">
               <CButton onClick={handleSubmit} type="submit" color="primary"><CIcon name="cil-check" /> {props.match.params.id ? "Update SocialMedia" : "Add SocialMedia"}</CButton>
                {props.match.params.id &&
                  <CButton onClick={() => setWarning(!danger)} type="button" color="danger" className="mr-1">Delete SocialMedia <CIcon  content={freeSet.cilDelete}/></CButton>
                }
              </div>
              <CModal 
              show={danger} 
              onClose={() => setWarning(!danger)}
              color="danger"
            >
              <CModalHeader closeButton>
                <CModalTitle>Delete SocialMedia</CModalTitle>
              </CModalHeader>
              <CModalBody>
                Are you sure deleting selected socialMedia?
              </CModalBody>
              <CModalFooter>
                <CButton color="danger" onClick={deleteSocialMediaData}>Delete SocialMedia</CButton>{' '}
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


      </CCol>
    </CRow>
  )
}

export default SocialMediaDetail
