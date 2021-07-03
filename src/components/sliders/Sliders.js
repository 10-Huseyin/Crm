import React, { useState, useEffect } from "react";
import { useHistory, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

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
} from "@coreui/react";

import { getSlider } from "src/actions/slider.action";

const Sliders = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const { sliderList } = useSelector((state) => state.slider);

  const { pagenationInfo } = useSelector((state) => state.slider);
  console.log("pagenationInfo:",pagenationInfo);

  const queryPage = useLocation().search.match(/page=([0-9]+)/, "");
  console.log(queryPage);
  
  const currentPage = Number(queryPage && queryPage[1] ? queryPage[1] : 1);
  console.log(currentPage);

  const [page, setPage] = useState(currentPage);

  //const [sliders, setSliders] = useState([]);

  const pageChange = (newPage) => {
    currentPage !== newPage && history.push(`/sliders/?limit=3&page=${newPage}`);
  };

  useEffect(() => {
    dispatch(getSlider());
    currentPage !== page && setPage(currentPage);
  }, [currentPage, page]);

  console.log(sliderList);
 
  return (
    <>
      <CButton
        onClick={() => history.push(`/sliders/add`)}
        block
        color="primary"
      >
        Add Slider
      </CButton>
      <CRow>
        <CCol xl={12}>
          <CCard>
            <CCardHeader>
              Sliders
              <small className="text-muted"> example</small>
            </CCardHeader>
            <CCardBody>
              <CDataTable
                items={sliderList}
                fields={[
                  { key: "title", _classes: "font-weight-bold" },
                  "subtitle",
                  "order",
                  "buttonText",
                  "url",
                ]}
                hover
                striped
                // itemsPerPage={5}
                activePage={page}
                clickableRows
                onRowClick={(item) => history.push(`/sliders/${item._id}`)}
              />
              <CPagination
                activePage={page}
                onActivePageChange={pageChange}
                pages={pagenationInfo.pages}
                doubleArrows={false}
                align="center"
              />
            </CCardBody>
          </CCard>
        </CCol>
      </CRow>
    </>
  );
};

export default Sliders;
