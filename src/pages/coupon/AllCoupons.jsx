import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { RiDeleteBack2Fill } from "react-icons/ri";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router";
import { toast } from "react-toastify";
import Swal from "sweetalert2";
import Loader from "../../components/loader/Loader";
import { hideLoader, showLoader } from "../../redux/slices/loaderSlice";
import { deleteCoupon, getAllCouponsService } from "../../services/couponService";

const AllCoupons = () => {

    const { t } = useTranslation();
    const dispatch = useDispatch();

    const loading = useSelector((state) => state.loader.loading);

    const [coupons, setCoupons] = useState([]);
    const [originalCoupons, setOriginalCoupons] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");

    useEffect(() => {

        const fetchCoupons = async () => {
            try {
                dispatch(showLoader());
                const response = await getAllCouponsService();
                if (response?.status === "success") {
                    setTimeout(() => {
                        setCoupons(response?.coupon);
                        setOriginalCoupons(response?.coupon);
                        dispatch(hideLoader());
                    }, 500);
                } else {
                    toast.error(`❌ ${response.message}`);
                    dispatch(hideLoader());
                }
            } catch (error) {
                toast.error("❌ An error occurred while fetching coupons");
                console.error("Error fetching coupons:", error);
                dispatch(hideLoader());
            }
        }

        fetchCoupons();

    }, [dispatch]);

    const handleDeleteCoupon = async (couponId) => {

        if (!couponId) {
            toast.error(t("invalid_coupon_id"));
            return;
        }

        // const result = await Swal.fire({
        //     title: t("are_you_sure"),
        //     text: t("coupon_will_be_deleted"),
        //     icon: "warning",
        //      width: "500px",
        //     showCancelButton: true,
        //     confirmButtonColor: "#d33",
        //     cancelButtonColor: "#3085d6",
        //     confirmButtonText: t("yes_delete"),
        //     cancelButtonText: t("cancel")
        // });

        const result = await Swal.fire({
            title: t("are_you_sure"),
            text: t("coupon_will_be_deleted"),
            icon: "warning",
            customClass: {
                popup: "swal-large",
                title: "swal-title",
                htmlContainer: "swal-text",
                confirmButton: "swal-btn",
                cancelButton: "swal-btn"
            },
            showCancelButton: true,
            confirmButtonText: t("yes_delete"),
            cancelButtonText: t("cancel")
        });

        if (!result.isConfirmed) return;

        try {
            const response = await deleteCoupon(couponId);
            if (response?.status === "success") {
                toast.success(response?.message);

                setCoupons((prev) => {
                    return prev.filter(coupon => coupon._id !== couponId)
                });

                setOriginalCoupons((prev) => {
                    return prev.filter(coupon => coupon._id !== couponId)
                });

            } else {
                toast.error(response?.message);
            }
        } catch (error) {
            console.error("Error deleting coupon:", error);
            toast.error("❌ Something went wrong.");
        }
    }

    const handleSearch = async (event) => {
        event.preventDefault();

        // if (!search.trim()) {
        //     toast.warning(t("please_enter_search_term"));
        //     return;
        // }

        // try {
        //     dispatch(showLoader());
        //      const response = await searchCouponsService(search);
        //     if (response.status === "success") {
        //         setTimeout(() => {
        //             setCoupons(response?.coupon);
        //             dispatch(hideLoader());
        //         }, 500);
        //     } else {
        //         toast.error(response?.message);
        //         dispatch(hideLoader());
        //     }
        // } catch (error) {
        //     console.error("Error searching coupons:", error);
        //     toast.error("An error occurred while searching coupons.");
        //     dispatch(hideLoader());
        // }

        if (!searchTerm.trim()) {
            setCoupons(originalCoupons);
            return;
        }

        const filteredCoupons = originalCoupons.filter((coupon) =>
            coupon.code.toLowerCase().includes(searchTerm.toLowerCase())
        );
        setCoupons(filteredCoupons);

    }

  return (
    <div className="main-content-inner">
    <div className="main-content-wrap">
        <div className="flex items-center flex-wrap justify-between gap20 mb-27">
            <h3>{t("all_coupons_list")}</h3>
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
                <div className="text-tiny">{t("coupons")}</div>
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
                            value={searchTerm}
                            name="search" 
                            onChange={(e) => setSearchTerm(e.target.value)}
                            />
                        </fieldset>
                        <div className="button-submit">
                            <button 
                            type="submit">
                                <i className="icon-search" />
                            </button>
                        </div>
                    </form>

                    {
                        searchTerm && (
                            <span className="delIcon" onClick={() => {
                            setSearchTerm(""); 
                            setCoupons(originalCoupons); // Reset to all coupons when search is cleared
                            }}>
                            <RiDeleteBack2Fill size={26} />
                            </span>
                        )
                    }

                </div>
                <Link className="tf-button style-1 w208" to="/coupon/create"><i className="icon-plus" />{t("add_new_coupon")}</Link>
            </div>
        { loading && <Loader /> }
        {/* <div className="wg-table table-all-user"> */}
        <div className="table-responsive">
            <table className="table table-striped table-bordered">
                <thead>
                <tr>
                    <th>{t("sl_no")}</th>
                    <th>{t("coupon_code")}</th>
                    <th>{t("coupon_type")}</th>
                    <th>{t("discount_amount")}</th>
                    <th>{t("minimum_purchase")}</th>
                    <th>{t("usage_limit")}</th>
                    <th>{t("expiry_date")}</th>
                    <th>{t("actions")}</th>
                </tr>
                </thead>
                <tbody>
                {coupons && coupons.length > 0 ? (
                    coupons.map((coupon, index) => (
                        <tr key={index}>
                            <td>{index + 1}</td>
                            <td>{coupon.code}</td>
                            <td>{coupon.type}</td>
                            <td>{coupon.discount}</td>
                            <td>{coupon.min_purchase}</td>
                            <td>{coupon.usage_limit}</td>
                            {/* <td>{new Date(coupon.createdAt).toLocaleString()}</td> */}
                            <td>
                                {new Date(coupon.createdAt).toLocaleString("en-IN", {
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
                                <Link to={`/coupon/edit/${coupon._id}`}>
                                    <div className="item edit">
                                        <i className="icon-edit-3" />
                                    </div>
                                </Link>
                                
                                <div 
                                className="item text-danger delete"
                                onClick={() => handleDeleteCoupon(coupon._id)}
                                style={{ cursor: "pointer" }}
                                >
                                    <i className="icon-trash-2" />
                                </div>
                            </div>
                            </td>
                        </tr>
                    ))) : (
                        <tr>
                            <td colSpan="8" className="text-center">{t("no_coupons_found")}</td>
                        </tr>
                    )}

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

export default AllCoupons