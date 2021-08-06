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
import { addNewExpert, editExpertData, deleteExpert } from "../../actions/expert.action";

const socialMedia = ["twitter", "linkedin", "flickr", "tumblr", "xing", "github", "stackoverflow", "youtube", "dribbble", "instagram", "pinterest", "vk", "yahoo", "behance", "reddit", "vimeo"]

const initialState = {
  firstname: "",
  lastname: "",
  expertise: "",
  isActive: true,
  isDeleted: false,
  mediaId: {},
  alt: "",
  socialMediaId: [],
};

const BlogDetail = (props) => {
  const [modal, setModal] = useState(true)
  const [danger, setWarning] = useState(false)

  const dispatch = useDispatch();
  const message = useSelector(state => state.message)
  const error = useSelector(state => state.error)
  //const expertsData = useSelector(state => state.experts.expertList)
  
  const expertData = useSelector(state => state.experts.expert)
  //console.log("burası en üst, expertdata ile state arasında")
  const expert = expertData && props.match.params.id ? expertData : initialState;
  const [state, setState] = useState(expert)
//console.log(state)
  const [uploadMessage, setUploadMessage] = useState("");
  const [social, setSocial] = useState({ title: "", link: "" })

  // useEffect(() => {
  //   console.log("useeffect içinde, en başta")
  //   dispatch(getOneExpert(props.match.params.id))
  //   .then(res => {
  //     if (res === 200) {
  //       console.log("useffect if içinde")
  //       expert !== state && setState(expert)
  //     }
  //   })
     
  // },[])

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

  const handleSubmit = (event) => {
    event.preventDefault();
    const fd = new FormData();
    if (state.mediaId.name) {
      fd.set("mediaId", state.mediaId, state.mediaId.title);
    }
    fd.set("firstname", state.firstname);
    fd.set("lastname", state.lastname);
    fd.set("expertise", state.expertise);
    fd.set("isActive", state.isActive);
    fd.set("isDeleted", state.isDeleted);
    fd.set("alt", state.alt);
    fd.append("socialMediaId", JSON.stringify(state.socialMediaId))


    props.match.params.id ?
      dispatch(editExpertData(fd, props.match.params.id))
        .then(res => {
          if (res === 200) {
            getDefaults()
          }
        })
      :
      dispatch(addNewExpert(fd))
        .then(res => {
          if (res === 200) {
            getDefaults()
          }
        })
  };

  const deleteExpertData = (event) => {
    event.preventDefault();
    dispatch(deleteExpert(state._id))
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
      props.history.push("/experts");
    }, 2000);
  }


  function resetForm () {
    props.match.params.id?
    setState(expertData)
    :
    setState({
      firstname: "",
  lastname: "",
  expertise: "",
  isActive: true,
  isDeleted: false,
  mediaId: {},
  alt: "",
  socialMediaId: [],
    })
    //setState(expert)  
    // state.socialMediaId.splice(0, state.socialMediaId.length)
    // setState({ ...state, socialMediaId: state.socialMediaId })
  }


  //console.log("return den hemen önce")
  //console.log(initialState);
  console.log(expertData);
  console.log(state, social, message, error);
  //console.log(props.match.params.id )
  return (
    <CRow>
      <CCol xs="12" md="12">
        {
          state &&
          <CCard>
            <CCardHeader>
              {props.match.params.id ? "EXPERT DETAIL FORM" : "ADD NEW EXPERT"}
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
                      src={state.mediaId && (state.mediaId.name ? URL.createObjectURL(state.mediaId) : state.mediaId.url )}
                      className="c-expert-img"
                      alt="expert-img"
                      />
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
                <CButton onClick={() => props.history.push(`/experts`)} type="button" color="secondary"><CIcon name="cil-ban" /> Cancel / Back</CButton>
              </CCol>
              <div className="card-header-actions">
               <CButton onClick={handleSubmit} type="submit" color="primary"><CIcon name="cil-check" /> {props.match.params.id ? "Update Expert" : "Add Expert"}</CButton>
                {props.match.params.id &&
                  <CButton onClick={() => setWarning(!danger)} type="button" color="danger" className="mr-1">Delete Expert <CIcon  content={freeSet.cilDelete}/></CButton>
                }
              </div>
              <CModal 
              show={danger} 
              onClose={() => setWarning(!danger)}
              color="danger"
            >
              <CModalHeader closeButton>
                <CModalTitle>Delete Expert</CModalTitle>
              </CModalHeader>
              <CModalBody>
                Are you sure deleting selected expert?
              </CModalBody>
              <CModalFooter>
                <CButton color="danger" onClick={deleteExpertData}>Delete Expert</CButton>{' '}
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
              <CModalTitle>Add Expert</CModalTitle>
            </CModalHeader>
            <CModalBody>
              <CAlert color={error ? "danger" : "success"}>
                {error ? error : message}
              </CAlert>
              {message ? "Redirecting experts page!" : ""}
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

export default BlogDetail
