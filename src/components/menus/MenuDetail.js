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
import { addNewMenu, editMenuData, deleteMenu } from "../../actions/menu.action";

const socialMedia = ["twitter", "linkedin", "flickr", "tumblr", "xing", "github", "stackoverflow", "youtube", "dribbble", "instagram", "pinterest", "vk", "yahoo", "behance", "reddit", "vimeo"]

const initialState = {
  text: "",
  parentId: "",
  link: "",
  isActive: true,
  isDeleted: false,
  iconClassName: "",
  order: "",
};

const MenuDetail = (props) => {
  const [modal, setModal] = useState(true)
  const [danger, setWarning] = useState(false)

  const dispatch = useDispatch();
  const message = useSelector(state => state.message)
  const error = useSelector(state => state.error)

  
  const menuData = useSelector(state => state.menus.menu)

  const menu = menuData && props.match.params.id ? menuData : initialState;
  const [state, setState] = useState(menu)
//console.log(state)
  const [uploadMessage, setUploadMessage] = useState("");
 

  const handleInput = (e) => {
    setState({ ...state, [e.target.name]: e.target.value })
  }
  const handleSwitch = (e) => {
    setState({ ...state, [e.target.name]: e.target.checked })
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    const fd = new FormData();
    
    fd.set("parentId", state.parentId);
    fd.set("text", state.text);
    fd.set("link", state.link);
    fd.set("isActive", state.isActive);
    fd.set("isDeleted", state.isDeleted);
    fd.set("iconClassName", state.iconClassName); 
    fd.set("order", state.order);
 

    props.match.params.id ?
      dispatch(editMenuData(fd, props.match.params.id))
        .then(res => {
          if (res === 200) {
            getDefaults()
          }
        })
      :
      dispatch(addNewMenu(fd))
        .then(res => {
          if (res === 200) {
            getDefaults()
          }
        })
  };

  const deleteMenuData = (event) => {
    event.preventDefault();
    dispatch(deleteMenu(state._id))
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
      props.history.push("/menus");
    }, 2000);
  }


  function resetForm () {
    props.match.params.id?
    setState(menuData)
    :
    setState({
      text: "",
      parentId: "",
      link: "",
      isActive: true,
      isDeleted: false,
      iconClassName: "",
      order: "",
    })
   }


  //console.log("return den hemen önce")
  //console.log(initialState);
  console.log(menuData);
  console.log(state,message, error);
  console.log(props.match.params.id )
  return (
    <CRow>
      <CCol xs="12" md="12">
        {
          state &&
          <CCard>
            <CCardHeader>
              {props.match.params.id ? "MENU DETAIL FORM" : "ADD NEW MENU"}
            </CCardHeader>
            <CCardBody>
              <CForm onSubmit={handleSubmit} encType="multipart/form-data" className="form-horizontal">
                <CFormGroup row>
                  <CCol md="2">
                    <CLabel htmlFor="parentId">Parent Menu Item gonna be selected items</CLabel>
                  </CCol>
                  <CCol xs="12" md="9">
                    <CInput onChange={handleInput} value={state.parentId} id="parentId" name="firstname" placeholder="Parent Menu Item gonna be selected items" required />
                  </CCol>
                </CFormGroup>
                <CFormGroup row>
                  <CCol md="2">
                    <CLabel htmlFor="text">Text</CLabel>
                  </CCol>
                  <CCol xs="12" md="9">
                    <CInput onChange={handleInput} value={state.text} id="text" name="text" placeholder="Text" required />
                  </CCol>
                </CFormGroup>
                <CFormGroup row>
                  <CCol md="2">
                    <CLabel htmlFor="link"> Menu Item Link </CLabel>
                  </CCol>
                  <CCol xs="12" md="9">
                    <CInput onChange={handleInput} value={state.link} id="link" name="link" placeholder="link" required />
                  </CCol>
                </CFormGroup>
                
                <CFormGroup row>
                  <CCol md="2">
                    <CLabel htmlFor="iconClassName">Icon ClassName</CLabel>
                  </CCol>
                  <CCol xs="12" md="9">
                    <CInput onChange={handleInput} value={state.iconClassName} id="iconClassName" name="iconClassName" placeholder="iconClassName" required />
                  </CCol>
                </CFormGroup>
                
                <CFormGroup row>
                  <CCol md="2">
                    <CLabel htmlFor="order">Order</CLabel>
                  </CCol>
                  <CCol xs="12" md="9">
                    <CInput onChange={handleInput} value={state.order} id="order" name="order" placeholder="order" required />
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
                <CButton onClick={() => props.history.push(`/menus`)} type="button" color="secondary"><CIcon name="cil-ban" /> Cancel / Back</CButton>
              </CCol>
              <div className="card-header-actions">
               <CButton onClick={handleSubmit} type="submit" color="primary"><CIcon name="cil-check" /> {props.match.params.id ? "Update Menu" : "Add Menu"}</CButton>
                {props.match.params.id &&
                  <CButton onClick={() => setWarning(!danger)} type="button" color="danger" className="mr-1">Delete Menu <CIcon  content={freeSet.cilDelete}/></CButton>
                }
              </div>
              <CModal 
              show={danger} 
              onClose={() => setWarning(!danger)}
              color="danger"
            >
              <CModalHeader closeButton>
                <CModalTitle>Delete Menu</CModalTitle>
              </CModalHeader>
              <CModalBody>
                Are you sure deleting selected menu item?
              </CModalBody>
              <CModalFooter>
                <CButton color="danger" onClick={deleteMenuData}>Delete Menu</CButton>{' '}
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
              <CModalTitle>Add Menu</CModalTitle>
            </CModalHeader>
            <CModalBody>
              <CAlert color={error ? "danger" : "success"}>
                {error ? error : message}
              </CAlert>
              {message ? "Redirecting menus page!" : ""}
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

export default MenuDetail
