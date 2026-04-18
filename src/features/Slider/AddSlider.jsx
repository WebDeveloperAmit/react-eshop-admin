import { useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router';
import { toast } from 'react-toastify';
import Loader from '../../components/loader/Loader';
import { hideLoader, showLoader } from '../../redux/slices/loaderSlice';
import { getAllCategoriesService } from '../../services/categoryService';
import { createSliderService } from '../../services/sliderService';

const AddSlider = () => {

  const { t } = useTranslation();
  const formRef = useRef(null);
  const dispatch = useDispatch();

  const loading = useSelector((state) => state.loader.loading);

  const [categories, setCategories] = useState([]);
  const [preview, setPreview] = useState(null);

  const handleFormSubmit = async (event) => {
    event.preventDefault();

    const form = event.target;

    const slider_title = form.slider_title.value.trim();
    const slider_heading = form.slider_heading.value.trim();
    const slider_sub_heading = form.slider_sub_heading.value.trim();
    const slider_image = form.slider_image.files[0];
    const cat_slug = form.cat_slug.value;

    if (!slider_title) return toast.error("Slider title is required");
    if (!slider_heading) return toast.error("Slider heading is required");
    if (!slider_sub_heading) return toast.error("Slider sub heading is required");
    if (!slider_image) return toast.error("Slider image is required");

    const allowedTypes = ["image/jpeg", "image/png", "image/webp"];
    
    if (!allowedTypes.includes(slider_image.type)) {
      return toast.error("Slider image must be JPG, PNG, or WEBP");
    }

    if (!cat_slug) return toast.error("Category is required");

    const formData = new FormData();

    formData.append('slider_title', slider_title);
    formData.append('slider_heading', slider_heading);
    formData.append('slider_sub_heading', slider_sub_heading);
    formData.append('slider_image', slider_image);
    formData.append('cat_slug', cat_slug);

    try {
        dispatch(showLoader());
        const response = await createSliderService(formData);
        if (response?.status === 'success') {
          setTimeout(() => {
            dispatch(hideLoader());
            toast.success(response?.message);
            formRef.current.reset();
            setPreview(null);
          }, 1000);
        } else {
          dispatch(hideLoader());
          toast.error(response?.message);
        }

    } catch (error) {
        dispatch(hideLoader());
        console.error('Error creating slider:', error);
        toast.error(error.response?.data?.message);
    }
    
  } 

  useEffect(() => {

    const fetchCategories = async () => {

      try {
        const response = await getAllCategoriesService('/categories');
        if (response.status === 'success') {
          setCategories(response?.data);
        } else {
          console.error('Failed to fetch categories:', response?.message);
        }
      } catch (error) {
        console.error('Error fetching categories:', error);
      }

    }

    fetchCategories();

  }, [dispatch]);

  return (
      <div className="main-content-inner">
        <div className="main-content-wrap">
          <div className="flex items-center flex-wrap justify-between gap20 mb-27">
            <h3>{t("add_new_slider")}</h3>
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
                <Link to="/sliders">
                  <div className="text-tiny">{t("sliders")}</div>
                </Link>
              </li>
              <li>
                <i className="icon-chevron-right" />
              </li>
              <li>
                <div className="text-tiny">{t("add_new_slider")}</div>
              </li>
            </ul>
          </div>
          {/* new-category */}

          {loading && <Loader />}

          <div className="wg-box">

            <form 
            className="form-new-product form-style-1" 
            onSubmit={handleFormSubmit} 
            ref={formRef}
            >
              <fieldset className="name">
                <div className="body-title">{t("slider_title")} <span className="tf-color-1">*</span></div>
                <input className="flex-grow" type="text" placeholder={t("slider_title")} name="slider_title" />
              </fieldset>

              <fieldset className="name">
                <div className="body-title">{t("slider_heading")} <span className="tf-color-1">*</span></div>
                <input className="flex-grow" type="text" placeholder={t("slider_heading")} name="slider_heading" />
              </fieldset>

              <fieldset className="name">
                <div className="body-title">{t("slider_sub_heading")} <span className="tf-color-1">*</span></div>
                <input className="flex-grow" type="text" placeholder={t("slider_sub_heading")} name="slider_sub_heading" />
              </fieldset>

              <fieldset>
                <div className="body-title">{t("upload_slider_images")} <span className="tf-color-1">*</span>
                </div>
                <div className="upload-image flex-grow">
                  {preview && (
                    <div className="item" id="imgpreview">
                      <img src={preview} className="effect8" alt="Preview" />
                    </div>
                  )}
                  <div className="item up-load">
                    <label className="uploadfile" htmlFor="myFile">
                      <span className="icon">
                        <i className="icon-upload-cloud" />
                      </span>
                      <span className="body-text">{t("drop_images")} <span className="tf-color">{t("click_to_browse")}</span></span>
                      <input type="file" id="myFile" name="slider_image" onChange={(e) => {
                        setPreview(URL.createObjectURL(e.target.files[0]));
                      }}/>
                    </label>
                  </div>
                </div>
              </fieldset>

              <fieldset className="category">
                <div className="body-title">{t("select_category")}</div>
                <div className="select flex-grow">
                  <select name="cat_slug" id="cat_slug">
                    <option value="">{t("select_category")}</option>
                    {categories && categories.map((category) => (
                      <option key={category._id} value={category.category_slug}>{category.category_name}</option>
                    ))}
                  </select>
                </div>
              </fieldset>

              <div className="bot">
                <div />
                <button 
                className="tf-button w208" 
                type="submit"
                disabled={loading}
                >
                  {loading ? t("saving") : t("save")}
                </button>
              </div>

            </form>

          </div>
          {/* /new-category */}
        </div>
        {/* /main-content-wrap */}
      </div>

  )
}

export default AddSlider