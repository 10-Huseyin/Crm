import React, { useState, useEffect } from 'react'
import { useHistory, useLocation } from 'react-router-dom'
import { useDispatch, useSelector } from "react-redux"
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
} from '@coreui/react'
import { getCompanyIntros,getOneIntro } from 'src/actions/companyIntro.action'




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

const CompanyIntros = () => {
  const [errorMsg, seterrorMsg] = useState("")
  const history = useHistory()
  const queryPage = useLocation().search.match(/page=([0-9]+)/, '')
  const currentPage = Number(queryPage && queryPage[1] ? queryPage[1] : 1)
  const [page, setPage] = useState(currentPage)
  const paginationData = useSelector(state => state.pagination)
  const companyIntrosData = useSelector(state => state.companyIntro.companyIntroList)
  const dispatch = useDispatch()
  console.log(companyIntrosData)

  const perPage = 10;
  const pageNum =  paginationData ? paginationData.page : 1;
 

  const pageChange = newPage => {
    currentPage !== newPage && history.push(`/companyintroduction?page=${newPage}`)
    dispatch(getCompanyIntros(perPage,newPage))
  }

  useEffect(() => {
    dispatch(getCompanyIntros(perPage,page))
    .then(res => {
      if (res !== 200) {
        seterrorMsg("An error occured when data is triggered!")
      } else if (res === 200) {
        seterrorMsg("");
      }
      setTimeout(() => {
        seterrorMsg("");
      }, 3000);
    })
    
    currentPage !== page && setPage(currentPage)
  }, [currentPage, page])
  const handleIntro =(id)=>{
    dispatch(getOneIntro(id))
    .then(res => {
      if (res === 200) {
        history.push(`/companyintroduction/${id}`)
      }
    })
  }
  return (
    <>
      <CRow>
       <CCol xl={9}>
        <CCard>
          <CCardHeader>
            Company Intros
            <small className="text-muted"> Table</small>
            <div className="card-header-actions">
                <CButton type="button"
                  onClick={() => history.push(`/companyintroduction/add`)}
                  block color="primary">Add Company Intro</CButton>
              </div>
          </CCardHeader>
          {errorMsg && <CAlert color="warning">
              {errorMsg}
            </CAlert>}
          <CCardBody>
          <CDataTable
            items={companyIntrosData}
            fields={[
              { key: 'title', _classes: 'font-weight-bold' },
              "subTitle",  'iconName', "shortDescription",
            ]}
            columnFilter
            tableFilter
            hover
            sorter
            striped
            // itemsPerPage={perPage}
            // activePage={page}
            clickableRows
            onRowClick={(item) => handleIntro(item._id)}
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

export default CompanyIntros
