import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { RiDeleteBack2Fill } from "react-icons/ri";
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
  const [originalSliders, setOriginalSliders] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {

    const fetchSliders = async () => {

      try {
        dispatch(showLoader());

        const response = await getAllSlidersService();
        
        if (response?.status === "success") {

          setTimeout(() => {
            dispatch(hideLoader());
            setSliders(response?.data);
            setOriginalSliders(response?.data);
          }, 500);

        } else {
          dispatch(hideLoader());
          toast.error(response?.message);
          console.error("Failed to fetch sliders:", response?.message);
        }

      } catch (error) {
        dispatch(hideLoader());
        toast.error(error.response?.data?.message);
        console.error("Error fetching sliders:", error);
      }
    }
    fetchSliders();

  }, [dispatch]);

  const handleSearch = (event) => {
      event.preventDefault();

      if (!searchTerm.trim()) {
          setSliders(originalSliders);
          return;
      }

      const filteredSliders = originalSliders.filter((slider) =>
          slider.slider_title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          slider.slider_heading.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setSliders(filteredSliders);
  };

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

              <form className="form-search" onSubmit={handleSearch}>
                <fieldset className="name">
                  <input 
                  type="text" 
                  placeholder={t("search_here")} 
                  name="search" 
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </fieldset>
                <div className="button-submit">
                  <button type="submit"><i className="icon-search" /></button>
                </div>
              </form>

              {
                  searchTerm && (
                      <span className="delIcon" onClick={() => {
                      setSearchTerm(""); 
                      setSliders(originalSliders);
                      }}>
                      <RiDeleteBack2Fill size={26} />
                      </span>
                  )
              }

            </div>
            <Link className="tf-button style-1 w208" to="/slider/create"><i className="icon-plus" />{t("add_new_slider")}</Link>
          </div>

          {loading && <Loader />}

          <div className="table-responsive">
            <table className="table table-striped table-bordered">
              <thead>
                <tr>
                  <th># {t("sl_no")}</th>
                  <th>{t("slider_image")}</th>
                  <th>{t("slider_title")}</th>
                  <th>{t("slider_heading")}</th>
                  <th>{t("slider_sub_heading")}</th>
                  <th>{t("category")}</th>
                  <th>{t("created_at")}</th>
                  <th>{t("actions")}</th>
                </tr>
              </thead>
              <tbody>
              {sliders && sliders.length > 0 ? (
                sliders.map((slider, index) => (

                  <tr key={index}>
                    <td>{index + 1}</td>

                    <td>
                      <div className="image">
                        <img src={`${process.env.REACT_APP_BACKEND_URL}/${slider.slider_image_url}`} alt={slider.slider_title} className="image" />
                      </div>
                    </td>

                    <td>{slider.slider_title}</td>
                    <td>{slider.slider_heading}</td>
                    <td>{slider.slider_sub_heading}</td>
                    <td>{slider.cat_slug}</td>
                    <td>
                      {new Date(slider.createdAt).toLocaleString("en-IN", {
                          year: "numeric",
                          month: "long",
                          day: "numeric",
                          hour: "numeric",
                          minute: "2-digit",
                          second: "2-digit",
                          hour12: true
                      })}
                    </td>

                    <td>
                      <div className="list-icon-function">

                        <Link to="#">
                          <div className="item edit">
                            <i className="icon-edit-3" />
                          </div>
                        </Link>

                        <Link to="#">
                          <div className="item text-danger delete">
                            <i className="icon-trash-2" />
                          </div>
                        </Link>

                      </div>
                    </td>

                  </tr>
                )) 
              ) : (
                  <tr>
                    <td colSpan="8" className="text-center">{t("no_sliders_found")}</td>
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