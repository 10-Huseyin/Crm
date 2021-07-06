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
  CInputRadio,
  CLabel,
  CRow
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { useDispatch} from "react-redux";
import { addCompanyIntro } from "../../actions/company.action";


const initialState = {
  title: "",
  subTitle: "",
  iconName: "",
  shortDescription: "",
  isActive: true,
  isDelete: false,
};

const BasicForms = (props) => {
  const [state, setState] = useState(initialState)

  const [message, setMessage] = useState("")
  const dispatch = useDispatch();


  

  const handleInput = (e) => {
    setState({ ...state, [e.target.name]: e.target.value })
    console.log(state);
  }

  const resetForm = () => {
    setState(initialState)
    setMessage("")
  }

  const handleSubmit = (event) => {
    console.log("handlesubmit")
    event.preventDefault();
    const fd = new FormData();

    fd.set("title", state.title);
    fd.set("subTitle", state.subTitle);
    fd.set("iconName", state.iconName);
    fd.set("shortDescription", state.shortDescription);
    fd.set("isActive", state.isActive);
    fd.set("isDelete", state.isDelete);

    dispatch(addCompanyIntro(fd))
        .then((res)=>{
          if(res===200){
            resetForm();
            props.history.push("/companyintroduction");
          }
        })
 
  };


  return (
    <CRow>
      <CCol xs="12" md="12">
        <CCard>
          <CCardHeader>
            Add Company Intro Form
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
                <CButton type="submit" size="sm" color="primary"><CIcon name="cil-scrubber" /> Submit</CButton>
                <CButton onClick={resetForm} type="reset" size="sm" color="danger"><CIcon name="cil-ban" /> Reset</CButton>
              </CCardFooter>
            </CForm>
          </CCardBody>
        </CCard>
      </CCol>
    </CRow>
  )
}

export default BasicForms
