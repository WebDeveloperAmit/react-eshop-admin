import { Editor } from "primereact/editor";
import { useState } from 'react';
import { useTranslation } from "react-i18next";
import { BsTwitterX } from "react-icons/bs";
import { FaFacebookSquare, FaYoutube } from "react-icons/fa";
import { FiInstagram } from "react-icons/fi";
import { GrLinkedin } from "react-icons/gr";
import { useSelector } from "react-redux";
import { Link } from "react-router";


const SiteSetting = () => {

  const { t } = useTranslation();
  const loading = useSelector((state) => state.loader.loading);
  const [text, setText] = useState("");

  return (
    <div className="main-content-inner">
      <div className="main-content-wrap">
          <div className="flex items-center flex-wrap justify-between gap20 mb-27">
            <h3>{t("site_setting")}</h3>
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
                <div className="text-tiny">{t("site_setting")}</div>
                </li>
            </ul>
          </div>
          <div className="wg-box">
            <div className="col-lg-12">
                <div className="page-content my-account__edit">
                  <div className="my-account__edit-form">

                      <form className="form-new-product form-style-1">

                          <fieldset className="name">
                              <div className="body-title">{t('site_name')} <span className="tf-color-1">*</span>
                              </div>
                              <input className="flex-grow" type="text" placeholder={t("site_name")} name="site_name" />
                          </fieldset>

                          <fieldset>
                            <div className="body-title">{t("site_logo")} <span className="tf-color-1">*</span>
                            </div>
                            <div className="upload-image flex-grow">
                                <div id="upload-file" className="item up-load">
                                    <label className="uploadfile" htmlFor="myFile">
                                        <span className="icon">
                                            <i className="icon-upload-cloud"></i>
                                        </span>
                                        <span className="body-text">{t('drop_images')} <span className="tf-color">{t('click_to_browse')}</span></span>
                                        <input 
                                        type="file" 
                                        id="myFile" 
                                        name="site_logo" 
                                        accept="image/*"
                                        />
                                    </label>
                                </div>
                            </div>
                          </fieldset>

                          <fieldset className="name">
                              <div className="body-title">{t("site_info")} <span className="tf-color-1">*</span></div>
                              <Editor 
                              value={text} 
                              onTextChange={(e) => setText(e.htmlValue)} 
                              style={{ height: '200px' }} 
                              />
                          </fieldset>

                          <fieldset className="name">
                              <div className="body-title">{t("site_mobile_no")} <span className="tf-color-1">*</span></div>
                              <input className="flex-grow" type="text" placeholder={t("site_mobile_no")} name="mobile" />
                          </fieldset>

                          <fieldset className="name">
                              <div className="body-title">{t("site_email")} <span className="tf-color-1">*</span></div>
                              <input className="flex-grow" type="text" placeholder={t("site_email")} name="email" />
                          </fieldset>

                          <fieldset className="name">
                              <div className="body-title">{t("site_address")} <span className="tf-color-1">*</span></div>
                              <input className="flex-grow" type="text" placeholder={t("site_address")} name="address" />
                          </fieldset>

                          <div className="row">

                              <div className="col-md-12">
                                  <div className="my-3">
                                      <h5 className="text-uppercase mb-0">{t("site_social_links")}</h5>
                                  </div>
                              </div>

                              <div className="col-md-12">
                                  <fieldset className="name">
                                      <div className="body-title pb-3"><FaFacebookSquare size={26} /> 
                                      {/* <span className="tf-color-1">*</span> */}
                                      </div>
                                      <input className="flex-grow" type="url" placeholder={t("facebook_url")} id="facebook_url" name="facebook_url" />
                                  </fieldset>
                              </div>  

                              <div className="col-md-12">
                                  <fieldset className="name">
                                      <div className="body-title pb-3"><BsTwitterX size={26} />
                                      </div>
                                      <input className="flex-grow" type="url" placeholder={t("twitter_url")} id="twitter_url" name="twitter_url" />
                                  </fieldset>
                              </div>

                              <div className="col-md-12">
                                  <fieldset className="name">
                                      <div className="body-title pb-3"><GrLinkedin size={26} /></div>
                                      <input className="flex-grow" type="url" placeholder={t("linkedin_url")} id="linkedin_url" name="linkedin_url" />
                                  </fieldset>
                              </div>

                              <div className="col-md-12">
                                  <fieldset className="name">
                                      <div className="body-title pb-3"><FiInstagram size={26} /></div>
                                      <input className="flex-grow" type="url" placeholder={t("instagram_url")} id="instagram_url" name="instagram_url" />
                                  </fieldset>
                              </div>

                              <div className="col-md-12">
                                  <fieldset className="name">
                                      <div className="body-title pb-3"><FaYoutube size={26} /></div>
                                      <input className="flex-grow" type="url" placeholder={t("youtube_url")} id="youtube_url" name="youtube_url" />
                                  </fieldset>
                              </div>

                          </div>

                          <div className="my-3">
                              <h5 className="text-uppercase mb-0">{t("other_settings")}</h5>
                          </div>
                        
                          <fieldset className="name">
                              <div className="body-title">{t("contact_page_heading")} <span className="tf-color-1">*</span></div>
                              <input className="flex-grow" type="text" placeholder={t("contact_page_heading")} name="contact_page_heading" />
                          </fieldset>

                          <fieldset className="name">
                              <div className="body-title">{t("get_in_touch_content")} <span className="tf-color-1">*</span></div>
                              <Editor 
                              value={text} 
                              onTextChange={(e) => setText(e.htmlValue)} 
                              style={{ height: '200px' }} 
                              />
                          </fieldset>

                            <div className="my-3">
                              <h5 className="text-uppercase mb-0">{t("home_page_sections")}</h5>
                            </div>
                        
                            <fieldset className="name">
                                <div className="body-title">{t("home_page_section_name")} <span className="tf-color-1">*</span></div>
                                <input className="flex-grow" type="text" placeholder={t("home_page_section_name")} name="home_page_section_name" />
                            </fieldset>

                            <fieldset className="name">
                                <div className="body-title">{t("home_page_section_content")} <span className="tf-color-1">*</span></div>
                                <Editor 
                                value={text} 
                                onTextChange={(e) => setText(e.htmlValue)} 
                                style={{ height: '200px' }} 
                                />
                            </fieldset>

                          <div className="col-md-12">
                              <div className="my-3">
                                  <button 
                                  type="submit" 
                                  className="btn btn-primary tf-button w208"
                                  disabled={loading}
                                  >
                                    {loading ? t("saving") : t("save")}
                                  </button>
                              </div>
                          </div>

                      </form>

                  </div>
                </div>
            </div>
          </div>
      </div>
    </div>
  )

}

export default SiteSetting