import { useState } from "react";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import { Link } from "react-router";
import Loader from "../../components/loader/Loader";

const EditSubCategory = () => {

const { t } = useTranslation();
const loading = useSelector((state) => state.loader.loading);
const [preview, setPreview] = useState(null);

  return (
    <div className="main-content-inner">
      <div className="main-content-wrap">
        <div className="flex items-center flex-wrap justify-between gap20 mb-27">
          <h3>{ t('edit_subcategory') }</h3>
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
              <div className="text-tiny">{ t('edit_subcategory') }</div>
            </li>
          </ul>
        </div>

        {/* new-category */}
        <div className="wg-box">
          <form 
          className="form-new-product form-style-1" 
          >
            <fieldset className="name">
              <div className="body-title">{ t('sub_category_name') } <span className="tf-color-1">*</span>
              </div>
              <input 
              className="flex-grow" 
              type="text" 
              placeholder={ t('sub_category_name') } 
              name="sub_category_name" 
              />
            </fieldset>

            <fieldset className="category">
                <div className="body-title">{t("parent_category")} <span className="tf-color-1">*</span></div>
                <div className="select flex-grow">
                    <select name="parent_category" id="parent_category">
                        <option value>{t("select")}</option>
                    </select>
                </div>
            </fieldset>

            <fieldset>
              <div className="body-title">{ t('sub_category_image') } <span className="tf-color-1">*</span>
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
                    name="sub_category_image" 
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
                {loading ? t("updating") : t("save")}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>

  )

}

export default EditSubCategory