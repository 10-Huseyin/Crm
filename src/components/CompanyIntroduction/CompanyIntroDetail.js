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
import { addCompanyIntro, editCompanyIntro, deleteCompanyIntro } from "../../actions/companyIntro.action"


const initialState = {
  title: "",
  subTitle: "",
  iconName: "",
  shortDescription: "",
  isActive: true,
  isDelete: false,
};

const CompanyIntroDetail = (props) => {
  const [modal, setModal] = useState(true)
  const [danger, setWarning] = useState(false)

  const dispatch = useDispatch();
  const message = useSelector(state => state.message)
  const error = useSelector(state => state.error)
  //const expertsData = useSelector(state => state.experts.expertList)
  
  const IntroData = useSelector(state => state.companyIntro.companyIntro)
  //console.log("burası en üst, expertdata ile state arasında")
  const Intro = IntroData && props.match.params.id ? IntroData : initialState;
  const [state, setState] = useState(Intro)
console.log(state)

 
  const handleInput = (e) => {
    setState({ ...state, [e.target.name]: e.target.value })
  }
  const handleSwitch = (e) => {
    setState({ ...state, [e.target.name]: e.target.checked })
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    const fd = new FormData();
    fd.set("title", state.title);
    fd.set("subTitle", state.subTitle);
    fd.set("iconName", state.iconName);
    fd.set("shortDescription", state.shortDescription);
    fd.set("isActive", state.isActive);
    fd.set("isDelete", state.isDelete);

    props.match.params.id ?
      dispatch(editCompanyIntro(fd, props.match.params.id))
        .then(res => {
          if (res === 200) {
            getDefaults()
          }
        })
      :
      dispatch(addCompanyIntro(fd))
        .then(res => {
          if (res === 200) {
            getDefaults()
          }
        })
  };

  const deleteIntroData = (event) => {
    event.preventDefault();
    dispatch(deleteCompanyIntro(state._id))
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
      props.history.push("/companyintroduction");
    }, 2000);
  }


  function resetForm () {
    props.match.params.id?
    setState(IntroData)
    :
    setState({
      title: "",
  subTitle: "",
  iconName: "",
  shortDescription: "",
  isActive: true,
  isDelete: false,
    })
    
  }
  console.log(state,message, error);
  //console.log(props.match.params.id )
  return (
    <CRow>
      <CCol xs="12" md="12">
        {
          state &&
          <CCard>
            <CCardHeader>
              {props.match.params.id ? "COMPANY INTRO DETAIL FORM" : "ADD NEW COMPANY INTRO"}
            </CCardHeader>
            <CCardBody>
              <CForm onSubmit={handleSubmit} encType="multipart/form-data" className="form-horizontal">
              <CFormGroup row>
                <CCol md="2">
                  <CLabel htmlFor="title">Title</CLabel>
                </CCol>
                <CCol xs="12" md="9">
                  <CInput onChange={handleInput} value={state.title} id="title" name="title" placeholder="Title" required />
                </CCol>
              </CFormGroup>
              <CFormGroup row>
                <CCol md="2">
                  <CLabel htmlFor="subTitle">Subtitle: </CLabel>
                </CCol>
                <CCol xs="12" md="9">
                  <CInput
                    onChange={handleInput} value={state.subTitle}
                    name="subTitle"
                    id="subTitle"
                    rows="6"
                    placeholder="Subtitle Content..."
                    required
                  />
                </CCol>
              </CFormGroup>
              <CFormGroup row>
                <CCol md="2">
                  <CLabel htmlFor="iconName">Icon Name:</CLabel>
                </CCol>
                <CCol xs="12" md="9">
                  <CInput onChange={handleInput} value={state.iconName} id="iconName" name="iconName" placeholder="Icon Name" required />
                </CCol>
              </CFormGroup>
              <CFormGroup row>
                <CCol md="2">
                  <CLabel htmlFor="shortDescription">Short Description:</CLabel>
                </CCol>
                <CCol xs="12" md="9">
                  <CInput onChange={handleInput} type="text" id="shortDescription" name="shortDescription" placeholder="Short Description" required />
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
                <CButton onClick={() => props.history.push(`/companyintroduction`)} type="button" color="secondary"><CIcon name="cil-ban" /> Cancel / Back</CButton>
              </CCol>
              <div className="card-header-actions">
               <CButton onClick={handleSubmit} type="submit" color="primary"><CIcon name="cil-check" /> {props.match.params.id ? "Update Intro" : "Add Intro"}</CButton>
                {props.match.params.id &&
                  <CButton onClick={() => setWarning(!danger)} type="button" color="danger" className="mr-1">Delete Profile <CIcon  content={freeSet.cilDelete}/></CButton>
                }
              </div>
              <CModal 
              show={danger} 
              onClose={() => setWarning(!danger)}
              color="danger"
            >
              <CModalHeader closeButton>
                <CModalTitle>Delete Intro</CModalTitle>
              </CModalHeader>
              <CModalBody>
                Are you sure deleting selected Intro?
              </CModalBody>
              <CModalFooter>
                <CButton color="danger" onClick={deleteIntroData}>Delete Intro</CButton>{' '}
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
              <CModalTitle>Add Company Intro</CModalTitle>
            </CModalHeader>
            <CModalBody>
              <CAlert color={error ? "danger" : "success"}>
                {error ? error : message}
              </CAlert>
              {message ? "Redirecting Company Intro Page!" : ""}
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

export default CompanyIntroDetail
