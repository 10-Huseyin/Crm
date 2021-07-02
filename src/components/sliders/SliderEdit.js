import React, { useState,useEffect } from 'react'
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
import { DocsLink } from 'src/reusable'
import { useDispatch, useSelector } from "react-redux";
import { getSlider,deleteSlider,editSliderFunk } from "../../actions/slider.action";
 



const initialState = {
  title: "",
  subtitle: "",
  url: "",
  buttonText: "",
  order: "",
  isActive: true,
  isDelete: false,
  mediaId: "",
  isVideo: ""
};

const BasicForms = (props) => {


  const [state, setState] = useState({
    title: "",
    subtitle: "",
    url: "",
    buttonText: "",
    order: "",
    isActive: true,
    isDelete: false,
    mediaId: "",
    isVideo: ""
  })
  const [photo, setPhoto] = useState({});
  const [message, setMessage] = useState("")
  const dispatch = useDispatch();

  const { sliderList } = useSelector((state) => state.slider);




  console.log(sliderList)
   
    
  
  useEffect(() => {
    const willEditSlider=sliderList.find((i) => i._id.toString() === props.match.params.id)

    console.log(willEditSlider);
    setState(willEditSlider)
  }, [])
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

  }

  // const handleSubmit = (event) => {
  //   event.preventDefault();
  //   dispatch(editSliderFunk(state,state._id));
  //   resetForm();
  //   props.history.push("/sliders");
  // };
  const handleSubmit = (event) => {
   
    event.preventDefault();
    dispatch(editSliderFunk(state, state._id))
      resetForm()
      dispatch(getSlider())
      setTimeout(() => {
        props.history.push("/sliders");
      }, 1000)
  };

  const deleteSliderData = (event) => {
    event.preventDefault();
    // dispatch(deleteUser(state._id))
    
    //   resetForm();
    //   dispatch(getUsers())
      setTimeout(() => {
        props.history.push("/sliders");
      }, 2000);
    
  };

  console.log(state, photo);
  
  return (
    <CRow>
      <CCol xs="12" md="12">
        <CCard>
          <CCardHeader>
            EDIT SLIDER FORM
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
                  <CInput onChange={handleInput} type="number" id="order" name="order" placeholder="0" required value={state.order}/>
                </CCol>
              </CFormGroup>
              <CFormGroup row>
                <CCol md="2">
                  <CLabel htmlFor="isVideo">Media Type : </CLabel>
                </CCol>
                <CCol xs="12" md="9">
                  <CSelect onChange={handleInput} custom name="isVideo" id="isVideo" value={state.isVideo} required>
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
                <CCol xs="12" md="9">
                  <CInputFile onChange={getPhoto} custom id="custom-file-input"  />
                  <CLabel htmlFor="custom-file-input" variant="custom-file">
                    {photo ? photo.name : "Choose file..."}
                  </CLabel>
                  <CButton onClick={uploadPhoto} type="button" size="sm" color="secondary"><CIcon name="cil-save" /> Upload Photo</CButton>
                  <span className="ml-2" >{message}</span>
                </CCol>
              </CFormGroup>
              <CCardFooter>
              <CRow>

<CCol >
  <CButton type="submit" size="md" color="primary"><CIcon name="cil-scrubber" /> Update Slider </CButton>
  <CButton onClick={resetForm} type="reset" color="info"><CIcon name="cil-ban" /> Reset Form </CButton>
</CCol>
<CCol >
  <CButton onClick={deleteSliderData} type="button" block color="danger">Delete Slider</CButton>
</CCol>
  </CRow>
              </CCardFooter>
            </CForm>
          </CCardBody>
        </CCard>
      </CCol>
    </CRow>
  )
}

export default BasicForms
