import { useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router";
import { toast } from "react-toastify";
import Loader from "../../components/loader/Loader";
import { hideLoader, showLoader } from "../../redux/slices/loaderSlice";
import { createCategoryService } from "../../services/categoryService";

const CreateCategory = () => {

  const { t } = useTranslation();

  const formRef = useRef(null);
  const dispatch = useDispatch();

  const loading = useSelector((state) => state.loader.loading);

  const [preview, setPreview] = useState(false);

  const handleFormSubmit = async (event) => {
    event.preventDefault();

    const form = event.target;

    const category_name = form.category_name.value.trim();
    const category_image = form.category_image.files[0];

    if (!category_name) return toast.error("Category name is required");
    if (!category_image) return toast.error("Category image is required");

    const allowedTypes = ["image/jpeg", "image/jpg", "image/png", "image/webp"];
    if (!allowedTypes.includes(category_image.type)) {
      return toast.error("Category image must be JPG, JPEG, PNG, or WEBP");
    }
    
    const formData = new FormData();

    formData.append('category_name', category_name);

    if (category_image) {
      formData.append('category_image', category_image);
    }

    try {

      dispatch(showLoader());

      const response = await createCategoryService(formData);

      setTimeout(() => {
        if (response?.status === "success") {
          toast.success(response?.message);
          formRef.current.reset();
        }
        else {
          toast.error(response?.message);
        }
        dispatch(hideLoader());
      }, 500);

    } catch (error) {
      console.error("Error creating category:", error);

      setTimeout(() => {
        toast.error(error.response?.data?.message);
        dispatch(hideLoader());
      }, 500);

    }

  }

  return (
    <div className="main-content-inner">
      {/* main-content-wrap */}
      <div className="main-content-wrap">
        <div className="flex items-center flex-wrap justify-between gap20 mb-27">
          <h3>{ t('add_new_category') }</h3>
          { loading && <Loader /> }
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
              <Link to="/categories">
                <div className="text-tiny">{ t('categories') }</div>
              </Link>
            </li>
            <li>
              <i className="icon-chevron-right" />
            </li>
            <li>
              <div className="text-tiny">{ t('add_new_category') }</div>
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
              <div className="body-title">{ t('category_name') } <span className="tf-color-1">*</span>
              </div>
              <input 
              className="flex-grow" 
              type="text" 
              placeholder={ t('category_name') } 
              name="category_name" 
              />
            </fieldset>

            <fieldset>
              <div className="body-title">{ t('category_image') } <span className="tf-color-1">*</span>
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
                    <span className="body-text">{ t('drop_images') } <span className="tf-color">{ t('click_to_browse') }</span></span>
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
            <div className="bot"><div />
              <button 
              className="tf-button w208" 
              type="submit"
              disabled={loading}
              >
                {loading ? t("saving..") : t("save")}
              </button>
            </div>

          </form>

        </div>
      </div>
    </div>

  )
}

export default CreateCategory