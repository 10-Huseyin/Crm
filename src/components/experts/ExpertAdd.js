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
  CSelect,
  CRow
} from '@coreui/react'
import CIcon from '@coreui/icons-react'

import { useDispatch } from "react-redux";
import { addNewExpert } from "../../actions/expertAction";

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
  const [message, setMessage] = useState("");
  const [social, setSocial] = useState({ social_title: "", social_url: "" })
  const dispatch = useDispatch();

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
      setMessage("Media uploaded succesfully!")
    }).catch(err => setMessage("Some error occured, try again!"))
  };

  const handleInput = (e) => {
    setState({ ...state, [e.target.name]: e.target.value })
  }

  const resetForm = () => {
    setState(initialState)
    setPhoto({})
    setMessage("")
  }

  const handleSubmit = (event) => {
    console.log("handlesubmit")
    event.preventDefault();
    dispatch(addNewExpert(state));
    resetForm();
    props.history.push("/experts");
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

    setSocial({ ...social, social_title: e.currentTarget.name })

  }

  const addSocial = () => {
    let temp_socialMedia = state.socialMediaId;
    temp_socialMedia.push(social)
    setState({ ...state, socialMediaId: temp_socialMedia })

  }



  console.log(state);
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
                <CLabel col md={2}>Add Photo</CLabel>
                <CCol xs="12" md="9">
                  <CInputFile onChange={getPhoto} custom id="custom-file-input" />
                  <CLabel htmlFor="custom-file-input" variant="custom-file">
                    {photo ? photo.name : "Choose file..."}
                  </CLabel>
                  <CButton onClick={uploadPhoto} type="button" size="sm" color="secondary"><CIcon name="cil-save" /> Upload Photo</CButton>
                </CCol> {message}
              </CFormGroup>
              <CFormGroup row >
                <CCol md="2">
                  <CLabel htmlFor="expertfirstname">Select Social Media Select</CLabel>
                </CCol>
                <CCol>

                  <CCol xs="12" md="9">
                    <p>
                      {socialMedia.map((item, index) => {
                        return <CButton onClick={selectSocial} key={index} name={item} size="sm" title={item} className={`btn-${item === "stackoverflow" ? "stack-overflow" : item} btn-facebook btn-brand mr-1 mb-1`}><CIcon size="sm" name={`cib-${item}`} /></CButton>

                      })
                      }
                    </p>
                  </CCol>
                  <CCol >
                    <CInputGroup>
                      <CInputGroupPrepend>
                        <CInputGroupText>
                          <CIcon name={social.social_title ? `cib-${social.social_title}` : "cil-circle"} />
                        </CInputGroupText>
                      </CInputGroupPrepend>
                      <CInput onChange={(e) => setSocial({ ...social, social_url: e.target.value })} type="text" id="social-media" name="social-media" placeholder="Social Media" />
                      <CInputGroupAppend>
                        <CButton onClick={addSocial} type="button" color="primary">Add Social Media</CButton>
                      </CInputGroupAppend>
                    </CInputGroup>
                  </CCol>
                </CCol>
              </CFormGroup>
              <CFormGroup row>
                <CCol md="2">
                  <CLabel htmlFor="socialmedia-input">Social Medias</CLabel>
                </CCol>
                <CCol xs="12" md="9">
                  {state.socialMediaId.map((item, index) => {
                    return <h6 key={index}>{item.social_url}</h6>
                  })}
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

export default ExpertAdd
