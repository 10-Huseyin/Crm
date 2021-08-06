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
  CImg
} from '@coreui/react'
import CIcon from '@coreui/icons-react';
import '@coreui/icons/css/all.css';
import { freeSet } from '@coreui/icons'

import { useDispatch, useSelector } from "react-redux";
import { addNewSubscriber, editSubscriberData, deleteSubscriber } from "../../actions/subscriber.action";

const socialMedia = ["twitter", "linkedin", "flickr", "tumblr", "xing", "github", "stackoverflow", "youtube", "dribbble", "instagram", "pinterest", "vk", "yahoo", "behance", "reddit", "vimeo"]

const initialState = {
  email: "",
  name: "",
  isActive: true,
  isDeleted: false,
};

const SubscriberDetail = (props) => {
  const [modal, setModal] = useState(true)
  const [danger, setWarning] = useState(false)

  const dispatch = useDispatch();
  const message = useSelector(state => state.message)
  const error = useSelector(state => state.error)
  //const expertsData = useSelector(state => state.experts.expertList)
  
  const subscriberData = useSelector(state => state.subscribers.subscriber)
  //console.log("burası en üst, expertdata ile state arasında")
  const subscriber = subscriberData && props.match.params.id ? subscriberData : initialState;
  const [state, setState] = useState(subscriber)
//console.log(state)
  const [uploadMessage, setUploadMessage] = useState("");
  const [social, setSocial] = useState({ title: "", link: "" })


  const handleInput = (e) => {
    setState({ ...state, [e.target.name]: e.target.value })
  }
  const handleSwitch = (e) => {
    setState({ ...state, [e.target.name]: e.target.checked })
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    const fd = new FormData();
  
    fd.set("email", state.email);
    fd.set("name", state.name);
    fd.set("isActive", state.isActive);
    fd.set("isDeleted", state.isDeleted);



    props.match.params.id ?
      dispatch(editSubscriberData(fd, props.match.params.id))
        .then(res => {
          if (res === 200) {
            getDefaults()
          }
        })
      :
      dispatch(addNewSubscriber(fd))
        .then(res => {
          if (res === 200) {
            getDefaults()
          }
        })
  };

  const deleteSubscriberData = (event) => {
    event.preventDefault();
    dispatch(deleteSubscriber(state._id))
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
      props.history.push("/subscribers");
    }, 2000);
  }


  function resetForm () {
    props.match.params.id?
    setState(subscriberData)
    :
    setState({
      email: "",
      name: "",
      isActive: true,
      isDeleted: false,
    })
    }

  console.log(state, social, message, error);

  return (
    <CRow>
      <CCol xs="12" md="12">
        {
          state &&
          <CCard>
            <CCardHeader>
              {props.match.params.id ? "SUBSCRIBER DETAIL FORM" : "ADD NEW SUBSCRIBER"}
            </CCardHeader>
            <CCardBody>
              <CForm onSubmit={handleSubmit} encType="multipart/form-data" className="form-horizontal">
                <CFormGroup row>
                  <CCol md="2">
                    <CLabel htmlFor="email">Email</CLabel>
                  </CCol>
                  <CCol xs="12" md="9">
                    <CInput onChange={handleInput} value={state.email} id="email" name="email" placeholder="Email" required />
                  </CCol>
                </CFormGroup>
                <CFormGroup row>
                  <CCol md="2">
                    <CLabel htmlFor="subtitle">Name </CLabel>
                  </CCol>
                  <CCol xs="12" md="9">
                    <CInput onChange={handleInput} value={state.name} id="name" name="name" placeholder="Name" required />
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
                </CForm>
            </CCardBody>
            <CCardFooter>
              <CCol>
              <CButton onClick={resetForm} type="reset" color="warning"><CIcon  content={freeSet.cilReload} /> Reset Form </CButton>
                <CButton onClick={() => props.history.push(`/subscribers`)} type="button" color="secondary"><CIcon name="cil-ban" /> Cancel / Back</CButton>
              </CCol>
              <div className="card-header-actions">
               <CButton onClick={handleSubmit} type="submit" color="primary"><CIcon name="cil-check" /> {props.match.params.id ? "Update Subscriber" : "Add Subscriber"}</CButton>
                {props.match.params.id &&
                  <CButton onClick={() => setWarning(!danger)} type="button" color="danger" className="mr-1">Delete Subscriber <CIcon  content={freeSet.cilDelete}/></CButton>
                }
              </div>
              <CModal 
              show={danger} 
              onClose={() => setWarning(!danger)}
              color="danger"
            >
              <CModalHeader closeButton>
                <CModalTitle>Delete Subscriber</CModalTitle>
              </CModalHeader>
              <CModalBody>
                Are you sure deleting selected Subscriber?
              </CModalBody>
              <CModalFooter>
                <CButton color="danger" onClick={deleteSubscriberData}>Delete Subscriber</CButton>{' '}
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
              <CModalTitle>Add Subscriber</CModalTitle>
            </CModalHeader>
            <CModalBody>
              <CAlert color={error ? "danger" : "success"}>
                {error ? error : message}
              </CAlert>
              {message ? "Redirecting Subscribers page!" : ""}
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

export default SubscriberDetail
