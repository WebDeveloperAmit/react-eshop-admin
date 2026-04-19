import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { RiDeleteBack2Fill } from "react-icons/ri";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import Swal from "sweetalert2";
import Loader from "../../components/loader/Loader";
import { hideLoader, showLoader } from "../../redux/slices/loaderSlice";
import { deleteBrandService, getAllBrandsService } from "../../services/brandService";

const AllBrands = () => {

  const { t } = useTranslation();
  const dispatch = useDispatch();

  const loading = useSelector((state) => state.loader.loading);
  
  const [brands, setBrands] = useState([]);
  const [allBrands, setAllBrands] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {

    const fetchBrands = async () => {

      try {
        dispatch(showLoader());

        const response = await getAllBrandsService();

        if (response?.status === "success") {
            setTimeout(() => {
              dispatch(hideLoader());
              setBrands(response.brand);
              setAllBrands(response.brand);
            }, 500);
        } else {
          dispatch(hideLoader());
          toast.error(response?.message);
        }
      } catch (error) {
        dispatch(hideLoader());
        console.error("Error fetching brands:", error);
        toast.error(error.message);
      } 
    }

    fetchBrands();

  }, [dispatch]);


  const handleSearch = (e) => {
    e.preventDefault();

    if (!search.trim()) {
      toast.warning("Please enter a search term");
      return;
    }
    
    const filteredBrands = allBrands.filter((brand) =>
      brand.brand_name.toLowerCase().includes(search.toLowerCase())
    );

    setBrands(filteredBrands);

  }

  const handleDelete = async (brandId) => {

    if (!brandId) {
      toast.error(t('invalid_brand_id'));
      return;
    }

    const result = await Swal.fire({
      title: t("are_you_sure"),
      text: t("brand_will_be_deleted"),
      icon: "warning",
      customClass: {
          popup: "swal-large",
          title: "swal-title",
          htmlContainer: "swal-text",
          confirmButton: "swal-btn",
          cancelButton: "swal-btn"
      },
      showCancelButton: true,
      confirmButtonText: t("yes_delete"),
      cancelButtonText: t("cancel")
    });

    if (!result.isConfirmed) {
      return;
    }

    try {
      dispatch(showLoader());

      const response = await deleteBrandService(brandId);

      if (response?.status === "success") {
        setTimeout(() => {
          
          dispatch(hideLoader());
          toast.success(response?.message);

          setBrands(brands.filter(brand => brand._id !== brandId));

          setAllBrands(allBrands.filter(brand => brand._id !== brandId));

        }, 1000);
      } else {
        dispatch(hideLoader());
        toast.error(response?.message || "Failed to delete brand");
      }
    } catch (error) {
      dispatch(hideLoader());
      console.error("Error deleting brand:", error);
      toast.error(error.message);
    }

  }

  return (
    <div className="main-content-inner">
      <div className="main-content-wrap">
        <div className="flex items-center flex-wrap justify-between gap20 mb-27">
          <h3>{ t('brand_list') }</h3>
          <ul className="breadcrumbs flex items-center flex-wrap justify-start gap10">
            <li>
              <Link to="/">
                <div className="text-tiny">{ t('dashboard') }</div>
              </Link>
            </li>
            <li>
              <i className="icon-chevron-right" />
            </li>
            <li>
              <div className="text-tiny">{ t('brands') }</div>
            </li>
          </ul>
        </div>
        <div className="wg-box">
          <div className="flex items-center justify-between gap10 flex-wrap">
            <div className="wg-filter flex-grow">

              <form 
              className="form-search" 
              onSubmit={handleSearch}>
                <fieldset className="name">
                  <input 
                  type="text" 
                  placeholder={ t('search_here') } 
                  name="search" 
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
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
                    setBrands(allBrands);
                  }}>
                    <RiDeleteBack2Fill size={26} />
                  </span>
                )
              }
              
            </div>

            <Link 
            className="tf-button style-1 w208" 
            to="/brand/create"><i className="icon-plus" />{ t('add_new_brand') }</Link>
          </div>

          { loading && <Loader /> }

          {/* <div className="wg-table table-all-user"> */}
            <div className="table-responsive brand_sec">
              <table className="table table-striped table-bordered">
                <thead>
                  <tr>
                    <th># { t('sl_no') }</th>
                    <th>{ t('brand_image') }</th>
                    <th>{ t('brand_name') }</th>
                    <th>{ t('brand_slug') }</th>
                    <th>{ t('created_at') }</th>
                    <th>{ t('updated_at') }</th>
                    <th>{ t('actions') }</th>
                  </tr>
                </thead>
                <tbody>

                  {brands && brands.length > 0 ? (

                    brands.map((brand, index) => (

                    <tr key={index}>
                      <td>{index + 1}</td>
                      <td>
                        <div className="brand_image">
                          <img 
                          src={`${process.env.REACT_APP_BACKEND_URL}/${brand.brand_image_url}`} 
                          alt={brand.brand_name} 
                          className="image" 
                          />
                        </div>
                      </td>

                      <td>{brand.brand_name}</td>
                      <td>{brand.brand_slug}</td>

                      <td>
                        {brand.createdAt 
                        ? new Date(brand.createdAt).toLocaleString("en-IN", {
                            year: "numeric",
                            month: "long",
                            day: "numeric",
                            hour: "numeric",
                            minute: "2-digit",
                            second: "2-digit",
                            hour12: true
                        })
                        : "N/A"}
                      </td>

                      <td>
                          {brand.updatedAt 
                          ? new Date(brand.updatedAt).toLocaleString("en-IN", {
                              year: "numeric",
                              month: "long",
                              day: "numeric",
                              hour: "numeric",
                              minute: "2-digit",
                              second: "2-digit",
                              hour12: true
                          })
                          : "N/A"}
                      </td>

                      <td>
                        <div className="list-icon-function">

                          <Link to={`/brand/${brand._id}/edit`}>
                            <div className="item edit">
                              <i className="icon-edit-3" />
                            </div>
                          </Link>

                            <div 
                            className="item text-danger delete"
                            onClick={() => handleDelete(brand._id)}
                            >
                              <i className="icon-trash-2" />
                            </div>

                        </div>

                      </td>

                    </tr>

                    ))

                  ) : (
                    <tr>
                      <td colSpan="7" className="text-center">No brands found</td>
                    </tr>
                  )}
                </tbody>
              </table>

            </div>
            <div className="divider" />
            <div className="flex items-center justify-between flex-wrap gap10 wgp-pagination">
            </div>
          {/* </div> */}
        </div>
      </div>
    </div>

  )
}

export default AllBrands