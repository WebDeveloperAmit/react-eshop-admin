import { useEffect, useState } from "react";
import { Badge } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import { RiDeleteBack2Fill } from "react-icons/ri";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router";
import { toast } from "react-toastify";
import Swal from "sweetalert2";
import Loader from "../../components/loader/Loader";
import { hideLoader, showLoader } from "../../redux/slices/loaderSlice";
import { deleteProductService, getAllProductsService, searchProductService } from "../../services/productService";

const AllProducts = () => {

  const {t} = useTranslation();
  const dispatch = useDispatch();
  const loader = useSelector((loader) => loader.loader.loading );
  const [displayProducts, setDisplayProducts] = useState([]);
  const [originalProducts, setOriginalProducts] = useState([]);
  const [search, setSearch] = useState("");
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [showModal, setShowModal] = useState(false);


  useEffect(() => {

    const fetchedAllProducts = async () => {
      try {
          dispatch(showLoader());
          const response = await getAllProductsService();
          // console.log(response);
          if (response?.status === "success") {
            setTimeout(() => {
              setDisplayProducts(response?.data);
              setOriginalProducts(response?.data);
              dispatch(hideLoader());
            }, 500)
          } else {
            toast.error(response?.message);
            dispatch(hideLoader());
          }
      } catch (error) {
          toast.error(error?.response?.message);
          dispatch(hideLoader());
      }
    }

    fetchedAllProducts();

  }, [dispatch]);

  const handleProductDelete = async (productId) => {
    try {

      if (!productId) {
        toast.error(t("invalid_product_id"));
        return;
      }

      const result = await Swal.fire({
          title: t("are_you_sure"),
          text: t("product_will_be_deleted"),
          icon: "warning",
          showCancelButton: true,
          confirmButtonColor: "#d33",
          cancelButtonColor: "#3085d6",
          confirmButtonText: t("yes_delete"),
          cancelButtonText: t("cancel")
      });

      if (!result.isConfirmed) return;

      const response = await deleteProductService(productId);

      if (response?.status === "success") {
        toast.success(response?.message);
        setDisplayProducts((prev) => {
          return prev.filter((pro) => pro._id !== productId);
        });
      } else {
        toast.error(response?.message);
      }

    } catch (error) {
      console.error("An error while deleting product:", error);
      toast.error(error.response?.data?.message);
    }

  }

  const handleSearchTerm = (event) => {
    setSearch(event.target.value);
  };

  const handleProductSearch = async (e) => {
    e.preventDefault();

    try {

      if (!search.trim()) {
        toast.warning(t("please_enter_search_term"));
        return;
      }

      dispatch(showLoader());

      const response  = await searchProductService(search);

      if (response?.status === "success") {
        setTimeout(() => {
          setDisplayProducts(response?.data);
          dispatch(hideLoader());
        }, 300);

      } else {
        toast.error(response?.message);
        dispatch(hideLoader());
      }

    } catch (error) {
      console.error("An error while searching product:", error);
      dispatch(hideLoader());
    }

  }

  const handleViewProduct = (product) => {
    setSelectedProduct(product);
    setShowModal(true);
  };


  return (
    <div className="main-content-inner">
      <div className="main-content-wrap">
        <div className="flex items-center flex-wrap justify-between gap20 mb-27">
          <h3>{t("all_products_list")}</h3>
            <ul className="breadcrumbs flex items-center flex-wrap justify-start gap10">
              <li>
                <Link to="/">
                  <div className="text-tiny">{t("dashboard")}</div>
                </Link>
              </li>
              <li>
                <i className="icon-chevron-right" />
              </li>
              <li>
                <div className="text-tiny">{t("all_products")}</div>
              </li>
            </ul>
        </div>
        <div className="wg-box">
          <div className="flex items-center justify-between gap10 flex-wrap">
            <div className="wg-filter flex-grow">
              <form className="form-search" onSubmit={handleProductSearch}>
                <fieldset className="name">
                  <input 
                  type="text" 
                  placeholder={t("search_here")}
                  name="search" 
                  value={search}
                  onChange={handleSearchTerm}
                  />
                </fieldset>
                <div className="button-submit">
                  <button 
                  type="submit">
                    <i className="icon-search" />
                  </button>
                </div>
              </form>
              {
                search && (
                    <span className="delIcon" onClick={() => {
                    setSearch(""); 
                    setDisplayProducts(originalProducts);
                    }}>
                    <RiDeleteBack2Fill size={26} />
                    </span>
                )
              }
            </div>
            <Link 
            className="tf-button style-1 w208" 
            to="/product/create"><i className="icon-plus" />{t("add_new_product")}</Link>
          </div>
          {
            loader && <Loader />
          }
          <div className="table-responsive all_product_table">
            <table className="table table-bordered">
              <thead>
                <tr>
                  <th># {t("sl_no")}</th>
                  <th>{t("thumbnail_image")}</th>
                  <th>{t("name")}</th>
                  <th>{t("sale_price")}</th>
                  <th>{t("sku")}</th>
                  <th>{t("quantity")}</th>
                  <th>{t("stock_status")}</th>
                  <th>{t("stock_quantity")}</th>
                  <th>{t("actions")}</th>
                </tr>
              </thead>
              <tbody>
              {
                displayProducts && displayProducts.length > 0 ? (
                  displayProducts.map((product, index) => (

                    <tr key={index}>

                      <td>{index + 1}</td>

                      <td>
                        <div className="image">
                          <img src={`${process.env.REACT_APP_BACKEND_URL}${product.thumbnail_image_url}`} alt={product.product_name} className="image" />
                        </div>
                      </td>

                      <td>
                        <span className="product_name"
                          onClick={() => handleViewProduct(product)}
                        >
                          {product.product_name}
                        </span>
                      </td>

                      <td>
                        {product.sale_price ? (
                          <>
                            <span className="text-danger fw-bold">
                              {process.env.REACT_APP_CURRENCY_SYMBOL}
                              {Number(product.sale_price).toFixed(2)}
                            </span>

                            <del className="ms-2 text-muted">
                              {process.env.REACT_APP_CURRENCY_SYMBOL}
                              {Number(product.regular_price).toFixed(2)}
                            </del>
                          </>
                        ) : (
                          <>
                            {process.env.REACT_APP_CURRENCY_SYMBOL}
                            {Number(product.regular_price).toFixed(2)}
                          </>
                        )}
                      </td>

                      <td>{product.sku}</td>

                      <td>{product.qty}</td>

                      <td>
                        {product.stock_status === "in-stock" ? (
                          <span className="badge bg-success">In Stock</span>
                        ) : (
                          <span className="badge bg-danger">Out of Stock</span>
                        )}
                      </td>

                      <td></td>

                      <td>
                        <div className="list-icon-function">

                          <Link to={`/product/edit/${product._id}`}>
                            <div className="item edit">
                              <i className="icon-edit-3" />
                            </div>
                          </Link>

                          <div 
                          className="item text-danger delete"
                          onClick={() => handleProductDelete(product._id)}
                          >
                            <i className="icon-trash-2" />
                          </div>
                          
                        </div>
                      </td>

                    </tr>
                  ))
                ) : (
                    <tr>
                      <td colSpan="6">
                        <div className="d-flex justify-content-center align-items-center py-2">
                          <p className="mb-0 fw-semibold text-muted">
                            {t("no_products_found")}
                          </p>
                        </div>
                      </td>
                    </tr>
                )
              }
              </tbody>
            </table>

            {showModal && selectedProduct && (
              <div className="pro-modal-overlay" onClick={() => setShowModal(false)}>
                
                <div 
                  className="pro-modal"
                  onClick={(e) => e.stopPropagation()}
                >
                  
                  <div className="pro-modal-header">
                    <h4>
                      {selectedProduct.product_name} {" "}
                        <Badge bg={selectedProduct.is_featured === true ? "success" : "secondary"}>
                          {selectedProduct.is_featured === true ? "Featured" : ""}
                        </Badge>
                    </h4>
                    <button 
                      className="close-btn"
                      onClick={() => setShowModal(false)}
                    >
                      ✕
                    </button>
                  </div>

                  <div className="pro-modal-body">

                    <div className="pro-left-section">

                      <div className="pro-image-section">
                        <img 
                          src={`${process.env.REACT_APP_BACKEND_URL}${selectedProduct.thumbnail_image_url}`}
                          alt={selectedProduct.product_name}
                        />

                        {selectedProduct.sale_price && (
                          <span className="sale-badge">SALE</span>
                        )}
                      </div>

                      <div className="pro-gallery-image-section">
                        {selectedProduct.galleries && selectedProduct.galleries.length > 0 && (
                          <div className="gallery-wrapper">
                            {selectedProduct.galleries.map((img, index) => (
                              <img
                                key={index}
                                src={`${process.env.REACT_APP_BACKEND_URL}${img.image_url}`}
                                alt="gallery"
                              />
                            ))}
                          </div>
                        )}
                      </div>

                  </div>

                    {/* RIGHT SIDE DETAILS */}
                    <div className="pro-details-section">

                      <div className="price-section">
                        {selectedProduct.sale_price ? (
                          <>
                            <span className="sale-price">
                              {process.env.REACT_APP_CURRENCY_SYMBOL}
                              {selectedProduct.sale_price}
                            </span>
                            <span className="regular-price">
                              {process.env.REACT_APP_CURRENCY_SYMBOL}
                              {selectedProduct.regular_price}
                            </span>
                          </>
                        ) : (
                          <span className="normal-price">
                            {process.env.REACT_APP_CURRENCY_SYMBOL}
                            {selectedProduct.regular_price}
                          </span>
                        )}
                      </div>

                      <div className="meta">
                        <p><strong>SKU:</strong> {selectedProduct.sku}</p>
                        <p><strong>Stock:</strong> {selectedProduct.stock_status}</p>
                        <p><strong>Qty:</strong> {selectedProduct.qty}</p>
                        <p>
                          <strong>Stock:</strong>{" "}
                          <Badge bg={selectedProduct.stock_status === "in_stock" ? "success" : "secondary"}>
                            {selectedProduct.stock_status}
                          </Badge>
                        </p>
                        <p>
                          <strong>Category:</strong> {" "}
                            { selectedProduct.category_name ?? "N/A" }
                        </p>
                        <p>
                          <strong>Brand:</strong> {" "}
                            { selectedProduct.brand_name ?? "N/A" }
                        </p>
                      </div>

                      <div className="description-box">
                        <p className="short_desc">Short Description:</p>
                        <div dangerouslySetInnerHTML={{ 
                            __html: selectedProduct.short_desc 
                          }} 
                        />
                      </div>

                      <div className="description-box">
                        <p className="long_desc">Long Description:</p>
                        <div dangerouslySetInnerHTML={{ 
                            __html: selectedProduct.long_desc 
                          }} 
                        />
                      </div>

                    </div>

                  </div>

                </div>
              </div>
            )}

          </div>
          <div className="divider" />
          <div className="flex items-center justify-between flex-wrap gap10 wgp-pagination">
          </div>
        </div>
      </div>
    </div>
  )
}

export default AllProducts