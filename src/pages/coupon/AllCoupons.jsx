import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router";
import { toast } from "react-toastify";
import Loader from "../../components/loader/Loader";
import { hideLoader, showLoader } from "../../redux/slices/loaderSlice";
import { getAllCouponsService } from "../../services/couponService";

const AllCoupons = () => {

    const dispatch = useDispatch();
    const loading = useSelector((state) => state.loader.loading);
    const [coupons, setCoupons] = useState([]);

    useEffect(() => {
        const fetchCoupons = async () => {
            try {
                dispatch(showLoader());
                const response = await getAllCouponsService();
                console.log(response);
                if (response.status === "success") {
                    setCoupons(response.coupon);
                } else {
                    toast.error(`❌ ${response.message}`);
                }
            } catch (error) {
                toast.error("❌ An error occurred while fetching coupons");
                console.error("Error fetching coupons:", error);
            } finally {
                dispatch(hideLoader());
            }
        }
        fetchCoupons();
    }, [dispatch]);

  return (
    <div className="main-content-inner">
    <div className="main-content-wrap">
        <div className="flex items-center flex-wrap justify-between gap20 mb-27">
        <h3>All Coupons List</h3>
        <ul className="breadcrumbs flex items-center flex-wrap justify-start gap10">
            <li>
            <Link to="/">
                <div className="text-tiny">Dashboard</div>
            </Link>
            </li>
            <li>
            <i className="icon-chevron-right" />
            </li>
            <li>
            <div className="text-tiny">Coupons</div>
            </li>
        </ul>
        </div>
        <div className="wg-box">
        <div className="flex items-center justify-between gap10 flex-wrap">
            <div className="wg-filter flex-grow">
            <form className="form-search">
                <fieldset className="name">
                    <input type="text" placeholder="Search here..." className name="search" />
                </fieldset>
                <div className="button-submit">
                    <button type="submit"><i className="icon-search" /></button>
                </div>
            </form>
            </div>
            <Link className="tf-button style-1 w208" to="/coupon/create"><i className="icon-plus" />Add new coupon</Link>
        </div>
        { loading && <Loader /> }
        <div className="wg-table table-all-user">
            <div className="table-responsive">
            <table className="table table-striped table-bordered">
                <thead>
                <tr>
                    <th>SL. NO</th>
                    <th>Coupon Code</th>
                    <th>Coupon Type</th>
                    <th>Discount Amount</th>
                    <th>Min Purchase</th>
                    <th>Usage Limit</th>
                    <th>Expiry Date</th>
                    <th>Action</th>
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
                                
                                <form action="#" method="POST">
                                    <div className="item text-danger delete">
                                        <i className="icon-trash-2" />
                                    </div>
                                </form>
                            </div>
                            </td>
                        </tr>
                    ))) : (
                        <tr>
                            <td colSpan="8" className="text-center">No coupons found.</td>
                        </tr>
                    )}

                </tbody>
            </table>
            </div>
        </div>
        <div className="divider" />
        <div className="flex items-center justify-between flex-wrap gap10 wgp-pagination">
        </div>
        </div>
    </div>
    </div>

  )
}

export default AllCoupons