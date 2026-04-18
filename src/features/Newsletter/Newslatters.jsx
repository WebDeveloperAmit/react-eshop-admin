import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { RiDeleteBack2Fill } from "react-icons/ri";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router";
import { toast } from "react-toastify";
import Swal from "sweetalert2";
import Loader from "../../components/loader/Loader";
import { hideLoader, showLoader } from "../../redux/slices/loaderSlice";
import { deleteNewsletterService, getAllNewslettersService } from "../../services/newsletterService";

const Newslatters = () => {

    const { t } = useTranslation();

    const dispatch = useDispatch();

    const loading = useSelector((state) => state.loader.loading);

    const [allNewsletters, setAllNewsletters] = useState([]);
    const [originalNewsletters, setOriginalNewsletters] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");

    useEffect(() => {

        const fetchNewsletters = async () => {
            try {
                dispatch(showLoader());
                const response = await getAllNewslettersService();
                if (response?.status === "success") {
                    setTimeout(() => {
                        setAllNewsletters(response?.data || []);
                        setOriginalNewsletters(response?.data || []);
                        dispatch(hideLoader());
                    }, 1000);
                } else {
                    toast.error(response?.message);
                    dispatch(hideLoader());
                }
            } catch (error) {
                console.error("Error fetching newsletters:", error);
                toast.error(error.response?.data?.message);
                dispatch(hideLoader());
            }
        }

        fetchNewsletters();

    }, [dispatch]);

    const handleDeleteNewsletter = async (newsletterId) => {

        const result = await Swal.fire({
            title: t("are_you_sure"),
            text: t("newsletter_will_be_deleted"),
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
            const response = await deleteNewsletterService(newsletterId);
            if (response?.status === "success") {
                setTimeout(() => {
                    toast.success(response?.message);

                    setAllNewsletters((prev) => 
                        prev.filter((newsletter) => newsletter._id !== newsletterId)
                    );

                    setOriginalNewsletters((prev) => 
                        prev.filter((newsletter) => newsletter._id !== newsletterId)
                    );

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

    const handleSearch = (event) => {
        event.preventDefault();

        if (!searchTerm.trim()) {
            setAllNewsletters(originalNewsletters);
            return;
        }

        const filteredNewsletters = originalNewsletters.filter((newsletter) =>
            newsletter.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            newsletter.email.toLowerCase().includes(searchTerm.toLowerCase())
        );
        setAllNewsletters(filteredNewsletters);
    };

  return (
    <div className="main-content-inner">
        <div className="main-content-wrap">

            <div className="flex items-center flex-wrap justify-between gap20 mb-27">
                <h3>{t("all_newsletters")}</h3>
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
                    <div className="text-tiny">{t("all_newsletters")}</div>
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
                                className="form-input" 
                                name="name" 
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                required 
                                />
                            </fieldset>
                            <div className="button-submit">
                                <button 
                                type="submit"><i className="icon-search" />
                                </button>
                            </div>
                        </form>

                        {
                            searchTerm && (
                                <span className="delIcon" onClick={() => {
                                setSearchTerm(""); 
                                setAllNewsletters(originalNewsletters);
                                }}>
                                <RiDeleteBack2Fill size={26} />
                                </span>
                            )
                        }

                    </div>
                </div>

                { loading && <Loader /> }

                <div className="wg-table table-all-user">
                    <div className="table-responsive">
                        <table className="table table-striped table-bordered">
                            <thead>
                                <tr>
                                    <th># {t("sl_no")}</th>
                                    <th>{t("full_name")}</th>
                                    <th>{t("email")}</th>
                                    <th>{t("actions")}</th>
                                </tr>
                            </thead>
                            <tbody>
                                {allNewsletters.length > 0 ? (
                                    allNewsletters.map((newsletter, index) => (
                                        <tr key={index}>
                                            <td>{ index + 1 }</td>
                                            <td>{ newsletter.name }</td>
                                            <td>{ newsletter.email }</td>
                                            <td>
                                                <div className="list-icon-function">
                                                    <Link to="#" onClick={(() => handleDeleteNewsletter(newsletter._id))}>
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
                                        <td colSpan="4" className="text-center">{ t('no_data_found') }</td>
                                    </tr>
                                )}

                            </tbody>
                        </table>
                    </div>
                </div>

                <div className="divider" />
                <div className="flex items-center justify-between flex-wrap gap10 wgp-pagination"></div>
            </div>
        </div>
    </div>
  )
}

export default Newslatters