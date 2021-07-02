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
  CSwitch,
  CPagination
} from '@coreui/react'
import { getCompanyIntro } from 'src/actions/company.action'
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

const CompanyIntroductions = () => {
  const history = useHistory()
  const queryPage = useLocation().search.match(/page=([0-9]+)/, '')
  const currentPage = Number(queryPage && queryPage[1] ? queryPage[1] : 1)
  const [page, setPage] = useState(currentPage)

  const companyIntrosData = useSelector(state => state.companyIntro.companyIntroList)
  const dispatch = useDispatch()
  console.log(companyIntrosData)

  const perPage = 10;
  const pageNum = Math.ceil(companyIntrosData.length / perPage);
  //console.log(pageNum)

  const pageChange = newPage => {
    currentPage !== newPage && history.push(`/companyintroduction?page=${newPage}`)
  }

  useEffect(() => {
    dispatch(getCompanyIntro())
    
    currentPage !== page && setPage(currentPage)
  }, [currentPage, page])

  return (
    <>
    <CButton type="button"
    onClick={() => history.push(`/companyintroduction/add`)}
    block color="primary">Add Company Intro</CButton>
    <CRow>
       <CCol xl={9}>
        <CCard>
          <CCardHeader>
            Company Intros
            <small className="text-muted"> Table</small>
          </CCardHeader>
          <CCardBody>
          <CDataTable
            items={companyIntrosData}
            fields={[
              { key: 'title', _classes: 'font-weight-bold' },
              "subTitle",  'iconName', "shortDescription",
            ]}
            hover
            striped
            itemsPerPage={perPage}
            activePage={page}
            clickableRows
            onRowClick={(item) => history.push(`/companyintroduction/${item._id}`)}
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

export default CompanyIntroductions
