import { useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate, useParams } from "react-router";
import { toast } from "react-toastify";
import Loader from "../../components/loader/Loader";
import { hideLoader, showLoader } from "../../redux/slices/loaderSlice";
import { getSingleCoupon, updateCoupon } from "../../services/couponService";

const EditCoupon = () => {

    const { id: couponId } = useParams();
    
    const { t } = useTranslation();
    const navigate = useNavigate();
    const formRef = useRef(null);
    const dispatch = useDispatch();
    const loading = useSelector((state) => state.loader.loading);
    const [coupon, setCoupon] = useState({
        code: "",
        type: "",
        discount: "",
        min_purchase: "",
        usage_limit: "",
        expiry_date: "",
    });

    useEffect(() => {
        const getCoupon = async () => {
            try {
                dispatch(showLoader());
                const response = await getSingleCoupon(couponId);
                // console.log(response);
                if (response.status === "success") {
                    setCoupon(response.data);
                } else {
                    toast.error(`❌ ${response.message}`);
                }
            } catch (error) {
                toast.error("An error occurred while fetching coupon");
                console.error("Error fetching coupon:", error);
            } finally {
                dispatch(hideLoader());
            }
        }
        getCoupon();
    }, [dispatch, couponId]);

    const handleChange = (e) => {
        const { name, value } = e.target;

        setCoupon((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleFormSubmit = async (e) => {
        e.preventDefault();

        const form = e.target;

        const code = form.code.value.trim();
        const type = form.type.value;
        const discount = Number(form.discount.value);
        const min_purchase = Number(form.min_purchase.value);
        const usage_limit = Number(form.usage_limit.value);
        const expiry_date = form.expiry_date.value;

        const couponData = {
            code,
            type,
            discount,
            min_purchase,
            usage_limit,
            expiry_date
        }

        if (!couponData.code || !couponData.type || !couponData.expiry_date) {
            toast.error("All required fields must be filled");
            return;
        }

        try {
            dispatch(showLoader());
            const response = await updateCoupon(couponData, couponId);
            if (response?.status === "success") {
                toast.success(response?.message);
                navigate("/coupons");
            } else {
                toast.error(response?.message);
            }
        } catch (error) {
            toast.error("Something went wrong. Coupon not updated");
            console.error("Error update coupon:", error);
        } finally {
            dispatch(hideLoader());
        }

    }

  return (
    <div className="main-content-inner">
        <div className="main-content-wrap">
            <div className="flex items-center flex-wrap justify-between gap20 mb-27">
            <h3>{t("edit_coupon")}</h3>
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
                    <Link to="/coupons">
                        <div className="text-tiny">{t("coupons")}</div>
                    </Link>
                    </li>
                    <li>
                    <i className="icon-chevron-right" />
                    </li>
                    <li>
                    <div className="text-tiny">{t("edit_coupon")}</div>
                    </li>
                </ul>
            </div>

            { loading && <Loader /> }

            <div className="wg-box">

                <form className="form-new-product form-style-1" onSubmit={handleFormSubmit} ref={formRef}>

                    <fieldset className="name">
                        <div className="body-title">{t("coupon_code")} <span className="tf-color-1">*</span></div>
                        <input 
                        className="flex-grow" 
                        type="text" 
                        placeholder={t("coupon_code")} 
                        name="code" 
                        value={coupon.code}
                        onChange={handleChange}
                        />
                    </fieldset>

                    <fieldset className="category">
                        <div className="body-title">{t("coupon_type")}</div>
                        <div className="select flex-grow">
                            <select name="type" value={coupon.type || ""} onChange={handleChange}>
                            <option value>{t('select')}</option>
                            <option value="fixed">{t("fixed")}</option>
                            <option value="percentage">{t("percentage")}</option>
                            </select>
                        </div>
                    </fieldset>

                    <fieldset className="name">
                        <div className="body-title">{t("discount_amount")} <span className="tf-color-1">*</span></div>
                        <input 
                        className="flex-grow" 
                        type="text" 
                        placeholder={t("discount_amount")} 
                        name="discount" 
                        value={coupon.discount}
                        onChange={handleChange}
                        />
                    </fieldset>

                    <fieldset className="name">
                        <div className="body-title">{t("minimum_purchase")} <span className="tf-color-1">*</span></div>
                        <input 
                        className="flex-grow" 
                        type="text" 
                        placeholder={t("minimum_purchase")} 
                        name="min_purchase" 
                        value={coupon.min_purchase}
                        onChange={handleChange}
                        />
                    </fieldset>

                    <fieldset className="name">
                        <div className="body-title">{t("usage_limit")} <span className="tf-color-1">*</span></div>
                        <input 
                        className="flex-grow" 
                        type="number" 
                        min="1" 
                        placeholder={t("usage_limit")} 
                        name="usage_limit" 
                        value={coupon.usage_limit}
                        onChange={handleChange}
                        />
                    </fieldset>

                    <fieldset className="name">
                        <div className="body-title">{t("expiry_date")} <span className="tf-color-1">*</span></div>
                        <input 
                        className="flex-grow" 
                        type="date" 
                        placeholder={t("expiry_date")} 
                        name="expiry_date" 
                        value={coupon.expiry_date ? coupon.expiry_date.split("T")[0] : ""}
                        onChange={handleChange}
                        />
                    </fieldset>

                    <div className="bot">
                    <div />
                        <button className="tf-button w208" type="submit">
                            { loading ? t("updating") : t("save") }
                        </button>
                    </div>
                </form>

            </div>
        </div>
    </div>

  )
}

export default EditCoupon