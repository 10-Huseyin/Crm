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
  CPagination
} from '@coreui/react'
import { getUsers } from 'src/actions/user.action'
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

const Users = () => {
  const history = useHistory()
  const queryPage = useLocation().search.match(/page=([0-9]+)/, '')
  const currentPage = Number(queryPage && queryPage[1] ? queryPage[1] : 1)
  const [page, setPage] = useState(currentPage)

  const paginationData = useSelector(state => state.pagination)
  const usersData = useSelector(state => state.users.userList)
  const dispatch = useDispatch()
  //console.log(message)

  const perPage = 10;
  const pageNum = paginationData ? paginationData.page : 1;
  //console.log(pageNum)

  const pageChange = newPage => {
    currentPage !== newPage && history.push(`/users?page=${newPage}`);
    dispatch(getUsers(perPage,newPage))
  }

  useEffect(() => {
    dispatch(getUsers(perPage,page))
    
    currentPage !== page && setPage(currentPage)
  }, [currentPage, page])

  return (
    <CRow>
      <CCol xl={9}>
        <CCard>
          <CCardHeader>
            Users
            <small className="text-muted"> example</small>
          </CCardHeader>
          <CCardBody>
          <CDataTable
            items={usersData}
            fields={[
              { key: 'firstname', _classes: 'font-weight-bold' },
              "lastname", "email", "isActive", 'role'
            ]}
            hover
            striped
            //itemsPerPage={perPage}
            //activePage={page}
            clickableRows
            onRowClick={(item) => history.push(`/users/${item._id}`)}
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
  )
}

export default Users
