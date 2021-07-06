import React, { useState, useEffect } from 'react'
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
import { addNewExpert, editExpertData, deleteExpert } from "../../actions/expert.action";

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

const ExpertDetail = (props) => {
  const [modal, setModal] = useState(true)
  const dispatch = useDispatch();
  const message = useSelector(state => state.message)
  const error = useSelector(state => state.error)
  const expertsData = useSelector(state => state.experts.expertList)
  
  const expert = expertsData && props.match.params.id ? expertsData.find(expert => expert._id.toString() === props.match.params.id) : initialState;
  const [state, setState] = useState(expert)

  const [uploadMessage, setUploadMessage] = useState("");
  const [social, setSocial] = useState({ title: "", link: "" })



  const onChangePhoto = (e) => {
    console.log(e.target.files);
    setState({...state, alt : e.target.files[0].name, mediaId : e.target.files[0]});
    setUploadMessage("Media selected succesfully!")
  };
  
  const handleInput = (e) => {
    setState({ ...state, [e.target.name]: e.target.value })
  }
  const handleSwitch = (e) => {
    setState({...state, [e.target.name] : e.target.checked})
  }
  const resetForm = () => {
    setState(expert)
  }

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
    fd.append("socialMediaId", JSON.stringify(state.socialMediaId))
 

    props.match.params.id ? 
    dispatch(editExpertData(fd, props.match.params.id ))
    .then(res=>{
      if (res === 200) {
        getDefaults()
      } 
      })
    :
    dispatch(addNewExpert(fd))
    .then(res=>{
      if (res === 200) {
        getDefaults()
      } 
      })
  };

  const deleteExpertData = (event) => {
    event.preventDefault();
    dispatch(deleteExpert(state._id))
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
      props.history.push("/experts");
    }, 2000);
  }

  console.log(state, social, message, error);
  return (
    <CRow>
      <CCol xs="12" md="12">
        <CCard>
          <CCardHeader>
            {props.match.params.id ? "EXPERT DETAIL FORM" : "ADD NEW EXPERT"}
          </CCardHeader>
          <CCardBody>
            {
              state &&
            <CForm onSubmit={handleSubmit} encType="multipart/form-data" className="form-horizontal">
              <CFormGroup row>
                <CCol md="2">
                  <CLabel htmlFor="expertfirstname">First Name</CLabel>
                </CCol>
                <CCol xs="12" md="9">
                  <CInput onChange={handleInput} defaultValue={state.firstname} id="expertfirstname" name="firstname" placeholder="Expert First Name" required />
                </CCol>
              </CFormGroup>
              <CFormGroup row>
                <CCol md="2">
                  <CLabel htmlFor="subtitle">Last Name </CLabel>
                </CCol>
                <CCol xs="12" md="9">
                  <CInput onChange={handleInput} defaultValue={state.lastname} id="expertlastname" name="lastname" placeholder="Expert Last Name" required />
                </CCol>
              </CFormGroup>
              <CFormGroup row>
                <CCol md="2">
                  <CLabel htmlFor="expertise">Expertise </CLabel>
                </CCol>
                <CCol xs="12" md="9">
                  <CInput onChange={handleInput} defaultValue={state.expertise} id="expertise" name="expertise" placeholder="Expertise" required />
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
                  <CLabel>Add New Photo</CLabel>
                </CCol>
                <CCol xs="12" md="9">
                  <CInputFile onChange={onChangePhoto} custom id="custom-file-input" required/>
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
                        src={state.mediaId.name ? URL.createObjectURL(state.mediaId) :state.mediaId.url}
                        className="c-expert-img"
                        alt="expert-img"
                        />
                </CCol>
              </CFormGroup>
              <CFormGroup row >
                <CCol md="2">
                  <CLabel >Select Social Media</CLabel>
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
                <CCol>
                  <CButton type="submit" size="sm" color="primary"><CIcon name="cil-scrubber" /> Submit</CButton>
                  <CButton onClick={resetForm} type="reset" size="sm" color="danger"><CIcon name="cil-ban" /> Reset</CButton>
                </CCol>
                {props.match.params.id &&
                <CCol >
                      <CButton onClick={deleteExpertData} type="button" block color="danger">Delete Expert</CButton>
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
                <CModalTitle>Add Expert</CModalTitle>
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

export default ExpertDetail
