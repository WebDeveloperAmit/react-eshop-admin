import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { RiDeleteBack2Fill } from "react-icons/ri";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router";
import { toast } from "react-toastify";
import Loader from "../../components/loader/Loader";
import { hideLoader, showLoader } from "../../redux/slices/loaderSlice";
import { getAllUsersService } from "../../services/userService";

const Users = () => {

    const { t } = useTranslation();
    const dispatch = useDispatch();

    const loading = useSelector((state) => state.loader.loading);

    const [allUsers, setAllUsers] = useState([]);
    const [originalUsers, setOriginalUsers] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");

    useEffect(() => {

        const fetchUsers = async () => {
            try {
                dispatch(showLoader());
                const response = await getAllUsersService();
                if (response?.status === "success") {
                    setTimeout(() => {
                        setAllUsers(response?.data || []);
                        setOriginalUsers(response?.data || []);
                        dispatch(hideLoader());
                    }, 1000);
                } else {
                    toast.error(response?.message);
                    dispatch(hideLoader());
                }
            } catch (error) {
                console.error("Error fetching users:", error);
                toast.error(error.response?.data?.message);
                dispatch(hideLoader());
            }
        }

        fetchUsers();

    }, [dispatch]);


    const handleSearch = (event) => {
        event.preventDefault();

        if (!searchTerm.trim()) {
            setAllUsers(originalUsers);
            return;
        }

        const filteredUsers = originalUsers.filter((user) =>
            user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            user.email.toLowerCase().includes(searchTerm.toLowerCase()) || 
            user.mobile.toLowerCase().includes(searchTerm.toLowerCase())
        );
        setAllUsers(filteredUsers);
    };


  return (
    <div className="main-content-inner">
        <div className="main-content-wrap">
            <div className="flex items-center flex-wrap justify-between gap20 mb-27">
                <h3>Users</h3>
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
                    <div className="text-tiny">All User</div>
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
                                placeholder="Search here..." 
                                name="name" 
                                value={searchTerm} 
                                onChange={(e) => setSearchTerm(e.target.value)}
                                tabIndex={2} 
                                aria-required="true" 
                                required 
                                />
                            </fieldset>

                            <div className="button-submit">
                                <button 
                                type="submit"><i className="icon-search" /></button>
                            </div>
                        </form>

                        {
                            searchTerm && (
                                <span className="delIcon" onClick={() => {
                                setSearchTerm(""); 
                                setAllUsers(originalUsers);
                                }}>
                                <RiDeleteBack2Fill size={26} />
                                </span>
                            )
                        }

                    </div>
                </div>

                { loading && <Loader /> }

                {/* <div className="wg-table table-all-user"> */}
                <div className="table-responsive">
                    <table className="table table-striped table-bordered">
                        <thead>
                        <tr>
                            <th># { t("sl_no") }</th>
                            <th>{ t("name") }</th>
                            <th>{ t("phone") }</th>
                            <th>{ t("email") }</th>
                            <th>{ t("created_at") }</th>
                        </tr>
                        </thead>
                        <tbody>

                            {allUsers.length > 0 ? (
                                allUsers.map((user, index) => (
                                    <tr key={index}>
                                        <td>{ index + 1 }</td>
                                        <td>{user.name}</td>
                                        <td>{user.mobile}</td>
                                        <td>{user.email}</td>
                                        <td>
                                            {
                                                new Date(user.createdAt).toLocaleString("en-IN", {
                                                    day: "2-digit",
                                                    month: "short",
                                                    year: "numeric",
                                                    hour: "2-digit",
                                                    minute: "2-digit",
                                                })
                                            }
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="5" className="text-center">{ t("no_data_found") }</td>
                                </tr>
                            )}

                        </tbody>
                    </table>
                </div>
                {/* </div> */}

                <div className="divider" />
                <div className="flex items-center justify-between flex-wrap gap10 wgp-pagination"></div>
            </div>
        </div>
    </div>

  )
}

export default Users