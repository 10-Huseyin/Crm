import React, {useState, useEffect} from 'react'
import { CCard, CCardBody, CCardHeader, CCol, CRow, CForm, CFormGroup, CLabel, CInput, CSelect, CSwitch, CCardFooter, CButton } from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { useDispatch, useSelector } from "react-redux";
import { editExpertData, deleteExpert } from "../../actions/expertAction";


const Expert = (props) => {

  const dispatch = useDispatch()
  
  const expertsData = useSelector(state => state.experts.expertList)
  const expert = expertsData.find( expert => expert._id.toString() === props.match.params.id)
  const [state, setState] = useState(expert)
  
  const handleInput = (e) => {
    setState({...state, [e.target.name] : e.target.value})
  }

  const handleSwitch = (e) => {
    setState({...state, [e.target.name] : e.target.checked})
  }

const resetForm = () => {
  setState(expert)
}

  const handleSubmit = (event) => {
    console.log("handlesubmit")
    event.preventDefault();
    dispatch(editExpertData(state, state._id));
    resetForm();
    props.history.push("/experts");
  };

  const deleteExpertData = (event) => {
    event.preventDefault();
    dispatch(deleteExpert(state._id));
    resetForm();
    props.history.push("/experts");
  };


  //console.log(state)
  
  return (
      <CRow>
        <CCol lg={9}>
          <CCard>
            <CCardHeader>
              Expert Details
            </CCardHeader>
            <CCardBody>
            {state ? 
              <CForm onSubmit={handleSubmit} encType="multipart/form-data" className="form-horizontal">
                <CFormGroup row>
                  <CCol md="3">
                    <CLabel htmlFor="expertfirstname-input">First Name</CLabel>
                  </CCol>
                  <CCol xs="12" md="9">
                    <CInput onChange={handleInput} value={state.firstname} id="expertfirstname-input" name="firstname" placeholder="First Name" />
                  </CCol>
                </CFormGroup>
                <CFormGroup row>
                  <CCol md="3">
                    <CLabel htmlFor="expertlastname-input">Last Name</CLabel>
                  </CCol>
                  <CCol xs="12" md="9">
                    <CInput onChange={handleInput} value={state.lastname} id="expertlastname-input" name="lastname" placeholder="Last Name" />
                  </CCol>
                </CFormGroup>
                
                <CFormGroup row>
                  <CCol md="3">
                    <CLabel htmlFor="expertise-select">Expertise</CLabel>
                  </CCol>
                  <CCol xs="12" md="9">
                    <CSelect onChange={handleInput} custom name="expertise" id="expertise-select">
                      <option value={state.expertise}>{state.expertise}</option>
                      <option value="expert">expert</option>
                      <option value="staff">staff</option>
                      <option value="admin">admin</option>
                    </CSelect>
                  </CCol>
                </CFormGroup>
                
                <CFormGroup row>
                  <CCol tag="label" sm="3" className="col-form-label">
                    Expert is Active
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
            <CCardFooter>
              <CRow>

            <CCol >
              <CButton type="submit" size="md" color="primary"><CIcon name="cil-scrubber" /> Update Expert </CButton>
              <CButton onClick={resetForm} type="reset" color="info"><CIcon name="cil-ban" /> Reset Form </CButton>
            </CCol>
            <CCol >
              <CButton onClick={deleteExpertData} type="button" block color="danger">Delete Expert</CButton>
            </CCol>
              </CRow>
            </CCardFooter>
              </CForm>
              :
              <span><CIcon className="text-muted" name="cil-ban" /> Not found</span>
            }
            </CCardBody>
          </CCard>
        </CCol>
      </CRow>
  )
}

export default Expert
