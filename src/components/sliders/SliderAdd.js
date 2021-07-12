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
  CFormText,
  CTextarea,
  CInput,
  CInputFile,
  CInputRadio,
  CLabel,
  CSelect,
  CRow
} from '@coreui/react'
import CIcon from '@coreui/icons-react'

import { useDispatch} from "react-redux";
import { addNewSlider } from "../../actions/slider.action";


const initialState = {
  title: "",
  subtitle: "",
  url: "",
  buttonText: "",
  order: "",
  isActive: true,
  isDelete: false,
  mediaId: "",
  isVideo: "",
  alt:"",
};

const BasicForms = (props) => {
  const [state, setState] = useState(initialState)
  //const [photo, setPhoto] = useState({});
  const [message, setMessage] = useState("")
  const dispatch = useDispatch();

  const onChangePhoto = (e) => {
    e.preventDefault();
    setState({...state, mediaId : e.target.files[0]})
  }
  

  const handleInput = (e) => {
    setState({ ...state, [e.target.name]: e.target.value })

  }

  const resetForm = () => {
    setState(initialState)
    // setPhoto({})
    setMessage("")
  }

  const handleSubmit = (event) => {
    console.log("handlesubmit")
    event.preventDefault();
    const fd = new FormData();
    if(state.mediaId.name){
      fd.set("mediaId", state.mediaId, state.mediaId.name);
    }
    fd.set("title", state.title);
    fd.set("subtitle", state.subtitle);
    fd.set("url", state.url);
    fd.set("buttonText", state.buttonText);
    fd.set("order", state.order);
    fd.set("isActive", state.isActive);
    fd.set("isDelete", state.isDelete);
    fd.set("mediaId", state.mediaId);
    fd.set("isVideo", state.isVideo);
    fd.set("alt", state.alt);
    dispatch(addNewSlider(fd))
        .then((res)=>{
          if(res===200){
            resetForm();
            props.history.push("/sliders");
          }
        })
 
  };


  return (
    <CRow>
      <CCol xs="12" md="12">
        <CCard>
          <CCardHeader>
            ADD SLIDER FORM
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
                  <CLabel htmlFor="subtitle">Subtitle: </CLabel>
                </CCol>
                <CCol xs="12" md="9">
                  <CTextarea
                    onChange={handleInput} value={state.subtitle}
                    name="subtitle"
                    id="subtitle"
                    rows="6"
                    placeholder="Subtitle Content..."
                    required
                  />
                </CCol>
              </CFormGroup>
              <CFormGroup row>
                <CCol md="2">
                  <CLabel htmlFor="buttontext">Button Text</CLabel>
                </CCol>
                <CCol xs="12" md="9">
                  <CInput onChange={handleInput} value={state.buttonText} id="buttontext" name="buttonText" placeholder="Button text" required />
                </CCol>
              </CFormGroup>
              <CFormGroup row>
                <CCol md="2">
                  <CLabel htmlFor="order">Order Number</CLabel>
                </CCol>
                <CCol xs="12" md="9">
                  <CInput onChange={handleInput} type="number" id="order" name="order" placeholder="0" required />
                </CCol>
              </CFormGroup>
              <CFormGroup row>
                <CCol md="2">
                  <CLabel htmlFor="isVideo">Media Type : </CLabel>
                </CCol>
                <CCol xs="12" md="9">
                  <CSelect onChange={handleInput} custom name="isVideo" id="isVideo" required>
                    <option value="0">Please select</option>
                    <option value={false}>Photo</option>
                    <option value={true}>Video</option>
                  </CSelect>
                </CCol>
              </CFormGroup>
              <CFormGroup row>
                <CCol md="2">
                  <CLabel>Status : </CLabel>
                </CCol>
                <CCol md="9" onChange={handleInput} required>
                  <CFormGroup variant="custom-radio" inline>
                    <CInputRadio custom id="visible" name="isActive" value={true} defaultChecked />
                    <CLabel variant="custom-checkbox" htmlFor="visible">Visible</CLabel>
                  </CFormGroup>
                  <CFormGroup variant="custom-radio" inline>
                    <CInputRadio custom id="non-visible" name="isActive" value={false} />
                    <CLabel variant="custom-checkbox" htmlFor="non-visible">Non-visible</CLabel>
                  </CFormGroup>
                </CCol>
              </CFormGroup>
              <CFormGroup row>
                <CCol md="2">
                  <CLabel htmlFor="url-input">URL</CLabel>
                </CCol>
                <CCol xs="12" md="9">
                  <CInput onChange={handleInput} value={state.url} id="url-input" name="url" placeholder="Url" />
                </CCol>
              </CFormGroup>
              <CFormGroup row>
                <CCol md="2">
                  <CLabel>Add Slider Photo</CLabel>
                </CCol>
                {/* <CCol xs="12" md="9">
                  <CInputFile onChange={getPhoto} custom id="custom-file-input" />
                  <CLabel htmlFor="custom-file-input" variant="custom-file">
                    {photo ? photo.name : "Choose file..."}
                  </CLabel>
                  <CButton onClick={uploadPhoto} type="button" size="sm" color="secondary"><CIcon name="cil-save" /> Upload Photo</CButton>
                  <span className="ml-2" >{message}</span>
                </CCol> */}
                <CCol xs="12" md="9">
                  <CInputFile 
                  onChange={onChangePhoto} 
                  // value={state.mediaId} 
                  custom id="custom-file-input" name="mediaId" />
                  <CLabel htmlFor="custom-file-input" variant="custom-file">
                    {state.mediaId ? state.mediaId.title : "Choose file..."}
                  </CLabel>
                  {/* <span className="ml-2" >{message}</span> */}
                </CCol>
              </CFormGroup>

              <CFormGroup row>
                <CCol md="2">
                  <CLabel htmlFor="url-input">Add Photo SubInfo:</CLabel>
                </CCol>
                <CCol xs="12" md="9">
                  <CInput onChange={handleInput} value={state.alt} id="sub-info" name="alt" placeholder="Sub Info" />
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
