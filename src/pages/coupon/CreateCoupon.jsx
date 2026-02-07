import { useRef } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router";
import { toast } from "react-toastify";
import Loader from "../../components/loader/Loader";
import { hideLoader, showLoader } from "../../redux/slices/loaderSlice";
import { createCouponService } from "../../services/couponService";

const CreateCoupon = () => {

    const { t } = useTranslation();
    const formRef = useRef(null);
    const dispatch = useDispatch();
    const loading = useSelector((state) => state.loader.loading);

    const handleFormSubmit = async (event) => {
        event.preventDefault();

        const form = event.target;

        const code = form.code.value;
        const type = form.type.value;
        const discount = form.discount.value;
        const minPurchase = form.min_purchase.value;
        const usageLimit = form.usage_limit.value;
        const expiryDate = form.expiry_date.value;

        const couponData = {
            code,
            type,
            discount,
            min_purchase: minPurchase,
            usage_limit: usageLimit,
            expiry_date: expiryDate
        };
        
        try {
            dispatch(showLoader());

            const response = await createCouponService(couponData);

            if (response?.status === "success") {
                toast.success(response?.message);
                formRef.current.reset();
            } else {
                toast.error(`❌ ${response.message}`);
            }
        } catch (error) {
            toast.error("❌ An error occurred while creating the coupon");
            console.error("Error creating coupon:", error);
        } finally {
            dispatch(hideLoader());
        }
    }

  return (
    <div className="main-content-inner">
    <div className="main-content-wrap">
        <div className="flex items-center flex-wrap justify-between gap20 mb-27">
        <h3>{t("add_new_coupon")}</h3>
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
                <Link to="#">
                    <div className="text-tiny">{t("coupons")}</div>
                </Link>
                </li>
                <li>
                <i className="icon-chevron-right" />
                </li>
                <li>
                <div className="text-tiny">{t("add_new_coupon")}</div>
                </li>
            </ul>
        </div>

        { loading && <Loader /> }

        <div className="wg-box">

            <form className="form-new-product form-style-1" onSubmit={handleFormSubmit} ref={formRef}>
                <fieldset className="name">
                    <div className="body-title">{t("coupon_code")} <span className="tf-color-1">*</span></div>
                    <input className="flex-grow" type="text" placeholder={t("coupon_code")} name="code" />
                </fieldset>

                <fieldset className="category">
                    <div className="body-title">{t("coupon_type")}</div>
                    <div className="select flex-grow">
                        <select name="type">
                        <option value>{t("select")}</option>
                        <option value="fixed">{t("fixed")}</option>
                        <option value="percentage">{t("percentage")}</option>
                        </select>
                    </div>
                </fieldset>

                <fieldset className="name">
                    <div className="body-title">{t("discount_amount")} <span className="tf-color-1">*</span></div>
                    <input className="flex-grow" type="text" placeholder={t("discount_amount")} name="discount" />
                </fieldset>

                <fieldset className="name">
                    <div className="body-title">{t("minimum_purchase")} <span className="tf-color-1">*</span></div>
                    <input className="flex-grow" type="text" placeholder={t("minimum_purchase")} name="min_purchase" />
                </fieldset>

                <fieldset className="name">
                    <div className="body-title">{t("usage_limit")} <span className="tf-color-1">*</span></div>
                    <input className="flex-grow" type="number" min="1" placeholder={t("usage_limit")} name="usage_limit" />
                </fieldset>

                <fieldset className="name">
                    <div className="body-title">{t("expiry_date")} <span className="tf-color-1">*</span></div>
                    <input className="flex-grow" type="date" placeholder={t("expiry_date")} name="expiry_date" />
                </fieldset>

                <div className="bot">
                <div />
                    <button 
                    className="tf-button w208" 
                    type="submit"
                    disabled={loading}
                    >
                        { loading ? t("saving") : t("save") }
                    </button>
                </div>
            </form>

        </div>
    </div>
    </div>

  )
}

export default CreateCoupon