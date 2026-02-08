import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router";
import { toast } from "react-toastify";
import Loader from "../../components/loader/Loader";
import { hideLoader, showLoader } from "../../redux/slices/loaderSlice";
import { getAllSlidersService } from "../../services/sliderService";

const Sliders = () => {

  const { t } = useTranslation();
  const dispatch = useDispatch()
  const loading = useSelector((state) => state.loader.loading);
  const [sliders, setSliders] = useState([]);

  useEffect(() => {
    const fetchSliders = async () => {
      try {
        dispatch(showLoader());
        const response = await getAllSlidersService();
        if (response?.status === "success") {
          setTimeout(() => {
            setSliders(response?.slider);
            dispatch(hideLoader());
          }, 500);
        } else {
          toast.error(`❌ ${response?.message || "Failed to fetch sliders"}`);
          console.error("Failed to fetch sliders:", response?.message);
          dispatch(hideLoader());
        }
      } catch (error) {
        toast.error("❌ An error occurred while fetching sliders");
        console.error("Error fetching sliders:", error);
        dispatch(hideLoader());
      }
    }
    fetchSliders();
  }, [dispatch]);

  return (
    <div className="main-content-inner">
      <div className="main-content-wrap">
        <div className="flex items-center flex-wrap justify-between gap20 mb-27">
          <h3>{t("all_sliders_list")}</h3>
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
              <div className="text-tiny">{t("sliders")}</div>
            </li>
          </ul>
        </div>
        <div className="wg-box">
          <div className="flex items-center justify-between gap10 flex-wrap">
            <div className="wg-filter flex-grow">
              <form className="form-search">
                <fieldset className="name">
                  <input type="text" placeholder={t("search_here")} name="search" />
                </fieldset>
                <div className="button-submit">
                  <button className type="submit"><i className="icon-search" /></button>
                </div>
              </form>
            </div>
            <Link className="tf-button style-1 w208" to="/slider/create"><i className="icon-plus" />{t("add_new_slider")}</Link>
          </div>
          {loading && <Loader />}
          <div className="table-responsive">
            <table className="table table-striped table-bordered">
              <thead>
                <tr>
                  <th>{t("sl_no")}</th>
                  <th>{t("slider_image")}</th>
                  <th>{t("slider_title")}</th>
                  <th>{t("slider_heading")}</th>
                  <th>{t("slider_sub_heading")}</th>
                  <th>{t("category")}</th>
                  <th>{t("actions")}</th>
                </tr>
              </thead>
              <tbody>
              {sliders && sliders.length > 0 ? (
                sliders.map((slider, index) => (
                  <tr key={index}>
                    <td>{index + 1}</td>
                    <td className="pname">
                      <div className="image">
                        <img src={`${process.env.REACT_APP_BACKEND_URL}/${slider.slider_image_url}`} alt={slider.slider_title} className="image" />
                      </div>
                    </td>
                    <td>{slider.slider_title}</td>
                    <td>{slider.slider_heading}</td>
                    <td>{slider.slider_sub_heading}</td>
                    <td>{slider.cat_slug}</td>
                    <td>
                      <div className="list-icon-function">
                        <Link to="">
                          <div className="item edit">
                            <i className="icon-edit-3" />
                          </div>
                        </Link>
                        <form action="" method="POST">
                          <input type="hidden" name="_method" defaultValue="DELETE" />
                          <div className="item text-danger delete">
                            <i className="icon-trash-2" />
                          </div>
                        </form>
                      </div>
                    </td>
                  </tr>
                )) 
              ) : (
                  <tr>
                    <td colSpan="7" className="text-center">{t("no_sliders_found")}</td>
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

export default Sliders