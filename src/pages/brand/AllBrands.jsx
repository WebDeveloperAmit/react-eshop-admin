import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import Loader from "../../components/loader/Loader";
import { hideLoader, showLoader } from "../../redux/slices/loaderSlice";
import { getAllBrandsService } from "../../services/brandService";

const AllBrands = () => {

  const dispatch = useDispatch();
  const loading = useSelector((state) => state.loader.loading);
  const [brands, setBrands] = useState([]);

  useEffect(() => {
    const fetchBrands = async () => {
      try {
        dispatch(showLoader());
        const response =  await getAllBrandsService();
        if (response?.status === "success") {
          setBrands(response?.brand);
        } else {
          toast.error(response?.message);
        }
      } catch (error) {
        console.error("Error fetching brands:", error);
        toast.error("Failed to fetch brands");
      } finally {
        dispatch(hideLoader());
      }
    }
    fetchBrands();
  }, [dispatch]);

  return (
    <div className="main-content-inner">
      <div className="main-content-wrap">
        <div className="flex items-center flex-wrap justify-between gap20 mb-27">
          <h3>All Brands List</h3>
          <ul className="breadcrumbs flex items-center flex-wrap justify-start gap10">
            <li>
              <Link to="/">
                <div className="text-tiny">Dashboard</div>
              </Link>
            </li>
            <li>
              <i className="icon-chevron-right" />
            </li>
            <li>
              <div className="text-tiny">Brands</div>
            </li>
          </ul>
        </div>
        <div className="wg-box">
          <div className="flex items-center justify-between gap10 flex-wrap">
            <div className="wg-filter flex-grow">
              <form className="form-search">
                <fieldset className="name">
                  <input 
                  type="text" 
                  placeholder="Search here..." 
                  name="search" 
                  />
                </fieldset>
                <div className="button-submit">
                  <button 
                  className="" 
                  type="submit"><i className="icon-search" /></button>
                </div>
              </form>
            </div>
            <Link 
            className="tf-button style-1 w208" 
            to="/brand/create"><i className="icon-plus" />Add new brand</Link>
          </div>
          { loading && <Loader /> }
          <div className="wg-table table-all-user">
            <div className="table-responsive">
              <table className="table table-striped table-bordered">
                <thead>
                  <tr>
                    <th>SL. NO</th>
                    <th>Name</th>
                    <th>Slug</th>
                    <th>Image</th>
                    <th>Created At</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {brands && brands.length > 0 ? (
                    brands.map((brand, index) => (
                    <tr key={index}>
                      <td>{index + 1}</td>
                      <td>{brand.brand_name}</td>
                      <td>{brand.brand_slug}</td>
                      <td className="pname">
                        <div className="image">
                          <img src={`${process.env.REACT_APP_BACKEND_URL}/${brand.brand_image_url}`} alt={brand.brand_name} className="image" />
                        </div>
                      </td>
                      <td>{new Date(brand.createdAt).toLocaleString()}</td>
                      <td>
                        <div className="list-icon-function">
                          <Link to="#">
                            <div className="item edit">
                              <i className="icon-edit-3" />
                            </div>
                          </Link>
                          <form action="#" method="POST">
                            <div className="item text-danger delete">
                              <i className="icon-trash-2" />
                            </div>
                          </form>
                        </div>
                      </td>
                    </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="6" className="text-center">No brands found</td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
            <div className="divider" />
            <div className="flex items-center justify-between flex-wrap gap10 wgp-pagination">
            </div>
          </div>
        </div>
      </div>
    </div>

  )
}

export default AllBrands