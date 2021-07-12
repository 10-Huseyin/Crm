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
} from '@coreui/react'
import CIcon from '@coreui/icons-react';
import '@coreui/icons/css/all.css';
import { freeSet } from '@coreui/icons'

import { useDispatch, useSelector } from "react-redux";
import { addNewRole, editRoleData, deleteRole } from "../../actions/role.action";


const initialState = {
  name: "",
  isActive: true,
  isDeleted: false,
};

const RoleDetail = (props) => {
  const [modal, setModal] = useState(true)
  const [danger, setWarning] = useState(false)

  const dispatch = useDispatch();
  const message = useSelector(state => state.message)
  const error = useSelector(state => state.error)
  //const rolesData = useSelector(state => state.roles.rolesList)
  const roleData = useSelector(state => state.roles.role)
  
  const role = roleData && props.match.params.id ? roleData : initialState;
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
  //console.log(rolesData)
  console.log(state, message, error);
  return (
    <CRow>
      <CCol xs="12" md="12">
            {
              state &&
        <CCard>
          <CCardHeader>
            {props.match.params.id ? "ROLE DETAIL FORM" : "ADD NEW ROLE"}
          </CCardHeader>
          <CCardBody>
            <CForm onSubmit={handleSubmit} encType="multipart/form-data" className="form-horizontal">
              <CFormGroup row>
                <CCol md="2">
                  <CLabel htmlFor="rolename">Role Name</CLabel>
                </CCol>
                <CCol xs="12" md="9">
                  <CInput onChange={handleInput} value={state.name} id="rolename" name="name" placeholder="Role Name" />
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
                      checked = {state.isActive}
                    />
                  </CCol>
              </CFormGroup>
                </CForm>
                          </CCardBody>
                  <CCardFooter>
                  <CCol>
              <CButton onClick={resetForm} type="reset" color="warning"><CIcon  content={freeSet.cilReload} /> Reset Form </CButton>
                <CButton onClick={() => props.history.push(`/roles`)} type="button" color="secondary"><CIcon name="cil-ban" /> Cancel / Back</CButton>
              </CCol>
              <div className="card-header-actions">
               <CButton onClick={handleSubmit} type="submit" color="primary"><CIcon name="cil-check" /> {props.match.params.id ? "Update Role" : "Add Role"}</CButton>
                {props.match.params.id &&
                  <CButton onClick={() => setWarning(!danger)} type="button" color="danger" className="mr-1">Delete Role <CIcon  content={freeSet.cilDelete}/></CButton>
                }
              </div>
              <CModal 
              show={danger} 
              onClose={() => setWarning(!danger)}
              color="danger"
            >
              <CModalHeader closeButton>
                <CModalTitle>Delete Role</CModalTitle>
              </CModalHeader>
              <CModalBody>
                Are you sure deleting selected role?
              </CModalBody>
              <CModalFooter>
                <CButton color="danger" onClick={deleteRoleData}>Delete Role</CButton>{' '}
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


      </CCol>
    </CRow>
  )
}

export default RoleDetail
