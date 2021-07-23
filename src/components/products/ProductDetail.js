import React, { useState } from 'react'
import {
  CButton,
  CCard,
  CCardBody,
  CCardFooter,
  CCardHeader,
  CCol,
  CForm,
  CFormGroup,
  CInputGroup,
  CInputGroupAppend,
  CInputGroupPrepend,
  CInputGroupText,
  CInput,
  CInputFile,
  CSwitch,
  CLabel,
  CModal,
  CModalHeader,
  CModalTitle,
  CModalBody,
  CModalFooter,
  CAlert,
  CRow,
  CImg
} from '@coreui/react'
import CIcon from '@coreui/icons-react';
import '@coreui/icons/css/all.css';
import { freeSet } from '@coreui/icons'

import { useDispatch, useSelector } from "react-redux";
import { addNewProduct, editProductData, deleteProduct } from "../../actions/product.action";

const initialState = {
  title: "",
  shortDescription: "",
  content: "",
  order: 0,
  buttonText: "",
  mediaId: {},
  alt: "",
  mediaName:"",
  isActive: true,
  isBlog: false,
  isDeleted: false,
  isHomePage: false,
  isAboveFooter: false,
};

const ProductDetail = (props) => {
  const [modal, setModal] = useState(true)
  const [danger, setWarning] = useState(false)

  const dispatch = useDispatch();
  const message = useSelector(state => state.message)
  const error = useSelector(state => state.error)
  //const productsData = useSelector(state => state.products.productList)
  
  const productData = useSelector(state => state.products.product)
  const product = productData && props.match.params.id ? productData : initialState;
  const [state, setState] = useState(product)
  const [uploadMessage, setUploadMessage] = useState("");

  // useEffect(() => {
  //   console.log("useeffect içinde, en başta")
  //   dispatch(getOneProduct(props.match.params.id))
  //   .then(res => {
  //     if (res === 200) {
  //       console.log("useffect if içinde")
  //       product !== state && setState(product)
  //     }
  //   })
     
  // },[])

  const onChangePhoto = (e) => {
    console.log(e.target.files);
    setState({ ...state, mediaName:e.target.files[0].name, mediaId: e.target.files[0] });
    setUploadMessage("Media selected succesfully!")
  };

  const handleInput = (e) => {
    setState({ ...state, [e.target.name]: e.target.value })
  }
  const handleSwitch = (e) => {
    setState({ ...state, [e.target.name]: e.target.checked })
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    const fd = new FormData();
    if (state.mediaId.name) {
      fd.set("mediaId", state.mediaId, state.mediaId.title);
    }
    fd.set("title", state.title);
    fd.set("shortDescription", state.shortDescription);
    fd.set("content", state.content);
    fd.set("buttonText", state.buttonText);
    fd.set("order", state.order);
    fd.set("alt", state.alt);
    fd.set("isActive", state.isActive);
    fd.set("isBlog", state.isBlog);
    fd.set("isHomePage", state.isHomePage);
    fd.set("isAboveFooter", state.isAboveFooter);
    fd.set("isDeleted", state.isDeleted);

    props.match.params.id ?
      dispatch(editProductData(fd, props.match.params.id))
        .then(res => {
          if (res === 200) {
            getDefaults()
          }
        })
      :
      dispatch(addNewProduct(fd))
        .then(res => {
          if (res === 200) {
            getDefaults()
          }
        })
  };

  const deleteProductData = (event) => {
    event.preventDefault();
    dispatch(deleteProduct(state._id))
      .then(res => {
        if (res === 200) {
          getDefaults()
        }
      })
  };
  const getDefaults = () => {
    resetForm();
    setWarning(!danger)
    setTimeout(() => {
      setModal(false)
      props.history.push("/products");
    }, 2000);
  }


  function resetForm () {
    props.match.params.id?
    setState(productData)
    :
    setState(initialState)
    
  }


  //console.log("return den hemen önce")
  //console.log(initialState);
  //console.log(productData);
  console.log(state, message, error);
  //console.log(props.match.params.id )
  return (
    <CRow>
      <CCol xs="12" md="12">
        {
          state &&
          <CCard>
            <CCardHeader>
              {props.match.params.id ? "PRODUCT DETAIL FORM" : "ADD NEW PRODUCT"}
            </CCardHeader>
            <CCardBody>
              <CForm onSubmit={handleSubmit} encType="multipart/form-data" className="form-horizontal">
                <CFormGroup row>
                  <CCol md="2">
                    <CLabel htmlFor="producttitle">Title</CLabel>
                  </CCol>
                  <CCol xs="12" md="9">
                    <CInput onChange={handleInput} value={state.title} id="producttitle" name="title" placeholder="Product Title" required />
                  </CCol>
                </CFormGroup>
                <CFormGroup row>
                  <CCol md="2">
                    <CLabel htmlFor="productshortDescription">Short Description</CLabel>
                  </CCol>
                  <CCol xs="12" md="9">
                    <CInput onChange={handleInput} value={state.shortDescription} id="productshortDescription" name="shortDescription" placeholder="Product Short Description" required />
                  </CCol>
                </CFormGroup>
                <CFormGroup row>
                  <CCol md="2">
                    <CLabel htmlFor="productcontent">Content</CLabel>
                  </CCol>
                  <CCol xs="12" md="9">
                    <CInput onChange={handleInput} value={state.content} id="productcontent" name="content" placeholder="Product Content" required />
                  </CCol>
                </CFormGroup>
                <CFormGroup row>
                  <CCol md="2">
                    <CLabel htmlFor="productorder">Order </CLabel>
                  </CCol>
                  <CCol xs="12" md="9">
                    <CInput onChange={handleInput} value={state.order} id="productorder" name="order" placeholder="Product Order" type="number" disabled />
                  </CCol>
                </CFormGroup>
                <CFormGroup row>
                  <CCol md="2">
                    <CLabel htmlFor="buttonText">Button Text </CLabel>
                  </CCol>
                  <CCol xs="12" md="9">
                    <CInput onChange={handleInput} value={state.buttonText} id="buttonText" name="buttonText" placeholder="Button Text" required />
                  </CCol>
                </CFormGroup>
                <CFormGroup row>
                  <CCol md="2">
                    <CLabel>Active Status</CLabel>
                  </CCol>
                  <CCol sm="9">
                    <CSwitch
                      onChange={handleSwitch}
                      name="isActive"
                      className="mr-1"
                      color="success"
                      variant="opposite"
                      checked={state.isActive}
                    />
                  </CCol>
                </CFormGroup>
                <CFormGroup row>
                  <CCol md="2">
                    <CLabel>Blog</CLabel>
                  </CCol>
                  <CCol sm="9">
                    <CSwitch
                      onChange={handleSwitch}
                      name="isBlog"
                      className="mr-1"
                      color="success"
                      variant="opposite"
                      checked={state.isBlog}
                    />
                  </CCol>
                </CFormGroup>
                <CFormGroup row>
                  <CCol md="2">
                    <CLabel>HomePage</CLabel>
                  </CCol>
                  <CCol sm="9">
                    <CSwitch
                      onChange={handleSwitch}
                      name="isHomePage"
                      className="mr-1"
                      color="success"
                      variant="opposite"
                      checked={state.isHomePage}
                    />
                  </CCol>
                </CFormGroup>
                <CFormGroup row>
                  <CCol md="2">
                    <CLabel>Above Footer</CLabel>
                  </CCol>
                  <CCol sm="9">
                    <CSwitch
                      onChange={handleSwitch}
                      name="isAboveFooter"
                      className="mr-1"
                      color="success"
                      variant="opposite"
                      checked={state.isAboveFooter}
                    />
                  </CCol>
                </CFormGroup>
                <CFormGroup row>
                  <CCol md="2">
                    <CLabel>Add Product Media</CLabel>
                  </CCol>
                  <CCol xs="12" md="9">
                    <CInputFile onChange={onChangePhoto} custom id="custom-file-input" required />
                    <CLabel htmlFor="custom-file-input" variant="custom-file">
                      {state.mediaName ? state.mediaName : "Choose file..."}
                    </CLabel>
                    <span className="ml-2">{uploadMessage}</span>
                  </CCol>
                </CFormGroup>
                <CFormGroup row>
                  <CCol md="2">
                    <CLabel htmlFor="productMediaAlt">Media Alt</CLabel>
                  </CCol>
                  <CCol xs="12" md="9">
                    <CInput onChange={handleInput} value={state.alt} id="productMediaAlt" name="alt" placeholder="Product Media Alt" />
                  </CCol>
                </CFormGroup>
                <CFormGroup row>
                  <CCol md="2">
                    <CLabel>Selected Photo</CLabel>
                  </CCol>
                  <CCol xs="12" md="9">
                    <CImg
                      src={state.mediaId && (state.mediaId.name ? URL.createObjectURL(state.mediaId) : state.mediaId.url )}
                      className="c-product-img"
                      alt="product-img"
                      />
                  </CCol>
                </CFormGroup>
              </CForm>
            </CCardBody>
            <CCardFooter>
              <CCol>
              <CButton onClick={resetForm} type="reset" color="warning"><CIcon  content={freeSet.cilReload} /> Reset Form </CButton>
                <CButton onClick={() => props.history.push(`/products`)} type="button" color="secondary"><CIcon name="cil-ban" /> Cancel / Back</CButton>
              </CCol>
              <div className="card-header-actions">
               <CButton onClick={handleSubmit} type="submit" color="primary"><CIcon name="cil-check" /> {props.match.params.id ? "Update Product" : "Add Product"}</CButton>
                {props.match.params.id &&
                  <CButton onClick={() => setWarning(!danger)} type="button" color="danger" className="mr-1">Delete Product <CIcon  content={freeSet.cilDelete}/></CButton>
                }
              </div>
              <CModal 
              show={danger} 
              onClose={() => setWarning(!danger)}
              color="danger"
            >
              <CModalHeader closeButton>
                <CModalTitle>Delete Product</CModalTitle>
              </CModalHeader>
              <CModalBody>
                Are you sure deleting selected product?
              </CModalBody>
              <CModalFooter>
                <CButton color="danger" onClick={deleteProductData}>Delete Product</CButton>{' '}
                <CButton color="secondary" onClick={() => setWarning(!danger)}>Cancel</CButton>
              </CModalFooter>
            </CModal>
            </CCardFooter>
          </CCard>
        }
        {
          (error || message) &&
          <CModal
            show={modal}
            alignment="center"
            onClose={setModal}
          >
            <CModalHeader closeButton>
              <CModalTitle>Add Product</CModalTitle>
            </CModalHeader>
            <CModalBody>
              <CAlert color={error ? "danger" : "success"}>
                {error ? error : message}
              </CAlert>
              {message ? "Redirecting products page!" : ""}
            </CModalBody>
            <CModalFooter>
              <CButton
                color="secondary"
                onClick={() => setModal(false)}
              >Cancel</CButton>
            </CModalFooter>
          </CModal>
        }


      </CCol>
    </CRow>
  )
}

export default ProductDetail
