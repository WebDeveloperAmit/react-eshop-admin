import { useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router";
import { toast } from "react-toastify";
import Loader from "../../components/loader/Loader";
import { hideLoader, showLoader } from "../../redux/slices/loaderSlice";
import { createCategoryService } from "../../services/categoryService";

const CreateCategory = () => {

  const formRef = useRef(null);
  const dispatch = useDispatch();
  const loading = useSelector((state) => state.loader.loading);
  const [preview, setPreview] = useState(false);

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData();
    const category_name = event.target.category_name.value;
    const category_image = event.target.category_image.files[0];
    formData.append('category_name', category_name);
    formData.append('category_image', category_image);

    // if (!category_name || !category_image) {
    //   toast.error("⚠️ All fields are required.");
    //   return;
    // }

    try {
      dispatch(showLoader());
      const response = await createCategoryService(formData);
      if (response.status === "success") {
        toast.success("✅ Category created successfully!");
        formRef.current.reset();
      }
      else {
        toast.error(response.message || "❌ Failed to create category.");
      }
    } catch (error) {
      toast.error("❌ An error occurred while creating the category.");
    } finally {
      dispatch(hideLoader());
    }
  }

  return (
    <div className="main-content-inner">
      {/* main-content-wrap */}
      <div className="main-content-wrap">
        <div className="flex items-center flex-wrap justify-between gap20 mb-27">
          <h3>Add New Category</h3>
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
              <div className="text-tiny">New Category</div>
            </li>
          </ul>
        </div>

        {/* new-category */}
        <div className="wg-box">
          <form 
          className="form-new-product form-style-1" 
          onSubmit={handleFormSubmit}
          ref={formRef}
          >
            <fieldset className="name">
              <div className="body-title">Category Name <span className="tf-color-1">*</span>
              </div>
              <input 
              className="flex-grow" 
              type="text" 
              placeholder="Category name" 
              name="category_name" 
              />
            </fieldset>

            <fieldset>
              <div className="body-title">Upload images <span className="tf-color-1">*</span>
              </div>
              <div className="upload-image flex-grow">
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
                      setPreview(URL.createObjectURL(e.target.files[0]));
                    }}
                    />
                  </label>
                </div>
              </div>
            </fieldset>
            <div className="bot">
              <div />
              <button className="tf-button w208" type="submit">
                Save
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>

  )
}

export default CreateCategory