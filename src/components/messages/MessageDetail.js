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
  CInputGroup,
  CInputGroupAppend,
  CInputGroupPrepend,
  CInputGroupText,
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
  CImg,
  CTextarea
} from '@coreui/react'
import CIcon from '@coreui/icons-react';
import '@coreui/icons/css/all.css';
import { freeSet } from '@coreui/icons'

import { useDispatch, useSelector } from "react-redux";
import { addNewMessage, editMessageData, deleteMessage } from "../../actions/messages.action";



const initialState = {
  firstname: "",
  lastname: "",
  subject: "",
  content: "",
  email: "",
  phoneNumber: "",
  isReplied: false,
  isDeleted: false,
  isRead: false,
 };

const MessageDetail = (props) => {
  const [modal, setModal] = useState(true)
  const [danger, setWarning] = useState(false)

  const dispatch = useDispatch();
  const message = useSelector(state => state.message)
  const error = useSelector(state => state.error)
  //const expertsData = useSelector(state => state.experts.expertList)
  
  const messageData = useSelector(state => state.messages.message)
  //console.log("burası en üst, expertdata ile state arasında")
  const messageState = messageData && props.match.params.id ? messageData : initialState;
  const [state, setState] = useState(messageState)
//console.log(state)
//const [uploadMessage, setUploadMessage] = useState("");
 

  const handleInput = (e) => {
    setState({ ...state, [e.target.name]: e.target.value })
  }
  const handleSwitch = (e) => {
    setState({ ...state, [e.target.name]: e.target.checked })
  }


 
  const handleSubmit = (event) => {
    event.preventDefault();
    const fd = new FormData();
    
    fd.set("firstname", state.firstname);
    fd.set("lastname", state.lastname);
    fd.set("subject", state.subject);
    fd.set("content", state.content);
    fd.set("email", state.email);
    fd.set("phoneNumber", state.phoneNumber);
    fd.set("isRead", state.isRead);
    fd.set("isDeleted", state.isDeleted);
    fd.set("isReplied", state.isReplied);


    props.match.params.id ?
      dispatch(editMessageData(fd, props.match.params.id))
        .then(res => {
          if (res === 200) {
            getDefaults()
          }
        })
      :
      dispatch(addNewMessage(fd))
        .then(res => {
          if (res === 200) {
            getDefaults()
          }
        })
  };

  const deleteMesssageData = (event) => {
    event.preventDefault();
    dispatch(deleteMessage(state._id))
      .then(res => {
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
      props.history.push("/messages");
    }, 2000);
  }


  function resetForm () {
    props.match.params.id?
    setState(messageData)
    :
    setState({
      firstname: "",
      lastname: "",
      subject: "",
      content: "",
      email: "",
      phoneNumber: "",
      isReplied: false,
      isDeleted: false,
      isRead: false,
    })

  }


  //console.log("return den hemen önce")
  //console.log(initialState);
  //console.log(expertData);
  console.log(state,message, error);
  //console.log(props.match.params.id )
  return (
    <CRow>
      <CCol xs="12" md="12">
        {
          state &&
          <CCard>
            <CCardHeader>
              {props.match.params.id ? "MESSAGE DETAIL FORM" : "ADD NEW MESSAGE"}
            </CCardHeader>
            <CCardBody>
              <CForm onSubmit={handleSubmit} encType="multipart/form-data" className="form-horizontal">
                <CFormGroup row>
                  <CCol md="2">
                    <CLabel htmlFor="firstname">First Name</CLabel>
                  </CCol>
                  <CCol xs="12" md="9">
                    <CInput onChange={handleInput} value={state.firstname} id="firstname" name="firstname" placeholder="First Name" required />
                  </CCol>
                </CFormGroup>
                <CFormGroup row>
                  <CCol md="2">
                    <CLabel htmlFor="subtitle">Last Name </CLabel>
                  </CCol>
                  <CCol xs="12" md="9">
                    <CInput onChange={handleInput} value={state.lastname} id="lastname" name="lastname" placeholder="Last Name" required />
                  </CCol>
                </CFormGroup>
                <CFormGroup row>
                  <CCol md="2">
                    <CLabel htmlFor="subject">Subject </CLabel>
                  </CCol>
                  <CCol xs="12" md="9">
                    <CInput onChange={handleInput} value={state.subject} id="subject" name="subject" placeholder="subject" required />
                  </CCol>
                </CFormGroup>
                <CFormGroup row>
                  <CCol md="2">
                    <CLabel htmlFor="content">Content </CLabel>
                  </CCol>
                  <CCol xs="12" md="9">
                    <CTextarea onChange={handleInput} value={state.content} id="content" name="content" placeholder="Content" required />
                  </CCol>
                </CFormGroup>
              
                <CFormGroup row>
                  <CCol md="2">
                    <CLabel htmlFor="email">Email </CLabel>
                  </CCol>
                  <CCol xs="12" md="9">
                    <CInput onChange={handleInput} value={state.email} id="email" name="email" placeholder="Email" required />
                  </CCol>
                </CFormGroup>
                <CFormGroup row>
                  <CCol md="2">
                    <CLabel htmlFor="phoneNumber">Phone Number</CLabel>
                  </CCol>
                  <CCol xs="12" md="9">
                    <CInput onChange={handleInput} value={state.phoneNumber} id="phoneNumber" name="phoneNumber" placeholder="Phone Number" required />
                  </CCol>
                </CFormGroup>
                <CFormGroup row>
                  <CCol md="2">
                    <CLabel>isRead</CLabel>
                  </CCol>
                  <CCol sm="9">
                    <CSwitch
                      onChange={handleSwitch}
                      name="isRead"
                      className="mr-1"
                      color="success"
                      variant="opposite"
                      checked={state.isRead}
                    />
                  </CCol>
                </CFormGroup>
                <CFormGroup row>
                  <CCol md="2">
                    <CLabel>isReplied</CLabel>
                  </CCol>
                  <CCol sm="9">
                    <CSwitch
                      onChange={handleSwitch}
                      name="isReplied"
                      className="mr-1"
                      color="success"
                      variant="opposite"
                      checked={state.isReplied}
                    />
                  </CCol>
                </CFormGroup>
                
              </CForm>
            </CCardBody>
            <CCardFooter>
              <CCol>
              <CButton onClick={resetForm} type="reset" color="warning"><CIcon  content={freeSet.cilReload} /> Reset Form </CButton>
                <CButton onClick={() => props.history.push(`/messages`)} type="button" color="secondary"><CIcon name="cil-ban" /> Cancel / Back</CButton>
              </CCol>
              <div className="card-header-actions">
               <CButton onClick={handleSubmit} type="submit" color="primary"><CIcon name="cil-check" /> {props.match.params.id ? "Update Message" : "Add Message"}</CButton>
                {props.match.params.id &&
                  <CButton onClick={() => setWarning(!danger)} type="button" color="danger" className="mr-1">Delete Message <CIcon  content={freeSet.cilDelete}/></CButton>
                }
              </div>
              <CModal 
              show={danger} 
              onClose={() => setWarning(!danger)}
              color="danger"
            >
              <CModalHeader closeButton>
                <CModalTitle>Delete Message</CModalTitle>
              </CModalHeader>
              <CModalBody>
                Are you sure deleting selected message?
              </CModalBody>
              <CModalFooter>
                <CButton color="danger" onClick={deleteMesssageData}>Delete Message</CButton>{' '}
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
              <CModalTitle>Add Message</CModalTitle>
            </CModalHeader>
            <CModalBody>
              <CAlert color={error ? "danger" : "success"}>
                {error ? error : message}
              </CAlert>
              {message ? "Redirecting message page!" : ""}
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

export default MessageDetail
