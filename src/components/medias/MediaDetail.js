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
  CImg,
  CInputFile
} from '@coreui/react'
import CIcon from '@coreui/icons-react';
import '@coreui/icons/css/all.css';
import { freeSet } from '@coreui/icons'

import { useDispatch, useSelector } from "react-redux";
import { addNewMedia, editMediaData, deleteMedia } from "../../actions/media.action";


const initialState = {
  title: "gallery",
  alt: "",
  mediaId: {},
  isActive: true,
  isHomePage: false,
  isDeleted: false,
};

const MediaDetail = (props) => {
  const [modal, setModal] = useState(true)
  const [danger, setWarning] = useState(false)
  const [info, setInfo] = useState(false)

  const dispatch = useDispatch();
  const message = useSelector(state => state.message)
  const error = useSelector(state => state.error)
  //const mediasData = useSelector(state => state.medias.mediasList)
  const mediaData = useSelector(state => state.medias.media)
  const [uploadMessage, setUploadMessage] = useState("");

  const media = mediaData && props.match.params.id ? mediaData : initialState;
  const [state, setState] = useState(media)

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

  const resetForm = () => {
    setState(media)
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    const fd = new FormData();
    if (state.mediaId) {
      fd.set("mediaId", state.mediaId, state.mediaId.name);
    }

    fd.set("title", state.title);
    fd.set("alt", state.alt);
    fd.set("isActive", state.isActive);
    fd.set("isHomePage", state.isHomePage);
    fd.set("isDeleted", state.isDeleted);

    props.match.params.id ?
      dispatch(editMediaData(fd, props.match.params.id))
        .then(res => {
          if (res === 200) {
            getDefaults()
          }
        })
      :
      dispatch(addNewMedia(fd))
        .then(res => {
          if (res === 200) {
            getDefaults()
          }
        })
  };

  const deleteMediaData = (event) => {
    event.preventDefault();
    dispatch(deleteMedia(state._id))
      .then(res => {
        if (res === 200) {
          getDefaults()
        }
      })
      
        setWarning(!danger)
      
  };
  const getDefaults = () => {
    resetForm();
    setWarning(!danger)
    setTimeout(() => {
      setModal(false)
      props.history.push("/medias");
    }, 2000);
  }
  //console.log(mediaData)
  console.log(state, message, error);
  return (
    <CRow>
      <CCol xs="12" md="12">
        {
          state &&
          <CCard>
            <CCardHeader>
              {props.match.params.id ? "MEDIA DETAIL FORM" : "ADD NEW MEDIA"}
            </CCardHeader>
            <CCardBody>
              <CForm onSubmit={handleSubmit} encType="multipart/form-data" className="form-horizontal">
                <CFormGroup row>
                  <CCol md="2">
                    <CLabel htmlFor="mediatitle">Media Title</CLabel>
                  </CCol>
                  <CCol xs="12" md="9">
                    <CInput value={state.title} id="mediatitle" name="title" placeholder="Media Title" disabled/>
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
                <CFormGroup row>
                  <CCol md="2">
                    <CLabel>is HomePage?</CLabel>
                  </CCol>
                  <CCol sm="9">
                    <CSwitch
                      onChange={handleSwitch}
                      name="isHomePage"
                      className="mr-1"
                      color="success"
                      variant="opposite"
                      checked={state.isHomePage}
                    />
                  </CCol>
                </CFormGroup>
                <CFormGroup row>
                  <CCol md="2">
                    <CLabel>Add New Photo</CLabel>
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
                      src={state.mediaId && state.mediaId.name ? URL.createObjectURL(state.mediaId) : state.url }
                      className="c-media-img"
                      alt={state.alt ? state.alt : ""}
                      onClick={() => setInfo(!info)} 
                      />
                  </CCol>
                  <CModal
                show={info}
                onClose={() => setInfo(!info)}
                color="info"
                className="modal-xl"
              > 
                <CModalHeader closeButton>
                </CModalHeader>
                <CModalBody>
                <CImg
                      src={state.mediaId && state.mediaId.name ? URL.createObjectURL(state.mediaId) : state.url }
                      className="c-media-img-lg"
                      alt={state.alt ? state.alt : ""}
                      />
                </CModalBody>
              </CModal>
                </CFormGroup>
                <CFormGroup row>
                  <CCol md="2">
                    <CLabel htmlFor="mediaalt">Media Alt</CLabel>
                  </CCol>
                  <CCol xs="12" md="9">
                    <CInput value={state.alt} id="mediaalt" name="alt" placeholder="Media Alt" onChange={handleInput}/>
                  </CCol>
                </CFormGroup>
              </CForm>
            </CCardBody>
            <CCardFooter>
              <CCol>
                <CButton onClick={resetForm} type="reset" color="warning"><CIcon content={freeSet.cilReload} /> Reset Form </CButton>
                <CButton onClick={() => props.history.push(`/medias`)} type="button" color="secondary"><CIcon name="cil-ban" /> Cancel / Back</CButton>
              </CCol>
              <div className="card-header-actions">
                <CButton onClick={handleSubmit} type="submit" color="primary"><CIcon name="cil-check" /> {props.match.params.id ? "Update Media" : "Add Media"}</CButton>
                {props.match.params.id &&
                  <CButton onClick={() => setWarning(!danger)} type="button" color="danger" className="mr-1">Delete Media <CIcon content={freeSet.cilDelete} /></CButton>
                }
              </div>
              <CModal
                show={danger}
                onClose={() => setWarning(!danger)}
                color="danger"
              >
                <CModalHeader closeButton>
                  <CModalTitle>Delete Media</CModalTitle>
                </CModalHeader>
                <CModalBody>
                  Are you sure deleting selected media?
                </CModalBody>
                <CModalFooter>
                  <CButton color="danger" onClick={deleteMediaData}>Delete Media</CButton>{' '}
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
              <CModalTitle>Add Media</CModalTitle>
            </CModalHeader>
            <CModalBody>
              <CAlert color={error ? "danger" : "success"}>
                {error ? error : message}
              </CAlert>
              {message ? "Redirecting medias page!" : ""}
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

export default MediaDetail
