import React, { useState } from 'react'
import axios from "axios";
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
  CInputRadio,
  CLabel,
  CModal,
  CModalHeader,
  CModalTitle,
  CModalBody,
  CModalFooter,
  CAlert,
  CRow
} from '@coreui/react'
import CIcon from '@coreui/icons-react';
import '@coreui/icons/css/all.css';

import { useDispatch, useSelector } from "react-redux";
import { addNewExpert, getExperts } from "../../actions/expert.action";

const socialMedia = ["twitter", "linkedin", "flickr", "tumblr", "xing", "github", "stackoverflow", "youtube", "dribbble", "instagram", "pinterest", "vk", "yahoo", "behance", "reddit", "vimeo"]

const initialState = {
  firstname: "",
  lastname: "",
  expertise: "",
  isActive: true,
  isDeleted: false,
  mediaId: {},
  alt:"",
  socialMediaId: [],
};

const ExpertAdd = (props) => {
  const [modal, setModal] = useState(true)
  const [state, setState] = useState(initialState)
  const [uploadMessage, setUploadMessage] = useState("");
  const [social, setSocial] = useState({ title: "", link: "" })
  const dispatch = useDispatch();
  const message = useSelector(state => state.message)

  const onChangePhoto = (e) => {
    console.log(e.target.files);
    setState({...state, alt : e.target.files[0].name, mediaId : e.target.files[0]});
    setUploadMessage("Media selected succesfully!")
  };
  
  const handleInput = (e) => {
    setState({ ...state, [e.target.name]: e.target.value })
  }

  const resetForm = () => {
    setUploadMessage("")
    setSocial({ title: "", link: "" })
    setState({
      firstname: "",
      lastname: "",
      expertise: "",
      isActive: true,
      isDeleted: false,
      mediaId: {},
      alt:"",
      socialMediaId: [],
    })
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    const fd = new FormData();
    if(state.mediaId.name){
      fd.set("mediaId", state.mediaId, state.mediaId.name);
    }
    fd.set("firstname", state.firstname);
    fd.set("lastname", state.lastname);
    fd.set("expertise", state.expertise);
    fd.set("isActive", state.isActive);
    fd.set("isDeleted", state.isDeleted);
    fd.set("alt", state.alt);
    fd.set("socialMediaId", state.socialMediaId);
    console.log(fd.getAll('mediaId'))

    dispatch(addNewExpert(fd))
    .then(res=>{
      console.log(res)
      // res.data.status === 200 ?
      // setTimeout(() => {
      //   resetForm()
      //   setModal(false)
      //   props.history.push("/experts");
      // }, 2000)
      // :
      // setTimeout(() => {
      //   setModal(false)
      // }, 2000);
    });
    
  };

  const selectSocial = (e) => {
    //console.log(e.currentTarget)
    const socialButtons = e.currentTarget.parentNode.childNodes
    socialButtons.forEach(element => {
      element.classList.remove('btn-md')
      element.classList.add('btn-sm')
    });
    e.currentTarget.classList.remove("btn-sm")
    e.currentTarget.classList.add("btn-md")

    setSocial({ ...social, title: e.currentTarget.name, link: `https://${e.currentTarget.name}.com/` })
    document.getElementById("social-media").focus();
  }

  const addSocial = () => {
    if (!social.title) {
      alert("please add social media icon");
      return
    }
    if (!social.link) {
      alert("please add social media url");
      return
    }
    let temp_socialMedia = state.socialMediaId;
    temp_socialMedia.push(social)
    setState({ ...state, socialMediaId: temp_socialMedia })
    setSocial({ title: "", link: "" })
  }

  const deleteSocial = (title) => {
    let temp_socialMedia = state.socialMediaId.filter((item) => item.title !== title)
    setState({ ...state, socialMediaId: temp_socialMedia })
  }

  console.log(state, social, message);
  return (
    <CRow>
      <CCol xs="12" md="12">
        <CCard>
          <CCardHeader>
            ADD EXPERT FORM
          </CCardHeader>
          <CCardBody>
            <CForm onSubmit={handleSubmit} encType="multipart/form-data" className="form-horizontal">
              <CFormGroup row>
                <CCol md="2">
                  <CLabel htmlFor="expertfirstname">First Name</CLabel>
                </CCol>
                <CCol xs="12" md="9">
                  <CInput onChange={handleInput} value={state.firstname} id="expertfirstname" name="firstname" placeholder="Expert First Name" required />
                </CCol>
              </CFormGroup>
              <CFormGroup row>
                <CCol md="2">
                  <CLabel htmlFor="subtitle">Last Name </CLabel>
                </CCol>
                <CCol xs="12" md="9">
                  <CInput onChange={handleInput} value={state.lastname} id="expertlastname" name="lastname" placeholder="Expert Last Name" required />
                </CCol>
              </CFormGroup>
              <CFormGroup row>
                <CCol md="2">
                  <CLabel htmlFor="expertise">Expertise </CLabel>
                </CCol>
                <CCol xs="12" md="9">
                  <CInput onChange={handleInput} value={state.expertise} id="expertise" name="expertise" placeholder="Expertise" required />
                </CCol>
              </CFormGroup>
              <CFormGroup row>
                <CCol md="2">
                  <CLabel>Status  </CLabel>
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
              <CFormGroup row>
                <CCol md="2">
                  <CLabel>Add Photo</CLabel>
                </CCol>
                <CCol xs="12" md="9">
                  <CInputFile onChange={onChangePhoto} custom id="custom-file-input" />
                  <CLabel htmlFor="custom-file-input" variant="custom-file">
                    {state.alt ? state.alt : "Choose file..."}
                  </CLabel>
                  <span className="ml-2">{uploadMessage}</span>
                </CCol>
              </CFormGroup>
              <CFormGroup row >
                <CCol md="2">
                  <CLabel htmlFor="expertfirstname">Select Social Media Select</CLabel>
                </CCol>
                <CCol xs="12" md="9">
                  <p>
                    {socialMedia.map((item, index) => {
                      return <CButton onClick={selectSocial} key={index} name={item} size="sm" title={item} className={`btn-${item === "stackoverflow" ? "stack-overflow" : item} btn-facebook btn-brand mr-1 mb-1`}><CIcon size="sm" name={`cib-${item}`} /></CButton>

                    })
                    }
                  </p>
                  <CInputGroup>
                    <CInputGroupPrepend>
                      <CInputGroupText>
                        <CIcon name={social.title ? `cib-${social.title}` : "cil-circle"} />
                      </CInputGroupText>
                    </CInputGroupPrepend>
                    <CInput onChange={(e) => setSocial({ ...social, link: e.target.value })} type="text" id="social-media" name="social-media" placeholder="Add Social Media" value={social.link} />
                    <CInputGroupAppend>
                      <CButton onClick={addSocial} type="button" color="primary">Add Social Media</CButton>
                    </CInputGroupAppend>
                  </CInputGroup>
                </CCol>
              </CFormGroup>
              <CFormGroup row>
                <CCol md="2">
                  <CLabel htmlFor="socialmedia-input">Social Medias</CLabel>
                </CCol>
                <CCol xs="12" md="6">
                  {state.socialMediaId.map((item, index) => {
                    return (
                      <CInputGroup key={index} size="sm">
                        <CInputGroupPrepend>
                          <CInputGroupText><CIcon name={`cib-${item.title}`} /></CInputGroupText>
                        </CInputGroupPrepend>
                        <CInput disabled className="mb-0" type="text" id={`socialmedia-input${index}`} name="socialmedia-input" value={item.link} />
                        <CInputGroupAppend>
                          <CButton onClick={() => deleteSocial(item.title)} type="button" color="primary">X</CButton>
                        </CInputGroupAppend>
                      </CInputGroup>
                    )
                  })}
                </CCol>
              </CFormGroup>
                  <CCardFooter>
                <CRow>
                <CCol md="4">
                  <CButton type="submit" size="sm" color="primary"><CIcon name="cil-scrubber" /> Submit</CButton>
                  <CButton onClick={resetForm} type="reset" size="sm" color="danger"><CIcon name="cil-ban" /> Reset</CButton>
                </CCol>
                </CRow>
              </CCardFooter>
            </CForm>

          {
            message &&
            <CModal 
            show={modal} 
            alignment="center"
            onClose={setModal}
            >
              <CModalHeader closeButton>
                <CModalTitle>Add Expert</CModalTitle>
              </CModalHeader>
              <CModalBody>
              <CAlert color="success">
                {message}
              </CAlert>
                Redirecting experts page!
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

export default ExpertAdd
