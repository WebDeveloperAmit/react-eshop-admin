import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { RiDeleteBack2Fill } from "react-icons/ri";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router";
import { toast } from "react-toastify";
import Swal from "sweetalert2";
import Loader from "../../components/loader/Loader";
import { hideLoader, showLoader } from "../../redux/slices/loaderSlice";
import { deleteCategoryService, getAllCategoriesService, searchCategoryService } from "../../services/categoryService";

const AllCategories = () => {

  const { t } = useTranslation();
  const dispatch = useDispatch();
  const loading = useSelector((state) => state.loader.loading);
  const [categories, setCategories] = useState([]);
  const [originalCategories, setOriginalCategories] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        dispatch(showLoader());
        const fetchCategories = await getAllCategoriesService();
        if (fetchCategories?.status === "success") {
          setTimeout(() => {
            setCategories(fetchCategories?.data);
            setOriginalCategories(fetchCategories?.data);
            dispatch(hideLoader());
          }, 500);
        } else {
          toast.error(fetchCategories?.message);
          dispatch(hideLoader());
        }
      } catch (error) {
        toast.error("❌ An error occurred while fetching categories.");
      }
    }
    fetchCategories();
  }, [dispatch]);

  const handleDeleteCategory = async (catId) => {
    try {
      if (!catId) {
        toast.error(t("invalid_category_id"));
        return;
      }

      const result = await Swal.fire({
          title: t("are_you_sure"),
          text: t("category_will_be_deleted"),
          icon: "warning",
          showCancelButton: true,
          confirmButtonColor: "#d33",
          cancelButtonColor: "#3085d6",
          confirmButtonText: t("yes_delete"),
          cancelButtonText: t("cancel")
      });

      if (!result.isConfirmed) return;

      const response = await deleteCategoryService(catId);
      if (response.status === "success") {
        toast.success(response.message);
        setCategories((prev) => {
          return prev.filter((category) => category._id !== catId);
        });
        setOriginalCategories((prev) => {
          return prev.filter((category) => category._id !== catId);
        });
      } else {
        toast.error(response.message);
      }
    } catch (error) {
      console.error("An error occurred while deleting category:", error);
      toast.error("Something went wrong:", error);
    }
  }

  const handleSearch = async (e) => {
    e.preventDefault();
    // console.log(search);
    if (!search.trim()) {
      toast.warning("Please enter a search term");
      return;
    }

    try {
      const response = await searchCategoryService(search);
      if (response?.status === "success") {
        setCategories(response?.data);
      } else {
        toast.error(response?.message || "Search failed");
      }
    } catch (error) {
      console.error("An error while searching category:", error);
      toast.error("Something went wrong");
    }
  }

  return (
    <div className="main-content-inner">
      <div className="main-content-wrap">

        <div className="flex items-center flex-wrap justify-between gap20 mb-27">
          <h3>{t("all_categories_list")}</h3>
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
                <div className="text-tiny">{t("categories")}</div>
              </li>
            </ul>
        </div>

        <div className="wg-box">
          
          <div className="flex items-center justify-between gap10 flex-wrap">
            <div className="wg-filter flex-grow">
              <form className="form-search" onSubmit={handleSearch}>
                <fieldset className="name">
                  <input 
                  type="text" 
                  placeholder={t("search_here")} 
                  name="search" 
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  />
                </fieldset>
                <div className="button-submit">
                  <button type="submit">
                    <i className="icon-search" />
                  </button>
                </div>
              </form>
              {
                  search && (
                      <span className="delIcon" onClick={() => {
                      setSearch(""); 
                      setCategories(originalCategories); // Reset to all categories when search is cleared
                      }}>
                      <RiDeleteBack2Fill size={26} />
                      </span>
                  )
              }
            </div>
            <Link className="tf-button style-1 w208" to="/category/create"><i className="icon-plus" />{t("add_new_category")}</Link>
          </div>
          { loading && <Loader /> }

          <div className="wg-table table-all-user">
            <table className="table table-striped table-bordered">
              <thead>
                <tr>
                  <th>{t("sl_no")}</th>
                  <th>{t("category_name")}</th>
                  <th>{t("category_slug")}</th>
                  <th>{t("category_image")}</th>
                  <th>{t("created_at")}</th>
                  <th>{t("actions")}</th>
                </tr>
              </thead>
              <tbody>

              {categories && categories.length > 0 ? (
                categories.map((category, index) => (

                <tr key={index}>
                  <td>{index + 1}</td>
                  <td>{category.category_name}</td>
                  <td>{category.category_slug}</td>
                  <td className="pname">
                    <div className="image">
                      <img src={`${process.env.REACT_APP_BACKEND_URL}/${category.category_image_url}`} alt={category.category_name} className="image" />
                    </div>
                  </td>
                  <td>{new Date(category.createdAt).toLocaleString()}</td>
                  <td>
                    <div className="list-icon-function">

                      <Link to={`/category/edit/${category._id}`}>
                        <div className="item edit">
                          <i className="icon-edit-3" />
                        </div>
                      </Link>

                      <div 
                      className="item text-danger delete"
                      onClick={() => handleDeleteCategory(category._id)}
                      >
                        <i className="icon-trash-2" />
                      </div>

                    </div>
                  </td>
                </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="6" className="text-center">{t("no_categories_found")}</td>
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

  )
}

export default AllCategories