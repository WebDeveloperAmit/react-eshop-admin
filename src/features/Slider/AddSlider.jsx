import { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router';
import { toast } from 'react-toastify';
import Loader from '../../components/loader/Loader';
import { hideLoader, showLoader } from '../../redux/slices/loaderSlice';
import { getAllCategoriesService } from '../../services/categoryService';
import { createSliderService } from '../../services/sliderService';

const AddSlider = () => {

  const formRef = useRef(null);
  const dispatch = useDispatch();
  const loading = useSelector((state) => state.loader.loading);
  const [categories, setCategories] = useState([]);
  const [preview, setPreview] = useState(null);

  const handleFormSubmit = async (event) => {
    event.preventDefault();

    const formData = new FormData();
    formData.append('slider_title', event.target.slider_title.value);
    formData.append('slider_heading', event.target.slider_heading.value);
    formData.append('slider_sub_heading', event.target.slider_sub_heading.value);
    formData.append('slider_image', event.target.slider_image.files[0]);
    formData.append('cat_slug', event.target.cat_slug.value);

    try {
        dispatch(showLoader());
        const response = await createSliderService(formData);
        if (response.status === 'success') {
          toast.success("✅ Slider created successfully");
          formRef.current.reset();
          setPreview(null);
        } else {
          toast.error(`❌ ${response.message}`);
        }
    } catch (error) {
        console.error('Error creating slider:', error);
        toast.error('❌ An error occurred while creating the slider');
    } finally {
      dispatch(hideLoader());
    }
    
  } 

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await getAllCategoriesService('/categories');
        if (response.status === 'success') {
          setCategories(response.data);
        } else {
          console.error('Failed to fetch categories:', response.message);
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
            <h3>Add New Slider</h3>
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
                <Link to="/sliders">
                  <div className="text-tiny">Slider</div>
                </Link>
              </li>
              <li>
                <i className="icon-chevron-right" />
              </li>
              <li>
                <div className="text-tiny">New Slider</div>
              </li>
            </ul>
          </div>
          {/* new-category */}
          {loading && <Loader />}
          <div className="wg-box">
            <form className="form-new-product form-style-1" onSubmit={handleFormSubmit} ref={formRef}>
              <fieldset className="name">
                <div className="body-title">Slider Title <span className="tf-color-1">*</span></div>
                <input className="flex-grow" type="text" placeholder="Slider Title" name="slider_title" />
              </fieldset>

              <fieldset className="name">
                <div className="body-title">Slider Heading <span className="tf-color-1">*</span></div>
                <input className="flex-grow" type="text" placeholder="Slider Heading" name="slider_heading" />
              </fieldset>

              <fieldset className="name">
                <div className="body-title">Slider Sub Heading <span className="tf-color-1">*</span></div>
                <input className="flex-grow" type="text" placeholder="Slider Sub Heading" name="slider_sub_heading" />
              </fieldset>

              <fieldset>
                <div className="body-title">Upload Slider Images <span className="tf-color-1">*</span>
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
                      <span className="body-text">Drop your images here or select <span className="tf-color">click to browse</span></span>
                      <input type="file" id="myFile" name="slider_image" onChange={(e) => {
                        setPreview(URL.createObjectURL(e.target.files[0]));
                      }}/>
                    </label>
                  </div>
                </div>
              </fieldset>

              <fieldset className="category">
                <div className="body-title">Select category</div>
                <div className="select flex-grow">
                  <select name="cat_slug" id="cat_slug">
                    <option>Select a category</option>
                    {categories && categories.map((category) => (
                      <option key={category._id} value={category.category_slug}>{category.category_name}</option>
                    ))}
                  </select>
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
          {/* /new-category */}
        </div>
        {/* /main-content-wrap */}
      </div>

  )
}

export default AddSlider