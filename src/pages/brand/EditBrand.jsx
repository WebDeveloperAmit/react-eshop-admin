import { useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import Loader from '../../components/loader/Loader';
import { hideLoader, showLoader } from '../../redux/slices/loaderSlice';
import { createBrandService } from '../../services/brandService';

const EditBrand = () => {

    const dispatch = useDispatch();
    const loading = useSelector((state) => state.loader.loading);
    const formRef = useRef(null);
    const [preview, setPreview] = useState(false);

    const handleFormSubmit = async (event) => {
        event.preventDefault();
        const formData = new FormData();
        const brandName = event.target.brand_name.value;
        const brandImage = event.target.brand_image.files[0];
        formData.append('brand_name', brandName);
        formData.append('brand_image', brandImage);

        try {
            dispatch(showLoader());
            const response = await createBrandService(formData);
            if (response.status === "success") {
                toast.success("✅ Brand created successfully!");
                formRef.current.reset();
                setPreview(false);
            } else {
                toast.error(response.message || "❌ Failed to create brand.");
            }
        } catch (error) {
            toast.error("❌ An error occurred while creating the brand.");
        } finally {
            dispatch(hideLoader());
        }

    }
    
  return (
    <>
      <div className="main-content-inner">
          <div className="main-content-wrap">
              <div className="flex items-center flex-wrap justify-between gap20 mb-27">
                  <h3>Edit Brand</h3>
                  <ul className="breadcrumbs flex items-center flex-wrap justify-start gap10">
                      <li>
                          <Link to="/">
                              <div className="text-tiny">Dashboard</div>
                          </Link>
                      </li>
                      <li>
                          <i className="icon-chevron-right"></i>
                      </li>
                      <li>
                          <Link to="/brands">
                              <div className="text-tiny">Brands</div>
                          </Link>
                      </li>
                      <li>
                          <i className="icon-chevron-right"></i>
                      </li>
                      <li>
                          <div className="text-tiny">Edit Brand</div>
                      </li>
                  </ul>
              </div>
              {/* new-category */}
              <div className="wg-box">
                {/* Show loader when loading */}
                {loading && <Loader />}
                    <form 
                        className="form-new-product form-style-1" 
                        ref={formRef} 
                        onSubmit={handleFormSubmit}
                    >
                      <fieldset className="name">
                          <div className="body-title">Brand Name <span className="tf-color-1">*</span></div>
                          <input 
                          className="flex-grow" 
                          type="text" 
                          placeholder="Brand name" 
                          tabIndex="0" 
                          aria-required="true" 
                          name="brand_name"
                          />
                      </fieldset>

                      <fieldset>
                          <div className="body-title">Old uploaded image
                          </div>
                          <div className="upload-image flex-grow">
                            { preview && (
                                <div className="item" id="imgpreview">
                                  <img src={preview} className="effect8"  alt="preview" />
                              </div>
                            )}

                              <div id="upload-file" className="item up-load">
                                  <label className="uploadfile" htmlFor="myFile">
                                      <span className="icon">
                                          <i className="icon-upload-cloud"></i>
                                      </span>
                                      <span className="body-text">Drop your images here or select <span className="tf-color">click to browse</span></span>
                                      <input 
                                      type="file" 
                                      id="myFile" 
                                      name="brand_image" 
                                      accept="image/*"
                                      onChange={(e) => {
                                        if (e.target.files[0]) {
                                            setPreview(URL.createObjectURL(e.target.files[0]));
                                        }
                                    }}
                                      />
                                  </label>
                              </div>
                          </div>
                      </fieldset>
                        
                      <fieldset>
                          <div className="body-title">Upload new image
                          </div>
                          <div className="upload-image flex-grow">
                            { preview && (
                                <div className="item" id="imgpreview">
                                  <img src={preview} className="effect8"  alt="preview" />
                              </div>
                            )}

                              <div id="upload-file" className="item up-load">
                                  <label className="uploadfile" htmlFor="myFile">
                                      <span className="icon">
                                          <i className="icon-upload-cloud"></i>
                                      </span>
                                      <span className="body-text">Drop your images here or select <span className="tf-color">click to browse</span></span>
                                      <input 
                                      type="file" 
                                      id="myFile" 
                                      name="brand_image" 
                                      accept="image/*"
                                      onChange={(e) => {
                                        if (e.target.files[0]) {
                                            setPreview(URL.createObjectURL(e.target.files[0]));
                                        }
                                    }}
                                      />
                                  </label>
                              </div>
                          </div>
                      </fieldset>

                      <div className="bot">
                          <div></div>
                          <button 
                          className="tf-button w208" 
                          type="submit"
                          disabled={loading}
                          >
                            {loading ? 'Saving...' : 'Save'}
                          </button>
                      </div>
                  </form>
              </div>
          </div>
      </div>
    </>
  );
};

export default EditBrand;
