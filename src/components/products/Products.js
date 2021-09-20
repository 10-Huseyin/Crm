import React, { useState, useEffect } from "react";
import { useHistory, useLocation } from "react-router-dom";
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
  CInputGroupAppend,
  CInput,
  CSelect,
  CInputGroup,
  CForm,
} from "@coreui/react";
import { freeSet } from '@coreui/icons'
import CIcon from '@coreui/icons-react';

import {
  Table,
  Button,
  Row,
  Col,
  Modal,
  Form,
  Badge,
  InputGroup,
  FormControl,
  ListGroup,
} from "react-bootstrap";
import { getProducts, getOneProduct, getAllProducts, getQueryProducts } from "src/actions/product.action";
import { useDispatch, useSelector } from "react-redux";

const getBadge = (status) => {
  switch (status) {
    case true:
      return "success";
    case false:
      return "secondary";
    case "Pending":
      return "warning";
    case "Banned":
      return "danger";
    default:
      return "primary";
  }
};

const getActive = (status) => {
  switch (status) {
    case true:
      return "Active";
    case false:
      return "Inactive";
    case "Pending":
      return "Pending";
    case "Banned":
      return "Banned";
    default:
      return "primary";
  }
};

const Products = () => {
  const history = useHistory();
  const queryPage = useLocation().search.match(/page=([0-9]+)/, "");
  const currentPage = Number(queryPage && queryPage[1] ? queryPage[1] : 1);
  const [page, setPage] = useState(currentPage);
  const [errorMsg, seterrorMsg] = useState("");
  const paginationData = useSelector((state) => state.pagination);
  const productsData = useSelector((state) => state.products.productList);
  const [realTimeProduct, setRealTimeProduct] = useState(productsData)
  const allProductsData = useSelector((state) => state.products.allProductList);

  const [filteredValue, setfilteredValue] = useState({
    title: "",
    isActive: true,
  });

  const dispatch = useDispatch();

  const perPage = 10;
  const pageNum = paginationData ? paginationData.page : 1;
  //console.log(pageNum)

  const pageChange = (newPage) => {
    currentPage !== newPage && history.push(`/products?page=${newPage}`);
    dispatch(getProducts(perPage, newPage));
  };

  useEffect(() => {
    handleAllProducts();
  }, [currentPage, page]);

  function handleAllProducts() {
    dispatch(getAllProducts(perPage, page)).then((res) => {
      if (res !== 200) {
        seterrorMsg("An error occured when data is triggered!");
      } else if (res === 200) {
        seterrorMsg("");
      }
      setTimeout(() => {
        seterrorMsg("");
      }, 3000);
    });
    currentPage !== page && setPage(currentPage);
  }

  const handleSearch = () => {
    if (filteredValue.title) {
      dispatch(getProducts(perPage, page, filteredValue)).then((res) => {
        if (res !== 200) {
          seterrorMsg("An error occured when data is triggered!");
        } else if (res === 200) {
          seterrorMsg("");
        }
        setTimeout(() => {
          seterrorMsg("");
        }, 3000);
      });
    } else {
      handleAllProducts()
    }
  }

  const handleOneProduct = (id) => {
    dispatch(getOneProduct(id)).then((res) => {
      if (res === 200) {
        history.push(`/products/${id}`);
      }
    });
  };

  function handleFilterInput(e) {
    setfilteredValue({ ...filteredValue, title: e.target.value });
    if (e.target.value === "") {
      handleAllProducts();
    }
  }

  const handleClearSearch = () => {
    setfilteredValue({ isActive: true, title: "" });
    handleAllProducts();
  }

  console.log(productsData);
  console.log("filtered value==>>", filteredValue);
  return (
    <>
      <CRow>
        <CCol xl={9}>
          <CCard>
            <CCardHeader>
              Products <small className="text-muted"> Table</small>
              <div className="card-header-actions">
                <CButton
                  type="button"
                  onClick={() => history.push(`/products/add`)}
                  block
                  color="primary"
                >
                  Add Product
                </CButton>
              </div>
            </CCardHeader>
            {errorMsg && <CAlert color="warning">{errorMsg}</CAlert>}
            <CCardBody>
              <CInputGroup style={{ paddingBottom: "15px" }}>
                <CInput id="productsData"
                  type="text"
                  placeholder="Product..."
                  name="product"
                  list="productsSelect"
                  value={filteredValue.title}
                  onChange={handleFilterInput}
                />
                <CInputGroupAppend>
                  <CButton onClick={handleSearch} type="button" color="primary" className="d-flex align-items-center" disabled={filteredValue.title ? false : true} ><CIcon size="sm" className="m-0 mx-2" content={freeSet.cilSearch} />Search</CButton>
                  <CButton onClick={handleClearSearch} type="button" color="secondary" className="d-flex align-items-center" ><CIcon size="sm" className="m-0 mx-2" content={freeSet.cilDelete} />Clear</CButton>
                </CInputGroupAppend>
              </CInputGroup>
              <CDataTable
                //columnFilter
                //tableFilter
                hover
                sorter
                items={productsData}
                fields={[
                  { key: "title", _classes: "font-weight-bold" },
                  "shortDescription",
                  "isActive",
                ]}
                striped
                //itemsPerPage={perPage}
                //activePage={page}
                clickableRows
                onRowClick={(item) => handleOneProduct(item._id)}
                scopedSlots={{
                  isActive: (item) => (
                    <td>
                      <CBadge color={getBadge(item.isActive)}>
                        {getActive(item.isActive)}
                      </CBadge>
                    </td>
                  ),
                }}
              />
              {pageNum > 1 && (
                <CPagination
                  align="center"
                  activePage={page}
                  pages={pageNum}
                  onActivePageChange={pageChange}
                />
              )}
            </CCardBody>
          </CCard>
        </CCol>
      </CRow>
    </>
  );
};

export default Products;
