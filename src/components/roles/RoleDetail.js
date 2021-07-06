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
  CSelect,
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
import { addNewRole, editRoleData, deleteRole } from "../../actions/role.action";


const initialState = {
  name: "",
  isActive: true,
  isDeleted: false,
};

const RoleDetail = (props) => {
  const [modal, setModal] = useState(true)
  const dispatch = useDispatch();
  const message = useSelector(state => state.message)
  const error = useSelector(state => state.error)
  const rolesData = useSelector(state => state.roles.rolesList)
  
  const role = rolesData && props.match.params.id ? rolesData.find(role => role._id.toString() === props.match.params.id) : initialState;
  const [state, setState] = useState(role)

  
  const handleInput = (e) => {
    setState({ ...state, [e.target.name]: e.target.value })
  }
  const handleSwitch = (e) => {
    setState({...state, [e.target.name] : e.target.checked})
  }

  const resetForm = () => {
    setState(role)
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    const fd = new FormData();
    
    fd.set("name", state.name);
    fd.set("isActive", state.isActive);
    fd.set("isDeleted", state.isDeleted);
    
    props.match.params.id ? 
    dispatch(editRoleData(fd, props.match.params.id ))
    .then(res=>{
      if (res === 200) {
        getDefaults()
      } 
      })
    :
    dispatch(addNewRole(fd))
    .then(res=>{
      if (res === 200) {
        getDefaults()
      } 
      })
  };

  const deleteRoleData = (event) => {
    event.preventDefault();
    dispatch(deleteRole(state._id))
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
      props.history.push("/roles");
    }, 2000);
  }
  console.log(rolesData)
  console.log(state, message, error);
  return (
    <CRow>
      <CCol xs="12" md="12">
        <CCard>
          <CCardHeader>
            {props.match.params.id ? "ROLE DETAIL FORM" : "ADD NEW ROLE"}
          </CCardHeader>
          <CCardBody>
            {
              state &&
            <CForm onSubmit={handleSubmit} encType="multipart/form-data" className="form-horizontal">
              <CFormGroup row>
                <CCol md="2">
                  <CLabel htmlFor="rolename">Role Name</CLabel>
                </CCol>
                <CCol xs="12" md="9">
                  <CInput defaultValue={state.name} id="rolename" name="name" placeholder="Role Name" disabled />
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
              <CFormGroup row >
                <CCol md="2">
                  <CLabel >Update Role</CLabel>
                </CCol>
                <CCol xs="12" md="9">
                  <CSelect custom name="roleId" id="select" onChange={handleInput}>
                      <option value={state._id? state._id : ""}>{state._id? state.name : "Please select"}</option>
                      {rolesData.map(item=><option key={item._id} value={item._id}>{item.name}</option>)}
                    </CSelect>
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
                      <CButton onClick={deleteRoleData} type="button" block color="danger">Delete Role</CButton>
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
                <CModalTitle>Add Role</CModalTitle>
              </CModalHeader>
              <CModalBody>
              <CAlert color={error?"danger":"success"}>
                    {error?error:message}
                  </CAlert>
                  {message? "Redirecting roles page!" : ""}
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

export default RoleDetail
