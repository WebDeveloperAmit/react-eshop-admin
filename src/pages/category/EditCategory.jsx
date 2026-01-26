import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate, useParams } from "react-router";
import { toast } from "react-toastify";
import Loader from "../../components/loader/Loader";
import { hideLoader, showLoader } from "../../redux/slices/loaderSlice";
import { editCategoryService, updateCategoryService } from "../../services/categoryService";

const EditCategory = () => {

  const { id: catId } = useParams();

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const loading = useSelector((state) => state.loader.loading);
  const [preview, setPreview] = useState(false);
  const [category, setCategory] = useState({
    category_name: "",
    category_image: ""
  });

  useEffect(() => {
    const fetchCategoryData = async () => {
      try {
        dispatch(showLoader());
        const response = await editCategoryService(catId);
        // console.log('response', response)
        if (response.status === "success") {
          setCategory(response.data);
        } else {
          toast.error(response.message);
        }
      } catch (error) {
        console.error("Error fetching category:", error);
        toast.error(error.message);
      } finally {
        dispatch(hideLoader());
      }
    }
    fetchCategoryData();
  }, [dispatch, catId]);

  const handleChange = ((e) => {
    const { name, value } = e.target;
    setCategory((prev) => ({
      ...prev,
      [name]: value,
    }));
  });

  const handleFormDataUpdate = async (e) => {
    e.preventDefault();

    const formData = new FormData();

    const category_name = e.target.category_name.value;
    const category_image = e.target.category_image.files[0];

    if (category_image) {
      formData.append("category_image", category_image);
    }

    formData.append('category_name', category_name);

    try {
      dispatch(showLoader());
      const response = await updateCategoryService(formData, catId);
      if (response.status === "success") {
        toast.success(response.message);
        navigate('/categories');
      } else {
        toast.error(response.message);
      }
    } catch (error) {
      console.error("Update category failed:", error);
      toast.error(
        error.response?.data?.message ||
        "Failed to update category. Please try again."
      );
    } finally {
      dispatch(hideLoader());
    }

  }

  return (
    <div className="main-content-inner">
      {/* main-content-wrap */}
      <div className="main-content-wrap">
        <div className="flex items-center flex-wrap justify-between gap20 mb-27">
          <h3>Edit Category</h3>

          { loading && <Loader /> }

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
                <Link to="/categories">
                  <div className="text-tiny">Categories</div>
                </Link>
              </li>
              <li>
                <i className="icon-chevron-right" />
              </li>
              <li>
                <div className="text-tiny">Edit Category</div>
              </li>
            </ul>
        </div>

        {/* new-category */}
        <div className="wg-box">
          <form 
          className="form-new-product form-style-1" 
          onSubmit={handleFormDataUpdate}
          >
            <fieldset className="name">
              <div className="body-title">Category Name <span className="tf-color-1">*</span>
              </div>
              <input 
              className="flex-grow" 
              type="text" 
              placeholder="Category name" 
              name="category_name" 
              value={category.category_name}
              onChange={handleChange}
              />
            </fieldset>

            <fieldset>
              <div className="body-title">Upload images <span className="tf-color-1">*</span>
              </div>
              <div className="upload-image flex-grow">
                {category?.category_image_url && (
                  <div className="item" id="imgpreview">
                    <span style={{ fontSize: "15px", fontWeight: "800" }}>Old Image:</span>
                    <img src={`${process.env.REACT_APP_BACKEND_URL}/${category.category_image_url}`} className="effect8" alt="Preview" />
                  </div>
                )}

                {preview && (
                  <div className="item" id="imgpreview">
                    <img src={preview} className="effect8" alt="Preview" />
                  </div>
                )}
                <div id="upload-file" className="item up-load">
                  <label className="uploadfile" htmlFor="myFile">
                    <span className="icon">
                      <i className="icon-upload-cloud" />
                    </span>
                    <span className="body-text">Drop your images here or select <span className="tf-color">click
                        to browse</span></span>
                    <input 
                    type="file" 
                    id="myFile"
                    name="category_image" 
                    accept="image/*" 
                    onChange={(e) => {
                      setPreview(URL.createObjectURL(e.target.files[0]))
                    }}
                    />
                  </label>
                </div>
              </div>
            </fieldset>
            <div className="bot">
              <div />
              <button className="tf-button w208" type="submit">
                Update
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default EditCategory