import React, { useState, useEffect } from "react";
import { useHistory, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getSliders,getOneSlider } from "src/actions/slider.action";
import {
  CBadge,
  CCard,
  CButton,
  CCardBody,
  CCardHeader,
  CCol,
  CDataTable,
  CRow,
  CPagination,
  CAlert,
} from "@coreui/react";



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
const Sliders = () => {
  const history = useHistory()
  const queryPage = useLocation().search.match(/page=([0-9]+)/, '')
  const currentPage = Number(queryPage && queryPage[1] ? queryPage[1] : 1)
  const [page, setPage] = useState(currentPage)
  const [errorMsg, seterrorMsg] = useState("")
  const paginationData = useSelector(state => state.pagination)
  const sliderData = useSelector(state => state.slider.sliderList)
  const dispatch = useDispatch()

  const perPage = 10;
  const pageNum = paginationData ? paginationData.page : 1;
  

  const pageChange = newPage => {
    currentPage !== newPage && history.push(`/slider?page=${newPage}`);
    dispatch(getSliders(perPage, newPage))
  }

  useEffect(() => {
    dispatch(getSliders(perPage, page))
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
    currentPage !== page && setPage(currentPage);
  }, [currentPage, page]);

  console.log(sliderData);

  const handleSlider =(id)=>{
    dispatch(getOneSlider(id))
    .then(res => {
      if (res === 200) {
        history.push(`/slider/${id}`)
      }
    })
  }
  return (
    <>
       <CRow>
        <CCol xl={9}>
          <CCard>
            <CCardHeader>
              Sliders
              <small className="text-muted"> Datas</small>
              <div className="card-header-actions">
                <CButton type="button"
                  onClick={() => history.push(`/slider/add`)}
                  block color="primary">Add Slider</CButton>
              </div>
            </CCardHeader>
            {errorMsg && <CAlert color="warning">
              {errorMsg}
            </CAlert>}
            <CCardBody>
              <CDataTable
                items={sliderData}
                fields={[
                  { key: "title", _classes: "font-weight-bold" },
                  "subtitle",
                  "order",
                  "buttonText",
                  "url",
                  "isActive"
                ]}
                hover
                striped
                // itemsPerPage={5}
                //activePage={page}
                clickableRows
                onRowClick={(item) => handleSlider(item._id)}
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
                activePage={page}
                onActivePageChange={pageChange}
                pages={pageNum}
                // doubleArrows={false}
                align="center"
              />
              }
            </CCardBody>
          </CCard>
        </CCol>
      </CRow>
    </>
  );
};

export default Sliders;
