import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router";
import { toast } from "react-toastify";
import Swal from "sweetalert2";
import Loader from "../../components/loader/Loader";
import { hideLoader, showLoader } from "../../redux/slices/loaderSlice";
import { deleteCategoryService, getAllCategoriesService, searchCategoryService } from "../../services/categoryService";

const AllCategories = () => {

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const loading = useSelector((state) => state.loader.loading);
  const [categories, setCategories] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        dispatch(showLoader());
        const fetchCategories = await getAllCategoriesService();
        // console.log("Fetched categories:", fetchCategories);
        if (fetchCategories.status === "success") {
          setCategories(fetchCategories.data);
        } else {
          toast.error(fetchCategories.message || "❌ Failed to fetch categories.");
        }
      } catch (error) {
        toast.error("❌ An error occurred while fetching categories.");
      } finally {
        dispatch(hideLoader());
      }
    }
    fetchCategories();
  }, [dispatch]);

  const handleDeleteCategory = async (catId) => {
    // console.log('catId', catId);
    try {
      if (!catId) {
        toast.error("Invalid category ID");
        return;
      }

      const result = await Swal.fire({
          title: "Are you sure?",
          text: "This category will be permanently deleted!",
          icon: "warning",
          showCancelButton: true,
          confirmButtonColor: "#d33",
          cancelButtonColor: "#3085d6",
          confirmButtonText: "Yes, delete it!",
          cancelButtonText: "Cancel"
      });

      if (!result.isConfirmed) return;

      const response = await deleteCategoryService(catId);
      if (response.status === "success") {
        toast.success(response.message);
        setCategories((prev) => {
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
    try {
      const response = await searchCategoryService(search);
      if (response.status === "success") {
        setCategories(response.data);
      } else {
        toast.error(response.message);
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
          <h3>All Categories List</h3>
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
                <div className="text-tiny">Categories</div>
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
                  placeholder="Search here..." 
                  name="search" 
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  />
                </fieldset>
                <div className="button-submit">
                  <button 
                  className type="submit"
                  >
                    <i className="icon-search" />
                  </button>
                </div>
              </form>
            </div>
            <Link className="tf-button style-1 w208" to="/category/create"><i className="icon-plus" />Add new category</Link>
          </div>
          { loading && <Loader /> }

          <div className="wg-table table-all-user">
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
                  <td colSpan="6" className="text-center">No categories found.</td>
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