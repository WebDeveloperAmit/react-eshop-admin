import { useTranslation } from "react-i18next";
import { Link } from "react-router";

const Settings = () => {

    const {t} = useTranslation();

  return (
    <div className="main-content-inner">
    <div className="main-content-wrap">
        <div className="flex items-center flex-wrap justify-between gap20 mb-27">
        <h3>{t("account_setting")}</h3>
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
            <div className="text-tiny">{t("account_setting")}</div>
            </li>
        </ul>
        </div>
        <div className="wg-box">
        <div className="col-lg-12">
            <div className="page-content my-account__edit">
            <div className="my-account__edit-form">
                <form className="form-new-product form-style-1">
                    <fieldset className="name">
                        <div className="body-title">{t('name')} <span className="tf-color-1">*</span>
                        </div>
                        <input className="flex-grow" type="text" placeholder={t("full_name")} name="name" />
                    </fieldset>

                    {/* <fieldset className="name">
                        <div className="body-title">Mobile Number <span className="tf-color-1">*</span></div>
                        <input className="flex-grow" type="text" placeholder="Mobile Number" name="mobile" />
                    </fieldset> */}

                    <fieldset className="name">
                        <div className="body-title">{t("email_address")} <span className="tf-color-1">*</span></div>
                        <input className="flex-grow" type="text" placeholder={t("email_address")} name="email" />
                    </fieldset>

                    <div className="row">

                        <div className="col-md-12">
                            <div className="my-3">
                                <h5 className="text-uppercase mb-0">{t("password_change")}</h5>
                            </div>
                        </div>

                        <div className="col-md-12">
                            <fieldset className="name">
                                <div className="body-title pb-3">{t("old_password")} <span className="tf-color-1">*</span>
                                </div>
                                <input className="flex-grow" type="password" placeholder={t("old_password")} id="old_password" name="old_password" />
                            </fieldset>
                        </div>

                        <div className="col-md-12">
                            <fieldset className="name">
                                <div className="body-title pb-3">{t("new_password")} <span className="tf-color-1">*</span>
                                </div>
                                <input className="flex-grow" type="password" placeholder={t("new_password")} id="new_password" name="new_password" />
                            </fieldset>
                        </div>

                        <div className="col-md-12">
                            <fieldset className="name">
                                <div className="body-title pb-3">{t("confirm_new_password")} <span className="tf-color-1">*</span></div>
                                <input className="flex-grow" type="password" placeholder={t("confirm_new_password")} cfpwd data-cf-pwd="#new_password" id="new_password_confirmation" name="new_password_confirmation" />
                                <div className="invalid-feedback">Passwords did not match!
                                </div>
                            </fieldset>
                        </div>

                        <div className="col-md-12">
                            <div className="my-3">
                                <button type="submit" className="btn btn-primary tf-button w208">Save
                                Changes</button>
                            </div>
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

export default Settings