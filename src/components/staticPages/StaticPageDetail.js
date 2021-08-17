import React, { useState } from 'react'
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
//import CKFinder from '@ckeditor/ckeditor5-ckfinder/src/ckfinder';


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
import { useDispatch, useSelector } from "react-redux";
import { UploadAdapter, addNewStaticPage, editStaticPageData, deleteStaticPage } from "../../actions/staticPage.action";
import { freeSet } from '@coreui/icons'


const initialState = {
  name: "",
  alt: "",
  mediaId: {},
  content:"",
  isActive: true,
  isDeleted: false,
};



// Custom Upload Adapter Plugin function


const StaticPageDetail = (props) => {
  const [modal, setModal] = useState(true)
  const [danger, setWarning] = useState(false)

  const dispatch = useDispatch();
  const message = useSelector(state => state.message)
  const error = useSelector(state => state.error)
  //const staticPagesData = useSelector(state => state.staticPages.staticPagesList)
  const staticPageData = useSelector(state => state.staticPages.staticPage)
  const [uploadMessage, setUploadMessage] = useState("");

  const staticPage = staticPageData && props.match.params.id ? staticPageData : initialState;
  const [state, setState] = useState(staticPage)
  
function CustomUploadAdapterPlugin(editor) {
	editor.plugins.get("FileRepository").createUploadAdapter = loader => {

    const mediaData = new FormData();
		loader.file.then(pic => mediaData.set("mediaId", pic));
		mediaData.set("title", state.name || "");
    mediaData.set("alt", state.alt || "");
    return new UploadAdapter(mediaData);
	};
}

// const  custom_config= {
//   language: "en", // fa - for persian language ( rtl )
//   extraPlugins: [MyCustomUploadAdapterPlugin]
// };

const config = {
  extraPlugins: [CustomUploadAdapterPlugin],
  toolbar: {
    items: [
      'heading',
      '|',
      'fontSize',
      'fontFamily',
      '|',
      'bold',
      'underline',
      'italic',
      'strikethrough',
      'subscript',
      'superscript',
      'link',
      '|',
      'alignment',
      '|',
      'numberedList',
      'bulletedList',
      'todoList',
      '|',
      'indent',
      'outdent',
      '|',
      'link',
      'blockQuote',
      'imageUpload',
      'insertTable',
      'mediaEmbed',
      '|',
      'undo',
      'redo',
      'placeholder',
    ]
  },
  
}


  const onChangePhoto = (e) => {
    console.log(e.target.files);
    setState({ ...state, alt: e.target.files[0].name, staticPageId: e.target.files[0] });
    setUploadMessage("StaticPage selected succesfully!")
  };

  const handleInput = (e) => {
    setState({ ...state, [e.target.name]: e.target.value })
  }

  const handleSwitch = (e) => {
    setState({ ...state, [e.target.name]: e.target.checked })
  }

  const resetForm = () => {
    setState(staticPage)
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    const fd = new FormData();
    if (state.mediaId.name) {
      fd.set("mediaId", state.mediaId, state.mediaId.title);
    }
    fd.set("name", state.name);
    fd.set("alt", state.alt);
    fd.set("content", state.content);
    fd.set("isActive", state.isActive);
    fd.set("isDeleted", state.isDeleted);

    props.match.params.id ?
      dispatch(editStaticPageData(fd, props.match.params.id))
        .then(res => {
          if (res === 200) {
            getDefaults()
          }
        })
      :
      dispatch(addNewStaticPage(fd))
        .then(res => {
          if (res === 200) {
            getDefaults()
          }
        })
  };

  const deleteStaticPageData = (event) => {
    event.preventDefault();
    dispatch(deleteStaticPage(state._id))
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
      props.history.push("/staticPages");
    }, 2000);
  }
  //console.log(staticPageData)
  console.log(state, message, error);
  return (
    <CRow>
      <CCol xs="12" md="12">
        {
          state &&
          <CCard>
            <CCardHeader>
              {props.match.params.id ? "STATIC PAGE DETAIL FORM" : "ADD NEW STATIC PAGE"}
            </CCardHeader>
            <CCardBody>
              <CForm onSubmit={handleSubmit} encType="multipart/form-data" className="form-horizontal">
                <CFormGroup row>
                  <CCol md="2">
                    <CLabel htmlFor="staticPagename">StaticPage Name</CLabel>
                  </CCol>
                  <CCol xs="12" md="9">
                    <CInput defaultValue={state.name} id="staticPagename" name="name" placeholder="StaticPage Name" onChange={handleInput}/>
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
                    <CLabel>Add New Media</CLabel>
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
                    <CLabel>Selected Media</CLabel>
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
                    <CLabel htmlFor="staticPagealt">Media Alt</CLabel>
                  </CCol>
                  <CCol xs="12" md="9">
                    <CInput defaultValue={state.alt} id="staticPagealt" name="alt" placeholder="StaticPage Alt" onChange={handleInput}/>
                  </CCol>
                </CFormGroup>
                <CFormGroup row>
                <CKEditor
                    config={config}
					editor={ClassicEditor}
					data={state.content}
                    onReady={ editor => {
                        // You can store the "editor" and use when it is needed.
                        console.log( 'Editor is ready to use!', editor );
                    } }
                    onChange={ ( event, editor ) => {
                        const data = editor.getData();
                        //console.log( { event, editor, data } );
                        setState({ ...state, content: data })
                    } }
                    onBlur={ ( event, editor ) => {
                        console.log( 'Blur.', event, editor );
                    } }
                    onFocus={ ( event, editor ) => {
                        console.log( 'Focus.', event, editor );
                    } }
                />
                </CFormGroup>
              </CForm>
            </CCardBody>
            <CCardFooter>
              <CCol>
                <CButton onClick={resetForm} type="reset" color="warning"><CIcon content={freeSet.cilReload} /> Reset Form </CButton>
                <CButton onClick={() => props.history.push(`/staticPages`)} type="button" color="secondary"><CIcon name="cil-ban" /> Cancel / Back</CButton>
              </CCol>
              <div className="card-header-actions">
                <CButton onClick={handleSubmit} type="submit" color="primary"><CIcon name="cil-check" /> {props.match.params.id ? "Update StaticPage" : "Add StaticPage"}</CButton>
                {props.match.params.id &&
                  <CButton onClick={() => setWarning(!danger)} type="button" color="danger" className="mr-1">Delete StaticPage <CIcon content={freeSet.cilDelete} /></CButton>
                }
              </div>
              <CModal
                show={danger}
                onClose={() => setWarning(!danger)}
                color="danger"
              >
                <CModalHeader closeButton>
                  <CModalTitle>Delete StaticPage</CModalTitle>
                </CModalHeader>
                <CModalBody>
                  Are you sure deleting selected static page?
                </CModalBody>
                <CModalFooter>
                  <CButton color="danger" onClick={deleteStaticPageData}>Delete StaticPage</CButton>{' '}
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
              <CModalTitle>Add StaticPage</CModalTitle>
            </CModalHeader>
            <CModalBody>
              <CAlert color={error ? "danger" : "success"}>
                {error ? error : message}
              </CAlert>
              {message ? "Redirecting staticPages page!" : ""}
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

export default StaticPageDetail
