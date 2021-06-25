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
  CRow
} from '@coreui/react'
import CIcon from '@coreui/icons-react';
import { cifAU } from '@coreui/icons';
import '@coreui/icons/css/all.css';

import { useDispatch, useSelector } from "react-redux";
import { addNewExpert, getExperts } from "../../actions/expertAction";

const socialMedia = ["twitter", "linkedin", "flickr", "tumblr", "xing", "github", "stackoverflow", "youtube", "dribbble", "instagram", "pinterest", "vk", "yahoo", "behance", "reddit", "vimeo"]

const initialState = {
  firstname: "",
  lastname: "",
  expertise: "",
  isActive: true,
  isDeleted: false,
  mediaId: "",
  socialMediaId: [],
};

const ExpertAdd = (props) => {
  const [state, setState] = useState(initialState)
  const [photo, setPhoto] = useState({});
  const [uploadMessage, setUploadMessage] = useState("");
  const [social, setSocial] = useState({ title: "", link: "" })
  const dispatch = useDispatch();
  const message = useSelector(state => state.message)

  const getPhoto = (e) => {
    console.log(e.target.files[0]);
    setPhoto(e.target.files[0]);
  };

  const uploadPhoto = () => {
    const fd = new FormData();

    fd.append("image", photo, photo.name);
    axios.post(
      "https://api.imgbb.com/1/upload?expiration=600&key=a4a61c5615a8ba139a774ff21a6d5373",
      fd
    ).then((res) => {
      console.log(res.data.data.display_url);
      setState({ ...state, mediaId: res.data.data.display_url });
      setUploadMessage("Media uploaded succesfully!")
    }).catch(err => setUploadMessage("Some error occured, try again!"))
  };

  const handleInput = (e) => {
    setState({ ...state, [e.target.name]: e.target.value })
  }

  const resetForm = () => {
    setState(initialState)
    setPhoto({})
    setUploadMessage("")
    setSocial({ title: "", link: "" })

  }
  console.log(props)

  const handleSubmit = (event) => {
    console.log("handlesubmit")
    event.preventDefault();
    dispatch(addNewExpert(state));
    resetForm();
    dispatch(getExperts())
    setTimeout(() => {
      props.history.push("/experts");
    }, 3000);
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
                    <CInputRadio custom id="expertvisible" name="isActive" value="visible" defaultChecked />
                    <CLabel variant="custom-checkbox" htmlFor="expertvisible">Active</CLabel>
                  </CFormGroup>
                  <CFormGroup variant="custom-radio" inline>
                    <CInputRadio custom id="expert-non-visible" name="isActive" value="non-visible" />
                    <CLabel variant="custom-checkbox" htmlFor="expert-non-visible">Non-Active</CLabel>
                  </CFormGroup>
                </CCol>
              </CFormGroup>
              <CFormGroup row>
                <CCol md="2">
                  <CLabel>Add Photo</CLabel>
                </CCol>
                <CCol xs="12" md="9">
                  <CInputFile onChange={getPhoto} custom id="custom-file-input" />
                  <CLabel htmlFor="custom-file-input" variant="custom-file">
                    {photo ? photo.name : "Choose file..."}
                  </CLabel>
                  <CButton onClick={uploadPhoto} type="button" size="sm" color="secondary"><CIcon name="cil-save" /> Upload Photo</CButton>
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
                {message &&
                  <CCol md="4">
                  <CModal className="show d-block position-static" alignment="center" >
                    <CModalBody>
                      {message}
                    </CModalBody>
                  </CModal>
                  </CCol>
                }
                </CRow>

              </CCardFooter>
            </CForm>
          </CCardBody>
        </CCard>
      </CCol>
    </CRow>
  )
}

export default ExpertAdd
