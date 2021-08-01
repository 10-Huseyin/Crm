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
import { getMessages, getOneMessage } from 'src/actions/messages.action'
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

const Messages = () => {
  const history = useHistory()
  const queryPage = useLocation().search.match(/page=([0-9]+)/, '')
  const currentPage = Number(queryPage && queryPage[1] ? queryPage[1] : 1)
  const [page, setPage] = useState(currentPage)
  const [errorMsg, seterrorMsg] = useState("")
  const paginationData = useSelector(state => state.pagination)
  const messagesData = useSelector(state => state.messages.messageList)
  const dispatch = useDispatch()

  const perPage = 10;
  const pageNum = paginationData ? paginationData.page : 1;
  //console.log(pageNum)

  const pageChange = newPage => {
    currentPage !== newPage && history.push(`/messages?page=${newPage}`);
    dispatch(getMessages(perPage, newPage))
  }

  useEffect(() => {
    dispatch(getMessages(perPage, page))
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

const handleMessage =(id)=>{
  dispatch(getOneMessage(id))
  .then(res => {
    if (res === 200) {
      history.push(`/messages/${id}`)
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
              Messages <small className="text-muted"> Table</small>
              <div className="card-header-actions">
                <CButton type="button"
                  onClick={() => history.push(`/messages/add`)}
                  block color="primary">Add Message</CButton>
              </div>
            </CCardHeader>
            {errorMsg && <CAlert color="warning">
              {errorMsg}
            </CAlert>}
            <CCardBody>
              <CDataTable
                items={messagesData}
                fields={[
                  { key: 'firstname', _classes: 'font-weight-bold' },
                   "lastname", "subject", "content", "email", "phoneNumber", "isRead",
                ]}
                hover
                striped
                //itemsPerPage={perPage}
                //activePage={page}
                clickableRows
                onRowClick={item => handleMessage(item._id)}
                scopedSlots={{
                  "isRead":
                    (item) => (
                      <td>
                        <CBadge color={getBadge(item.isRead)}>
                          {getActive(item.isRead)}
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

export default Messages
