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
} from '@coreui/react'
import { getMenüs, getOneMenü } from 'src/actions/menu.action'
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

const Menus = () => {
  const history = useHistory()
  const queryPage = useLocation().search.match(/page=([0-9]+)/, '')
  const currentPage = Number(queryPage && queryPage[1] ? queryPage[1] : 1)
  const [page, setPage] = useState(currentPage)
  const [errorMsg, seterrorMsg] = useState("")
  const paginationData = useSelector(state => state.pagination)
  const menüsData = useSelector(state => state.menus.menuList)
  const dispatch = useDispatch()

  const perPage = 10;
  const pageNum = paginationData ? paginationData.page : 1;
  //console.log(pageNum)

  const pageChange = newPage => {
    currentPage !== newPage && history.push(`/menus?page=${newPage}`);
    dispatch(getMenüs(perPage, newPage))
  }

  useEffect(() => {
    dispatch(getMenüs(perPage, page))
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

const handleMenu =(id)=>{
  dispatch(getOneMenü(id))
  .then(res => {
    if (res === 200) {
      history.push(`/menus/${id}`)
    }
  })
}

  //console.log(errorMsg)
  return (
    <>
      <CRow>
        <CCol xl={9}>
          <CCard>
            <CCardHeader>
              Menus <small className="text-muted"> Table</small>
              <div className="card-header-actions">
                <CButton type="button"
                  onClick={() => history.push(`/menus/add`)}
                  block color="primary">Add Menü</CButton>
              </div>
            </CCardHeader>
            {errorMsg && <CAlert color="warning">
              {errorMsg}
            </CAlert>}
            <CCardBody>
              <CDataTable
                items={menüsData}
                fields={[
                  { key: 'text', _classes: 'font-weight-bold' },
                  "link", 'order', "parentId",
                ]}
                hover
                striped
                //itemsPerPage={perPage}
                //activePage={page}
                clickableRows
                onRowClick={item => handleMenu(item._id)}
                scopedSlots={{
                  "isActive":
                    (item) => (
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

export default Menus
