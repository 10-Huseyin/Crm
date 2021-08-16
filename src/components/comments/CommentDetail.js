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
  CTextarea
} from '@coreui/react'
import CIcon from '@coreui/icons-react';
import '@coreui/icons/css/all.css';
import { freeSet } from '@coreui/icons'

import { useDispatch, useSelector } from "react-redux";
import { addNewComment, editCommentData, deleteComment } from "../../actions/comment.action";


const initialState = {
  userId: "",
  title: "",
  content: "",
  isActive: true,
  isDeleted: false,
  reasonToBlock: "",

};

const CommentDetail = (props) => {
  const [modal, setModal] = useState(true)
  const [danger, setWarning] = useState(false)

  const dispatch = useDispatch();
  const message = useSelector(state => state.message)
  const error = useSelector(state => state.error)

  
  const commentData = useSelector(state => state.comments.comment)
 console.log(commentData);
  const comment = commentData && props.match.params.id ? commentData : initialState;

  const [state, setState] = useState(comment)
//console.log(state)
  const [uploadMessage, setUploadMessage] = useState("");
  const userId = useSelector(state => state.auth.user.id)
  console.log(userId);


  const handleInput = (e) => {
    setState({ ...state, [e.target.name]: e.target.value })
  }
  const handleSwitch = (e) => {
    setState({ ...state, [e.target.name]: e.target.checked })
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    const fd = new FormData();
    
    fd.set("userId", userId);
    fd.set("title", state.title);
    fd.set("content", state.content);
    fd.set("isActive", state.isActive);
    fd.set("isDeleted", state.isDeleted);
    fd.set("reasonToBlock", state.reasonToBlock); 
 
 

    props.match.params.id ?
      dispatch(editCommentData(fd, props.match.params.id))
        .then(res => {
          if (res === 200) {
            getDefaults()
          }
        })
      :
      dispatch(addNewComment(fd))
        .then(res => {
          if (res === 200) {
            getDefaults()
          }
        })
  };

  const deleteCommentData = (event) => {
    event.preventDefault();
    dispatch(deleteComment(state._id))
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
      props.history.push("/comments");
    }, 2000);
  }


  function resetForm () {
    props.match.params.id?
    setState(commentData)
    :
    setState({
      userId: "",
      title: "",
      content: "",
      isActive: true,
      isDeleted: false,
      reasonToBlock: "",
    })
   }

  return (
    <CRow>
      <CCol xs="12" md="12">
        {
          state &&
          <CCard>
            <CCardHeader>
              {props.match.params.id ? "COMMENT DETAIL FORM" : "ADD NEW COMMENT"}
            </CCardHeader>
            <CCardBody>
              <CForm onSubmit={handleSubmit} encType="multipart/form-data" className="form-horizontal">
               <CFormGroup row>
                  <CCol md="2">
                    <CLabel htmlFor="text">Title</CLabel>
                  </CCol>
                  <CCol xs="12" md="9">
                    <CInput onChange={handleInput} value={state.title} id="title" name="title" placeholder="Title" required />
                  </CCol>
                </CFormGroup>
                <CFormGroup row>
                  <CCol md="2">
                    <CLabel htmlFor="content">Content</CLabel>
                  </CCol>
                  <CCol xs="12" md="9">
                    <CTextarea onChange={handleInput} value={state.content} id="content" name="content" placeholder="Content" required />
                  </CCol>
                </CFormGroup>
                
                <CFormGroup row>
                  <CCol md="2">
                    <CLabel htmlFor="reasonToBlock">Reason To Block</CLabel>
                  </CCol>
                  <CCol xs="12" md="9">
                    <CInput onChange={handleInput} value={state.reasonToBlock} id="reasonToBlock" name="reasonToBlock" placeholder="Reason To Block" required />
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
                              
              </CForm>
            </CCardBody>
            <CCardFooter>
              <CCol>
              <CButton onClick={resetForm} type="reset" color="warning"><CIcon  content={freeSet.cilReload} /> Reset Form </CButton>
                <CButton onClick={() => props.history.push(`/comments`)} type="button" color="secondary"><CIcon name="cil-ban" /> Cancel / Back</CButton>
              </CCol>
              <div className="card-header-actions">
               <CButton onClick={handleSubmit} type="submit" color="primary"><CIcon name="cil-check" /> {props.match.params.id ? "Update comment" : "Add Comment"}</CButton>
                {props.match.params.id &&
                  <CButton onClick={() => setWarning(!danger)} type="button" color="danger" className="mr-1">Delete Comment <CIcon  content={freeSet.cilDelete}/></CButton>
                }
              </div>
              <CModal 
              show={danger} 
              onClose={() => setWarning(!danger)}
              color="danger"
            >
              <CModalHeader closeButton>
                <CModalTitle>Delete Comment</CModalTitle>
              </CModalHeader>
              <CModalBody>
                Are you sure deleting selected comment item?
              </CModalBody>
              <CModalFooter>
                <CButton color="danger" onClick={deleteCommentData}>Delete Comment</CButton>{' '}
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
              <CModalTitle>Add Comment</CModalTitle>
            </CModalHeader>
            <CModalBody>
              <CAlert color={error ? "danger" : "success"}>
                {error ? error : message}
              </CAlert>
              {message ? "Redirecting Comments page!" : ""}
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

export default CommentDetail
