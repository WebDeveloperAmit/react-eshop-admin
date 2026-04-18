import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router";
import { toast } from "react-toastify";
import Swal from "sweetalert2";
import Loader from "../../components/loader/Loader";
import { hideLoader, showLoader } from "../../redux/slices/loaderSlice";
import { deleteContactCustomerService, getAllContactCustomersService } from "../../services/contactCustomerService";

const ContactCustomers = () => {

    const { t } = useTranslation();
    const dispatch = useDispatch();

    const loading = useSelector((state) => state.loader.loading);
    const [allContactCustomers, setAllContactCustomers] = useState([]);

    useEffect(() => {

        const fetchContactCustomers = async () => {
            try {
                dispatch(showLoader());
                const response = await getAllContactCustomersService();
                if (response?.status === "success") {
                    setTimeout(() => {
                        setAllContactCustomers(response?.data || []);
                        dispatch(hideLoader());
                    }, 2000);
                } else {
                    toast.error(response?.message);
                    dispatch(hideLoader());
                }
            } catch (error) {
                console.error("Error fetching contact customers:", error);
                toast.error(error.response?.data?.message);
                dispatch(hideLoader());
            }
        }

        fetchContactCustomers();

    }, [dispatch]);

    const handleDeleteContactCustomer = async (contactId) => {
        const result = await Swal.fire({
            title: t("are_you_sure"),
            text: t("contact_will_be_deleted"),
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
            dispatch(showLoader());
            const response = await deleteContactCustomerService(contactId);
            if (response?.status === "success") {
                setTimeout(() => {
                    toast.success(response?.message);
                    setAllContactCustomers((prev) => prev.filter((contact) => contact._id !== contactId));
                    dispatch(hideLoader());
                }, 3000);

            } else {
                toast.error(response?.message);
                dispatch(hideLoader());
            }
        } catch (error) {
            console.error("Error deleting contact customer:", error);
            toast.error(error.response?.data?.message);
            dispatch(hideLoader());
        }

    }

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

                { loading && <Loader /> }

                {/* <div className="wg-table table-all-user"> */}
                <div className="table-responsive">
                    <table className="table table-striped table-bordered table-hover">
                        <thead>
                            <tr>
                                <th># {t("sl_no")}</th>
                                <th>{t("full_name")}</th>
                                <th>{t("email")}</th>
                                <th className="text-center">{t("message")}</th>
                                <th>{t("actions")}</th>
                            </tr>
                        </thead>
                        <tbody>

                            {allContactCustomers.length > 0 ? (

                                allContactCustomers.map((contact, index) => (
                                    <tr key={index}>
                                        <td>{index + 1}</td>
                                        <td>{contact.full_name}</td>
                                        <td>{contact.email}</td>
                                        <td>
                                            {contact.message}
                                        </td>
                                        <td>
                                            <div className="list-icon-function">
                                                <Link to="#" onClick={() => handleDeleteContactCustomer(contact._id)}>
                                                    <div className="item text-danger delete" style={{ cursor: "pointer" }}>
                                                        <i className="icon-trash-2" />
                                                    </div>
                                                </Link>
                                            </div>
                                        </td>
                                    </tr>
                                ))

                            ) : (
                                <tr>
                                    <td colSpan="6" className="text-center">
                                        {t("no_data_found")}
                                    </td>
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

export default ContactCustomers