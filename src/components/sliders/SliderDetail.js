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
  CTextarea,
  CSelect,
} from '@coreui/react'
import CIcon from '@coreui/icons-react';
import '@coreui/icons/css/all.css';
import { freeSet } from '@coreui/icons'

import { useDispatch, useSelector } from "react-redux";
import { addNewSlider, editSliderFunk, deleteSlider } from "../../actions/slider.action";


const initialState = {
  title: "",
  subtitle: "",
  url: "",
  buttonText: "",
  order: "",
  isActive: true,
  isDelete: false,
  mediaId: {},
  isVideo: "",
  alt:"",
};

const SliderDetail = (props) => {
  const [modal, setModal] = useState(true)
  const [danger, setWarning] = useState(false)

  const dispatch = useDispatch();
  const message = useSelector(state => state.message)
  const error = useSelector(state => state.error)

  
  const sliderData = useSelector(state => state.slider.slider)

  const slider = sliderData && props.match.params.id ? sliderData : initialState;
  const [state, setState] = useState(slider)
//console.log(state)
  const [uploadMessage, setUploadMessage] = useState("");

 
  const onChangePhoto = (e) => {
    console.log(e.target.files);
    setState({ ...state, alt: e.target.files[0].name, mediaId: e.target.files[0] });
    setUploadMessage("Media selected succesfully!")
  };

  const handleInput = (e) => {
    setState({ ...state, [e.target.name]: e.target.value })
  }
  const handleSwitch = (e) => {
    setState({ ...state, [e.target.name]: e.target.checked })
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    const fd = new FormData();
    if (state.mediaId.name) {
      fd.set("mediaId", state.mediaId, state.mediaId.title);
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


    props.match.params.id ?
      dispatch(editSliderFunk(fd, props.match.params.id))
        .then(res => {
          if (res === 200) {
            getDefaults()
          }
        })
      :
      dispatch(addNewSlider(fd))
        .then(res => {
          if (res === 200) {
            getDefaults()
          }
        })
  };

  const deleteSliderData = (event) => {
    event.preventDefault();
    dispatch(deleteSlider(state._id))
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
      props.history.push("/slider");
    }, 2000);
  }


  function resetForm () {
    props.match.params.id?
    setState(sliderData)
    :
    setState({
      title: "",
      subtitle: "",
      url: "",
      buttonText: "",
      order: "",
      isActive: true,
      isDelete: false,
      mediaId: {},
      isVideo: "",
      alt:"",
    })

  }


  //console.log("return den hemen önce")
  //console.log(initialState);

  console.log(state, message, error);
  //console.log(props.match.params.id )
  return (
    <CRow>
      <CCol xs="12" md="12">
        {
          state &&
          <CCard>
            <CCardHeader>
              {props.match.params.id ? "SLIDER DETAIL FORM" : "ADD NEW SLIDER"}
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
                    <CLabel>Status</CLabel>
                  </CCol>
                  <CCol md="9">
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
                  <CCol xs="12" md="9">
                    <CInputFile onChange={onChangePhoto} custom id="custom-file-input" required />
                    <CLabel htmlFor="custom-file-input" variant="custom-file">
                      {state.alt ? state.alt : "Choose file..."}
                    </CLabel>
                    <span className="ml-2">{uploadMessage}</span>
                  </CCol>
                </CFormGroup>
                <CFormGroup row>
                  <CCol md="2">
                    <CLabel>Selected Photo</CLabel>
                  </CCol>
                  <CCol xs="12" md="9">
                    <CImg
                      src={state.mediaId && (state.mediaId.name ? URL.createObjectURL(state.mediaId) : state.mediaId.url )}
                      className="c-expert-img"
                      alt="expert-img"
                      />
                  </CCol>
                </CFormGroup>
                <CFormGroup row>
                <CCol md="2">
                  <CLabel htmlFor="url-input">Add Media SubInfo:</CLabel>
                </CCol>
                <CCol xs="12" md="9">
                  <CInput onChange={handleInput} value={state.alt} id="sub-info" name="alt" placeholder="Sub Info" />
                </CCol>
              </CFormGroup>
                
              </CForm>
            </CCardBody>
            <CCardFooter>
              <CCol>
              <CButton onClick={resetForm} type="reset" color="warning"><CIcon  content={freeSet.cilReload} /> Reset Form </CButton>
                <CButton onClick={() => props.history.push(`/slider`)} type="button" color="secondary"><CIcon name="cil-ban" /> Cancel / Back</CButton>
              </CCol>
              <div className="card-header-actions">
               <CButton onClick={handleSubmit} type="submit" color="primary"><CIcon name="cil-check" /> {props.match.params.id ? "Update Slider" : "Add Slider"}</CButton>
                {props.match.params.id &&
                  <CButton onClick={() => setWarning(!danger)} type="button" color="danger" className="mr-1">Delete Slider <CIcon  content={freeSet.cilDelete}/></CButton>
                }
              </div>
              <CModal 
              show={danger} 
              onClose={() => setWarning(!danger)}
              color="danger"
            >
              <CModalHeader closeButton>
                <CModalTitle>Delete Slider</CModalTitle>
              </CModalHeader>
              <CModalBody>
                Are you sure deleting selected slider?
              </CModalBody>
              <CModalFooter>
                <CButton color="danger" onClick={deleteSliderData}>Delete Slider</CButton>{' '}
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
              <CModalTitle>Add Slider</CModalTitle>
            </CModalHeader>
            <CModalBody>
              <CAlert color={error ? "danger" : "success"}>
                {error ? error : message}
              </CAlert>
              {message ? "Redirecting sliders page!" : ""}
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

export default SliderDetail
