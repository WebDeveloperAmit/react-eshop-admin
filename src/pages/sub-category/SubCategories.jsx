import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import { Link } from "react-router";
import Loader from "../../components/loader/Loader";

const SubCategories = () => {

const { t } = useTranslation();
const loading = useSelector((state) => state.loader.loading);

  return (
    <div className="main-content-inner">
      <div className="main-content-wrap">

        <div className="flex items-center flex-wrap justify-between gap20 mb-27">
          <h3>{t("all_sub_categories_list")}</h3>
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
                <div className="text-tiny">{t("categories")}</div>
              </li>
            </ul>
        </div>

        <div className="wg-box">
          
          <div className="flex items-center justify-between gap10 flex-wrap">
            <div className="wg-filter flex-grow">
              <form className="form-search">
                <fieldset className="name">
                  <input 
                  type="text" 
                  placeholder={t("search_here")} 
                  name="search" 
                  />
                </fieldset>
                <div className="button-submit">
                  <button type="submit">
                    <i className="icon-search" />
                  </button>
                </div>
              </form>
            </div>
            <Link className="tf-button style-1 w208" to="/subcategory/create"><i className="icon-plus" />{t("add_new_subcategory")}</Link>
          </div>

          { loading && <Loader /> }

          <div className="table-responsive">
            <table className="table table-striped table-bordered">
              <thead>
                <tr>
                  <th>{t("sl_no")}</th>
                  <th>{t("sub_category_name")}</th>
                  <th>{t("sub_category_slug")}</th>
                  <th>{t("parent_category")}</th>
                  <th>{t("sub_category_image")}</th>
                  <th>{t("created_at")}</th>
                  <th>{t("actions")}</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                    <td>1</td>
                    <td>Sub Category Name</td>
                    <td>Parent Category Name</td>
                    <td>sub-category-slug</td>
                    <td>
                        <img src="https://via.placeholder.com/50" alt="Sub Category" />
                    </td>
                    <td>2024-01-01</td>
                    <td>
                        <div className="list-icon-function">
                            
                            <Link to={`/subcategory/edit/1`}>
                                <div className="item edit">
                                    <i className="icon-edit-3" />
                                </div>
                            </Link>
                            
                            <div 
                            className="item text-danger delete"
                            style={{ cursor: "pointer" }}
                            >
                                <i className="icon-trash-2" />
                            </div>
                        </div>
                    </td>
                </tr>

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

export default SubCategories