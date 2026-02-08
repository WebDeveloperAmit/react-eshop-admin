import { useTranslation } from "react-i18next";
import { Link } from "react-router";

const ContactCustomers = () => {

const { t } = useTranslation();

  return (
    <div className="main-content-inner">
        <div className="main-content-wrap">

            <div className="flex items-center flex-wrap justify-between gap20 mb-27">
                <h3>{t("all_contact_customers")}</h3>
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
                    <div className="text-tiny">{t("all_contact_customers")}</div>
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
                            className="form-input" 
                            name="name" 
                            required 
                            />
                            </fieldset>
                            <div className="button-submit">
                                <button 
                                type="submit"><i className="icon-search" />
                                </button>
                            </div>
                        </form>
                    </div>
                </div>

                {/* <div className="wg-table table-all-user"> */}
                <div className="table-responsive">
                    <table className="table table-striped table-bordered">
                        <thead>
                        <tr>
                            <th>{t("sl_no")}</th>
                            <th>{t("full_name")}</th>
                            <th>{t("phone")}</th>
                            <th>{t("email")}</th>
                            <th className="text-center">{t("message")}</th>
                            <th>{t("actions")}</th>
                        </tr>
                        </thead>
                        <tbody>
                        <tr>
                            <td>1</td>
                            <td>John Doe</td>
                            <td>1234567890</td>
                            <td>admin@surfsidemedia.in</td>
                            <td className="text-center"><Link to="#" target="_blank">0</Link></td>
                            <td>
                            <div className="list-icon-function">
                                <Link to="#">
                                <div className="item text-danger delete" style={{ cursor: "pointer" }}>
                                    <i className="icon-trash-2" />
                                </div>
                                </Link>
                            </div>
                            </td>
                        </tr>
                        </tbody>
                    </table>
                </div>
                {/* </div> */}

                <div className="divider" />
                <div className="flex items-center justify-between flex-wrap gap10 wgp-pagination">
                </div>
            </div>
        </div>
    </div>
  )
}

export default ContactCustomers