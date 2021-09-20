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
  CSelect,
  CInputGroup,
  CForm,
} from "@coreui/react";
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
import { getProducts, getOneProduct,getAllProducts,getQueryProducts } from "src/actions/product.action";
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
  console.log(productsData);

  const[realTimeProduct,setRealTimeProduct]=useState(productsData)

  const allProductsData = useSelector((state) => state.products.allProductList);
  console.log('allProductsData=>'+ allProductsData);


  const [filteredValue, setfilteredValue] = useState({
    title: "",
   isActive:true,
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
  dispatch(getAllProducts()).then((res)=>console.log(res))
},[filteredValue])

  useEffect(() => {
    
    dispatch(getProducts(perPage, page,filteredValue)).then((res) => {
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
  }, [currentPage, page,filteredValue]);

  const handleProduct = (id) => {
    dispatch(getOneProduct(id)).then((res) => {
      if (res === 200) {
        history.push(`/products/${id}`);
      }
    });
  };
  function onFilterValue(e) {
    console.log('event=>>>'+e.target.name+" ---- "+e.target.value);
 
      setfilteredValue({
        ...filteredValue,
        title: e.target.value,
        
       });
      //  console.log("filtered value==>>"+filteredValue);
      //  dispatch(getQueryProducts(filteredValue))
      //           .then((res)=>console.log("RES "+res))
      //  setRealTimeProduct(allProductsData)
      //  setPage(1);
    
   }
   console.log("filtered value==>>",filteredValue);
  //console.log(errorMsg)
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
              <InputGroup className="mb-2">
                <FormControl
                  id="productsData"
                  type="text"
                  placeholder="Select Product..."
                  name="product"
                  list="productsSelect"
                  size="sm"
                  onChange={onFilterValue}
                />
                <datalist id="productsSelect">
                  {allProductsData &&
                    allProductsData.map((item, index) => {
                      return (
                        <option key={index} value={item.title}>
                          {item.title}
                        </option>
                      );
                    })}
                </datalist>
                {/* <InputGroup.Text
            //onClick={onFilterPageClear}
            style={{ cursor: "pointer" }}
            title="Clear"
          >
            <i className="fa fa-times" aria-hidden="true"> X </i>
          </InputGroup.Text> */}
              </InputGroup>
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
                onRowClick={(item) => handleProduct(item._id)}
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
