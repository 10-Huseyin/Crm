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
  CAlert
} from '@coreui/react'
import { getSocialMedias, getOneSocialMedia } from 'src/actions/socialMedia.action'
import { useDispatch, useSelector } from "react-redux";

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

const SocialMedias = () => {
  const history = useHistory()
  const queryPage = useLocation().search.match(/page=([0-9]+)/, '')
  const currentPage = Number(queryPage && queryPage[1] ? queryPage[1] : 1)
  const [page, setPage] = useState(currentPage)
  const [errorMsg, seterrorMsg] = useState("")
  const paginationData = useSelector(state => state.pagination)
  const socialMediasData = useSelector(state => state.socialMedias.socialMediasList)
  const dispatch = useDispatch()

  const perPage = 10;
  const pageNum = paginationData ? paginationData.page : 1;
  //console.log(pageNum)
 
  const pageChange = newPage => {
    currentPage !== newPage && history.push(`/socialMedias?page=${newPage}`);
    dispatch(getSocialMedias(perPage,newPage))
  }

  useEffect(() => {
    dispatch(getSocialMedias(perPage,page))
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

  const handleSocialMedia =(id)=>{
    dispatch(getOneSocialMedia(id))
    .then(res => {
      if (res === 200) {
        history.push(`/socialMedia/${id}`)
      }
    })
  }

  console.log(socialMediasData)
  return (
    <>
    <CRow>
        <CCol xl={9}>
          <CCard>
            <CCardHeader>
              Social Medias <small className="text-muted"> Table</small>
              <div className="card-header-actions">
                <CButton type="button"
                  onClick={() => history.push(`/socialMedias/add`)}
                  block color="primary">Add Social Media</CButton>
              </div>
            </CCardHeader>
            {errorMsg && <CAlert color="warning">
              {errorMsg}
            </CAlert>}
            <CCardBody>
          <CDataTable
           columnFilter
           tableFilter
           hover
           sorter
            items={socialMediasData}
            fields={[
              { key: 'title', _classes: 'font-weight-bold' },
              "link", "isActive",
            ]}
            hover
            striped
            //itemsPerPage={perPage}
            //activePage={page}
            clickableRows
            onRowClick={item => handleSocialMedia(item._id)}
            scopedSlots = {{
              "isActive":
                (item)=>(
                  <td>
                    <CBadge color={getBadge(item.isActive)}>
                      {getActive(item.isActive)}
                    </CBadge>
                  </td>
                )
              }}
              />
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

export default SocialMedias
