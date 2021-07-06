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
import { addNewMedia, editMediaData, deleteMedia } from "../../actions/media.action";


const initialState = {
  title: "",
  url: "",
  alt:"",
  isHomePage:false,
  isActive: true,
  isDeleted: false,
};

const MediaDetail = (props) => {
  const [modal, setModal] = useState(true)
  const dispatch = useDispatch();
  const message = useSelector(state => state.message)
  const error = useSelector(state => state.error)
  const mediasData = useSelector(state => state.medias.mediasList)
  
  const media = mediasData && props.match.params.id ? mediasData.find(media => media._id.toString() === props.match.params.id) : initialState;
  const [state, setState] = useState(media)

  
  const handleInput = (e) => {
    setState({ ...state, [e.target.name]: e.target.value })
  }
  const handleSwitch = (e) => {
    setState({...state, [e.target.name] : e.target.checked})
  }

  const resetForm = () => {
    setState(media)
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    const fd = new FormData();
    
    fd.set("name", state.name);
    fd.set("isActive", state.isActive);
    fd.set("isDeleted", state.isDeleted);
    
    props.match.params.id ? 
    dispatch(editMediaData(fd, props.match.params.id ))
    .then(res=>{
      if (res === 200) {
        getDefaults()
      } 
      })
    :
    dispatch(addNewMedia(fd))
    .then(res=>{
      if (res === 200) {
        getDefaults()
      } 
      })
  };

  const deleteMediaData = (event) => {
    event.preventDefault();
    dispatch(deleteMedia(state._id))
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
      props.history.push("/medias");
    }, 2000);
  }
  console.log(mediasData)
  console.log(state, message, error);
  return (
    <CRow>
      <CCol xs="12" md="12">
        <CCard>
          <CCardHeader>
            {props.match.params.id ? "MEDIA DETAIL FORM" : "ADD NEW MEDIA"}
          </CCardHeader>
          <CCardBody>
            {
              state &&
            <CForm onSubmit={handleSubmit} encType="multipart/form-data" className="form-horizontal">
              <CFormGroup row>
                <CCol md="2">
                  <CLabel htmlFor="mediatitle">Media Title</CLabel>
                </CCol>
                <CCol xs="12" md="9">
                  <CInput onChange={handleInput} defaultValue={state.title} id="mediatitle" name="title" placeholder="Media Title" />
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
                  <CLabel>is HomePage?</CLabel>
                </CCol>
                <CCol sm="9">
                    <CSwitch
                    onClick={handleSwitch}
                    name="isHomePage"
                      className="mr-1"
                      color="success"
                      variant="opposite"
                      defaultChecked = {state.isHomePage}
                    />
                  </CCol>
              </CFormGroup>
              <CFormGroup row>
                <CCol md="2">
                  <CLabel htmlFor="mediaurl">Media URL</CLabel>
                </CCol>
                <CCol xs="12" md="9">
                  <CInput onChange={handleInput} defaultValue={state.url} id="mediaurl" name="url" placeholder="Media URL" />
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
                      <CButton onClick={deleteMediaData} type="button" block color="danger">Delete Media</CButton>
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
                <CModalTitle>Add Media</CModalTitle>
              </CModalHeader>
              <CModalBody>
              <CAlert color={error?"danger":"success"}>
                    {error?error:message}
                  </CAlert>
                  {message? "Redirecting medias page!" : ""}
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

export default MediaDetail
