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
import { addNewProfile, editProfileData, deleteProfile } from "../../actions/companyProfile.action";

const socialMedia = ["twitter", "linkedin", "flickr", "tumblr", "xing", "github", "stackoverflow", "youtube", "dribbble", "instagram", "pinterest", "vk", "yahoo", "behance", "reddit", "vimeo"]


const initialState = {
  name: "",
  phones: [],
  address: "",
  email:"",
  isActive: true,
  isDeleted: false,
  logo: {},
  alt: "", //logo sub
  socialMediaId: [],
};

const CProfileDetail = (props) => {
  const [modal, setModal] = useState(true)
  const [danger, setWarning] = useState(false)

  const dispatch = useDispatch();
  const message = useSelector(state => state.message)
  const error = useSelector(state => state.error)

  
  const profileData = useSelector(state => state.companyProfile.profile)
  //console.log("burası en üst, expertdata ile state arasında")
  const profile = profileData && props.match.params.id ? profileData : initialState;
  const [state, setState] = useState(profile)
//console.log(state)
  const [uploadMessage, setUploadMessage] = useState("");
  const [social, setSocial] = useState({ title: "", link: "" })
  const [phone, setPhone] = useState("")


  const onChangePhoto = (e) =>{
    console.log(e.target.files);
    setState({ ...state, alt: e.target.files[0].name, logo: e.target.files[0] });
    setUploadMessage("Logo selected succesfully!")
  };

  const handleInput = (e) => {
    setState({ ...state, [e.target.name]: e.target.value })
  }
  const handleSwitch = (e) => {
    setState({ ...state, [e.target.name]: e.target.checked })
  }
  const handlePhone = (e) => {
    setPhone(e.target.value)
    
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
    state.socialMediaId.push(social)
    setState({ ...state, socialMediaId: state.socialMediaId })
    setSocial({ title: "", link: "" })
  }

  const deleteSocial = (title) => {
    let temp_socialMedia = state.socialMediaId.filter((item) => item.title !== title)
    setState({ ...state, socialMediaId: temp_socialMedia })
  }
 

  const addPhone = () => {
    if (!phone) {
      alert("please add phone number");
      return
    }
    
    state.phones.push(phone)
    setState({ ...state, phones: state.phones })
    setPhone("")
  }
   const deletePhones = (title) => {
    let temp_phones = state.phones.filter((item) => item !== title)
    setState({ ...state, phones: temp_phones })
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    const fd = new FormData();
    if (state.logo.name) {
      fd.set("logo", state.logo, state.logo.title);
    }
    fd.set("name", state.name);
    fd.set("phones", JSON.stringify(state.phones));
    fd.set("address", state.address);
    fd.set("email", state.email);
    fd.set("isActive", state.isActive);
    fd.set("isDeleted", state.isDeleted);
    fd.set("alt", state.alt);
    fd.append("socialMediaId", JSON.stringify(state.socialMediaId))


    props.match.params.id ?
      dispatch(editProfileData(fd, props.match.params.id))
        .then(res => {
          if (res === 200) {
            getDefaults()
          }
        })
      :
      dispatch(addNewProfile(fd))
        .then(res => {
          if (res === 200) {
            getDefaults()
          }
        })
  };

  const deleteProfileData = (event) => {
    event.preventDefault();
    dispatch(deleteProfile(state._id))
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
      props.history.push("/companyprofile");
    }, 2000);
  }

  function resetForm () {
    props.match.params.id?
    setState(profileData)
    :
    setState({
      name: "",
      phones: [],
      address: "",
      email:"",
      isActive: true,
      isDeleted: false,
      logo: {},
      alt: "", //logo
      socialMediaId: [],
    })

  }

  //console.log("return den hemen önce")
  //console.log(initialState);
  //console.log(expertData);
  console.log(state);
  //console.log(props.match.params.id )
  return (
    <CRow>
      <CCol xs="12" md="12">
        {
          state &&
          <CCard>
            <CCardHeader>
              {props.match.params.id ? "COMPANY PROFILE DETAIL FORM" : "ADD NEW COMPANY PROFILE"}
            </CCardHeader>
            <CCardBody>
              <CForm onSubmit={handleSubmit} encType="multipart/form-data" className="form-horizontal">
                <CFormGroup row>
                  <CCol md="2">
                    <CLabel htmlFor="profilename">Name</CLabel>
                  </CCol>
                  <CCol xs="12" md="9">
                    <CInput onChange={handleInput} value={state.name} id="profilename" name="name" placeholder="Name" required />
                  </CCol>
                </CFormGroup>
                
                <CFormGroup row>
                  <CCol md="2">
                    <CLabel htmlFor="address">Address </CLabel>
                  </CCol>
                  <CCol xs="12" md="9">
                    <CInput onChange={handleInput} value={state.address} id="address" name="address" placeholder="Address" required />
                  </CCol>
                </CFormGroup>
                <CFormGroup row>
                  <CCol md="2">
                    <CLabel htmlFor="email">Email </CLabel>
                  </CCol>
                  <CCol xs="12" md="9">
                    <CInput onChange={handleInput} value={state.email} id="email" name="email" placeholder="Email" required />
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
                    <CLabel>Add New Logo</CLabel>
                  </CCol>
                  <CCol xs="12" md="9">
                    <CInputFile onChange={onChangePhoto} custom id="custom-file-input" required />
                    <CLabel htmlFor="custom-file-input" variant="custom-file">
                      {state.alt ? state.alt : "Choose logo file..."}
                    </CLabel>
                    <span className="ml-2">{uploadMessage}</span>
                  </CCol>
                </CFormGroup>
                <CFormGroup row>
                  <CCol md="2">
                    <CLabel>Selected Logo:</CLabel>
                  </CCol>
                  <CCol xs="12" md="9">
                    <CImg
                      src={state.logo && (state.logo.name ? URL.createObjectURL(state.logo) : state.logo.url )}
                      className="c-profile-img"
                      alt="profile-img"
                      />
                  </CCol>
                </CFormGroup>
              
                <CFormGroup row >
                  <CCol md="2">
                    <CLabel >Add Phone Number:</CLabel>
                  </CCol>
                  <CCol xs="12" md="9">
                   
                    <CInputGroup>
                      <CInput
                       onChange={handlePhone} 
                       type="text" id="Phone-number" name="Phone-number" 
                       placeholder="Add Phone Number" 
                       value={phone} 
                       />
                      <CInputGroupAppend>
                        <CButton onClick={addPhone} type="button" color="primary">Add Phone Number</CButton>
                      </CInputGroupAppend>
                    </CInputGroup>
                  </CCol>
                </CFormGroup>
                <CFormGroup row>
                  <CCol md="2">
                    <CLabel htmlFor="phonenumber-input">Phone Numbers</CLabel>
                  </CCol>
                  <CCol xs="12" md="6">
                    {state.phones && (state.phones.map((item, index) => {
                      return (
                        <CInputGroup key={index} size="sm">
                          <CInputGroupPrepend>
                            <CInputGroupText><CIcon name={`cib-${item}`} /></CInputGroupText>
                          </CInputGroupPrepend>
                          <CInput disabled className="mb-0" type="text" id={`socialmedia-input${index}`} name="socialmedia-input" value={item} />
                          <CInputGroupAppend>
                            <CButton onClick={() => deletePhones(item)} type="button" color="primary">X</CButton>
                          </CInputGroupAppend>
                        </CInputGroup>
                      )
                    })
                    )}
                  </CCol>
                </CFormGroup>
                <CFormGroup row >
                  <CCol md="2">
                    <CLabel >Select Social</CLabel>
                  </CCol>
                  <CCol xs="12" md="9">
                    <p>
                      {socialMedia.map((item, index) => {
                        return <CButton onClick={selectSocial} key={index} name={item} size="sm" title={item} className={`btn-${item === "stackoverflow" ? "stack-overflow" : item} btn-facebook btn-brand mr-1 mb-1`}><CIcon size="sm" name={`cib-${item}`} /></CButton>

                      })}
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
                    {state.socialMediaId && (state.socialMediaId.map((item, index) => {
                      return (
                        <CInputGroup key={index} size="sm">
                          <CInputGroupPrepend>
                            <CInputGroupText><CIcon name={`cib-${item.title}`} /></CInputGroupText>
                          </CInputGroupPrepend>
                          <CInput disabled className="mb-0" type="text" id={`socialmedia-input${index}`} name="socialmedia-input" value={item.link} />
                          <CInputGroupAppend>
                            <CButton onClick={() => deleteSocial(item)} type="button" color="primary">X</CButton>
                          </CInputGroupAppend>
                        </CInputGroup>
                      )
                    })
                    )}
                  </CCol>
                </CFormGroup>
              </CForm>
            </CCardBody>
            <CCardFooter>
              <CCol>
              <CButton onClick={resetForm} type="reset" color="warning"><CIcon  content={freeSet.cilReload} /> Reset Form </CButton>
                <CButton onClick={() => props.history.push(`/companyprofile`)} type="button" color="secondary"><CIcon name="cil-ban" /> Cancel / Back</CButton>
              </CCol>
              <div className="card-header-actions">
               <CButton onClick={handleSubmit} type="submit" color="primary"><CIcon name="cil-check" /> {props.match.params.id ? "Update Profile" : "Add Profile"}</CButton>
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
                <CModalTitle>Delete Profile</CModalTitle>
              </CModalHeader>
              <CModalBody>
                Are you sure deleting selected profile?
              </CModalBody>
              <CModalFooter>
                <CButton color="danger" onClick={deleteProfileData}>Delete Profile</CButton>{' '}
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
              <CModalTitle>Add Company Profile</CModalTitle>
            </CModalHeader>
            <CModalBody>
              <CAlert color={error ? "danger" : "success"}>
                {error ? error : message}
              </CAlert>
              {message ? "Redirecting Company Profile Page!" : ""}
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

export default CProfileDetail
