import React, { useState, useEffect } from 'react'
import { useHistory, useLocation } from 'react-router-dom'
import {
  CBadge,
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CDataTable,
  CRow,
  CButton,
  CPagination,
  CAlert,
  CSelect,
  CInputGroup,
  CInputGroupPrepend,
  CInputGroupAppend,
  CInputGroupText,
  CImg,
  CCardText
} from '@coreui/react';
import CIcon from '@coreui/icons-react';
import { getMedias, getOneMedia, getMediasByTitle } from 'src/actions/media.action';
import { useDispatch, useSelector } from "react-redux";
import { freeSet } from '@coreui/icons'

const getBadge = status => {
  switch (status) {
    case true: return 'success'
    case false: return 'secondary'
    case 'Pending': return 'warning'
    case 'Banned': return 'danger'
    default: return 'primary'
  }
}


const getActive = status => {
  switch (status) {
    case true: return 'Active'
    case false: return 'Inactive'
    case 'Pending': return 'Pending'
    case 'Banned': return 'Banned'
    default: return 'primary'
  }
}

const mediaType = ["slider", "expert", "user", "gallery"]

const Medias = () => {
  const history = useHistory()
  const queryPage = useLocation().search.match(/page=([0-9]+)/, '')
  let currentPage = Number(queryPage && queryPage[1] ? queryPage[1] : 1)
  const [page, setPage] = useState(currentPage)
  const [errorMsg, seterrorMsg] = useState("")
  const [selectedMedia, setselectedMedia] = useState("all")
  const paginationData = useSelector(state => state.pagination)
  const mediasData = useSelector(state => state.medias.mediasList)
  const dispatch = useDispatch()

  const perPage = 12;
  const pageNum = paginationData ? paginationData.page : 1;
  //console.log(pageNum)
 
  const pageChange = newPage => {
    
    currentPage !== newPage && history.push(`/medias?page=${newPage}`);
    selectedMedia === "all" ?
    dispatch(getMedias(perPage,newPage))
    :
    dispatch(getMediasByTitle(selectedMedia, perPage, newPage ))
  }

  useEffect(() => {
    selectedMedia === "all" ?
    dispatch(getMedias(perPage,page))
    :
    dispatch(getMediasByTitle(selectedMedia, perPage, page ))
    .then(res=>{
      if (res !== 200) {
        seterrorMsg("An error occured when data is triggered!")
      } else if (res === 200){
        seterrorMsg("");
      }

      setTimeout(() => {
        seterrorMsg("");
      }, 3000);
    })
  
    
    currentPage !== page && setPage(currentPage)
  }, [currentPage, page])

  
  const handleMedia =(id)=>{
    console.log(id)
    dispatch(getOneMedia(id))
    .then(res => {
      if (res === 200) {
        history.push(`/medias/${id}`)
      }
    })
  }


  const handleMediaByTitle =(title)=>{
  
    history.push(`/medias?page=1`)
    title === "all" ?
    dispatch(getMedias(perPage,1))
    :
    dispatch(getMediasByTitle(title, perPage, 1 ))
    .then(res=>{
      if (res !== 200) {
        seterrorMsg("An error occured when data is triggered!")
      } else if (res === 200){
        seterrorMsg("");
      }

      setTimeout(() => {
        seterrorMsg("");
      }, 3000);
    })
    setPage(1)
  }




  console.log(selectedMedia,currentPage, paginationData, page)
  return (
    <>
    <CRow>
        <CCol xl={9}>
          <CCard>
            <CCardHeader>
              Medias <small className="text-muted"> Table</small>
              <div className="card-header-actions">
              <CInputGroup>
                      <CInputGroupPrepend>
                      <CInputGroupText><CIcon content={freeSet.cilFilter} /></CInputGroupText>
                      </CInputGroupPrepend>
              <CSelect custom name="roleId" id="select-role" onChange={e => {setselectedMedia(e.target.value);handleMediaByTitle(e.target.value)}}>
              <option key={0} value="all">All</option>
                      {mediaType.map((item, index) => <option key={index+1} value={item}>{item}</option>)}
                    </CSelect>
                      <CInputGroupAppend>
                <CButton type="button"
                  onClick={() => history.push(`/medias/add`)}
                  block color="primary">Add New Media</CButton>
                  </CInputGroupAppend>
                  </CInputGroup>
              </div>
            </CCardHeader>
            {errorMsg && <CAlert color="warning">
              {errorMsg}
            </CAlert>}
            <CCardBody>

              <CRow>
          {mediasData.map(item => {
            return <CCol xs="12" sm="6" md="3">
              <CCard >
                <CCardHeader>
                  {item.title && (item.title.charAt(0).toUpperCase() + item.title.slice(1))}
                  <div className="card-header-actions">
                  <CBadge color={getBadge(item.isActive)}>
                      {getActive(item.isActive)}
                    </CBadge>
                  </div>
                </CCardHeader>
                <CImg
                      src={item.mediaKey ? item.url :"" }
                      className="c-media-img"
                      title= {item.alt}
                      onClick={() => handleMedia(item._id)}
                      style={{cursor:'pointer'}}
                      />
          </CCard>
        </CCol>
          })
        }
        </CRow>
          { 
            pageNum > 1 &&
            <CPagination
          align="center"
          activePage={page}
          pages={pageNum}
          onActivePageChange={pageChange}
          />
        }
          </CCardBody>
        </CCard>
      </CCol> 
    </CRow>
    </>
  )
}

export default Medias
