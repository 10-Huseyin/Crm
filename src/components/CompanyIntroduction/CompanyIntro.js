import React, { useState } from 'react'
import { CCard, CCardBody, CCardHeader, CCol, CRow, CForm, CFormGroup, CLabel, CInput, CSelect, CSwitch, CCardFooter, CButton, CModal, CModalHeader, CModalTitle, CModalFooter, CModalBody, CAlert,CInputRadio} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { useDispatch, useSelector } from "react-redux";
import { editCompanyIntro, deleteCompanyIntro } from "../../actions/company.action";


const CompanyIntro = (props) => {
  const [modal, setModal] = useState(true)

  const dispatch = useDispatch()
  const message = useSelector(state => state.message)
  const error = useSelector(state => state.error)

  const companyIntroData = useSelector(state => state.companyIntro.companyIntroList)
  const companyIntro = companyIntroData.find(company => company._id.toString() === props.match.params.id)
  const [state, setState] = useState(companyIntro)

  const handleInput = (e) => {
    setState({ ...state, [e.target.name]: e.target.value })
  }

  const handleSwitch = (e) => {
    setState({ ...state, [e.target.name]: e.target.checked })
  }

  const resetForm = () => {
    setState(companyIntro)
  }

  const handleSubmit = (event) => {
    console.log("handlesubmit")
    event.preventDefault();
    dispatch(editCompanyIntro(state, state._id));
    getDefaults()

  };

  const deleteCompanyData = (event) => {
    event.preventDefault();
    dispatch(deleteCompanyIntro(state._id))
    getDefaults()
    
  };

  const getDefaults = () => {
    resetForm();
    setTimeout(() => {
      setModal(false)
      props.history.push("/companyintroduction");
    }, 2000);
  }

  console.log("message ==> ", message)
  console.log("error ==> ", error)

  return (
    <CRow>
      <CCol lg={9}>
        <CCard>
          <CCardHeader>
          Edit Company Intro Form
          </CCardHeader>
          <CCardBody>
            {state ?
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
                  <CInput onChange={handleInput} type="text" id="shortDescription" name="shortDescription " placeholder="Short Description" required />
                </CCol>
              </CFormGroup>

              <CFormGroup row>
                <CCol md="2">
                  <CLabel>Status:</CLabel>
                </CCol>
                <CCol md="9" onChange={handleInput} required>
                  <CFormGroup variant="custom-radio" inline>
                    <CInputRadio custom id="expertvisible" name="isActive" value="true" defaultChecked />
                    <CLabel variant="custom-checkbox" htmlFor="expertvisible">Active</CLabel>
                  </CFormGroup>
                  <CFormGroup variant="custom-radio" inline>
                    <CInputRadio custom id="expert-non-visible" name="isActive" value="false" />
                    <CLabel variant="custom-checkbox" htmlFor="expert-non-visible">Non-Active</CLabel>
                  </CFormGroup>
                </CCol>
              </CFormGroup>

                




                <CCardFooter>
                  <CRow>

                    <CCol >
                      <CButton type="submit" size="md" color="primary"><CIcon name="cil-scrubber" /> Update Expert </CButton>
                      <CButton onClick={resetForm} type="reset" color="info"><CIcon name="cil-ban" /> Reset Form </CButton>
                    </CCol>
                    <CCol >
                      <CButton onClick={deleteCompanyData} type="button" block color="danger">Delete Expert</CButton>
                    </CCol>
                  </CRow>
                </CCardFooter>
              </CForm>
              :
              <span><CIcon className="text-muted" name="cil-ban" /> Not found</span>
            }
            {
              (error || message) && typeof message === "string" &&
              <CModal
                show={modal}
                alignment="center"
                onClose={setModal}
              >
                <CModalHeader closeButton>
                  <CModalTitle>Delete Expert</CModalTitle>
                </CModalHeader>
                <CModalBody>
                  <CAlert color={error?"danger":"success"}>
                    {error?error:message}
                  </CAlert>
                  {message? "Redirecting experts page!" : ""}
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

export default CompanyIntro
